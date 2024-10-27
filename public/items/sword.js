export function stats(){
    const stats ={
        attack:10
    }
    return {
        getStats(){
            return stats
        }
    }
}

export function createSword(id,position=[40,0]){
    const sword =  [
        sprite("sword"),
        pos(position),
        area({shape:new Polygon([vec2(32,0),vec2(-32,0),vec2(-32,-128),vec2(32,-128)])}),
        anchor("bot"),
        stats(),
        {
            mirror(flip){
                this.flipX = flip;
                const [x,y] = position;
                this.pos = vec2(flip?-x:x,y);
            },
            attack(objects) {
                const rot = this.flipX?-90:90
                const tween1 =  tween(0,rot,0.2,(val)=>this.angle=val);
                objects.forEach(el=>{
                    if(this.isColliding(el))el.getDamage(this.getStats().attack)
                })
                tween1.then(()=>{
                    tween(rot,0,0.4,(val)=>this.angle=val);
                })
            }
        },
        id
    ]
    return sword;
}