import { TestBed } from '@angular/core/testing';
import { NavBarComponent } from './navbar.component';
import { AuthService } from '../auth/auth.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NavBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavBarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
