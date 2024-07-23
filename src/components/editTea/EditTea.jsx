import { useNavigate, useParams } from 'react-router-dom';
import { changeTea, getTeaById } from '../../services/teaService';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/categoryService';
import { getAllVendors } from '../../services/vendorService';

export const EditTea = () => {
  const [tea, setTea] = useState({
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
  const { teaId } = useParams();
  const navigate = useNavigate();

  const fetchTea = async () => {
    const teaRes = await getTeaById(teaId);
    setTea(teaRes);
  };

  const fetchCategories = async () => {
    const catArr = await getAllCategories();
    setCategories(catArr);
  };
  const fetchVendors = async () => {
    const vendArr = await getAllVendors();
    setVendors(vendArr);
  };
  useEffect(() => {
    fetchTea();
    fetchCategories();
    fetchVendors();
  }, [teaId]);

  const handleCategorySelection = (event) => {
    const copy = { ...tea };
    copy.categoryId = parseInt(event.target.value);
    setTea(copy);
  };

  const handleNameSelection = (event) => {
    const copy = { ...tea };
    copy.name = event.target.value;
    setTea(copy);
  };

  const handleNotes = (event) => {
    const copy = { ...tea };
    copy.notes = event.target.value;
    setTea(copy);
  };

  const handlePrice = (event) => {
    const copy = { ...tea };
    copy.price = parseFloat(event.target.value);
    setTea(copy);
  };

  const handleVendorSelection = (event) => {
    const copy = { ...tea };
    copy.vendorId = parseInt(event.target.value);
    setTea(copy);
  };

  const handleFavorite = (event) => {
    const copy = { ...tea };
    copy.favorite = event.target.checked;
    setTea(copy);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    await changeTea(tea);

    navigate('/myTeas');
  };

  return (
    <form>
      <h2>Edit Tea</h2>
      <fieldset>
        <label>Choose a category </label>
        <select
          onChange={handleCategorySelection}
          value={tea.categoryId}
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
          value={tea.vendorId}
          required
          name="vendor"
          id="vendor"
        >
          <option value="">All Vendors</option>
          {vendors?.map((vendor) => {
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
          value={tea.name}
          required
          onChange={handleNameSelection}
        />
      </fieldset>
      <fieldset>
        <label>Price: </label>
        <input
          type="number"
          value={tea.price}
          required
          onChange={handlePrice}
        />
      </fieldset>
      <fieldset>
        <label>Tasting Notes: </label>
        <input type="text" value={tea.notes} required onChange={handleNotes} />
      </fieldset>
      <fieldset>
        <label>Favorite: </label>
        <input
          type="checkbox"
          checked={tea.favorite}
          required
          onChange={handleFavorite}
        />
      </fieldset>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};
