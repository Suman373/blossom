const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// create jwt token
const createToken = (payload, secret, expiry) => {
    return jwt.sign({ payload }, secret, { expiresIn: `${expiry}` });
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(422).json({ message: "Fill all details" });
        }
        const user = await UserModel.register(req.body);
        if (!user) throw Error("Registration failed");
        const token = createToken(user._id, process.env.JWT_SECRET, "2D");
        if (!token) throw Error("Token creation failed");
        //success
        res.status(201).json({ message: "Registration successful", token: token });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ message: "Fill the details correctly" });
        }
        const user = await UserModel.login(email, password);
        const token = createToken(user._id, process.env.JWT_SECRET, "2D");
        if (!user) {
            throw new Error("Login failed");
        }
        if (!token) {
            throw new Error("Token creation failed");
        }
        //success
        res.cookie('token', token,
            {
                httpOnly: true,
                sameSite: 'None',
                secure:true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).status(200).json({
            message: "Login successful", user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                completedDetails:user.completedDetails
            }
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        const cookie = await req.cookies;
        // if(!cookie.token){
        //     return res.status(401).json({message:'Unauthorized. Token is missing!'});
        // }
        res.clearCookie(
            'token', {
            httpOnly: true,
            sameSite: 'None',
            secure:true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
        );
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}


module.exports = { registerUser, loginUser, logoutUser };