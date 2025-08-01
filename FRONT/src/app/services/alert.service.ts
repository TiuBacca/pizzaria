import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    
    Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    showErrorMessage(msg: string) {
        this.Toast.fire({
            icon: 'error',
            title: msg
        })
    }

    showSucessMessage(msg: string) {
        this.Toast.fire({
            icon: 'success',
            title: msg
        })
    }

    showInfoMessage(msg: string) {
        this.Toast.fire({
            icon: 'info',
            title: msg
        })
    }

    showWarningMessage(msg: string) {
        this.Toast.fire({
            icon: 'warning',
            title: msg
        })
    }

async confirmarAcao(mensagem: string): Promise<boolean> {
  const resultado = await Swal.fire({
    title: mensagem,
    showCancelButton: true,
    showDenyButton: false,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar',
    confirmButtonColor: '#ff1100',
  });

  return resultado.isConfirmed;
}

}