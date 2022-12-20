const express = require("express");
const router = express.Router();
require("dotenv").config();

const cors = require("cors")
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs")

const Users = require("../schemas/users");

router.use(cors());




module.exports = router;
