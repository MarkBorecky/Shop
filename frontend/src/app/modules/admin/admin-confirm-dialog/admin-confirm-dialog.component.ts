import { Component, Inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-confirm-dialog',
  standalone: true,
  imports: [FlexModule, MatIcon, MatButton, MatIconButton, MatDialogClose],
  templateUrl: './admin-confirm-dialog.component.html',
  styleUrl: './admin-confirm-dialog.component.scss',
})
export class AdminConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
