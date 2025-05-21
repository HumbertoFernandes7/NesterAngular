import { Component } from '@angular/core';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";
import { MenuMobileComponent } from "../menu-mobile/menu-mobile.component";
import { MenuLateralDireitoComponent } from "../menu-lateral-direito/menu-lateral-direito.component";

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [MenuLateralComponent, MenuMobileComponent, MenuLateralDireitoComponent],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.css'
})
export class MeuPerfilComponent {

}
