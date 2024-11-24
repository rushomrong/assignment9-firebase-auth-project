import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Account/PrivateRoute/Auth/AuthContext ";

const TalkWithExpert = () => {
  const { isAuthenticated, setRedirectUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Ref to track if the tab has already been opened
  const hasOpenedTab = useRef(false);

  Modal.setAppElement("#root");

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectUrl(`/TalkWithExpert`);
      navigate("/login");
      return;
    }

    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 10 && hours < 20) {
      // Open Google Meet if within consultation time
      if (!hasOpenedTab.current) {
        window.open("https://meet.google.com/ifb-kjrn-sus", "_blank");
        hasOpenedTab.current = true;
      }
    } else {
      setModalIsOpen(true);
    }
  }, [isAuthenticated, navigate, setRedirectUrl]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Consultation Time"
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto"
        overlayClassName="fixed inset-0  bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Consultation Time</h2>
        <p>
          Please contact us between <strong>10:00 AM - 8:00 PM</strong> for
          consultation.
        </p>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2  bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor hover:text-textWhite"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default TalkWithExpert;
