const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const { ClubType } = require('../types');
const Club = require('../../models/club');

const clubs = {
    name: "Clubs",
    type: GraphQLList(ClubType),
    resolve: async (parent, args) => {
        const clubs = await Club.find();
        return clubs;
    }
};

const singleClub = {
    name: "singleClub",
    type: ClubType,
    args: {id: {type: GraphQLID}},
    resolve: async (parent, args) => {
        const club = await Club.findById(args.id);
        // console.log(clubs);
        return club;
    }
};

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        clubs,
        singleClub
    }
});

module.exports = RootQuery;