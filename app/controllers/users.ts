const User = require('../models').users;
const errors = require('../errors');

exports.getUsers = (_: any, res: { send: (arg0: any) => void; }, next: any) =>
  User.findAll()
    .then((users: any) => res.send(users))
    .catch(next);

exports.createUser = (req: { body: { username: any; }; }, res: { status: (arg0: number) => { end: () => void; }; }, next: any) =>
  User.create({ username: req.body.username })
    .then(() => res.status(201).end())
    .catch(next);

exports.getUserById = (req: { params: { id: any; }; }, res: { send: (arg0: any) => void; }, next: (arg0: any) => void) =>
  User.findOne({ where: { id: req.params.id } })
    .then((user: any) => {
      if (!user) {
        return next(errors.notFound('User not found'));
      }

      return res.send(user);
    })
    .catch(next);
