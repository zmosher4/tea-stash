import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../services/userService';
import { getAllTeas } from '../../services/teaService';
import { Button, Container, Row, Col } from 'react-bootstrap';

export const UserProfile = ({ currentUser }) => {
  const [teas, setTeas] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser?.id) {
        const userInfo = await getUserById(currentUser.id);
        setUser(userInfo);
      }
    };
    fetchUser();
  }, [currentUser]);

  useEffect(() => {
    const setMyTeas = async () => {
      const allTeas = await getAllTeas();
      const myTeas = allTeas.filter((tea) => tea.userId === user.id);
      setTeas(myTeas);
    };
    setMyTeas();
  }, [user]);

  return (
    <Container>
      <h1 className="my-4">My Profile</h1>
      <Row>
        <Col md={6}>
          <div className="mb-3">
            <strong>Name:</strong> {user.name}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="mb-3">
            <strong>Teas in stash:</strong> {teas.length}
          </div>
          <Button variant="primary" onClick={() => navigate('/edit-profile')}>
            Edit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
