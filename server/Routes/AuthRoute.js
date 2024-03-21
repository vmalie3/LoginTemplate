import { Login, Signup } from "../Controllers/AuthController.js";
import { Router } from "express";
import { userVerification } from "../Middlewares/AuthMiddleware.js";

const router = Router()

router.post('/', userVerification);
router.post("/signup", Signup);
router.post("/login", Login)

export default router;