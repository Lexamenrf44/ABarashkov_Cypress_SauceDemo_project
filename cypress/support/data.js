const Faker = require('faker');

global.data = {
    user_test_login: "Admin", //default
    user_test_password: "admin123", //default

    generate: {
        email: () => {
            const userEmail = (Faker.internet.exampleEmail()).toLowerCase();
            console.log("Generated email: " + userEmail);
            return userEmail
        },
        password: (length = 10) => {
            const userPassword = Faker.internet.password(length, false, null, "aA1!");
            console.log("Generated password: " + userPassword);
            return userPassword
        },
        string: (length = 6) => {
            const randomString = 'cypress' + Faker.internet.password(length, false, null, "");
            return randomString.toLowerCase()
        },
        number: (min = 4, max = 10) => {
            let randomNum = Faker.random.number({min: min, max: max});
            return randomNum
        },
        numberFloat: (min = 4, max = 10) => {
            let randomNum = Faker.random.number({min: min, max: max, precision: 0.01});
            return randomNum
        },
        phoneNumber: () => {
            let phoneNumber = Faker.phone.phoneNumberFormat(1); //format: (116) 239-1938
            return phoneNumber
        },
        url: () => {
            const randomUrl = (Faker.internet.url()).toLowerCase();
            return randomUrl
        },
    },
}