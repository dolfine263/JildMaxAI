import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Droplet, Flame, Sun, Wind } from "lucide-react";

interface AnalysisCardProps {
    issue: string;
    description?: string;
    severity?: "low" | "medium" | "high";
}

const ISSUE_ICONS: Record<string, any> = {
    acne: AlertCircle,
    dryness: Droplet,
    oiliness: Flame,
    redness: Sun,
    texture: Wind,
    default: AlertCircle,
};

const SEVERITY_STYLES = {
    low: "bg-green-500/10 text-green-600 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    high: "bg-red-500/10 text-red-600 border-red-500/20",
};

export function AnalysisCard({ issue, description, severity = "medium" }: AnalysisCardProps) {
    const issueKey = issue.toLowerCase().split(" ")[0];
    const Icon = ISSUE_ICONS[issueKey] || ISSUE_ICONS.default;
    const severityStyle = SEVERITY_STYLES[severity];

    return (
        <Card className={`group hover:shadow-lg transition-all duration-300 border-2 ${severityStyle} overflow-hidden`}>
            <CardContent className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                        <div className={`p-3 rounded-xl ${severityStyle} backdrop-blur-sm`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-base leading-tight">{issue}</h3>
                            {description && (
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityStyle} capitalize`}>
                        {severity}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
