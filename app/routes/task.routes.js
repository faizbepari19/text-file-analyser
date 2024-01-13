const router = require("express").Router();

const tasks = require("../controllers/task.controller.js");
module.exports = app => {
    
    router.post("/start", tasks.startAnalysis);
  
    router.get("/retrieve/:task_id", tasks.getAnalysis);
  
    app.use('/api/task', router);
  };
  