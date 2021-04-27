const service = require('../prisma/User')

function authenticate(req, res, next) {
    // console.log("util authenticate -> auth header", req.headers.authorization.split(' '))
    // console.log("util authenticate -> req params", req.params)
    if (req.headers.authorization) {
        const authPlain = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString()
        const userData = authPlain.split(":")

        // console.log("util authenticate dummy jwt -> authPlain", authPlain)
        // console.log("util authenticate dummy jwt -> userData", userData)

        if (userData.length == 2) {
            service.authenticate(userData[0], userData[1])
            .then(user => {
                req.user = user
                // console.log("util authenticate success user", req.user)
                next()
            })
            .catch(err => {
                // console.log("util authenticate failed with error", err)
                return res.status(401).json({message: "Authectication failed"})
            })
        } else {
            return res.status(400).json({ message: "Bad request" })
        }
    } else {
        return res.status(400).json({ message: "Bad request" })
    }
}

function authorize(roles = []) {
    // console.log("util authoroze")
    if(typeof roles === "number") {
        roles = [roles]
    }

    return [
        //dummy jwt
        //next with jwt auth
        authenticate,
        (req, res, next) => {
            // console.log("util authorize role validation -> req.user",req.user)
            if(roles.length && !roles.includes(req.user.roleId)) {
                return res.status(401).json({message: "Unauthorized"})
            }
            console.log("util authorize role validation success")
            next()
        }
    ]
}

function authorize1(roles = []) {
    console.log("util authoroze1")
    
    if (typeof roles === "number") {
        roles = [roles]
    }

    return (req, res, next) => {
        // console.log("util authorize role validation -> req.user", req.user)
        if (roles.length && !roles.includes(req.user.roleId)) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        console.log("util authorize1 role validation success")
        next()
    }
}

module.exports = authorize1