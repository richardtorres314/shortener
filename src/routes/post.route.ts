import * as dns from 'dns';
import got from 'got';
import { Request } from '@hapi/hapi';
import { Url } from '../models/Url';

interface Payload {
	url: string;
}

export interface SuccessResponse {
	original_url: string;
	short_url_id: string;
}

export interface FailureResponse {
	error: string;
}

export type PostResponse = SuccessResponse | FailureResponse;

async function dnsLookup(url: string): Promise<PostResponse> {
	return new Promise((resolve, reject) => {
		const newUrl = url.replace(/(^\w+:|^)\/\//, '');

		dns.lookup(newUrl, (error, address, family) => {
			if (error) {
				console.log('didnt find');
				console.log(error);
				return reject(error);
			}

			const regex = /(\w+)\.(\w+)\.(com|org|edu|net)[\/(\w+)\/(\w+)]?/g;
			const match = url.match(regex);

			if (match) {
				const newUrl = new Url({
					url: url
				});

				console.log('matched');
				console.log(newUrl);

				newUrl.save(function (err, doc) {
					if (err) {
						return reject(err);
					} else {
						return resolve({
							original_url: doc.url,
							short_url_id: doc._id
						});
					}
				});
			} else {
				return resolve({
					error: "Invalid URL"
				});
			}
		});
	});
}

export async function postRoute(request: Request): Promise<PostResponse> {
	const { url } = request.payload as Payload;

	try {
		await got(url);
		const newUrl = new Url({ url });
		const doc = await newUrl.save();
		return {
			original_url: doc.url,
			short_url_id: doc._id
		};
	} catch (err) {
		return {
			error: "Invalid URL"
		}
	}
}
