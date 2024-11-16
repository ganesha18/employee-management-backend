const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');
const typeDefs = require('./src/schema'); // GraphQL schema
const employeeResolvers = require('./src/resolvers/employeeResolver'); // Resolvers
const cors = require('cors');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// JWT Authentication Strategy
passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (jwt_payload, done) => {
      return done(null, jwt_payload);
    }
  )
);

app.use(cors());
app.use(passport.initialize());

// Apollo Server Setup (Use async/await)
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: employeeResolvers, // Resolvers for GraphQL
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      let user = null;
      if (token) {
        try {
          user = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        } catch (err) {
          console.log('Invalid token', err);
        }
      }
      return { user };
    },
  });

  // Start the Apollo server
  await server.start();
  server.applyMiddleware({ app });

  // Sync the database and start the server
  sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}${server.graphqlPath}`);
    });
  });
}

startServer().catch((err) => {
  console.error('Failed to start the server:', err);
});
