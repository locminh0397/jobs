import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AtStrategy } from './strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    ConfigService,
    JwtService,
    AtStrategy,
  ],
})
export class AuthModule {}
