import { Card, CardContent } from "@/components/ui/card";

export default function LoadingCard({ className }: { className?: string }) {
  return (
    <Card className={`p-4 space-y-4 animate-pulse ${className}`}>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      <CardContent className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </CardContent>
    </Card>
  );
}
