import express from "express";
import elasticsearch from "elasticsearch";

const app = express();
const port = 8080; // default port to listen

const client = new elasticsearch.Client({
	host: "localhost:9200",
	log: "trace"
});

client.search({
	index: 'customer',
	body: {
		query: {
			match: {
				name: 'doe'
			}
		}
	}
}, (err, result) => {
	if (err) console.log(err)
	if (result) console.log(result);
})

// define a route handler for the default home page
app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.get('/api/:index', async (req, res) => {
	const index = req.params.index;
	const requestQuery = req.query;
	const queryObject = {
		index,
	};

	const fullQueryObject = {
		...queryObject,
		body: requestQuery
	};

	try {
		const response = await client.search(requestQuery ? fullQueryObject : queryObject, (err, result) => {
			return (err || result.hits && result.hits.hits)
		});
		res.send({
			message: 'ok',
			json: response
		});
	} catch (err) {
		res.send({
			message: 'ok',
			json: err
		});
	}
});

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
