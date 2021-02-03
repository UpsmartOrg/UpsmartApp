import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBinInfoComponent } from './edit-bin-info.component';

describe('EditBinInfoComponent', () => {
  let component: EditBinInfoComponent;
  let fixture: ComponentFixture<EditBinInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBinInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBinInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
