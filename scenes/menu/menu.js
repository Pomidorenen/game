export function initinialMenuScene(){
    scene("menu",()=>{
        onUpdate(()=>setCursor("default"))
        const start = add([
            rect(240,80,{radius:8}),
            anchor("center"),
            outline(4),
            area(),
            scale(1),
            pos(width()/2,(height()*2)/3),
        ])
        const guid =  add([
            rect(400,400,{radius:8}),
            anchor("center"),
            outline(4),
            area(),
            scale(1),
            pos(width()/2,(height())/3.5),
        ])
        const guidText ="z-атака мечом\nx-атака огнем\nпробел-прыжок\nстрелки-ходить"
        guid.add([
            text(guidText),
            anchor("center"),
            color(0,0,0)
        ])
        start.add([
            text("start"),
            anchor("center"),
            color(0,0,0)
        ])
        start.onHover(()=>{
            start.scale =vec2(1.2);
        })
        start.onHoverEnd(()=>{
            start.scale =vec2(1);
        })
        start.onClick(()=>{
            go("level")
        })
    })
}