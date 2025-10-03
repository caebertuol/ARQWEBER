import { Component } from '@angular/core';
import { FeatherModule } from 'angular-feather'; // 1. IMPORTE AQUI
import { RouterModule } from '@angular/router'; // É bom ter para links internos

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FeatherModule, RouterModule], // 2. ADICIONE AQUI
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

}