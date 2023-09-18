const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let check = async() =>{
    // const result = await bcrypt.compare("Jman@1234","$2b$10$WhM8DclBj7RLfZYGHskcxeWkaucNSI/a9EZV4ZWgwPHm1w2HAs/fK")
    // console.log(result)
    const res = await bcrypt.hash("Leo@1234",10)
    console.log(res)
}
check()

