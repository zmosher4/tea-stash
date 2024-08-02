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
import { EditProfile } from '../components/profile/EditProfile';

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localTeaUser = localStorage.getItem('tea_friend');
    const teaUserObject = JSON.parse(localTeaUser);
    setCurrentUser(teaUserObject);
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
          <Route
            path=":teaId"
            element={<TeaDetails currentUser={currentUser} />}
          />
        </Route>
        <Route path="newTea" element={<NewTea currentUser={currentUser} />} />
        <Route path="edit-tea/:teaId" element={<EditTea />} />
        <Route
          path="favorites"
          element={<Favorites currentUser={currentUser} />}
        />
        <Route
          path="profile"
          element={<UserProfile currentUser={currentUser} />}
        />
        <Route
          path="edit-profile"
          element={<EditProfile currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
