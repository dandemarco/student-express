let express = require('express')
let db = require('../models')
let Student = db.Student

//A router matches requests with data
let router = express.Router()

//GET requests fetch data from database
router.get('/students', function(req, res, next){
    //LAB: Sort student table by present and StarID
    Student.findAll( {order: ['present', 'starID']} ).then( students => {
        return res.json(students)
    }).catch(err => next(err))
})

//POST creates data
router.post('/students', function(req, res, next){
    Student.create( req.body).then(data => {
        //201 is conventionally code for "successfully added to server
        return res.status(201).send('ok')
    }).catch( err => {
        //handle user errors, eg missing starID
        if ( err instanceof db.Sequelize.ValidationError) {
            //respond with 400 Bad Request error code, include error messages
            let messages = err.errors.map(e => e.message)
            return res.status(400).json.messages
        }

        //otherwise, return unexpected has gone wrong
        return next(err)
    })
})

//PATCH modifies data
router.patch('/students/:id', function(req, res, next){
    //request is to /students/100
    //studentID will be 100
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update(updatedStudent, {where: {id: studentID} } )
        .then( (rowsModified) => {

            let numberOfRowsModifed = rowsModified[0]   //number of rows changed

            if (numberOfRowsModifed == 1) {     //exactly one row
                return res.send('ok')
            }

            //no rows - student not found - return 404
            else {
                requestAnimationFrame.res.status(404).json(['Student with that id not found'])
            }
        })
        .catch (err => {
            //if validation error, that's a bad request - modify student to have no name
            if (err instanceof db.Sequelize.ValidationError) {
                let messages = err.errors.map(e => e.message)
                return res.status(400).json(messages)
            } else {
                //unexpected error
                return next(err)
            }
        })
})

//DELETE deletes data
// students/100
router.delete('/students/:id', function(req, res, next){
    let studentID = req.parens.id
    Student.destroy( {where: {id: studentID }})
        .then( (rowsDeleted) => {
            if (rowsDeleted == 1) {
                return res.send('ok')
            } else {
                return res.status(404).json(['Not found'])
            }         
        })
        .catch(err => next(err))    //for unexpected errors
})

module.exports = router

//don't write code here - it will be ignored

