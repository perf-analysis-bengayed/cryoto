import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertPptxComponent } from './convert-pptx.component';

describe('ConvertPptxComponent', () => {
  let component: ConvertPptxComponent;
  let fixture: ComponentFixture<ConvertPptxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConvertPptxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvertPptxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
