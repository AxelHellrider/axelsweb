export type ViewType= "menu" | "about" | "portfolio" | "contact";

export interface ViewProps {
    onBack: () => void;
}