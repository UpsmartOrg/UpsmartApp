import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBinInfoComponent } from './add-bin-info.component';

describe('AddBinInfoComponent', () => {
  let component: AddBinInfoComponent;
  let fixture: ComponentFixture<AddBinInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBinInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBinInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
