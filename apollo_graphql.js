// ---------------------------------GQL OVERVIEW-------------------------------
// * General overview of request
//     > The client sends a request to the server
//     > the Server parses it, turns it into an abtract syntax tree,
//     > validates it, and if all good, it walks down the tree
//     > otherwise it returns the errors to the client
//     > The request, is the exact same shape as the query

// * STEPS 
//     > When working serverside with graphql,
//         1. We first get the client GraphQL query 
//         2. We then validate it against our schema 
//         3. We Then populate the schema fields 
//         4. We return the populated fields as a response 

// * Basic Knowledge
//     > the GraphQL operation is what the client sends to the graphql server 
//         > it can be either a:
//             1. Subscription => listens for live, streaming data 
//             2. Mutation => changes data
//             3. Query => reads data

// * Descriptions 
//     > We can add comments that the graphql users can see about our schema/resolvers 
//         > it is denoted two ways 
//             1. "Like This"
//             2. """ Or like this for multi-line"""

// * Different Types 
//     > GraphQL Code Generator reads in a graphql schema and generates typescript types we can use 

// ------------------------------APOLLO OVERVIEW-------------------------------
// *  

// ------------------------------------SCHEMA----------------------------------
// * Overview:
//     > The schema is the blueprint
//     > it is what the actual data will model 

// * Basic Knowledge 
//     > The schema is written in:
//         > Schema Definition Language (SDL)

//     > It is a collection of object types that contain fields and their types 
//         > Objects are written PascalCase
//         > Fields are written camelCase

//         ex:
//             type Artist {
//                 //ID is a type that is unique
//                 id: ID
//                 //our name is of type String
//                 name: String 
//                 birthYear: Int 
//                 //this is a field albumNames, which is an list of strings
//                 albumNames: [String]
//             }

// * Nullability
//     > Adding a '!' after the field type, will tell graphql this field cannot be NULL 
//     > IT CAN BE EMTPY, BUT NOT NULL 
//         ex:
//             id: ID!

//         ex2: 
//             type Query{
//                 //we are saying that the array cannot be null, but it can be empty
//                 //then we are saying the playlist can be empty, but not null as well
//                 featuredPlaylist: [Playlist!]!
//             }

// * Relationship
//     > If we want to create a relationship between two object types, we can 
//         ex:
//             type Artist{
//                 id: ID!
//                 name: String!
//                 //our field, signedTo, is of type, RecordLabel
//                 signedTo: RecordLabel
//             }

//             type RecordLabel {
//                 id: ID!
//                 name: String!
//                 yearFounded: Int
//             }

// * Query 
//     > Lets us get information from our defined custom types 
//     > This tells the client, what data it can query!!!!
//     > It is the entry point to our schema
    
//     ex:
//         Query {
//             //when we use featuredPlaylist as a query,
//             //we get a list of objects of type Playlist
//             //this means each playlist type will have the fields of Playlist
//             featuredPlaylist: [Playlist!]
//         }

//         type Playlist {
//             id: ID!
//             ... // other fields
//         }
// --------------------------------------RESOLVERS-----------------------------
// * Overview:
//     > retrieves data for a specific field 
//         > it is the same name as the field it gets data for 
//     > resolvers resolve the schema we defined, basically says where/how we get the info 
//     > A resolver can get data from:
//         1. Database
//         2. Rest API
//         3. Web hook 
//         4. etc...
//         > all at the same time 
//         > these are called DATA SOURCES

//     > responsible for populating a single field in a schema 

    
// * Parameters
//     > A resolver has four parameters
//         1. parent -> returns the fields parents value
//         2. args -> contains all graphql arguments provided by graphql operation
//         3. contextValue -> object that is shared accross all resolvers:
//             - authentication information 
//             - database connection 
//             - RESTDataSource
//         4. info 
//             ex:
//                 featuredPlaylists: (parent, args, contextValue, info) => {}

//             > To skip params, we add an underscore
//             > for ex, if we only want contextValue 

//                 ex:
//                     export const resolvers = {
//                         Query{
//                             featuredPlaylist: (_, __, {dataSources}) => {}
//                         }
//                     }
        
// ------------------------------------DATA SOURCES-----------------------------
// > using RestApis as data sources is done using:
//     > npm install @apollo/datasource-rest

// * Using RESTDATASource
//     > When working with a restful api, we import and inherit from this class 
//         ex:
//             import {RESTDATASource} from "@apollo/datasource-rest"

//             export class SpotifyAPI extends RESTDATASource{//code}

//     > This class provides helper methods 
//         1. GET Request 
//             - this.get(//api endpoint)
            
//             ex:
//                 export class apiClass extends RESTDATASource {
//                     // base url goes here
//                     //must end in /
//                     baseURL = "https://apiendpoint/"

//                     //create method and use helper method to get featured playlists
//                     getFeaturedPlaylists(){this.get("/browse/featured-playlists")};
//                 }