import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountsGridComponent } from './amounts-grid.component';

describe('AmountsGridComponent', () => {
  let component: AmountsGridComponent;
  let fixture: ComponentFixture<AmountsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountsGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmountsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
