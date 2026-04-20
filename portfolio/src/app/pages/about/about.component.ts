import { AfterViewInit, Component, ElementRef, inject, OnDestroy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export default class AboutComponent implements AfterViewInit, OnDestroy {

  private host = inject(ElementRef<HTMLElement>);
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);



    this.ctx = gsap.context(() => {
      // Hero inicial
      gsap.from('.about-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      });

      gsap.from('.about-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1
      });

      gsap.from('.about-intro', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2
      });

      // Cards al hacer scroll: izquierda, derecha, izquierda
      const cards = gsap.utils.toArray<HTMLElement>('.about-card');

      cards.forEach((card, index) => {
        const fromX = index % 2 === 0 ? -120 : 120;

        gsap.from(card, {
          x: fromX,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Animación extra solo para la imagen de la primera card
      gsap.from('.card-image img', {
        scale: 0.92,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-card.has-image',
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      });

    }, this.host.nativeElement);
  }


  ngOnDestroy(): void {
    this.ctx?.revert();
  }

}
