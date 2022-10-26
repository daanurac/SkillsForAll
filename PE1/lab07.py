ingreso = float(input("Ingreso: "))

if(ingreso > 85528):
    impuesto = 14839.02 + ((ingreso - 85528) * 0.32)
else:
    impuesto = ingreso * 0.18 - 556.02
    if(impuesto < 0): impuesto = 0.0

print("El impuesto es: " + str(round(impuesto, 0)) + " pesos")