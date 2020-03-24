import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation, AfterViewChecked } from '@angular/core';

import Player from '@vimeo/player';

@Component({
  selector: 'app-customplayer',
  templateUrl: './customplayer.component.html',
  styleUrls: ['./customplayer.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomplayerComponent implements OnInit, AfterViewChecked {

  constructor() { }

  @ViewChild('wrapperPlayer', {static: true}) customplayer: ElementRef;

  @Input() idvimeo: number;
  @Input() wplayer = 640;
  @Input() logs: boolean;

  logger: Array<string>;

  optionsPlayer: any;

  player: any;

  ngOnInit(): void {
    if (this.logs !== undefined) {
      this.logs = true;
    }
    this.logger = [];
    if (this.idvimeo === undefined) {
      throw new Error('The ID or USER is REQUIRED!');
    } else {
      this.optionsPlayer = {
        id: this.idvimeo,
        width: this.wplayer,
        color: '#F00'
      };
      this.player = new Player(this.customplayer.nativeElement, this.optionsPlayer);
    }
  }

  ngAfterViewChecked() {
    this.player.on('error', (error) => {
      this.addLogger(`${error}`);
    });
    this.player.on('play', () => {
      this.addLogger('play');
    });
    this.player.on('progress', (progress) => {
      this.addLogger(`progress: ${JSON.stringify(progress)}`);
    });
    this.player.on('pause', () => {
      this.addLogger('pause');
    });
    this.player.on('bufferstart', () => {
      this.customplayer.nativeElement.classList.add('playerBuffer');
      this.addLogger('buffer On');
    });
    this.player.on('bufferend', () => {
      this.customplayer.nativeElement.classList.remove('playerBuffer');
      this.addLogger('buffer off');
    });
  }

  addLogger(log: string) {
    if (this.logger.length === 0) {
      this.logger.push(log);
    } else {
      if (this.logger[this.logger.length - 1] !== log) {
        this.logger.push(log);
      }
    }
  }
}
