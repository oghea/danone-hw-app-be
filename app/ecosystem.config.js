module.exports = {
  apps: [
    {
      name: 'app',
      script: 'npm',
      args: 'start',
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production'
      }
    }
  ]
}
