import { AfterViewInit, Component, computed, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { gsap } from 'gsap';


interface Book {
  id: number;
  title: string;
  category: string;
  author: string;
  year: number;
  status: string;
}



@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.scss'
})
export default class LibrosComponent implements AfterViewInit, OnDestroy {


  books = signal<Book[]>([
    {
      id: 1,
      title: 'El señor de los anillos: La Comunidad del Anillo',
      category: 'Fantasía',
      author: 'J. R. R. Tolkien',
      year: 1954,
      status: 'Leido'
    },
    {
      id: 2,
      title: 'El señor de los anillos: Las Dos Torres',
      category: 'Fantasía',
      author: 'J. R. R. Tolkien',
      year: 1954,
      status: 'Leido'
    },
    {
      id: 3,
      title: 'El señor de los anillos: El Retorno del Rey',
      category: 'Fantasía',
      author: 'J. R. R. Tolkien',
      year: 1955,
      status: 'Leido'
    },
    {
      id: 4,
      title: 'El Hobbit',
      category: 'Fantasía',
      author: 'J. R. R. Tolkien',
      year: 1937,
      status: 'Leido'
    },
    {
      id: 5,
      title: 'Dune',
      category: 'Ciencia ficción',
      author: 'Frank Herbert',
      year: 1965,
      status: 'Pendiente'
    },
    {
      id: 6,
      title: 'El Sabueso de los Baskerville',
      category: 'Misterio',
      author: 'Arthur Conan Doyle',
      year: 1902,
      status: 'Leído'
    },
    {
      id: 7,
      title: 'El Imperio Final',
      category: 'Fantasía',
      author: 'Brandon Sanderson',
      year: 2006,
      status: 'Pendiente'
    },
    {
      id: 8,
      title: 'El Nombre del Viento',
      category: 'Fantasía',
      author: 'Frank Herbert',
      year: 1965,
      status: 'Pendiente'
    },
    {
      id: 9,
      title: 'El Último Deseo',
      category: 'Fantasía',
      author: 'Andrzej Sapkowski',
      year: 1993,
      status: 'Leído'
    },
    {
      id: 10,
      title: 'Estación de Tormentas',
      category: 'Fantasía',
      author: 'Andrzej Sapkowski',
      year: 2013,
      status: 'Leído'
    },
    {
      id: 11,
      title: 'La Espada del Destino',
      category: 'Fantasía',
      author: 'Andrzej Sapkowski',
      year: 1992,
      status: 'Leyendo'
    }
  ]);

  nameFilter = signal('');
  categoryFilter = signal('');

  categories = computed(() => {
    return [... new Set(this.books().map(book => book.category))].sort();
  });

  filteredBooks = computed(() => {
    const name = this.nameFilter().trim().toLowerCase();
    const category = this.categoryFilter();

    return this.books().filter(book => {
      const matchesName = !name || book.title.toLowerCase().includes(name);

      const matchesCategory = !category || book.category === category;

      return matchesName && matchesCategory;
    });
  });

  resetFilters(): void {
    this.nameFilter.set('');
    this.categoryFilter.set('');
  }

  private host = inject(ElementRef<HTMLElement>);
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });


      tl.from('.books-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.5
      })
        .from('.books-title', {
          y: 30,
          opacity: 0,
          duration: 0.7
        }, '-=0.3')
        .from('.books-description', {
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
        .from('.book-row', {
          y: 16,
          opacity: 0,
          stagger: 0.06,
          duration: 0.35
        }, '-=0.35');

    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

}
