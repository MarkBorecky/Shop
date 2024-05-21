import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        RouterLink,
        FlexModule,
        MatIcon,
        MatButton
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    title: string = "Shop";

}
