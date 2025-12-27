import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Info } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
    title: string;
    image_url: string;
    price?: number;
    handle: string;
    instruction?: string;
}

export function ProductCard({ title, image_url, price, handle, instruction }: ProductCardProps) {
    // In a real app, you'd get the shopify domain from env or context
    const shopUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'example.com'}/products/${handle}`;

    return (
        <Card className="overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/5">
                {image_url ? (
                    <Image
                        src={image_url}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <div className="text-center space-y-2">
                            <Info className="w-8 h-8 mx-auto opacity-50" />
                            <p className="text-xs">No Image</p>
                        </div>
                    </div>
                )}
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold text-base line-clamp-2 min-h-[48px] leading-tight">
                    {title}
                </h3>
                {instruction && (
                    <div className="flex gap-2 items-start text-xs text-muted-foreground bg-primary/5 border border-primary/10 p-3 rounded-lg">
                        <span className="text-primary text-sm flex-shrink-0">💡</span>
                        <p className="flex-1 leading-relaxed">{instruction}</p>
                    </div>
                )}
                {price && (
                    <p className="font-bold text-lg text-primary">
                        ${price.toFixed(2)}
                    </p>
                )}
            </CardContent>
            <CardFooter className="p-5 pt-0">
                <Button
                    size="lg"
                    className="w-full rounded-xl shadow-md hover:shadow-lg transition-all group/btn"
                    asChild
                >
                    <a href={shopUrl} target="_blank" rel="noopener noreferrer">
                        <span className="flex items-center justify-center gap-2">
                            Buy Now
                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </span>
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
