import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAdComponent } from './provider-ad.component';

describe('ProviderAdComponent', () => {
  let component: ProviderAdComponent;
  let fixture: ComponentFixture<ProviderAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
