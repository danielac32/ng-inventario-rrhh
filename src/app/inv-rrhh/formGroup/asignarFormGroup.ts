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




export class Asignar {
  trabajador= new FormControl('');
  familiar= new FormControl('');
  otro= new FormControl('');
  observacion= new FormControl('');
}


export class AsignarTrabajor {
  trabajador= new FormControl('',[Validators.required]);
  observacion= new FormControl('');
}

export class AsignarFamiliar {
  trabajador= new FormControl('',[Validators.required]);
  familiar= new FormControl('',[Validators.required]);
  observacion= new FormControl('');
}

export class AsignarOtro {
  otro= new FormControl('',[Validators.required]);
  observacion= new FormControl('',[Validators.required]);
}
