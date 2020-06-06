import React from 'react';
import backgroundImage from './bg.jpg'

const style = {
    display: 'flex',
    width: '70%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundPosition: '30%'
}

export default function ImageProgress() {
    return <div style={style} />
}