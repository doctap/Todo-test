import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface IPortalProps {
    children: ReactNode
    element?: HTMLElement
}

export const Portal = ({
    children,
    element = document.body,
}: IPortalProps) => createPortal(children, element)
