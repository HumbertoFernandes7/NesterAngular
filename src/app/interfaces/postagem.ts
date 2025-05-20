import { Usuario } from "./usuario";

export interface Postagem {
    id: number;
    mensagem: string;
    dataPostagem: Date;
    usuario: Usuario;
    quantidadeCurtidas: number;
    jaCurtiu: boolean;
}