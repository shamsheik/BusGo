import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerDetailsComponent } from './traveler-details.component';

describe('TravelerDetailsComponent', () => {
  let component: TravelerDetailsComponent;
  let fixture: ComponentFixture<TravelerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
