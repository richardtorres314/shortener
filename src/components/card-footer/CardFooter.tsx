import * as React from 'react';
import classnames from 'classnames';
import './card-footer.css';

export function CardFooter(props: React.HTMLProps<HTMLDivElement>) {
	const { className, ...passedProps } = props;

	return (
		<div
			className={classnames('card__footer', className)}
			{...passedProps}
		/>
	);
}
