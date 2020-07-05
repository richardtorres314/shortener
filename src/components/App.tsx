import * as React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Button } from './button/Button';
import '../assets/style.css';

export function App() {
	const [isFlipped, setFlipped] = React.useState(false);

	const handleFlip = () => {
		setFlipped(!isFlipped);
	}

	return (
		<ReactCardFlip isFlipped={isFlipped}>
			<div className="card">
				<h2>Short URL Creation</h2>
				<p>
					Please enter a valid URL to be shortened.
				</p>
				<form action="api/shorturl/new" method="POST">
					<div className="form-body">
						<div className="form-field">
							<label className="form-label">
								URL to be shortened
							</label>
							<input
								className="form-input"
								id="url_input"
								type="text"
								name="url"
								placeholder="https://www.google.com"
							/>
						</div>
					</div>
					<div className="form-footer">
						<Button type="submit" onClick={handleFlip}>Post URL</Button>
					</div>
				</form>
				<hr />
				<h2>Example Usage:</h2>
				<a href="https://kindhearted-coconut-bat.glitch.me/api/shorturl/5efb3a4604241800922bca47"
					target="_blank">
					https://kindhearted-coconut-bat.glitch.me/api/shorturl/5efb3a4604241800922bca47
				</a>
				<hr />
				<h2>Will Redirect to:</h2>
				<p className="original-link-text">
					https://www.reuters.com/article/urnidgns002570f3005978d8002576f60035a6bb/long-url-please-idUS98192761820100330
				</p>
			</div>
			<div className="card">
				<h1>Success</h1>
				<Button onClick={handleFlip}>Do it again</Button>
			</div>
		</ReactCardFlip>
	);
}
