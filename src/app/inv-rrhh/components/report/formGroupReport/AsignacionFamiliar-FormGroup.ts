import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';


export class CustomValidator{
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }
}

export class AsignacionFamiliar {
  trabajador= new FormControl('',[Validators.required]);
  familiar= new FormControl('',[Validators.required]);
  desde= new FormControl('', [Validators.required]);
  hasta= new FormControl('', [Validators.required]);
}
