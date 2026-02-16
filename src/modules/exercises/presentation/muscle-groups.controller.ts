import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetMuscleGroupsUseCase } from '../application/get-muscle-groups.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('muscle-groups')
@UseGuards(JwtAuthGuard)
export class MuscleGroupsController {
    constructor(private readonly getMuscleGroupsUseCase: GetMuscleGroupsUseCase) { }

    @Get()
    async findAll() {
        return this.getMuscleGroupsUseCase.execute();
    }
}
