import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers, heroHome, heroUserCircle, heroBookmark, heroCog8Tooth } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  viewProviders: [provideIcons({heroUsers, heroHome, heroUserCircle, heroBookmark, heroCog8Tooth})]
})
export class AppComponent {
  title = 'NesterFront';
}
