import { useNavigate, useParams } from 'react-router-dom';
import { changeTea, getTeaById } from '../../services/teaService';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/categoryService';
import { getAllVendors } from '../../services/vendorService';

import { Container, Form, Button } from 'react-bootstrap';

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
    <Container>
      <h2 className="my-4">Edit Tea</h2>
      <Form onSubmit={handleSubmit}>
        {/* Category Selection */}
        <Form.Group controlId="category" className="mb-3">
          <Form.Label>Choose a category</Form.Label>
          <Form.Control
            as="select"
            value={tea.categoryId}
            onChange={handleCategorySelection}
            required
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Vendor Selection */}
        <Form.Group controlId="vendor" className="mb-3">
          <Form.Label>Choose a vendor</Form.Label>
          <Form.Control
            as="select"
            value={tea.vendorId}
            onChange={handleVendorSelection}
            required
          >
            <option value="">All Vendors</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Name of Tea */}
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name of Tea</Form.Label>
          <Form.Control
            type="text"
            value={tea.name}
            onChange={handleNameSelection}
            required
          />
        </Form.Group>

        {/* Price */}
        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={tea.price}
            onChange={handlePrice}
            required
          />
        </Form.Group>

        {/* Tasting Notes */}
        <Form.Group controlId="notes" className="mb-3">
          <Form.Label>Tasting Notes</Form.Label>
          <Form.Control
            type="text"
            value={tea.notes}
            onChange={handleNotes}
            required
          />
        </Form.Group>

        {/* Favorite Checkbox */}
        <Form.Group controlId="favorite" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Favorite"
            checked={tea.favorite}
            onChange={handleFavorite}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
