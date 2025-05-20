import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../servicos/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  produto: any = { produto: '', descricao: '', foto: '', preco: null };

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoService.obterProdutoPorId(Number(id)).subscribe(dados => {
        this.produto = dados;
      });
    }
  }

  salvarProduto(): void {
    if (this.produto.id) {
      this.produtoService.atualizarProduto(this.produto.id, this.produto).subscribe(() => {
        alert('Produto atualizado!');
        this.router.navigate(['/painel-principal']);
      });
    } else {
      this.produtoService.adicionarProduto(this.produto).subscribe(() => {
        alert('Produto cadastrado!');
        this.router.navigate(['/painel-principal']);
      });
    }
  }
}