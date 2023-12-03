import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { AuthencationService } from '../auth-service/authencation.service';
import {of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let authenticationService: AuthencationService;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports:[HttpClientTestingModule, FormsModule],
      providers:[{provide: AuthencationService, useClass:MockAuthService}]
         });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should validate login", ()=>{
    authenticationService = TestBed.inject(AuthencationService);
    
    component.firstName = "test";
    component.lastName = "test";
    component.email = "test";
    component.password = 'test';
    component.currentMonth = "Jan 2023";

    spyOn(authenticationService, "createUser").and.returnValue(of())
    
    component.validateLogin();

    expect(authenticationService.createUser).toHaveBeenCalled();
  }); 
});

class MockAuthService {
  authenticate = false;
  
  logInUser(){
    this.authenticate = true;
  }
  logOutUser(){
    this.authenticate = false;
  }
  createUser(first, last, username, password, month){
    const user = {
      month_joined: month,
      firstName: first,
      lastName: last,
      email: username,
      password: password
    }
    const response = {body: user, status: 200 }
    return response;
  }

  authenticateUser(username, password){
    const user =  {
      email: username,
      password: password
    }

    const response = {body: user, status: 200 }
    return response;
  }
}
