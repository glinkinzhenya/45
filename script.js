let userData = {
    'USD': 1000,
    'EUR': 900,
    'UAH': 15000,
    'BIF': 20000,
    'AOA': 100
}

let bankData = {
    'USD': {
        max: 3000,
        min: 100,
        img: '💵'
    },
    'EUR': {
        max: 1000,
        min: 50,
        img: '💶'
    },
    'UAH': {
        max: 0,
        min: 0,
        img: '💴'
    },
    'GBP': {
        max: 10000,
        min: 100,
        img: '💷'
    }
}

function getMoney(userData, bankData) {
    return new Promise((resolve, reject) => {
        confirm("Посмотреть баланс на карте?") ? resolve(userData) : reject(bankData); reject({ userData: userData, bankData: bankData })
    });
}

getMoney(userData, bankData)
    .then(
        (userData) => {
            let i = getInfo(userData).toUpperCase()
            console.log(`Баланс составляет: ${userData[i]} ${i}`);
            console.log("Спасибо, хорошего дня 😊");
        },
        (bankData) => {

            let i = getInfo(bankData).toUpperCase()

            if (bankData[i].max === 0) {
                alert("в банкомате нет этой валюты");
                i = getInfo(bankData).toUpperCase();
            }

            if (comparison(i, bankData)) {

                let summ = prompt("Введите сумму для снятия наличных");

                if (summ >= bankData[i].max) {
                    console.log(`Введенная сумма больше допустимой. Максимальная сумма снятия: ${bankData[i].max} ${i}`);
                } else if (summ <= bankData[i].min) {
                    console.log(`Введенная сумма меньше допустимой. Минимальная сумма снятия: ${bankData[i].min} ${i}`);
                } else {
                    console.log(`Вот Ваши денежки ${summ} ${i} ${bankData[i].img}`);
                    console.log("Спасибо, хорошего дня 😊");
                };

            } else {
                i = getInfo(bankData);
            }
        },
    );

function getInfo(obj) {

    let toggle = true

    while (toggle) {
        let currency = prompt("Введите название валюты в формате USD, EUR, UAH, BIF, AOA");

        if (currency === null) {
            location.reload();
        }
        if (comparison(currency, obj)) {
            toggle = false;
            return currency
        }
    };
};

function comparison(currency, data) {

    for (let i in data) {
        if (currency.toUpperCase() === i) {
            return true
        };
    };
    alert("введите допустимую валюту")
    return false;
};