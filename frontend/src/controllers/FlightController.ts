import { deleteRequest, getRequest } from "../axios/http"

export const getFlights = async () => {
    const data = await getRequest('/api/flights');
    if (data) {
        return data
    } else {
        return 'Данных нет'
    }
}

export const getStatuses = async () => {
    const data = await getRequest('/api/statuses');
    if (data) {
        const res = data.map((el: any) => ({ id: el.id, name: el.status }))
        return res
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

