export interface FavoriteResponse {
    _id:        string;
    idPelicula: string;
    titulo:     string;
    imagen:     string;
    esFavorito:     boolean;
    notaUsuario?: number;
}
