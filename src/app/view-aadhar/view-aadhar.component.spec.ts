import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAadharComponent } from './view-aadhar.component';

describe('ViewadharComponent', () => {
  let component: ViewAadharComponent;
  let fixture: ComponentFixture<ViewAadharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAadharComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
