
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pedido } from 'src/app/interface/pedido';
import { CartService } from 'src/app/services/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public listCartForClient = [];
  public listres= [];
 

  constructor(private cartService :CartService,private router: Router) { }

  ngOnInit() {

    let emailLogueado = sessionStorage.getItem('SessionUserLogueado');
    if(emailLogueado ==null ||emailLogueado ==undefined ||emailLogueado =='')
    {
      this.router.navigate(['/login']);
    }else
    {
      this.router.navigate(['/catalogo']);
    }
  
 
  }

}
