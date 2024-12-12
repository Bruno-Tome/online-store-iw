import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { ProductsService } from '../products/services/products.service';
import { Order } from './schemas/orders.schema';
import { OrdersController } from './controllers/orders.controller';

const mockOrderModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
};
// turn the above into a mock class
class MockOrderModel {
  constructor(public data?: any) {}
  save = jest.fn(async function () {
    return this.data;
  });
  create = jest.fn();
  find = jest.fn();
  findById = jest.fn();
}

const mockProductsService = {
  findOne: jest.fn(),
  updateStock: jest.fn(),
};
const mockOrder = {
  customerId: 'customer-id-1',
  items: [
    { productId: 'product-id-1', quantity: 2 },
    { productId: 'product-id-2', quantity: 3 },
  ],
};

const mockProduct1 = { id: 'product-id-1', stock: 10 };
const mockProduct2 = { id: 'product-id-2', stock: 5 };

class Order {
  customerId: string;
  items: { productId: string; quantity: number }[];
  createdAt: Date;
  quotation: { id: string; price: number };
  total: number;
  constructor({
    customerId,
    items,
    createdAt,
    quotation,
    total,
  }: {
    customerId: string;
    items: { productId: string; quantity: number }[];
    createdAt: Date;
    quotation: { id: string; price: number };
    total: number;
  }) {
    this.customerId = customerId;
    this.items = items;
    this.createdAt = createdAt;
    this.quotation = quotation;
    this.total = total;
  }
}
describe('OrdersService', () => {
  let orderService: OrdersService;
  let productsService: ProductsService;
  let ordersController: OrdersController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: getModelToken(Order.name),
          useValue: MockOrderModel,
        },
      ],
    }).compile();
    ordersController = module.get<OrdersController>(OrdersController);
    orderService = module.get<OrdersService>(OrdersService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('create', () => {
    it('should create an order and update product stock', async () => {
      mockProductsService.findOne.mockImplementationOnce(() => mockProduct1);
      mockProductsService.findOne.mockImplementationOnce(() => mockProduct2);

      mockProductsService.updateStock.mockResolvedValueOnce({
        ...mockProduct1,
        stock: 8,
      });
      mockProductsService.updateStock.mockResolvedValueOnce({
        ...mockProduct2,
        stock: 2,
      });

      const spy = jest.spyOn(orderService, 'create');
      const result = await orderService.create(mockOrder);

      expect(productsService.findOne).toHaveBeenCalledTimes(2);
      expect(productsService.updateStockAndOrderCount).toHaveBeenCalledWith(
        'product-id-1',
        8,
      );
      expect(productsService.updateStockAndOrderCount).toHaveBeenCalledWith(
        'product-id-2',
        2,
      );
      expect(spy).toHaveBeenCalledWith(mockOrder);
      expect(result).toEqual(mockOrder);
    });

    it('should throw an error if product stock is insufficient', async () => {
      const mockOrder = {
        customerId: 'customer-id-1',
        items: [{ productId: 'product-id-1', quantity: 10 }],
      };

      const mockProduct = { id: 'product-id-1', stock: 5 };

      mockProductsService.findOne.mockImplementationOnce(() => mockProduct);
      let error;
      const spy = jest.spyOn(mockOrderModel, 'create');
      let result = null;
      try {
        result = await orderService.create(mockOrder);
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(ForbiddenException);
      expect(result).toBeNull();

      expect(productsService.findOne).toHaveBeenCalledWith('product-id-1');
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
