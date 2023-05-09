const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');

const host = "localhost";
const port = 5000;
const server = express();

server.use('/public', express.static('public'));
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:false}))

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "airport",
    password: "root"
  });


server.set("view engine", "hbs");

server.listen(port, host, ( error) => {
  error
    ? console.error("error = ", error)
    : console.log(`Server is running on http://${host}:${port}`);
});




// Авторизация
server.post('/api/signIn/:login', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const { login, password } = req.body;

    pool.query(`Select * from employes INNER JOIN roles ON roles.idДолжности = employes.IdДолжности where Логин = '${login}' AND Пароль = '${password}'`, (err, data) => { 
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        let index = 0;
        let role ;
        let id;
            /* 
                Костыль
            */
                for (let value of Object.values(...data)) {
                    index++;
                    if (index === 1) id = value;
                    if (index === 2) fio = value;
                    if (index === 8) role = value;
                }
        return res.json({ role, id, fio})
    })
})


// Регистрация
server.post('/api/signUp/:login', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const { fio, phoneNumber, login, password } = req.body;
    pool.query(`INSERT INTO employes (idСотрудника, ФИО, IdДолжности, Телефон, Логин, Пароль) VALUES (NULL, '${fio}', '3', '${phoneNumber}', '${login}', '${password}');`, (err, data) => { 
        if (err) return console.error(err);
        return res.json({login, password})
    })
})

// Получение всех пользователей
server.get("/api/employees", function(req, res){
    pool.query("SELECT ФИО, Телефон, `Название должности`, idСотрудника FROM employes INNER JOIN roles ON employes.IdДолжности=roles.idДолжности", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            let index = 0;
            let role;
            /* 
                Костыль
            */
            for (let value of Object.values(elem)) {
                index++;
                if (index & 3) role = value;
            }
            return { id: elem.idСотрудника, fio: elem.ФИО, role, phone: elem.Телефон  }
        })
        res.json(newData);
    });
});

// Получение всех ролей
server.get("/api/roles", function(req, res){
    pool.query("SELECT * FROM roles", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            let index = 0;
            let role;
            /* 
                Костыль
            */
            for (let value of Object.values(elem)) {
                index++;
                if (index === 2) role = value;
            }
            return { id: elem.idДолжности, role  }
        })
        res.json(newData);
    });
});

// Удаление пользователя
server.delete("/api/employee/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`Delete From employes where idСотрудника = '${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('delete user');
    });
});

// Редактирование пользователя
server.put("/api/employee/edit/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id, fio, idRole, phoneNumber } = req.body;
    pool.query(`UPDATE \`employes\` SET \`ФИО\` = '${fio}', \`IdДолжности\` = '${idRole}', \`Телефон\` = '${phoneNumber}' WHERE employes.idСотрудника = '${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('user updated');
    });
});

// Получение всех полётов
server.get("/api/flights", function(req, res){
    pool.query("SELECT idПолета, `Время вылета`, `Время прилета`, `Город вылета`, `Город приелта`, employes.ФИО, airlines.`Название авиакомпании`, statuses.`Название статуса`, aircrafts.`Название самолета`, enters.`Номер входа` FROM (((((flights INNER JOIN employes ON flights.idСотрудника = employes.idСотрудника) INNER JOIN airlines ON flights.idАвиакомпании = airlines.idАвиакомпании) INNER JOIN statuses ON flights.idСтатуса = statuses.idСтатуса) INNER JOIN aircrafts ON flights.idСамолета = aircrafts.idСамолета) INNER JOIN enters on flights.idВхода = enters.idВхода )", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            let index = 0;
            let enter;
            let departure;
            let departureCiry;
            let arrival;
            let arrivalCiry;
            let nameCompany;
            let status;
            let plane;
            /* 
                Костыль
            */
            for (let value of Object.values(elem)) {
                index++;
                if (index === 2) departure = value;
                if (index === 3) arrival = value;
                if (index === 4) departureCiry = value;
                if (index === 5) arrivalCiry = value;
                if (index === 7) nameCompany = value;
                if (index === 8) status = value;
                if (index === 9) plane = value;
                if (index === 10) enter = value;
            }
            return { id: elem.idПолета, fio: elem.ФИО, departure,departureCiry, arrival, arrivalCiry, nameCompany, status, plane, enter  }
        })
        res.json(newData);
    });
});

// Получение всех статусов
server.get("/api/statuses", function(req, res){
    pool.query("SELECT * FROM statuses", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            let index = 0;
            let status;
            /* 
                Костыль
            */
            for (let value of Object.values(elem)) {
                index++;
                if (index === 2) status = value;
            }
            return { id: elem.idСтатуса, status  }
        })
        res.json(newData);
    });
});

// Получение всех входов
server.get("/api/enters", function(req, res){
    pool.query("SELECT * FROM enters", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            let index = 0;
            let enter;
            /* 
                Костыль
            */
            for (let value of Object.values(elem)) {
                index++;
                if (index === 2) enter = value;
            }
            return { id: elem.idВхода, enter }
        })
        res.json(newData);
    });
});

// Получение всех самоолётов
server.get("/api/aircrafts", function(req, res){
    pool.query("SELECT * FROM aircrafts", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            let index = 0;
            let aircraft;
            /* 
                Костыль
            */
            for (let value of Object.values(elem)) {
                index++;
                if (index === 2) aircraft = value;
            }
            return { id: elem.idСамолета, aircraft }
        })
        res.json(newData);
    });
});

// Удаление полёта
server.delete("/api/flight/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`Delete From flights where idПолета = '${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('delete flight');
    });
});

