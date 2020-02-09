import { Component, OnInit, Input } from "@angular/core";

interface HistoryTable {
  name: string;
  count: number;
  total: number;
}

const ELEMENT_DATA: HistoryTable[] = [
  { name: "Hydrogen", count: 1.0079, total: 1000 },
  { name: "Oxygen", count: 15.9994, total: 1000 },
  { name: "Fluorine", count: 18.9984, total: 1000 },
  { name: "Neon", count: 20.1797, total: 1000 }
];

@Component({
  selector: "app-table-history",
  templateUrl: "./table-history.component.html",
  styleUrls: ["./table-history.component.scss"]
})
export class TableHistoryComponent implements OnInit {
  displayedColumns: string[] = ["name", "count", "total"];
  @Input() dataSource: HistoryTable[] = ELEMENT_DATA;
  constructor() {}

  ngOnInit() {}
}
