import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export const userMocks: UserEntity[] = [
  {
    id: 1,
    email: 'sadmanishopnil@gmail.com',
    password: '12345678',
    isActive: true,
  },
];

export const userDtoMock: CreateUserDto = {
  email: 'sadmanishopnil@gmail.com',
  password: '12345678',
};
