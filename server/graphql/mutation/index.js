const { GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');
const { ClubType } = require('../types');
const Club = require('../../models/club');

const addClub={
    name:"addClub",
    type:ClubType,
    args: {club: {type:GraphQLString}, league:{type:GraphQLString}},
    resolve:async(parent, args)=>{
        const club = new Club({ club: args.club, league: args.league });
        const new_club = await club.save();
        return new_club;
    }
}

const deleteClub = {
    name: "deleteClub",
    type: ClubType,
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args) => {
        const deleted_club = await Club.findByIdAndDelete(args.id);
        return deleted_club;
    }
}


const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        addClub,
        deleteClub
    }
});

module.exports = RootMutation;