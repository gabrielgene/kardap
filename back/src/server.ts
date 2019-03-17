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

app.get('/api/:index', (req, res) => {
    const index = req.params.index;
    client.search({
        index: index,
        body: {
            query: {
                match: {
                    name: 'doe'
                }
            }
        }
    }, (err, result) => {
        res.send(err || result)
    });
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
