"use strict";
const User = require('../models').users;
const errors = require('../errors');
exports.getUsers = (_, res, next) => User.findAll()
    .then(users => res.send(users))
    .catch(next);
exports.createUser = (req, res, next) => User.create({ username: req.body.username })
    .then(() => res.status(201).end())
    .catch(next);
exports.getUserById = (req, res, next) => User.findOne({ where: { id: req.params.id } })
    .then(user => {
    if (!user) {
        return next(errors.notFound('User not found'));
    }
    return res.send(user);
})
    .catch(next);
