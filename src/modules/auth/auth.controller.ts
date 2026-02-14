import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  role: Role;
}

class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  oldPassword: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}

class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}

import { UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() req: LoginDto) {
    // Manually validating because LocalStrategy is not implemented yet in this iteration
    // We are going direct endpoint style for simplicity in this phase
    const validUser = await this.authService.validateUser(
      req.email,
      req.password,
    );
    if (!validUser) {
      throw new UnauthorizedException();
    }
    return this.authService.login(validUser);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.role);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req: any, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(req.user.userId, body.oldPassword, body.newPassword);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
