function Firework()
{
    this.hu = random(255);
    this.firework = new Particle(random(width),random(height-height/4,height),true,this.hu);
    this.exploded = false;

    this.particles = [];

    this.update = function()
    {
        if(!this.exploded)
        {
            this.firework.applyForce(gravity);
            this.firework.update();

            if(this.firework.vel.y >= 0) // 
            {
                this.exploded = true;
                this.explode();
            }
        }

        for(var i = this.particles.length-1;i>=0;i--)
           {
                var particle = this.particles[i];
                particle.applyForce(gravity);
                particle.update();
                if(particle.done())
                        this.particles.splice(i,1);           
           } 

        
    }

    this.explode = function()
    {
        var n = 100;
        for(var i=0;i<n;i++)
        {
            var p = new Particle(this.firework.pos.x,this.firework.pos.y,false,this.hu);
            this.particles.push(p);
        }
    }

    this.show = function()
    {
        if(!this.exploded)
            this.firework.show();

        for(var particle of this.particles)
            particle.show();
    }

    this.done = function()
    {
        if(this.exploded && this.particles.length == 0)
        return true;
        else
        return false;
    }
}