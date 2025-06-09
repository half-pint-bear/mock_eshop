import React from 'react';
import { User } from 'lucide-react';

export default function AccountIcon({className}) {
    return (
        <button className={className} aria-label="Compte">
            <User size={24} />
        </button>
    );
}
