import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwtConstants';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
    * Check user credentials.
    */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ email: email });
    
    if (user) {
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);   
        }

        return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
  /**
    * Get new token(refresh token JWT).
    */
  public async getCookieWithJwtRefreshToken(email: string, old_token: string) {
    const user = await this.userRepository.findOne({ email: email });
   
    if(user) {

      if(user.remember_token === old_token) {
        const payload = {email: email};
        const token = this.jwtService.sign(payload, {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.expirationTime
        });
        return { remember_token: token }
      }
      throw new HttpException('Incorrect token', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
  /**
    * Get access token.
    */
  public getCookieWithJwtToken(email: string) {
    const payload = {email: email};

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  /**
    * Set new token in database.
    */
  async setCookieWithJwtToken(id:number, token: any) {
    await this.userRepository.update(id, {remember_token: token});
    const updatedUser = await this.userRepository.findOne(id);
         
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  /**
    * remove token in database.
    */
  async logout(email: string) {
    const user = await this.usersService.findOne(email);

    if (user) {
      try {
        await this.userRepository.update({ email:email }, {remember_token: null});
      
        return { "message": `User ${email} logged out successfully` }
      } catch (error) {
        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      }
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}