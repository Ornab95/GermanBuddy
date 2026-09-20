import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GermanGrammar } from './german-grammar';

describe('GermanGrammar', () => {
  let component: GermanGrammar;
  let fixture: ComponentFixture<GermanGrammar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GermanGrammar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GermanGrammar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
