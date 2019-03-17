import express from "express";
import elasticsearch from "elasticsearch";

const app = express();
const port = 8080; // default port to listen

const client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/:index", async (req, res) => {
  const index = req.params.index;
  const requestQuery = Object.keys(req.query).length ? req.query : false;
  const queryObject = {
    index,
  };

  console.log({requestQuery})

  const fullQueryObject = requestQuery ? {
  	...queryObject,
  	body: { query: { match: requestQuery } },
  } : queryObject;

  console.log({fullQueryObject});

  try {
    const response = await client.search(fullQueryObject)
    // const response = await client.search(queryObject)

    console.log(response)
    res.send({
      message: "ok",
      json: response.hits ? response.hits.hits : []
    });
  } catch (err) {
    res.send({
      message: "ok",
      json: err
    });
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
