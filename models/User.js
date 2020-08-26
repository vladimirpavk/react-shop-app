export class User{
    constructor(idToken, email, localId, refreshToken){
        this.idtoken = idToken;
        this.email = email;
        this.localId = localId;
        this.refreshToken = refreshToken;
    }    
}