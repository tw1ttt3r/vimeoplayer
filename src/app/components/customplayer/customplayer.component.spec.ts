import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomplayerComponent } from './customplayer.component';

describe('CustomplayerComponent', () => {
  let component: CustomplayerComponent;
  let fixture: ComponentFixture<CustomplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
