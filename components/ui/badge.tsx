import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
    let variantClasses = ""
    switch (variant) {
        case "default":
            variantClasses = "border-transparent bg-blue-600 text-white hover:bg-blue-700"
            break
        case "secondary":
            variantClasses = "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200"
            break
        case "destructive":
            variantClasses = "border-transparent bg-red-500 text-white hover:bg-red-600"
            break
        case "outline":
            variantClasses = "text-gray-950 border-gray-200"
            break
    }

    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

    return (
        <div className={`${baseClasses} ${variantClasses} ${className}`} {...props} />
    )
}

export { Badge }
