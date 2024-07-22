import { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { MyNav } from '../components/nav/MyNav';
import { Welcome } from '../components/welcome/Welcome';
import { AllTeas } from '../components/allTeas/AllTeas';
import { TeaDetails } from '../components/teaDetails/TeaDetails';
import { NewTea } from '../components/newTea/NewTea';
import { Favorites } from '../components/favorites/Favorites';
import { UserProfile } from '../components/profile/UserProfile';
import { EditTea } from '../components/editTea/EditTea';

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem('tea_friend');
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <MyNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="myTeas">
          <Route index element={<AllTeas currentUser={currentUser} />} />
          <Route path=":teaId" element={<TeaDetails />} />
        </Route>
        <Route path="newTea" element={<NewTea currentUser={currentUser} />} />
        <Route path="edit-tea/:teaId" element={<EditTea />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};
