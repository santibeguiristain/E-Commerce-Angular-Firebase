import { Component, Input, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interface/cliente';
import { Pedido } from 'src/app/interface/pedido';
import { Iproduct } from 'src/app/interface/product.interface';
import { Product_Pedido } from 'src/app/interface/product_pedido';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ClientService } from 'src/app/services/client.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
   

  @Input() pedido:Pedido;
  @Input() cliente:Cliente;
  @Input() producto:Iproduct;
  
  public listCartForClient: Array<Pedido>;
  public listInfoProdCart: Array<Iproduct>;
  public listres= [];
 
  
  constructor(private authSvc:AuthService,private cartService:CartService,private router: Router, private clientService:ClientService) { }


  onLogin(){
   
    const {email,password} = this.loginForm.value;
    try{
        
        this.authSvc.login(email,password).then(result => {
            
          if(result)
          {           
              sessionStorage.setItem('SessionUserLogueado', email);
              this.router.navigate(['/catalogo']);

          }else
          {
            sessionStorage.setItem('SessionUserLogueado', '');
            alert('Usuario no existente');
          }
          
      }).catch(error => {
         
        alert(error);
        
      });

        
      
    }catch(error)
    {
        console.log('**ERROR** ', error);
    }
  }
   

  async ngOnInit() {
    const user=null;
    try{
      const user = await this.authSvc.getCurrentUser();
      if(user)
      {
        console.log('User: ', user);
      }else
      {
        console.log('USUARIO NO EXISTENTE');
      }
  }catch(error)
  {
    console.log('**ERROR** ', error);
  }
}


}


 
