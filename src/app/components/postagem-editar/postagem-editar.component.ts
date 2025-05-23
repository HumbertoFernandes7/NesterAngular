import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { PostagemService } from '../../services/postagem.service';
import { ToastrService } from 'ngx-toastr';
import { Postagem } from '../../interfaces/postagem';

@Component({
  selector: 'app-postagem-editar',
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule],
  templateUrl: './postagem-editar.component.html',
  styleUrl: './postagem-editar.component.css'
})
export class PostagemEditarComponent implements OnInit {
editarPostagemForm!: FormGroup;
postagemEncontrada!: Postagem;

constructor(
    private formBuilder: FormBuilder,
    private postagemService: PostagemService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.postagemEncontrada = this.postagemService.postagem;
      this.editarPostagemForm = this.formBuilder.group({
        mensagem: [this.postagemEncontrada.mensagem, [Validators.required]],
      });
    }
  
  editarPostagem(){
    this.postagemEncontrada.mensagem = this.editarPostagemForm.value.mensagem
    this.postagemService.editarPostagem(this.postagemEncontrada).subscribe({
      next: () => {
        this.fecharModalPublicacao();
        this.toastService.success('Postagem editada com sucesso');
      },
      error: (erro) => {
        this.fecharModalPublicacao();
        console.log(erro);
        
        this.toastService.error('Erro ao editar postagem');
      }
    });
  }

  fecharModalPublicacao(){
    this.postagemService.fecharModalEdicao();
  }
}
