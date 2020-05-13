enum flowers {
    COSMOS = 'cosmos',
    HYACINTH = 'hyacinth',
    LILY = 'lily',
    MUM = 'mum',
    PANSY = 'pansy',
    ROSE = 'rose',
    TULIP = 'tulip',
    WINDFLOWER = 'windflower'
};

enum colors {
    RED = 'red',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    GREEN = 'green',
    BLUE = 'blue',
    PURPLE = 'purple',
    PINK = 'pink',
    WHITE = 'white',
    BLACK = 'black',
    GOLD = 'gold'
}

enum cellContents {
    EMPTY = 'empty',
    FENCE = 'fence',
} 

enum cellBackground {
    GRASS,
    DIRT
}

export { flowers, colors, cellContents, cellBackground }