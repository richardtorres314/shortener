import * as React from 'react';
import { Button } from '../button/Button';
import { CardBody } from '../card-body/CardBody';
import { CardFooter } from '../card-footer/CardFooter';
import { CardHeader } from '../card-header/CardHeader';
import { FailureResponse } from '../../routes/post.route';
import { Link } from '../link/Link';

interface CardFailureProps {
	handleFlip: () => void;
	result: FailureResponse;
	url: string;
}

export function CardFailure(props: CardFailureProps) {
	return (
		<React.Fragment>
			<CardHeader>
				<h2>Not Successful</h2>
				<p>The URL was not valid. Please try again with a valid URL.</p>
			</CardHeader>
			<CardBody>
				<h2>Your Original URL</h2>
				<p><Link text={props.url} /></p>
				<h2>URL Resource</h2>
				<p>Not sure what is a valid URL? Read Mozilla Developer Network's article below on &ldquo;What is a URL?&rdquo;</p>
				<p>
					<Link
						href="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL"
						text="Mozilla Developer Network - What is a URL?"
					/>
				</p>
			</CardBody>
			<CardFooter>
				<Button onClick={props.handleFlip}>Try Again</Button>
			</CardFooter>
		</React.Fragment>
	);
}
