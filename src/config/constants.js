import { known_order_instances, known_search_instances}  from "./consul"

const SERVER_BASE_URLS={
    SEARCH_SERVICE_URL : known_search_instances[0]+"api/search",
    ORDER_SERVICE_URL : known_order_instances[0]+"api/orders"
}

export default SERVER_BASE_URLS;