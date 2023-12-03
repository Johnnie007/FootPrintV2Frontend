import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar.component';
import { AuthencationService
 } from '../auth-service/authencation.service';
 
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let authenticationService: AuthencationService;
  
  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthencationService]
    });
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should test logout function",() => {
    authenticationService = TestBed.inject(AuthencationService);
    spyOn(authenticationService, "logOutUser")

    component.logOutUser();

    expect(authenticationService.logOutUser).toHaveBeenCalled();
  });

});
