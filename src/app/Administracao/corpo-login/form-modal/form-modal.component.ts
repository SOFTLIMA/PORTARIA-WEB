import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {

  newItem = {
    id: "",
    data: "",
    descricao: "",
    link_Imgs: "",
    titulo: ""
  };

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recebe os dados do item
  ) {
    if (data) {
      this.newItem = { ...data, link_Imgs: data.link_Imgs.join(';') }; // Converte o array de volta para string
    }
  }

  onSubmit() {
    this.dialogRef.close(this.newItem); // Envia os dados de volta para o componente pai
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
