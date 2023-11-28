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
    <section class="listing-apply">
      <h2 class="section-heading">Create a new housing location</h2>
      <form [formGroup]="newLocationForm" (submit)="onSubmit()">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" required>

        <label for="city">City</label>
        <input id="city" type="text" formControlName="city" required>

        <label for="state">State</label>
        <input id="state" type="text" formControlName="state" required>

        <label for="photo">Photo</label>
        <input id="photo" type="text" formControlName="photo" required>

        <label for="availableUnits">Available Units</label>
        <input id="availableUnits" type="number" formControlName="availableUnits" required>

        <label for="wifi">Wifi</label>
        <input id="wifi" type="checkbox" formControlName="wifi">

        <label for="laundry">Laundry</label>
        <input id="laundry" type="checkbox" formControlName="laundry">

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
  }
}
