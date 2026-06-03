import { useState, useCallback, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export default function TextScramble({ text, className = '' }) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(null)
  const isScrambling = useRef(false)

  const scramble = useCallback(() => {
    if (isScrambling.current) return
    isScrambling.current = true

    let iteration = 0
    const totalFrames = text.length * 3

    const update = () => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration / 3) return text[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iteration++
      if (iteration < totalFrames) {
        frameRef.current = requestAnimationFrame(update)
      } else {
        setDisplay(text)
        isScrambling.current = false
      }
    }

    frameRef.current = requestAnimationFrame(update)
  }, [text])

  return (
    <span onMouseEnter={scramble} className={`cursor-default ${className}`}>
      {display}
    </span>
  )
}