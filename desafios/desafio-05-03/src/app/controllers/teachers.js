// const fs = require("fs")
// const data = require("../data.json")
const { age, date, graduation } = require("../../lib/utils")
// const db = require("../../config/db")
const Teacher = require("../../models/teacher")

module.exports = {
    index(req, res) {
        // db.query(`SELECT * FROM teachers`, function(err, results) {
        //     if (err) return res.send("Database Error!!!")

        //     return res.render("teachers/index", { teachers: results.rows })
        // })

        // Teacher.all(function(teachers) {
        //     // const foundTeachers = teachers
        //     if (!teachers) return res.send("Teachers not found!")
        //     for (let teacher in teachers) {
        //         teachers[teacher].subjects_taught = teachers[teacher].subjects_taught.split(",")
        //     }
        //     return res.render("teachers/index", { teachers })

        // })

        const { filter } = req.query

        if (filter) {
            Teacher.findBy(filter, function(teachers) {
                // const foundTeachers = teachers
                if (!teachers) return res.send("Teachers not found!")
                for (let teacher in teachers) {
                    teachers[teacher].subjects_taught = teachers[teacher].subjects_taught.split(",")
                }
                return res.render("teachers/index", { teachers, filter })
    
            })
        } else {
            Teacher.all(function(teachers) {
                // const foundTeachers = teachers
                if (!teachers) return res.send("Teachers not found!")
                for (let teacher in teachers) {
                    teachers[teacher].subjects_taught = teachers[teacher].subjects_taught.split(",")
                }
                return res.render("teachers/index", { teachers })
    
            })
        }

    },
    create(req, res) {
        return res.render("teachers/create")
    },
    show(req, res) {
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send("Teacher not found!!")

            teacher.age = age(teacher.birth_date)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.education_level = graduation(teacher.education_level)
            teacher.created_at = date(teacher.created_at).format
            return res.render("teachers/show", { teacher })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        // const query = `
        //         INSERT INTO teachers (
        //             name,
        //             avatar_url,
        //             birth_date,
        //             education_level,
        //             class_type,
        //             subjects_taught,
        //             created_at
        //         ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        //         RETURNING id
        // `

        // const values = [
        //     req.body.name,
        //     req.body.avatar_url,
        //     date(req.body.birth_date).iso,
        //     req.body.education_level,
        //     req.body.class_type,
        //     req.body.subjects_taught,
        //     date(Date.now()).iso
        // ]

        // db.query(query, values, function(err, results) {
        //     if (err) return res.send("Database Error!!!")

        //     return res.redirect(`/teachers/${results.rows[0].id}`)
        // })

        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    edit(req, res) {
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send("Teacher not found!!")

            teacher.birth_date = date(teacher.birth_date).iso
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            return res.render("teachers/edit", { teacher })
        })
    },
    update(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        Teacher.update(req.body, function(teacher) {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        Teacher.delete(req.body.id, function(teacher) {
            return res.redirect(`/teachers`)
        })
    }
}

// Index
// exports.index = function (req, res) {
//     const foundTeachers = data.teachers
//     let teachers = []
//     if (!foundTeachers) return res.send("Teachers not found!")

//     for (let teacher in foundTeachers) {
//         teachers[teacher] = {
//             ...foundTeachers[teacher],
//             disciplinas: foundTeachers[teacher].disciplinas.split(",")
//         }
//     }
//     // console.log(teachers)
//     return res.render("teachers/index", { teachers: teachers })
// }

// Create
// exports.create = function(req, res) {
//     return res.render("teachers/create")
// }

// exports.show = function(req, res) {
    
//     const { id } = req.params

//     const foundTeacher = data.teachers.find(function(teacher) {
//         return teacher.id == id
//     })

//     if (!foundTeacher) return res.send("Teacher not found!")

//     const teacher = {
//         ...foundTeacher,
//         age: age(foundTeacher.birth),
//         disciplinas: foundTeacher.disciplinas.split(","),
//         escolaridade: graduation(foundTeacher.escolaridade),
//         created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
//     }

//     return res.render("teachers/show", { teacher: teacher })
// }

// exports.post = function(req, res) {

//     const keys = Object.keys(req.body)

//     for (key of keys) {
//         if (req.body[key] == "")
//             return res.send("Please, fill all fields!!")
//     }

//     let { avatar_url, birth, escolaridade, class_type, disciplinas, name } = req.body

//     birth = Date.parse(birth)
//     const created_at = Date.now()
//     const id = Number(data.teachers.length + 1)

    

//     data.teachers.push({
//         id,
//         avatar_url,
//         name,
//         birth,
//         escolaridade,
//         class_type,
//         disciplinas,
//         created_at
//     })

//     // No stringify podemos formatar como será registrado os dados
//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write File error!")

//         return res.redirect("/teachers")
//     })

// }

// edit
// exports.edit = function(req, res) {
//     const { id } = req.params

//     const foundTeacher = data.teachers.find(function(teacher) {
//         return teacher.id == id
//     })

//     if (!foundTeacher) return res.send("Teacher not found!")

//     const teacher = {
//         ...foundTeacher,
//         birth: date(foundTeacher.birth).iso, // yyyy-mm-dd
//         disciplinas: foundTeacher.disciplinas.split(",")
//     }

//     return res.render("teachers/edit", { teacher: teacher })
// }

// update
// exports.update = function(req, res) {
//     const { id } = req.body

//     let index = 0

//     const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
//         if (id == teacher.id) {
//             index = foundIndex
//             return true
//         }
//     })

//     if (!foundTeacher) return res.send("Teacher not found!")

//     const teacher = {
//         ...foundTeacher,
//         ...req.body,
//         birth: Date.parse(req.body.birth),
//         id: Number(req.body.id)
//     }

//     data.teachers[index] = teacher

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write error!")

//         return res.redirect(`/teachers/${id}`)
//     })
// }

// delete

// exports.delete = function(req, res) {
//     const { id } = req.body

//     const filteredTeachers = data.teachers.filter(function(teacher) {
//         return teacher.id != id
//     })

//     data.teachers = filteredTeachers

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write file error!")

//         return res.redirect("/teachers")
//     })
// }