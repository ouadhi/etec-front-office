import { trigger, transition, style, animate } from "@angular/animations";


export const InOutAnimation = trigger(
    'inOutAnimation',
    [
        transition(
            ':enter',
            [
                style({ height: 0, opacity: 0 }),
                animate('0.5s ease-out',
                    style({ height: 300, opacity: 1 }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ height: 300, opacity: 1 }),
                animate('0.5s ease-in',
                    style({ height: 0, opacity: 0 }))
            ]
        )
    ]
);