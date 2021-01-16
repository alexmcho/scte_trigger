import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalBreakComponent } from './local-break.component';

describe('LocalBreakComponent', () => {
  let component: LocalBreakComponent;
  let fixture: ComponentFixture<LocalBreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalBreakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
