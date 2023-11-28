import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { CreateNewHousingLocationComponent } from '../create-new-housing-location/create-new-housing-location.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" [(ngModel)]="filterText" [ngModelOptions]="{standalone: true}" (input)="filterResults()">
        <button class="primary" type="button" style="float: right;" (click)="openNewLocationModal()">Add New Location</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  filterText: string = '';

  constructor(public dialog: MatDialog, private housingService: HousingService) {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList.filter(
        housingLocation => housingLocation.isDeleted !== true
      );
      this.filterResults();
    });
  }

  filterResults() {
    if (!this.filterText) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      this.filteredLocationList = this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }

  openNewLocationModal() {
    const dialogRef = this.dialog.open(CreateNewHousingLocationComponent);
  }
}
