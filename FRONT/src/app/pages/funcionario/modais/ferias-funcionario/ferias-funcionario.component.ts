import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

declare var window: any;

@Component({
  selector: 'app-ferias-funcionario',
  templateUrl: './ferias-funcionario.component.html',
  styleUrls: ['./ferias-funcionario.component.css']
})
export class FeriasFuncionarioComponent implements OnInit {

  @Input() funcionario: any;
  feriasForm!: FormGroup;
  diasFerias: number | null = null;

  modalFerias: any;

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.feriasForm = this.fb.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      tipoFerias: ['REMUNERADAS', Validators.required],
      observacoes: [''],
      notificarEmail: [true]
    }, { validators: this.validaPeriodoFerias });
  }

  iniciaModal() {
    this.modalFerias = new window.bootstrap.Modal(document.getElementById('modalFerias'))
  }

  openModal(item: any) {

    return new Promise<any>((resolve, reject) => {
      this.funcionario = item;
      this.feriasForm.reset();
      this.iniciaModal();
      this.modalFerias.show();

      this.onOk.subscribe((res) => {
        this.modalFerias.hide();
        resolve(res);
      });
      this.onCancel.subscribe(() => {
        this.modalFerias.hide();
        reject();
      });

    });

  }


  // Valida se a data fim é maior que a data início
  validaPeriodoFerias(group: AbstractControl) {
    const inicio = group.get('dataInicio')?.value;
    const fim = group.get('dataFim')?.value;
    if (inicio && fim && new Date(fim) < new Date(inicio)) {
      return { dataInvalida: true };
    }
    return null;
  }

  // Calcula quantidade de dias corridos de férias
  calcularDiasFerias() {
    const inicio = this.feriasForm.get('dataInicio')?.value;
    const fim = this.feriasForm.get('dataFim')?.value;

    if (inicio && fim) {
      const diffTime = new Date(fim).getTime() - new Date(inicio).getTime();
      this.diasFerias = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir o dia inicial
    } else {
      this.diasFerias = null;
    }
  }

  confirmarFerias() {
    if (this.feriasForm.valid) {
      const payload = {
        funcionarioId: this.funcionario.id,
        ...this.feriasForm.value,
        diasFerias: this.diasFerias
      };

      this.funcionarioService.concederFerias(payload).subscribe((response) => {
        if(response){
          this.alertService.showSucessMessage(response)
          this.onOk.emit();
        }
      })
    }
  }


}
