var prompt = require('prompt');
var cmd = require('node-cmd');

console.log('Which microservice would you like to install?\n1. Create React App\n2. GraphQL\n3. React Native');

var schema = {
  properties: {
    selectNumber: {
      pattern: /^[1-3]+$/,
      message: 'Please select a number between 1 to 3',
      required: true
    }
  }
};

//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: email, password
//
prompt.get(schema, function (err, result) {
  //
  // Log the results.
  //
  console.log('You have selected:');
  console.log('  selectNumber: ' + result.selectNumber);
  switch(result.selectNumber) {
    case '1':
      console.log('Create React App');
      cmd.get(
        'pwd',
        function(err, data, stderr){
            console.log('the current working dir is : ',data)
        }
      );
      cmd.get(
        `
          npx create-react-app my-app
          cd my-app
          ls
          npm start
        `,
        function(err, data, stderr){
          if (!err) {
            console.log('the node-cmd cloned dir contains these files :\n\n', data);
          } else {
            console.log('error', err);
          }
        }
      );
      break;
    case '2':
      console.log('GraphQL\n\n');
      cmd.get(
        `
          npm install express express-graphql graphql --save
        `,
        function(err, data, stderr) {
            console.log('success callback :\n\n', data);
            var express = require('express');
            var graphqlHTTP = require('express-graphql');
            var { buildSchema } = require('graphql');

            // Construct a schema, using GraphQL schema language
            var schema = buildSchema(`
            type Query {
                hello: String
            }
            `);

            // The root provides a resolver function for each API endpoint
            var root = {
            hello: () => {
                return 'Hello world!';
            },
            };

            var app = express();
            app.use('/graphql', graphqlHTTP({
                schema: schema,
                rootValue: root,
                graphiql: true,
            }));
            app.listen(4000);
            console.log('Running a GraphQL API server at localhost:4000/graphql');
        }
        );
      break;
    case '3':
      console.log('React Native');
      break;
    default:
      break;
  }
});
