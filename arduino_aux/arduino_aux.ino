// Parte desse código foi dispobinilizado pela electronicsblog.net
#include <EEPROM.h>

#define pinCurrentSensor 1
#define pinVoltageMeasure 3
#define ledGoodBattery 1
#define ledBadBattery 2

float capacity = 0, voltage, current, time = 0;
float value;
boolean x = false;
int mVperAmp = 66; 
int RawValue = 0;
int ACSoffset = 2500;
double Voltage = 0;
double Amps = 0;
String measuresSaved;

void writeString(int add, String data){
  int _size = data.length();
  int i;
  for(i=0;i<_size;i++) {
    EEPROM.write(add+i,data[i]);
  }
  EEPROM.write(add+_size,'\0');   //Add termination null character for String Data
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

double currentMeasure(void) {
  RawValue = analogRead(pinCurrentSensor);
  Voltage = (RawValue / 1024.0) * 5000; // Gets you mV
  Amps = ((Voltage - ACSoffset) / mVperAmp);

  return Amps;
}

void measure (void) {
  // A leitura de tensão esta "errada", mas foi calibrada para se aproximar do real
  // Divisor de tensão: Vin => 114,7k - Vout - 68k - GND
  value = analogRead(pinVoltageMeasure);
  voltage = value / 1023 * 12.60;
  current = currentMeasure();
  capacity = capacity + current / 3600;
  time++;

  String measures = String(capacity) + '/' + String(time);
  String measuresSerial = String(voltage) + '/' + String(current) + '/' + String(capacity) + '/' + String(time);
  writeString(0, measures);
  Serial.println(measuresSerial);
}

// Não tenho ideia do que essa função faça
ISR(TIMER1_OVF_vect) {
  TCNT1 = 0x0BDC;
  x = !x;

  measure();
}

// SETUP --- LOOP //
void setup() {
  TIMSK1 = 0x01; // enabled global and timer overflow interrupt;
  TCCR1A = 0x00; // normal operation page 148 (mode0);
  TCNT1 = 0x0BDC; // set initial value to remove time error (16bit counter register)
  TCCR1B = 0x04; // start timer/ set clock

  Serial.begin(9600);

  pinMode(ledGoodBattery, OUTPUT);
  pinMode(ledBadBattery, OUTPUT);

  measuresSaved = read_String(0);
  if(measuresSaved[0] != 0) {
    getProperties();
  }
}

void loop () {
  delay(2000);

  // Falta colocar esses leds
  if(voltage <= 12.6 || voltage >= 11.1) {
    digitalWrite(ledGoodBattery, HIGH);
    digitalWrite(ledBadBattery, LOW);
  } else {
    digitalWrite(ledGoodBattery, LOW);
    digitalWrite(ledBadBattery, HIGH);
  }
}