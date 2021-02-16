export class ResultProductPedidoModule
{
    descripcion: string;
    idproduct:string;
    imagen:string;
    precio: number;
    unidad_disponible:number;
    cantidad_pedida:number;
    precioSubTotal:number;

    constructor(descr:string, idprod:string,  imag:string,  prec: number,unidad_disp:number ,_cantidad_pedida:number ,_precioSubTotal:number )
    {
        this.descripcion =  descr;
        this.idproduct=idprod;
        this.imagen=imag;
        this.precio=prec;
        this.unidad_disponible = unidad_disp;
        this.cantidad_pedida =_cantidad_pedida;
        this.precioSubTotal =_precioSubTotal;
    }
}

export interface IResultProductPedidoModule
{
    descripcion: string;
    idproduct:string;
    imagen:string;
    precio: number;
    unidad_disponible:number;
    cantidad_pedida:number;
    precioSubTotal:number;
   
}   

 



