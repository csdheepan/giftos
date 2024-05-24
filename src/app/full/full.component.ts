import { Component } from '@angular/core';
import { LogoutComponent } from '../modal/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';

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
