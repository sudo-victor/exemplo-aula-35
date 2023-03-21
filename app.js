const timestamp = (new Date()).getTime()
const publicKey = 'd0d76a60dcc1d76a2227bc2debaca41c'
const privateKey = '92eab95f3d5ee3fc201dbf74e7d984192599f316'
const hash = timestamp + privateKey + publicKey
const hashMd5 = MD5.generate(hash)
const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hashMd5}`

const listaPersonagens = document.querySelector('#lista-personagens')

buscarPersonagens = async () => {
  try {
    const resposta = await fetch(url)
    const personagens = await resposta.json()
    personagens.data.results.forEach((personagem) => {
      const html = `
        <div>
          <img class="imagem" src="${personagem.thumbnail.path}.${personagem.thumbnail.extension}" />
        </div>
      `
      listaPersonagens.innerHTML += html
    })
  } catch(error) {
    console.log(error)
  }
}

buscarPersonagens()
