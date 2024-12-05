import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss'
import { classNames } from '../../lib';

export interface IModalProps {
    className?: string
    isOpen?: boolean
    children?: ReactNode
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 100

export const Modal = (props: IModalProps) => {
    const {
        className = '',
        isOpen = false,
        children,
        onClose,
        lazy,
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timeRef = useRef<ReturnType<typeof setTimeout>>()
    const divref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.closing]: isClosing,
    }

    const onCloseHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)

            timeRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
                setIsMounted(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const onHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onCloseHandler()
        }
    }, [onCloseHandler])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = ''; 
        }

        return () => {
            if (timeRef.current) {
                clearTimeout(timeRef.current)
            }
            window.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''; 
        }
    }, [isOpen, onKeyDown])

    useEffect(() => {
        if (divref.current) {
            const focusableElements = divref.current.querySelectorAll<HTMLFormElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            focusableElements[1]?.focus();

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Tab') {
                    const focusable = Array.from(focusableElements);
                    const firstElement = focusable[0];
                    const lastElement = focusable[focusable.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, []);

    return !isMounted && lazy ? null : (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={onCloseHandler}>
                    <div ref={divref} className={cls.content} onClick={onHandler}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}