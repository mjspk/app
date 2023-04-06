const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');
const authService = {
    async verifyUser(req) {
        const username = req.body.email;
        const password = req.body.password;
        let response;
        try {
            if (username === "user@root.com" && password === "root") {
                response = {
                    data: {
                        username: username
                    }
                }
            };
        } catch (error) {
            console.log(error);
        }
        if (response.hasOwnProperty('data') && response.data) {
            response = response.data;
        }
        return jwt.sign({ user: response }, authConfig.JWT_SECRET, { expiresIn: '1h' });
    },

    async verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, authConfig.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }

};
module.exports = authService;