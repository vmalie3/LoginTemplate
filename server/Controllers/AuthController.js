import User from "../Models/UserModel.js";
import createSecretToken from "../util/SecretToken.js";
import bcrypt from 'bcrypt'

const validateEmail = (email) => {
    return email.match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    )
}

export const Signup = async (req, res, next) => {
    try {
        let { email, password, username, createdAt } = req.body;

        email = email.trim();
        username = username.trim();
        password = password.trim();

        const valid = validateEmail(email)
        if (!valid) {
            return res.json({ message: "Email not valid" })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.json({ message: "User already exists" });
        }
        const duplicateUsername = await User.findOne({ username });
        if (duplicateUsername) {
            return res.json({ message: "Username already taken" });
        }
        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res
          .status(201)
          .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
    }
}

export const Login = async (req, res, next) => {
    try {
      let { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }

      email = email.trim()
      password = password.trim()

      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
}


