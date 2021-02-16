import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
 import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
 
  precio = this._route.snapshot.paramMap.get("precio");
  descripcion = this._route.snapshot.paramMap.get("descripcion");
  unidades = this._route.snapshot.paramMap.get("unidades");
  imagen = this._route.snapshot.paramMap.get("imagen");
  
  constructor(private _route:ActivatedRoute) 
  {
   
   }
 
   public urlImageProd = "./../../../../assets/image/";
  
  ngOnInit() {
    
   
   
  }

}
