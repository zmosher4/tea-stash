import { useEffect, useState } from 'react';
import { deleteTea, getTeaById } from '../../services/teaService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './custom.css';

export const TeaDetails = () => {
  const [tea, setTea] = useState({});
  const { teaId } = useParams();
  const navigate = useNavigate();

  const fetchTea = async () => {
    const teaRes = await getTeaById(teaId);
    setTea(teaRes);
  };

  useEffect(() => {
    fetchTea();
  }, [teaId]);

  const handleDelete = async () => {
    await deleteTea(teaId);
    navigate('/myTeas');
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={8}>
          <h2>{tea.name}</h2>
          <div className="mb-3">
            <strong>Price:</strong> ${tea.price}
          </div>
          <div className="mb-3">
            <strong>Purchased from </strong>
            {tea.vendor?.name}
          </div>
          <div className="mb-3">
            <strong>Type:</strong> {tea.category?.name}
          </div>
          <div className="mb-3">
            <strong>Notes:</strong> {tea.notes}
          </div>
          <div className="mb-3">
            {tea.favorite
              ? 'This tea is in your favorites'
              : 'This tea is not in your favorites'}
          </div>
          <Button variant="primary" className="me-2">
            <Link
              to={`/edit-tea/${teaId}`}
              className="text-white text-decoration-none"
            >
              Edit
            </Link>
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
        <Col>
          <img className="detail-img" src={tea.imgUrl} alt="no image" />
        </Col>
      </Row>
    </Container>
  );
};
