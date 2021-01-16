import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicComponent } from './cic.component';

describe('CicComponent', () => {
  let component: CicComponent;
  let fixture: ComponentFixture<CicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
