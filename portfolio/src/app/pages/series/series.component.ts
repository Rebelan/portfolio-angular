import { AfterViewInit, Component, computed, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import gsap from 'gsap';


interface Serie {
  id: number;
  title: string;
  genre: string;
  year: number;
  creator: string;
  seasons: string;
  status: string;
  description: string;
  poster: string;
}


@Component({
  selector: 'app-series',
  standalone: true,
  imports: [],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export default class SeriesComponent implements AfterViewInit, OnDestroy {

  series = signal<Serie[]>([

    {
      id: 1,
      title: 'Breaking Bad',
      genre: 'Drama',
      year: 2008,
      creator: 'Vince Gilligan',
      seasons: '5 temporadas',
      status: 'Vista',
      description:
        'Una de las series más influyentes de la televisión moderna, con una evolución narrativa y de personajes espectacular.',
      poster: '/images/series/breaking-bad.jpg'
    },
    {
      id: 2,
      title: 'Dark',
      genre: 'Ciencia ficción',
      year: 2017,
      creator: 'Baran bo Odar · Jantje Friese',
      seasons: '3 temporadas',
      status: 'Vista',
      description:
        'Una historia compleja sobre el tiempo, los secretos familiares y el destino, con una atmósfera única y muy cuidada.',
      poster: '/images/series/dark.jpg'
    },
    {
      id: 3,
      title: 'Arcane',
      genre: 'Animación',
      year: 2021,
      creator: 'Christian Linke · Alex Yee',
      seasons: '2 temporadas',
      status: 'Vista',
      description:
        'Una serie de animación con una calidad visual sobresaliente y una narrativa muy emocional ambientada en el universo de League of Legends.',
      poster: '/images/series/arcane.jpg'
    },
    {
      id: 4,
      title: 'Mr. Robot',
      genre: 'Thriller',
      year: 2015,
      creator: 'Sam Esmail',
      seasons: '4 temporadas',
      status: 'Vista',
      description:
        'Una serie intensa y con mucha personalidad visual, centrada en la tecnología, la paranoia y la identidad.',
      poster: '/images/series/mr-robot.jpg'
    },
    {
      id: 5,
      title: 'The Last of Us',
      genre: 'Drama',
      year: 2023,
      creator: 'Craig Mazin · Neil Druckmann',
      seasons: '2 temporadas',
      status: 'Siguiendo',
      description:
        'Adaptación sólida y emocionalmente potente, con una gran ambientación y personajes muy bien construidos.',
      poster: '/images/series/the-last-of-us.jpg'
    },
    {
      id: 6,
      title: 'Attack on Titan',
      genre: 'Acción',
      year: 2013,
      creator: 'Hajime Isayama (obra original)',
      seasons: '4 temporadas',
      status: 'Vista',
      description:
        'Una serie intensa, épica y cargada de giros argumentales que ha marcado a muchísimos espectadores.',
      poster: '/images/series/attack-on-titan.jpg'
    }
  ]);


  currentIndex = signal(0);
  currentSeries = computed(() => this.series()[this.currentIndex()]);
  totalSlides = computed(() => this.series().length);
  trackTransform = computed(() => {
    return `translateX(-${this.currentIndex() * 100}%)`;
  });

  next(): void {
    this.currentIndex.update(index => (index + 1) % this.totalSlides());
  }

  prev(): void {
    this.currentIndex.update(index => {
      return (index - 1 + this.totalSlides()) % this.totalSlides();
    });
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }


  private host = inject(ElementRef<HTMLElement>);
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      tl.from('.series-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.5
      })
        .from('.series-title', {
          y: 30,
          opacity: 0,
          duration: 0.7
        }, '-=0.3')
        .from('.series-description', {
          y: 20,
          opacity: 0,
          duration: 0.6
        }, '-=0.35')
        .from('.carousel-shell', {
          y: 30,
          opacity: 0,
          duration: 0.8
        }, '-=0.25')
        .from('.carousel-controls .nav-btn', {
          y: 16,
          opacity: 0,
          stagger: 0.12,
          duration: 0.45
        }, '-=0.35')
        .from('.carousel-dots .dot', {
          scale: 0,
          opacity: 0,
          stagger: 0.05,
          duration: 0.25
        }, '-=0.25');
    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
