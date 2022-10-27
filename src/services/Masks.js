export function phoneMask(value){
    value = value.replace(/\D/g,"") // Remove tudo o que não é dígito
    value = value.replace(/^(\d{2})(\d)/g,"($1) $2")//Coloca parênteses em volta dos dois primeiros 
    value = value.replace(/(\d{4,5})(\d{4})/g, "$1-$2") //Colocando hífen entre os números
    value = value.substr(0, 15) // Limitando a no máximo 15 caracteres
    return value;
}

export function moneyMask(value){
    value = value.replace(/\D/g, "")
    value = value.replace(/(\d+)(\d{2})/g, "$1,$2")
    return value
}

