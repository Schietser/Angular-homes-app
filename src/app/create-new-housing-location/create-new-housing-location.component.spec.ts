import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewHousingLocationComponent } from './create-new-housing-location.component';

describe('CreateNewHousingLocationComponent', () => {
  let component: CreateNewHousingLocationComponent;
  let fixture: ComponentFixture<CreateNewHousingLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateNewHousingLocationComponent]
    });
    fixture = TestBed.createComponent(CreateNewHousingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
