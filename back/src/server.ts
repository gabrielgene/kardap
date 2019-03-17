import express from "express";
import elasticsearch from "elasticsearch";

const app = express();
// app.use(express.json());

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
  const requestQuery = Object.keys(req.query).length ? req.query : null;
  const queryObject = {
    index,
  };

  const fullQueryObject = requestQuery ? {
    ...queryObject,
    body: { query: { match: requestQuery } },
  } : queryObject;

  try {
    const response = await client.search(fullQueryObject)
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

// app.post("/api/:index/:id", async (req, res) => {
//   const { index, id } = req.params;
//   if (!id) {
//     res.send({
//       message: "id param is required",
//       status: 400,
//     });
//   }

//   const requestJson = req.body || null;
//   if (!requestJson) {
//     res.send({
//       message: "invalid json",
//       status: 400,
//     });
//   }
//   res.send('oi')

//   const elasticSearchJson = {
//     body: requestJson,
//     type: 'doc',
//     index,
//     id
//   }

//   try {
//     const response = await client.create(elasticSearchJson);
//     res.send({
//       'message': 'ok'
//     })
//   } catch (err) {
//     res.send({
//       'message': 'err',
//       'err': err
//     });
//   }
// });

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
