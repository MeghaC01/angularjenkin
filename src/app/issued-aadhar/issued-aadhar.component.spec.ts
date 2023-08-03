import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedAadharComponent } from './issued-aadhar.component';

describe('IssuedAadharComponentComponent', () => {
  let component: IssuedAadharComponent;
  let fixture: ComponentFixture<IssuedAadharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuedAadharComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuedAadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
