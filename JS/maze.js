var w = 15;
var cols, rows, current;
var cells = [];
var stack = [];

var setup = function() {
    createCanvas(600,600);
    frameRate(100);
    cells = [];
    stack = [];
    rows = floor(height/w);
    cols = floor(width/w);
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            cells.push(new cell(i,j));
        }
    }
    current = cells[0];
    cells[0].walls[3] = false;
    cells[cells.length-1].walls[1] = false;
}

var draw = function() {
    background(51)
    for (let i = 0; i < cells.length; i++) {
        cells[i].show();
    }
    

    current.visited = true;
    current.highlight();

    var next = current.checkNeighbors();

    // check if current cell has unvisited neighbours.
    if (next) {
        next.visited = true; 
        // push current cell to stack
        stack.push(current);
        // remove the walls between current and next
        removeWalls(current,next);
        // make the next cell the current cell
        current = next;
    }
    else if (stack.length > 0) {
        current = stack.pop();
    }
    else {
        noLoop();
    }
}

var index = function(i, j) {
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
        return -1;
    }
    return (i + j*cols);
}

var removeWalls = function(c,n) {
    if (c.j === n.j - 1) {
        cells[index(c.i,c.j)].walls[2] = false;
        cells[index(n.i,n.j)].walls[0] = false;
    }
    if (c.j === n.j + 1) {
        cells[index(c.i,c.j)].walls[0] = false;
        cells[index(n.i,n.j)].walls[2] = false;
    }
    if (c.i === n.i + 1) {
        cells[index(c.i,c.j)].walls[3] = false;
        cells[index(n.i,n.j)].walls[1] = false;
    }
    if (c.i === n.i - 1) {
        cells[index(c.i,c.j)].walls[1] = false;
        cells[index(n.i,n.j)].walls[3] = false;
    }
}