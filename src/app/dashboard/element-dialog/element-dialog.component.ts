import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss'],
})
export class ElementDialogComponent implements OnInit {
  newItem!: FormGroup;
  elementsBox!:any;
  isOnEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {}

  activityOptions: { value: string, label: string }[] =
   [  { value: 'assets/clothes.png', label: 'clothes' }
   ,  { value: 'assets/food.png', label: 'food' }
   ,  { value: 'assets/house utility.png', label: 'house utility'}
   ,  { value: 'assets/transport.png', label: 'transport'}
   ,  { value: 'assets/travel.png', label: 'travel'}
  ];  
  
  ngOnInit(): void {
    this.isOnEdit = this.data ? true : false;
   
    this.newItem = this.fb.group({
      position: [this.data?.position, Validators.required],

      activity: [this.data?.activityOptions, Validators.required],

      item: [ this.data?.item],

      price: [this.data?.price,
        {
          validators: Validators.pattern("^([0-9]*((.)[0-9]{0,2}))$"),
          updateOn: 'blur',
        },
      ],

      quantity: [this.data?.quantity,
        {
          validators: Validators.pattern("^[0-9]*$"),
          updateOn: 'blur',
        },
      ],
    });
  }

  onAdd() {}

  onCancel(): void {
    this.dialogRef.close();
  }

  get activity() {
   return this.newItem.get('activity');
 }

  get item() {
    return this.newItem.get('item');
  }

  get price() {
    return this.newItem.get('price');
  }

  get quantity() {
    return this.newItem.get('quantity');
  }
}
