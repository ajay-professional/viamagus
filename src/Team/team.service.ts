import { Injectable, NotFoundException } from '@nestjs/common';

import { Team } from './team.model';

@Injectable()
export class TeamService {
    private team: Team[] = [];

    insertTeam(name: string, email: string, taskId: string) {
        let teamId = Math.random().toString();
        const newTeam = new Team(teamId, name, email, taskId);
        this.team.push(newTeam);
        return teamId;
    }

    getTeam() {
        return [...this.team];
    }

    updateTeam(teamThatId: string,name: string, email: string, taskId: string) {
        const [product, index] = this.findTeam(teamThatId);
        const updatedTeam = { ...product };
        if (name) {
            updatedTeam.name = name;
        }
        if (email) {
            updatedTeam.email = email;
        }
        if (taskId) {
            updatedTeam.taskId = taskId;
        }
        this.team[index] = updatedTeam;
    }

    private findTeam(id: string): [Team, number] {
        const productIndex = this.team.findIndex(prod => prod.id === id);
        const product = this.team[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
}