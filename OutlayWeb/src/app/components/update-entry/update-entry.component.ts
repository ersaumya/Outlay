import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Type } from '../../shared/interface/type';
import { EntryService } from '../../services/entry.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.css']
})
export class UpdateEntryComponent implements OnInit {
  
  form:FormGroup;
  id:number;
  constructor(private fb:FormBuilder,
    private dialogRef:MatDialogRef<UpdateEntryComponent>,
    private service:EntryService,
    private toastr:ToastrService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA){Description,IsExpense,Value,Id}) {
      this.id=Id;
      this.form=fb.group({
        description:[Description,Validators.required],
        isExpense:[IsExpense,Validators.required],
        value:[Value,Validators.required],
      })
     }
  
   
  types:Type[]=[
      {value:true,display:'Expense'},
      {value:false,display:'Income'},
    ]  
  ngOnInit() {
  }
 
  save(){
    this.form.value.id=this.id;
    //console.log("save clicked");
    this.service.updateEntry(this.id,this.form.value).subscribe((data)=>{
      this.toastr.success('Updated successfully');
      console.log('Data :',data);
      //this.form.reset();
      this.router.navigate(['entries']);
    },
    error=>{
      console.log(error);
    })
  }

}
