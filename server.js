const express = require('express');
const app = express();

app.use("/js", express.static("./docs/js"));
app.use("/css", express.static("./docs/css"));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.route( "/Home" ).get((req, res) => {
  res.sendFile(__dirname + '/docs/index.html');
});

app.get('/', (req, res) => {
  res.redirect('/Home');
});

app.listen(8080, () => console.log("server running at localhost:8080"));
