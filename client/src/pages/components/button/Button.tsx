import React, { memo, useCallback } from 'react';

import './button.scss';

interface ButtonProps {
	id: number;
	onClick: (id: number) => void;
	disabled?: boolean;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, id, disabled = false, children }) => {
	const handleClick = useCallback(() => {
		onClick(id);
	}, [onClick, id]);

	return (
		<button
			className='list-item-btn'
			onClick={handleClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default memo(Button);
