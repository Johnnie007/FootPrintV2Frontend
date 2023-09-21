import { Component, OnInit } from '@angular/core';
import { RestService } from '../auth-service/rest-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  constructor(private restService: RestService){
  }
  offsetters = ['Succulent', 'Succulent', 'Succulent', 'Succulent','Succulent'];

  ngOnInit(): void {
    console.log(0)
    this.restService.getUser().subscribe(
      data =>{
        console.log(data)
      }
    )
  }
}
