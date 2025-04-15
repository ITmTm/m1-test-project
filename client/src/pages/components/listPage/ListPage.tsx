import React, { useEffect, useMemo, useState } from 'react';
import { ListItem } from '../listItem';
import useData from '../../services/useData';
import useSort from '../../hooks/useSort';

import './listPage.scss';

type Item = {
	id: number;
	name: string;
	description: string;
};

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className={'list-subtitle'}>Active Item ID: {children}</h2>
);

function ListPage() {
    const items: Item[] = useData();
    const [sortedItems, sortBy, handleSortClick] = useSort<Item>(items);

    const [activeId, setActiveId] = useState<number | null>(null)
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [query, setQuery] = useState<string>('');
    
    const activeItemText = useMemo(() => activeId ?? 'Empty', [activeId]);


	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
	}

	const handleSetActive = (id: number) => {
	  setActiveId(id);
	}

	useEffect(() => {
		setFilteredItems(sortedItems);
	}, [sortedItems]);

	useEffect(() => {
		const safeQuery = query.toLowerCase().trim();
		if (safeQuery.length === 0) {
			setFilteredItems(sortedItems);
		} else {
			const escapedQuery = safeQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			setFilteredItems(
				sortedItems.filter(item => `${item.id}`.includes(escapedQuery))
			);
		}
	}, [query, sortedItems]);


	return (
		<div className={'list-wrapper'}>
			<div className="list-header">
				<h1 className={'list-title'}>Items List</h1>
				<SubTitle>{activeItemText}</SubTitle>
				<button onClick={handleSortClick}>Sort ({sortBy === 'ASC' ? 'ASC' : 'DESC'})</button>
				<input type="text" placeholder={'Filter by ID'} value={query} onChange={handleQueryChange} />
			</div>

			<div className="list-container">
				<div className="list">
					{filteredItems.length === 0 && <span>Loading...</span>}
					{filteredItems.map((item) => (
						<ListItem
							key={item.id}
							item={item}
							isActive={item.id === activeId}
							onSetActive={() => handleSetActive(item.id)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ListPage;
