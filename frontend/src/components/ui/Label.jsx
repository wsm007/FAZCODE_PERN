export function Label ({children, htmlFor}) {
    return (
        <label
            className="blok text-sm font-medium text-gray-400"
            htmlFor={htmlFor}
        >
            {children}
        </label>
    )
}
