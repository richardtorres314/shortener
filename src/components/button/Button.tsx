import * as React from 'react';
import './button.css';

export function Button(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
	const { className, ...passedProps } = props;

	return (
		<button
			{...passedProps}
			className={`my-button ` + className}
		/>
	);
}
