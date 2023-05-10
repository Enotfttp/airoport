import { deleteRequest, getRequest, postRequest, putRequest } from "../axios/http"

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

export const getEnters = async () => {
    const data = await getRequest('/api/enters');
    if (data) {
        const res = data.map((el: any) => ({ id: el.id, name: el.enter }))
        return res
    } else {
        return 'Данных нет'
    }
}

export const getAircrafts = async () => {
    const data = await getRequest('/api/aircrafts');
    if (data) {
        const res = data.map((el: any) => ({ id: el.id, name: el.aircraft }))
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

export const editFlight = async (data: { idFlight: number, departure: string, arrival: string, departureCiry: string, arrivalCiry: string, idEnter: number, idPilot: number, idStatus: number, idAirline: number, idPlane: number }) => {
    const res = await putRequest(`/api/flight/edit/${data.idFlight}`, {}, { ...data });
    if (res) {
        return res;
    } else {
        return "Не получилось отредактировать";
    }
};

export const addFlight = async (data: { departure: string, arrival: string, departureCiry: string, arrivalCiry: string, idEnter: number, idPilot: number, idStatus: number, idAirline: number, idPlane: number }) => {
    const res = await postRequest(`/api/flight/add`, {}, { ...data });
    if (res) {
        getFlights()
        return res;
    } else {
        return "Не получилось добавить новый полёт";
    }
};
