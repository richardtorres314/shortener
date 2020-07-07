import { Request, ResponseToolkit } from '@hapi/hapi';
import { Url } from '../models/Url';

export async function getRoute(request: Request, response: ResponseToolkit) {
	const { id } = request.params;
	const { url } = await Url.findById(id);
	return response.redirect(url);
}
