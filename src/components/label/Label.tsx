import * as React from 'react';
import classnames from 'classnames';
import './label.css';

export function Label(props: React.HTMLProps<HTMLLabelElement>) {
	const { className, ...passedProps } = props;

	return (
		<label
			className={classnames('form__label', className)}
			{...passedProps}
		/>
	);
}
