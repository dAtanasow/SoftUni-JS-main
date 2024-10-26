const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { createToken } = require("../services/jwt");
const { register, login } = require("../services/user");
const { isGuest } = require("../middlewares/guards");
const { parseError } = require("../../utils");

