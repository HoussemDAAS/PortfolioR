import React from 'react'
import './GlitchText.css'

interface GlitchTextProps {
  text: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text }) => {
  return (
    <span className="gray-glitch" data-text={text}>
      {text}
    </span>
  )
}

export default GlitchText