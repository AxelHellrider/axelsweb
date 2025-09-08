export type ViewType= "menu" | "about" | "portfolio" | "contact" | "services";

export interface ViewProps {
    onBack: () => void;
}