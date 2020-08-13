import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TwitterFeed = () => {
  const [data, setData] = useState([]);

  const API_URL = 'http://magiclab-twitter-interview.herokuapp.com/piotr-lewandowski/api';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`${API_URL}`);
        setData(result.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

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
