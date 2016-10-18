// Use the yargs package for argument parsing
var argv = require('yargs').argv;

// From the CLI, we input the follower count argument when calling the script
// This argument is passed from the python-twitter.py script
var mention_count = argv.x;
var dates = argv.y;

// This is all from the Geckoboard documentation, so I'm not going to 
// explain it all. The only difference is the findOrCreate function
var API_KEY = '438a0d1a969170f404b792cf5ce760f4';

var gb = require('geckoboard')(
  API_KEY
);

gb.datasets.findOrCreate(
  {
    id: 'twitter_mentions',
    fields: {
      mentions: {
        type: 'number',
        name: 'Number of Mentions'
      },
      date: {
        type: 'date',
        name: 'Date'
      }
    }
  },
  function (err, dataset) {
    if (err) {
      console.error(err);
      return;
    }

    dataset.post(
      [
        { mentions:mention_count, date:dates }
      ],
      { delete_by: 'date'},
      function (err) {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Dataset created and data added');
      }
    );
  }
);