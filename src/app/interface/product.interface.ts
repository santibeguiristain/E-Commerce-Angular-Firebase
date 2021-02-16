export class Producto
{
    descripcion: string;
    idproduct:string;
    imagen:string;
    precio: number;
    unidad_disponible:number;

    constructor(descr:string, idprod:string,  imag:string,  prec: number,unidad_disp:number  )
    {
        this.descripcion =  descr;
        this.idproduct=idprod;
        this.imagen=imag;
        this.precio=prec;
        this.unidad_disponible= unidad_disp;
    }
}

export interface Iproduct
{
    descripcion: string;
    idproduct:string;
    imagen:string;
    precio: number;
    unidad_disponible:number;
     
   
}   