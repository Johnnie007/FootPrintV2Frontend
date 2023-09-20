import { Component, OnInit} from '@angular/core';
import { AuthencationService } from '../service/authencation.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent{
  constructor(public authenticationService: AuthencationService){}


}
