//UUID -> universally unique indentifier

// function enviarEmail(para, id, assunto, texto) {
//     // biblioteca de envio
//     console.log(para, id, assunto, texto);
// }

// class EnviarEmailParausuario {
//     send() {
//         enviarEmail('gabriel@gmail.com', 99, 'Ola TypeScript', 'Tudo bem?');
//     }
// }

// Utilizando TypeScript
interface DadosDeEnvioDeEmail {
    para: string,
    id: string,
    assunto: string,
    texto: string
}

function enviarEmail({ para, id, assunto, texto }: DadosDeEnvioDeEmail) {
    console.log(para, id, assunto, texto);
}

class EnviarEmailParausuario {
    send() {
        enviarEmail({
            para: 'gabriel@gmail.com',
            id: '99',
            assunto: 'Ola TypeScript',
            texto: 'Tudo bem?'
        })
    }
}
