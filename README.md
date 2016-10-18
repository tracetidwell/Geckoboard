# Geckoboard
Geckoboard Support Engineer Challenge

In this repository you'll find python-twitter.py, gb_mention_count.js, and gb_follower_count.js. These contain the code that pulls data from Twitter and sends it to Geckoboard. The code is fairly self-explanatory, but I'll walk through it here very quickly.

## python-twitter.py
* Import the libraries needed. Twitter allows me to connect to the Twitter API, execute_js allows me execute JavaScript files from with the Python environment, and datetime gives me today's date
* Create an instance of the Twitter API using the login credentials given me by Twitter
* Using datetime, get today's date and  yesterday's date, which will be using for searching tweets
* Use the GetSearch method to search Twitter for tweets containing the word Geckoboard from yesterday
* Count the tweets and store it as a number
* Create the arguments that need to be passed the gb_mention_count.js file
* Execute the gb_mention_file with the arguments
* Use the GetSFollowerIDs method to get the User IDs of the followers of @geckoboard
* Count the followers and store it as a number
* Create the argument that need to be passed the gb_follower_count.js file
* Execute the gb_follower_file with the argument

## gb_mention_count
* Use the yargs package to parse the argument
* Assign the variables mention_count and date from the passed arguments
* Use the API key from Geckoboard to connect
* Create the twitter_mentions dataset with the mentions and date fields
* Post the mentions_count and date to the dataset (this appends the dataset)

## gb_follower_count
* Use the yargs package to parse the argument
* Assign the variable follower_count from the passed argument
* Use the API key from Geckoboard to connect
* Create the twitter_followers dataset with the followers
* Put the followers_count to the dataset (this overwrites the dataset)

I also automated this process by scheudling a task with Task Scheduler on my Windows machine. It will run at 12:01 am each day, so that the previous day's totals are there at the start of each day. I'm sure there some things that could be done to clean this up. I probably could have combined the two JavaScript files into one, and might could have gotten everything into the Python file. All in all, though, I am pretty happy with the final result.
