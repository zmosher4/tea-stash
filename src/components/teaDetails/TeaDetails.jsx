import { useEffect, useState } from 'react';
import { deleteTea, getTeaById } from '../../services/teaService';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
    <div>
      <div>{tea.name}</div>
      <div>${tea.price}</div>
      <div>
        Purchased on {tea.datePurchased} from {tea.vendor?.name}
      </div>
      <div>Type: {tea.category?.name}</div>
      <div>Notes: {tea.notes}</div>
      <div>
        {tea.favorite
          ? 'This tea is one of your favorites'
          : 'This tea is not one of your favorites'}
      </div>
      <button>
        <Link to={`/edit-tea/${teaId}`}>Edit</Link>
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
