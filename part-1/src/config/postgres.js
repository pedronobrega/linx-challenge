const dotenv = require('dotenv');
const path = `./.env.${process.env.ENVIRONMENT}`;

dotenv.config({ path });

module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres',
  username: 'docker',
  password: 'docker',
  database: 'docker',
  define: {
    timestamps: true,
    underscored: true,
  },
};
