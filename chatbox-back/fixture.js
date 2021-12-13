const userModel = require("./models/userModel");


const bob = {
    firstName: "Bob".toLowerCase(),
    lastName: "McKennie".toLowerCase(),
    birthday: "04/02/1998".toLowerCase(),
    state: "United state of america".toLowerCase(),
    telNumber: "123456789".toLowerCase(),
    email: "McKennieBob99@gmail.com".toLowerCase(),
    password: "Bobby123!".toLowerCase()
}

const marc = {
    firstName: "Marc".toLowerCase(),
    lastName: "Dubois".toLowerCase(),
    birthday: "13/08/1990".toLowerCase(),
    state: "France".toLowerCase(),
    telNumber: "113456789".toLowerCase(),
    email: "DuboisMarc90@gmail.com".toLowerCase(),
    password: "Dubois123!".toLowerCase()
}


const users = async () => {

    await userModel.deleteMany({})
    await userModel.create(bob)
    await userModel.create(marc)

    console.log("user added fixture");

}

users()


const marc = {
    "firstName": "Marc",
    "lastName": "Dubois",
    "birthday": "13/08/1990",
    "state": "France",
    "telNumber": "113456789",
    "email": "DuboisMarc90@gmail.com",
    "password": "Dubois123!"
}