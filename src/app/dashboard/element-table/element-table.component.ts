import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ElementService } from '../element.service';
import { ElementDialogComponent } from '../element-dialog/element-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-element-table',
  templateUrl: './element-table.component.html',
  styleUrls: ['./element-table.component.scss']
})
export class ElementTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['position', 'activity', 'item', 'price', 'quantity', 'actions'];
  dataSource!:any;
  elementList!:any;
  symbolSearchValue!: string;
  constructor(public dialog: MatDialog, private elementService:ElementService,private router:Router) {}
  totalValue!:number;
  private value!:any;

  ngOnInit(): void {
    this.elementList = this.elementService.getElementList()
    this.dataSource = new MatTableDataSource(this.elementList);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.elementList.push(result.value);
        this.dataSource.data = this.elementList;
      }
    });
  }

  total(){
 this.value=this.dataSource.data
 this.totalValue=0;
 console.log(this.totalValue);
 for(let j=0;j<this.dataSource.data.length;j++){   
 this.totalValue+=parseFloat( this.value[j].price)*parseFloat(this.value[j].quantity)
  }
}


  onDelete(row:any){
    console.log('Delete', row);
    const index = this.elementList.indexOf(row);
    if (index > -1) {
      this.elementList.splice(index, 1);
      this.dataSource.data = this.elementList;
    }
  }

  onEdit(row:any){
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const elementIndex = this.elementList.findIndex((element:any) => element.position == result.value.position);
        this.elementList[elementIndex].activity = result.value.activity;
        this.elementList[elementIndex].item = result.value.item;
        this.elementList[elementIndex].price = result.value.price;
        this.elementList[elementIndex].quantity= result.value.quantity;
      }
    });
  }
  

 searchBySymbol() {
    console.log(this.symbolSearchValue);
    this.dataSource.data = this.elementList.filter((e:any) => this.splitActivity(e.activity)== this.symbolSearchValue);
  }

  clearSymbolSearch() {
    this.symbolSearchValue = "";
    this.dataSource = new MatTableDataSource(this.elementList);
  }

  logout() {
    //todo
    this.router.navigateByUrl('');
  }

  splitActivity (str: any) {
    return str.split('/').pop().replace(/\..+$/, '');
}

}
