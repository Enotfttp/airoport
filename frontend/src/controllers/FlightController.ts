import { getRequest } from "../axios/http"

export const getFlights = async () => {
    const data = await getRequest('/api/flights');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}


