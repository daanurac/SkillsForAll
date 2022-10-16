x = []
while (len(x) < 4):
    x.append(float(input("Ingresa el valor para x: ")))
for i in x:
    y = 1/(i+(1/(i+(1/(i+(1/i))))))
    print("y =", y)


hour = int(input("Hora de inicio (horas): "))
mins = int(input("Minuto de inicio (minutos): "))
dura = int(input("Duración del evento (minutos): "))

print(((hour*60+mins+dura)//60)%24,":",(hour*60+mins+dura)%60,sep="")