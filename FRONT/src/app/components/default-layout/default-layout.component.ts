import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { filter, } from 'rxjs';



var json = require('../../config/rotas.json');
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent implements OnInit {

  nomePagina = '';
  rotas = json.rotas;
  menuAcoes: string[] = ['Trocar senha', 'Trocar token', 'Sair'];
  linkImagem = './assets/img/iconeUsuario.png'

  info = {
    usuario: sessionStorage.getItem('nomeUsuario'),
    permissao: {
      id: sessionStorage.getItem('idPerfilPermissao'),
      descricao: sessionStorage.getItem('descricaoPermissao')
    }
  }

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.alterarNomePagina(window.location.pathname);
      });
    window.onload = () => {
      this.alterarNomePagina(window.location.pathname);
    };
  }

  ngOnInit() {
  }

  alterarNomePagina(path: string) {
    const pathParts = path.split("/");
    const lastPathPart = pathParts[pathParts.length - 1];

    json.rotas.forEach((rota: { rota: any; nome: any }) => {
      const rotaParts = rota.rota.split("/");
      const lastRotaPart = rotaParts[rotaParts.length - 1];

      if (lastPathPart === lastRotaPart) {
        this.nomePagina = rota.nome;
      }
    });
  }

  onAction(acao: any) {
    switch (acao) {
      case 'Sair':
        this.logout()
        break;
      default:
        console.log(acao)
        break;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
