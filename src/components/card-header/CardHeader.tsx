import * as React from 'react';
import classnames from 'classnames';
import './card-header.css';

export function CardHeader(props: React.HTMLProps<HTMLDivElement>) {
	const { className, ...passedProps } = props;

	return (
		<div
			className={classnames('card__header', className)}
			{...passedProps}
		/>
	);
}
