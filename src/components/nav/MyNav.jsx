import { Link } from 'react-router-dom';
import './MyNav.css';

export const MyNav = () => {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">home</Link>
      </li>
      <li className="navbar-item">
        <Link to="myTeas">My Teas</Link>
      </li>
      <li className="navbar-item">
        <Link to="newTea">Add A Tea</Link>
      </li>
      <li className="navbar-item">
        <Link to="profile">My Profile</Link>
      </li>
      <li className="navbar-item">
        <Link to="favorites">Favorites</Link>
      </li>
      {localStorage.getItem('tea_friend') ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to="login"
            onClick={() => {
              localStorage.removeItem('tea_friend');
              navigate('/', { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ''
      )}
    </ul>
  );
};
