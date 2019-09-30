import config from './index';

const dbConfiguration = {
  [config.environment]: config.common.database
};

export default dbConfiguration;

module.exports = dbConfiguration;
