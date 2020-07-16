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
