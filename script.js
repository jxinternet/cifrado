document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const encryptionKey = document.getElementById("encryptionKey");
    const encryptButton = document.getElementById("encryptButton");
    const decryptButton = document.getElementById("decryptButton");
    const outputArea = document.getElementById("outputArea");
  
    encryptButton.addEventListener("click", () => {
      const texto = inputText.value;
      const clave = encryptionKey.value;
  
      // Lógica de cifrado
      const textoCifrado = cifrarVernam(texto, clave);
  
      // Mostrar el texto cifrado en el área de salida
      outputArea.textContent = "Texto Cifrado:\n" + textoCifrado;
    });
  
    decryptButton.addEventListener("click", () => {
      const textoCifrado = inputText.value;
      const clave = encryptionKey.value;
  
      // Lógica de descifrado
      const textoDescifrado = descifrarVernam(textoCifrado, clave);
  
      // Mostrar el texto descifrado en el área de salida
      outputArea.textContent = "Texto Descifrado:\n" + textoDescifrado;
    });
  
    // Función de cifrado Vernam
    function cifrarVernam(texto, clave) {
      // Lógica de transposición (dividir en 7 filas)
      const filas = [];
      for (let i = 0; i < 7; i++) {
        const start = i * Math.ceil(texto.length / 7);
        const end = (i + 1) * Math.ceil(texto.length / 7);
        filas.push(texto.slice(start, end));
      }
  
      // Lógica de desplazamiento
      const textoDesplazado = filas.join("").slice(7) + filas.join("").slice(0, 7);
  
      // Cifrado Vernam
      let textoCifrado = "";
      for (let i = 0; i < textoDesplazado.length; i++) {
        const charCodeTexto = textoDesplazado.charCodeAt(i);
        const charCodeClave = clave.charCodeAt(i % 7);
        const charCodeCifrado = (charCodeTexto + charCodeClave) % 128;
        textoCifrado += String.fromCharCode(charCodeCifrado);
      }
  
      return textoCifrado;
    }
  
    // Función de descifrado Vernam
    function descifrarVernam(textoCifrado, clave) {
      let textoDescifrado = "";
  
      // Descifrado Vernam
      for (let i = 0; i < textoCifrado.length; i++) {
        const charCodeCifrado = textoCifrado.charCodeAt(i);
        const charCodeClave = clave.charCodeAt(i % 7);
        const charCodeDescifrado = (charCodeCifrado - charCodeClave + 128) % 128;
        textoDescifrado += String.fromCharCode(charCodeDescifrado);
      }
  
      // Lógica de desplazamiento inverso
      const desplazamientoInverso = 7;
      textoDescifrado = textoDescifrado.slice(-desplazamientoInverso) + textoDescifrado.slice(0, -desplazamientoInverso);
  
      // Lógica de transposición inversa
      const longitudFila = Math.ceil(textoDescifrado.length / 7);
      const filasDescifrado = [];
      for (let i = 0; i < 7; i++) {
        filasDescifrado.push(textoDescifrado.slice(i * longitudFila, (i + 1) * longitudFila));
      }
      textoDescifrado = "";
      for (let i = 0; i < longitudFila; i++) {
        for (let j = 0; j < 7; j++) {
          if (i < filasDescifrado[j].length) {
            textoDescifrado += filasDescifrado[j][i];
          }
        }
      }
  
      return textoDescifrado;
    }
  });
  