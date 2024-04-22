export interface CommentResponse {
    _id:        string;
    idUsuario:  IDUsuario;
    idPelicula: string;
    contenido:  string;
    fecha:      Date;
    __v:        number;
}

export interface IDUsuario {
    _id:  string;
    name: string;
}
