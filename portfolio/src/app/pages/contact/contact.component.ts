
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { gsap } from 'gsap';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export default class ContactComponent implements AfterViewInit, OnDestroy {

  private host = inject(ElementRef<HTMLElement>);
  private fb = inject(FormBuilder);
  private ctx?: gsap.Context;

  submitted = signal(false);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    accepted: [false, [Validators.required]]
  });

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('Mensaje enviado', this.contactForm.getRawValue());

    this.submitted.set(true);
    this.contactForm.reset({
      name: '',
      email: '',
      message: '',
      accepted: false
    });
  }

  ngAfterViewInit(): void {

    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      tl.from('.contact-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.5
      })
        .from('.contact-title', {
          y: 30,
          opacity: 0,
          duration: 0.7
        }, '-=0.3')
        .from('.contact-description', {
          y: 20,
          opacity: 0,
          duration: 0.6
        }, '-=0.35')
        .from('.contact-card', {
          y: 28,
          opacity: 0,
          duration: 0.8
        }, '-=0.2');
    }, this.host.nativeElement);
  }


  ngOnDestroy(): void {
    this.ctx?.revert();
  }


}
