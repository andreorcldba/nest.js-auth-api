import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
    * Create a new user.
    */
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 8);

    try {
      const data = await this.userRepository.save(createUserDto);

      if(data) {
        return data;
      }
      throw new HttpException('Unknown error:', HttpStatus.BAD_REQUEST);
    } catch (error) {
      if (error.code == 23505){
        throw new HttpException('This email is already registered', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      }
    }
  }
  /**
    * List all users.
    */
  async findAll() {
    return await this.userRepository.find({ select: ['id', 'email', 'created_at', 'updated_at'] });
  }

  /**
    * List one user for email.
    */
  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      },
      select: ['id', 'email', 'created_at', 'updated_at']
    });
    
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
  /**
    * update a user.
    */
  async update(email: string, updateUserDto: UpdateUserDto) {

    let moment = require('moment');
    updateUserDto.updated_at = moment().format('Y-M-D H:m:s');
    
    if(updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8);
    }

    try {
      const user = await this.userRepository.update({email:email}, updateUserDto);

      if(user.affected) {
        return await this.findOne(updateUserDto.email); 
      }
      throw new HttpException('Unknown error:', HttpStatus.BAD_REQUEST);
    } catch (error) {

      if (error.code == 23502){
        throw new HttpException('There are mandatory fields that are null.', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      }
    }
  }
  /**
    * delete a user.
    */
  async remove(email: string) {

    try {
      const user = await this.userRepository.delete({email:email});

      if (!user.affected) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else {
        return { "message": `User ${email} deleted successfully` }
      }
    } catch (error) {
      if(error.status === 404) {
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      }
    }
  }
}