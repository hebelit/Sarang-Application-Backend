import { Field, InputType } from "type-graphql";

@InputType() // TypeGraphQL decorator
export class createTaskInput {
  

    @Field() // Expose to GraphQL schema
    name!: string;

    @Field({ nullable: true }) // Expose to GraphQL schema, allow null values
    description?: string;

   
}