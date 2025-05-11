import { PaginationDto } from './../common/dto/pagination.dto';
import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UsersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = await this.user.count();
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: this.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: number) {
    const user = await this.user.findFirst({
      where: { id, estado: 'ACTIVO' },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = updateUserDto;

    await this.findOne(id);

    return this.user.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
