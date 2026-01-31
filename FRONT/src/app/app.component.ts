import { Component, ViewChild } from '@angular/core';
import { NovoEnderecoComponent } from './pages/cliente/modais/novo-endereco/novo-endereco.component';
import { NovoContatoComponent } from './pages/cliente/modais/novo-contato/novo-contato.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("novoContato")
  modalNovoContato!: NovoContatoComponent;

  @ViewChild("novoEndereco")
  modalNovoEndereco!: NovoEnderecoComponent;

  title = 'pizzaria';
  
  constructor(private modalService: ModalService) {
  }

  ngAfterViewInit(): void {
    this.modalService.modalNovoContato = this.modalNovoContato;
    this.modalService.modalNovoEndereco = this.modalNovoEndereco;
  }
}
