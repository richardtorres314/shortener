import * as React from 'react';
import classnames from 'classnames';
import './link.css';

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
	text: string;
}

export function Link(props: LinkProps) {
	const { className, text, ...passedProps } = props;

	return (
		<a
			className={classnames('link', className)}
			{...passedProps}
		>
			{text}
		</a>
	)
}
