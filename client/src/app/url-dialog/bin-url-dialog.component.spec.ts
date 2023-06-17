import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinUrlDialogComponent } from './bin-url-dialog.component';

describe('BinUrlDialogComponent', () => {
  let component: BinUrlDialogComponent;
  let fixture: ComponentFixture<BinUrlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinUrlDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinUrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
