import ViewShell from "./ViewsShell";
import type { ViewProps } from "./ViewTypes";

export default function PortfolioView({ onBack }: ViewProps) {
    return (
        <ViewShell title="Portfolio" onBack={onBack}>
            <div className="grid grid-row w-full grid-cols-3 gap-2">
                <div className="p-6 ring-1 ring-white/10 rounded bg-black-100/50 flex flex-col items-center hover:bg-black-0">Element 1</div>
                <div className="p-6 ring-1 ring-white/10 rounded bg-black-100/50 flex flex-col items-center hover:bg-black-0">Element 2</div>
                <div className="p-6 ring-1 ring-white/10 rounded bg-black-100/50 flex flex-col items-center hover:bg-black-0">Element 3</div>
                <div className="p-6 ring-1 ring-white/10 rounded bg-black-100/50 flex flex-col items-center hover:bg-black-0">Element 4</div>
                <div className="p-6 ring-1 ring-white/10 rounded bg-black-100/50 flex flex-col items-center hover:bg-black-0">Element 5</div>
            </div>
        </ViewShell>
    );
}
