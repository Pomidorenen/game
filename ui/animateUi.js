export function animateUiState(){
    return{
        require:["color"],
        anims(){
        },
        mirror(flip,child = flip){
            this.flipX = flip;
            this.children.forEach(el=>el.mirror(child))
        }
    }
}