const db = require("../config/db")
const { age, date, grade } = require("../lib/utils")

module.exports = {
    all(callback) {
        db.query(`
            SELECT * 
            FROM students
            ORDER BY name ASC`, function(err, results) {
                if (err) throw `Database Error!!! ${err}`
                callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO students (
                name,
                avatar_url,
                birth_date,
                email,
                year_school,
                count_hours,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth_date).iso,
            data.email,
            data.year,
            data.count_hours,
            data.teacher
        ]

        // console.log(values)

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error!!! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        // db.query(`
        //     SELECT * 
        //     FROM students
        //     WHERE id = $1`, [id],function(err, results) {
        //         if(err) throw `Database Error!!! ${err}`
        //         callback(results.rows[0])
        // })

        db.query(`
            SELECT students.*, teachers.name AS teacher_name 
            FROM students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            WHERE students.id = $1`, [id],function(err, results) {
                if(err) throw `Database Error!!! ${err}`
                callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE students SET
            name=($1),
            avatar_url=($2),
            birth_date=($3),
            email=($4),
            year_school=($5),
            count_hours=($6),
            teacher_id=($7)
            WHERE id = $8
        `
    
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth_date).iso,
            data.email,
            data.year,
            data.count_hours,
            data.teacher,
            data.id
        ]

        // console.log(values)

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error!!! ${err}`
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database Error!!! ${err}`
            callback()
        })
    },
    teachersSelectOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, function(err, results) {
            if (err) throw `Database Error!!! ${err}`
            callback(results.rows)
        })
    }
}