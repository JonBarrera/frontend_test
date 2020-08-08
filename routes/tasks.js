var express = require("express")
var router = express.Router();
var mongojs = require("mongojs")
var db = mongojs(
    "meantask",
    ["tasks"]
)

//Get all tasks
router.get("/tasks", function(req, res, next){
db.tasks.find(function(err, tasks){
    if (err) {
        res.send(err)
    }
    res.json(tasks)
})
})

//Save task
router.post("/task", function(req, res, next){
    var task = req.body
    console.log(task)
    if (!task.title) {
        res.status(400)
        res.json({
            error: "Bad data"
        })
    }else{
        db.tasks.save(task, function(err, task){
            if (err) {
                res.send(err)
            }
            res.json(task)
        })
    }
})
//Delete task
router.delete("/task/:id", function(req, res){
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)}, function(
        err, task
    ){
        if (err) {
            res.send(err)
        }
        res.json(task)
    })
})

//Update task
router.put("/task/:id", function(req, res){
    var task = req.body
    var updTask = {};

    if (task.title) {
        updTask.title = task.title
    }
    if (!updTask) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    }else{
        db.tasks.update({
            _id: mongojs.Object(req.params.id)
        },
        updTask,
        {},
        function(err, task){
            if (err) {
                res.send(err)
            }
            res.json()
        }
        )
    }
})

module.exports = router;