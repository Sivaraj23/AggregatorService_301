var express = require('express');
import fetchAllOrdersInCityPerDay from './controllers/fetchAllOrdersInCityPerDay';
import fetchAmountOfOrdersInCityPerDay from './controllers/fetchAmountOfOrdersInCityPerDay';
import getRestaurantsByCity from './controllers/getRestaurantsByCity';
import AnalysisService from './services/analysisService';
import ValidationService from './services/validationService';

var router = express.Router();

router.route('/fetchAllOrdersInCityPerDay')
    .post(ValidationService.validateFetchAllOrdersInCityPerDay,fetchAllOrdersInCityPerDay )
    .get(AnalysisService.getNotSupported)
    .put(AnalysisService.putNotSupported)
    .patch(AnalysisService.putNotSupported);
  
    router.route('/fetchAmountOfOrdersInCityPerDay')
    .post(ValidationService.validateTotalAmountInCityPerDay,fetchAmountOfOrdersInCityPerDay )
    .get(AnalysisService.getNotSupported)
    .put(AnalysisService.putNotSupported)
    .patch(AnalysisService.patchNotSupported);

    router.route('/getRestaurantsByCity')
    .get(getRestaurantsByCity)
    .post(AnalysisService.postNotSupported)
    .put(AnalysisService.putNotSupported)
    .patch(AnalysisService.patchNotSupported);

module.exports = router;
