/* 
Exemplo de um algoritmo simples de desvio de obstáculos baseado em sensores ultrassônicos
utilizando a API, feito em NodeJs.
*/

// Pode se utilizar qualquer bibiliteca de requisição
// Neste caso, irei utilizar a biblioteca Axios
const axios = require('axios')

// URL, que no caso, é o IP do raspberry
const url = 'http://192.168.0.30/'

// Variáveis para receber os valores dos ultrassonics, dos encoders e da serial
var ultrassonicDistances
var encoders
var serial

async function main() {
  // init nos modulos
  const response = await axios.all([
    axios.get(url + 'ultrassonic/init'), 
    axios.get(url + 'arduino/startSerial')
  ])

  if(response[0].data && response[1].data) {
    // Monitora as distâncias a cada 0.2 segundo 
    var threadUltrassonic = setInterval(async () => {
      ultrassonicDistances = await axios.get(url + 'ultrassonic/getMeasure')
    }, 200);
    
    // Monitora os valores de bateria, tensão etc a cada 1 segundo
    var threadSerial = setInterval(async () => {
      serial = await axios.get(url + 'serial/getMeasures')
    }, 1000);
  } else {
    return
  }
  
  // Comando dos motores


}

