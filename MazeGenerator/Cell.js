function Cell(i,j)
{
    this.i = i;
    this.j = j;
    // Top Right Bottom Left
    // this.walls = [true,true,true,true];
    this.top = true;
    this.right = true;
    this.bottom = true;
    this.left = true;  

    this.visited = false;
    this.pathTravel = false;

    this.show = function()
    {
        var x = this.i*w;
        var y = this.j*w;
        var weight = 2;
        strokeWeight(weight);
        // Walls forming lines
        //line(x1,y1,x2,y2);
        if(this.visited)
        {
            noStroke();
            fill(255,0,255,150);
            rect(x,y,w,w);
        }
        if(this===current)
        {
            noStroke();
            fill(0,255,0,175);
            rect(x,y,w,w);
        }
        if(this===store)
        {
            noStroke();
            fill(0,0,0);
            rect(x,y,w,w);
        }
        if(this.pathTravel)
        {   
            noStroke();
            fill(0,0,0,175);
            rect(x,y,w,w);
        }
        stroke(255);
        // Top
        if(this.top)
        line(x  ,y  ,x+w,y  );
        // Right
        if(this.right)
        line(x+w,y  ,x+w,y+w); 
        // Bottom
        if(this.bottom)
        line(x  ,y+w,x+w,y+w);
        if(this.left)
        // Left 
        line(x  ,y  ,x  ,y+w);
    

        // noFill();
        // rect(x,y,w,w);
    }

    this.checkNeighbours = function()
    {
        var neighbour = [];
        //console.log(cells);
        
        if(isValid(this.i,this,j-1))
            var top = cells[this.i][this.j-1];
        if(isValid(this.i+1,this,j))
            var right = cells[this.i+1][this.j];
        if(isValid(this.i,this,j+1))
            var bottom = cells[this.i][this.j+1];
        if(isValid(this.i-1,this,j))
            var left = cells[this.i-1][this.j];

        if(top && !top.visited)
            neighbour.push(top);
        if(right && !right.visited)
            neighbour.push(right);
        if(bottom && !bottom.visited)
            neighbour.push(bottom);
        if(left && !left.visited)
            neighbour.push(left);

        if(neighbour.length>0)
            {
                var r = floor(random(0,neighbour.length));
                return neighbour[r];
            }
    }

    isValid = function(i,j)
    {
        if(i<0 || j<0 || i> cols-1|| j> rows-1)
            return false;

        return true;
    }

    removeWall = function(current,next)
    {
        
    // Removing walls
        // Top
        if(current.j-next.j == 1)
            {
                cells[current.i][current.j].top = false;
                cells[next.i][next.j].bottom = false;
            }
        // Right
        if(current.i-next.i == -1)
            {
                cells[current.i][current.j].right = false;
                cells[next.i][next.j].left = false;
            }
        // Bottom
        if(current.j-next.j == -1)
            {
                cells[current.i][current.j].bottom = false;
                cells[next.i][next.j].top = false;
            }
        // Left
        if(current.i-next.i == 1)
            {
                cells[current.i][current.j].left = false;
                cells[next.i][next.j].right = false;
            }
    }

    findPath = function(final)
    {
        while(current !== final)
        {
            var xi = current.i;
            var yi = current.j;

            if(!current.top && !cells[xi][yi-1].pathTravel)
                {
                    console.log("Top");
                    yi--;
                }
            if(!current.right && !cells[xi+1][yi].pathTravel)
                {
                    console.log("Right");
                    xi++;
                }
            if(!current.bottom && !cells[xi][yi+1].pathTravel)
                {
                    console.log("Bottom");
                    yi++;
                }
            if(!current.left && !cells[xi-1][yi].pathTravel)
                {
                    console.log("Left");
                    xi--;
                }
            current = cells[xi][yi];
            current.pathTravel = true;
            console.log(current);
        }
      
    }

}
