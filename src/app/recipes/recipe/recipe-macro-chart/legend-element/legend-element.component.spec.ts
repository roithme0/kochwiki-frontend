import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendElementComponent } from './legend-element.component';

describe('LegendElementComponent', () => {
  let component: LegendElementComponent;
  let fixture: ComponentFixture<LegendElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegendElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
