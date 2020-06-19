/* Exemplo de um algoritmo simples de desvio de obstáculos baseado em sensores ultrassônicos
utilizando a API, feito em NodeJs. */

// Pode se utilizar qualquer bibiliteca de requisição
// Neste caso, irei utilizar a biblioteca Axios
const axios = require('axios')

// URL, que no caso, é o IP do raspberry e a porta definita, no caso, 3333
const url = 'http://192.168.0.30:3333/'

// Variáveis para receber os valores dos ultrassonics, dos encoders e da serial
var ultrassonicDistances
var encoders
var serial
var threadUltrassonic
var threadSerial
var threadEncoder
var loop
var antiMerda = false

// Chamada da função principal
main()

// Funções principal
function main() {
  if(init()) {
    loop = setInterval(motorControll, 1000)
  } else {
    console.log('Erro para se conectar')
    return
  }
}

// Funções complementares
async function init() {
  // init dos modulos
  const response = await axios.all([
    axios.get(url + 'ultrassonic/init'), 
    axios.get(url + 'arduino/startSerial')
  ])
  console.log(response)

  if(response[0].data && response[1].data) {
    await axios.get(url + 'motor/setPwmValue?pwmValueA=177&pwmValueB=100')
    //beginThreads()
    return true
  } else {
    return false
  }
}

async function motorControll() {
  let response = await axios.get(url + 'ultrassonic/getMeasure')
  ultrassonicDistances = response.data.distances
  
  // Comando dos motores
  if(checkForward(ultrassonicDistances)) {
    // Ir para frente
    console.log('frente')
    await axios.get(url + 'motor/forward')
  } else {
    await axios.get(url + 'motor/shutdown')
    if(verifySide(ultrassonicDistances)) {
      // Virar para esquerda
      console.log('direita')
      const encoderRequest = await axios.get(url + 'encoder/get?encoder=A')
      var distanceInitial = encoderRequest.data.distance
      await axios.get(url + 'motor/turn?side=direita')
      var distanceFinal = 0
      while (distanceFinal - distanceInitial >= 11.78) {
        if(antiMerda) {
          break
        }

        const encoderRequest2 = await axios.get(url + 'encoder/get?encoder=A')
        distanceFinal = encoderRequest2.data.distance
      }
      await axios.get(url + 'motor/shutdown')
    } else {
      // Virar para direita
      console.log('esquerda')
      const encoderRequest = await axios.get(url + 'encoder/get?encoder=A')
      var distanceInitial = encoderRequest.data.distance
      await axios.get(url + 'motor/turn?side=esquerda')
      var distanceFinal = 0
      while (distanceFinal - distanceInitial >= 11.78) {
        if(antiMerda) {
          break
        }

        const encoderRequest2 = await axios.get(url + 'encoder/get?encoder=A')
        distanceFinal = encoderRequest2.data.distance
      }
      await axios.get(url + 'motor/shutdown')
    }
  }
}

/* function beginThreads() {
  // Inicia as threads para monitoração

  // Monitora as distâncias a cada 0.05 segundos
  threadUltrassonic = setInterval(async () => {
    const response = await axios.get(url + 'ultrassonic/getMeasures')
    //console.log(response.data)
    ultrassonicDistances = response.data
  }, 50);
  
  // Monitora os encoders a cada 0.05 segundos
  threadEncoder = setInterval(async () => {
    const response = await axios.get(url + 'encoder/get')
    console.log(response.data)
    encoders = response.data
  }, 1000)

  // Monitora os valores de bateria, tensão etc a cada 1 segundo
  threadSerial = setInterval(async () => {
    const response = await axios.get(url + 'arduino/getMeasures')
    console.log(response.data)
  }, 1000);
}
*/
// Funções auxiliares
function checkForward(distances) {
  return distances[0] > 30 && distances[1] > 30 && distances[3] > 35
}

function verifySide() {
  let value = Math.random()
  return value >= 0.49 ? true : false
}

// Ativa quando for pressionado ctrl+c
process.on('SIGINT', async function () {
  antiMerda = true
  clearInterval(loop)
  clearInterval(threadUltrassonic)
  clearInterval(threadSerial)
  clearInterval(threadEncoder)
  await axios.get(url + 'motor/shutdown')
  await axios.get(url + 'ultrassonic/stop')
  process.exit(); //exit completely
});