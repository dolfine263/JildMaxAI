import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
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
        <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="aspect-square relative overflow-hidden bg-secondary/20">
                {image_url ? (
                    <Image
                        src={image_url}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                )}
            </div>
            <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]">{title}</h3>
                {instruction && (
                    <p className="text-xs text-muted-foreground bg-secondary/50 p-2 rounded-md">
                        💡 {instruction}
                    </p>
                )}
                {price && <p className="font-medium text-primary">${price}</p>}
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button size="sm" className="w-full" asChild>
                    <a href={shopUrl} target="_blank" rel="noopener noreferrer">
                        Buy Now <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
