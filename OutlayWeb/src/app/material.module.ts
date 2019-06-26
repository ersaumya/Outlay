import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule,
          MatInputModule,
          MatSelectModule,
          MatCardModule,
          MatButtonModule,
          MatToolbarModule,
          MatDialogModule,
          MatSortModule,
          MatPaginatorModule,
          MatIconModule,
          MatTooltipModule
          } from '@angular/material';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports:[
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
