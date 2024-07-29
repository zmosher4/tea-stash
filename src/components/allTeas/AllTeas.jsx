import React, { useEffect, useState } from 'react';
import { getAllTeas } from '../../services/teaService';
import { getAllCategories } from '../../services/categoryService';
import { Link } from 'react-router-dom';
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import './custom.css'; // Import custom CSS

export const AllTeas = ({ currentUser }) => {
  const [userTeas, setUserTeas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTeas, setFilteredTeas] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(''); // New state for input

  const fetchTeas = async () => {
    const teaArr = await getAllTeas();
    const filtered = teaArr.filter((tea) => tea.userId === currentUser.id);
    setUserTeas(filtered);
    setFilteredTeas(filtered);
  };

  const fetchCategories = async () => {
    const catArr = await getAllCategories();
    setCategories(catArr);
  };

  useEffect(() => {
    fetchTeas();
    fetchCategories();
  }, [currentUser]);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    let sortedTeas = [...userTeas];
    if (selectedFilter === 'low-high') {
      sortedTeas = sortedTeas.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === 'high-low') {
      sortedTeas = sortedTeas.sort((a, b) => b.price - a.price);
    } else if (selectedFilter === 'white') {
      sortedTeas = sortedTeas.filter((tea) => tea.category?.name === 'white');
    } else if (selectedFilter === 'green') {
      sortedTeas = sortedTeas.filter((tea) => tea.category?.name === 'green');
    } else if (selectedFilter === 'oolong') {
      sortedTeas = sortedTeas.filter((tea) => tea.category?.name === 'oolong');
    } else if (selectedFilter === 'yellow') {
      sortedTeas = sortedTeas.filter((tea) => tea.category?.name === 'yellow');
    } else if (selectedFilter === 'black') {
      sortedTeas = sortedTeas.filter((tea) => tea.category?.name === 'black');
    } else if (selectedFilter === "pu'erh") {
      sortedTeas = sortedTeas.filter((tea) => tea.category?.name === "pu'erh");
    } else if (selectedFilter === 'twl') {
      sortedTeas = sortedTeas.filter(
        (tea) => tea.vendor?.name === 'Teas we like'
      );
    } else if (selectedFilter === 'lp') {
      sortedTeas = sortedTeas.filter(
        (tea) => tea.vendor?.name === 'Liquid Proust'
      );
    } else if (selectedFilter === 'tjl') {
      sortedTeas = sortedTeas.filter(
        (tea) => tea.vendor?.name === 'The Jade Leaf'
      );
    } else if (selectedFilter === 'ys') {
      sortedTeas = sortedTeas.filter(
        (tea) => tea.vendor?.name === 'Yunnan Sourcing'
      );
    }
    setFilteredTeas(sortedTeas);
  }, [selectedFilter]);

  const handleSubmit = () => {
    if (searchInput === '') {
      setFilteredTeas(userTeas);
    } else {
      const sortedTeas = userTeas.filter((tea) => {
        return tea.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredTeas(sortedTeas);
    }
  };

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col md={6}>
          <Form.Select onChange={handleFilterChange} aria-label="Filter Teas">
            <option value="">Filter Teas</option>
            <option value="low-high">Price: Low-High</option>
            <option value="high-low">Price: High-Low</option>
            <option value="white">Type: White Teas</option>
            <option value="green">Type: Green Teas</option>
            <option value="oolong">Type: Oolong Teas</option>
            <option value="yellow">Type: Yellow Teas</option>
            <option value="black">Type: Black Teas</option>
            <option value="pu'erh">Type: Pu'erh Teas</option>
            <option value="twl">Vendor: Teas We Like</option>
            <option value="lp">Vendor: Liquid Proust</option>
            <option value="tjl">Vendor: The Jade Leaf</option>
            <option value="ys">Vendor: Yunnan Sourcing</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Search teas"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <Button onClick={handleSubmit} variant="outline-secondary">
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {filteredTeas.map((tea) => (
          <Col key={tea.id} md={4} className="mb-4 mt-4">
            <Card className="h-100 tea">
              <Link
                to={`/myTeas/${tea.id}`}
                className="text-decoration-none link-no-color"
              >
                <Card.Img
                  variant="top"
                  src={tea.imgUrl}
                  className="custom-img"
                  alt={tea.name}
                />
              </Link>

              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/myTeas/${tea.id}`}
                    className="text-decoration-none link-no-color"
                  >
                    {tea.name}
                  </Link>
                </Card.Title>
                <Card.Text>
                  <div>
                    <strong>Price:</strong> ${tea.price}
                  </div>
                  <div>
                    <strong>Type:</strong>{' '}
                    {
                      categories.find(
                        (category) => category.id === tea.categoryId
                      )?.name
                    }
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllTeas;
