"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface DropdownMenuProps {
    children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={containerRef}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, { open, setOpen });
                }
                return child;
            })}
        </div>
    );
}

interface DropdownMenuTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

export function DropdownMenuTrigger({ children, asChild, open, setOpen }: DropdownMenuTriggerProps) {
    const trigger = asChild && React.isValidElement(children) ? children : <button>{children}</button>;

    return React.cloneElement(trigger as React.ReactElement<any>, {
        onClick: () => setOpen?.(!open),
        "aria-expanded": open,
    });
}

interface DropdownMenuContentProps {
    children: React.ReactNode;
    align?: "start" | "end" | "center";
    className?: string;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

export function DropdownMenuContent({ children, align = "center", className = "", open, setOpen }: DropdownMenuContentProps) {
    if (!open) return null;

    const alignClasses = {
        start: "left-0",
        end: "right-0",
        center: "left-1/2 -translate-x-1/2",
    };

    return (
        <div
            className={`absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md ${alignClasses[align]} ${className}`}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, { setOpen });
                }
                return child;
            })}
        </div>
    );
}

interface DropdownMenuItemProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    setOpen?: (open: boolean) => void;
}

export function DropdownMenuItem({ children, className = "", onClick, setOpen }: DropdownMenuItemProps) {
    return (
        <div
            className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
            onClick={() => {
                onClick?.();
                setOpen?.(false);
            }}
        >
            {children}
        </div>
    );
}
