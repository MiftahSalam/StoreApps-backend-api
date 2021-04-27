
const prisma = require('./lib')

async function getAllUser() {
    const users = await prisma.user.findMany()
    console.log("Prisma access getAllUser",users)
} 

async function getUserById(id) {
    const users = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    console.log("Prisma access getUserById",users)
} 

async function getUserByNameExact(username) {
    const users = await prisma.user.findFirst({
        where: {
            username: {
                equals: username
            }
        }
    })
    console.log("Prisma access getUserByNameExact",users)
} 

async function getUsersByNameContains(sub) {
    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: sub
            }
        }
    })
    console.log("Prisma access getUsersByNameContains",users)
} 

async function getUsersByFirstName(firstname) {
    const users = await prisma.user.findMany({
        where: {
            firstname: {
                startsWith: firstname
            }
        }
    })
    console.log("Prisma access getUsersByFirstName",users)
} 

async function getUsersByLastName(lastname) {
    const users = await prisma.user.findMany({
        where: {
            lastname: {
                endsWith: lastname
            }
        }
    })
    console.log("Prisma access getUsersByLastName",users)
} 

async function getUserByEmailExact(email) {
    const users = await prisma.user.findFirst({
        where: {
            email: {
                equals: email
            }
        }
    })
    console.log("Prisma access getUserByEmailExact",users)
} 

async function getUsersByEmailContains(sub) {
    const users = await prisma.user.findMany({
        where: {
            email: {
                contains: sub
            }
        }
    })
    console.log("Prisma access getUsersByEmailContains",users)
} 

async function getUsersByOnlineStatus(online) {
    const users = await prisma.user.findMany({
        where: {
            online: {
                equals: online
            }
        }
    })
    console.log("Prisma access getUsersByOnlineStatus",users)
} 

async function getUsersByRole(role) {
    const users = await prisma.user.findMany({
        where: {
            roleId: {
                equals: role
            }
        },
        select: {
            username: true,
            email: true
        }
    })
    console.log("Prisma access getUsersByRole",users)
}

async function getAllRole() {
    const roles = await prisma.role.findMany({
        include: {
            user: true,
            roleAction: true
        }
    })

    for(role of roles) {
        console.log("Prisma access getAllRole role",role)
    }
}

// getAllRole()
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getUsersByRole(1)
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getAllUser()
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getUserById(1)
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getUserByNameExact("alif")
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getUsersByNameContains("f")
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getUsersByFirstName("Alif")
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getUsersByLastName("Salam")
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getUserByEmailExact("alif@yahoo.com")
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getUsersByEmailContains("yahoo.com")
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// getUsersByOnlineStatus(false)
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })
