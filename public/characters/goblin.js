import {animateState, stats} from "./character.js";
import {enemy} from "./enemy.js";

export function createGoblin(id,position) {
    const goblin = [
        sprite("goblin"),
        pos(position),
        body(),
        stats({hp:80,stamina:10,level:1}),
        area({shape:new Polygon([vec2(32,54),vec2(32,-32),vec2(-32),vec2(-32,54)]),collisionIgnore:["player"]}),
        anchor("center"),
        color(255,255,255),
        enemy(300,[1,0]),
        animateState(),
        state("move",["idle","attack","move"]),
        id
    ]
    return goblin;
}
