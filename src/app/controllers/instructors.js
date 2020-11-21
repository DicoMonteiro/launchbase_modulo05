// uma função do node para escrever um arquivo e entre outras funções
// const fs = require("fs")
// const data = require("../data.json")
// const { time } = require("console")

const { age, date } = require("../../lib/utils")
// const db = require("../../config/db")
const Instructor = require("../../models/instructor")


module.exports = {
    index(req, res) {
        // Primeira instancia de solução SEM conter Filter
        // db.query(`SELECT * from instructors`, function(err, results) {
        //     if (err) return res.send("Database Error!!")

        //     return res.render("instructors/index", {instructors: results.rows})
        // })
        // console.log(req.query)

        // Segunda instancia de solução CONTENDO Filter
        // const { filter } = req.query

        // if (filter) {
        //     Instructor.findBy(filter, function(instructors) {
        //         const foundInstructor = instructors
        //         if (!foundInstructor) return res.send("Instructor not found!") 
    
        //         for (let instructor in foundInstructor) {
        //             instructors[instructor].services = instructors[instructor].services.split(",")
        //         }
        //         return res.render("instructors/index", { instructors, filter })
        //     })
        // } else {
        //     Instructor.all(function(instructors) {
        //         const foundInstructor = instructors
        //         if (!foundInstructor) return res.send("Instructor not found!") 
    
        //         for (let instructor in foundInstructor) {
        //             instructors[instructor].services = instructors[instructor].services.split(",")
        //         }
        //         return res.render("instructors/index", { instructors })
        //     })
        // }

        // Primeira instancia SEM conter o Filter
        // Instructor.all(function(instructors) {
        //     const foundInstructor = instructors
        //     if (!foundInstructor) return res.send("Instructor not found!") 

        //     for (let instructor in foundInstructor) {
        //         instructors[instructor].services = instructors[instructor].services.split(",")
        //     }
        //     return res.render("instructors/index", { instructors })
        // })

        // Terceira instancia contendo Filter, Paginação
        let { filter, page, limit } = req.query

        // Essa estrutura a seguir substitui o if/else, controlando a quantidade de registro por pagina:
        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) {
                if (!instructors) return res.send("Instructor not found!")
                
                let pagination = ""
                
                if (instructors.length == 0) {
                    pagination = {
                        total: 1,
                        page
                    }
                } else {
                    pagination =  {
                        total: Math.ceil(instructors[0].total / limit),
                        page
                    }
                }

                for (let instructor in instructors) {
                    instructors[instructor].services = instructors[instructor].services.split(",")
                }
                return res.render("instructors/index", { instructors, pagination, filter })
            }
        }

        Instructor.paginate(params)

    },
    create(req, res) {
        return res.render('instructors/create')
    },
    show(req, res) {

        Instructor.find(req.params.id, function(instructor) {
            if(!instructor) return res.send("Instructor not found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format
            return res.render("instructors/show", { instructor })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        // const query = `
        //     INSERT INTO instructors (
        //         name,
        //         avatar_url,
        //         gender,
        //         services,
        //         birth,
        //         created_at
        //     ) VALUES ($1, $2, $3, $4, $5, $6)
        //     RETURNING id
        // `
        // const values = [
        //     req.body.name,
        //     req.body.avatar_url,
        //     req.body.gender,
        //     req.body.services,
        //     date(req.body.birth).iso,
        //     date(Date.now()).iso
        // ]

        // db.query(query, values, function(err, results) {
        //     // console.log(err)
        //     // console.log(results)
        //     if (err) return res.send("Database Error!!")

        //     return res.redirect(`/instructors/${results.rows[0].id}`)
        // })

        // return

        Instructor.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
        })
    },
    edit(req, res) {
        Instructor.find(req.params.id, function(instructor) {
            if(!instructor) return res.send("Instructor not found!")

            instructor.birth = date(instructor.birth).iso
            return res.render("instructors/edit", { instructor })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        Instructor.update(req.body, function(instructor) {
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req, res) {
        Instructor.delete(req.body.id, function(instructor) {
            return res.redirect(`/instructors`)
        })
    }
}

// Index
// exports.index = function (req, res) {
//     const foundInstructor = data.instructors
//     let instructors = []
//     if (!foundInstructor) return res.send("Instructor not found!")

//     for (let instructor in foundInstructor) {
//         instructors[instructor] = {
//             ...foundInstructor[instructor],
//             services: foundInstructor[instructor].services.split(",")
//         }
//     }
//     return res.render("instructors/index", { instructors: instructors })
// }

// exports.create = function(req, res) {
//     return res.render('instructors/create')
// }

// show - retornar os dados de um instrutor
// exports.show =function(req, res) {
//     // req.query.id
//     // req.body
//     // req.params.id = /:id

//     const { id } = req.params

//     const foundInstructor = data.instructors.find(function(instructor){
//         return instructor.id == id
//     })

//     if (!foundInstructor) return res.send("Instructor not found!")

//     const instructor = {
//         // Spread Operator (espalhando o ojeto)
//         ...foundInstructor,
//         age: age(foundInstructor.birth),
//         services: foundInstructor.services.split(","),
//         created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
//     }

//     // return res.send(foundInstructor)
//     return res.render("instructors/show", { instructor: instructor })
// }

// post
// exports.post = function(req, res) {

//     // req.body
//     // {
//     //     "avatar_url": "http://www.google.com",
//     //     "name": "Adriano",
//     //     "birth": "1984-12-22",
//     //     "gender": "M",
//     //     "services": "musculação, crossfit"
//     //   }

//     // Validar a obrigatoriedade de preencher os campos
//     // [
//     //     "avatar_url",
//     //     "name",
//     //     "birth",
//     //     "gender",
//     //     "services"
//     //   ]

//     const keys = Object.keys(req.body)

//     for (key of keys) {
//         if (req.body[key] == "")
//             return res.send("Please, fill all fields!!")
//     }
//     // Convertendo o formato da data de nascimento
//     req.body.birth = Date.parse(req.body.birth)
//     // Definindo a data de criação do registro Instructor
//     req.body.created_at = Date.now()
//     // Criando o id para ser um dado único no registro
//     req.body.id = Number(data.instructors.length + 1)

//     // Inserindo um dado no array
//     // data.instructors.push(req.body)

//     // Desestruturando o req.body
//     const { avatar_url, birth, created_at, id, gender, services, name } = req.body

//     data.instructors.push({
//         id,
//         avatar_url,
//         name,
//         birth,
//         gender,
//         services,
//         created_at
//     })

//     // No stringify podemos formatar como será registrado os dados
//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write File error!")

//         return res.redirect("/instructors")
//     })

//     // return res.send(req.body)
// }

// edit
// Página para edição
// exports.edit = function(req, res) {
//     const { id } = req.params

//     const foundInstructor = data.instructors.find(function(instructor){
//         return instructor.id == id
//     })

//     if (!foundInstructor) return res.send("Instructor not found!")

//     const instructor = {
//         ...foundInstructor,
//         birth: date(foundInstructor.birth).iso // yyyy-mm-dd
//     }

//     return res.render('instructors/edit', { instructor })
// }

// put
// Lógica para persistir a alteração feita
// exports.put = function(req, res) {
//     const { id } = req.body

//     let index = 0

//     const foundInstructor = data.instructors.find(function(instructor, foundIndex){
//         if (id == instructor.id) {
//             index = foundIndex
//             return true
//         }
//     })

//     if (!foundInstructor) return res.send("Instructor not found!")

//     const instructor = {
//         ...foundInstructor,
//         ...req.body,
//         birth: Date.parse(req.body.birth),
//         id: Number(req.body.id)
//     }

//     data.instructors[index] = instructor

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if(err) return res.send("Write error!")

//         return res.redirect(`/instructors/${id}`)
//     })

// }

// delete

// exports.delete = function(req, res) {
//     const { id } = req.body

//     const filteredInstructors = data.instructors.filter(function(instructor) {
//         // Se retornar false, ele retira do elemento filteredInstrutor e se for true ele colocar dentro
//         return instructor.id != id
//     })

//     data.instructors = filteredInstructors

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write file error!")

//         return res.redirect("/instructors")
//     })
// }