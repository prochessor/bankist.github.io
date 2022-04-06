'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
alert("Use username as szh,hy,am,ab,du, and pin 1111,2222,3333,4444,5555");
const account1 = {
    owner: 'Syed zaki haider',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    pin: 1111,
    currency: "£"
};

const account2 = {
    owner: 'Hamad Yousuf',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    pin: 2222,
    currency: "€",
};

const account3 = {
    owner: 'Abdul Moiz',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    pin: 3333,
    currency: "$"
};

const account4 = {
    owner: 'Ali Butt',
    movements: [430, 1000, 700, 50, 90],
    pin: 4444,
    currency: "EUR"
};
const account5 = {
    owner: 'Dummy User',
    movements: [430, 1000, 200, -100, 320, 700, 50, 90],
    pin: 5555,
    currency: "SR"
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
let currentAccount;
let timer;
let TimeSet = false;

function updateSummary() {
    labelSumIn.textContent = `${currentAccount.movements.reduce((acc, curr) => {
        if (curr >= 0)
            return acc + curr;
        return acc;
    })} ${currentAccount.currency}`
    labelSumOut.textContent = `${currentAccount.movements.reduce((acc, curr) => {
        if (curr < 0)
            return acc + curr;
        return acc;
    })} ${currentAccount.currency}`
    labelSumInterest.textContent = 'haram'
}

function display(acc) {
    let balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
    updateSummary();

    labelBalance.textContent = `${balance} ${acc.currency}`
    let options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }
    let date = new Date();

    labelDate.textContent = new Intl.DateTimeFormat("pa", options).format(date);
    document.querySelector(".welcome").textContent = "Welcome! " + acc.owner;
    containerMovements.innerHTML = '';
    acc.movements.forEach((element, i) => {
        let type = element > 0 ? "deposit" : "withdrawal";
        let html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${element} ${acc.currency}</div>
    </div>`;
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
    containerApp.style.opacity = "100";
    inputLoginPin.value = '';
    inputLoginUsername.value = "";
}

function createUsername(accounts) {
    accounts.forEach((account) => {
        account.username = account.owner.toLowerCase().split(' ').map(e => e[0]).join('');
    })
}

function controlLogOut() {
    let minutes = 5;
    let seconds = 0;
    TimeSet = true;
    timer = setInterval(() => {
        labelTimer.textContent = `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
        if (seconds == 0 && minutes >= 1) {
            seconds = 59;
            minutes--;
        } else if (minutes == 0 && seconds == 0) {
            containerApp.style.opacity = "0";
            TimeSet = false;
            clearInterval(timer);

        } else {
            seconds--;
        }
    }, 1000)
}

function checkLogin() {
    let accountGiven = accounts.find((account) => {
        if (account && account.username == inputLoginUsername.value)
            return account;
    });
    if (accountGiven && accountGiven.pin === +inputLoginPin.value) {
        currentAccount = accountGiven;
        if (TimeSet == false)
            controlLogOut();
        else {
            clearInterval(timer);
            TimeSet = false;
            controlLogOut();
        }
        display(accountGiven);

    }

}

function controlTransfer() {
    if (Number.parseInt(labelBalance.textContent) >= +inputTransferAmount.value) {
        let accountToTransfer = accounts.filter((account) => {
            if (account.username == inputTransferTo.value)
                return account;
        });
        accountToTransfer[0].movements.push(+inputTransferAmount.value);
        currentAccount.movements.push(-inputTransferAmount.value);
        inputTransferTo.value = '';
        inputTransferAmount.value = "";
        setTimeout(() => {
            display(currentAccount);
        }, 3000);
    } else
        alert("NOT SUFFICIANT FUNDS BHOOTNI");
}

function controlCloseAccount() {

    if (+inputClosePin.value === currentAccount.pin && inputCloseUsername.value == currentAccount.username) {
        let index = accounts.indexOf(currentAccount);
        accounts.splice(index, 1);
        containerApp.style.opacity = "0";
    } else {
        inputClosePin.value = '';
        inputCloseUsername.value = '';
    }
}

