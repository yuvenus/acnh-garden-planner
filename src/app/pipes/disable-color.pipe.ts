import { Pipe, PipeTransform } from '@angular/core';
import * as enums from '../../enums';

@Pipe({ name: 'disableColor' })
export class DisableColorPipe implements PipeTransform {

    flowerEnum = enums.flowers;
    colorEnum = enums.colors;

    validColors = {
        [this.flowerEnum.COSMOS]: [
            this.colorEnum.RED,
            this.colorEnum.ORANGE,
            this.colorEnum.YELLOW,
            this.colorEnum.PINK,
            this.colorEnum.WHITE,
            this.colorEnum.BLACK
        ],
        [this.flowerEnum.HYACINTH]: [
            this.colorEnum.RED,
            this.colorEnum.ORANGE,
            this.colorEnum.YELLOW,
            this.colorEnum.BLUE,
            this.colorEnum.PURPLE,
            this.colorEnum.PINK,
            this.colorEnum.WHITE
        ],
        [this.flowerEnum.LILY]: [
            this.colorEnum.RED,
            this.colorEnum.ORANGE,
            this.colorEnum.YELLOW,
            this.colorEnum.PINK,
            this.colorEnum.WHITE,
            this.colorEnum.BLACK
        ],
        [this.flowerEnum.MUM]: [
            this.colorEnum.RED,
            this.colorEnum.YELLOW,
            this.colorEnum.GREEN,
            this.colorEnum.PINK,
            this.colorEnum.PURPLE,
            this.colorEnum.WHITE,
        ],
        [this.flowerEnum.PANSY]: [
            this.colorEnum.RED,
            this.colorEnum.ORANGE,
            this.colorEnum.YELLOW,
            this.colorEnum.BLUE,
            this.colorEnum.PURPLE,
            this.colorEnum.WHITE,
        ]
    }

    transform(selectedCellOption, selectedColorOption) {

    }
}