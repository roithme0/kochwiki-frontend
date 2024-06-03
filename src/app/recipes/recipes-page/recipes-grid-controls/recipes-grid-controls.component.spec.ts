import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesGridControlsComponent } from './recipes-grid-controls.component';

describe('RecipesGridControlsComponent', () => {
  let component: RecipesGridControlsComponent;
  let fixture: ComponentFixture<RecipesGridControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesGridControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesGridControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
