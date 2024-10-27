import kaplay from "kaplay";
import "kaplay/global";

import {initinialLevelScen} from "../public/scenes/game/level.js";
import {initinialMenuScene} from "../public/scenes/menu/menu.js";

kaplay({background:[150,180,255]})

setGravity(1200);
loadSprite("sword", "sprites/sword.png");
loadSprite("goblin", "sprites/goblin.png");
loadSprite("player", "sprites/player.png");
loadSprite("point", "sprites/point.png");
loadSprite("ghost","sprites/ghost.png");
loadSprite("fire","sprites/fire.png");

initinialLevelScen();
initinialMenuScene();
go("menu")