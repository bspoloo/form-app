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
    this.myForm.reset();
    console.log(this.myForm.value);
  }
  public getFavoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }
}
