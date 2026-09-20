import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmbientScene } from './component/shared/ambient-scene/ambient-scene';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AmbientScene],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GermanBuddy');
}
