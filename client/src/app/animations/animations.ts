import { trigger, state, animate, transition, style } from '@angular/animations';

export const slide =
  trigger('slide', [
    state('in', style({
      height: '*',
      opacity: 1
    })),
    transition('void => *', [
      style({
        height: 0,
        opacity: 0
      }),
      animate('600ms cubic-bezier(0.165, 0.84, 0.44, 1)')
    ]),
    transition('* => void', [
      animate('600ms cubic-bezier(0.165, 0.84, 0.44, 1)', style({
        height: 0,
        opacity: 0
      }))
    ])
  ]);
