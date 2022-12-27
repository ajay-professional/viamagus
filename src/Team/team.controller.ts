import { Controller, Post, Body, Get, Param, Put, Delete} from '@nestjs/common';

import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) { };

    @Post()
    addTeam(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('taskId') taskId: string,
        ) 
        {
        const generatedId = this.teamService.insertTeam(
            name,
            email,
            taskId
        );
        return { id: generatedId };
    }

    @Get()
    getAllTeam() {
        return this.teamService.getTeam();
    }

    @Put(':id')
    updateTeam(
        @Param('id') teamId: string,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('taskId') taskId: string,
    ) {
        this.teamService.updateTeam(teamId, name, email, taskId);
        return null;
    }
}