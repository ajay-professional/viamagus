export class Tasks {
    constructor(
      public id: string,
      public description: string,
      public due_date: string,
      public assignee: string,
      public status: boolean
    ) {}
}