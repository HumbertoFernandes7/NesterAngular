import { Curtida } from "./curtida";
import { Usuario } from "./usuario";

export interface Postagem {
    id: number;
    mensagem: string;
    dataPostagem: Date | string;
    usuario: Usuario;
    curtidas: Curtida [];
    quantidadeCurtidas: number;
    jaCurtiu: boolean;
    menuAberto: boolean;
}