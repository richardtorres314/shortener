import * as React from 'react';
import classnames from 'classnames';
import './card-body.css';

export function CardBody(props: React.HTMLProps<HTMLDivElement>) {
	const { className, ...passedProps } = props;

	return (
		<div
			className={classnames('card__body', className)}
			{...passedProps}
		/>
	)
}
