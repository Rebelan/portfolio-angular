import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  signal
} from '@angular/core';
import { gsap } from 'gsap';


interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  director: string;
  duration: string;
  description: string;
  poster: string;
}

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.scss'
})
export default class PeliculasComponent implements AfterViewInit, OnDestroy {

  movies = signal<Movie[]>([
    {
      id: 1,
      title: 'Interstellar',
      genre: 'Ciencia ficción',
      year: 2014,
      director: 'Christopher Nolan',
      duration: '2h 49min',
      description: 'Un viaje épico a través del espacio y del tiempo en busca de una esperanza para la humanidad.',
      poster: '/images/movies/interstellar.jpg',
    },
    {
      id: 2,
      title: 'Blade Runner 2049',
      genre: 'Ciencia ficción',
      year: 2017,
      director: 'Denis Villeneuve',
      duration: '2h 44min',
      description: 'Una secuela visualmente impresionante que expande el universo Blade Runner con una atmósfera única',
      poster: '/images/movies/blade-runner-2049.jpg',
    },
    {
      id: 3,
      title: 'El Caballero Oscuro',
      genre: 'Acción',
      year: 2008,
      director: 'Christopher Nolan',
      duration: '2h 32min',
      description: 'Una de las peliculas de superhéroes más influyentes, con una interpretación legendaria del villano principal',
      poster: '/images/movies/the-dark-knight.jpg',
    },
    {
      id: 4,
      title: 'El Señor de los Anillos: El Retorno del Rey',
      genre: 'Fantasía',
      year: 2003,
      director: 'Peter Jackson',
      duration: '3h 21min',
      description: 'Una de las mejores peliculas de la historia del cine de fantasía. Adentrate a la resolución del viaje del anillo y sus personajes en este épico hito cinematográfico',
      poster: '/images/movies/TLOR.jpg',
    },
    {
      id: 5,
      title: 'El Señor de los Anillos: La Comunidad del Anillo',
      genre: 'Fantasía',
      year: 2001,
      director: 'Peter Jackson',
      duration: '2h 58min',
      description: 'El inicio de una de las sagas más importantes de la historia del cine de fantasía y de aventuras',
      poster: '/images/movies/lotr-fellowship.jpg',
    },
    {
      id: 6,
      title: 'Dune: Parte Dos',
      genre: 'Ciencia ficción',
      year: 2024,
      director: 'Denis Villeneuve',
      duration: '2h 46min',
      description: 'Espectáculo visual y narrativo que continúa la historia de Paul Atreides en un universo enorme y hostil',
      poster: '/images/movies/dune-part-two.jpg',
    }
  ]);


  currentIndex = signal(0);
  currentMovie = computed(() => this.movies()[this.currentIndex()]);
  totalSlides = computed(() => this.movies().length);
  trackTransform = computed(() => {
    return `translateX(-${this.currentIndex() * 100}%)`;
  });

  next(): void {
    this.currentIndex.update(index => (index + 1) % this.totalSlides());
  }

  prev(): void {
    this.currentIndex.update(index => {
      return (index - 1 + this.totalSlides()) % this.totalSlides();
    })
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

      tl.from('.movies-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.5
      })
        .from('.movies-title', {
          y: 30,
          opacity: 0,
          duration: 0.7
        }, '-=0.3')
        .from('.movies-description', {
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
