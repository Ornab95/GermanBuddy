import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanGrammar } from './german-grammar';

describe('GermanGrammar', () => {
  let component: GermanGrammar;
  let fixture: ComponentFixture<GermanGrammar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GermanGrammar],
    }).compileComponents();

    fixture = TestBed.createComponent(GermanGrammar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
