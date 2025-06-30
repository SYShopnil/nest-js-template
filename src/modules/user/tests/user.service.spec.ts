import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userDtoMock, userMocks } from '../mocks';

describe('When user service has called', () => {
  let userService: UserService;
  let userRepo: Partial<Record<keyof Repository<UserEntity>, jest.Mock>>;
  beforeEach(async () => {
    userRepo = {
      create: jest
        .fn()
        .mockImplementation((dto: CreateUserDto) => ({ ...dto })),
      save: jest.fn().mockResolvedValue(userMocks[0]),
      find: jest.fn().mockResolvedValue(userMocks),
    };
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepo,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('expect user successfully create', async () => {
    const user = await userService.createUser(userDtoMock);
    expect(user).toEqual(userMocks[0]);
    expect(userRepo.save).toHaveBeenCalled();
  });

  it('expect a user list will be return', async () => {
    const users = await userService.getAllUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users[0]).toEqual(userMocks[0]);
    expect(userRepo.find).toHaveBeenCalled();
  });
});
