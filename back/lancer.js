function lancer_OneDice(){
    var dice = Math.floor(Math.random()*6)+1;
    return dice
}

function res_dices(n){
    var L = []
    for (let i=0; i < n; i++){
        L.push(lancer_OneDice())
    }
    return L 
}

function freeze(n){
    if(n%2 == 0){
        return false
    }
    else{
        return true
    }
}
function majresultat(n){
    if(freeze(n)){
        return n
    }
    else{
        return 0
    }
}


//firstTry = lancer_ManyDices(6) //premier lancer de dés
//console.log(firstTry)

module.exports = {
    res_dices : res_dices,
    freeze : freeze,
    majresultat : majresultat
}