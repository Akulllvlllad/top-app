import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { User } from './user.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_EXIST } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(dto: AuthDto): Promise<Pick<User, 'email'>> {
    const user = await this.findUser(dto.email);
    if (!user) {
      throw new NotFoundException(USER_NOT_EXIST);
    }

    const isCorrectPassword = compare(dto.password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new NotFoundException(USER_NOT_EXIST);
    }

    return { email: user.email };
  }
  async login(email: string) {
    const payload = { email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
