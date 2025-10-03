import { Component } from '@angular/core';
import { FeatherModule } from 'angular-feather'; 
import { RouterModule } from '@angular/router'; // É bom ter para links internos

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FeatherModule, RouterModule], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

}