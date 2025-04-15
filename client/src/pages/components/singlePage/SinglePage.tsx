import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type ItemType = {
	id: number;
	name: string;
	description: string;
};

function SinglePage() {
	const { id } = useParams();
	const [item, setItem] = useState<ItemType | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchItem = async () => {
			setLoading(true);
			setError(null);

			try {
				const res = await fetch(`${process.env.API_URL}/items/${id}`);
				if (res.status === 403) {
					setError('403: Access denied for this item.');
					setItem(null);
				} else if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				} else {
					const data = await res.json();
					setItem(data);
				}
			} catch (err) {
				setError('Failed to fetch item. Please try again later.');
				setItem(null);
			} finally {
				setLoading(false);
			}
		};

		fetchItem().catch(console.error);
	}, [id]);


  return (
	  <div className="detail">
		  <Link to='/'>Go Back</Link>
		  <h2>Item Details</h2>

		  {loading && <p>Loading...</p>}

		  {error && <p className='error'>{error}</p>}

		  {!loading && !error && item && (
			  <>
				  <p>ID: {item.id}</p>
				  <p>Name: {item.name}</p>
				  <p>Description: {item.description}</p>
			  </>
		  )}
	  </div>
  );
}

export default SinglePage;
