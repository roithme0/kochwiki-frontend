import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstuffsGridControlsComponent } from './foodstuffs-grid-controls.component';

describe('FoodstuffsGridControlsComponent', () => {
  let component: FoodstuffsGridControlsComponent;
  let fixture: ComponentFixture<FoodstuffsGridControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodstuffsGridControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodstuffsGridControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
