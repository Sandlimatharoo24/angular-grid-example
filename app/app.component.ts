import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "my-app",
  template: `
    <div class="test-container">
      <div class="test-header">Selection: <span id="selectedRows"></span></div>
      <ag-grid-angular
        #agGrid
        style="width: 100%; height: 100%;"
        id="myGrid"
        class="ag-theme-balham"
        [columnDefs]="columnDefs"
        [rowSelection]="rowSelection"
        (rowSelected)="onRowSelected($event)"
        [rowData]="rowData"
        (selectionChanged)="onSelectionChanged($event)"
        (gridReady)="onGridReady($event)"
        (cellValueChanged)="onCellValueChanged($event)"
      ></ag-grid-angular>
    </div>
  `
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private rowSelection;
  private rowData: [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "Athlete",
        field: "athlete",
        width: 150,
        editable: true
      },
      {
        headerName: "Age",
        field: "age",
        width: 90,
        editable: true
      },
      {
        headerName: "Country",
        field: "country",
        width: 120,
        editable: true
      },
      {
        headerName: "Year",
        field: "year",
        width: 90,
        editable: true
      },
      {
        headerName: "Date",
        field: "date",
        width: 110,
        editable: true
      },
      {
        headerName: "Sport",
        field: "sport",
        width: 110,
        editable: true
      },
      {
        headerName: "Gold",
        field: "gold",
        width: 100,
        editable: true
      },
      {
        headerName: "Silver",
        field: "silver",
        width: 100,
        editable: true
      },
      {
        headerName: "Bronze",
        field: "bronze",
        width: 100,
        editable: true
      },
      {
        headerName: "Total",
        field: "total",
        width: 100,
        editable: true
      }
    ];
    this.rowSelection = "single";
  }

  onRowSelected(event) {
    window.alert("row " + event.node.data.athlete + " selected = " + event.node.selected);
  }
  
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe(data => {
        this.rowData = data;
      });
  }
}
