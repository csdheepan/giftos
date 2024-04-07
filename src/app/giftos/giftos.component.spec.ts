import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftosComponent } from './giftos.component';

describe('GiftosComponent', () => {
  let component: GiftosComponent;
  let fixture: ComponentFixture<GiftosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiftosComponent]
    });
    fixture = TestBed.createComponent(GiftosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
