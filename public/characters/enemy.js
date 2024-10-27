export function enemy(speed,[x,y]){
    return {
        typeCharacter:"enemy",
        speed,
        follow(obj){
            const dir = this.getDirection(obj).unit();
            this.mirror(dir.x>0?true:false,dir.x>0?false:true);
            this.move(vec2(dir.scale(this.speed).x,0));
        },
        getDirection(obj){
            return obj.pos.sub(this.pos);
        },
        MoveByDirection(obj){
            const dir = (this.getDirection(obj).unit().scale(this.speed))
            this.move(dir.x*x,dir.y*y)
        }
    }
}