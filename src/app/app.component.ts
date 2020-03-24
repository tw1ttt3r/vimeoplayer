import { Component } from '@angular/core';

import VimeoConfig from './interfaces/VimeoConfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vimeoangular';

  config: VimeoConfig = {
    id: 18636045,
    autopause: false
  };
}
