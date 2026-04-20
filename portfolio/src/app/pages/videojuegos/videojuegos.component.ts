
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  signal
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';


interface VideoGame {
  id: number;
  title: string;
  genre: string;
  platform: string;
  year: number;
  status: string;
}

@Component({
  selector: 'app-videojuegos',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './videojuegos.component.html',
  styleUrl: './videojuegos.component.scss'
})
export default class VideojuegosComponent implements AfterViewInit, OnDestroy {

  //Los hardcodeo por no hacer otro json y demás
  games = signal<VideoGame[]>([
    {
      id: 1,
      title: 'Dark Souls III',
      genre: 'Soulslike',
      platform: 'PS4/PC',
      year: 2016,
      status: 'Completado'
    },
    {
      id: 2,
      title: 'Elden Ring',
      genre: 'Soulslike',
      platform: 'PS4/PC',
      year: 2022,
      status: 'Completado'
    },
    {
      id: 3,
      title: 'NieR: Automata',
      genre: 'Hack & Slash',
      platform: 'PS4/PC',
      year: 2019,
      status: 'Platinado'
    },
    {
      id: 4,
      title: 'DOOM',
      genre: 'FPS',
      platform: 'PS4/PC',
      year: 2016,
      status: 'Completado'
    },
    {
      id: 5,
      title: 'The Witcher: Enhanced Edition',
      genre: 'RPG',
      platform: 'PC',
      year: 2008,
      status: 'Completado'
    },
    {
      id: 6,
      title: 'The Witcher 2: Assasins of Kings',
      genre: 'RPG',
      platform: 'PC',
      year: 2011,
      status: 'Completado'
    },
    {
      id: 7,
      title: 'The Witcher 3: Wild Hunt',
      genre: 'RPG',
      platform: 'PC',
      year: 2015,
      status: 'Platinado'
    },
    {
      id: 8,
      title: 'Hollow Knight',
      genre: 'Metroidvania',
      platform: 'PC',
      year: 2017,
      status: 'Completado'
    },
    {
      id: 9,
      title: 'Hollow Knight: Silksong',
      genre: 'Metroidvania',
      platform: 'PC',
      year: 2025,
      status: 'Incompleto'
    },
    {
      id: 10,
      title: 'Sekiro: Shadows Die Twice',
      genre: 'Soulslike',
      platform: 'PS4/PC',
      year: 2019,
      status: 'Platinado'
    },
    {
      id: 11,
      title: 'Cyberpunk: 2077',
      genre: 'RPG',
      platform: 'PC',
      year: 2020,
      status: 'Completado'
    },
    {
      id: 12,
      title: 'LUNACID',
      genre: 'RPG',
      platform: 'PC',
      year: 2023,
      status: 'Completado'
    },
  ]);

  nameFilter = signal('');
  genreFilter = signal('');

  genres = computed(() => {
    const uniqueGenres = this.games().map(game => game.genre);
    return [... new Set(uniqueGenres)].sort();
  })

  filteredGames = computed(() => {
    const name = this.nameFilter().trim().toLowerCase();
    const genre = this.genreFilter();

    return this.games().filter(game => {
      const matchesName = !name || game.title.toLowerCase().includes(name);

      const matchesGenre = !genre || game.genre === genre;

      return matchesName && matchesGenre;
    })
  })


  resetFilters(): void {
    this.nameFilter.set('');
    this.genreFilter.set('');
  }


  //GSAP a partir de aquí
  private host = inject(ElementRef<HTMLElement>);
  private ctx?: gsap.Context;


  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      tl.from('.games-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.5
      })
        .from('.games-title', {
          y: 30,
          opacity: 0,
          duration: 0.7
        }, '-=0.3')
        .from('.games-description', {
          y: 20,
          opacity: 0,
          duration: 0.6
        }, '-=0.35')
        .from('.filters-card', {
          y: 24,
          opacity: 0,
          duration: 0.7
        }, '-=0.25')
        .from('.table-card', {
          y: 24,
          opacity: 0,
          duration: 0.7
        }, '-=0.35')
        .from('.game-row', {
          y: 16,
          opacity: 0,
          stagger: 0.06,
          duration: 0.35
        }, '-=0.35');

    }, this.host.nativeElement);

  }
  ngOnDestroy(): void{
    this.ctx?.revert();
  }

}
