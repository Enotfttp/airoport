import { deleteRequest, getRequest } from "../axios/http"

export const getFlights = async () => {
    const data = await getRequest('/api/flights');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const deleteFlight = async (id: string) => {
    const data = await deleteRequest(`/api/flight/delete/${id}`, {}, { id });
    if (data) {
        return data;
    } else {
        return "Не получилось удалить";
    }
};

