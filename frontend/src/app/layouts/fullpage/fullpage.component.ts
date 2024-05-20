import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-fullpage',
  standalone: true,
    imports: [
        FlexModule,
        FooterComponent,
        HeaderComponent,
        RouterOutlet,
        SidebarComponent
    ],
  templateUrl: './fullpage.component.html',
  styleUrl: './fullpage.component.scss'
})
export class FullpageComponent {

}
