import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <form>
      <h2>Edit Profile</h2>
      <fieldset>
        <label>Name: </label>
        <input
          type="text"
          value={user.name ? user.name : ''}
          required
          onChange={handleNameChange}
        />
      </fieldset>
      <fieldset>
        <label>Email: </label>
        <input
          type="text"
          value={user.email ? user.email : ''}
          required
          onChange={handleEmailChange}
        />
      </fieldset>
      <button onClick={handleSave}>Save Changes</button>
    </form>
  );
};
