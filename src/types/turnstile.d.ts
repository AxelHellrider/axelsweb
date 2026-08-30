export {};

declare global {
    interface Window {
        turnstile?: {
            reset: (widgetId?: string) => void;
        };
    }
}
