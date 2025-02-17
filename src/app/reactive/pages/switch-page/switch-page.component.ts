import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switch-page',
  standalone: false,
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.css'
})
export class SwitchPageComponent implements OnInit{
  public myForm : FormGroup;
  public person = {
    gender : 'M',
    wantNotifications: true,
  }
  constructor(private fb : FormBuilder){

    this.myForm = this.fb.group({
      gender: ['M', Validators.required],
      wantNotifications: [true, Validators.required],
      termsAndCondition: [false, Validators.requiredTrue]
    });

  }
  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  public onSave() : void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const {termsAndCondition , ...newPerson} = this.myForm.value;
    this.person = newPerson;

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
          return 'Debe aceptar las condiciones de termino y uso';
        default:
          return null;
      }
    }
    return null;
  }

}
