import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { NgIcon } from '@ng-icons/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Postagem } from '../../interfaces/postagem';
import { PostagemService } from '../../services/postagem.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-postagem',
  standalone: true,
  imports:[NgIcon, ReactiveFormsModule],
  templateUrl: './postagem-cadastro.component.html',
  styleUrl: './postagem-cadastro.component.css'
})
export class PostagemCadastoComponent implements OnInit {

  cadastroPostagemForm! : FormGroup;

  constructor( 
    private feedService: FeedService,
    private formBuilder: FormBuilder,
    private postagemService : PostagemService,
    private toastService: ToastrService
  ){}

  
  ngOnInit(): void {
    this.cadastroPostagemForm = this.formBuilder.group({
      mensagem: ['', [Validators.required]]
    })
  }

  cadastrarPostagem(){
    if(this.cadastroPostagemForm.valid){
      var postagem = this.cadastroPostagemForm.getRawValue() as Postagem;
      this.postagemService.cadastrarPostagem(postagem).subscribe({
        next: () => {
          this.feedService.fecharModal()
        },
        error: (erro) => {
          this.feedService.fecharModal()
          this.toastService.error("Erro inesperado, tente mais tarde")
        }
      })
    }
  }

  fecharModalPublicacao(){
    this.feedService.fecharModal();
  }
  

}