var w = 20;
var cols, rows, cells, current, stack;
var setup = function() {
    createCanvas(600,600);
    frameRate(5);
    cells = [];
    stack = [];
    rows = floor(height/w);
    cols = floor(width/w);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            cells.push(new cell(i,j));
        }
    }
    current = cells[0];
    current.visited = true;
}
var draw = function() {
    background(51)
    for (let i = 0; i < cells.length; i++) {
        cells[i].show();
    }

}