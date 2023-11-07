const {Router} = require('express');
const {check} = require('express-validator');
const {validateOrders} = require('../middlewares/validate.documents.js')
const {isValidDrink, orderExistById} = require('../helpers/db.validator.js')

const router = Router();

const {getOrder, postOrder, deleteOrder, putOrder} = require('../controllers/order.controllers.js');
/* const {validateJWT} = require('../middlewares/validate.jwt.js');
 */

router.get("/home", getOrder);

router.post("/",  [
    /* check('drinkType', 'Invalid DrinkType').isIn(['65456d2a7862b5f02a8aa506', '65456d2a7862b5f02a8aa505', '65456d2a7862b5f02a8aa507']), */
    check('drinkType').custom(isValidDrink),
    check('money', 'Money must be deposited').not().isEmpty(),
    validateOrders
],postOrder);

router.delete("/:id", [
/*     validateJWT, */
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(orderExistById),
    validateOrders
], deleteOrder);

router.put("/", putOrder);


module.exports = router;