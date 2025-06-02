import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { Postagem } from '../../interfaces/postagem';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, forkJoin, map, switchMap } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { MeuPerfilComponent } from '../meu-perfil/meu-perfil.component';
import { ToastrService } from 'ngx-toastr';
import { PostagemService } from '../../services/postagem.service';
import { FollowService } from '../../services/follow.service';
import { Seguidor } from '../../interfaces/seguidor';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MeuPerfilComponent],
  templateUrl: './perfil.component.html',
  template: `
    <app-meu-perfil
      [isOwner]="false"
      [usuario]="usuario"
      [postagens]="postagens"
      [contagemSeguidor]="contagemSeguidor"
    >
    </app-meu-perfil>
  `,
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  usuario!: Usuario;
  postagens: Postagem[] = [];
  isFollowing = false;
  contagemSeguidor!: Seguidor

  constructor(
    private activeRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private toastService: ToastrService,
    private postagemService: PostagemService,
    private followService: FollowService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        filter((id) => !isNaN(id)),
        switchMap((id) =>
          forkJoin({
            usuario: this.usuarioService.buscarUsuarioPorId(id),
            postagens: this.postagemService.listarPostagensDoUsuarioPeloId(id),
            isFollow: this.followService.isFollow(id)
          })
        )
      )
      .subscribe({
        next: ({ usuario, postagens, isFollow }) => {
          this.usuario = usuario;
          this.postagens = this.postagemService.prepararPostagens(
            postagens,
            usuario
          );
          this.isFollowing = isFollow; 
          this.carregarFotoUsuarioLogado(usuario.id);
          this.carregarQuantidadeSeguidoresESeguidos(usuario.id)
        },
        error: () => {
          this.toastService.error('Erro ao carregar perfil');
          this.route.navigate(['/feed']);
        },
      });
  }

  carregarQuantidadeSeguidoresESeguidos(id: number){
    this.usuarioService.buscarQuantidadeSeguidoresESeguidos(id).subscribe({
      next: (retorno) =>{
        this.contagemSeguidor = retorno
      },
      error: () => {
        this.toastService.error("Erro inesperado!");
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
