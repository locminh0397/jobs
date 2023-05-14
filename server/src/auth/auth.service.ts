import { PrismaService } from './../../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  EditStudentDto,
  EmployerSigninDto,
  EmployerSignupDto,
  GoogleDto,
  SigninDto,
  SignupDto,
} from './auth-dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from 'type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async hashData(text: string) {
    return await bcrypt.hash(
      text,
      Number(this.config.get<number>('HASH_SALT')),
    );
  }

  async getTokens(
    userId: string,
    email: string,
    role: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      role: role,
    };

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '7d',
      }),
      this.jwt.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      refresh_token: rt,
      access_token: at,
    };
  }

  async userSignup(signUpDto: SignupDto) {
    const { email, password, confirm_password, full_name } = signUpDto;

    const existsUser = await this.prisma.user.findUnique({ where: { email } });

    if (existsUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    if (password !== confirm_password) {
      throw new HttpException(
        'Password does not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.hash(
      password,
      Number(this.config.get<number>('HASH_SALT')),
    );

    await this.prisma.user.create({
      data: {
        email,
        hash,
        full_name,
      },
    });

    throw new HttpException('Created successfully!', HttpStatus.CREATED);
  }

  async userSignin(user: SigninDto) {
    const { email, password } = user;
    const checkUser = await this.prisma.user.findUnique({ where: { email } });

    if (!checkUser) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    const isCorrect = await bcrypt.compare(password, checkUser.hash);

    if (!isCorrect) {
      throw new HttpException('Password incorrect!', HttpStatus.UNAUTHORIZED);
    }

    const { access_token, refresh_token } = await this.getTokens(
      checkUser.id,
      checkUser.email,
      checkUser.role,
    );

    throw new HttpException(
      {
        access_token: access_token,
        role: checkUser.role,
      },
      HttpStatus.ACCEPTED,
    );
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    delete user.hash;
    throw new HttpException(user, HttpStatus.OK);
  }

  async editProfileUser(id: string, studentDto: EditStudentDto) {
    const { full_name, phone, city, state, address, industry } = studentDto;

    await this.prisma.user.update({
      where: { id },
      data: { full_name, phone, city, state, address, industry },
    });

    throw new HttpException('Successfully updated', HttpStatus.OK);
  }

  async employerSignup(employerSignupDto: EmployerSignupDto) {
    const {
      user_name,
      password,
      confirm_password,
      name_company,
      email_company,
    } = employerSignupDto;

    const user = await this.prisma.company.findUnique({ where: { user_name } });

    if (user) {
      throw new HttpException('Existing employee', HttpStatus.CONFLICT);
    }

    if (password !== confirm_password) {
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    }
    console.log(this.config.get<number>('HASH_SALT'));
    const hash = await bcrypt.hash(
      password,
      Number(this.config.get<number>('HASH_SALT')),
    );

    await this.prisma.company.create({
      data: { user_name, hash, name_company, email_company },
    });

    throw new HttpException('Created successfully', HttpStatus.CREATED);
  }

  async employerSignin(employerSigninDto: EmployerSigninDto) {
    console.log(employerSigninDto);
    const { user_name, password } = employerSigninDto;

    const user = await this.prisma.company.findUnique({ where: { user_name } });

    if (!user) {
      throw new HttpException('Not found user', HttpStatus.FORBIDDEN);
    }

    const isMatch = await bcrypt.compare(password, user.hash);

    if (!isMatch) {
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
    }

    const { access_token, refresh_token } = await this.getTokens(
      user.id,
      user.user_name,
      user.role,
    );

    throw new HttpException(
      {
        access_token: access_token,
        role: user.role,
      },
      HttpStatus.ACCEPTED,
    );
  }

  async getEmployer(id: string) {
    const employer = await this.prisma.company.findUnique({ where: { id } });
    delete employer.hash;
    return employer;
  }
}
