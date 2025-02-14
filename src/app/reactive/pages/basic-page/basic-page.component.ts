import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const product = {
  name: 'RTX5090',
  price: 0,
  inStorage: 0,
};

@Component({
  selector: 'app-basic-page',
  standalone: false,
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
})
export class BasicPageComponent implements OnInit {
  public myForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [Validators.required, Validators.min(0)]],
    });
  }
  ngOnInit(): void {
    console.log('Cargando producto por defecto');

    this.myForm.reset(product);
  }
  public isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }
  public getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) {
      return null;
    }
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        default:
          return null;
      }
    }
    return null;
  }
  public onSaveForm(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
