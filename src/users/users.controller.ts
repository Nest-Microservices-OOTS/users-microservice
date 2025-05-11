import { Controller, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'findAll' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'findOneUser' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({ cmd: 'deletUser' })
  remove(@Payload('id') id: string) {
    return this.usersService.remove(+id);
  }
}
