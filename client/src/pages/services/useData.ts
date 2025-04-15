import { useEffect, useState } from 'react';

type Item = {
	id: number;
	name: string;
	description: string;
};

function useData(): Item[] {
	const [items, setItems] = useState<Item[]>([]);
	
	function fetchItems() {
		fetch(`${process.env.API_URL}/items`)
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				return res.json();
			})
			.then((data: Item[]) => setItems(data))
			.catch(err => {
				console.error('Failed to fetch items', err);
			})
	}
	
	useEffect(() => {
		fetchItems();
		const interval = setInterval(fetchItems, 10000);
		return () => clearInterval(interval);
	}, []);
	
	return items;
}

export default useData;
