import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpoLoginComponent } from './corpo-login.component';

describe('CorpoLoginComponent', () => {
  let component: CorpoLoginComponent;
  let fixture: ComponentFixture<CorpoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorpoLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorpoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
