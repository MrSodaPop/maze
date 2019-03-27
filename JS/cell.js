var cell = function(i, j) {
    this.i = i;
    this.j = j;

    this.visited = false;

    let x = i*w;
    let y = j*w
    this.walls = [true,true,true,true]; //if wall top right bottom left

    this.show = function() {
        stroke(255);
        if (this.walls[0]) {
            line(x,y,x+w,y);
        }
        if (this.walls[1]) {
            line(x+w,y,x+w,y+w);
        }
        if (this.walls[2]) {
            line(x,y+w,x+w,y+w);
        }
        if (this.walls[3]) {
            line(x,y,x,y+w);
        }
    }

    this.highlight = function() {
        noStroke();
        fill(255,0,255,100);
        rect(i*w,j*w,w,w);
    }

    this.checkNeighbors = function() {
        var neighbors = [];

        var top    = cells[index(this.i, this.j -1)];
        var right  = cells[index(this.i+1, this.j)];
        var bottom = cells[index(this.i, this.j+1)];
        var left   = cells[index(this.i-1, this.j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
        }
}