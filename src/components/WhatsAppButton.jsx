import React, { useEffect, useRef, useState } from 'react'

import './WhatsAppButton.css'

const WhatsAppButton = ({ phoneNumber = "5491234567890", companyName = "Taura" }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [hasUnread, setHasUnread] = useState(true)
    const buttonRef = useRef(null)
    const chatRef = useRef(null)

    const toggleChat = () => {
        setIsOpen(prev => {
            const next = !prev
            if (!prev) setHasUnread(false)
            return next
        })
    }

    const handleSend = (e) => {
        e.preventDefault()
        if (message.trim()) {
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
            window.open(url, '_blank')
            setMessage('')
            setIsOpen(false)
        }
    }

    const getCurrentTime = () => {
        const now = new Date()
        return now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
    }

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event) => {
            if (
                buttonRef.current?.contains(event.target) ||
                chatRef.current?.contains(event.target)
            ) {
                return
            }
            setIsOpen(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    return (
        <>
            {/* Ventana de chat */}
            {isOpen && (
                <div
                    ref={chatRef}
                    className="whatsapp-chat-window"
                >
                    <div className="whatsapp-chat-header">
                        <div className="whatsapp-chat-info">
                            <h4>{companyName}</h4>
                            <span>En línea</span>
                        </div>
                        <button
                            className="whatsapp-chat-close"
                            onClick={toggleChat}
                            aria-label="Cerrar chat"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="whatsapp-chat-body">
                        <div className="message received">
                            <div className="message-avatar">T</div>
                            <div className="message-content">
                                <p>
                                    ¡Hola! Bienvenido a Taura Birra!
                                    <span className="message-time">{getCurrentTime()}</span>
                                </p>
                            </div>
                        </div>
                        <div className="message received">
                            <div className="message-avatar">T</div>
                            <div className="message-content">
                                <p>
                                    🍺💖🍺
                                    <span className="message-time">{getCurrentTime()}</span>
                                </p>
                            </div>
                        </div>
                        <div className="message received">
                            <div className="message-avatar">T</div>
                            <div className="message-content">
                                <p>
                                    ¿En qué podemos ayudarte?
                                    <span className="message-time">{getCurrentTime()}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <form className="whatsapp-chat-footer" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="whatsapp-chat-input"
                        />
                        <button
                            type="submit"
                            className="whatsapp-chat-send"
                            disabled={!message.trim()}
                            aria-label="Enviar mensaje"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Botón flotante */}
            <button
                ref={buttonRef}
                className={`whatsapp-float ${isOpen ? 'active' : ''} ${hasUnread ? '' : 'no-pulse'}`}
                onClick={toggleChat}
                aria-label="Abrir chat de WhatsApp"
            >
                {hasUnread && <span className="whatsapp-float__badge">2</span>}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
            </button>
        </>
    )
}

export default WhatsAppButton