// Редактирование полёта
server.put("/api/flight/edit/:idFlight", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const { idFlight, departure, arrival, departureCiry, arrivalCiry, idEnter, idPilot, idStatus, idAirline, idPlane } = req.body;
    pool.query(`UPDATE \`flights\` SET \`Время вылета\` = '${departure}', \`Время прилета\` = '${arrival}', \`Город вылета\` = '${departureCiry}', \`Город приелта\` = '${arrivalCiry}', \`idВхода\` = '${idEnter}', \`idСотрудника\` = '${idPilot}', \`idСтатуса\` = '${idStatus}', \`idАвиакомпании\` = '${idAirline}', \`idСамолета\` = '${idPlane}' WHERE \`flights\`.\`idПолета\` = ${idFlight}`, function(err, data) {
        if (err) return console.error(err);
        res.json('flight updated');
    });
});


// Получение информации обо всех авиакомпаниях
server.get("/api/airlines", function(req, res){
    pool.query("SELECT * FROM airlines", function(err, data) {
        if (err) return console.error(err);
        if(!data.length) return res.sendStatus(400);
        const newData = data.map((elem) => {
            let index = 0;
            let nameCompany;
            let createYears;
            let countPlanes;
            /* 
                Костыль
            */
            for (let value of Object.values(elem)) {
                index++;
                if (index === 2) nameCompany = value;
                if (index === 3) createYears = value;
                if (index === 4) countPlanes = value;
            }
            return { id: elem.idАвиакомпании, nameCompany, createYears, countPlanes  }
        })
        res.json(newData);
    });
});

// Удаление авиакомпании
server.delete("/api/airline/delete/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;
    pool.query(`Delete From airlines where idАвиакомпании = '${id}'`, function(err, data) {
        if (err) return console.error(err);
        res.json('delete airline');
    });
});

// Редактирование пользователя
server.put("/api/airline/edit/:id", function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const { id, nameCompany, createYears, countPlanes } = req.body;
    pool.query(`UPDATE \`airlines\` SET \`Название авиакомпании\` = '${nameCompany}', \`Год основания\` = '${createYears}', \`Количество самолётов\` = '${countPlanes}' WHERE \`airlines\`.\`idАвиакомпании\` = ${id}`, function(err, data) {
        if (err) return console.error(err);
        res.json('airline updated');
    });
});

// Создание полёта 
// INSERT INTO `flights` (`idПолета`, `Время вылета`, `Время прилета`, `Город вылета`, `Город приелта`, `idВхода`, `idСотрудника`, `idСтатуса`, `idАвиакомпании`, `idСамолета`) VALUES (NULL, '2023-05-01', '2023-05-01', 'Нижний Новгород', 'Москва', '1', '3', '1', '1', '1');