import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  signal
} from '@angular/core';
import gsap from 'gsap';
import { TranslatePipe } from '@ngx-translate/core';

interface Serie {
  id: number;
  titleKey: string;
  genreKey: string;
  year: number;
  creator: string;
  seasonsCount: number;
  statusKey: string;
  descriptionKey: string;
  poster: string;
}

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export default class SeriesComponent implements AfterViewInit, OnDestroy {

  series = signal<Serie[]>([
    {
      id: 1,
      titleKey: 'SERIES.TITLES.BREAKING_BAD',
      genreKey: 'SERIES.GENRES.DRAMA',
      year: 2008,
      creator: 'Vince Gilligan',
      seasonsCount: 5,
      statusKey: 'SERIES.STATUS.WATCHED',
      descriptionKey: 'SERIES.DESCRIPTIONS.BREAKING_BAD',
      poster: '/images/series/breaking-bad.jpg'
    },
    {
      id: 2,
      titleKey: 'SERIES.TITLES.DARK',
      genreKey: 'SERIES.GENRES.SCI_FI',
      year: 2017,
      creator: 'Baran bo Odar · Jantje Friese',
      seasonsCount: 3,
      statusKey: 'SERIES.STATUS.WATCHED',
      descriptionKey: 'SERIES.DESCRIPTIONS.DARK',
      poster: '/images/series/dark.jpg'
    },
    {
      id: 3,
      titleKey: 'SERIES.TITLES.ARCANE',
      genreKey: 'SERIES.GENRES.ANIMATION',
      year: 2021,
      creator: 'Christian Linke · Alex Yee',
      seasonsCount: 2,
      statusKey: 'SERIES.STATUS.WATCHED',
      descriptionKey: 'SERIES.DESCRIPTIONS.ARCANE',
      poster: '/images/series/arcane.jpg'
    },
    {
      id: 4,
      titleKey: 'SERIES.TITLES.MR_ROBOT',
      genreKey: 'SERIES.GENRES.THRILLER',
      year: 2015,
      creator: 'Sam Esmail',
      seasonsCount: 4,
      statusKey: 'SERIES.STATUS.WATCHED',
      descriptionKey: 'SERIES.DESCRIPTIONS.MR_ROBOT',
      poster: '/images/series/mr-robot.jpg'
    },
    {
      id: 5,
      titleKey: 'SERIES.TITLES.THE_LAST_OF_US',
      genreKey: 'SERIES.GENRES.DRAMA',
      year: 2023,
      creator: 'Craig Mazin · Neil Druckmann',
      seasonsCount: 2,
      statusKey: 'SERIES.STATUS.FOLLOWING',
      descriptionKey: 'SERIES.DESCRIPTIONS.THE_LAST_OF_US',
      poster: '/images/series/the-last-of-us.jpg'
    },
    {
      id: 6,
      titleKey: 'SERIES.TITLES.ATTACK_ON_TITAN',
      genreKey: 'SERIES.GENRES.ACTION',
      year: 2013,
      creator: 'Hajime Isayama (obra original)',
      seasonsCount: 4,
      statusKey: 'SERIES.STATUS.WATCHED',
      descriptionKey: 'SERIES.DESCRIPTIONS.ATTACK_ON_TITAN',
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
