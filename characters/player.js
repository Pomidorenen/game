import {animateState, stats} from "./character.js";
import {createBar} from "../ui/bar.js";

export function createPlayer(id,position){
    return [
        pos(position),
        sprite("player"),
        stats({hp:200,stamina:12,level:1}),
        {
            typeCharacter:"player"
        },
        area({shape:new Polygon([vec2(32,54),vec2(32,-32),vec2(-32),vec2(-32,54)])}),
        body(),
        color(255,255,255),
        anchor("center"),
        animateState(),
        id,
    ];
}
export function initialPlayer(player){

    player.on("onDamage",()=>{
        player.anims().getDamage();
    })
    player.on("onDeath",()=>{
        go("menu")
    })
    player.onUpdate(() => {
        camPos(player.worldPos());
    });

    player.onPhysicsResolve(() => {
        camPos(player.worldPos());
    });


    onKeyDown("left",()=>{
        player.move(-400,0)
        player.mirror(true)

    });
    onKeyDown("right",()=>{
        player.move(400,0)
        player.mirror(false)
    });
    onKeyDown("space",()=>{
        if(player.isGrounded()){
            player.jump()
        }
    });

    const healtBar = createBar(player,()=>player.getSpecs().hp,0.5,[255,0,0],[0,0],["onDamage","onHeal","onChangeStats"])
    const staminaBar = createBar(player,()=>player.getSpecs().stamina,0.3,[0,250,0],[0,24],["onChangeStamina","onChangeStats"])

}