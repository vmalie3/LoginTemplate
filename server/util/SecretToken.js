import dotenv from "dotenv";
import JsonWebToken from "jsonwebtoken";

dotenv.config()

const createSecretToken = (id) => {
    const { sign } = JsonWebToken
    return sign({ 
        id: id,
        free_account: "true"
     }, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60,
    });
}

export default createSecretToken;