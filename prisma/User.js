const prisma = require('./lib')
const bcrypt = require('bcrypt')
const passport = require('passport')
const Strategy = require('passport-local').Strategy

passport.use(new Strategy(authenticate));
// passport.use(new Strategy(
//     function(username, password, cb) {
//         console.log("Prisma -> User -> passport -> Strategy",username, password)
//     }
// ))
passport.serializeUser(function(user, cb){
    console.log("Prisma -> User -> passport -> serializeUser",user.username)
    cb(null,user.username)
})
passport.deserializeUser(function(username, cb){
    console.log("Prisma -> User -> passport -> deserializeUser",username)
    getUserByUsername(username)
    .then(user => cb(null, user))
    .catch(err => cb(err))
})


//tes bcypt
var salt = bcrypt.genSaltSync(10)
var passhash = bcrypt.hashSync('123456',salt)

// console.log("User tes bcrypt",passhash)
// console.log("User tes bcrypt compare1",bcrypt.compareSync('123456','$2b$10$qlMqpf4.XzsoyaLvOD7lR.OiTdSfOOEd4aZ/fHGrEvVYg30JnpUtW'))
// console.log("User tes bcrypt compare2",bcrypt.compareSync('123456','$2b$10$H2ceeFwSduNqpOxSLE7kLeyUPgO0MwJatuJBJzzSRRd4lk/nnBjy2'))

async function authenticate(username, password, cb) {
    // const user = await getUserByUsername(username)
    // console.log("Prisma -> User -> authenticate")
    getUserByUsername(username)
    .then(user => {
        if(user) {
            console.log("Prisma -> User -> authenticate -> Found username",user.username)
            console.log("Prisma -> User -> authenticate -> Checking for password validation...")
    
            bcrypt.compare(password,user.password)
            .then(isMatch => {
                if(isMatch) {
                    console.log("Prisma -> User -> authenticate -> Password valid")
                    const { password, id, ...userWithoutPassword } = user
                    return cb(null,userWithoutPassword)
                } else {
                    console.log("Prisma -> User -> authenticate -> Password not valid")
                    return cb(null,false)
                }        
            })
            .catch(err => cb(null, false))
        } else {
            return cb(null,false)
        }
    })
    .catch(err => {
        cb(err)
    })
}

async function getUserByUsername(username) {
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username
            }
        }
    })
    return user
}

async function getAllUser() {
    const users = await prisma.user.findMany({
        select: {
            password: false,
            id: false,
            username: true,
            email: true,
            firstname: true,
            lastname: true,
            roleId: true,
            role: {
                select: {
                    id: false,
                    name: true
                }
            },
            online: true,
            active: true,
            lastLogin: true,
            createdAt: true
        }
    })
    return users
}

module.exports = {
    authenticate,
    getAllUser,
    getUserByUsername,
    passport,
}
//tes
// authenticate('miftah','123456')
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })
