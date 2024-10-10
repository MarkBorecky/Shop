import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {AdminMessageComponent} from "../../modules/admin/admin-message/admin-message.component";

@Component({
  selector: 'app-fullpageadmin',
  standalone: true,
  imports: [
    FlexModule,
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    SidebarComponent,
    RouterLink,
    MatIcon,
    MatButton,
    MatListOption,
    MatSelectionList,
    NgForOf,
    AdminMessageComponent,
  ],
  templateUrl: './fullpageadmin.component.html',
  styleUrl: './fullpageadmin.component.scss',
})
export class FullpageadminComponent {}
