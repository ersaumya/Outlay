import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Type } from '../../shared/interface/type';
import { EntryService } from '../../services/entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent  {
  
  types:Type[]=[
    {value:true,display:'Expense'},
    {value:false,display:'Income'},
  ]
  constructor(private entryservice:EntryService,private router: Router,private toastr:ToastrService) { }

  entryForm= new FormGroup({
    description:new FormControl('',Validators.required),
    isExpense:new FormControl('',Validators.required),
    value:new FormControl('',[Validators.required,Validators.pattern('\\d+\\.?\\d*')])
  })

  onSubmit(){
    console.log(this.entryForm.value);
    this.entryservice.createEntry(this.entryForm.value).subscribe((data)=>{
      console.log('Data-', data);
      this.toastr.success('Entry Created successfully');
      this.entryForm.reset();
      this.router.navigate(['entries']);
    })
   
  }
 

}
