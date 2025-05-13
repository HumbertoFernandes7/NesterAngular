import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagemCadastoComponent } from "./postagem-cadastro.component";

describe('PostagemCadastroComponent', () => {
  let component: PostagemCadastoComponent;
  let fixture: ComponentFixture<PostagemCadastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostagemCadastoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostagemCadastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
