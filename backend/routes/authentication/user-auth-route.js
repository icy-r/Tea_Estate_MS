import { Router } from "express";
import {
  userLogin,
  userLogout,
  userRegister,
  userUpdate,
  userDelete,
  userGet,
  userGetAll,
} from "../../controllers/user-auth-controller.js";

const router = Router();

router.post("/userLogin", userLogin);
router.post("/userLogout", userLogout);
router.post("/userRegister", userRegister);
router.post("/userUpdate", userUpdate);
router.post("/userDelete", userDelete);
router.post("/userGet", userGet);
router.post("/userGetAll", userGetAll);

export { router };
