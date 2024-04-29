export interface Favorite {
    _id?:           string;
    idPelicula:     string;
    idUsuario:      string
    esFavorito?:     boolean;
    notaUsuario?:   number;
    __v?:           number
}
