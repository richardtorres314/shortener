import * as dotenv from 'dotenv';
import * as Inert from '@hapi/inert';
import * as mongoose from 'mongoose';
import * as Path from 'path';
import { getRoute } from './routes/get.route';
import { postRoute } from './routes/post.route';
import { Server } from '@hapi/hapi';
dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000
	})
	.then(() => {
		console.log("MongoDB database connection established successfully");
	})
	.catch(error => {
		console.log("Error connecting to database: ", error);
		return process.exit(1);
	});

const server = new Server({
	port,
	host,
	routes: {
		files: {
			relativeTo: Path.join(__dirname, '../views')
		}
	}
});

async function start() {
	try {
		await server.register(Inert);

		await server.start();

		server.route({
			method: 'GET',
			path: '/assets/{param*}',
			handler: {
				directory: {
					path: Path.join(__dirname, '../dist/assets')
				}
			}
		});

		server.route({
			method: 'GET',
			path: '/',
			handler: {
				file: 'index.html'
			}
		});

		server.route({
			method: 'GET',
			path: '/{id}',
			handler: function (request, response) {
				return response.redirect(`/api/shorturl/${request.params.id}`);
			}
		})

		server.route({
			method: 'POST',
			path: '/api/shorturl/new',
			handler: postRoute
		});

		server.route({
			method: 'GET',
			path: '/api/shorturl/{id}',
			handler: getRoute
		});

	} catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log(`Server running at ${server.info.uri}`);
}

start();
