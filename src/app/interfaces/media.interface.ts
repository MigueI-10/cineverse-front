import { Actor } from "./actor.interface";

export interface Media{
    _id?: string,
    tipo:        string;
    imagen:      string;
    titulo:      string;
    actores:     string[] | Actor[];
    director:    string;
    anyo:        number;
    genero:      string;
    descripcion: string;
    duracion?:   number;
    episodios?:  string;
    puntuacion:  number;
    __v:         number;
}