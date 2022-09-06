import { useEffect, useState } from "react";
import "./App.css";
import { HangImage } from "./components/HangImage";
import { letras } from "./helpers/letras";
import { palabrasRandom } from "./helpers/palabrasRandom";

function App() {
  const [palabras, setPalabras] = useState(palabrasRandom());
  const [ocultarPalabra, setOcultarPalabra] = useState(
    "_ ".repeat(palabras.length)
  );
  const [intentos, setIntentos] = useState(0);
  const [gano, setGano] = useState(false);
  const [perdio, setPerdio] = useState(false);

  useEffect(() => {
    if (intentos === 9) {
      setPerdio(true);
    }
  }, [intentos]);

  useEffect(() => {
    const currentOcultarPalabra = ocultarPalabra.split(" ").join("");
    if (currentOcultarPalabra === palabras) {
      setGano(true);
    }
  }, [ocultarPalabra]);

  const validarPalabras = (letra: string) => {
    if (gano) return;
    if (perdio) return;

    if (!palabras.includes(letra)) {
      setIntentos(Math.min(intentos + 1, 9));
      return;
    }

    const ocultarPalabraArray = ocultarPalabra.split(" ");

    for (let i = 0; i < palabras.length; i++) {
      if (palabras[i] === letra) {
        ocultarPalabraArray[i] = letra;
      }
    }
    setOcultarPalabra(ocultarPalabraArray.join(" "));
  };

  const reiniciarJuego = () => {
    const nuevaPalabra = palabrasRandom();
    setPalabras(nuevaPalabra);
    setOcultarPalabra("_ ".repeat(nuevaPalabra.length));
    setIntentos(0);
    setGano(false);
    setPerdio(false);
  };
  return (
    <div className="App">
      <h1 className="font-bold text-4xl my-4 text-sky-900">Juego del Ahorcado</h1>
      <h2 className="font-bold text-3xl my-4 text-stone-50	">¿Quieres Jugar?</h2>
      <div className="mx-auto flex flex-col justify-center items-center">
        <HangImage imagenNumero={intentos} />
      </div>
      <h3 className="font-bold text-2xl my-4 text-sky-500">
        {ocultarPalabra}
      </h3>
      <h3 className="font-bold text-2xl my-4 text-sky-900">
        Intento: {intentos} de 9
      </h3>
      {perdio ? (
        <h3 className="font-bold text-2xl my-4 text-sky-500">
          Ya perdió 😒, su palabra es: {palabras}
        </h3>
      ) : (
        ""
      )}
      {gano ? (
        <h3 className="font-bold text-2xl my-4 text-sky-300">
          Felicidates, ud ganó 😊
        </h3>
      ) : (
        ""
      )}
      <div className="flex flex-col justify-center items-center">
        <div className="w-2/4 ">
          {letras.map((letra) => (
            <button
              className="bg-white p-4 rounded-full shadow-md m-2"
              key={letra}
              onClick={() => {
                validarPalabras(letra);
              }}
            >
              {letra}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          className="mt-6 bg-sky-700 py-4 px-6 rounded-full text-white font-bold text-xl"
          onClick={reiniciarJuego}
        >
          ¿Nuevo juego?
        </button>
      </div>
    </div>
  );
}

export default App;
