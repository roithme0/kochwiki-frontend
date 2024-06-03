import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeMacroChartComponent } from './recipe-macro-chart.component';

describe('RecipeMacroChartComponent', () => {
  let component: RecipeMacroChartComponent;
  let fixture: ComponentFixture<RecipeMacroChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeMacroChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeMacroChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
