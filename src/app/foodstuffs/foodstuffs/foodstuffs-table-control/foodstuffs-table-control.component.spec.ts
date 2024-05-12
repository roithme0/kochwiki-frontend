import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstuffsTableControlComponent } from './foodstuffs-table-control.component';

describe('FoodstuffsTableControlComponent', () => {
  let component: FoodstuffsTableControlComponent;
  let fixture: ComponentFixture<FoodstuffsTableControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodstuffsTableControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodstuffsTableControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
