import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GermanAlphabet } from './german-alphabet';

describe('GermanAlphabet', () => {
  let component: GermanAlphabet;
  let fixture: ComponentFixture<GermanAlphabet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GermanAlphabet],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GermanAlphabet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
