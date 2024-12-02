import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ProductsService } from './services/products.service';
import { Product } from './schemas/products.schema';

const mockProduct = {
    _id: '630f7f9074b1ed88c909e620',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    images: ['https://picsum.photos/200', 'https://picsum.photos/300'],
    stock: 10,
};

const mockProductModel = {
    create: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue([mockProduct]),
    })),
    findById: jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(mockProduct),
    })),
    findByIdAndUpdate: jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue({
            ...mockProduct,
            name: 'Updated Product',

        }),
    })),
    findByIdAndDelete: jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(mockProduct),
    })),
    // Mocking the Mongoose Model constructor behavior
    constructor: jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue(mockProduct),
    })),
};


describe('ProductsService', () => {
    let service: ProductsService;
    let model: Model<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getModelToken(Product.name),
                    useValue: mockProductModel,
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        model = module.get<Model<Product>>(getModelToken(Product.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const dto = {
                name: 'New Product',
                description: 'New Description',
                price: 150,
                stock:20,
                images: ['https://picsum.photos/400'],
            };
            const result = await service.create(dto);
            console.log(result);
            expect(result).toEqual(mockProduct);
            expect(model.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            const result = await service.findAll();
            expect(result).toEqual([mockProduct]);
            expect(model.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single product', async () => {
            const result = await service.findOne('630f7f9074b1ed88c909e620');
            expect(result).toEqual(mockProduct);
            expect(model.findById).toHaveBeenCalledWith('630f7f9074b1ed88c909e620');
        });
    });

    describe('update', () => {
        it('should update a product', async () => {
            const dto = { name: 'Updated Product' };
            const result = await service.update('630f7f9074b1ed88c909e620', dto);
            expect(result).toEqual({ ...mockProduct, name: 'Updated Product' });
            expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
                '630f7f9074b1ed88c909e620',
                dto,
                { new: true },
            );
        });
    });

    describe('delete', () => {
        it('should delete a product', async () => {
            const result = await service.delete('630f7f9074b1ed88c909e620');
            expect(result).toEqual(mockProduct);
            expect(model.findByIdAndDelete).toHaveBeenCalledWith('630f7f9074b1ed88c909e620');
        });
    });
});
