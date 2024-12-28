import React from 'react'
import './GlitchText.css'
interface GlitchTextProps {
  text: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text }) => {
  return (
    <div className="glitch" data-text={text}>{text}</div>
  )
}

export default GlitchText
