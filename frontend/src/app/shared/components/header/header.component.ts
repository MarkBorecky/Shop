import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        RouterLink,
        FlexModule
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
