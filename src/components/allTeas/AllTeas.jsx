import { useEffect, useState } from 'react';
import { getAllTeas } from '../../services/teaService';
import { getAllCategories } from '../../services/categoryService';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';

export const AllTeas = ({ currentUser }) => {
  const [userTeas, setUserTeas] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchTeas = async () => {
    const teaArr = await getAllTeas();
    const filteredTeas = teaArr.filter((tea) => tea.userId === currentUser.id);
    setUserTeas(filteredTeas);
  };

  const fetchCategories = async () => {
    const catArr = await getAllCategories();
    setCategories(catArr);
  };

  useEffect(() => {
    fetchTeas();
    fetchCategories();
  }, [currentUser]);

  return (
    <Container>
      <Row>
        {userTeas.map((tea) => (
          <Col key={tea.id} md={4} className="mb-4 mt-4">
            <Card className="h-100">
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
                    <strong>Type:</strong>{' '}
                    {
                      categories.find(
                        (category) => category.id === tea.categoryId
                      )?.name
                    }
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
