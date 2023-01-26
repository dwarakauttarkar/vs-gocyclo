
export function getMaintainabilityRemark(complexity : number):string{
    if(complexity >= 80){
        return "⭐⭐⭐⭐⭐"
    }
    if(complexity >= 60 ){
        return "⭐⭐⭐⭐";
    }
    if(complexity >= 50 ){
        return "⭐⭐⭐";
    }
    if(complexity >= 20 ){
        return "⭐⭐";
    }
    if(complexity >= 1){
        return "⭐";
    }
    return "🚫";
}