
import logger from "../../../utilities/Logger"
// import SERVER_BASE_URLS from "../../../config/constants";
import urlsAvailable from "../../../config/consul";
var rp = require('request-promise');
var path = require('path');
var NAME = path.basename(__filename);

const AnalysisService = {

    
    fetchAllOrdersInCityPerDay: async (obj) => {
     
        logger.info(NAME+"->Getting the list of Orders in"+obj.city+" on "+obj.date )
        var listOfRestaurants=JSON.parse(await rp(urlsAvailable().known_search_instances[0]+"/api/search?city="+obj.city))
        var listOfRestaurantIds=[];
        listOfRestaurants.forEach((res)=>{
            listOfRestaurantIds.push(res._id)
        })
        var options = {
            method: 'POST',
            uri: urlsAvailable().known_order_instances[0]+"api/orders/getAllOrdersByResIds",
            body: {
                list : listOfRestaurantIds,
                date : obj.date
            },
            json: true 
        };

        return await rp(options)
    

    },
    fetchAmountOfOrdersInCityPerDay: async (obj) => {
        logger.info(NAME+"->Getting the total amount of Orders in "+obj.city+" on "+obj.date )
        var listOfRestaurants=JSON.parse(await rp(urlsAvailable().known_search_instances[0]+"/api/search?city="+obj.city))
        var listOfRestaurantIds=[];
        listOfRestaurants.forEach((res)=>{
            listOfRestaurantIds.push(res._id)
        })
        var options = {
            method: 'POST',
            uri: urlsAvailable().known_order_instances[0]+"api/orders/getTotalAmountOnGivenDate",
            body: {
                list : listOfRestaurantIds,
                date : obj.date
            },
            json: true 
        };
        var listOfTotalPrice=await rp(options)
        var totalAmount=0;
        listOfTotalPrice.forEach((item)=>{
            totalAmount=totalAmount+item.totalPrice
        })
        return  {amount : totalAmount,date : obj.date}
    },getRestaurantsByCity : async (obj) => {
     
        logger.info(NAME+"->Getting the list of restaurants in"+obj.city)
        try{
        return JSON.parse(await rp(urlsAvailable().known_search_instances[0]+"/api/search?city="+obj.city))
        }catch(err){
            logger.info(NAME+"->Error while Getting the list of restaurants in"+obj.city)
            throw new Error("Error while Getting the list of restaurants in"+obj.city)
        }
    

    }, 
    getNotSupported : (req, res) => {
        res.statusCode = 403;
        res.end('GET operation not supported on this endpoint');
    },
    postNotSupported : (req, res) => {
        res.statusCode = 403;
        res.end('GET operation not supported on this endpoint');
    },
    putNotSupported : (req, res) => {
        res.statusCode = 403;
        res.end('GET operation not supported on this endpoint');
    },
    patchNotSupported : (req, res) => {
        res.statusCode = 403;
        res.end('GET operation not supported on this endpoint');
    }



}

export default AnalysisService;