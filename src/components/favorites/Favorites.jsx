import { useEffect, useState } from 'react';
import { changeTea, getAllTeas } from '../../services/teaService';
import { Link } from 'react-router-dom';

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

  return favorites.map((tea) => {
    return (
      <div key={tea.id}>
        <div>
          <Link to={`/myTeas/${tea.id}`}>Tea: {tea.name}</Link>
        </div>
        <div>Price: ${tea.price}</div>
        <div>
          <div>Type: {tea.category?.name}</div>
        </div>
        <button onClick={() => handleRemove(event, tea)}>
          Remove From Favorites
        </button>
      </div>
    );
  });
};
