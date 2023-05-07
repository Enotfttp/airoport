import { getRequest } from "../axios/http"

export const getAirlines = async () => {
    const data = await getRequest('/api/airlines');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}


