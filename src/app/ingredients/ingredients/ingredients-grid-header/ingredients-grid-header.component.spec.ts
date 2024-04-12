import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsGridHeaderComponent } from './ingredients-grid-header.component';

describe('IngredientsGridHeaderComponent', () => {
  let component: IngredientsGridHeaderComponent;
  let fixture: ComponentFixture<IngredientsGridHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsGridHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsGridHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
