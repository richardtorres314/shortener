import * as React from 'react';
import axios from 'axios';
import ReactCardFlip from 'react-card-flip';
import { Button } from './button/Button';
import { Card } from './card/Card';
import { CardBody } from './card-body/CardBody';
import { CardFailure } from './card-failure/CardFailure';
import { CardHeader } from './card-header/CardHeader';
import { CardSuccess } from './card-success/CardSuccess';
import { FailureResponse, PostResponse, SuccessResponse } from '../routes/post.route';
import { Input } from './input/Input';
import { Label } from './label/Label';
import { Link } from './link/Link';
import '../assets/style.css';

export function App() {
	const [isFlipped, setFlipped] = React.useState(false);
	const [url, setUrl] = React.useState('');
	const [result, setResult] = React.useState<PostResponse>(null);

	const handleFlip = () => {
		if (isFlipped || (!isFlipped && url !== '')) {
			setFlipped(!isFlipped);
		}
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const { data } = await axios.post<PostResponse>('/api/shorturl/new', { url });
			setResult(data);
			setFlipped(true);
		} catch (err) {
			throw err;
		}
	}

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value);
	}

	return (
		<ReactCardFlip isFlipped={isFlipped}>
			<Card>
				<CardHeader>
					<h2>Short URL Creation</h2>
					<p>Please enter a valid URL to be shortened.</p>
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit}>
						<div className="form-body">
							<div className="form-field">
								<Label>URL to be shortened</Label>
								<Input
									className="form-input"
									id="url_input"
									name="url"
									onChange={handleInput}
									placeholder="https://www.google.com"
									type="text"
									value={url}
									required={true}
								/>
							</div>
						</div>
						<div className="form-footer">
							<Button type="submit" onClick={handleFlip}>Post URL</Button>
						</div>
					</form>
					<hr />
					<h2>Example Usage:</h2>
					<Link
						href={`${window.location.href}5efb3a4604241800922bca47`}
						target="_blank"
						text={`${window.location.href}5efb3a4604241800922bca47`}
					/>
					<hr />
					<h2>Will Redirect to:</h2>
					<p className="original-link-text">
						https://www.reuters.com/article/urnidgns002570f3005978d8002576f60035a6bb/long-url-please-idUS98192761820100330
					</p>
				</CardBody>
			</Card>
			<Card>
				{
					result &&
						result.hasOwnProperty('original_url') ?
						<CardSuccess
							handleFlip={handleFlip}
							result={result as SuccessResponse}
						/>
						:
						<CardFailure
							handleFlip={handleFlip}
							result={result as FailureResponse}
							url={url}
						/>
				}
			</Card>
		</ReactCardFlip>
	);
}
