import { HttpException, HttpStatus, Injectable, Inject, Body, Controller, Delete, Get, Param, Post, Req, Patch, UseGuards, HttpCode, Session } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}