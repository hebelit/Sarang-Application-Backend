import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Task } from "../entities/task"; // Adjust path as necessary
import { createTaskInput } from "../types/task";

@Resolver()
export class TaskResolver {
    // Query to fetch all tasks
    @Query(() => [Task])
    async getTasks() {
        return await Task.find();
    }

    // Mutation to create a new task
    @Mutation(() => Task)
    async createTask(
        @Arg("data") data: createTaskInput,
    
    ): Promise<Task> {
        
        const task = Task.create({ 
            ...data,
        });
        await task.save();
        await console.log("task created")
        return task;
    }

    // Mutation to delete a task by ID
    @Mutation(() => Boolean)
    async deleteTask(@Arg("id") id: number): Promise<boolean> {
        const task = await Task.findOne({ where: { id } });
        if (!task) {
            throw new Error("Task not found");
        }
        await Task.remove(task);
        return true;
    }

    // Mutation to edit a task by ID
    @Mutation(() => Task)
    async editTask(
        @Arg("id") id: number,
        @Arg("name", { nullable: true }) name?: string,
        @Arg("description", { nullable: true }) description?: string,
    ): Promise<Task> {
        const task = await Task.findOne({ where: { id } });
        if (!task) {
            throw new Error("Task not found");
        }

        if (name !== undefined) {
            task.name = name;
        }
        if (description !== undefined) {
            task.description = description;
        }
            task.completed=false
        await task.save();
        return task;
    }

    // Mutation to mark a task as complete
    @Mutation(() => Task)
    async markTaskComplete(@Arg("id") id: number): Promise<Task> {
        const task = await Task.findOne({ where: { id } });
        if (!task) {
            throw new Error("Task not found");
        }
        task.completed = true;
        const result = await task.save();
        

        return result;
    }

    // Mutation to mark a task as not complete
    @Mutation(() => Task)
    async markTaskNotComplete(@Arg("id") id: number): Promise<Task> {
        const task = await Task.findOne({ where: { id } });
        if (!task) {
            throw new Error("Task not found");
        }
        task.completed = false;
        await task.save();

        return task;
    }
}