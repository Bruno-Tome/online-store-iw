import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './schemas/user.schema';

describe('UsersModule', () => {
  let usersService: UsersService;
  let usersController: UsersController;
  let usersMockedData = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    },
    {
      _id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password',
    },
  ];

  const mockUserModel = {
    // Simulate the `create` method with a mock implementation
    create: jest.fn().mockImplementation((data) => ({
      ...data,
      _id: '1',
    })),
    findAll: jest.fn().mockImplementation(() => usersMockedData),
    // findById: jest.fn().mockReturnValue({
    //     exec: jest.fn().mockResolvedValue({
    //         _id: '1',
    //         name: 'John Doe',
    //         email: 'john@example.com',
    //         password: 'password',
    //     }),
    // }),

    findById: jest
      .fn()
      .mockImplementation((id) =>
        usersMockedData.find(({ _id }) => _id === id),
      ),

    findOne: jest
      .fn()
      .mockImplementation((id) =>
        usersMockedData.find(({ _id }) => _id === id),
      ),
    // findByIdAndUpdate: jest.fn().mockReturnValue({
    //   exec: jest.fn().mockResolvedValue({
    //     _id: '1',
    //     name: 'Updated Name',
    //     email: 'john@example.com',
    //     password: 'password',
    //   }),
    // }),
    findByIdAndUpdate: jest.fn().mockImplementation((id, data) => {
      let userId = usersMockedData.findIndex(({ _id }) => _id === id);
      usersMockedData[userId] = { ...usersMockedData[userId], ...data };
      return usersMockedData[userId];
    }),
    update: jest.fn().mockImplementation((id, data) => {
      let userId = usersMockedData.findIndex(({ _id }) => _id === id);
      let user = usersMockedData[userId];
      usersMockedData[userId] = { ...user, ...data };

      return usersMockedData[userId];
    }),
    // findByIdAndDelete: jest.fn().mockReturnValue({
    //   exec: jest.fn().mockResolvedValue({
    //     _id: '1',
    //     name: 'John Doe',
    //     email: 'john@example.com',
    //     password: 'password',
    //   }),
    // }),
    delete: jest.fn().mockImplementation((id) => {
      let userId = usersMockedData.findIndex(({ _id }) => _id === id);

      let user = usersMockedData[userId];
      usersMockedData = usersMockedData.filter(({ _id }) => _id !== id);
      return user;
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserModel,
        },
      ],
    }).compile();
    usersController = moduleRef.get(UsersController);
    usersService = moduleRef.get(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      const result = await usersController.create(createUserDto);

      expect(result).toEqual({
        _id: '1',
        ...createUserDto,
      });
      expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await usersController.findAll();

      expect(result).toEqual([
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password',
        },
        {
          _id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'password',
        },
      ]);
      expect(mockUserModel.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const result = await usersController.findOne('1');

      expect(result).toEqual({
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      });
      expect(mockUserModel.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const updateUserDto = { name: 'Updated Name' };
      const result = await usersController.update('1', updateUserDto);

      expect(result).toEqual({
        _id: '1',
        name: 'Updated Name',
        email: 'john@example.com',
        password: 'password',
      });
      expect(mockUserModel.update).toHaveBeenCalledWith('1', updateUserDto);
    });
  });

  describe('delete', () => {
    it('should remove a user by ID', async () => {
      const result = await usersController.delete('1');

      expect(result).toEqual({
        _id: '1',
        name: 'Updated Name',
        email: 'john@example.com',
        password: 'password',
      });
      expect(mockUserModel.delete).toHaveBeenCalledWith('1');
    });
  });
});
