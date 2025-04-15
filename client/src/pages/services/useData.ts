import { useEffect, useState } from 'react';
import { fetchItems } from "./api";
import { Item } from "../types";

function useData(): Item[] {
	const [ items, setItems ] = useState<Item[]>([]);

	const loadItems = async () => {
		try {
			const data = await fetchItems();
			setItems(data);
		} catch (error) {
			console.error('Failed to fetch items:', error);
		}
	}

	useEffect(() => {
		loadItems().catch(console.error);

		const interval = setInterval(loadItems, 10000);
		return () => clearInterval(interval);
	}, []);

	return items;
}

export default useData;
