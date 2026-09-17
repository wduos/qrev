import "./App.css";
import { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrText, setQrText] = useState("");
  const [modalInputError, setModalInputError] = useState(false);
  const [qrList, setQrList] = useState([]);
  const qrInputRef = useRef(null);

  const handleOpenModal = () => {
    setQrText("");
    setModalInputError(false);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && qrInputRef.current) {
      qrInputRef.current.focus();
      qrInputRef.current.select();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.key.toLowerCase();

      if (pressedKey === "n" && !isModalOpen) {
        e.preventDefault();
        handleOpenModal();
      }

      if (pressedKey === "escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleCreateQr = (event) => {
    event.preventDefault();

    const text = qrText.trim();

    if (!text) {
      setModalInputError(true);
      return;
    }

    setIsModalOpen(false);
    setModalInputError(false);
    setQrList((prevList) => [...prevList, { text }]);
  };

  const handleDeleteQr = (index) => {
    setQrList((prevList) =>
      prevList.filter((_, itemIndex) => itemIndex !== index),
    );
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
        {qrList.length === 0 && (
          <small className="default-message">
            Pressione <span className="bold">N</span> ou aperte no botão{" "}
            <span className="bold">Criar +</span>, para gerar um QR Code.
          </small>
        )}
        {qrList.map((qr, index) => (
          <div className="qr-wrapper" id={index}>
            <QRCode
              value={qr.text}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
              size={256}
            />
            <small>Texto do QR Code</small>
            <h3>{qr.text}</h3>
            <button type="button" onClick={() => handleDeleteQr(index)}>
              Deletar
            </button>
          </div>
        ))}
      </section>

      {isModalOpen && (
        <>
          <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal">
            <h2>Novo QR Code</h2>
            <form onSubmit={(e) => handleCreateQr(e)}>
              <input
                ref={qrInputRef}
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
                <input
                  className="modal-action-btn"
                  type="submit"
                  value="Confirmar"
                />
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default App;
