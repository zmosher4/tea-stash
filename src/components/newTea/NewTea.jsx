import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/categoryService';
import { getAllVendors } from '../../services/vendorService';
import { addTea, getAllTeas } from '../../services/teaService';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

export const NewTea = ({ currentUser }) => {
  const [allTeas, setAllTeas] = useState([]);
  const [createdTea, setCreatedTea] = useState({
    name: '',
    price: '',
    notes: '',
    categoryId: 0,
    userId: 0,
    vendorId: 0,
    favorite: false,
  });
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  const fetchTeas = async () => {
    const teaArr = await getAllTeas();
    setAllTeas(teaArr);
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
    fetchTeas();
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

  const handleImgUrl = (event) => {
    const copy = { ...createdTea };
    copy.imgUrl = event.target.value;
    setCreatedTea(copy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTea = {
      ...createdTea,

      userId: currentUser.id,
    };

    await addTea(newTea);
    const newestId = allTeas[allTeas.length - 1].id + 1;

    navigate(`/myTeas/${newestId}`);
  };

  return (
    <Container>
      <h2 className="my-4">New Tea</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="category" className="mb-3">
          <Form.Label>Choose a category</Form.Label>
          <Form.Control
            as="select"
            value={createdTea.categoryId}
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
        <Form.Group controlId="vendor" className="mb-3">
          <Form.Label>Choose a vendor</Form.Label>
          <Form.Control
            as="select"
            value={createdTea.vendorId}
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
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name of Tea</Form.Label>
          <Form.Control
            type="text"
            value={createdTea.name}
            onChange={handleNameSelection}
            required
          />
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price (in USD)</Form.Label>
          <Form.Control
            type="number"
            value={createdTea.price}
            onChange={handlePrice}
            required
          />
        </Form.Group>
        <Form.Group controlId="notes" className="mb-3">
          <Form.Label>Tasting Notes</Form.Label>
          <Form.Control
            type="text"
            value={createdTea.notes}
            onChange={handleNotes}
            required
          />
        </Form.Group>
        <Form.Group controlId="notes" className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            value={createdTea.imgUrl}
            onChange={handleImgUrl}
          />
        </Form.Group>
        <Form.Group controlId="favorite" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Favorite"
            checked={createdTea.favorite}
            onChange={handleFavorite}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
