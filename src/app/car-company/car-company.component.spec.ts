import { TestBed } from '@angular/core/testing';
import { CarCompanyComponent } from './car-company.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CarCompanyComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCompanyComponent],
      providers: [provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CarCompanyComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
