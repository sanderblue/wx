module.exports = {
  apps: [
    {
      name: 'wx',
      script: './dist/apps/wx-backend/main.js',
      exec_mode: 'cluster',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
        ENVIRONMENT: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        ENVIRONMENT: 'production',
        NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
      },
    },
  ],
};
