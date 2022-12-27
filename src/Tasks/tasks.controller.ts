import { Controller, Post, Body, Get, Param, Put, Delete} from '@nestjs/common';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { };

    @Post()
    addTask(
        @Body('description') taskDesc: string,
        @Body('due_date') taskDue: string,
        @Body('assignee') taskAssign: string,
        @Body('status') taskStat: boolean,
        ) 
        {
        const generatedId = this.tasksService.insertTask(
            taskDesc,
            taskDue,
            taskAssign,
            taskStat
        );
        return { id: generatedId };
    }

    @Get()
    getAllTasks() {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    getTask(@Param('id') taskThatId: string) {
        return this.tasksService.getSingleTask(taskThatId);
    }

    @Put(':id')
    updateTask(
        @Param('id') taskId: string,
        @Body('description') taskDesc: string,
        @Body('due_date') taskDue: string,
        @Body('assignee') taskAssign: string,
        @Body('status') taskStat: boolean,
    ) {
        this.tasksService.updateTask(taskId, taskDesc, taskDue, taskAssign, taskStat);
        return null;
    }

    @Delete(':id')
    removeTask(@Param('id') taskId: string) {
        this.tasksService.deleteTask(taskId);
        return null;
    }
}