import { EntryService } from '../../services/entry.service';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EntryElement} from '../../shared/interface/entryelement';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatSort, MatPaginator } from '@angular/material';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  displayedColumns: string[] = ['Description','IsExpense','Value','Actions']
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('TABLE',{static:true}) table: ElementRef;
  constructor(private service:EntryService,
    private dialog:MatDialog,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getAll().subscribe((data)=>{
      console.log('Results -',data);
      this.dataSource=new MatTableDataSource<EntryElement>(data as EntryElement[]);
      //Pagination code
      this.dataSource.paginator = this.paginator;
      //Column sort code
      this.dataSource.sort = this.sort;
    })
  }

  //search filter code
  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateEntry(entry){
    console.log(entry);
    this.dialog.open(UpdateEntryComponent,{
      data:{
        Id:entry.Id,
        Description:entry.Description,
        IsExpense:entry.IsExpense,
        Value:entry.Value
      }
    })
    this.ngOnInit();
  }

  deleteEntry(id:number){
    //console.log(id);
    if(confirm('Are you sure delete this entry?')){
      this.service.deleteEntry(id).subscribe(res=>{
        this.toastr.warning("Deleted Successfully");
         this.ngOnInit();
      },
      error=>{
        console.log(error);
      })
    }
    
  }

  exportAsExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'OutlayData.xlsx');
  }

}

