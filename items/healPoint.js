export function createHealthPoint(position){
    const point = add([
        pos(position),
        body(),
        area(),
        scale(0.5),
        sprite("point")
    ]);

    point.onCollide("player",(player)=>{
        player.health(40)
        point.destroy()
    })
}