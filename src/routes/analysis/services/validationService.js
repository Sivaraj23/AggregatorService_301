const { check } = require('express-validator');


const ValidationService = {

    validateFetchAllOrdersInCityPerDay: [
        check("city").not().isEmpty(),
        check('city').isString(),
        check("date")
            .not()
            .isEmpty(),
        check('date').isLength({ min: 24, max: 24 }),
    ],
    validateTotalAmountInCityPerDay: [
        check("city").not().isEmpty(),
        check('city').isString(),
        check("date")
            .not()
            .isEmpty(),
        check('date').isLength({ min: 24, max: 24 }),
    ]

}

export default ValidationService;