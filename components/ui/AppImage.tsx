import NextImage, { ImageProps } from "next/image";

/**
 * A wrapper around next/image to avoid "Illegal constructor" errors
 * caused by conflicts with browser extensions (like Grammarly) that
 * monkey-patch the global Image constructor.
 * 
 * Always use this component instead of importing 'next/image' directly.
 */
export default function AppImage(props: ImageProps) {
    return <NextImage {...props} />;
}
