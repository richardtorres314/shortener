import * as dns from 'dns';
import * as dotenv from 'dotenv';
import * as Inert from '@hapi/inert';
import * as mongoose from 'mongoose';
import * as Path from 'path';
import { Request, Server } from '@hapi/hapi';
import { Url } from './models/Url';
dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const connection = mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
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
			method: 'POST',
			path: '/api/shorturl/new',
			handler: function (request: Request) {
				const { payload } = request;
				const url = (payload as { url: string }).url;
				let response: {};

				async function dnsLookup() {
					return new Promise((resolve, reject) => {
						dns.lookup(url, function(error, address, family) {
							const regex = /https?:\/\/www\.(\w+)\.(com|org|edu|net)[\/(\w+)\/(\w+)]?/g;
							const match = url.match(regex);

							if (match) {
								const newUrl = new Url({
									url: url
								});

								newUrl.save(function(err, doc) {
									if (err) {
										response = err;
									} else {
										response = {
											original_url: newUrl.url,
											short_url: newUrl._id
										};
									}
								});
							} else {
								console.log('fuck you 3');
								response = {
									error: "Invalid URL"
								};
							}
						});
					});
				}

				

				return response;
			}
		});

	} catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log(`Server running at ${server.info.uri}`);
}

start();
