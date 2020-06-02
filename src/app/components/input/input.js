import React from 'react';

export default function Input({ label, type }) {
    return (
        <div className="floating-label">
            <input id="first" type={type} required />
            <label for="first">{label}</label>
        </div>
    )
}