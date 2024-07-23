export const getAllTeas = async () => {
  const response = await fetch(
    'http://localhost:8088/teas?_expand=category&_expand=vendor'
  );
  const teas = await response.json();
  return teas;
};

export const getTeaById = async (teaId) => {
  const response = await fetch(
    `http://localhost:8088/teas/${teaId}?_expand=category&_expand=vendor`
  );
  const tea = await response.json();
  return tea;
};

export const addTea = async (tea) => {
  return await fetch('http://localhost:8088/teas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tea),
  });
};

export const deleteTea = async (teaId) => {
  return await fetch(`http://localhost:8088/teas/${teaId}`, {
    method: 'DELETE',
  });
};

export const changeTea = async (tea) => {
  return await fetch(`http://localhost:8088/teas/${tea.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tea),
  });
};
