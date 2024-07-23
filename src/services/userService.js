export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch('http://localhost:8088/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getUserById = async (userId) => {
  const response = await fetch(`http://localhost:8088/users/${userId}`);
  const user = await response.json();
  return user;
};

export const editUser = async (user) => {
  return await fetch(`http://localhost:8088/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};
