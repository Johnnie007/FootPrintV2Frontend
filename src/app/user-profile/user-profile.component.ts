import { Component, OnInit } from '@angular/core';
import { RestService } from '../auth-service/rest-service.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  constructor(private restService: RestService){
  }
  offsetters = ['Succulent', 'Succulent', 'Succulent', 'Succulent','Succulent'];
  user: User;
  ngOnInit(): void {
    console.log(0)
    this.restService.getUser().subscribe(
      data =>{
        this.user = data;
        console.log(data)
        console.log(this.user?.first_name)
      }
    )
  }
}
