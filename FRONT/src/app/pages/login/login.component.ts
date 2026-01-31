import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) { }


  login() {
    let clienteLogando = true;
    if (clienteLogando ){
      this.router.navigate(['/usuario/home']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
