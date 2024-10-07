import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
  }
  fadeInAvatar() {
    const avatarElement = document.querySelector('#myAvatar') as HTMLElement;
    const animation = this.animationCtrl
      .create()
      .addElement(avatarElement)
      .duration(5000) // Animation duration in milliseconds
      .iterations(3) // do animation 3 times
      .keyframes([
        { offset: 0, opacity: '0' }, // Start with full opacity
        { offset: 0.2, opacity: '0.2' },
        { offset: 0.4, opacity: '0.4' },
        { offset: 0.6, opacity: '0.6' },
        { offset: 0.8, opacity: '0.8' },
        { offset: 1, opacity: '1' },
      ]);
    animation.play();
  }
  ionViewDidEnter(){
    this.scaleAvater();
  }
  rotateAvatar() {
    const avatarElement = document.querySelector('#myAvatar') as HTMLElement;
    const animation = this.animationCtrl
      .create()
      .addElement(avatarElement)
      .duration(5000) // Animation duration in milliseconds
      .iterations(3) // do animation 3 times
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' }, // Start with no rotation
        { offset: 1, transform: 'rotate(360deg)' }, // Rotate 360 degrees (full circle)
      ]);
    animation.play();
  }
  scaleAvater() {
    const avatarElement = document.querySelector('#myAvatar') as HTMLElement;
    const animation = this.animationCtrl
      .create()
      .addElement(avatarElement)
      .duration(5000) // Animation duration in milliseconds
      .iterations(3) // do animation 3 times
      .keyframes([
        { offset: 0, transform: 'scale(1)' }, // Start with no rotation
        { offset: 0.25, transform: 'scale(1.5)' },
        { offset: 0.5, transform: 'scale(1)' },
        { offset: 0.75, transform: 'scale(0.5)' }
      ]);
    animation.play();
  }
}
