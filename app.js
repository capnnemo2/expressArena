const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("I am an oompa loompa");
});

app.get("/burgers", (req, res) => {
  res.send("Do you like burgers? We do, too!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("Pizza is divine");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send(
    "Plenty of people have a problem with pineapple on pizza, but not me!"
  );
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}`;
  res.send(responseText);
});

app.get("queryViewer", (req, res) => {
  console.log(req.query);
  res.end();
});

app.get("/greetings", (req, res) => {
  const name = req.query.name;
  const race = req.query.race;

  if (!name) {
    return res.status(400).send("Name is required");
  }

  if (!race) {
    return res.status(400).send("Age is required");
  }

  const greeting = `Greetings ${name} the ${race}. Welcome to Sparta.`;
  res.send(greeting);
});

app.get("/sum", (req, res) => {
  let requiredFields = ["a", "b"];
  requiredFields.forEach(field => {
    if (!req.query[field]) {
      res.status(400).send(`${field} is a required query parameter`);
    }
  });

  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  const c = a + b;
  res.send(`The sum of ${a} and ${b} is ${c}`);
});

app.get("/cipher", (req, res) => {
  let requiredFields = ["text", "shift"];
  requiredFields.forEach(field => {
    if (!req.query[field]) {
      res.status(400).send(`${field} is a required query parameter`);
    }
  });

  let { text, shift } = req.query;
  const shiftNum = parseInt(shift);
  text = text.toUpperCase();
  let encryptedMessage = "";
  let start = 65;
  let max = 65 + 25;

  for (let i = 0; i < text.length; i++) {
    if (text[i].charCodeAt(0) < start || text[i].charCodeAt(0) > max) {
      encryptedMessage += text[i];
    } else {
      let newPosition = text[i].charCodeAt(0) + shiftNum;
      if (newPosition > max) {
        newPosition = (newPosition % max) + start - 1;
      }
      encryptedMessage += String.fromCharCode(newPosition);
    }
  }

  res.send(encryptedMessage);
});

app.get("/lotto", (req, res) => {});

app.listen(8000, () => {
  console.log("Express server is running at http://localhost:8000");
});
