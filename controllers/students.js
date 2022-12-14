const path = require('path');
const advancedResults = require('../middleware/advancedResults');
const asyncHandler = require('../middleware/async');
const Student = require('../models/Student');
const Educator = require('../models/Educator');

// @desc        Get all students
// @route       GET /api/v1/students
// @access      Private
exports.getStudents = asyncHandler( async (req, res, next) => {
    // await MyModel.find({});
    const students = await Student.find()
    res.status(200).json({
        success: true,
        data: students
    });
});

// @desc        Get single student
// @route       GET /api/v1/students/:id
// @access      Private
exports.getStudent = asyncHandler( async (req, res, next) => {

    const student = await Student.findById(req.params.id);
    
    res.status(200).json({
        success: true,
        data: student 
    });

});

// @desc        Create student
// @route       POST /api/v1/students
// @access      Private
exports.createStudent = asyncHandler( async (req, res, next) => {

    req.body.educator = req.id       
    
    const newStudent = await Student.create(req.body);

    // const addToEducatorSchema = await Educator.findByIdAndUpdate(
    //     req.params.id, {
    //     "students": newStudent.ObjectId
    //     // add newly created Student ObjectId to logged in/auth Educator 
    //     // Schema
    // }
    // );

    res
    .status(201).json({
        success: true,
        data: newStudent
    });
});




// @desc        Update student
// @route       PUT /api/v1/students/:id
// @access      Private
exports.updateStudent = asyncHandler( async (req, res, next) => {

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, 
        {
        new: true,
        // read about runValidators
        runValidators: true
        });
    
    res.status(200).json({
        success: true,
        data: student 
    });

});


// @desc        Delete student
// @route       DELETE /api/v1/students/:id
// @access      Private
exports.deleteStudent = asyncHandler( async (req, res, next) => {

    const student = await Student.findById(req.params.id);

    student.remove();
    res.status(200).json({
        success: true,
        data: {}  
    });
});

