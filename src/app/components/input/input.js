import React from 'react';

export default function Input({ label, type, value, onChange }) {
    return (
        <div className="floating-label">
            <input id="first" type={type} required value={value} onChange={onChange} />
            <label htmlFor="first">{label}</label>
        </div>
    )
}