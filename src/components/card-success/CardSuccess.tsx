import * as React from 'react';
import { Button } from '../button/Button';
import { CardBody } from '../card-body/CardBody';
import { CardFooter } from '../card-footer/CardFooter';
import { CardHeader } from '../card-header/CardHeader';
import { Link } from '../link/Link';
import { SuccessResponse } from '../../routes/post.route';

interface CardSuccessProps {
	result: SuccessResponse;
	handleFlip: () => void;
}

export function CardSuccess(props: CardSuccessProps) {
	const getCompressionRate = (result: SuccessResponse) => {
		const { short_url_id, original_url } = result;
		const newUrl = window.location.href + short_url_id;
		return Math.round(newUrl.length / original_url.length * 100);
	}

	const [compressionRate, setCompressionState] = React.useState(getCompressionRate(props.result));

	return (
		<React.Fragment>
			<CardHeader>
				<h2>Success</h2>
				<p>Your shortened URL has been created!</p>
			</CardHeader>
			<CardBody>
				<div className="card__content">
					<h2>Original URL</h2>
					<Link
						href={props.result.original_url}
						target="_blank"
						text={props.result.original_url}
					/>
				</div>
				<div className="card__content">
					<h2>New URL</h2>
					<Link
						href={window.location.href + props.result.short_url_id}
						target="_blank"
						text={window.location.href + props.result.short_url_id}
					/>
				</div>
				<div className="card__content">
					<h2>Compression Rate</h2>
					<div className="compression__info">
						<span className={compressionRate < 100 ? 'compression__success' : 'compression__failure'}>
							<span className="arrow-icon">{compressionRate < 100 ? '↓' : '↑'}</span> {Math.abs(compressionRate - 100)}%
						</span>
					</div>
					<p>The new short link is {Math.abs(compressionRate - 100)} {compressionRate < 100 ? 'shorter' : 'longer'} than the original link.</p>
				</div>
			</CardBody>
			<CardFooter>
				<Button onClick={props.handleFlip}>Create Another</Button>
			</CardFooter>
		</React.Fragment>
	);
}
