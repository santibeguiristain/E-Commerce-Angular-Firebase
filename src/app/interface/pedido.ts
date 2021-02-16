 
 


export class Pedido
{
    arrProducto: string[];
    idCarrito:string;
    idCliente:string;
    precioTotal: number;
 

    constructor(_arrProducto:string[], _idCarrito:string,  _idCliente:string,  _precioTotal: number)
    {
        this.arrProducto =  _arrProducto;
        this.idCarrito=_idCarrito;
        this.idCliente=_idCliente;
        this.precioTotal=_precioTotal;
         
    }
}


export interface IPedido {
    arrProducto:string[];
    idCarrito: string;
    idCliente:string;
    precioTotal: number;
    
    
}
 