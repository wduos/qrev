import "./App.css";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header>
        <h1 className="title">QRev</h1>
        <div>
          <button
            className="main-btn"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Criar
            <svg viewBox="0 0 24 24">
              <path d="M16.5,10.5h-3v-3a1.5,1.5,0,0,0-3,0v3h-3a1.5,1.5,0,0,0,0,3h3v3a1.5,1.5,0,0,0,3,0v-3h3a1.5,1.5,0,0,0,0-3Z" />
            </svg>
          </button>
        </div>
      </header>

      {isModalOpen && (
        <>
          <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal">
            <h2>Novo QR Code</h2>
            <input
              type="text"
              id="qr-text"
              placeholder="Texto para o QR Code"
            />
            <div className="modal-actions-wrapper">
              <button
                className="modal-action-btn"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button className="modal-action-btn" type="button">
                Confirmar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
