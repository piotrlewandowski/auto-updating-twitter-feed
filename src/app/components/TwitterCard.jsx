import React from 'react';
import {
  Card,
  Row,
  Col,
  Figure,
} from 'react-bootstrap';

const TwitterCard = (props) => {
  const { username, image, timeStamp, text } = props;

  const date = new Date(timeStamp);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric', month: 'long', day: '2-digit',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  });
  const [
    { value: month },,{ value: day },,{ value: year },,{ value: hour},,{ value: minute },,{ value: second },,{ value: dayPeriod }
  ] = dateTimeFormat.formatToParts(date);

  return (
    <Card
      border="primary"
      className="mb-2"
    >
      <Card.Body>
        <Row>
          <Col md="auto">
            <Figure>
              <Figure.Image
                alt={username}
                src={image}
              />
            </Figure>
          </Col>
          <Col>
            <Card.Title>{username}</Card.Title>
            <Card.Subtitle>
              {day} {month} {year}, {hour}:{minute}:{second} {dayPeriod.toLowerCase()}
            </Card.Subtitle>
            <Card.Text>{text}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export { TwitterCard };
