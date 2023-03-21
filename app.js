const timestamp = (new Date()).getTime()
const publicKey = 'd0d76a60dcc1d76a2227bc2debaca41c'
const privateKey = '92eab95f3d5ee3fc201dbf74e7d984192599f316'
const hash = timestamp + privateKey + publicKey
const hashMd5 = MD5.generate(hash)
const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hashMd5}`

const listaPersonagens = document.querySelector('#lista-personagens')

let personagens = []
let pagina = 0
const frutas = ['maca', 'pera']

function proximaPagina() {
  pagina += 1
  const html = `
    <div>
      <img class="imagem" src="${personagens[pagina].thumbnail.path}.${personagens[pagina].thumbnail.extension}" />
      <button onclick="proximaPagina()">proxima pagina</button>
    </div>
  `
  listaPersonagens.innerHTML = html
}

buscarPersonagens = async (page) => {
  try {
    const resposta = await fetch(url)
    const result = await resposta.json()

    const html = `
      <div>
        <img class="imagem" src="${result.data.results[pagina].thumbnail.path}.${result.data.results[pagina].thumbnail.extension}" />
        <button onclick="proximaPagina()">proxima pagina</button>
      </div>
    `
    listaPersonagens.innerHTML = html
    personagens.push(...result.data.results)
  } catch(error) {
    console.log(error)
  }
}

buscarPersonagens()