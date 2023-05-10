export const dateConverter = (data: string) => {
    return data.split('T')[0];
}

export const convertDateToString = (data: Date | string) => {
    if (typeof data === 'string') {
        let [year, month, date] = data.split('-');
        month = `0${month}`.slice(-2);
        date = `0${date}`.slice(-2);
        return `${year}-${month}-${date}`;
    }
    const month = `0${data.getMonth()}`.slice(-2);
    const date = `0${data.getDate()}`.slice(-2);
    return `${data.getFullYear()}-${month}-${date}`
}