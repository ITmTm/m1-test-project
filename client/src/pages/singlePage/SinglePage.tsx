import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Item } from "../../shared/types";
import { fetchItemByID } from "../../shared/services/api";

import './singlePage.scss';

function SinglePage() {
	const { id } = useParams();
	const [item, setItem] = useState<Item | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadItem = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchItemByID(id!);
				setItem(data);
			} catch (err) {
				if (err.message === '403') {
					setError('403: Access denied for this item.');
				} else {
					setError('Failed to fetch item. Please try again later.');
				}
				setItem(null);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			loadItem().catch(console.error);
		}
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
