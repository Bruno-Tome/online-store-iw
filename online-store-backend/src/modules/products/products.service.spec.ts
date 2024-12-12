import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './services/products.service';
// import { Product } from './schemas/products.schema';
import { ProductsController } from './controllers/products.controllers';
import { APP_GUARD } from '@nestjs/core';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/role.guard';
// Mock guard to bypass authentication/authorization
class MockRolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true; // Always allow access
  }
}
class Product {
  constructor({
    _id,
    name,
    description,
    price,
    images,
    stock,
    dimensions,
    orderCount,
  }) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
    this.stock = stock;
    this.dimensions = dimensions;
    this.orderCount = orderCount;
  }
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  dimensions: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
  orderCount: number;
}
const mockProduct = new Product({
  _id: '630f7f9074b1ed88c909e620',
  name: 'Test Product',
  description: 'Test Description',
  price: 100,
  images: ['https://picsum.photos/200', 'https://picsum.photos/300'],
  stock: 10,
  dimensions: {
    width: 100,
    height: 100,
    length: 100,
    weight: 0.2,
  },
  orderCount: 0,
});
let mockProductArray = [mockProduct, mockProduct, mockProduct];

const mockProductModel = {
  create: jest.fn().mockResolvedValue(mockProduct),
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockProductArray),
  })),
  findOne: jest
    .fn()
    .mockImplementation((id) => mockProductArray.find(({ _id }) => _id === id)),
  findAll: jest.fn().mockResolvedValue(mockProductArray),
  findById: jest
    .fn()
    .mockImplementation((id) => mockProductArray.find(({ _id }) => _id === id)),
  update: jest.fn().mockImplementation((id, data) => {
    let productId = mockProductArray.findIndex(({ _id }) => _id === id);
    mockProductArray[productId] = { ...mockProductArray[productId], ...data };
    return mockProductArray[productId];
  }),
  delete: jest.fn().mockImplementation((id) => {
    let productId = mockProductArray.findIndex(({ _id }) => _id === id);
    let product = mockProductArray[productId];
    mockProductArray = mockProductArray.filter(({ _id }) => _id !== id);
    return product;
  }),
};

describe('ProductsModule', () => {
  let service: ProductsService;
  let productController: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductModel,
        },
        {
          provide: RolesGuard,
          useClass: MockRolesGuard, // Mocking the guard
        },
      ],
    }).compile();
    productController = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const dto = new Product({
        _id: '630f7f9074b1ed88c909e620',
        orderCount: 0,
        name: 'New Product',
        description: 'New Description',
        price: 150,
        stock: 20,
        dimensions: {
          width: 200,
          height: 200,
          length: 200,
          weight: 0.4,
        },
        images: ['https://picsum.photos/400'],
      });
      const result = await service.create(dto);
      expect(result).toEqual(mockProduct);
      expect(mockProductModel.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockProductArray);
      expect(mockProductModel.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = await service.findOne('630f7f9074b1ed88c909e620');
      expect(result).toEqual(mockProduct);
      expect(mockProductModel.findOne).toHaveBeenCalledWith(
        '630f7f9074b1ed88c909e620',
      );
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const dto = {
        name: 'Updated Product',
        description: 'Test Description',
        price: 100,
        images: ['https://picsum.photos/200', 'https://picsum.photos/300'],
        stock: 10,
        dimensions: { width: 100, height: 100, length: 100, weight: 0.2 },
        orderCount: 0,
      };
      const result = await service.update('630f7f9074b1ed88c909e620', dto);
      expect(result).toEqual({ ...mockProduct, name: 'Updated Product' });
      expect(mockProductModel.update).toHaveBeenCalledWith(
        '630f7f9074b1ed88c909e620',
        dto,
      );
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const result = await service.delete('630f7f9074b1ed88c909e620');
      const expected = mockProduct;
      expected.name = 'Updated Product';
      expect(result).toEqual(mockProduct);
      expect(mockProductModel.delete).toHaveBeenCalledWith(
        '630f7f9074b1ed88c909e620',
      );
    });
  });
});
