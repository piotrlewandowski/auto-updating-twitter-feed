import React, { useState } from 'react';
import axios from 'axios';
import { Container, Jumbotron, Card, Row, Col, Figure } from 'react-bootstrap';

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
    <Container>
      <Jumbotron>
        <h1>Auto updating Twitter feed</h1>
      </Jumbotron>
      {data.length > 0 && (
        <>
          {data.map(tweet => (
            <Card
              key={tweet.id}
              border="primary"
              className="mb-2"
            >
              <Card.Body>
                <Row>
                  <Col md="auto">
                    <Figure>
                      <Figure.Image
                        alt={tweet.username}
                        src={tweet.image}
                      />
                    </Figure>
                  </Col>
                  <Col>
                    <Card.Title>{tweet.username}</Card.Title>
                    <Card.Text>{tweet.text}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export { TwitterFeed };
