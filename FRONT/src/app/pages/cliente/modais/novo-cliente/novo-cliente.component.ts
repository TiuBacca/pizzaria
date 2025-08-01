import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContatoService } from 'src/app/services/contato.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { ModalService } from 'src/app/services/modal.service';

declare var window: any;

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  incluirForm = new FormGroup({
    id: new FormControl(0),
    nome: new FormControl(""),
    enderecos: new FormControl([]),
    contatos: new FormControl([])
  })

  modalNovoCliente: any;

  constructor(private modalService: ModalService, private alertService: AlertService,
    private clienteService: ClienteService, private enderecoService: EnderecoService, private contatoService: ContatoService) { }

  ngOnInit(): void {
  }

  openModal(item: any) {


    return new Promise<any>((resolve, reject) => {
      this.iniciaModal();
      if (item) {
        this.preencheModal(item);
      }
      this.modalNovoCliente.show();

      this.onOk.subscribe((res) => {
        this.modalNovoCliente.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalNovoCliente.hide();
        reject();
      });

    });

  }

  preencheModal(item: any) {
    this.incluirForm.get('id')?.setValue(item.id);
    this.incluirForm.get('nome')?.setValue(item.nome);

    this.alimentaContatos(item)
    this.alimentaEnderecos(item);

  }

  alimentaEnderecos(item: any) {
    this.enderecoService.buscaListaEnderecos(item).subscribe((response) => {
      this.incluirForm.get('enderecos')?.setValue(item.enderecos)
    });
  }

  alimentaContatos(item: any) {
    this.contatoService.buscaListaContatos(item).subscribe((response) => {
      this.incluirForm.get('contatos')?.setValue(item.contatos)
    });
  }

  iniciaModal() {
    this.modalNovoCliente = new window.bootstrap.Modal(document.getElementById('modalNovoCliente'))
  }

  openModalNovoContato() {

    this.modalService.modalNovoContato.openModal(this.incluirForm.getRawValue()).then(((res) => {
      this.alimentaContatos(this.incluirForm.getRawValue())
    }))
  }

  openModalNovoEndereco() {
    this.modalService.modalNovoEndereco.openModal(this.incluirForm.getRawValue()).then(((res) => {
      this.alimentaEnderecos(this.incluirForm.getRawValue())
    }))
  }

  async excluirContato(data: any) {
    const confirmado = await this.alertService.confirmarAcao('Você realmente deseja excluir este contato?');
    if (confirmado) {
      this.contatoService.excluirContato(data).subscribe((response) => {
        this.alertService.showSucessMessage(response);
      });
    }
  }

  async excluirEndereco(data: any) {
    const confirmado = await this.alertService.confirmarAcao('Você realmente deseja excluir este endereço?');

    if (confirmado) {
      this.enderecoService.excluirEndereco(data).subscribe((response) => {
        this.alertService.showSucessMessage(response);
      });
    }
  }

  salvar() {
    this.clienteService.salvarCliente(this.incluirForm.getRawValue()).subscribe((response) => {
      if(response){
        this.alertService.showSucessMessage(response);
        this.onOk.emit();
      }
    })
  }

  get enderecos() {
    return this.incluirForm.get('enderecos')?.value || [];
  }

  get contatos() {
    return this.incluirForm.get('contatos')?.value || [];
  }
}
