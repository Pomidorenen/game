
export function inventory(){
    const inventoryItems = {
        items:[]
    }
    return{
        id:"inventory",
        getItems(index){

        },
        drop(item){

        },
        take(item){

        }
    }
}
export function animateState(){
    const getDamage = function (){
        tween(1,0.5,1,(value)=>{
            this.color = Object.assign(this.color,{
                r:255*value,
                g:0,
                b:0
            })
        }).then(()=>{
            this.color = Object.assign(this.color,{
                r:255,
                g:255,
                b:255
            })
        })
    }
    return{
        require:["color"],
        anims(){
            return{
                getDamage:()=>getDamage.call(this),
            }
        },
        mirror(flip,child = flip){
            this.flipX = flip;
            this.children.forEach(el=>el.mirror(child))
        }
    }
}

export function stats({hp= 100,stamina= 10,level=1,...props}){
    const countStatByLevel = (stats,level)=>{
        if(level!==1){
            level-=1;
            level/=4;
            level+=1;
        }
        return stats * level;
    }
    const createNewSpecs= ({level,...specs})=>{
        return Object.entries(specs).reduce((acc,[keys,value])=>{
                const obj = {};
                obj[keys]={
                    value:countStatByLevel(value,level),
                    max:countStatByLevel(value,level),
                    addValue(value){
                       this.value += (this.value+value<=this.max?value:0);
                    },
                    subValue(value){
                        this.value = (this.value-value>=0?this.value-value:0);
                    }
                }
                return{...acc,...obj};
            },{})
    }
    const stats = {level,specs:createNewSpecs(arguments[0])};
    const updateStats = (level)=>{
        stats.specs = createNewSpecs(Object.assign(arguments[0],{level}));
    }
    return{
        id:"stats",
        getSpecs(){
            return stats.specs
        },
        getDamage(damage){
            this.getSpecs().hp.subValue(damage);
            this.trigger("onDamage");
            if(this.getSpecs().hp.value<=0){
                this.trigger("onDeath");
                destroy(this)
            }
        },
        takeStamina(value){
            this.getSpecs().stamina.subValue(value);
            this.trigger("onChangeStamina");
        },
        chargeStamina(value){
            this.getSpecs().stamina.addValue(value);
            this.trigger("onChangeStamina");
        },
        levelUp(value){
            stats.level+=value;
            updateStats(stats.level);
            this.trigger("onChangeStats");
        },
        health(hp){
            this.getSpecs().hp.addValue(hp)
            this.trigger("onHeal");
        }
    }
}