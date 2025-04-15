import { Item } from "../types";

export const fetchItems = async (): Promise<Item[]> => {
	const res = await fetch(`${process.env.API_URL}/items`);
	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}
	return res.json();
};

export const fetchItemByID = async (id: string): Promise<Item> => {
	const res = await fetch(`${process.env.API_URL}/items/${id}`);
	if (res.status === 403) {
		throw new Error('403')
	}
	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}
	return res.json();
}