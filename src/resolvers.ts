export const resolvers = {
    //follow the structure of our Query schema
    Query: {
        //skip first two params
        //we use the context param to share datasource accross all resolvers
        //for this ex, we want to share our spotifyAPI data source
        featuredPlaylists: (_, __, { dataSources }) => {
            //from our datasources
            //we get an instance of SpotifyAPI,
            //and use the method we defined there
            return dataSources.spotifyAPI.getFeaturedPlaylist();
        },
    }
};