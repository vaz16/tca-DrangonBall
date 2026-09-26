const prompt = require('prompt-sync')()
class Jogador {
    perdeu() {
        if (this.personagem2) {
            return this.personagem1.vida + this.personagem2.vida < 0
        }
        return this.personagem1.vida < 0
    }
    constructor(personagem1, personagem2) {
        this.personagem1 = personagem1
        this.personagem2 = personagem2
    }
}
class Personagem {
    sofredano(dano){
        this.vida-=dano
    }
    listadefesas() {
        for (let i = 0; i < this.defesas.length; i++) {
            console.log(this.defesas[i])
        }
    }
    listaataques() {
        for (let i = 0; i < this.ataques.length; i++) {
            console.log(this.ataques[i])
        }
    }
    ataque(defesa, ataque) {
        if(defesa==null){
            console.log("não foi possivel fazer o ataque pois a defesa não foi encontrada")
            return 0 
        }
        if (ataque>this.ataques.length-1) {
            console.log("ataque não encontrado")
            return 0
        }
        
        if (this.ataques[ataque].tipo == "soco") {
            return this.ataques[ataque].dano - defesa.soco
        }
        if (this.ataques[ataque].tipo == "chute") {
            return this.ataques[ataque].dano - defesa.chute
        }
        if (this.ataques[ataque].tipo == "especial") {
            return this.ataques[ataque].dano - defesa.especial
        }

    }
    defesa(defesa){
        if (defesa>this.defesas.length-1) {
            console.log("defesa não encontrado")
            return null
        }
        return this.defesas[defesa]
    }
    constructor(nome, ataques, defesas, vida) {
        this.nome = nome
        this.ataques = ataques
        this.defesas = defesas
        this.vida = vida
    }
}
class Ataque {
    constructor(nome, dano, tipo) {
        this.nome = nome
        this.dano = dano
        this.tipo = tipo
    }
}
class Defesa {
    constructor(nome, soco, chute, especial) {
        this.nome = nome
        this.soco = soco
        this.chute = chute
        this.especial = especial
    }
}
Goku = new Personagem(
    "Goku",
    [new Ataque("punho do dragão", 5, "soco"), new Ataque("chute voador", 10, "chute"), new Ataque("kamehameha", 15, "especial")],
    [new Defesa("Zanzoken", 4, 6, 2), new Defesa("Barreira de ki", 2, 4, 6)],
    50

)
Gohan = new Personagem(
    "Gohan",
    [new Ataque("Gekiretsu punch", 5, "soco"), new Ataque("chute metralhadora", 15, "chute"), new Ataque("Masenko", 10, "especial")],
    [new Defesa("Masenko", 4, 6, 2), new Defesa("rajada de ki", 4, 2, 6)],
    50
)
Moro = new Personagem(
    "Moro",
    [new Ataque("soco respiratorio", 10, "soco"), new Ataque("chuva de meteóros", 15, "chute"), new Ataque("absorção de energia", 5, "especial")],
    [new Defesa("barreira mágica", 4, 6, 2), new Defesa("absorção de energia", 2, 4, 6)],
    50
)
Freeza = new Personagem(
    "Freeza",
    [new Ataque("Kousoku Renda", 5, "soco"), new Ataque("golpe mortal", 15, "chute"), new Ataque("raio da morte", 10, "especial")],
    [new Defesa("barreira de ki", 6, 2, 4), new Defesa("movimento ultra rapido", 2, 4, 6)],
    50
)

personagens = [Goku, Gohan, Moro, Freeza]
console.log("escolha o modo de batalha")
console.log("1-1v1 ou 2-2v2")
mododebatalha = parseInt(prompt(""))
console.log("player 1 - escolha o Personagem")

for (let i = 0; i < personagens.length; i++) {
    console.log(personagens[i].nome)

}
personagem2 = null
personagem1 = parseInt(prompt(""))
if (mododebatalha == 2) {
    console.log("player1 - escolha mais um personagem")
    personagem2 = parseInt(prompt(""))
}
console.log("player 2 - escolha o Personagem")

for (let i = 0; i < personagens.length; i++) {
    console.log(personagens[i].nome)

}
personagem4 = null
personagem3 = parseInt(prompt(""))
if (mododebatalha == 2) {
    console.log("player2 - escolha mais um personagem")
    personagem4 = parseInt(prompt(""))
}
player1 = new Jogador(personagens[personagem1], null)
if (personagem2) {
    player1 = new Jogador(personagens[personagem1], personagens[personagem2])

}
player2 = new Jogador(personagens[personagem3], null)
if (personagem4) {
    player2 = new Jogador(personagens[personagem3], personagens[personagem4])
}
while (!player1.perdeu() && !player2.perdeu()) {
    console.log("player1 escolha um ataque")
    player1.personagem1.listaataques()
    ataque1 = parseInt(prompt(""))
    console.log("player2 escolha uma defesa")
    player2.personagem1.listadefesas()
    defesa1 = parseInt(prompt(""))
    dano = player1.personagem1.ataque(player2.personagem1.defesa(defesa1), ataque1)
    player2.personagem1.sofredano(dano)
    console.log("o ataque do player 1, personagem 1 gerou : " + dano + " de dano ")
    console.log("player 2, personagem 1 vida restante:" + player2.personagem1.vida)

    console.log("player2 escolha um ataque")
    player2.personagem1.listaataques()
    ataque1 = parseInt(prompt(""))
    console.log("player1 escolha uma defesa")
    player1.personagem1.listadefesas()
    defesa1 = parseInt(prompt(""))
    dano = player2.personagem1.ataque(player1.personagem1.defesa(defesa1), ataque1)
    player1.personagem1.sofredano(dano)
    console.log("o ataque do player 2, personagem 1 gerou : " + dano + " de dano ")
    console.log("player 1, personagem 1 vida restante:" + player1.personagem1.vida)
    console.log("vida ao final do round")
    console.log("player 1 personagem 1: "+ player1.personagem1.vida)
    console.log("player 2 personagem 1: "+ player2.personagem1.vida)
} 

if(player1.perdeu()){
    console.log("player 2 é o vencedor")
}
else{
    console.log("playeyr 1 é o vencedor")
}


