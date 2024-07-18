import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/shared/components/logout/logout.component';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {


  constructor(private dialog : MatDialog) { }

  openLogout() {
    this.dialog.open(LogoutComponent,{
      disableClose: true
    })
  }
}
