import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-[100%] blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 rounded-[100%] blur-3xl -z-10 pointer-events-none" />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter text-foreground">
          Jild<span className="text-primary">Max</span>.
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="#" className="hover:text-primary transition-colors">Science</Link>
          <Link href="#" className="hover:text-primary transition-colors">Reviews</Link>
        </div>
        <Button variant="ghost">Sign In</Button>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Dermatology Grade Analysis</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl">
          Skincare that actually <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            understands your skin.
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Upload a selfie and let our advanced medical AI analyze your unique skin profile to build a personalized 30-day routine.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-8">
          <Link href="/analyze">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              Start Free Analysis <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 w-full max-w-5xl">
          {[
            {
              icon: Sparkles,
              title: "AI Analysis",
              desc: "Detects acne, texture, and hydration levels with 98% accuracy."
            },
            {
              icon: Clock,
              title: "Instant Results",
              desc: "Get your personalized AM/PM routine in under 30 seconds."
            },
            {
              icon: ShieldCheck,
              title: "Derm-Approved",
              desc: "Recommendations based on clinical ingredients, not trends."
            }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/20 transition-colors">
              <div className="p-3 bg-secondary/30 rounded-xl mb-4 text-primary">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
