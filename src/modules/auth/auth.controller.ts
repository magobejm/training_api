import { Controller, Post, Body, UseGuards, Get, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RoleEnum } from './domain/role.enum';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Public } from './decorators/public.decorator';
import { IsEnum, IsString, IsOptional, MinLength, IsEmail, IsNumber } from 'class-validator';

class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  goal: string;

  @IsString()
  birthDate: string; // ISO format

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  trainerId?: string;
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
  async register(@Body() body: RegisterDto, @Request() req: any) {
    // If a trainer is registering a client, associate it automatically
    let trainerId = body.trainerId;
    if (req.user?.role === 'TRAINER') {
      trainerId = req.user.userId;
    }

    return this.authService.register({
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role,
      phone: body.phone,
      goal: body.goal,
      avatarUrl: body.avatarUrl,
      trainerId: trainerId,
      birthDate: (body as any).birthDate,
      height: (body as any).height,
      weight: (body as any).weight,
    });
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
