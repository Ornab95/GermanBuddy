import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanConversation } from './german-conversation';

describe('GermanConversation', () => {
  let component: GermanConversation;
  let fixture: ComponentFixture<GermanConversation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GermanConversation],
    }).compileComponents();

    fixture = TestBed.createComponent(GermanConversation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
