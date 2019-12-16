var express = require('express');
import fetchAllOrdersInCityPerDay from './controllers/fetchAllOrdersInCityPerDay';
import fetchAmountOfOrdersInCityPerDay from './controllers/fetchAmountOfOrdersInCityPerDay';
import getRestaurantsByCity from './controllers/getRestaurantsByCity';
import AnalysisService from './services/analysisService';
import ValidationService from './services/validationService';

var router = express.Router();
router.get('/', function(req, res, next) {
   res.write('index');
 });
router.route('/fetchAllOrdersInCityPerDay')
/**
 * @swagger
 * /fetchAllOrdersInCityPerDay:
 *   post:
 *     tags:
 *       - Orders
 *     description:  Returns  all Orders in a city on the given date
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of orders
 *     parameters:
 *       - name: city
 *         description: Name of the city
 *         in: body
 *         required: true
 *         type: string
 *       - name: date
 *         description: Date
 *         in: body
 *         required: true
 *         type: string
 *         format : date-time
 *         
 */
    .post(ValidationService.validateFetchAllOrdersInCityPerDay,fetchAllOrdersInCityPerDay )
    .get(AnalysisService.getNotSupported)
    .put(AnalysisService.putNotSupported)
    .patch(AnalysisService.putNotSupported);
  /**
 * @swagger
 * /fetchAmountOfOrdersInCityPerDay:
 *   post:
 *     tags:
 *       - Orders
 *     description:  Returns total amount of all Orders in a city on the given date
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of orders
 *     parameters:
 *       - in: body
 *         properties : 
 *          city:
 *           description: Name of the city
 *           required: true
 *           type: string
 *          date :
 *           description: Date
 *           required: true
 *           type: string
 *           format : date-time
 *         
 */
    router.route('/fetchAmountOfOrdersInCityPerDay')
    .post(ValidationService.validateTotalAmountInCityPerDay,fetchAmountOfOrdersInCityPerDay )
    .get(AnalysisService.getNotSupported)
    .put(AnalysisService.putNotSupported)
    .patch(AnalysisService.patchNotSupported);
/**
 * @swagger
 * /getRestaurantsByCity:
 *   get:
 *     tags:
 *       - Orders
 *     description: Returns total amount of all Orders in a city on the given date
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of orders
 *     parameters:
 *       - name: city
 *         description: Name of the city
 *         in: query
 *         required: true
 *         type: string
 */       
    router.route('/getRestaurantsByCity')
    .get(getRestaurantsByCity)
    .post(AnalysisService.postNotSupported)
    .put(AnalysisService.putNotSupported)
    .patch(AnalysisService.patchNotSupported);

module.exports = router;
