export interface Usuario {
    id: number;
    nome: string;
    email: string;
    dataNascimento: Date;
    foto: string;
    senha: string;
    isFollowing?: boolean;
    loadingPhoto?: boolean;
}