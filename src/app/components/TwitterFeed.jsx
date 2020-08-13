import React, { useState } from 'react';
import axios from 'axios';

import { useInterval } from '../hooks/useInterval';

const TwitterFeed = () => {
  /** CONSTANTS */
  const API_URL = 'http://magiclab-twitter-interview.herokuapp.com/piotr-lewandowski';

  /** STATE */
  const [data, setData] = useState([]);
  const [newestTweetId, setNewestTweetId] = useState(0);

  useInterval(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`${API_URL}/api?afterId=${newestTweetId}`);
        const tweets = response.data;

        setNewestTweetId([...tweets].shift().id);
        setData(data => tweets.concat(data));
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  });

  return (
    <>
      <h1>Your feed</h1>
      {data.length > 0 && (
        <ul>
          {data.map(tweet => (
            <li key={tweet.id}>
              {tweet.text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export { TwitterFeed };
