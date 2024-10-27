export function createFireball(position,angle,targets){
    const SPEED = 600;
    const fireball = add([
        pos(position),
        sprite("fire"),
        area(),
        scale(0.5),
        rotate(rad2deg(angle)-90),
        state("move"),
    ])
    targets.forEach(target=>{
        fireball.onCollide(target,(obj)=>{
            fireball.destroy();
            obj.getDamage(5);
        })
    })
    fireball.onStateUpdate("move",()=>{
        fireball.move(SPEED*Math.sin(angle),SPEED*Math.cos(angle))
    })
    fireball.onCollide("ground",()=>{
        fireball.destroy();
    })
    setTimeout(()=>{
        fireball.destroy();
    },3000)
}
export function createFireballByTarget(position,targets){
    const angle = targets[0].pos.angle(position);
    createFireball(position,angle,targets);
}
