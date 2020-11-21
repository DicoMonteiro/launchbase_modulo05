module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        if (month < 0 || month ==0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }
    
        return age
    
    },
    date(timestamp) {
        const date = new Date(timestamp)

        // yyyy
        const year = date.getUTCFullYear()
        // mm
        // slice usado para pegar determinados dados do elemento, no caso, pegando os dois ultimos dados
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        // dd
        const day = `0${date.getUTCDate()}`.slice(-2)

        // yyyy/mm/dd
        // console.log(`${year}-${month}-${day}`)
        // return `${year}-${month}-${day}`
        // Estruturando para retornar um objeto e poder ser pego os dados individualmente
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    }
}




