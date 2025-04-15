import { useMemo, useState } from 'react';

type SortDirection = 'ASC' | 'DESC';

function useSort<T extends { id: number } >(
	items: T[]
): [T[], SortDirection, () => void] {
	const [sortBy, setSortBy] = useState<SortDirection>('ASC');

	const sortedItems = useMemo(() => {
		const copied = [...items];					// Делаем копию и не мутируем оригинал
		return copied.sort((a, b) => {
			return sortBy === 'ASC' ? a.id - b.id : b.id - a.id;
		});
	}, [items, sortBy]);
	
	const handleSortClick = () => {
		setSortBy(prev => (prev === 'ASC' ? 'DESC' : 'ASC'));
	}
	
	return [sortedItems, sortBy, handleSortClick];
}

export default useSort;
