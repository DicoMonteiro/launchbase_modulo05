// const fs = require("fs")
// const data = require("../data.json")
const { age, date, grade } = require("../../lib/utils")


module.exports = {
    index(req, res) {
        const foundstudents = data.students
        let students = []
        if (!foundstudents) return res.send("Students not found!")

        for (let student in foundstudents) {
            students[student] = {
                ...foundstudents[student],
                year: grade(foundstudents[student].year)
            }
        }
        // console.log(students)
        return res.render("students/index", { students: students })
    },
    create(req, res) {
        return res.render("students/create")
    },
    show(req, res) {
        const { id } = req.params

        const foundstudent = data.students.find(function(student) {
            return student.id == id
        })

        if (!foundstudent) return res.send("Students not found!")

        const student = {
            ...foundstudent,
            birth: date(foundstudent.birth).birthDay
        }

        return res.render("students/show", { student: student })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        return
    },
    edit(req, res) {
        return
    },
    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        return
    },
    delete(req, res) {
        return
    }
}


// Index
// exports.index = function (req, res) {
//     const foundstudents = data.students
//     let students = []
//     if (!foundstudents) return res.send("Students not found!")

//     for (let student in foundstudents) {
//         students[student] = {
//             ...foundstudents[student],
//             year: grade(foundstudents[student].year)
//         }
//     }
//     // console.log(students)
//     return res.render("students/index", { students: students })
// }

// Create
// exports.create = function(req, res) {
//     return res.render("students/create")
// }


// Show
// exports.show = function(req, res) {
    
//     const { id } = req.params

//     const foundstudent = data.students.find(function(student) {
//         return student.id == id
//     })

//     if (!foundstudent) return res.send("Students not found!")

//     const student = {
//         ...foundstudent,
//         birth: date(foundstudent.birth).birthDay
//     }

//     return res.render("students/show", { student: student })
// }

// Post
// exports.post = function(req, res) {

//     const keys = Object.keys(req.body)

//     for (key of keys) {
//         if (req.body[key] == "")
//             return res.send("Please, fill all fields!!")
//     }

//     // let { 
//     //     avatar_url,
//     //     name,
//     //     email,
//     //     birth, 
//     //     year, 
//     //     count_hours
//     // } = req.body

//     birth = Date.parse(req.body.birth)
//     // const created_at = Date.now()
//     // const id = Number(data.students.length + 1)

//     let id = 1
//     const lastStudent = data.students[data.students.length - 1]

//     if (lastStudent) {
//         id = lastStudent.id + 1
//     }

//     data.students.push({
//         id,
//         ...req.body,
//         birth
//     })

//     // No stringify podemos formatar como será registrado os dados
//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write File error!")

//         return res.redirect("/students")
//     })

// }

// // edit
// exports.edit = function(req, res) {
//     const { id } = req.params

//     const foundstudent = data.students.find(function(student) {
//         return student.id == id
//     })

//     if (!foundstudent) return res.send("Students not found!")

//     const student = {
//         ...foundstudent,
//         birth: date(foundstudent.birth).iso, // yyyy-mm-dd
//         // disciplinas: foundstudent.disciplinas.split(",")
//     }

//     return res.render("students/edit", { student: student })
// }

// // update
// exports.update = function(req, res) {
//     const { id } = req.body

//     let index = 0

//     const foundstudent = data.students.find(function(student, foundIndex) {
//         if (id == student.id) {
//             index = foundIndex
//             return true
//         }
//     })

//     if (!foundstudent) return res.send("Students not found!")

//     const student = {
//         ...foundstudent,
//         ...req.body,
//         birth: Date.parse(req.body.birth),
//         id: Number(req.body.id)
//     }

//     data.students[index] = student

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write error!")

//         return res.redirect(`/students/${id}`)
//     })
// }

// // delete
// exports.delete = function(req, res) {
//     const { id } = req.body

//     const filteredstudents = data.students.filter(function(student) {
//         return student.id != id
//     })

//     data.students = filteredstudents

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write file error!")

//         return res.redirect("/students")
//     })
// }