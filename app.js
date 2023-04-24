// Imports
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const chalk = require('chalk');
const app = express();

// Middle wares
const jsonParer = bodyParser.json();
app.use(morgan("dev"));
app.use(jsonParer);
app.use(bodyParser.urlencoded({ extended: true }));

// Initialization of APP
const PORT = process.env.PORT || 3000;
const students = [
  { id: 1, name: "Ayeza", age: 20 },
  { id: 2, name: "Umair", age: 22 },
  { id: 3, name: "Ali", age: 18 },
  { id: 4, name: "Mudassar", age: 24 },
];

// Routes
app.get("/", (req, res) => {
  res.status(200).send({ success: true, message: req.url + " Called" });
});

// Student Routes
app.get("/students/", (req, res) => {
  res.status(200).send({ success: true, data: students });
});
app.get("/students/:id", (req, res) => {
  try {
    const { id } = req.params;
    const student = students.filter((stu) => stu.id === JSON.parse(id))[0];
    res.status(200).send({ success: true, data: student });
  } catch (error) {
    res.status(500).send({ success: true, message: error });
  }
});
app.post("/students/", jsonParer, (req, res) => {
  const { name, age } = req.body;
  console.log(name, age);
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  students.push(newStudent);
  res.status(201).send({ success: true, message: newStudent });
});
app.put("/students/:id", (req, res) => {
  res.status(200).send({ success: true, message: req.url + " Called" });
});
app.delete("/students/:id", (req, res) => {
  res.status(200).send({ success: true, message: req.url + " Called" });
});
// Starting the server
app.listen(PORT, () => {
  console.log(`[Server is running at]\t ${chalk.green(`http://localhost:${PORT}`)}`);
});
