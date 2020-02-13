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

app.get("/lotto", (req, res) => {
  let requiredFields = ["arr"];
  requiredFields.forEach(field => {
    if (!req.query[field]) {
      res.status(400).send(`${field} is a required query parameter`);
    }
  });

  let { arr } = req.query;

  if (!Array.isArray(arr)) {
    return res
      .status(400)
      .send(
        "This is not an array. You must enter multiple parameters with the key 'arr'"
      );
  }

  guessNumbers = arr
    .map(n => parseInt(n))
    .filter(n => !Number.isNaN(n) && n >= 1 && n <= 20);

  if (guessNumbers.length !== 6) {
    return res
      .status(400)
      .send(
        "You must have 6 paramters with the key 'arr' that are between 1 and 20"
      );
  }

  console.log(guessNumbers);

  const stockNumbers = Array(20)
    .fill(1)
    .map((_, i) => i + 1);

  const winningNumbers = [];
  for (let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }
  console.log(winningNumbers);

  let diff = winningNumbers.filter(n => guessNumbers.includes(n));
  console.log(diff);

  let responseText;

  switch (diff.length) {
    case 6:
      responseText =
        "Amazing! You got all six numbers correct! This has never happened before!";
      break;
    case 5:
      responseText = "Holy smokes! You got five out of six numbers correct!";
      break;
    case 4:
      responseText = "You only missed two numbers!";
      break;
    default:
      responseText = "You got less than four numbers correct. You lose.";
  }

  res.send(responseText);
});

app.get("/colors", (req, res) => {
  const colors = [
    {
      name: "red",
      rbg: "FF0000"
    },
    {
      name: "green",
      rgb: "00FF00"
    },
    {
      name: "blue",
      rgb: "0000FF"
    }
  ];

  res.json(colors);
});

app.get("/grade", (req, res) => {
  const { mark } = req.query;

  if (!mark) {
    return res.status(400).send("Please provide a mark");
  }

  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    return res.status(400).send("Mark must be a numeric value");
  }

  if (numericMark < 0 || numericMark > 100) {
    return res.status(400).send("Mark must be in the range of 0-100");
  }

  if (numericMark >= 90) {
    return res.send("A");
  }

  if (numericMark >= 80) {
    return res.send("B");
  }

  if (numericMark >= 70) {
    return res.send("C");
  }

  res.send("F");
});

app.get("/books", (req, res) => {});

app.listen(8000, () => {
  console.log("Express server is running at http://localhost:8000");
});
