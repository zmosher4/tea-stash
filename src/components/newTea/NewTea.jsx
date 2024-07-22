import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/categoryService';
import { getAllVendors } from '../../services/vendorService';
import { addTea } from '../../services/teaService';
import { useNavigate } from 'react-router-dom';

export const NewTea = ({ currentUser }) => {
  const [createdTea, setCreatedTea] = useState({
    name: '',
    price: '',
    datePurchased: 0,
    notes: '',
    categoryId: 0,
    userId: 0,
    vendorId: 0,
    favorite: false,
  });
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const catArr = await getAllCategories();
    setCategories(catArr);
  };
  const fetchVendors = async () => {
    const vendArr = await getAllVendors();
    setVendors(vendArr);
  };

  useEffect(() => {
    fetchCategories();
    fetchVendors();
  }, []);

  const handleCategorySelection = (event) => {
    const copy = { ...createdTea };
    copy.categoryId = parseInt(event.target.value);
    setCreatedTea(copy);
  };

  const handleNameSelection = (event) => {
    const copy = { ...createdTea };
    copy.name = event.target.value;
    setCreatedTea(copy);
  };

  const handleNotes = (event) => {
    const copy = { ...createdTea };
    copy.notes = event.target.value;
    setCreatedTea(copy);
  };

  const handlePrice = (event) => {
    const copy = { ...createdTea };
    copy.price = parseInt(event.target.value);
    setCreatedTea(copy);
  };

  const handleVendorSelection = (event) => {
    const copy = { ...createdTea };
    copy.vendorId = parseInt(event.target.value);
    setCreatedTea(copy);
  };

  const handleFavorite = (event) => {
    const copy = { ...createdTea };
    copy.favorite = event.target.checked;
    setCreatedTea(copy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTea = {
      ...createdTea,
      datePurchased: new Date(),
      userId: currentUser.id,
    };

    await addTea(newTea);

    navigate('/myTeas');
  };

  return (
    <form>
      <h2>New Tea</h2>
      <fieldset>
        <label>Choose a category </label>
        <select
          onChange={handleCategorySelection}
          value={createdTea.categoryId}
          required
          name="category"
          id="category"
        >
          <option value="">All Categories</option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </fieldset>
      <fieldset>
        <label>Choose a vendor: </label>
        <select
          onChange={handleVendorSelection}
          value={createdTea.vendorId}
          required
          name="vendor"
          id="vendor"
        >
          <option value="">All Vendors</option>
          {vendors.map((vendor) => {
            return (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            );
          })}
        </select>
      </fieldset>
      <fieldset>
        <label>Name of Tea: </label>
        <input
          type="text"
          value={createdTea.name}
          required
          onChange={handleNameSelection}
        />
      </fieldset>
      <fieldset>
        <label>Price: </label>
        <input
          type="number"
          value={createdTea.price}
          required
          onChange={handlePrice}
        />
      </fieldset>
      <fieldset>
        <label>Tasting Notes: </label>
        <input
          type="text"
          value={createdTea.notes}
          required
          onChange={handleNotes}
        />
      </fieldset>
      <fieldset>
        <label>Favorite: </label>
        <input
          type="checkbox"
          value={createdTea.favorite}
          required
          onChange={handleFavorite}
        />
      </fieldset>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};
