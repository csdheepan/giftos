import { Injectable } from '@angular/core';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private dialog: MatDialog) {}

  /**
   * Handles errors by logging them and displaying an error dialog.
   * @param error The error object.
   * @param context Context or description of where the error occurred.
   */
  handleErrors(error: any, context: string): void {
    console.error(`Error fetching ${context}:`, error);
    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: { message: `Error fetching ${context}` },
      disableClose: true
    });
  }
}