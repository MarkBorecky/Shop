import {Component} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {AdminMessageComponent} from "../../modules/admin/admin-message/admin-message.component";

@Component({
    selector: 'app-fullpageadmin',
    standalone: true,
    imports: [
        FlexModule,
        RouterOutlet,
        RouterLink,
        MatIcon,
        MatButton,
        MatListOption,
        MatSelectionList,
        AdminMessageComponent,
    ],
    templateUrl: './fullpageadmin.component.html',
    styleUrl: './fullpageadmin.component.scss',
})
export class FullpageadminComponent {
}
