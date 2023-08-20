"""Aplicación de Cifrado Vernam
   hecho por @jxinternet
"""
def cifrar_vernam(texto, clave):
    # Lógica de transposición (dividir en 7 filas)
    longitud_fila = len(texto) // 7
    filas = [texto[i:i + longitud_fila] for i in range(0, len(texto), longitud_fila)]

    # Lógica de desplazamiento
    texto_desplazado = "".join(filas)[7:] + "".join(filas)[:7]

    # Cifrado Vernam
    texto_cifrado = ""
    for i in range(len(texto_desplazado)):
        char_code_texto = ord(texto_desplazado[i])
        char_code_clave = ord(clave[i % 7])
        char_code_cifrado = (char_code_texto + char_code_clave) % 128
        texto_cifrado += chr(char_code_cifrado)

    return texto_cifrado

def descifrar_vernam(texto_cifrado, clave):
    texto_descifrado = ""

    # Descifrado Vernam
    for i in range(len(texto_cifrado)):
        char_code_cifrado = ord(texto_cifrado[i])
        char_code_clave = ord(clave[i % 7])
        char_code_descifrado = (char_code_cifrado - char_code_clave + 128) % 128
        texto_descifrado += chr(char_code_descifrado)

    # Lógica de desplazamiento inverso
    desplazamiento_inverso = 7
    texto_descifrado = texto_descifrado[-desplazamiento_inverso:] + texto_descifrado[:-desplazamiento_inverso]

    # Lógica de transposición inversa
    longitud_fila = len(texto_descifrado) // 7
    filas_descifrado = [texto_descifrado[i:i + longitud_fila] for i in range(0, len(texto_descifrado), longitud_fila)]
    texto_descifrado = "".join([filas_descifrado[j][i] for i in range(longitud_fila) for j in range(7) if i < len(filas_descifrado[j])])

    return texto_descifrado

# Interacción con usuario
nombre_estudiante = input("Nombre: ")
carnet_estudiante = input("Carnet: ")
texto_original = input("Texto a Cifrar: ")
clave = input("Clave de Cifrado: ")

texto_cifrado = cifrar_vernam(texto_original, clave)
print("\nTexto Cifrado:\n", texto_cifrado)

texto_descifrado = descifrar_vernam(texto_cifrado, clave)
print("\nTexto Descifrado:\n", texto_descifrado)
