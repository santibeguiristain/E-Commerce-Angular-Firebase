import { Cliente } from "./cliente";
import { Producto } from "./product.interface";
 

export class Product_Pedido {

    idProduct:string;
    idCart: string;  
    cantProdPedido: number;
    precioTotalProdPedido:number;
    pago: string;
    IdDoc: string;
 
     

    constructor(_idProd:string, _idCart:string, _cantProdPed:number, _precioTotalProdPed: number,  _pago: string,_IdDoc: string)
    {
      
        this.idProduct =  _idProd;
        this.idCart=_idCart;
        this.cantProdPedido=_cantProdPed;
        this.precioTotalProdPedido=_precioTotalProdPed;
        this.pago= _pago;
        this.IdDoc=_IdDoc;
    }
    
 
}
 
  