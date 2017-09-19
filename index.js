const render = require('react-dom').render
const h = require('react-hyperscript')
const configureStore = require('./lib/store')
const Root = require('./app/root.js')
const Eth = require('ethjs')
const metamask = require('metamascara')
let eth;


var body = document.querySelector('body')
const container = document.createElement('div')
body.appendChild(container)

let web3Found = false
window.addEventListener('load', function() {

  const provider = metamask.createDefaultProvider({})
  eth = new Eth(provider)

  window.eth = eth
  store.dispatch({ type: 'ETH_LOADED', value: eth })
  store.dispatch({ type: 'WEB3_FOUND', value: true })

  // Now you can start your app & access web3 freely:
  startApp()
})

const store = configureStore({
  nonce: 0,
  web3Found: false,
  loading: true,
})

function startApp(){
  render(
    h(Root, {
      store,
      className: 'root-el',
    }),
  container)
}

// Check for account changes:
setInterval(async function () {
  const accounts = await eth.accounts()
  const account = accounts[0]
  store.dispatch({
    type: 'ACCOUNT_CHANGED',
    value: account,
  })
}, 200)

