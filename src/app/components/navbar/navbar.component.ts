import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
 


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService]
})
export class NavbarComponent   implements OnInit{
  public user$: Observable<any> = this.authSvc.fire.user;
  public cantProdInCart:number;


 constructor(private authSvc:AuthService,private router: Router ,private cartService:CartService) { }
 
 ngOnInit()
 {
    if(sessionStorage.getItem('SessionUserLogueado')=='')
    {
      this.router.navigate(['/login']);
    }

    if( sessionStorage.getItem('SessionUserCart') ==''){
      //this.cantProdInCart = "0";
    }else{
    //this.cantProdInCart =  sessionStorage.getItem('SessionUserCart');
    }
 

}

onLogout()
{
  try{
    sessionStorage.setItem('SessionUserLogueado', '');
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }catch(error)
  {
    console.log(error);
  }
}

}

