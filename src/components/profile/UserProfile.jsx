import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../services/userService';
import { getAllTeas } from '../../services/teaService';

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
    <>
      <h1>my profile</h1>
      <div>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Teas in stash: {teas.length}</div>
        <button onClick={() => navigate('/edit-profile')}>Edit</button>
      </div>
    </>
  );
};
