const express = require("express");
const router = express.Router();

const userController = require("../src/Api/Users/userController");
const user_imageController = require("../src/Api/User_Image/user_imageController");
// const notificationController = require("../src/Api/Notifications/NotificationController");
const notificationController = require("../src/Api/Subscriptions/subscriptionsController");

// Solicitudes de usuario

router.post("/singIn", userController.registerUser);
router.post("/login", userController.loginUser);

//Solicitudes a la base de datos para imagenes de usuario

router.put(
  "/:user/updateUser-Image",
  user_imageController.uploadUsers.fields([
    { name: "image", maxCount: 1 },
    { name: "bgImage", maxCount: 1 },
  ]),
  user_imageController.updateUserImages
);

//Solicitudes de notificaciones
// router.post("/newNotification", notificationController.newNotification);
// router.get("/get-All-Notifications", notificationController.getNotifications);
// router.post("/notifications", notificationController.getPushNotifications);
// router.get("/getNotification", notificationController.getNotification);
// router.put("/getNotification", notificationController.updateNotification);
// router.delete("/getNotification", notificationController.deleteNotification);
// router.post("/sendPush", notificationController.sendPush);

router.post(
  "/save-subscription",
  notificationController.saveSubscription
);
router.post("/send-test", notificationController.notifyUser);


module.exports = router;
