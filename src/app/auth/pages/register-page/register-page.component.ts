import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CustomValidators from '../../../shared/validators/validators.function';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  public myForm: FormGroup;
  // insert all validators
  constructor(private fb: FormBuilder, private validatorSerice : ValidatorsService, private emailValidatorService : EmailValidatorService) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(validatorSerice.firstNameAndLastnamePattern)]],
      email: ['', [Validators.required, Validators.pattern(validatorSerice.emailPattern)], [this.emailValidatorService]],
      username: ['', [Validators.required, validatorSerice.cantBeStrider] ],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    } , {
      validators: [
        this.validatorSerice.isFieldOneEqualFielTwo('password1', 'password2'),
      ]
    });
  }
  public onSubmit() :void{
    this.myForm.markAllAsTouched();
  }
  public isValidField(fiel : string) : boolean | null{
    return this.validatorSerice.isValidField(fiel, this.myForm);
  }
}
