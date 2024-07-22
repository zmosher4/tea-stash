export const getAllTeas = async () => {
  const response = await fetch('http://localhost:8088/teas');
  const teas = await response.json();
  return teas;
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
