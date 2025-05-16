import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-menu-lateral-direito',
  standalone: true,
  imports: [],
  templateUrl: './menu-lateral-direito.component.html',
  styleUrl: './menu-lateral-direito.component.css'
})
export class MenuLateralDireitoComponent {

  constructor( 
              private loginService: LoginService
       ){}

       
     deslogar(){
      this.loginService.logout()
     }

}
