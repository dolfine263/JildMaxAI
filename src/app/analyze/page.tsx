"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Upload, AlertCircle, ArrowLeft, Share2, Home, BarChart2,
    ShoppingBag, User, Download, Camera, X, Sparkles, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import Link from "next/link";

// Type definitions
interface RoutineStep {
    product_id?: string;
    title?: string;
    product_name?: string;
    product_url?: string;
    image_url?: string;
    price?: number | string;
    instruction?: string;
}

interface AnalysisResult {
    skin_type?: string;
    analysis_summary?: string;
    issues_detected?: string[];
    routine?: {
        morning?: RoutineStep[];
        evening?: RoutineStep[];
    };
    advice?: string | string[] | Record<string, string>;
}

const STORAGE_KEY = 'jildmax_analysis_result';

export default function AnalyzePage() {
    const [step, setStep] = useState<"upload" | "analyzing" | "results">("upload");
    const [image, setImage] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Load saved results from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setResult(parsed);
                setStep("results");
            }
        } catch (e) {
            console.error('Failed to load saved results:', e);
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    // Save results to localStorage when they change
    useEffect(() => {
        if (result) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
            } catch (e) {
                console.error('Failed to save results:', e);
            }
        }
    }, [result]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                setError("📁 File too large! Please upload an image under 5MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setStep("analyzing");
        setError(null);

        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image, description }),
            });

            const data = await res.json();

            if (!res.ok) {
                const errorMessage = data.error || "Analysis failed";

                if (errorMessage.toLowerCase().includes("face")) {
                    setError("😕 No face detected! Please upload a clear selfie showing your face.");
                } else if (errorMessage.includes("products")) {
                    setError("🛍️ No products available. Please contact support.");
                } else if (errorMessage.includes("configuration") || errorMessage.includes("API key")) {
                    setError("⚙️ Server configuration error. Please contact support.");
                } else {
                    setError(`❌ ${errorMessage}`);
                }
                setStep("upload");
                return;
            }

            setResult(data);
            setStep("results");
        } catch (err) {
            console.error(err);
            setError("🔌 Network error. Please check your connection and try again.");
            setStep("upload");
        }
    };

    const handleExport = async () => {
        if (!result) return;
        setIsExporting(true);

        try {
            // Build formatted content
            let content = "🌟 JILDMAX SKIN ANALYSIS RESULTS 🌟\n";
            content += "━".repeat(40) + "\n\n";
            content += `📋 Skin Type: ${result.skin_type || 'Not specified'}\n\n`;
            content += `📝 Summary:\n${result.analysis_summary || 'No summary available'}\n\n`;

            if (result.routine?.morning?.length) {
                content += "☀️ MORNING ROUTINE\n";
                content += "─".repeat(25) + "\n";
                result.routine.morning.forEach((s, i) => {
                    content += `\nStep ${i + 1}: ${s.title || s.product_name}\n`;
                    content += `   💰 Rs ${s.price || '0'}\n`;
                    content += `   📌 ${s.instruction || 'Apply gently'}\n`;
                    content += `   🔗 ${s.product_url || 'No link'}\n`;
                });
                content += "\n";
            }

            if (result.routine?.evening?.length) {
                content += "🌙 EVENING ROUTINE\n";
                content += "─".repeat(25) + "\n";
                result.routine.evening.forEach((s, i) => {
                    content += `\nStep ${i + 1}: ${s.title || s.product_name}\n`;
                    content += `   💰 Rs ${s.price || '0'}\n`;
                    content += `   📌 ${s.instruction || 'Apply gently'}\n`;
                    content += `   🔗 ${s.product_url || 'No link'}\n`;
                });
            }

            content += "\n" + "━".repeat(40) + "\n";
            content += "Powered by JildMax AI × NGlow Skincare";

            // Create styled element for capture
            const el = document.createElement('div');
            el.style.cssText = `
                position: fixed; top: 0; left: 0; right: 0;
                background: linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 100%);
                padding: 48px; font-family: 'Nunito Sans', sans-serif;
                white-space: pre-wrap; z-index: 9999; font-size: 14px;
                line-height: 1.6; color: #334155; max-width: 600px;
                margin: 0 auto; border-radius: 16px;
            `;
            el.textContent = content;
            document.body.appendChild(el);

            const canvas = await html2canvas(el, {
                backgroundColor: '#FFFFFF',
                scale: 2,
                logging: false,
            });

            document.body.removeChild(el);

            const link = document.createElement('a');
            link.download = `jildmax-routine-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Export error:', err);
            setError('❌ Failed to export. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const clearImage = () => {
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Severity mapping for issues
    const getSeverityStyle = (index: number) => {
        const styles = [
            { bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-900", text: "text-red-600 dark:text-red-400", badge: "High", icon: "🔴" },
            { bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-900", text: "text-amber-600 dark:text-amber-400", badge: "Medium", icon: "🟡" },
            { bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-200 dark:border-green-900", text: "text-green-600 dark:text-green-400", badge: "Low", icon: "🟢" },
        ];
        return styles[index % 3];
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-md mx-auto min-h-screen pb-28 relative">
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 glass-effect px-4 py-3 flex justify-between items-center">
                    <Link href="/" className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all btn-press">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="font-display font-semibold text-lg">
                        {step === "upload" ? "New Analysis" : step === "analyzing" ? "Analyzing..." : "Your Results"}
                    </h1>
                    <button
                        onClick={handleExport}
                        disabled={step !== "results" || isExporting}
                        className="p-2 -mr-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed btn-press"
                        title="Export Results"
                    >
                        {isExporting ? (
                            <Download className="w-5 h-5 animate-pulse" />
                        ) : (
                            <Share2 className="w-5 h-5" />
                        )}
                    </button>
                </header>

                {/* Error Toast */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="fixed top-16 left-4 right-4 max-w-md mx-auto z-40"
                        >
                            <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-red-700 dark:text-red-300 font-medium text-sm flex-1">
                                        {error}
                                    </p>
                                    <button
                                        onClick={() => setError(null)}
                                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition"
                                    >
                                        <X className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <main className="px-4 pt-20 pb-8">
                    {/* Upload Step */}
                    <AnimatePresence mode="wait">
                        {step === "upload" && (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-2">
                                    <h2 className="font-display font-bold text-2xl sm:text-3xl">
                                        Your Analysis <span className="text-primary">Awaits</span>
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Upload a clear, makeup-free selfie in natural lighting
                                    </p>
                                </div>

                                {/* Upload Area */}
                                <div
                                    onClick={() => !image && fileInputRef.current?.click()}
                                    className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden ${image
                                        ? "border-primary/50 bg-primary/5"
                                        : "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                                        }`}
                                >
                                    {image ? (
                                        <div className="relative aspect-square max-w-xs mx-auto p-4">
                                            <img
                                                src={image}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-xl shadow-soft"
                                            />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); clearImage(); }}
                                                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition btn-press"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                                className="absolute bottom-6 right-6 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition btn-press"
                                            >
                                                <Camera className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-16 px-6">
                                            <div className="p-5 bg-primary/10 rounded-2xl text-primary mb-4 group-hover:scale-110 transition-transform">
                                                <Upload className="w-10 h-10" />
                                            </div>
                                            <span className="font-display font-bold text-lg mb-1">Tap to Upload Photo</span>
                                            <p className="text-sm text-muted-foreground">JPG, PNG • Max 5MB</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold font-display">
                                        Describe your concerns <span className="text-muted-foreground font-normal">(optional)</span>
                                    </Label>
                                    <Textarea
                                        placeholder="e.g. Dry skin in winter, redness on cheeks, occasional breakouts..."
                                        className="h-24 resize-none rounded-xl border-border bg-card focus:border-primary transition-colors text-sm"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                {/* Analyze Button */}
                                <Button
                                    size="lg"
                                    className="w-full h-14 text-base font-bold rounded-2xl shadow-glow hover:shadow-glow-strong disabled:opacity-50 disabled:shadow-none transition-all btn-press"
                                    onClick={handleAnalyze}
                                    disabled={!image}
                                >
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Analyze My Skin
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    Your photo is analyzed securely and never stored
                                </p>
                            </motion.div>
                        )}

                        {/* Analyzing Step */}
                        {step === "analyzing" && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center px-6"
                            >
                                <div className="relative">
                                    <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold font-display">Analyzing your skin...</h2>
                                    <p className="text-muted-foreground max-w-xs">
                                        Our AI is detecting texture, concerns, and skin type to build your perfect routine.
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="w-2 h-2 rounded-full bg-primary animate-bounce"
                                            style={{ animationDelay: `${i * 0.15}s` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Results Step */}
                        {step === "results" && result && (
                            <motion.div
                                key="results"
                                ref={resultsRef}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                {/* Summary Card */}
                                <section className="text-center space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
                                        <Sparkles className="w-4 h-4" />
                                        {result.skin_type || "Analysis Complete"}
                                    </div>

                                    <div className="bg-card p-5 rounded-2xl shadow-soft border border-border/50">
                                        <p className="text-foreground/80 leading-relaxed text-sm">
                                            "{result.analysis_summary || 'Your personalized skincare routine is ready!'}"
                                        </p>
                                    </div>
                                </section>

                                {/* Issues */}
                                {result.issues_detected && result.issues_detected.length > 0 && (
                                    <section className="space-y-3">
                                        <h3 className="font-display font-bold text-lg flex items-center gap-2">
                                            <AlertCircle className="w-5 h-5 text-primary" />
                                            Issues Detected
                                        </h3>
                                        <div className="space-y-2">
                                            {result.issues_detected.map((issue, i) => {
                                                const style = getSeverityStyle(i);
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`${style.bg} ${style.border} border rounded-xl p-3 flex items-center justify-between card-hover`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-lg">{style.icon}</span>
                                                            <span className={`font-semibold ${style.text}`}>{issue}</span>
                                                        </div>
                                                        <span className={`text-xs font-bold ${style.text} uppercase`}>
                                                            {style.badge}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                )}

                                {/* Morning Routine */}
                                {result.routine?.morning && result.routine.morning.length > 0 && (
                                    <section className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                                                <span className="text-xl">☀️</span>
                                            </div>
                                            <div>
                                                <h3 className="font-display font-bold text-lg">Morning Routine</h3>
                                                <p className="text-xs text-muted-foreground">Start your day right</p>
                                            </div>
                                        </div>
                                        <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 scrollbar-hide snap-x">
                                            {result.routine.morning.map((s, i) => (
                                                <ProductCard key={i} step={s} index={i} />
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Evening Routine */}
                                {result.routine?.evening && result.routine.evening.length > 0 && (
                                    <section className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                                                <span className="text-xl">🌙</span>
                                            </div>
                                            <div>
                                                <h3 className="font-display font-bold text-lg">Evening Routine</h3>
                                                <p className="text-xs text-muted-foreground">Wind down and repair</p>
                                            </div>
                                        </div>
                                        <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 scrollbar-hide snap-x">
                                            {result.routine.evening.map((s, i) => (
                                                <ProductCard key={i} step={s} index={i} />
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Expert Advice */}
                                {result.advice && (
                                    <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl">
                                        <h3 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
                                            <span>💡</span> Expert Tips
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {typeof result.advice === 'object' && !Array.isArray(result.advice)
                                                ? Object.values(result.advice).join(' • ')
                                                : Array.isArray(result.advice)
                                                    ? result.advice.join(' • ')
                                                    : result.advice}
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="space-y-3 pt-4">
                                    <Button
                                        size="lg"
                                        className="w-full h-12 rounded-xl font-bold shadow-glow btn-press"
                                        onClick={() => window.open('https://nglow.co', '_blank')}
                                    >
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Shop All Products
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full h-12 rounded-xl font-semibold btn-press"
                                        onClick={() => {
                                            localStorage.removeItem(STORAGE_KEY);
                                            setStep("upload");
                                            setImage(null);
                                            setResult(null);
                                        }}
                                    >
                                        New Analysis
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card/95 backdrop-blur-lg border-t border-border/50 px-6 py-2 pb-safe flex justify-around items-center z-50">
                    <Link href="/" className="flex flex-col items-center gap-0.5 p-2 text-muted-foreground hover:text-primary transition">
                        <Home className="w-5 h-5" />
                        <span className="text-[10px] font-bold">Home</span>
                    </Link>
                    <button className="flex flex-col items-center gap-0.5 p-2 text-primary">
                        <BarChart2 className="w-5 h-5" />
                        <span className="text-[10px] font-bold">Analysis</span>
                    </button>
                    <button
                        onClick={() => window.open('https://nglow.co', '_blank')}
                        className="flex flex-col items-center gap-0.5 p-2 text-muted-foreground hover:text-primary transition"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span className="text-[10px] font-bold">Shop</span>
                    </button>
                    <button className="flex flex-col items-center gap-0.5 p-2 text-muted-foreground hover:text-primary transition">
                        <User className="w-5 h-5" />
                        <span className="text-[10px] font-bold">Profile</span>
                    </button>
                </nav>
            </div>
        </div>
    );
}

// Product Card Component
function ProductCard({ step, index }: { step: RoutineStep; index: number }) {
    return (
        <div className="snap-center shrink-0 w-56 bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50 card-hover">
            {/* Step Badge */}
            <div className="relative">
                <div className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
                    STEP {index + 1}
                </div>
                <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                    {step.image_url ? (
                        <img
                            src={step.image_url}
                            alt={step.title || step.product_name || 'Product'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <span className="text-4xl">🧴</span>
                    )}
                </div>
            </div>
            <div className="p-3 space-y-2">
                <h4 className="font-display font-bold text-sm line-clamp-1">
                    {step.title || step.product_name || 'Product'}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {step.instruction || 'Apply as directed'}
                </p>
                <div className="flex items-center justify-between pt-1">
                    <span className="font-bold text-primary text-sm">
                        Rs {step.price || '0'}
                    </span>
                    <button
                        onClick={() => window.open(step.product_url || 'https://nglow.co', '_blank')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition btn-press"
                    >
                        Buy <ExternalLink className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
