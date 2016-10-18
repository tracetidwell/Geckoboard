# -*- coding: utf-8 -*-
"""
Created on Mon Oct 17 17:16:00 2016

@author: Trace
"""

## This program will connect to the Twitter API and return a list of tweets 
## containing the word Geckoboard as well as a list of Twitter followers for
## @geckoboard. The total number of mentions for the day and the total number
## of followers are sent to a Geckoboard dashboard via their API.


## Import the execute_js function from the Naked Frameworks Shell library
## We will use this function to execute the JavaScript function that sends
## the Twitter data to Geckoboard.
from Naked.toolshed.shell import execute_js

## Import the Twitter library
import twitter

## Import the datetime library to get tweets for today
import datetime

## Create an instance of the Twitter API 
api = twitter.Api(consumer_key='cpbEnrZDyEgKru5MjsalZpuaK', 
                  consumer_secret='vLoxRtkpyAdWxkp3IGZdB3ay8u5arsaIJEUeY6RkBm824QdNDI',
                  access_token_key='732265260183228417-EyVi0GOOZth4Zci7SlaYxtFHWXydlyT',
                  access_token_secret='1oUdLnRImsgzajYZxz1ABoBpUB8euauFsadIEBt16YAB9')
                  
## Use date.time to get yesterday's date
today = datetime.date.today()
yesterday = today - datetime.timedelta(days=1)
                  
## Get a list of all mentions of @geckoboard, #geckoboard, and geckoboard
mentions = api.GetSearch(term='geckoboard', since=yesterday, until=today)               

## Get a count of Geckoboard mentions by taking the length of the mentions list
mentions_count = len(mentions)

## The gb_mention_count.js file requires two arguments, the number of 
## mentions and today's date
args = '--x=' + str(mentions_count) + ' --y=' + str(yesterday)

## Call the execute_js function and pass it the gb_mentions_count.js file
## along with the arguments.
execute_js('gb_mention_count.js', args)

##  Get a list of followers for Geckoboard
followers = api.GetFollowerIDs(screen_name='geckoboard')

## Get a count of followers by taking the length of the followers list
followers_count = len(followers)

## The geckoboard_count.js file requires one argument, the number of 
## Twitter followers
arg = '--x=' + str(followers_count)

## Call the execute_js function and pass it the gb_follower_count.js file
## along with the argument.
execute_js('gb_follower_count.js', arg)
