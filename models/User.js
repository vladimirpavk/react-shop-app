export class User{
    constructor(idToken, email, localId, refreshToken){
        this.idToken = idToken;
        this.email = email;
        this.localId = localId;
        this.refreshToken = refreshToken;
    }    
}