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

export class Product {
  nombre= new FormControl('', [Validators.required]);
  descripcion= new FormControl('', []);
  codigo= new FormControl('', []);
  stock= new FormControl('', [Validators.required]);
  tipo= new FormControl('',[Validators.required]);
  categoriaId= new FormControl('',[Validators.required,CustomValidator.numeric]);
}

