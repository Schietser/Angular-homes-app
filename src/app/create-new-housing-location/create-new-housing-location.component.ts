import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HousingService } from '../housing.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-new-housing-location',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="listing-apply" style="padding: 10%;">
      <h2 class="section-heading">Create a new housing location</h2>
      <form [formGroup]="newLocationForm" (submit)="onSubmit()">
        <label for="name">Name</label>
        <br>
        <input id="name" type="text" formControlName="name" required>
        <br>

        <label for="city">City</label>
        <br>
        <input id="city" type="text" formControlName="city" required>
        <br>

        <label for="state">State</label>
        <br>
        <input id="state" type="text" formControlName="state" required>
        <br>

        <label for="photo">Photo</label>
        <br>
        <input id="photo" type="text" formControlName="photo" required>
        <br>

        <label for="availableUnits">Available Units</label>
        <br>
        <input id="availableUnits" type="number" formControlName="availableUnits" required>
        <br>

        <label for="wifi">Wifi</label>
        <br>
        <input id="wifi" type="checkbox" formControlName="wifi">
        <br>

        <label for="laundry">Laundry</label>
        <br>
        <input id="laundry" type="checkbox" formControlName="laundry">
        <br>

        <button type="submit" class="primary" (click)="closeDialog()">Create Location</button>
      </form>
    </section>
  `,
  styleUrls: ['./create-new-housing-location.component.css']
})
export class CreateNewHousingLocationComponent implements OnInit {
  newLocationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateNewHousingLocationComponent>,
    private formBuilder: FormBuilder,
    private housingService: HousingService
  ) {
    this.newLocationForm = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      photo: ['', Validators.required],
      availableUnits: [0, Validators.required],
      wifi: [false],
      laundry: [false],
    });
  }

  ngOnInit() {
    // You can keep ngOnInit for any additional initialization logic
  }

  onSubmit() {
    if (this.newLocationForm.valid) {
      const newLocation = this.newLocationForm.value;
      newLocation.photo = `/assets/${newLocation.photo}`;
      this.housingService.createHousingLocation(newLocation).then((createdLocation) => {
        console.log('New location created:', createdLocation);
        this.dialogRef.close();
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
    window.location.reload();
    
  }
}
