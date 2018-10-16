var prompt = require('prompt');
var cmd = require('node-cmd');

console.log('Which microservice would you like to install?\n1. Create React App\n2. GraphQL\n3. Storybook');

var schema = {
  properties: {
    selectNumber: {
      pattern: /^[1-3]+$/,
      message: 'Please select a number between 1 to 3',
      required: true
    },
    projectName: {
      required: true,
      message: 'Please enter a name for the project. Name must be only letters, spaces, or dashes',
      pattern: /^[a-zA-Z\s\-]+$/
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
        `
          cd ..
          npx create-react-app ${result.projectName}
          cd ${result.projectName}
          git init
          ls
          npm start
        `,
        function(err, data, stderr) {
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
          cd ..
          mkdir ${result.projectName}
          cd ${result.projectName}
          git init
          npm install express express-graphql graphql --save
          cp ../hackathon/graphQLScript.js graphQLScript.js
          killall node
          node graphQLScript.js
        `,
        function(err, data, stderr) {
            console.log('success callback :\n\n', data);
            console.log('Running a GraphQL API server at localhost:4000/graphql');
        }
        );
      break;
    case '3':
      console.log('Storybook');
      break;
    default:
      break;
  }
});
