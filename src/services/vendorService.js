export const getAllVendors = async () => {
  const response = await fetch('http://localhost:8088/vendors');
  const vendors = await response.json();
  return vendors;
};
