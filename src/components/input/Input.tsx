import * as React from 'react';
import classnames from 'classnames';
import './input.css';

export function Input(props: React.HTMLProps<HTMLInputElement>) {
	const { className, ...passedProps } = props;

	return (
		<input
			className={classnames('input', className)}
			{...passedProps}
		/>
	);
}
