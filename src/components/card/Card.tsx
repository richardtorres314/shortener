import * as React from 'react';
import classnames from 'classnames';
import './card.css';

export function Card(props: React.HTMLProps<HTMLDivElement>) {
	const { className, ...passedProps } = props;

	return (
		<div
			className={classnames('card', className)}
			{...passedProps}
		/>
	)
}
