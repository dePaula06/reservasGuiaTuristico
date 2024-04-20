const router = require("express").Router();
const userController = require('../controller/userController');
const localController = require('../controller/localController');
const signincontroller = require('../controller/signinController');
const guiaController = require('../controller/guiaController');


router.post("/reservaguiaturistico/user", userController.createUser);
router.get("/reservaguiaturistico/user/:cpf", userController.getUserByCPF);
router.get("/reservaguiaturistico/user/", userController.getUsers);
router.put("/reservaguiaturistico/user/:cpf", userController.updateUser);
router.delete("/reservaguiaturistico/user/:cpf", userController.deleteUser);

router.post("/reservaguiaturistico/sigin/admin", signincontroller.signInAdmin)
router.post("/reservaguiaturistico/sigin/", signincontroller.signInUser)

router.post("/reservaguiaturistico/local/", localController.createLocal);
router.get("/reservaguiaturistico/local/", localController.getLocais);
router.get("/reservaguiaturistico/local/:idLocal", localController.getLocalByID);
router.put("/reservaguiaturistico/local/:idLocal", localController.updateLocal);
router.delete("/reservaguiaturistico/local/:idLocal", localController.deleteLocal);

router.post("/reservaguiaturistico/guia/", guiaController.createGuia);
router.get("/reservaguiaturistico/guia/:idGuia", guiaController.getGuiaByID);
router.get("/reservaguiaturistico/guia/", guiaController.getGuias);
router.put("/reservaguiaturistico/guia/:idGuia", guiaController.updateGuia);
router.delete("/reservaguiaturistico/guia/:idGuia", guiaController.deleteGuia);

module.exports = router;
