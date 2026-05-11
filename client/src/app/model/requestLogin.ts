export class RequestLogin {
    // 1. Déclaration des attributs (miroir du DTO Java)
    public email: string;
    public password: string;

    // 2. Constructeur pour l'initialisation
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}