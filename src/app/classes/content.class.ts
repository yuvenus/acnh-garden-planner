import * as enums from '../../enums';

export class contentClass {
    cellOption: enums.cellContents | enums.flowers = enums.cellContents.EMPTY;
    color: enums.colors = enums.colors.RED;

    equals(compareTo: contentClass) {
        return this.cellOption == compareTo.cellOption && this.color == compareTo.color;
    }
}