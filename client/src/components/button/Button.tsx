import React from 'react';

import './button.scss';

interface ButtonProps {
	id: number;
	onClick: (id: number) => void;
	disabled?: boolean;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, id, disabled = false, children }) => {

	return (
		<button
			className='list-item-btn'
			onClick={() => onClick(id)}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button;
