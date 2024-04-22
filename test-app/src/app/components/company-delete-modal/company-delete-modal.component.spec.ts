import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDeleteModalComponent } from './company-delete-modal.component';

describe('CompanyDeleteModalComponent', () => {
  let component: CompanyDeleteModalComponent;
  let fixture: ComponentFixture<CompanyDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDeleteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
