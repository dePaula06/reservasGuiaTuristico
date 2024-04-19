const router = require("express").Router();
const userController = require('../controller/userController');


router.post("/reservaguiaturistico/user", userController.createUser);
router.get("/reservaguiaturistico/user/:cpf", userController.getUserByCPF);
router.get("/reservaguiaturistico/user/", userController.getUsers);
router.put("/reservaguiaturistico/user/:cpf", userController.updateUser);
router.delete("/reservaguiaturistico/user/:cpf", userController.deleteUser);
module.exports = router;
