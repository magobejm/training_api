import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../auth/domain/role.enum';
import { IsEmail, IsString, MinLength } from 'class-validator';

class CreateTrainerDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}

class ResetPasswordDto {
    @IsString()
    @MinLength(8)
    newPassword: string;
}

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN)
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Post('trainers')
    createTrainer(@Body() body: CreateTrainerDto) {
        return this.adminService.createTrainer(body.email, body.password);
    }

    @Get('trainers')
    getAllTrainers() {
        return this.adminService.getAllTrainers();
    }

    @Delete('trainers/:id')
    deleteTrainer(@Param('id') id: string) {
        return this.adminService.deleteTrainer(id);
    }

    @Post('trainers/:id/reset-password')
    resetTrainerPassword(@Param('id') id: string, @Body() body: ResetPasswordDto) {
        return this.adminService.resetTrainerPassword(id, body.newPassword);
    }
}
