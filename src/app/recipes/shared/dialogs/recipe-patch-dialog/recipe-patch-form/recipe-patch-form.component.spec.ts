import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePatchFormComponent } from './recipe-patch-form.component';

describe('RecipePatchFormComponent', () => {
  let component: RecipePatchFormComponent;
  let fixture: ComponentFixture<RecipePatchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipePatchFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipePatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
