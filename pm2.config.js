module.exports = {
    apps : [{
      name        : "www",
      script      : "./dist/server.js",
      watch       : true,
      
    },{
      name       : "app",
      script     : "./dist/app.js",
      watch:true
    }]
  }