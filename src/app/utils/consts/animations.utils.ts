import { trigger, animate, style, group, query, stagger, transition, keyframes } from '@angular/animations';

export const fade = trigger('fade', [
    transition('void => *', [
        style({ opacity: '0' }),
        animate(1000, style({ opacity: '1' }))
    ]),
    transition('* => void', [
        style({ opacity: '1' }),
        animate(1000, style({ opacity: '0' }))
    ])
]);