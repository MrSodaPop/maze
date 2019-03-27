var w = 20;
var cols, rows, current;
var cells = [];
var stack = [];
var g = false;

$(document).ready(function() {
    $('html').keypress(function(key){
        if (!g) {
            return;
        }
        if (index(current.i,current.j) === rows*cols - 1) {
            return;
        }
        switch (key.key) {
            case 'w':
                move(0);
            break;
            case 'd':
                move(1);
            break;
            case 's':
                move(2);
            break;
            case 'a':
                move(3);
            break;
        }
    })
})

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

var move = function(dir) {
    if (current.walls[dir]) {
        return;
    }
    else {
        let i = current.i;
        let j = current.j;
        switch (dir) {
            case 0:
                if (current.j === 0) {
                    return;
                }
                else {
                    current = cells[index(i,j-1)];
                }
            break;
            case 1:
                if (current.i === cols-1) {
                    return;
                }
                else {
                    current = cells[index(i+1,j)];
                }
            break;
            case 2:
                if (current.j === rows-1) {
                    return;
                }
                else {
                    current = cells[index(i,j+1)];
                }
            break;
            case 3:
                if (current.i === 0) {
                    return;
                }
                else {
                    current = cells[index(i-1,j)];
                }
            break;
        }
    }
}

var draw = function() {
    if (!g) {
        background(51)
        for (let i = 0; i < cells.length; i++) {
            cells[i].show();
        }
        

        current.visited = true;
        current.highlight(255);

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
            g = true;
        }
    }
    else {
        for (let i = 0; i < cells.length; i++) {
            cells[i].show();
        }
        if (index(current.i,current.j) === rows*cols - 1) {
            current.highlight(0);
        }
        else {
            current.highlight(255);
        }
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