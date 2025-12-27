import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Clock, Star, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-[100%] blur-3xl -z-10 pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-gradient-to-tl from-primary/10 via-transparent to-transparent rounded-[100%] blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-bold tracking-tight hover:opacity-80 transition-opacity">
            Jild<span className="text-primary">Max</span>
            <span className="text-primary">.</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-semibold text-muted-foreground">
            <Link href="#how-it-works" className="hover:text-primary transition-colors duration-200">How it Works</Link>
            <Link href="#features" className="hover:text-primary transition-colors duration-200">Features</Link>
            <Link href="https://nglow.co" target="_blank" className="hover:text-primary transition-colors duration-200">Shop</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="font-semibold hidden sm:flex">Sign In</Button>
            <Link href="/analyze" className="md:hidden">
              <Button size="sm" className="rounded-full font-bold shadow-glow">
                Start
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-28 md:pt-36 pb-16 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20 mb-8">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Dermatology Analysis</span>
          <ChevronRight className="w-4 h-4" />
        </div>

        {/* Main Heading */}
        <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-foreground max-w-4xl leading-[1.1] mb-6" style={{ animationDelay: '0.1s' }}>
          Skincare that{" "}
          <span className="gradient-text">truly understands</span>
          {" "}your skin
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10" style={{ animationDelay: '0.2s' }}>
          Upload a selfie and let our medical-grade AI analyze your unique skin profile.
          Get a personalized routine in under 30 seconds.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 w-full justify-center mb-16" style={{ animationDelay: '0.3s' }}>
          <Link href="/analyze">
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-bold rounded-2xl shadow-glow hover:shadow-glow-strong hover:scale-[1.02] transition-all duration-300 btn-press w-full sm:w-auto"
            >
              Start Free Analysis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="https://nglow.co" target="_blank">
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg font-semibold rounded-2xl border-2 hover:bg-primary/5 transition-all duration-300 btn-press w-full sm:w-auto"
            >
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground mb-20" style={{ animationDelay: '0.4s' }}>
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-background flex items-center justify-center text-xs font-bold text-primary">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="font-medium">Trusted by <strong className="text-foreground">2,500+</strong> users</span>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            {
              icon: Sparkles,
              title: "AI Analysis",
              desc: "Detects acne, texture, redness, and hydration levels with clinical accuracy.",
              gradient: "from-blue-500 to-cyan-400",
              delay: "0.5s"
            },
            {
              icon: Clock,
              title: "Instant Results",
              desc: "Get your personalized AM/PM skincare routine in under 30 seconds.",
              gradient: "from-orange-400 to-amber-400",
              delay: "0.6s"
            },
            {
              icon: ShieldCheck,
              title: "Derm-Approved",
              desc: "Recommendations based on clinical research and dermatologist insights.",
              gradient: "from-emerald-500 to-teal-400",
              delay: "0.7s"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="animate-fade-in-up flex flex-col items-center p-8 bg-card rounded-2xl border border-border/50 shadow-soft card-hover cursor-pointer group"
              style={{ animationDelay: feature.delay }}
            >
              <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-center leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground mb-4">Ready to discover your perfect routine?</p>
          <Link href="/analyze">
            <Button size="lg" className="rounded-full font-bold shadow-glow hover:shadow-glow-strong btn-press">
              Get Started — It's Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>© 2024 JildMax. Powered by NGlow Skincare.</p>
      </footer>
    </div>
  );
}
