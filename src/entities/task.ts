import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType() // TypeGraphQL decorator
@Entity() // TypeORM decorator
export class Task extends BaseEntity {
    @Field() // Expose to GraphQL schema
    @PrimaryGeneratedColumn() // Auto-generated ID column
    id!: number;

    @Field() // Expose to GraphQL schema
    @Column() // Standard column
    name!: string;

    @Field({ nullable: true }) // Expose to GraphQL schema, allow null values
    @Column({ nullable: true }) // Column allows null values
    description?: string;

    @Field() // Expose to GraphQL schema
    @Column({ default: false }) // Column with default value
    completed!: boolean;
}