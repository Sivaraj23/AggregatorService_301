import { validationResult } from "express-validator";
var path = require('path');
import logger from "../../../utilities/Logger"
import AnalysisService from "../services/analysisService";


var fileName = path.basename(__filename);
export default async (req, res) => {

logger.info(fileName+"->Getting the list of Orders in"+req.body.city+" on "+req.body.date )
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    res.json(await AnalysisService.fetchAllOrdersInCityPerDay(req.body))
    res.end()

};
