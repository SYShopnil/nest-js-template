import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

describe('When use controller fired', () => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    // Create a full mock of UserService with jest.Mocked
    const userServiceMock: Partial<jest.Mocked<UserService>> = {
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  describe('When user create request ', () => {
    it('expect it should call userService.createUser and return the created user', async () => {
      const dto: CreateUserDto = {
        email: 'sadmanishopnil@gmail.com',
        password: '12345678',
      };
      const createdUser: UserEntity = {
        id: 1,
        email: 'sadmanishopnil@gmail.com',
        password: '12345678',
        isActive: true,
      } as UserEntity;

      userService.createUser.mockResolvedValue(createdUser);

      const result = await userController.create(dto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(userService.createUser as jest.Mock).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdUser);
    });
  });
});
