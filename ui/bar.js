

export function createBar(char,stats,size,rgb,position,onSub){
    add([
        rect(width()*size,24),
        pos(position),
        outline(4,[0,0,0]),
        fixed(),
    ])
    const bar = add([
        rect(width()*size,24),
        pos(position),
        color(...rgb),
        fixed(),
        {
            widthMax:width()*size,
            max:()=>stats().max,
            set(value){
                const procent = (this.widthMax)* (value/this.max());
                this.width = (!Number.isNaN(procent))?procent:this.widthMax;
            }
        }
    ])
    onSub.forEach(el=>{
        if(typeof el ==="string"){
            char.on(el,()=>{
                bar.set(stats().value);
            })
        }else {
            char.on(el[0],()=>{
                bar.set(stats.value);
                console.log(bar.max);
                el[1]();
            })
        }
    })
    return bar;
}