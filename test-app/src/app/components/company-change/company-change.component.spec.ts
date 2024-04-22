import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyChangeComponent } from './company-change.component';

describe('CompanyChangeComponent', () => {
  let component: CompanyChangeComponent;
  let fixture: ComponentFixture<CompanyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyChangeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
