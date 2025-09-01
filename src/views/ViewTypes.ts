export type ViewType= "menu" | "about" | "projects" | "contact";

export interface ViewProps {
    onBack: () => void;
}