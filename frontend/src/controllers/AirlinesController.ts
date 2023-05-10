import { deleteRequest, getRequest, putRequest } from "../axios/http"

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

export const editAirline = async (id: string, nameCompany: string, createYears: string, countPlanes: number) => {
    const data = await putRequest(`/api/airline/edit/${id}`, {}, { id, nameCompany, createYears, countPlanes });
    if (data) {
        return data;
    } else {
        return "Не получилось удалить";
    }
};
