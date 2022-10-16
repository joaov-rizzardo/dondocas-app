export function getFormatedDateTime(date) {

    try {
        const year = date.getFullYear()

        const month = (date.getMonth() + 1).toString().padStart(2, '0')

        const day = date.getDate().toString().padStart(2, '0')


        // AS HORAS SÃO BUSCADAS DO MOMENTO EM QUE A FUNÇÃO FOR EXECUTADA
        const now = new Date()

        const hour = now.getHours().toString().padStart(2, '0')

        const minute = now.getMinutes().toString().padStart(2, '0')

        const second = now.getSeconds().toString().padStart(2, '0')

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`

    }catch(error){
        console.log(error)

        return null
    }

}