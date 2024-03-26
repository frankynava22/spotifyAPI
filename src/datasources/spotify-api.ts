//we import this class to use restful apis as our data source
import { RESTDataSource } from "@apollo/datasource-rest";

//we inherit from  this class 
//then we export it for use
export class SpotifyAPI extends RESTDataSource {
    //we assign our base url for our spotify api
    //make sure it ends in a / to append paths to it
    baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/"

    //create a method to get featured playlists
    //we get the api endpoint from swagger, aka the documentation of the lite api
    async getFeaturedPlaylist() {
        //we use a helper 
        //from our swagger json object we saw, we get an objecct of playlists
        //which has an object of items
        //we specify the type of the items to any for now
        const response = await this.get<{ playlists: { items: any[] } }>("/browse/featured-playlists");

        //in our response, which is a giant json file,
        //the one ? means its null and it results in undefined
        //we get the playlist object and then in this,
        //we get the item object
        //if the left is undefined, we return an empty array for no error
        return response?.playlists?.items ?? [];
    }

}