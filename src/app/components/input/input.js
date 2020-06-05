import React from 'react';

export default function Input({ label, type, value, onChange, id }) {
    return (
        <div className="floating-label">
            <input id={id} type={type} required value={value} onChange={onChange} />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}