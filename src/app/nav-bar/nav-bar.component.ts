import { Component, OnInit} from '@angular/core';
import { AuthencationService } from '../auth-service/authencation.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent{
  constructor(public authenticationService: AuthencationService){}
  
  logOutUser(){
    sessionStorage.removeItem('username')
    this.authenticationService.logOutUser()
  }

}
