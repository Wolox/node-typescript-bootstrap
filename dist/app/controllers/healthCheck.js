"use strict";
exports.healthCheck = (_, res) => res.status(200).send({ uptime: process.uptime() });
