function Tree()
{
    this.leaves = [];
    this.branches  =[];

    this.MAX = 500;

    for(var i=0;i<this.MAX;i++)
    {
        this.leaves.push(new Leaf());
    }

    var pos = createVector(width/2, height);
    var dir = createVector(0,-1);

    var root = new Branch(null,pos,dir);
    this.branches.push(root);


    var current = root;
    var found = false;
    // Checking branch position wrt to every leaf and if not found then creating branch  
    while(!found)
    {
        for(var leaf of this.leaves)
        {
            var d = p5.Vector.dist(current.pos,leaf.pos);
            if(d<max_dist)
            {
                found = true;
            }
        }
        if(!found)
        {
            var branch = current.next();
            current = branch;
            this.branches.push(current);
        }
    }


    this.grow = function()
    {
        // For every leaf look at every branch
        for(var leaf of this.leaves)
        {
            var closestBranch = null;
            var record = Infinity;
            for(var branch of this.branches)
            {
                var d = p5.Vector.dist(leaf.pos,branch.pos);
                // Leaf and Branch Distance
                if(d<min_dist)
                {
                    leaf.reached = true;
                    // Now this leaf is reached
                    closestBranch = null;
                    break;
                    // No need to check its distance from any other branch
                }
                else
                if(d>max_dist)
                {

                }
                else
                if(closestBranch == null || d < record)
                {  
                    closestBranch = branch;
                    record = d;
                }
            }
            // For any leaf
            if(closestBranch != null)
            {
                // Make new branch
                var directDir = p5.Vector.sub(leaf.pos,closestBranch.pos)
                directDir.normalize();
                closestBranch.dir.add(directDir);
                // As one branch might be pulled by many leaf
                closestBranch.count++;
            }
        }

        // Deleting leaves that were too close
        for(var i = this.leaves.length -  1; i >= 0; i--) {
            if(this.leaves[i].reached)
                this.leaves.splice(i, 1);
        }

        // Making new branch attached to branches that were attracted to any leaf or leaves
        for(var i = this.branches.length-1; i >= 0; i--)
        {
            var branch = this.branches[i];
            if(branch.count > 0)
            {
                branch.dir.div(branch.count+1);
                branch.dir.normalize();
                this.branches.push(branch.next());
                branch.reset();
            }
        }
    }

    this.show = function()
    {
        noStroke();
        fill(255);
        for(var leaf of this.leaves)
            leaf.show();
        for(var branch of this.branches)
            branch.show();
    }
}