function controlLoan() {
    if (+inputLoanAmount.value >= 0) {
        currentAccount.movements.push(+inputLoanAmount.value);
        display(currentAccount);
    }
}
//Event handlers
btnLogin.addEventListener("click", function (e) {
    e.preventDefault();
    checkLogin();
});
btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    controlTransfer();
})
btnClose.addEventListener("click", function (e) {
    e.preventDefault();
    controlCloseAccount();
})
btnLoan.addEventListener("click", function (e) {
    e.preventDefault();
    controlLoan();
})

//function calling
createUsername(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// // /////////////////////////////////////////////////

// 'use strict'

// // function checkDogs(julia, kate) {
// //     let withoutCats = [...julia].slice(1, -2);
// //     console.log(withoutCats);
// //     let total = [...withoutCats, ...kate];
// //     total.forEach((dog, i) => {
// //         if (dog >= 3)
// //             console.log(`Dog number ${i + 1} is an adult and is ${dog} years old`);

// //         else
// //             console.log(`Dog number ${i + 1} is still a puppy🐶`);
// //     })
// // }

// // function calcAverageHumanAge(ages) {
// //     let humanAges = ages.map((age) => {
// //         if (age >= 2)
// //             return age * 2;
// //         else
// //             return 16 + age * 4;
// //     }).filter((dog) => {
// //         if (dog >= 18)
// //             return dog;
// //     });
// //     let average = humanAges.reduce((acc, dog) => acc + dog, 0);
// //     console.log(average / humanAges.length);

// // }
// // let julia = [3, 5, 2, 12, 7];
// // let kate = [4, 1, 15, 8, 3];
// // checkDogs(julia, kate);
// // calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// const dogs = [{
//         weight: 22,
//         curFood: 250,
//         owners: ['Alice', 'Bob']
//     },
//     {
//         weight: 8,
//         curFood: 200,
//         owners: ['Matilda']
//     },
//     {
//         weight: 13,
//         curFood: 275,
//         owners: ['Sarah', 'John']
//     },
//     {
//         weight: 32,
//         curFood: 340,
//         owners: ['Michael']
//     },
// ];

// //task 1
// dogs.forEach((dog, num, arr) => {
//     dog.recommendedFood = dog.weight ** 0.75 * 28;
// })
// let sarahDog = dogs.find((dog) => {
//     if (dog.owners.includes('Sarah'))
//         return dog;
// });
// console.log(`${sarahDog.curFood > sarahDog.recommendedFood ?"Too much":"Too litte"} food is eaten by the sarah's dog`);
// let ownersEatTooMuch = dogs.filter((dog) => {
//     if (dog.curFood > dog.recommendedFood)
//         return dog;
// }).flatMap((dog) => dog.owners)




// let ownersEatTooLittle = dogs.filter((dog) => {
//     if (dog.curFood < dog.recommendedFood)
//         return dog;
// }).flatMap(dog => dog.owners)

// let bookhay = ownersEatTooMuch.join(' and ');

// bookhay += `'s dogs eat to much`
// console.log(bookhay);

// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLittle);
// console.log(dogs);
// let ifEqual = dogs.some((dog) => {
//     if (dog.curFood == dog.recommendedFood)
//         return true;

// });
// dogs.sort((a, b) => a.recommendedFood - b.recommendedFood)
// console.log(dogs);
// if (ifEqual)
//     console.log("yes");

// let now = new Date();
// console.log('zaki'.padStart('+', 35));

// 'use strict'
//clock
// setInterval(() => {
//     let now = new Date();
//     let options = {
//         hour: "numeric",
//         minute: "numeric",
//         second: "numeric",
//     }
//     let date = new Intl.DateTimeFormat(navigator.language, options).format(now);
//     console.log(date);
//     console.log();

// }, 1000);
