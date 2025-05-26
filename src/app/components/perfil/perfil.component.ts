import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { Postagem } from '../../interfaces/postagem';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { FeedService } from '../../services/feed.service';
import { MeuPerfilComponent } from "../meu-perfil/meu-perfil.component";
import { ToastrService } from 'ngx-toastr';
import { PostagemService } from '../../services/postagem.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MeuPerfilComponent],
  templateUrl: './perfil.component.html',
  template: `
    <app-meu-perfil
      [isOwner]="false"
      [usuario]="usuario"
      [postagens]="postagens">
    </app-meu-perfil>
  `,
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  usuario!: Usuario;
  postagens: Postagem[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private feedService: FeedService,
    private toastService: ToastrService,
    private postagemService: PostagemService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      usuario: this.usuarioService.buscarUsuarioPorId(id),
      postagens: this.feedService.listarPostagensDoUsuarioPeloId(id),
    }).subscribe({
      next: ({ usuario, postagens }) => {
        this.usuario = usuario;
        this.postagens = this.postagemService.prepararPostagens(
          postagens,
          usuario
        );
        this.carregarFotoUsuarioLogado(usuario.id);
      },
      error: (erro) => {
        console.log(erro);
        
        this.toastService.error('Usuário não encontrado')
      },
    });
  }

  carregarFotoUsuarioLogado(id: number) {
    this.usuarioService.buscarFotoUsuarioPeloId(id).subscribe({
      next: (blob) => {
        this.usuario.foto = URL.createObjectURL(blob);
      },
      error: (erro) => {
        this.toastService.error(
          'Erro inesperado ao carregar foto do usuário ' + erro.message
        );
      },
    });
  }
}
