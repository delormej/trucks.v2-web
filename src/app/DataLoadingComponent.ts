import { MatSnackBar } from '@angular/material/snack-bar';

export abstract class DataLoadingComponent {
    constructor(protected snack: MatSnackBar) {}

    protected loading: boolean = false;

    onProgressTimeout(value: string): void {
    }
      
    showError(error: Error, message: string) {
        this.snack.open(message, 'CLOSE', { panelClass: 'errorSnack' } );
        console.log(error);
    }      
}
