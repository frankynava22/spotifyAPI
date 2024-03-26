//allows us to create a new apollo server instance 
import { ApolloServer } from "@apollo/server";
//create a server alone using just apollo server
import { startStandaloneServer } from "@apollo/server/standalone";
//to read our schema in our index.ts file
import { readFile, readFileSync } from "fs";
import path from "path";
//tagged template literal for nice formatting
import { gql } from "graphql-tag";

//we read in the file that has our schema
const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./schema.graphql"), {
        encoding: "utf-8",
    })
);

//we create an instance of apollo server
//lets us use the graphql sandbox for queries and more
async function startApolloServer() {
    //we pass our typeDefs from our schema.graphql file we wrote
    //we are able to do this because it is read through our function above
    const server = new ApolloServer({ typeDefs });

    //we pass the server to our function to create standalone server
    //returns a promise, so we have to await it 
    //we destructure it to get the url as well
    const { url } = await startStandaloneServer(server);

    console.log(`Server is up. Query is at: ${url}`);
}

//call function to start it
startApolloServer();