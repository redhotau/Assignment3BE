const { User } = require("../models");
const { sign } = require('jsonwebtoken');
const { compareSync } = require("bcrypt");

//register
exports.register = async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user)
        } catch (error) {
            res.status(401).json({error: error.message})
            
        }
}

//login
exports.login = async (req, res) => {
    const { email, password } = req.body;       //get email from request body
    try {
        const user = await User.findOne({ where: { email } });         //query from Models User from email req.body to generate token

        //Handler if user not found/wrong
        if(!user) {
            return res.status(401).json({
                error: "Unauthenticated",
                message: "Invalid email or password",
            })
        };
        //Handler if password wrong
        if (!compareSync(password, user.password)) {            
            return res.status(401).json({
                error: "Unauthenticated",
                message: "Invalid email or password",
            })
        };

        const payload = {id: user.id, email: user.email};       //init payload
        const token = sign(payload, process.env.JWT_SECRET);    //generate token
        res.status(201).json({ token });                        //display token
      } catch (error) {
        console.log(error);
        res.status(401).json({
          error: error.name,
          message: error.message,
        });
      }
}