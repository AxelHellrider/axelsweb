export type ServiceFocus = "product" | "creative" | "experimental";

export type Service = {
    title: string;
    description: string;
    focus: ServiceFocus;
    priority: 1 | 2 | 3;
}