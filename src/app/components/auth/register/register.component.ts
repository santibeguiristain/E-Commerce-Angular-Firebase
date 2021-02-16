import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { provideRoutes, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[AuthService]
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name:new FormControl('')
  })
  constructor(private authSvc:AuthService,private router: Router) { }

  async onRegister()
  {
      try{
          const {name,email,password} = this.registerForm.value;
          this.authSvc.register(name,email,password);
          sessionStorage.setItem('SessionUserLogueado', email);
          this.router.navigate(['/catalogo']);

      }catch(error)
     {
        console.log('**ERROR** ', error);
    }
  }

  ngOnInit(): void {
  }

}
