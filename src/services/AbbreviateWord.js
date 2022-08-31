export default function abbreviateWord(word, limit){

    if(word.length <= limit){
        return word
    }

    const arrWord = word.split(' ')

    // RESERVANDO ESPAÇO PARA OS CARACTERES EM BRANCO
    limit = limit - (arrWord.length - 1)

    const limitPerWord = parseInt((limit/arrWord.length))

    // OBTENDO OS CARACTERES RESTANTES DA DIVISÃO
    const remnantLimit = limit % arrWord.length

    let finalWord = ''

    arrWord.forEach((separatedWord, index) => {

        let wordLimit = 0

        // SE FOR A PRIMEIRA PALAVRA, ATRIBUÍ O ESPAÇO RESERVADO AS CARACTERES RESTANTES DA DIVISÃO
        if(index === 0){
            wordLimit = limitPerWord + remnantLimit
        }else {
            wordLimit = limitPerWord
        }

        separatedWord = separatedWord.substring(0, wordLimit)

        separatedWord = separatedWord[0].toUpperCase() + separatedWord.substr(1)

        if(index !== 0){
            finalWord += ' '
        }

        finalWord += separatedWord
    })

    return finalWord

}