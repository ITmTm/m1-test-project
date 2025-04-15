import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from "../../types";
import Button from '../button/Button';

import './listItem.scss';


interface ListItemProps {
	item: Item;
	isActive: boolean;
	onSetActive: () => void
}

const ListItem: React.FC<ListItemProps> = ({ item, isActive, onSetActive }) => {
	return (
		<li className={isActive ? 'list-item active' : 'list-item'}>
			<div className='list-item-actions'>
				<div className='list-item-id'>ID: <b>{item.id}</b></div>

				<Button
					onClick={onSetActive}
					id={item.id}
					disabled={isActive}
				>
					{isActive ? 'Active' : 'Set Active'}
				</Button>
			</div>

			<Link to={`/${item.id}`}>
				<div>{item.name}</div>
				<div className={'list-item__description'}>{item.description}</div>
			</Link>
		</li>
	);
};


export default ListItem;
