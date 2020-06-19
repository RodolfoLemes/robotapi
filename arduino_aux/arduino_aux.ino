// Parte desse código foi dispobinilizado pela electronicsblog.net
#include <EEPROM.h>
#include <HX711.h>

#define pinCurrentSensor 1 // Analog Pin A1
#define pinVoltageMeasure 3 // Analog Pin A3
#define ledGoodBattery 2  //Digital Pin 1
#define ledBadBattery 3 // Digital Pin 2
#define ledCharged 4  // Digital Pin 3 
#define DOUT 6 // Digital pin 6 - DOUT HX711
#define CLK 7 // Digital pin 7 - DOUT HX711

// Objetos
HX711 Weight;

// Constants
const int SAMPLES = 12;
const int mVperAmp = 66; 
const int ACSoffset = 2500;

// Variables
float weightCalibration = 4530;
float RawValue = 0;
float capacity = 0;
float time = 0;
float voltage;
float current;
float value;
double Voltage = 0;
double Amps = 0;
boolean x = false;
boolean cleaning = false;
String measuresSaved;

// Functions EEPROM
void writeString(int add, String data){
  int _size = data.length();
  int i;
  for(i=0;i<_size;i++) {
    EEPROM.write(add+i,data[i]);
  }
  EEPROM.write(add+_size,'\0');
}

String read_String(int add){
  int i;
  char data[100]; //Max 100 Bytes
  int len=0;
  unsigned char k;
  k=EEPROM.read(add);
  while(k != '\0' && len<500) {    
    k=EEPROM.read(add+len);
    data[len]=k;
    len++;
  }
  data[len]='\0';
  return String(data);
}

// End Functions EEPROM

void getProperties(void) {
  for(int i=0; i < measuresSaved.length(); i++) {
    if(measuresSaved[i] == '/') {
        String capacityString = measuresSaved.substring(0, i-1);
        String timeString = measuresSaved.substring(i+1, measuresSaved.length()-1);
        capacity = capacityString.toDouble();
        time = timeString.toDouble();
    } 
  }
}

// Função que pega a media de medidas de pinos analógicos
float averageAnalogRead(uint8_t analogPin) {
  float total = 0;
  for(int i = 0; i < SAMPLES; i++) {
    total = total + 1.0*analogRead(analogPin);
    delay(5);
  }

  return total / (float)SAMPLES;
}

// Função responsavel pela aquisição do valor de corrente indicado pelo sensor de corrent ACS712
double currentMeasure(void) {
  RawValue = averageAnalogRead(pinCurrentSensor);
  Voltage = (RawValue / 1024.0) * 5000; // Gets you mV
  Amps = ((Voltage - ACSoffset) / mVperAmp);

  return Amps;
}

// Função multimetro, também responsavel por calcular a capacidade da bateria, salvar na EEPROM e enviar via Serial
void measure(void) {
  value = averageAnalogRead(pinVoltageMeasure);
  voltage = value / 1024.0 * 12.60;
  current = currentMeasure();
  if(current < 0) {
    current = 0;
  }
  capacity = capacity + current / 3600;
  time++;

  String measures = String(capacity) + '/' + String(time);
  String measuresSerial = String(voltage) + '/' + String(current) + '/' + String(capacity) + '/' + String(time);
  writeString(0, measures);
  Serial.println(measures);
  Serial.println(measuresSerial);
}

// Não tenho ideia do que essa função faça
ISR(TIMER1_OVF_vect) {
  TCNT1 = 0x0BDC;
  x = !x;

  if(!cleaning) {
     measure();
  }
}

// SETUP --- LOOP //
void setup() {
  TIMSK1 = 0x01; // enabled global and timer overflow interrupt;
  TCCR1A = 0x00; // normal operation page 148 (mode0);
  TCNT1 = 0x0BDC; // set initial value to remove time error (16bit counter register)
  TCCR1B = 0x04; // start timer/ set clock

  Serial.begin(9600);

  Weight.begin(DOUT, CLK);
  Weight.set_scale(weightCalibration);
  Weight.tare();

  pinMode(ledCharged, OUTPUT);
  pinMode(ledGoodBattery, OUTPUT);
  pinMode(ledBadBattery, OUTPUT);

  measuresSaved = read_String(0);
  if(measuresSaved[0] != 0) {
    getProperties();
  }
}

void loop() {
  // Falta colocar esses leds
  if(voltage > 12.6) {
    digitalWrite(ledCharged, HIGH);
    digitalWrite(ledGoodBattery, HIGH);
    digitalWrite(ledBadBattery, HIGH);
  } else if(voltage <= 12.6 && voltage >= 12.2) {
    digitalWrite(ledCharged, HIGH);
    digitalWrite(ledGoodBattery, LOW);
    digitalWrite(ledBadBattery, LOW);
  } else if(voltage <= 12.1 && voltage >= 11.1) {
    digitalWrite(ledCharged, LOW);
    digitalWrite(ledGoodBattery, HIGH);
    digitalWrite(ledBadBattery, LOW);
  } else {
    digitalWrite(ledCharged, LOW);
    digitalWrite(ledGoodBattery, LOW);
    digitalWrite(ledBadBattery, HIGH);
  }

  if(Serial.available()) {
    char string = Serial.read();
    if(string == 'W' || string == 'w') {
      Serial.println(Weight.get_units(), 3);
    } else if(string == 'E' || string == 'e') {
      cleaning = true;
      digitalWrite(ledCharged, HIGH);
      digitalWrite(ledGoodBattery, HIGH);
      digitalWrite(ledBadBattery, HIGH);
      for (int i = 0 ; i < EEPROM.length() ; i++) {
        EEPROM.write(i, 0);
      }
      capacity = 0;
      time = 0;
      digitalWrite(ledCharged, LOW);
      digitalWrite(ledGoodBattery, LOW);
      digitalWrite(ledBadBattery, LOW);
      cleaning = false;
    }
  }
}
