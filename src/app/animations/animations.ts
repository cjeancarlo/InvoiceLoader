import { trigger, state, animate, transition, style } from '@angular/animations';
export const simpleFadeAnimation =
  trigger('simpleFadeAnimation', [
    state('in', style({ opacity: 1 })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate(600)
    ]),
    transition(':leave',
      animate(600, style({ opacity: 0 })))
  ])