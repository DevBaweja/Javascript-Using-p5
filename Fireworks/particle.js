function Particle(x,y,firework,hu)
{
    this.pos = createVector(x,y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    // this.vel = firework ? createVector(0,random(-5,-8)) : p5.Vector.random2D();
    if(this.firework)
        this.vel = createVector(random(-3,3),random(-6,-8));
    else
    {
        this.vel = p5.Vector.random2D();
        /*
        Display letters,shapes
        Fade out of particles   
        */
        this.vel.mult(random(2,10));
    }
    this.acc = createVector(0,0);

    this.applyForce = function(force)
    {
        this.acc.add(force);
    }

    this.update = function()
    {
        if(!this.firework)
        {
            this.vel.mult(0.9);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function()
    {
        colorMode(HSB);
        if(!this.firework)
        {
            strokeWeight(2);
            stroke(this.hu,255,this.lifespan);
        }
        else
        {
            strokeWeight(4);
            stroke(this.hu,255,255);
        }
        point(this.pos.x,this.pos.y);
    }

    this.done = function()
    {
        if(this.lifespan < 0)
            return true;
            else
            return false;
    }
}