import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllOpportunitiesComponent } from './all-opportunities.component';

describe('MyRequestsComponent', () => {
  let component: AllOpportunitiesComponent;
  let fixture: ComponentFixture<AllOpportunitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOpportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
