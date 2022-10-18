const express = require('express')
const Joi = require('joi')
const app = express()

//Middle ware
app.use(express.json())

const courses = [
    { id: 1, name: "MVP Course 1"},
    { id: 2, name: "MVP Course 2"},
    { id: 3, name: "MVP Course 3"},
]

app.get("/", (req, res) => {
    res.send("Hello World")
})


app.get("/api/courses", (req, res) => {
    res.send(courses)
})


app.get("/api/courses/:id", (req, res) => {
    const course = courses.find( course =>  course.id === parseInt(req.params.id) )
    if(!course){
        res.status(404).send("The Course is not found")
        return 
    }
    res.send(course)
})

app.post("/api/courses/", (req, res) => {
    const { error } = validateCourse(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course)

    res.status(200).send(course)
})

//update a course
app.put("/api/courses/:id", (req, res) => {
    //check if course exists 
    const course = courses.find( course =>  course.id === parseInt(req.params.id) )
    if(!course){
        res.status(404).send("The Course is not found")
        return 
    }

    //validate the schema
    const { error } = validateCourse(req.body)

    if(error){
        res.status(400).send(error.details[0].message)
        return
    }

    //if no issues update and return the course
    course.name = req.body.name
    res.send(course)
})


//delete course
app.delete("/api/courses/:id", (req, res) => {
    //check if course exists 
    const course = courses.find( course =>  course.id === parseInt(req.params.id) )
    if(!course){
        res.status(404).send("The Course is not found")
        return 
    }

    //remove and return it 
    let index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)

})




function validateCourse(course){

    const schema = Joi.object({
        name: Joi.string().required().min(3)
    })

    return schema.validate(course)
}






// PORT
const port = 3000 
app.listen(port, () => console.log(`Listening on port ${port}...`))