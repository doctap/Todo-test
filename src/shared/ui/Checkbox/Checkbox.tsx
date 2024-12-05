import { InputHTMLAttributes, memo } from 'react'
import { classNames } from '../../lib'
import cls from './Checkbox.module.scss'

export interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string
    onChange: (checked: boolean) => void
}

export const Checkbox = memo((props: ICheckboxProps) => {
    const {
        className = '',
        checked,
        onChange,
        ...otherProps
    } = props

    return (
        <input
            {...otherProps}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    onChange(e.currentTarget.checked);
                }
            }}
            className={classNames(cls.Checkbox, {}, [className])}
        />
    )
})
