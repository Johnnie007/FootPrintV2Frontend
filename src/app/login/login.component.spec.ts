import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthencationService } from '../auth-service/authencation.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authenticationService: AuthencationService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports:[HttpClientTestingModule, FormsModule],
      providers:[{provide: AuthencationService, useClass:MockAuthService}]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should login users", () => {
    authenticationService = TestBed.inject(AuthencationService);
    
    component.email = "test";
    component.password = 'test';

    spyOn(authenticationService, "authenticateUser").and.returnValue(of())
    
    component.validateLogin();

    expect(authenticationService.authenticateUser).toHaveBeenCalled();

  })

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

