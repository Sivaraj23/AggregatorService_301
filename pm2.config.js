module.exports = {
    apps : [{
      name        : "www",
      script      : "./bin/www --exec babel-node",
      watch       : true,
      
    },{
      name       : "app",
      script     : "./app.js",
      watch:true
    }]
  }