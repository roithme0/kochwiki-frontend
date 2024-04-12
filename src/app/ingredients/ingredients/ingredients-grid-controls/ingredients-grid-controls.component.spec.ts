import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsGridControlsComponent } from './ingredients-grid-controls.component';

describe('IngredientsGridControlsComponent', () => {
  let component: IngredientsGridControlsComponent;
  let fixture: ComponentFixture<IngredientsGridControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsGridControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsGridControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
