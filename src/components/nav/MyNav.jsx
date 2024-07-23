import { Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

export const MyNav = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto w-100 justify-content-around">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="myTeas">
              My Teas
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="newTea">
              Add A Tea
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="profile">
              My Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="favorites">
              Favorites
            </Nav.Link>
          </Nav.Item>
          {localStorage.getItem('tea_friend') ? (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="login"
                onClick={() => {
                  localStorage.removeItem('tea_friend');
                  navigate('/', { replace: true });
                }}
              >
                Logout
              </Nav.Link>
            </Nav.Item>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
