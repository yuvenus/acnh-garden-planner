import { TestBed } from '@angular/core/testing';
import * as enums from '../../enums';

import { CellOptionsService } from './cell-options.service';

describe('CellOptionsService', () => {
  let service: CellOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellOptionsService);
  });

  it('#getCellOptionChanges should return initialized object', (done: DoneFn) => {
    service.getCellOptionsChanges().subscribe(value => {
      const cellObj = {
        selectedCellOption: enums.cellContents.EMPTY,
        selectedColorOption: enums.colors.RED,
        clearGridConfirmation: false,
        gridSize: 10,
        importConfig: {import: false, file: null},
        exportConfig: false
      };

      expect(value).toEqual(cellObj);
      done();
    });
  });

  it('#setCellOptionsChanges should set based on key', (done: DoneFn) => {
    service.setCellOptionsChanges('selectedCellOption', enums.flowers.LILY);
    service.setCellOptionsChanges('selectedColorOption', enums.colors.ORANGE);
    service.setCellOptionsChanges('clearGridConfirmation', true);

    service.getCellOptionsChanges().subscribe(value => {
      expect(value.selectedCellOption).toBe(enums.flowers.LILY);
      expect(value.selectedColorOption).toBe(enums.colors.ORANGE);
      expect(value.clearGridConfirmation).toBe(true);
      done();
    })
  })
});
