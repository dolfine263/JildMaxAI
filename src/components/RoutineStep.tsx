import { ProductCard } from "@/components/ProductCard";

interface RoutineStepProps {
    stepNumber: number;
    product: {
        title: string;
        image_url: string;
        price?: number;
        handle: string;
        instruction?: string;
    };
    isLast?: boolean;
}

export function RoutineStep({ stepNumber, product, isLast = false }: RoutineStepProps) {
    return (
        <div className="relative">
            {/* Step Number Badge */}
            <div className="absolute -left-4 top-6 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg">
                {stepNumber}
            </div>

            {/* Connector Line */}
            {!isLast && (
                <div className="absolute -left-2 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
            )}

            {/* Product Card */}
            <div className="ml-8">
                <ProductCard
                    title={product.title}
                    image_url={product.image_url}
                    price={product.price}
                    handle={product.handle}
                    instruction={product.instruction}
                />
            </div>
        </div>
    );
}
