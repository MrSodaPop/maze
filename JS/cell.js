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
}