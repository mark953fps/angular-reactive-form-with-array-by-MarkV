import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public searchForm: FormGroup;
  public items: FormArray = new FormArray([]);
  public dataFromApi: any = {
    fname: 'Mark',
    lname: 'Villegas',
    items: [
      {
        id: 1,
        itemName: 'item 1',
        itemDescription: 'dummy text',
        itemPrice: 100
      },
      {
        id: 2,
        itemName: 'item 2',
        itemDescription: 'dummy text',
        itemPrice: 200
      },
      {
        id: 3,
        itemName: 'item 3',
        itemDescription: 'dummy text',
        itemPrice: 300
      }
    ]
  };

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.searchForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      items: this.fb.array([])
    });

    this.loadData();
  }

  public createForm(data: any): FormGroup {
    return this.fb.group({
      itemName: [data.itemName, Validators.required],
      itemDescription: [data.itemDescription, Validators.required],
      itemPrice: [data.itemPrice, Validators.required]
    });
  }

  public loadData(): void {
    if (this.dataFromApi) {
      this.searchForm.controls.fname.setValue(this.dataFromApi.fname);
      this.searchForm.controls.lname.setValue(this.dataFromApi.fname);

      if (this.dataFromApi.items.length) {
        this.dataFromApi.items.forEach(data => this.addItem(data));
      }
    }
  }

  public addItem(data): void {
    this.items = this.searchForm.get('items') as FormArray;
    this.items.push(this.createForm(data));
  }

  public submit(): void {
    console.log(this.searchForm.value, 'submit data');
  }
}
