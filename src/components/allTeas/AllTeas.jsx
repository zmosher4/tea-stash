import { useEffect, useState } from 'react';
import { getAllTeas } from '../../services/teaService';
import { getAllCategories } from '../../services/categoryService';
import { Link } from 'react-router-dom';

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

  return userTeas.map((tea) => {
    return (
      <div key={tea.id}>
        <div>
          <Link to={`/myTeas/${tea.id}`}>Tea: {tea.name}</Link>
        </div>
        <div>Price: ${tea.price}</div>
        <div>
          <div>
            Type:{' '}
            {
              categories.find((category) => category.id === tea.categoryId)
                ?.name
            }{' '}
          </div>
        </div>
      </div>
    );
  });
};
