import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { WordGame } from './word-game';

describe('WordGame', () => {
  let component: WordGame;
  let fixture: ComponentFixture<WordGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordGame],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WordGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
