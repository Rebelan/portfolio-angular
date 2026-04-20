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
import { TranslatePipe } from '@ngx-translate/core';

interface Movie {
  id: number;
  titleKey: string;
  genreKey: string;
  year: number;
  director: string;
  duration: string;
  descriptionKey: string;
  poster: string;
}

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.scss'
})
export default class PeliculasComponent implements AfterViewInit, OnDestroy {

  movies = signal<Movie[]>([
    {
      id: 1,
      titleKey: 'MOVIES.TITLES.INTERSTELLAR',
      genreKey: 'MOVIES.GENRES.SCI_FI',
      year: 2014,
      director: 'Christopher Nolan',
      duration: '2h 49min',
      descriptionKey: 'MOVIES.DESCRIPTIONS.INTERSTELLAR',
      poster: '/images/movies/interstellar.jpg',
    },
    {
      id: 2,
      titleKey: 'MOVIES.TITLES.BLADE_RUNNER_2049',
      genreKey: 'MOVIES.GENRES.SCI_FI',
      year: 2017,
      director: 'Denis Villeneuve',
      duration: '2h 44min',
      descriptionKey: 'MOVIES.DESCRIPTIONS.BLADE_RUNNER_2049',
      poster: '/images/movies/blade-runner-2049.jpg',
    },
    {
      id: 3,
      titleKey: 'MOVIES.TITLES.THE_DARK_KNIGHT',
      genreKey: 'MOVIES.GENRES.ACTION',
      year: 2008,
      director: 'Christopher Nolan',
      duration: '2h 32min',
      descriptionKey: 'MOVIES.DESCRIPTIONS.THE_DARK_KNIGHT',
      poster: '/images/movies/the-dark-knight.jpg',
    },
    {
      id: 4,
      titleKey: 'MOVIES.TITLES.LOTR_RETURN_OF_THE_KING',
      genreKey: 'MOVIES.GENRES.FANTASY',
      year: 2003,
      director: 'Peter Jackson',
      duration: '3h 21min',
      descriptionKey: 'MOVIES.DESCRIPTIONS.LOTR_RETURN_OF_THE_KING',
      poster: '/images/movies/TLOR.jpg',
    },
    {
      id: 5,
      titleKey: 'MOVIES.TITLES.LOTR_FELLOWSHIP',
      genreKey: 'MOVIES.GENRES.FANTASY',
      year: 2001,
      director: 'Peter Jackson',
      duration: '2h 58min',
      descriptionKey: 'MOVIES.DESCRIPTIONS.LOTR_FELLOWSHIP',
      poster: '/images/movies/lotr-fellowship.jpg',
    },
    {
      id: 6,
      titleKey: 'MOVIES.TITLES.DUNE_PART_TWO',
      genreKey: 'MOVIES.GENRES.SCI_FI',
      year: 2024,
      director: 'Denis Villeneuve',
      duration: '2h 46min',
      descriptionKey: 'MOVIES.DESCRIPTIONS.DUNE_PART_TWO',
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
