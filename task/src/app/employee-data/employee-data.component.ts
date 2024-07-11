import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-data d.model';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css'
})
export class EmployeeDataComponent implements OnInit{
  employeeForm !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) {}

  ngOnInit(): void {
    this.employeeForm = this.formbuilder.group({
      name: [''],
      salary: [''],
      age: ['']
   })
   this.getAllEmployee();
 }
 clickAddEmploye(){
  this.employeeForm.reset();
  this.showAdd = true;
  this.showUpdate = false;
 }
 postEmployeeDetails(){
  this.employeeModelObj.name = this.employeeForm.value.name;
  this.employeeModelObj.salary = this.employeeForm.value.salary;
  this.employeeModelObj.age = this.employeeForm.value.age;

  this.api.postEmploye(this.employeeModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("Employee added successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.employeeForm.reset();
    this.getAllEmployee();
  },
  err=>{
    alert("Something went wrong");
  })
 }
 getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData = res;
  })
 }
 deleteEmployee(row : any){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("Employee deleted successfully");
    this.getAllEmployee();
  })
 }
 onEdit(row: any){
  this.showAdd = false;
  this.showUpdate = true;
  this.employeeModelObj.id = row.id;
  this.employeeForm.controls['name'].setValue(row.name);
  this.employeeForm.controls['salary'].setValue(row.salary);
  this.employeeForm.controls['age'].setValue(row.age);
 }
 updateEmployeeDetails(){
  this.employeeModelObj.name = this.employeeForm.value.name;
  this.employeeModelObj.salary = this.employeeForm.value.salary;
  this.employeeModelObj.age = this.employeeForm.value.age;

  this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
  .subscribe(res=>{
    alert("Employee updated successfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.employeeForm.reset();
    this.getAllEmployee();
  })
 }

}