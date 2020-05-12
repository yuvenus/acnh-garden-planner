import { Component, OnInit } from '@angular/core';
import { flowers, colors } from '../../enums';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {

  gridSize = 20;
  grid = [];

  constructor() { }

  ngOnInit(): void {
    this.grid = new Array(this.gridSize).fill(0).map(() => new Array(this.gridSize).fill(0));

    console.log(this.grid);
  }

}
