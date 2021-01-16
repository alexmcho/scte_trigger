import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbcComponent } from './lbc.component';

describe('LbcComponent', () => {
  let component: LbcComponent;
  let fixture: ComponentFixture<LbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
