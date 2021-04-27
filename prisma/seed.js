const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const roleActionData = [
    {
        name: "Add"
    },
    {
        name: "Edit"
    },
    {
        name: "Delete"
    }
]
const roleData = [
    {
        name: "Admin"
    },
    {
        name: "Staff"
    },
]
const userData = [
    // {
    //     name: "Miftah",
    //     email: "salam.miftah@gmail.com",
    //     roleId: 1,
    //     online: true,
    // },
    {
        name: "Alif",
        email: "alif@yahoo.com",
        roleId: 2,
        online: false,
    },
]

const contactData = [
    {
        firstname: "Miftah",
        lastname: "Salam",
        phone1: "0813202350548",
        phone2: "08957313471947",
        deviceId: "dfcfsd322",
        deviceName: "Redmi Note 5",
        deviceOS: "Android Pie",
        deviceVersion: "9.0.0",
        store: {
            create: {
                name: "SKM"
            }
        }
    },
    {
        firstname: "Alifiandra",
        lastname: "Fahreza",
        phone1: "0813202350549",
        phone2: "08957313471997",
        deviceId: "dfcfsd321",
        deviceName: "Samsung Galaxy S4",
        deviceOS: "Android Marshmelow",
        deviceVersion: "7.0.0",
        store: {
            create: {
                name: "MEL"
            }
        }
    },
]

const storeUrlsData = [
    {
        url: "http://www.google.com",
        storeId: 1,
    },
    {
        url: "http://www.github.com",
        storeId: 1,
    },
    {
        url: "http://www.medium.com",
        storeId: 2,
    },
    {
        url: "http://www.facebook.com",
        store: {
            create: {
                name: "RTI"
            }
        }
    },
]

const storeData = [
    // {
    //     name: "Infra",
    //     contact: {
    //         create: {
    //             firstname: "Aga",
    //             lastname: "Wiwik",
    //             phone1: "0813204250548",
    //             phone2: "0895733471947",
    //             deviceId: "dfcfsm322",
    //             deviceName: "Redmi Note 5",
    //             deviceOS: "Android Pie",
    //             deviceVersion: "9.0.0",    
    //         }
    //     },
    //     url: {
    //         create: [
    //             {
    //                 url: "http://www.kompas.com"
    //             },
    //             {
    //                 url: "http://www.detik.com"
    //             }
    //         ]
    //     }
    // },
    {
        name: "Spartindo",
    }
]

async function storeSeed() {
    console.log("Starting seeding store...")
    for(const s of storeData) {
        const store = await prisma.store.create({
            data: s
        })
        console.log("Create store:",s.name)
    }
    console.log("Store seeding finished...")
}

async function storeUrlSeed() {
    console.log("Starting seeding store url...")
    for(const su of storeUrlsData) {
        const storeUrl = await prisma.storeUrl.create({
            data: su
        })
        console.log("Create store url:",su.url)
    }
    console.log("Store urls seeding finished...")
}

async function roleActionSeed() {
    console.log("Start seeding role action...")
    for(const ra of roleActionData) {
        const roleAction = await prisma.roleAction.create({
            data: ra,
        })
        console.log("Create role action:",ra.name)
    }
    console.log("Role Action Seeding finished")
}

async function roleSeed() {
    console.log("Start seeding role...")
    for(const r of roleData) {
        const role = await prisma.role.create({
            data: r,
        })
        console.log("Create role:",r.name)
    }
    console.log("Role seeding finished")
}

async function userSeed() {
    console.log("Start seeding user...")
    for(const u of userData) {
        const user = await prisma.user.create({
            data: u
        })
        console.log("Create user:",u.name)
    }
    console.log("User seeding finished")
}

async function contactSeed() {
    console.log("Start seeding contact...")
    for(const c of contactData) {
        const contact = await prisma.contact.create({
            data: c
        })
        console.log("Create contact:",c.firstname)
    }
    console.log("Contact seeding finished")
}

async function seedRole2RoleAction() {
    console.log("Start seeding role to roleAction...")
    const role2RoleAction = await prisma.role.update({
        where: {id: 1},
        data: {
            roleAction: {
                set: [
                    {
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3
                    }
                ]
            }
        }
    })
    console.log("Role to role action seeding finished...")
}

// roleActionSeed()
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// roleSeed()
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// contactSeed()
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

storeSeed()
.catch((e) => {
    console.error(e)
    process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect()
})

// storeUrlSeed()
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// userSeed()
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })

// seedRole2RoleAction()
// .catch((e) => {
//     console.error(e)
//     process.exit(1)
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })
