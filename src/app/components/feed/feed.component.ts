import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  viewProviders: [provideIcons({heroUsers})]
})
export class FeedComponent {

}
