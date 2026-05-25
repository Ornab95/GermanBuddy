import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanNumbers } from './german-numbers';

describe('GermanNumbers', () => {
  let component: GermanNumbers;
  let fixture: ComponentFixture<GermanNumbers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GermanNumbers],
    }).compileComponents();

    fixture = TestBed.createComponent(GermanNumbers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
