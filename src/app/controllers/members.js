// uma função do node para escrever um arquivo e entre outras funções
// const fs = require("fs")
// const data = require("../data.json")
// const { time } = require("console")

const { date } = require("../../lib/utils")

const Member = require("../../models/member")

module.exports = {
    index(req, res) {
        // Member.all(function(members) {
        //     return res.render("members/index", { members })
        // })

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
            callback(members) {
                // console.log(members[0])
                // console.log(members[0].total)
                if(!members) return res.send("Member not found!")

                let pagination = ""
                
                if (members.length == 0) {
                    pagination = {
                        total: 1,
                        page
                    }
                } else {
                    pagination =  {
                        total: Math.ceil(members[0].total / limit),
                        page
                    }
                }
                // const pagination =  {
                //     total: Math.ceil(members[0].total / limit),
                //     page
                // }
                return res.render("members/index", { members, pagination, filter })
            }
        }

        Member.paginate(params)
    },
    create(req, res) {
        Member.instructorsSelectOptions(function(options) {
            return res.render('members/create', { instructorOptions: options })
        })
    },
    show(req, res) {
        Member.find(req.params.id, function(member) {
            if(!member) return res.send("Member not found!")

            member.birth = date(member.birth).birthDay
            return res.render("members/show", { member })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        Member.create(req.body, function(member) {
            return res.redirect(`/members/${member.id}`)
        })

    },
    edit(req, res) {
        Member.find(req.params.id, function(member) {
            if(!member) return res.send("Member not found!")
            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function(options) {
                return res.render('members/edit', { member, instructorOptions: options })
            })
            // return res.render("members/edit", { member })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill all fields!!")
        }

        Member.update(req.body, function(member) {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res) {
        
        Member.delete(req.body.id, function(member) {
            return res.redirect(`/members`)
        })
    }
}


// Index
// exports.index = function (req, res) {
//     // const foundmember = data.members
//     // let members = []
//     // if (!foundmember) return res.send("Member not found!")

//     // for (let member in foundmember) {
//     //     members[member] = {
//     //         ...foundmember[member],
//     //         services: foundmember[member].services.split(",")
//     //     }
//     // }
//     return res.render("members/index", { members: data.members })
// }

// // create
// exports.create = function(req, res) {
//     return res.render('members/create')
// }

// // show - retornar os dados de um instrutor
// exports.show =function(req, res) {
//     const { id } = req.params

//     const foundmember = data.members.find(function(member){
//         return member.id == id
//     })

//     if (!foundmember) return res.send("Member not found!")

//     const member = {
//         // Spread Operator (espalhando o ojeto)
//         ...foundmember,
//         birth: date(foundmember.birth).birthDay
//     }

//     // return res.send(foundmember)
//     return res.render("members/show", { member: member })
// }

// // post
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
//     const keys = Object.keys(req.body)

//     for (key of keys) {
//         if (req.body[key] == "")
//             return res.send("Please, fill all fields!!")
//     }

//     // Desestruturando o req.body
//     // let {
//     //     avatar_url, 
//     //     name, 
//     //     email, 
//     //     birth,
//     //     gender,
//     //     blood,
//     //     weight,
//     //     height
//     // } = req.body

//     // Convertendo o formato da data de nascimento
//     birth = Date.parse(req.body.birth)

//     // Criando o id para ser um dado único no registro
//     // req.body.id = Number(data.members.length + 1)

//     let id = 1
//     const lastMember = data.members[data.members.length - 1]

//     if (lastMember) {
//         id = lastMember.id + 1
//     }

//     // Inserindo um dado no array
//     // data.members.push(req.body) usando desestruturação do req.body

//     data.members.push({
//         id,
//         ...req.body,
//         birth
//     })

//     // No stringify podemos formatar como será registrado os dados
//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write File error!")

//         return res.redirect("/members")
//     })
// }

// // edit
// // Página para edição
// exports.edit = function(req, res) {
//     const { id } = req.params

//     const foundmember = data.members.find(function(member){
//         return member.id == id
//     })

//     if (!foundmember) return res.send("Member not found!")

//     const member = {
//         ...foundmember,
//         birth: date(foundmember.birth).iso // yyyy-mm-dd
//     }

//     return res.render('members/edit', { member })
// }

// // put
// // Lógica para persistir a alteração feita
// exports.put = function(req, res) {
//     const { id } = req.body

//     let index = 0

//     const foundmember = data.members.find(function(member, foundIndex){
//         if (id == member.id) {
//             index = foundIndex
//             return true
//         }
//     })

//     if (!foundmember) return res.send("Member not found!")

//     const member = {
//         ...foundmember,
//         ...req.body,
//         birth: Date.parse(req.body.birth),
//         id: Number(req.body.id)
//     }

//     data.members[index] = member

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if(err) return res.send("Write error!")

//         return res.redirect(`/members/${id}`)
//     })

// }

// // delete

// exports.delete = function(req, res) {
//     const { id } = req.body

//     const filteredmembers = data.members.filter(function(member) {
//         // Se retornar false, ele retira do elemento filteredInstrutor e se for true ele colocar dentro
//         return member.id != id
//     })

//     data.members = filteredmembers

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
//         if (err) return res.send("Write file error!")

//         return res.redirect("/members")
//     })
// }