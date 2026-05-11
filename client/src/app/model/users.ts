export class User {
    // 1. Déclaration des attributs (Propriétés)
    public id?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    constructor(
        firstName: string, 
        lastName: string, 
        email: string, 
        password: string, 
        id?: number
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}