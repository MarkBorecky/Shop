import {Component} from '@angular/core';
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        MatSelectionList,
        MatListOption,
        NgForOf
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    categories: string[] = ["Kategoria 1", "Kategoria 2", "Kategoria 3", "Kategoria 4", "Kategoria 5"];

}
