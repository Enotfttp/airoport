import { getRequest } from "../axios/http"

export const getEmployes = async () => {
    const data = await getRequest('/api/employees');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}


