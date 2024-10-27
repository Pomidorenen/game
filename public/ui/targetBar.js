import {animateUiState} from "./animateUi.js";

export function createTargetBar(char,stats,sizeX,sizeY,rgb,position,onSub){
    char.add([
        rect(sizeX,sizeY),
        pos(position),
        color(255,255,255),
        outline(4,[0,0,0]),
        animateUiState()
    ])
    console.log(char.pos.angle()*-1)
    const bar =char.add([
        rect(sizeX,sizeY),
        pos(position),
        color(...rgb),
        {
            widthMax:sizeX,
            max:()=>stats().max,
            set(value){
                const procent = (this.widthMax)* (value/this.max());
                this.width = (!Number.isNaN(procent))?procent:this.widthMax;
            },
        },
        animateUiState()
    ])
    onSub.forEach(el=>{
        if(typeof el ==="string"){
            char.on(el,()=>{
                bar.set(stats().value);
            })
        }else {
            char.on(el[0],()=>{
                bar.set(stats.value);
                el[1]();
            })
        }
    })
    return bar;
}