import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Patch,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { CoachNotesService } from '../application/coach-notes.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { RoleEnum } from '../../auth/domain/role.enum';

@Controller('coach-notes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoachNotesController {
    constructor(private readonly service: CoachNotesService) { }

    @Post()
    @Roles(RoleEnum.TRAINER, RoleEnum.ADMIN)
    async create(
        @CurrentUser() user: any,
        @Body() body: { clientId: string; content: string },
    ) {
        return this.service.create(user.userId, body.clientId, body.content);
    }

    @Get()
    @Roles(RoleEnum.TRAINER, RoleEnum.ADMIN)
    async findAll(@Query('clientId') clientId: string) {
        if (!clientId) {
            return [];
        }
        return this.service.findAllByClient(clientId);
    }

    @Patch(':id')
    @Roles(RoleEnum.TRAINER, RoleEnum.ADMIN)
    async update(
        @Param('id') id: string,
        @CurrentUser() user: any,
        @Body() body: { content: string },
    ) {
        return this.service.update(id, user.userId, body.content);
    }

    @Delete(':id')
    @Roles(RoleEnum.TRAINER, RoleEnum.ADMIN)
    async delete(@Param('id') id: string, @CurrentUser() user: any) {
        return this.service.delete(id, user.userId);
    }
}
