import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { ButtonComponent } from '../../components/shared/button/button.component';

@Component({
  selector: 'app-landing',
  imports: [ButtonComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export default class LandingComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  private initAnimations(): void{
    
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-title', {
      y: 40,
      opacity: 0,
      duration: 1
    })
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.4')
    .from('.hero-description', {
      y: 20,
      opacity: 0,
      duration: 0.8
    }, '-=0.4')
    .from('.hero-actions app-button', {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6
    }, '-=0.3');

  }
}
