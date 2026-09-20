import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GermanVocabulary } from './german-vocabulary';

describe('GermanVocabulary', () => {
  let component: GermanVocabulary;
  let fixture: ComponentFixture<GermanVocabulary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GermanVocabulary],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GermanVocabulary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
