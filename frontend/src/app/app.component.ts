import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./shared/components/footer/footer.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        HeaderComponent,
        SidebarComponent,
        FooterComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'Shop';
}
