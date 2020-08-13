import React, { useState } from 'react';
import axios from 'axios';
import { Container, Jumbotron } from 'react-bootstrap';

import { useInterval } from '../hooks/useInterval';
import { TwitterCard } from './TwitterCard';

const TwitterFeed = () => {
  /** CONSTANTS */
  const API_URL = 'http://magiclab-twitter-interview.herokuapp.com/piotr-lewandowski';

  /** STATE */
  const [tweets, setTweets] = useState([]);
  const [newestTweetId, setNewestTweetId] = useState(0);

  useInterval(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`${API_URL}/api?afterId=${newestTweetId}`);
        const newTweets = response.data;

        setNewestTweetId([...newTweets].shift().id);
        setTweets(tweets => newTweets.concat(tweets));
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  });

  return (
    <Container>
      <Jumbotron>
        <h1>Auto updating Twitter feed</h1>
      </Jumbotron>
      {tweets.length > 0 && (
        <>
          {tweets.map(tweet => {
            const { id, ...restProps } = tweet;

            return (
              <div key={id}>tweet
                <TwitterCard {...restProps} />
              </div>
            )
          })}
        </>
      )}
    </Container>
  );
};

export { TwitterFeed };
