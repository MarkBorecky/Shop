import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";

@Component({
  selector: 'app-footer',
  standalone: true,
    imports: [
        FlexModule
    ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
