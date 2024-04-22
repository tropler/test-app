import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsBlockComponent } from './notifications-block.component';

describe('NotificationsBlockComponent', () => {
  let component: NotificationsBlockComponent;
  let fixture: ComponentFixture<NotificationsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
