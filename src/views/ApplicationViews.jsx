import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem('learning_user');
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<p>hi</p>} />
    </Routes>
  );
};
