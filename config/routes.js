const axios = require('axios');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("../users/usersModel");
const { authenticate, jwtKey } = require("../auth/authenticate");

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: "1d",
  }
  return jwt.sign(payload, jwtKey, options)
}

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    })
}

function login(req, res) {
  let {username, password} = req.body;
  Users.getBy({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({message: `welcome ${user.username}`})
      } else {
        res.status(401).json({message: "invalid credentials"})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
