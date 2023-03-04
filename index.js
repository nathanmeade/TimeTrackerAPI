const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Create Sequelize instance
const sequelize = new Sequelize('timetracking', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  define: {
    timestamps: false
  }
});

// Define Employee and Shift models
const Employee = sequelize.define('employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Shift = sequelize.define('shift', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Set up API routes
app.get('/employees', async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

app.post('/employees', async (req, res) => {
  const employee = await Employee.create(req.body);
  res.json(employee);
});

app.get('/employees/:id', async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  res.json(employee);
});

app.put('/employees/:id', async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  await employee.update(req.body);
  res.json(employee);
});

app.delete('/employees/:id', async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  await employee.destroy();
  res.json({ message: 'Employee deleted' });
});

app.get('/shifts', async (req, res) => {
const shifts = await Shift.findAll();
res.json(shifts);
});

app.post('/shifts', async (req, res) => {
const shift = await Shift.create(req.body);
res.json(shift);
});

app.get('/shifts/:id', async (req, res) => {
const shift = await Shift.findByPk(req.params.id);
res.json(shift);
});

app.put('/shifts/:id', async (req, res) => {
const shift = await Shift.findByPk(req.params.id);
await shift.update(req.body);
res.json(shift);
});

app.delete('/shifts/:id', async (req, res) => {
const shift = await Shift.findByPk(req.params.id);
await shift.destroy();
res.json({ message: 'Shift deleted' });
});

// Start the server
app.listen(3000, () => {
console.log('Server started on port 3000');
});