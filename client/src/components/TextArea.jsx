import React, {useState, useRef, useEffect} from 'react'
import textCss from './css/TextArea.module.css'

const TextArea = ({data=[]}) => {

    const [text, setText] = useState(data)
    const textRef = useRef(null);

    const reSize = () => {
        textRef.current.style.height = "auto"
        textRef.current.style.height = textRef.current.scrollHeight + 'px'
    }

    useEffect(reSize, [text])

    const onChangeHandler = (e) => {
        setText(e.target.value)
    }

  return (
    <div>
        <textarea className={textCss.formText} ref={textRef} value={text} onChange={onChangeHandler} name="text"></textarea>
    </div>
  )
}

export default TextArea
