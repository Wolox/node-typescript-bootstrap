exports.healthCheck = (_: any, res: { status: (arg0: number) => { send: (arg0: { uptime: number; }) => void; }; }) => res.status(200).send({ uptime: process.uptime() });
