const { ApolloServer, gql } = require('apollo-server-koa')
const fetchLeagueTable = require('../malmokorpen/fetchLeagueTable')
const fetchMatches = require('../malmokorpen/fetchMatches')
const fetchMatchesForTeam = require('../malmokorpen/fetchMatchesForTeam')

const typeDefs = gql`
  type Table {
    rows: [TableRow]
  }

  type TableRow {
    teamId: Int
    position: Int
    name: String
    played: Int
    won: Int
    draw: Int
    lost: Int
    scored: Int
    conceded: Int
    goalDifference: Int
    points: Int
  }

  type Match {
    date: String
    teamA: Team
    teamB: Team
    result: MatchResult
  }

  type MatchResult {
    teamAScore: Int
    teamBScore: Int
  }

  type Team {
    id: Int
    name: String
  }

  type Query {
    getTable(leagueId: Int!): Table
    getMatches(leagueId: Int!): [Match]
    getTeamMatches(leagueId: Int!, teamId: Int!): [Match]
  }
`

const parseMatch = match => ({
  date: match.activity.startTime,
  teamA: {
    id: match.teams[0].id,
    name: match.teams[0].name
  },
  teamB: {
    id: match.teams[1].id,
    name: match.teams[1].name
  },
  result: !match.result
    ? null
    : {
        teamAScore: match.result[0].result,
        teamBScore: match.result[1].result
      }
})

const resolvers = {
  Query: {
    getTable: async (_, { leagueId }) => {
      console.log('getTable', { leagueId })
      const table = await fetchLeagueTable(leagueId)
      return table
    },

    getMatches: async (_, { leagueId }) => {
      console.log('getMatches', { leagueId })
      const matches = await fetchMatches(leagueId)
      return matches.map(parseMatch)
    },

    getTeamMatches: async (_, { leagueId, teamId }) => {
      console.log('getTeamMatches', { leagueId, teamId })
      const matches = await fetchMatchesForTeam(leagueId, teamId)
      return matches.map(parseMatch)
    }
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

module.exports = apolloServer
