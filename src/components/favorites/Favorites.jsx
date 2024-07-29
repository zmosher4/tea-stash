import { useEffect, useState } from 'react';
import { changeTea, getAllTeas } from '../../services/teaService';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import './custom.css';

export const Favorites = ({ currentUser }) => {
  const [myTeas, setMyTeas] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchTeas = async () => {
    const allTeas = await getAllTeas();
    const myTeasArr = allTeas.filter((tea) => tea.userId === currentUser.id);
    setMyTeas(myTeasArr);
  };

  useEffect(() => {
    fetchTeas();
  }, [currentUser]);

  useEffect(() => {
    const myFavs = myTeas.filter((tea) => tea.favorite);
    setFavorites(myFavs);
  }, [myTeas]);

  const handleRemove = async (event, tea) => {
    event.preventDefault();
    const copyOfTea = { ...tea };
    copyOfTea.favorite = false;
    await changeTea(copyOfTea);
    fetchTeas();
  };

  return (
    <Container>
      <Row>
        {favorites.map((tea) => (
          <Col key={tea.id} md={4} className="mb-4 mt-4">
            <Card className="h-100 tea">
              <Link to={`/myTeas/${tea.id}`} className="text-decoration-none">
                <Card.Img
                  variant="top"
                  src={tea.imgUrl}
                  className="custom-img"
                  alt={tea.name}
                />
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/myTeas/${tea.id}`}
                    className="text-decoration-none"
                  >
                    {tea.name}
                  </Link>
                </Card.Title>
                <Card.Text>
                  <div>
                    <strong>Price:</strong> ${tea.price}
                  </div>
                  <div>
                    <strong>Type:</strong> {tea.category?.name}
                  </div>
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={(event) => handleRemove(event, tea)}
                >
                  Remove From Favorites
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
