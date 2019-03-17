import express from "express";
import elasticsearch from "elasticsearch";

const app = express();
const port = 8080; // default port to listen


const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

// define a route handler for the default home page
app.get("/", (req, res) => {
    type ola = {
        [key: string]: number
    };
    console.log(client);
    res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});