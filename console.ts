import fs from 'fs';

import repl from 'repl';

import services from './app/services';

const pjson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const replServer = repl.start({ prompt: `${pjson.name}> ` });

replServer.context.services = services;
