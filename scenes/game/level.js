import {createPlayer, initialPlayer} from "../../../public/characters/player.js";
import {createGoblin} from "../../../public/characters/goblin.js";
import {createSword} from "../../../public/items/sword.js";
import {createHealthPoint} from "../../../public/items/healPoint.js";
import {createTargetBar} from "../../../public/ui/targetBar.js";
import {createFireball} from "../../../public/items/fireball.js";
export function initinialLevelScen(){
    scene("level",()=>{

        const generatelevel1 =[
            "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
            "100000000000000000000000000000000000000040000000000000000000000000000000000000004444440000000000000001",
            "1000000000111000000000000000000000000000100010100100100110000000000000440000000044444400000000000000001",
            "1002000111111111000040000004000004000111110000000000000111000040040004440000000044444400000000000000001",
        ]

        const level =addLevel(generatelevel1,
            {
                tileWidth: 128,
                tileHeight: 128,
                pos: vec2(100, 200),
                tiles: {
                    "2":(pos)=>createPlayer("player",pos),
                    "4":(pos)=>createGoblin("goblin",pos),
                    "1": () =>[
                        rect(128,128),
                        color(20,20,50),
                        outline(4),
                        body({isStatic:true}),
                        area(),
                        "ground"
                    ],
                },
            });
        add(
            [
                pos(vec2(100,200+(128*4))),
                rect(106*128,256),
                color(20,20,50),
                outline(4),
                body({isStatic:true}),
                area(),
                "ground"
            ]
        )
        const counter = {
            goblinsKill:0
        }
        const player = level.get("player")[0];
        player.add(createSword("sword",[40,10]));
        setInterval(()=>{
            player.chargeStamina(1)
        },1000)
        const goblins = level.get("goblin");
        onCollide("ground","goblin",(ground,goblin,col)=>{
            if(goblin.isGrounded()&&(col.isRight()||col.isLeft())){
                goblin.jump();
            }
        })
        goblins.forEach((goblin)=>{
            goblin.add(createSword("swordEnemy",[40,10]));
            goblin.onStateUpdate("move",async ()=>{
                const dir = goblin.getDirection(player);
                if(Math.abs(dir.x)<400){
                    goblin.follow(player)
                }else{
                    goblin.MoveByDirection(player);
                    await wait(2,()=>{
                        goblin.enterState("idle")
                    })
                }
                if(Math.abs(dir.x)<100){
                    goblin.enterState("attack")
                }
            })
            goblin.onStateEnter("attack",async ()=>{
                const sword = goblin.children[0];
                sword.attack([player]);
                goblin.MoveByDirection(player);
                await wait(0.6,()=>goblin.enterState("idle"))
            })
            goblin.onStateUpdate("idle",async ()=>{
                const dir =goblin.getDirection(player);
                if(Math.abs(dir.x)<400){
                    goblin.enterState("move")
                }
            })
            const goblinAnims = goblin.anims();
            goblin.on("onDamage",()=>{
                const dir = player.pos.sub(goblin.pos).unit();
                dir.x *=-1;
                goblinAnims.getDamage()
                tween(0,5,1,(val)=>{
                    goblin.move(dir.scale(200).x,0);
                    if(goblin.isGrounded())goblin.jump()
                })
            })
            goblin.on("onDeath",()=>{
                counter.goblinsKill++
                if(counter.goblinsKill>5){
                    player.levelUp(1);
                    counter.goblinsKill = 0;
                    createHealthPoint(goblin.pos)
                }
                createHealthPoint(goblin.pos)
            })
            const goblinHealth = createTargetBar(goblin,()=>goblin.getSpecs().hp,128,12,[255,0,0],[-64,-128],["onDamage","onHeal","onChangeStats"])
        })


        initialPlayer(player)
        const sword = player.get("sword")[0];
        onKeyPress("z",()=>{
            const {stamina} = player.getSpecs();
            if(stamina.value>0)sword.attack(goblins);
            player.takeStamina(1);
        });
        onKeyPress("x",()=>{
            const {stamina} = player.getSpecs();
            const dir = deg2rad(((player.flipX)*180)+90)
            const position = player.worldPos();
            position.y-=64;
            if(stamina.value>0)createFireball(position,dir,["goblin"]);
            player.takeStamina(1);
        });

    })

}
