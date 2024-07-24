import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { editUser, getUserById } from '../../services/userService';

export const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      if (currentUser?.id) {
        const userInfo = await getUserById(currentUser.id);
        setUser(userInfo);
      }
    };
    getUserInfo();
  }, [currentUser]);

  const handleNameChange = (event) => {
    const copy = { ...user };
    copy.name = event.target.value;
    setUser(copy);
  };

  const handleEmailChange = (event) => {
    const copy = { ...user };
    copy.email = event.target.value;
    setUser(copy);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    await editUser(user);
    navigate('/profile');
  };

  return (
    <Container className="mt-5">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSave}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={user.name ? user.name : ''}
            required
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={user.email ? user.email : ''}
            required
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
