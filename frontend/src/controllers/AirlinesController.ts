import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"
import { dateForModal } from "../utills/dateUtills";

export const getAirlines = async () => {
    const data = await getRequest('/api/airlines');
    if (data) {
        const res = data.map((el: any) => ({
            ...el,
            createYears: dateForModal(el.createYears, "date"),
        }));
        return res
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
        return "Не получилось отредактировать";
    }
};

export const addAirline = async (nameCompany: string, createYears: string, countPlanes: number) => {
    const data = await postRequest(`/api/airline/add`, {}, { nameCompany, createYears, countPlanes });
    if (data) {
        const res = await getAirlines();
        return res
    } else {
        return "Не получилось добавить новый аэркомпанию";
    }
};
