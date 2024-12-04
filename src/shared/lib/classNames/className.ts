type Mods = Record<string, boolean>

export const classNames = (className: string, mods: Mods = {}, add: string[] = []): string => (
    [
        className,
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([key, _]) => key),
        ...add.filter(Boolean),
    ].join(' ').trim()
)
