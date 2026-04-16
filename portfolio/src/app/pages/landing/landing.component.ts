import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export default class LandingComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initHeroAnimations();
    this.initPreviewAnimations();
  }


  


  private initHeroAnimations(): void {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });

    tl.from('.hero-card', {
      y: 30,
      opacity: 0,
      duration: 0.9
    })
      .from('.hero-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.5')
      .from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.4')
      .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.5')
      .from('.hero-description', {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.45')
      .from('.hero-actions app-button', {
        y: 16,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5
      }, '-=0.35')
      .from('.hero-tags span', {
        y: 12,
        opacity: 0,
        stagger: 0.08,
        duration: 0.35
      }, '-=0.2')
      .from('.scroll-indicator', {
        opacity: 0,
        y: 10,
        duration: 0.5
      }, '-=0.1');

    gsap.to('.blob-1', {
      x: 30,
      y: -20,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.blob-2', {
      x: -25,
      y: 20,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }


  private initPreviewAnimations(): void {
    gsap.from('.preview-heading', {
      scrollTrigger: {
        trigger: '.portfolio-preview',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.preview-card', {
      scrollTrigger: {
        trigger: '.preview-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out'
    });
  }



  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }


}
