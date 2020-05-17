// Very simple Arduino Lithium-ion battery capacity tester
// from electronicsblog.net
#include <EEPROM.h>

#define pinCurrentSensor A1
#define pinVoltageMeasure A0

float capacity = 0, value, voltage, current, time = 0;
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
  EEPROM.commit();
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

  return Amps
}

void measure (void) {
  value = analogRead(pinVoltageMeasure);
  voltage = value / 1024 * 5.0;
  current = currentMeasure();
  capacity = capacity + current / 3600;
  time++;

  String measures = capacity + '/' + time;

  writeString(0, measures);
  Serial.write(measures);
}

// Não tenho ideia do que essa função faça
ISR(TIMER1_OVF_vect) {
  TCNT1 = 0x0BDC;
  x = !x;

  measure();
}

void setup() {
  TIMSK1 = 0x01; // enabled global and timer overflow interrupt;
  TCCR1A = 0x00; // normal operation page 148 (mode0);
  TCNT1 = 0x0BDC; // set initial value to remove time error (16bit counter register)
  TCCR1B = 0x04; // start timer/ set clock

  measuresSaved = read_String(0);
  if(measuresSaved[0] != 0) {
    getProperties();
  }
  
  Serial.begin(9600);
};

void loop () {
  delay(2000);
};
