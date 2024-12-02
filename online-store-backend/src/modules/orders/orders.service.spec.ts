import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { ProductsService } from '../products/services/products.service';
import { Order } from './schemas/orders.schema';

const mockOrderModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
};

const mockProductsService = {
    findOne: jest.fn(),
    updateStock: jest.fn(),
};

describe('OrdersService', () => {
    let service: OrdersService;
    let productsService: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: ProductsService,
                    useValue: mockProductsService,
                },
                {
                    provide: getModelToken(Order.name),
                    useValue: mockOrderModel,
                },
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
        productsService = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create an order and update product stock', async () => {
            const mockOrder = {
                customerId: 'customer-id-1',
                items: [
                    { productId: 'product-id-1', quantity: 2 },
                    { productId: 'product-id-2', quantity: 3 },
                ],
            };

            const mockProduct1 = { id: 'product-id-1', stock: 10 };
            const mockProduct2 = { id: 'product-id-2', stock: 5 };

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

            mockOrderModel.create.mockResolvedValueOnce(mockOrder);

            const result = await service.create(mockOrder);

            expect(productsService.findOne).toHaveBeenCalledTimes(2);
            expect(productsService.updateStock).toHaveBeenCalledWith('product-id-1', 8);
            expect(productsService.updateStock).toHaveBeenCalledWith('product-id-2', 2);
            expect(mockOrderModel.create).toHaveBeenCalledWith(mockOrder);
            expect(result).toEqual(mockOrder);
        });

        it('should throw an error if product stock is insufficient', async () => {
            const mockOrder = {
                customerId: 'customer-id-1',
                items: [{ productId: 'product-id-1', quantity: 10 }],
            };

            const mockProduct = { id: 'product-id-1', stock: 5 };

            mockProductsService.findOne.mockImplementationOnce(() => mockProduct);

            await expect(service.create(mockOrder)).rejects.toThrow(
                NotFoundException,
            );
            expect(productsService.findOne).toHaveBeenCalledWith('product-id-1');
            expect(productsService.updateStock).not.toHaveBeenCalled();
            expect(mockOrderModel.create).not.toHaveBeenCalled();
        });
    });
});
