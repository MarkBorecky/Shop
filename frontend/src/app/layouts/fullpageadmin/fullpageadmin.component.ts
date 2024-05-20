import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-fullpageadmin',
  standalone: true,
  imports: [
    FlexModule,
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    SidebarComponent,
    RouterLink
  ],
  templateUrl: './fullpageadmin.component.html',
  styleUrl: './fullpageadmin.component.scss'
})
export class FullpageadminComponent {

}
