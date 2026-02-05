import * as React from "react";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
            />
            {/* Content */}
            <div className="relative z-50">
                {children}
            </div>
        </div>
    );
}

interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
    return (
        <div className={`relative bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto ${className}`}>
            {children}
        </div>
    );
}

interface DialogHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogHeader({ children, className = "" }: DialogHeaderProps) {
    return (
        <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
            {children}
        </div>
    );
}

interface DialogTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
    return (
        <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
            {children}
        </h2>
    );
}
