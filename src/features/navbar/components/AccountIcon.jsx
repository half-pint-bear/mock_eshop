import React, {useState} from 'react';
import { User } from 'lucide-react';
import LoginModal from "../../auth/LoginModal.jsx";

export default function AccountIcon({className}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button
                className={className}
                aria-label="Compte"
                onClick={() => {
                    setShowModal(true);
                }}>
                <User size={24} />
            </button>
            {showModal && <LoginModal onClose={()  => setShowModal(false)} />}
        </div>
    );
}
