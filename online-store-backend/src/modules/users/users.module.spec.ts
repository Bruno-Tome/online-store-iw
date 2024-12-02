import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './schemas/user.schema';

describe('UsersModule', () => {
    let usersService: UsersService;
    let usersController: UsersController;

    const mockUserModel = {
        create: jest.fn(),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndRemove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                },
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        usersController = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(usersService).toBeDefined();
        expect(usersController).toBeDefined();
    });

    describe('create', () => {
        it('should create a user', async () => {
            const createUserDto = { name: 'John Doe', email: 'john@example.com', password: 'password' };
            const result = { _id: '1', ...createUserDto, isActive: true, createdAt: new Date() };
            
            mockUserModel.create.mockResolvedValue(result);

            expect(await usersService.create(createUserDto)).toEqual(result);
            expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const users = [
                { _id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' },
                { _id: '2', name: 'Jane Doe', email: 'jane@example.com', password: 'password' },
            ];

            mockUserModel.find.mockResolvedValue(users);

            expect(await usersService.findAll()).toEqual(users);
            expect(mockUserModel.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a user by ID', async () => {
            const user = { _id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' };

            mockUserModel.findByIdAndRemove.mockResolvedValue(user);

            expect(await usersService.findOne('1')).toEqual(user);
            expect(mockUserModel.findById).toHaveBeenCalledWith('1');
        });
    });

    describe('update', () => {
        it('should update a user by ID', async () => {
            const updateUserDto = { name: 'Updated Name' };
            const updatedUser = { _id: '1', name: 'Updated Name', email: 'john@example.com', password: 'password' };

            mockUserModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

            expect(await usersService.update('1', updateUserDto)).toEqual(updatedUser);
            expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith('1', updateUserDto, { new: true });
        });
    });

    describe('delete', () => {
        it('should remove a user by ID', async () => {
            const user = { _id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' };

            mockUserModel.findByIdAndRemove.mockResolvedValue(user);

            expect(await usersService.delete('1')).toEqual(user);
            expect(mockUserModel.findByIdAndRemove).toHaveBeenCalledWith('1');
        });
    });
});
