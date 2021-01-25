import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementOpportunityComponent } from './placement-opportunity.component';

describe('PlacementOpportunityComponent', () => {
  let component: PlacementOpportunityComponent;
  let fixture: ComponentFixture<PlacementOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementOpportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
