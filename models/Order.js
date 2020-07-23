export default class Order{
    constructor(id, dateStart, status, cartItem){
        this.id = id;
        this.dateStart = dateStart;
        this.status = status;
        this.cartItem = cartItem
    }
}