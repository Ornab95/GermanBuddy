import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LandingPreview } from './landing-preview';

describe('LandingPreview', () => {
  let component: LandingPreview;
  let fixture: ComponentFixture<LandingPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPreview],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme mode between light and dark', () => {
    expect(component['isDarkMode']()).toBe(true);
    component['toggleTheme']();
    expect(component['isDarkMode']()).toBe(false);
    component['setTheme'](true);
    expect(component['isDarkMode']()).toBe(true);
  });

  it('should toggle FAQ accordion items', () => {
    expect(component['faqs']()[0].isOpen).toBe(false);
    component['toggleFaq'](0);
    expect(component['faqs']()[0].isOpen).toBe(true);
    component['toggleFaq'](0);
    expect(component['faqs']()[0].isOpen).toBe(false);
  });
});
