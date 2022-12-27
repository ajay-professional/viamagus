import { Injectable, NotFoundException } from '@nestjs/common';

import { Tasks } from './tasks.model';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    insertTask(description: string, due_date: string, assignee: string, status: boolean) {
        let taskId = Math.random().toString();
        const newTask = new Tasks(taskId, description, due_date, assignee, status);
        this.tasks.push(newTask);
        return taskId;
    }

    getTasks() {
        return [...this.tasks];
    }

    getSingleTask(taskThatId: string) {
        const task = this.findTask(taskThatId)[0];
        return { ...task };
    }

    updateTask(taskThatId: string, description: string, due_date: string, assignee: string, status: boolean) {
        const [product, index] = this.findTask(taskThatId);
        const updatedTask = { ...product };
        if (description) {
            updatedTask.description = description;
        }
        if (due_date) {
            updatedTask.due_date = due_date;
        }
        if (assignee) {
            updatedTask.assignee = assignee;
        }
        this.tasks[index] = updatedTask;
    }

    deleteTask(taskThatId: string) {
        const index = this.findTask(taskThatId)[1];
        this.tasks.splice(index, 1);
    }

    private findTask(id: string): [Tasks, number] {
        const productIndex = this.tasks.findIndex(prod => prod.id === id);
        const product = this.tasks[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
}