import { deleteRequest, getRequest } from "../axios/http"

export const getAirlines = async () => {
    const data = await getRequest('/api/airlines');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const deleteAirline = async (id: string) => {
    const data = await deleteRequest(`/api/airline/delete/${id}`, {}, { id });
    if (data) {
        return data;
    } else {
        return "Не получилось удалить";
    }
};

