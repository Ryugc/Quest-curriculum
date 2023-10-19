    const express = require("express");
    const app = express();
    const bodyParser = require('body-parser'); // Added body-parser

    // 1. Say Hello world node js
    console.log("Hello World");

    // 2. Start working express server
   /* app.get('/', function (req, res) {
      res.send('Hello Express');
    });*/

    // 3. Serve an HTML File
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/views/index.html');
    });

    // 4. Serve Static Assets
    app.use('/public', express.static(__dirname + '/public'));

    // 5. Serve JSON on a Specific Route
    app.get("/json", function (req, res) {
      res.json({
        message: "hello json"
      });
    });

    // 6. Use the .env File
    app.get("/json", function (req, res) {
      process.env.MESSAGE_STYLE === "uppercase"
        ? res.json({ message: 'HELLO JSON' })
        : res.json({ message: 'Hello json' });
    });

    // 7. Implement a Root-Level Request Logger Middleware
    app.use(function (req, res, next) {
      console.log(req.method + " " + req.path + " - " + req.ip);
      next();
    });

    // 8. Chain middleware to create a time server
    app.get('/now', (req, res, next) => {
      req.time = new Date().toString();
      next();
    }, (req, res) => {
      res.json({ time: req.time });
    });

    // 9. Get Route Parameter Input from the Client
    app.get('/:word/echo', (req, res) => {
      const { word } = req.params;
      res.json({
        echo: word
      });
    });

    // 10. Get Query Parameter Input from the Client
    app.get('/name', (req, res) => {
      const { first: firstName, last: lastName } = req.query;
      res.json({ name: `${firstName} ${lastName}` });
    });

    // 11. Use body-parser to parse form data
    app.use(bodyParser.urlencoded({ extended: false }));

    // 12. Get data from a POST request
    app.post('/name', (req, res) => {
      const { first: firstName, last: lastName } = req.body;
      // Do something with firstName and lastName
      res.json({ firstName, lastName });
    });

    // Start the server on port 3000
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
