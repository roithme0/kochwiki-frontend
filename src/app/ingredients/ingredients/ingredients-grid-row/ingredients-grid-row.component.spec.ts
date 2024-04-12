import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsGridRowComponent } from './ingredients-grid-row.component';

describe('IngredientsGridRowComponent', () => {
  let component: IngredientsGridRowComponent;
  let fixture: ComponentFixture<IngredientsGridRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsGridRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsGridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
