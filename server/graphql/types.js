const { GraphQLString,GraphQLID, GraphQLObjectType} = require('graphql');

const ClubType = new GraphQLObjectType({
    name: "Club",
    fields: ()=>({
        id: {type: GraphQLID},
        club: {type: GraphQLString},
        league: {type: GraphQLString}
    })
});

module.exports = {ClubType};