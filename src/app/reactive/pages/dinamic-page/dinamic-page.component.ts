import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamic-page',
  standalone: false,
  templateUrl: './dinamic-page.component.html',
  styleUrl: './dinamic-page.component.css',
})
export class DinamicPageComponent {
  public myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(3)],
      favorite: ['', Validators.required, Validators.minLength(3)],
      favoriteGames: this.formBuilder.array([
        ['Metal Gear', [Validators.required]],
        ['Dead Stranding', [Validators.required]],
      ]),
    });
  }
  public onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();
  }
  public getFavoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }
  public isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
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
  public onDeleteFavorite(index: number): void {
    this.getFavoriteGames().removeAt(index);
  }
  public onSaveFavorite(): void {
    if (this.myForm.controls['favorite'].invalid) {
      return;
    }
    console.log('valores correctos en favorite');

    // this.getFavoriteGames().push(this.myForm.controls['favorite'])
    this.getFavoriteGames().push(
      this.formBuilder.control(
        this.myForm.controls['favorite'].value,
        Validators.required
      )
    );
    this.myForm.controls['favorite'].reset();
  }
}
