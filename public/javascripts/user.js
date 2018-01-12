module.exports = class User {

    constructor(){
        this._firstName = 'default name from constructor with out fields';
        this._lastName = '';
        this._emailUser = '';
        this._phoneUser = '';
    }

    // constructor(firstName, lastName, emailUser, phoneUser) {
    //
    //     this._firstName = firstName;
    //     this._lastName = lastName;
    //     this._emailUser = emailUser;
    //     this._phoneUser = phoneUser;
    // }


    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get emailUser() {
        return this._emailUser;
    }

    set emailUser(value) {
        this._emailUser = value;
    }

    get phoneUser() {
        return this._phoneUser;
    }

    set phoneUser(value) {
        this._phoneUser = value;
    }
}