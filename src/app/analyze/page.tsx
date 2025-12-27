"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, AlertCircle } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function AnalyzePage() {
    const [step, setStep] = useState<"upload" | "analyzing" | "results">("upload");
    const [image, setImage] = useState<string | null>(null); // Base64
    const [description, setDescription] = useState("");
    const [result, setResult] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setStep("analyzing");

        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image, description }),
            });

            if (!res.ok) throw new Error("Analysis failed");

            const data = await res.json();
            setResult(data);
            setStep("results");
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
            setStep("upload");
        }
    };

    return (
        <div className="min-h-screen bg-background p-6 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-4xl flex justify-between items-center mb-12">
                <div className="text-xl font-bold">Jild<span className="text-primary">Max</span>.</div>
            </header>

            <main className="w-full max-w-3xl">
                {step === "upload" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold">First, let's see your skin.</h1>
                            <p className="text-muted-foreground">Upload a clear, makeup-free selfie in natural lighting.</p>
                        </div>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center space-y-4 hover:bg-accent/30 transition-colors cursor-pointer relative overflow-hidden group"
                        >
                            {image ? (
                                <img src={image} alt="Preview" className="h-64 object-cover rounded-lg shadow-md" />
                            ) : (
                                <>
                                    <div className="p-6 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <span className="font-medium text-lg">Click to Upload Photo</span>
                                    <p className="text-sm text-muted-foreground">JPG, PNG up to 5MB</p>
                                </>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="space-y-4">
                            <Label>Tell us about your main concerns (Optional)</Label>
                            <Textarea
                                placeholder="e.g. My skin feels dry in winter, and I have some redness on my cheeks..."
                                className="h-32 resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {image && (
                            <Button size="lg" className="w-full h-12 text-lg" onClick={handleAnalyze}>
                                Analyze My Skin
                            </Button>
                        )}
                    </motion.div>
                )}

                {step === "analyzing" && (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-primary">AI</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Analyzing your skin...</h2>
                            <p className="text-muted-foreground max-w-sm">Detecting texture, concerns, and skin type to build your perfect routine.</p>
                        </div>
                    </div>
                )}

                {step === "results" && result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-12"
                    >
                        {/* Summary */}
                        <section className="text-center space-y-4">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2">
                                {result.skin_type} Skin Detected
                            </div>
                            <h1 className="text-3xl font-bold">Your Analysis Results</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto bg-card p-6 rounded-xl border shadow-sm">
                                "{result.analysis_summary}"
                            </p>

                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {result.issues_detected?.map((issue: string, i: number) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                                        {issue}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Morning Routine */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-orange-500">☀</span> Morning Routine
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {result.routine?.morning?.map((step: any, i: number) => (
                                    <ProductCard
                                        key={i}
                                        title={step.title || step.product_name}
                                        handle={step.handle || "#"}
                                        image_url={step.image_url || ""}
                                        price={step.price}
                                        instruction={step.instruction}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Evening Routine */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-indigo-500">☾</span> Evening Routine
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {result.routine?.evening?.map((step: any, i: number) => (
                                    <ProductCard
                                        key={i}
                                        title={step.title || step.product_name}
                                        handle={step.handle || "#"}
                                        image_url={step.image_url || ""}
                                        price={step.price}
                                        instruction={step.instruction}
                                    />
                                ))}
                            </div>
                        </section>

                        <div className="bg-secondary/30 p-8 rounded-2xl text-center">
                            <h3 className="text-xl font-semibold mb-2">Expert Advice</h3>
                            <p className="text-muted-foreground">{result.advice}</p>
                        </div>

                        <Button size="lg" variant="outline" className="w-full" onClick={() => setStep("upload")}>
                            Analyze Another Photo
                        </Button>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
