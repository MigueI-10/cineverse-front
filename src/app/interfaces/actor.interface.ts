export interface Actor {
    _id:             string;
    nombre:          string;
    biografia:       string;
    imagen:          string;
    fechaNacimiento: Date;
    actuaciones:     string[];
    nacionalidad:    string;
}