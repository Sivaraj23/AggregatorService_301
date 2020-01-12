module.exports = {
    apps : [{
      name        : "aggregate",
      script      : "./dist/server.js",
      watch       : true,
      env : {
        PORT : 3000
   }}] 
 }
