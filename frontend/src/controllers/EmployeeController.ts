import { deleteRequest, getRequest } from "../axios/http";

export const getEmployees = async () => {
    const data = await getRequest("/api/employees");
    if (data) {
        const id = localStorage.getItem("id");
        const res = data.filter((el: any) => el.id !== Number(id));
        console.log("res = ", res, id);
        return res;
    } else {
        return "Данных нет";
    }
};

export const deleteEmployee = async (id: string) => {
    const data = await deleteRequest(`/api/employee/delete/${id}`, {}, { id });
    if (data) {
        return data;
    } else {
        return "Не получилось удалить";
    }
};
