const {select, input, checkbox} = require('@inquirer/prompts')

let meta = {
    value: "Treinar todo dia",
    checked: false,
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a Meta:"})

    if(meta.length == 0){
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push(
        {value: meta,
        checked: false}
    )

}



const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para selecionar as metas o espaço para marcar ou desmarcar, o enter para finalizar essa etapa.",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }

    

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })
    console.log("Meta(s) concluida(s)")

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log("Não existem metas realizadas.")
        return
    }

    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })
} 


async function start  () {

    while(true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "sair":
                console.log("Até a Proximá!!")
                return;
        }
    }
}

start() 
 
