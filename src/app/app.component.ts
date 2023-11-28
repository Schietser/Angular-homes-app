import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { RouterModule} from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
    standalone: true,
    selector: 'app-root',
    template: `
  <main>
    <header class="brand-name">
      <img class="brand-logo" src="/assets/logo.svg"
      alt="logo" aria-hidden="true">
    </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>`,
    styleUrls: ['./app.component.css'],
    imports: [HomeComponent, RouterModule, MatButtonModule, MatDialogModule]
})
export class AppComponent {
  title = 'homes';
}
