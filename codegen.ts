//set up our codegen details
//codegen lets us create the types of our schema automatically
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    //where our schema is located
    schema: "./src/schema.graphql",

    generates: {
        //where to store our types generated
        "./src/types.ts": {
            //which plugins to use 
            plugins: ["typescript", "typescript-resolvers"],
        },
    },
};

export default config;