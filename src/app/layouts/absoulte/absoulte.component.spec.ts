import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsoulteComponent } from './absoulte.component';

describe('AbsoulteComponent', () => {
  let component: AbsoulteComponent;
  let fixture: ComponentFixture<AbsoulteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsoulteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsoulteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
