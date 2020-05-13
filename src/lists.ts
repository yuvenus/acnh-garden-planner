import * as enums from './enums';

const cellOptions = Object.keys(enums.cellContents)
    .map(content => ({label: enums.cellContents[content], value: enums.cellContents[content]}))
    .concat(Object.keys(enums.flowers)
        .map(flower => ({label: enums.flowers[flower], value: enums.flowers[flower]})));

    
const colorOptions = Object.keys(enums.colors)
    .map(color => ({label: enums.colors[color], value: enums.colors[color]}));


export { cellOptions, colorOptions }