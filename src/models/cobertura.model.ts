import { Entity, model, property } from '@loopback/repository';

@model()
export class Cobertura extends Entity {
    @property({
        type: 'string',
        id: true,
    })
    id: string;

    @property({
        type: 'string',
        required: true,
    })
    idNegocio: string;

    @property({
        type: 'string',
        required: true,
    })
    latitud: string;

    @property({
        type: 'string',
        required: true,
    })
    longitud: string;

    @property({
        type: 'number',
        required: true,
    })
    orden: number;

    @property({
        type: 'date',
        required: true,
    })
    creado: string;

    @property({
        type: 'date',
        required: true,
    })
    actualizado: string;

    constructor(data?: Partial<Cobertura>) {
        super(data);
    }
}