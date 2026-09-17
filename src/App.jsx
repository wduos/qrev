import "./App.css";
import { useState } from "react";
import QRCode from "react-qr-code";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrText, setQrText] = useState("");
  const [modalInputError, setModalInputError] = useState(false);
  const [qrList, setQrList] = useState([]);

  const handleOpenModal = () => {
    setQrText("");
    setModalInputError(false);
    setIsModalOpen(true);
  };

  const handleCreateQr = () => {
    const text = qrText.trim();

    if (!text) {
      setModalInputError(true);
      return;
    }

    setIsModalOpen(false);
    setModalInputError(false);
    setQrList((prevList) => [...prevList, { text }]);
  };
  return (
    <>
      <header>
        <h1 className="title">QRev</h1>
        <div>
          <button className="main-btn" type="button" onClick={handleOpenModal}>
            Criar
            <svg viewBox="0 0 24 24">
              <path d="M16.5,10.5h-3v-3a1.5,1.5,0,0,0-3,0v3h-3a1.5,1.5,0,0,0,0,3h3v3a1.5,1.5,0,0,0,3,0v-3h3a1.5,1.5,0,0,0,0-3Z" />
            </svg>
          </button>
        </div>
      </header>

      <section>
        {qrList.map((qr) => (
          <div className="qr-wrapper">
            <QRCode
              value={qr.text}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
              size={256}
            />
            <h3>{qr.text}</h3>
          </div>
        ))}
      </section>

      {isModalOpen && (
        <>
          <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal">
            <h2>Novo QR Code</h2>
            <input
              type="text"
              id="qr-text"
              className={modalInputError ? "error" : ""}
              placeholder={
                modalInputError
                  ? "Insira o texto para o QR Code"
                  : "Texto para o QR Code"
              }
              value={qrText}
              onChange={(e) => {
                setQrText(e.target.value);
              }}
            />
            <div className="modal-actions-wrapper">
              <button
                className="modal-action-btn"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="modal-action-btn"
                type="button"
                onClick={handleCreateQr}
              >
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
