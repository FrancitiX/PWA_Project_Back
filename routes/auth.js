const express = require("express");
const router = express.Router();

const userController = require("../src/Api/Users/userController");
const user_imageController = require("../src/Api/User_Image/user_imageController");
const rolesController = require("../src/Api/Role/RolesController");
const configurationsController = require("../src/Api/Configs/configController");

const authMiddleware = require('../src/Middleware/authMiddleware');

// Rutas para autenticación de usuarios
router.post("/newUser", authMiddleware, userController.registerUser);
router.get("/userData", authMiddleware, userController.userData);
router.put("/updateUser", authMiddleware, userController.updateUser);
router.get("/get-All-User", authMiddleware, userController.getAllUsers);
router.delete("/deleteUser", authMiddleware, userController.deleteUser);

router.get("/:user/userImage", authMiddleware, user_imageController.userImage);

// Rutas para roles
router.post("/newRole", authMiddleware, rolesController.newRole);
router.get("/roles/:id", authMiddleware, rolesController.getRole);
router.get("/roles", authMiddleware, rolesController.getAllRoles);
router.delete("/roles/:id", authMiddleware, rolesController.deleteRole);

// Rutas para configuraciones
router.post(
  "/addConfiguration",
  authMiddleware,
  configurationsController.createConfig
);
router.get(
  "/configurations/:id",
  authMiddleware,
  configurationsController.getConfig
);
// router.get("/configurations", authMiddleware, configurationsController.getAllConfigs);
router.put(
  "/configurations/:id",
  authMiddleware,
  configurationsController.updateConfig
);
router.delete(
  "/configurations/:id",
  authMiddleware,
  configurationsController.deleteConfig
);

module.exports = router;
