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
                count_hours
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth_date).iso,
            data.email,
            data.year,
            data.count_hours
        ]

        // console.log(values)

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error!!! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
            SELECT * 
            FROM students
            WHERE id = $1`, [id],function(err, results) {
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
            count_hours=($6)
            WHERE id = $7
        `
    
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth_date).iso,
            data.email,
            data.year,
            data.count_hours,
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
    }
}