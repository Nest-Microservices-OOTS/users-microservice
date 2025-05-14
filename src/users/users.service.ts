import { PaginationDto } from './../common/dto/pagination.dto';
import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';

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
      data: await this.user.findMany({
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
    // Validación exhaustiva del ID
    if (isNaN(id) || !Number.isInteger(id)) {
      throw new RpcException({
        message: 'ID de usuario inválido: debe ser un número entero',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    console.log(id, typeof id);

    console.log(`Buscando usuario con ID: ${id} (Tipo: ${typeof id})`);

    const user = await this.user.findUnique({
      where: { id: id },
    });

    console.log(user);

    if (!user) {
      throw new RpcException({
        message: `User with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
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
