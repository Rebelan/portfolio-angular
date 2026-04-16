import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";


export type ButtonVariant =
  | 'basic'
  | 'raised'
  | 'flat'
  | 'stroked';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  label = input.required<string>()
  link = input.required<string>()
  variant = input<ButtonVariant>('basic');
}
