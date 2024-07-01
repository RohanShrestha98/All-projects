module.exports = {
  apps : [{
    name :"poischool",
    script : "PORT=8001 yarn start",
    error_file : "./pm2-error.log",
    out_file : "./pm2-out.log",
  }]
}
