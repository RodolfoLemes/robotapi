#include "HX711.h"

#define DOUT    6                      
#define CLK   7  

HX711 peso;                // instancia Balança HX711
float calibration_factor = 4530;     // fator de calibração para teste inicial

void setup() {
  Serial.begin(9600);  
  peso.begin(DOUT, CLK);      // inicializa a balança                                            
  Serial.println();                                                
  Serial.println("Calibracao da Balança");                 
  peso.set_scale();                                // configura a escala da Balança            
  zerapeso ();                                    // zera a Balança             
}

void zerapeso () {
  Serial.println();                                             
  peso.tare();                                                 // zera a Balança
  Serial.println("Zerando a Balança ");
}

void loop()
{
  peso.set_scale(calibration_factor);            // ajusta fator de calibração
  Serial.print("Peso: ");                       // imprime no monitor serial
  Serial.print(peso.get_units(), 3);           // imprime peso da balança com 3 casas decimais
  Serial.print(" kg");
  Serial.print("      Fator de Calibração: ");               // imprime no monitor serial
  Serial.println(calibration_factor);                        // imprime fator de calibração
  delay(500) ;                                               
  if (Serial.available()) {          // reconhece letra para ajuste do fator de calibração
    char temp = Serial.read();
    if (temp == '+' || temp == 'a')                // a = aumenta 10
      calibration_factor += 10;
    else if (temp == '-' || temp == 'z')           // z = diminui 10
      calibration_factor -= 10;
    else if (temp == 's')                          // s = aumenta 100
      calibration_factor += 100;
    else if (temp == 'x')                          // x = diminui 100
      calibration_factor -= 100;
    else if (temp == 'd')                          // d = aumenta 1000
      calibration_factor += 1000;
    else if (temp == 'c')                          // c = diminui 1000
      calibration_factor -= 1000;
    else if (temp == 'f')                          // f = aumenta 10000
      calibration_factor += 10000;
    else if (temp == 'v')                          // v = dimuni 10000
      calibration_factor -= 10000;
    else if (temp == 't') zerapeso ();          // t = zera a Balança
  }
}
