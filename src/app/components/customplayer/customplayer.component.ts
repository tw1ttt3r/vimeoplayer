import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation, AfterViewChecked } from '@angular/core';

import VimeoConfig from '../../interfaces/VimeoConfig';

import Player from '@vimeo/player';

import { from } from 'rxjs';

enum statusEnum {
  'LOADING' = 0,
  'SUCCESS' = 1,
  'ERROR' = 2
}

@Component({
  selector: 'app-customplayer',
  templateUrl: './customplayer.component.html',
  styleUrls: ['./customplayer.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomplayerComponent implements OnInit, AfterViewChecked {

  constructor() { }

  @ViewChild('wrapperPlayer', {static: true}) private customplayer: ElementRef;

  @Input() private config: VimeoConfig;
  @Input() private logs: boolean;
  @Input() private loader: string;
  @Input() private errorImage: string;

  private logger: Array<string>;

  private player: Player;

  private statusEnum = statusEnum;

  private status: statusEnum = statusEnum.LOADING;

  private durationVideo = 0;

  private cuePointVideo = [];

  ngOnInit(): void {
    if (this.logs !== undefined) {
      this.logs = true;
    }
    this.logger = [];
    if (this.config === undefined) {
      throw new Error('config is REQUIRED!');
    } else {
      this.player = new Player(this.customplayer.nativeElement, this.config);
      this.player.ready().then(() => {
        this.status = this.statusEnum.SUCCESS;
        this.player.getDuration()
        .then(
          (duration: number) => {
            this.durationVideo = duration;
            this.addLogger(`DURATION: ${duration}`);
          }
        )
        .catch(
          (e) => {
            this.addLogger(`ERROR DURATION: ${e}`);
          }
        );
        this.player.getCuePoints()
        .then(
          (cuepoints) => {
            this.cuePointVideo = cuepoints;
            this.addLogger(`CUEPOINTS TOTAL: ${cuepoints.length}`);
          }
        )
        .catch(
          (e) => {
            this.addLogger(`ERROR CUEPOINTS: ${e}`);
          }
        );
      }).catch((e: void) => {
        this.addLogger(`READY ERROR`);
        this.status = this.statusEnum.ERROR;
      });
    }
  }

  ngAfterViewChecked() {
    this.player.on('loaded', () => {
      this.addLogger('loaded');
    }, (e) => {
      this.addLogger(`LOADED ERROR: ${JSON.stringify(e)}`);
    });

    this.player.on('error', (error) => {
      this.addLogger(`${JSON.stringify(error)}`);
    });

    this.player.on('play', () => {
      this.addLogger('play');
    });
    this.player.on('progress', (progress) => {
      this.addLogger(`progress loaded: ${JSON.stringify(progress)}`);
    });
    this.player.on('playing', (playing) => {
      this.addLogger(`playing: ${JSON.stringify(playing)}`);
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

  addLogger(log: string): void {
    if (this.logger.length === 0) {
      this.logger.push(log);
    } else {
      if (this.logger[this.logger.length - 1] !== log) {
        this.logger.push(log);
      }
    }
  }

  createBookmark() {
    return from(this.player.getCurrentTime());
  }

  get getDurationVideo() {
    return this.durationVideo;
  }

  get getCuePointsVideo() {
    return this.cuePointVideo;
  }

  navigateBookmark(time: number): void {
    this.player.setCurrentTime(time)
    .then( () => {
      this.addLogger(`Navigate: ${time}`);
    })
    .catch( (e) => {
      switch (e.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          this.addLogger('NavigateError: the time was less than 0 or greater than the video’s duration');
          break;
        default:
          // some other error occurred
          this.addLogger(`NavigateError: ${e}`);
          break;
      }
    });
  }
}
