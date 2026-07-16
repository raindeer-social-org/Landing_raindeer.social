'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroMesh from '@/components/hero-mesh';
import AgentMeshDiagram from '@/components/AgentMeshDiagram';
import { GridBackground } from '@/components/ui/grid-background';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import confetti from 'canvas-confetti';
import { 
  Users, 
  Check, 
  HelpCircle, 
  TrendingUp, 
  Cpu, 
  BrainCircuit, 
  FileText, 
  Palette, 
  Calendar, 
  ChevronDown
} from 'lucide-react';

// Counter component that counts up once when scrolled into view
function Counter({ end, duration = 1.5, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function Home() {
  const [logoCompleted, setLogoCompleted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  
  // Waitlist form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [consentMandatory, setConsentMandatory] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [cohortSlot, setCohortSlot] = useState(0);

  const agentWords = [
    "10 AI agents.",
    "a Copywriter.",
    "a Designer.",
    "a Researcher.",
    "a Scheduler.",
    "an Analyst.",
    "an SEO Expert.",
    "a QA Editor.",
    "a Publisher.",
    "a Strategist."
  ];

  // Headline rotation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % agentWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Active mockup step loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Under the Hood Accordion State
  const [activeDebugRow, setActiveDebugRow] = useState<number | null>(1);

  // Form submission handler with bulletproof fallback URLs
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      name,
      email,
      phone,
      companySize,
      consentMandatory,
      consentMarketing
    };

    // Fallback urls checked sequentially
    const endpoints = [
      '/api/register',
      'http://localhost:3000/api/register',
      'http://localhost:3001/api/register',
      'http://localhost:3002/api/register',
      'http://localhost:3003/api/register',
      'http://localhost:3004/api/register',
      'http://localhost:3005/api/register',
      'http://localhost:3006/api/register'
    ];

    let success = false;
    let errorText = 'Registration failed. Please try again.';

    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          success = true;
          break;
        } else {
          const resData = await response.json().catch(() => ({}));
          errorText = resData.error || errorText;
        }
      } catch (err) {
        // Fallback sequentially
      }
    }

    setIsSubmitting(false);

    if (success) {
      setSubmitSuccess(true);
      const slotNum = Math.floor(Math.random() * 100) + 1200;
      setCohortSlot(slotNum);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setSubmitError(errorText);
    }
  };

  const steps = [
    {
      badge: 'Done',
      title: 'Trend Scan',
      log: 'Scanning reddit/r/saas & twitter for keywords...\nFound high-growth thread: "Replace social agency with AI"\nIdea velocity score: 92/100',
      color: 'text-brand-start'
    },
    {
      badge: 'Done',
      title: 'Brand Brain',
      log: 'Connecting to Qdrant Vector database...\nRetrieved brand book guidelines:\n- Style: technical, precise, clean light theme\n- Avoid: generic buzzwords, emojis as icons\nContext anchored successfully.',
      color: 'text-brand-start'
    },
    {
      badge: 'Done',
      title: 'Crew Generation',
      log: 'Invoking CrewAI Agents (Researcher -> Writer -> Editor)\nDrafting copy for X and LinkedIn...\nGenerating canvases on Flux.1...\nQA agent verified copy compliance.',
      color: 'text-brand-start'
    },
    {
      badge: 'Active',
      title: 'Optimal Schedule',
      log: 'Checking audience Bayesian priority weights...\nPeak interaction slot calculated: Friday 5:30 PM IST\nScheduling post queued [bayes_slot_04].',
      color: 'text-status-green'
    }
  ];

  const testimonials = [
    {
      quote: "raindeer.social replaced our entire content agency workflow. We save over ₹40,000/mo and get highly engaging posts designed and published on autopilot.",
      name: "Sachin Sharma",
      role: "CEO",
      company: "Hoblix",
      metric: "₹40,000/mo Saved",
      metricLabel: "Marketing and operational costs cut entirely",
      logo: "Hoblix"
    },
    {
      quote: "Managing premarital health campaigns requires extremely precise, grounded copy. The Brand Brain feature ensures our tone is perfectly aligned with zero hallucinations.",
      name: "Sachin Verma",
      role: "Founder",
      company: "Slay Health",
      metric: "Zero Hallucinations",
      metricLabel: "Perfect brand compliance and clinical safety",
      logo: "Slay"
    },
    {
      quote: "Our student outreach campaigns saw a 2.5x engagement boost when we let the Bayesian scheduler decide publishing times. It knows exactly when our audience is active.",
      name: "Newton School of Technology",
      role: "Delhi NCR Campus Partnership",
      company: "NST",
      metric: "2.5x Engagement",
      metricLabel: "Boost in admissions applications and clicks",
      logo: "NST"
    }
  ];

  return (
    <GridBackground>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Logo Assembly & Hero Copy (Left) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* SVG Constellation logo assembly */}
            <div className="w-40 h-40 mb-2 self-start">
              <HeroMesh onComplete={() => setLogoCompleted(true)} />
            </div>

            <AnimatePresence>
              {(logoCompleted || typeof window === 'undefined') && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col gap-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-start/5 border border-brand-start/20 rounded-full self-start">
                    <span className="w-2 h-2 rounded-full bg-brand-start animate-pulse" />
                    <span className="font-mono text-xs font-semibold text-brand-start">
                      V1.0 Early Access Release
                    </span>
                  </div>

                  <h1 className="font-display font-bold text-ink text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] min-h-[160px] md:min-h-[180px]">
                    Replace your social media team with{' '}
                    <span className="block h-[1.25em] relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={wordIndex}
                          initial={{ y: 24, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -24, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="absolute left-0 bottom-0 bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent font-bold"
                        >
                          {agentWords[wordIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </h1>

                  <p className="font-sans text-lg text-body-text leading-relaxed">
                    A single autonomous operating system that researches trends, designs visuals, writes copy, and schedules posts — on autopilot. Built for builders, creators, and SMBs.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-2">
                    <HoverBorderButton href="#waitlist" primary>Join Waitlist</HoverBorderButton>
                    <HoverBorderButton href="#how-it-works">See How It Works</HoverBorderButton>
                  </div>

                  <div className="flex items-center gap-2 mt-4 font-sans text-sm text-body-text/90">
                    <Users className="w-4 h-4 text-brand-start" />
                    <span>Join 1,248+ builders and creators. Only 12 spots left in this cohort.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive CSS Product Preview Mockup (Right) */}
          <div className="lg:col-span-6 relative w-full">
            <div className="rounded-3xl border border-hairline bg-white shadow-xl overflow-hidden" id="product-mockup">
              
              {/* URL / Window Bar */}
              <div className="bg-canvas border-b border-hairline px-6 py-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="font-mono text-xs text-body-text/60 px-6 py-1 bg-white border border-hairline/60 rounded-lg max-w-[240px] truncate">
                  raindeer.social/dashboard
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-start font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-brand-start animate-ping" />
                  <span>Active Mesh</span>
                </div>
              </div>

              {/* Sidebar + Main body */}
              <div className="flex h-[360px] md:h-[420px]">
                {/* Sidebar */}
                <aside className="w-40 border-r border-hairline bg-canvas p-4 hidden md:flex flex-col gap-6">
                  <div className="flex items-center gap-2 font-display font-bold text-ink text-sm">
                    <img 
                      src="/logo-mark.png" 
                      alt="raindeer" 
                      className="w-5 h-5 rounded object-contain"
                    />
                    <span>raindeer</span>
                  </div>
                  <ul className="flex flex-col gap-1 text-xs font-semibold text-body-text">
                    <li className="px-3 py-2 rounded-lg bg-brand-start/5 text-brand-start">Overview</li>
                    <li className="px-3 py-2 rounded-lg hover:bg-hairline/30">Planner & Calendar</li>
                    <li className="px-3 py-2 rounded-lg hover:bg-hairline/30">AI Agent Mesh</li>
                    <li className="px-3 py-2 rounded-lg hover:bg-hairline/30">Brand Brain</li>
                    <li className="px-3 py-2 rounded-lg hover:bg-hairline/30">Asset Library</li>
                  </ul>
                </aside>

                {/* Workspace Content */}
                <main className="flex-1 p-6 flex flex-col justify-between overflow-hidden bg-white">
                  <div>
                    <div className="flex items-center justify-between border-b border-hairline pb-4 mb-4">
                      <div>
                        <h4 className="font-display font-bold text-ink text-sm">Campaign Workspace</h4>
                        <p className="font-sans text-xs text-body-text">Live multi-agent coordination</p>
                      </div>
                      <div className="hidden sm:flex gap-2">
                        <span className="px-2 py-0.5 rounded bg-brand-start/5 text-brand-start text-[10px] font-semibold font-mono">CrewAI Active</span>
                      </div>
                    </div>

                    {/* Step visualization rows */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {steps.map((s, idx) => (
                        <div
                          key={s.title}
                          className={`p-2.5 rounded-xl border transition-all duration-300 ${
                            activeStep === idx + 1
                              ? 'border-brand-start/20 bg-brand-start/5'
                              : 'border-hairline bg-canvas'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-mono text-body-text/60">0{idx + 1}</span>
                            <span className={`text-[8px] font-mono font-bold ${
                              s.badge === 'Active' ? 'text-status-green animate-pulse' : 'text-brand-start'
                            }`}>
                              {s.badge}
                            </span>
                          </div>
                          <div className="font-display font-bold text-[10px] text-ink truncate">
                            {s.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typed console output display box */}
                  <div className="bg-canvas border border-hairline p-4 rounded-2xl h-[160px] flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 border-b border-hairline/50 pb-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-brand-start" />
                      <span className="font-mono text-[9px] font-bold text-ink">
                        {activeStep === 1 ? 'trend_scan.sh' : activeStep === 2 ? 'brand_ground.py' : activeStep === 3 ? 'coordinate_crewai.py' : 'bayes_schedule.bin'}
                      </span>
                    </div>
                    <div className="flex-1 font-mono text-[10px] text-body-text leading-normal whitespace-pre-line overflow-y-auto">
                      {steps[activeStep - 1].log}
                    </div>
                  </div>
                </main>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ===== PARTNERS MARQUEE SYSTEM ===== */}
      <section className="py-8 bg-canvas border-y border-hairline overflow-hidden">
        <div className="text-center mb-6">
          <p className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-body-text/80">
            <span className="w-6 h-[1px] bg-hairline-bold" />
            Strategic partnerships & deployed campaigns
            <span className="w-6 h-[1px] bg-hairline-bold" />
          </p>
        </div>
        <div className="relative w-full flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-12 items-center py-4">
            <div className="inline-flex items-center gap-12">
              <MarqueeItem src="/assets/hobblix_logo.png" alt="Hoblix" />
              <MarqueeItem src="/assets/slayhealth_image.png" alt="Slay Health" />
              <MarqueeItem src="/assets/nst.png" alt="Newton School of Technology" />
              <MarqueeItem src="/assets/hobblix_logo.png" alt="Hoblix" />
              <MarqueeItem src="/assets/slayhealth_image.png" alt="Slay Health" />
              <MarqueeItem src="/assets/nst.png" alt="Newton School of Technology" />
            </div>
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 items-center py-4">
            <div className="inline-flex items-center gap-12">
              <MarqueeItem src="/assets/hobblix_logo.png" alt="Hoblix" />
              <MarqueeItem src="/assets/slayhealth_image.png" alt="Slay Health" />
              <MarqueeItem src="/assets/nst.png" alt="Newton School of Technology" />
              <MarqueeItem src="/assets/hobblix_logo.png" alt="Hoblix" />
              <MarqueeItem src="/assets/slayhealth_image.png" alt="Slay Health" />
              <MarqueeItem src="/assets/nst.png" alt="Newton School of Technology" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION (TRACING BEAM) ===== */}
      <section className="section bg-canvas/40 border-y border-hairline py-20" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-brand-start font-bold">
            The Operation Engine
          </span>
          <h2 className="font-display font-bold text-ink text-3xl md:text-4xl mt-2 tracking-tight">
            How raindeer.social works
          </h2>
          <p className="font-sans text-body-text mt-3 max-w-xl mx-auto">
            10 specialized autonomous agents coordinating in real-time to replace standard weekly agency output loops.
          </p>
        </div>

        <TracingBeam>
          <div className="flex flex-col gap-16 md:gap-24 relative max-w-2xl mx-auto pl-8">
            
            {/* Step 1 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-start/10 text-brand-start flex items-center justify-center font-mono text-sm font-bold border border-brand-start/20">
                  1
                </span>
                <h3 className="font-display font-bold text-ink text-xl md:text-2xl tracking-tight">
                  Scan & Ingest
                </h3>
              </div>
              <p className="font-sans text-body-text leading-relaxed">
                Our Trend Ingestion agent monitors news platforms, high-velocity topics on Reddit, Google Trends, and developer-centric feeds on X in real-time, mapping content angles suitable to your business.
              </p>
              <div className="p-3 bg-white border border-hairline rounded-2xl inline-flex self-start items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-brand-start animate-pulse" />
                <span className="font-mono text-xs text-ink font-semibold">Running: fetch_reddit_x_trends --interval=30s</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-start/10 text-brand-start flex items-center justify-center font-mono text-sm font-bold border border-brand-start/20">
                  2
                </span>
                <h3 className="font-display font-bold text-ink text-xl md:text-2xl tracking-tight">
                  Ground on Brand Brain
                </h3>
              </div>
              <p className="font-sans text-body-text leading-relaxed">
                We embed your brand deck, guidelines, tone parameters, and product details into a Qdrant Knowledge Graph. The Brand Brain queries this memory model before generating copy, enforcing absolute voice consistency.
              </p>
              <div className="p-3 bg-white border border-hairline rounded-2xl inline-flex self-start items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-brand-start animate-pulse" />
                <span className="font-mono text-xs text-ink font-semibold">Running: query_qdrant_db --ground=vector</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-start/10 text-brand-start flex items-center justify-center font-mono text-sm font-bold border border-brand-start/20">
                  3
                </span>
                <h3 className="font-display font-bold text-ink text-xl md:text-2xl tracking-tight">
                  Collaborative Generation
                </h3>
              </div>
              <p className="font-sans text-body-text leading-relaxed">
                Specialized writer, visual designer, and quality assurance editor agents cooperate using a hierarchical CrewAI configuration to build caption copies, carousel frameworks, and custom layout visuals.
              </p>
              <div className="p-3 bg-white border border-hairline rounded-2xl inline-flex self-start items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-brand-start animate-pulse" />
                <span className="font-mono text-xs text-ink font-semibold">Running: coordinate_crewai_mesh --nodes=10</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-start/10 text-brand-start flex items-center justify-center font-mono text-sm font-bold border border-brand-start/20">
                  4
                </span>
                <h3 className="font-display font-bold text-ink text-xl md:text-2xl tracking-tight">
                  Bayesian Scheduling
                </h3>
              </div>
              <p className="font-sans text-body-text leading-relaxed">
                The scheduling agent maps historic engagement graphs, audience click densities, and active platform parameters to publish the finished drafts automatically at the most optimal hour, bypassing feed algorithms.
              </p>
              <div className="p-3 bg-white border border-hairline rounded-2xl inline-flex self-start items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
                <span className="font-mono text-xs text-ink font-semibold">Running: calculate_optimal_post_time --algo=bayes</span>
              </div>
            </div>

          </div>
        </TracingBeam>
      </section>

      {/* ===== AI AGENT MESH SECTION ===== */}
      <section className="section py-20" id="agents">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-brand-start font-bold">
            The Agent Ecosystem
          </span>
          <h2 className="font-display font-bold text-ink text-3xl md:text-4xl mt-2 tracking-tight">
            10 Specialized Agents Coordinated in Real-Time
          </h2>
          <p className="font-sans text-body-text mt-3 max-w-xl mx-auto">
            Our hierarchical agent mesh runs on CrewAI and LangGraph, routing context through a Brand Knowledge Graph.
          </p>
        </div>

        {/* Dynamic Network Diagram */}
        <div className="px-6 mb-12">
          <AgentMeshDiagram />
        </div>

        {/* Bento Grid layout representing the agents */}
        <div className="max-w-6xl mx-auto px-6">
          <BentoGrid>
            <BentoGridItem
              id="bento-orchestrator"
              className="md:col-span-2"
              icon={<Cpu className="w-6 h-6 text-brand-start" />}
              badge={<span className="px-2 py-0.5 rounded bg-brand-start/5 text-brand-start text-[10px] font-mono font-semibold">Master Hub</span>}
              title="Master Orchestrator"
              description="Coordinates all other agents using LangGraph state graphs. Routes jobs based on complexity, manages fallback workflows, and enforces safety constraints before any post is published."
            />
            <BentoGridItem
              id="bento-trend"
              icon={<TrendingUp className="w-6 h-6 text-brand-start" />}
              title="Trend Intelligence"
              description="Monitors high-velocity keywords on Google Trends, X, and Reddit. Scores ideas based on relevance to your brand core."
            />
            <BentoGridItem
              id="bento-brand"
              icon={<BrainCircuit className="w-6 h-6 text-brand-start" />}
              title="Brand Brain"
              description="Constructs and queries your Brand Knowledge Graph using Qdrant vector memory. Prevents your brand voice from drifting over time."
            />
            <BentoGridItem
              id="bento-content"
              className="md:col-span-2"
              icon={<FileText className="w-6 h-6 text-brand-start" />}
              title="Content Creation Crew"
              description="A multi-agent pipeline using CrewAI: Researcher -> Copywriter -> Editor -> Quality Assurance. Writes captions tailored for LinkedIn, X, and Instagram separately."
            />
            <BentoGridItem
              id="bento-visuals"
              icon={<Palette className="w-6 h-6 text-brand-start" />}
              title="Visual Content Agent"
              description="Generates custom canvas layouts, structured infographics, and on-brand image elements using Flux.1 models."
            />
            <BentoGridItem
              id="bento-scheduler"
              className="md:col-span-2"
              icon={<Calendar className="w-6 h-6 text-brand-start" />}
              title="Bayesian Scheduler"
              description="Learns from your historical engagement trends. Calculates the exact minute a post should go live to maximize reach and bypass algorithms."
            />
          </BentoGrid>
        </div>
      </section>

      {/* ===== UNDER THE HOOD ACCORDION SECTION ===== */}
      <section className="section py-20 bg-canvas/40 border-y border-hairline" id="calm">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-brand-start font-bold">
            Under the Hood
          </span>
          <h2 className="font-display font-bold text-ink text-3xl md:text-4xl mt-2 tracking-tight">
            Complex Underneath, Simple on Top
          </h2>
          <p className="font-sans text-body-text mt-3 max-w-xl mx-auto">
            Expand process cards to inspect detailed system tasks running in the background.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6">
          <div className="border border-hairline rounded-3xl bg-white shadow-md overflow-hidden">
            
            {/* Accordion 1 */}
            <div className="border-b border-hairline">
              <button
                onClick={() => setActiveDebugRow(activeDebugRow === 1 ? null : 1)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeDebugRow === 1 ? 'bg-brand-start animate-pulse' : 'bg-body-text/30'}`} />
                  <span className="font-mono text-sm font-bold text-ink">[SYS_OK] scan_brand_identity --ground=vector</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-ink transition-transform duration-300 ${activeDebugRow === 1 ? 'transform rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDebugRow === 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-canvas/40"
                  >
                    <div className="p-6 pt-0 font-sans text-sm text-body-text leading-relaxed">
                      Retrieves your unique brand voice guidelines, target customer personas, and style rules from memory so the output is always on-brand.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2 */}
            <div className="border-b border-hairline">
              <button
                onClick={() => setActiveDebugRow(activeDebugRow === 2 ? null : 2)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeDebugRow === 2 ? 'bg-brand-start animate-pulse' : 'bg-body-text/30'}`} />
                  <span className="font-mono text-sm font-bold text-ink">[SYS_OK] fetch_reddit_x_trends --interval=30s</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-ink transition-transform duration-300 ${activeDebugRow === 2 ? 'transform rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDebugRow === 2 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-canvas/40"
                  >
                    <div className="p-6 pt-0 font-sans text-sm text-body-text leading-relaxed">
                      Continuously scans social feeds and search engines for hot topics relevant to your business domain.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3 */}
            <div className="border-b border-hairline">
              <button
                onClick={() => setActiveDebugRow(activeDebugRow === 3 ? null : 3)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeDebugRow === 3 ? 'bg-brand-start animate-pulse' : 'bg-body-text/30'}`} />
                  <span className="font-mono text-sm font-bold text-ink">[SYS_OK] coordinate_crewai_mesh --nodes=10</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-ink transition-transform duration-300 ${activeDebugRow === 3 ? 'transform rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDebugRow === 3 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-canvas/40"
                  >
                    <div className="p-6 pt-0 font-sans text-sm text-body-text leading-relaxed">
                      Coordinates writer, designer, and editor agents to generate matching caption drafts and custom graphic visuals.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 4 */}
            <div>
              <button
                onClick={() => setActiveDebugRow(activeDebugRow === 4 ? null : 4)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeDebugRow === 4 ? 'bg-brand-start animate-pulse' : 'bg-body-text/30'}`} />
                  <span className="font-mono text-sm font-bold text-ink">[SYS_OK] calculate_optimal_post_time --algo=bayes</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-ink transition-transform duration-300 ${activeDebugRow === 4 ? 'transform rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDebugRow === 4 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-canvas/40"
                  >
                    <div className="p-6 pt-0 font-sans text-sm text-body-text leading-relaxed">
                      Calculates the exact minute your audience is most active and automatically publishes the post to your social profiles.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ===== METRICS & STATISTICS SECTION ===== */}
      <section className="section py-20" id="market-stats">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-brand-start font-bold">
              Metrics & Stats
            </span>
            <h2 className="font-display font-bold text-ink text-3xl md:text-4xl mt-2 tracking-tight">
              Riding the future of creator and SMB economy
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white border border-hairline p-6 rounded-3xl shadow-sm">
              <div className="text-3xl md:text-4xl font-display font-bold text-ink mb-1">
                <Counter end={10} />
              </div>
              <div className="text-xs font-sans text-body-text font-medium">Collaborating AI Agents</div>
            </div>
            <div className="bg-white border border-hairline p-6 rounded-3xl shadow-sm">
              <div className="text-3xl md:text-4xl font-display font-bold text-ink mb-1">
                <Counter end={88} suffix="%" />
              </div>
              <div className="text-xs font-sans text-body-text font-medium">Average Time Saved*</div>
            </div>
            <div className="bg-white border border-hairline p-6 rounded-3xl shadow-sm">
              <div className="text-3xl md:text-4xl font-display font-bold text-ink mb-1">
                <Counter end={70} suffix="%" />
              </div>
              <div className="text-xs font-sans text-body-text font-medium">Cost Saved vs. Agencies*</div>
            </div>
            <div className="bg-white border border-hairline p-6 rounded-3xl shadow-sm">
              <div className="text-3xl md:text-4xl font-display font-bold text-ink mb-1">
                <Counter end={5} suffix=" Min" />
              </div>
              <div className="text-xs font-sans text-body-text font-medium">Setup Time</div>
            </div>
          </div>

          <div className="text-center font-sans text-[11px] text-body-text/70 mt-6 max-w-xl mx-auto leading-relaxed">
            *Estimates based on beta cohort user data tracking compared to typical agency workflow hours and pricing (approx. ₹35,000/mo).
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="section py-20 bg-canvas/40 border-y border-hairline" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-brand-start font-bold">
              Pricing Plans
            </span>
            <h2 className="font-display font-bold text-ink text-3xl md:text-4xl mt-2 tracking-tight">
              Simple pricing. No agency markups.
            </h2>
            <p className="font-sans text-body-text mt-3">
              Save up to ₹40,000 every month compared to hiring a traditional social media manager.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <SpotlightCard className="flex flex-col justify-between h-full bg-white">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-display font-bold text-ink text-lg uppercase tracking-wider text-body-text/80">Starter</h3>
                  <div className="flex items-baseline mt-4 gap-1">
                    <span className="text-4xl font-display font-bold text-ink">₹999</span>
                    <span className="text-xs text-body-text">/mo</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 font-sans text-sm text-body-text">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>3 Social Profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>60 Scheduled Posts/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>Brand Brain integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>AI Text generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>Human-in-the-loop review</span>
                  </li>
                </ul>
              </div>
              <HoverBorderButton href="#waitlist" className="w-full mt-8">Join Waitlist</HoverBorderButton>
            </SpotlightCard>

            {/* Growth Plan (Featured) */}
            <SpotlightCard active className="flex flex-col justify-between h-full relative bg-white">
              <div className="absolute top-6 right-6 bg-brand-start/10 border border-brand-start/30 rounded-full px-3 py-1 text-[10px] font-bold text-brand-start font-mono">
                POPULAR
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-display font-bold text-brand-start text-lg uppercase tracking-wider">Growth</h3>
                  <div className="flex items-baseline mt-4 gap-1">
                    <span className="text-4xl font-display font-bold text-ink">₹2,499</span>
                    <span className="text-xs text-body-text">/mo</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 font-sans text-sm text-body-text">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span className="font-semibold text-ink">5 Social Profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span className="font-semibold text-ink">200 Scheduled Posts/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>Flux.1 Image generator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>Trend Intelligence alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>Auto-approve workflows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>Engagement analytics</span>
                  </li>
                </ul>
              </div>
              <HoverBorderButton href="#waitlist" primary className="w-full mt-8">Join Waitlist</HoverBorderButton>
            </SpotlightCard>

            {/* Agency Plan */}
            <SpotlightCard className="flex flex-col justify-between h-full bg-white">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-display font-bold text-ink text-lg uppercase tracking-wider text-body-text/80">Agency</h3>
                  <div className="flex items-baseline mt-4 gap-1">
                    <span className="text-4xl font-display font-bold text-ink">₹6,999</span>
                    <span className="text-xs text-body-text">/mo</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 font-sans text-sm text-body-text">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>15 Social Profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>600 Scheduled Posts/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>Client dashboard workspaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>A/B testing engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>Slack integration approval</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-start flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
              <HoverBorderButton href="#waitlist" className="w-full mt-8">Join Waitlist</HoverBorderButton>
            </SpotlightCard>
          </div>

          {/* Table Comparison */}
          <div className="max-w-5xl mx-auto mt-16 overflow-x-auto bg-white border border-hairline p-8 rounded-3xl shadow-sm">
            <h3 className="font-display font-bold text-ink text-xl mb-6 text-center">raindeer.social vs. Traditional Agency</h3>
            <table className="w-full border-collapse text-left text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-hairline/80 font-display font-bold text-ink text-xs uppercase tracking-wider">
                  <th className="pb-4">Feature / Resource</th>
                  <th className="pb-4 text-brand-start">raindeer.social</th>
                  <th className="pb-4">Traditional Agency</th>
                  <th className="pb-4">Buffer / Later</th>
                </tr>
              </thead>
              <tbody className="font-sans text-body-text">
                <tr className="border-b border-hairline/50">
                  <td className="py-4 font-semibold text-ink">Monthly Cost</td>
                  <td className="py-4 text-brand-start font-mono font-bold">₹999 - ₹6,999</td>
                  <td className="py-4 font-mono text-xs">₹35,000 - ₹75,000</td>
                  <td className="py-4 font-mono text-xs">₹1,500 - ₹12,000 + Content Costs</td>
                </tr>
                <tr className="border-b border-hairline/50">
                  <td className="py-4 font-semibold text-ink">Content Generation</td>
                  <td className="py-4 text-brand-start font-medium">Autonomous AI Agents (Flux + Claude)</td>
                  <td className="py-4">Manual copywriting & graphic design</td>
                  <td className="py-4">None (You write & design everything)</td>
                </tr>
                <tr className="border-b border-hairline/50">
                  <td className="py-4 font-semibold text-ink">Trend Hijacking</td>
                  <td className="py-4 text-brand-start font-medium">Real-time Reddit & X scanning (30s)</td>
                  <td className="py-4">Slow weekly/monthly meetings</td>
                  <td className="py-4">None (Manual setup only)</td>
                </tr>
                <tr className="border-b border-hairline/50">
                  <td className="py-4 font-semibold text-ink">Feedback Loops</td>
                  <td className="py-4 text-brand-start font-medium">Instant Brand Brain tone grounding</td>
                  <td className="py-4">Endless email threads & Slack drama</td>
                  <td className="py-4">None (Self-managed)</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-ink">Speed to Publish</td>
                  <td className="py-4 text-brand-start font-mono font-bold">5 Minutes</td>
                  <td className="py-4 font-mono text-xs">3 - 5 Days approval loop</td>
                  <td className="py-4 font-mono text-xs">Hours (Manual creation)</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="section py-20" id="testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-brand-start font-bold">
              User Endorsements
            </span>
            <h2 className="font-display font-bold text-ink text-3xl md:text-4xl mt-2 tracking-tight">
              Trusted by creators and innovators
            </h2>
          </div>

          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>

      {/* ===== WAITLIST REGISTRATION SECTION ===== */}
      <section className="section py-20 bg-canvas/40 border-y border-hairline" id="waitlist">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mx-auto text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-brand-start font-bold">
              Early Access
            </span>
            <h2 className="font-display font-bold text-ink text-3xl md:text-4xl mt-2 tracking-tight">
              Join the waitlist today.
            </h2>
            <p className="font-sans text-body-text mt-3">
              We release spots weekly in cohorts. Save your spot now to build your Brand Knowledge Graph for free.
            </p>
          </div>

          <div className="max-w-xl mx-auto flex flex-col gap-8">
            {/* Student Innovator story block */}
            <div className="bg-white border border-hairline p-6 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-brand-start/5 text-brand-start flex items-center justify-center border border-brand-start/15">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-ink text-sm">Built by Student Innovators</h4>
                  <p className="font-sans text-xs text-body-text">Origin: Newton School of Technology, Delhi NCR</p>
                </div>
              </div>
              <p className="font-sans text-sm text-body-text italic leading-relaxed">
                &ldquo;We are students building the best social media OS in the space. In partnership with our university&apos;s marketing team, we are training our agent mesh on real client datasets. When you sign up, you aren&apos;t just trying software — you are collaborating with the next generation of creators.&rdquo;
              </p>
            </div>

            {/* Waitlist submission form card */}
            <div className="bg-white border border-hairline p-8 rounded-3xl shadow-md">
              {!submitSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {submitError && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="waitlist-name" className="text-xs font-semibold text-ink">Your Name</label>
                    <input
                      type="text"
                      id="waitlist-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-hairline bg-canvas focus:outline-none focus:border-brand-start text-ink font-sans text-sm"
                      placeholder="Aman Gupta"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="waitlist-email" className="text-xs font-semibold text-ink">Work Email</label>
                    <input
                      type="email"
                      id="waitlist-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-hairline bg-canvas focus:outline-none focus:border-brand-start text-ink font-sans text-sm"
                      placeholder="aman@yourcompany.in"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="waitlist-phone" className="text-xs font-semibold text-ink">Phone Number</label>
                    <input
                      type="tel"
                      id="waitlist-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-hairline bg-canvas focus:outline-none focus:border-brand-start text-ink font-sans text-sm"
                      placeholder="+91 99999 99999"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="waitlist-company" className="text-xs font-semibold text-ink">Company Size</label>
                    <select
                      id="waitlist-company"
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-hairline bg-canvas focus:outline-none focus:border-brand-start text-ink font-sans text-sm cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select company size...</option>
                      <option value="creator">Solo Creator / Founder</option>
                      <option value="1-5">1 - 5 employees</option>
                      <option value="6-20">6 - 20 employees</option>
                      <option value="21-100">21 - 100 employees</option>
                      <option value="100+">100+ employees</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 text-left mt-2">
                    <label className="flex items-start gap-2.5 text-xs text-body-text cursor-pointer leading-normal">
                      <input
                        type="checkbox"
                        checked={consentMandatory}
                        onChange={(e) => setConsentMandatory(e.target.checked)}
                        className="mt-0.5 accent-brand-start"
                        required
                      />
                      <span>I agree to be contacted by raindeer.social regarding my enquiry and understand that an executive may reach out via email, phone, or WhatsApp. <span className="text-brand-start">*</span></span>
                    </label>

                    <label className="flex items-start gap-2.5 text-xs text-body-text cursor-pointer leading-normal">
                      <input
                        type="checkbox"
                        checked={consentMarketing}
                        onChange={(e) => setConsentMarketing(e.target.checked)}
                        className="mt-0.5 accent-brand-start"
                      />
                      <span>I would like to receive updates, product announcements, offers, and insights from raindeer.social.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-gradient-to-r from-brand-start to-brand-end text-white font-semibold rounded-full cursor-pointer hover:shadow-lg transition-shadow duration-200 mt-2"
                  >
                    {isSubmitting ? 'Registering...' : 'Join the Waitlist'}
                  </button>

                  <p className="font-sans text-[11px] text-body-text/60 text-center leading-relaxed">
                    By submitting this form, you agree to our <a href="/privacy" className="text-brand-start underline">Privacy Policy</a> and consent to data processing for service-related communications.
                  </p>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-status-green/10 text-status-green flex items-center justify-center border border-status-green/20 mb-2">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="font-display font-bold text-ink text-2xl">You are on the list!</h3>
                  <div className="bg-brand-start/5 border border-brand-start/15 p-4 rounded-2xl w-full">
                    <span className="font-mono text-xs uppercase tracking-wider text-body-text block mb-1">Your Waitlist Position</span>
                    <span className="font-display font-bold text-brand-start text-3xl">#{cohortSlot}</span>
                  </div>
                  <p className="font-sans text-sm text-body-text mt-1 max-w-[280px]">
                    We will send you cohort onboarding details and dashboard invitations to your email shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="section py-20" id="faq">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-brand-start font-bold">
              Got Questions?
            </span>
            <h2 className="font-display font-bold text-ink text-3xl md:text-4xl mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto border border-hairline rounded-3xl bg-white shadow-sm overflow-hidden">
            {[
              {
                q: "What exactly does raindeer.social do?",
                a: "We provide you with 10 specialized AI agents that act as your dedicated social media team. They handle everything from content planning and copywriting to design, publishing, and trend analysis."
              },
              {
                q: "How much does it cost?",
                a: "Our pricing plans start at just ₹999/month, making it an incredibly cost-effective way to manage your brand's presence compared to hiring a traditional agency."
              },
              {
                q: "Do I need any technical skills to use this?",
                a: "Not at all! The platform is designed for founders, creators, and SMBs. Simply join the waitlist, provide your brand guidelines, and our AI agents will take care of the heavy lifting."
              },
              {
                q: "What social media platforms do you support?",
                a: "Our AI agents are optimized to create, schedule, and publish content across major platforms including LinkedIn, Twitter/X, Instagram, Facebook, and YouTube."
              }
            ].map((item, idx) => (
              <div key={idx} className={idx !== 3 ? 'border-b border-hairline' : ''}>
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-canvas/30 transition-colors"
                >
                  <span className="font-display font-bold text-ink text-base">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-ink transition-transform duration-300 ${activeFaq === idx ? 'transform rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-canvas/40"
                    >
                      <div className="p-6 pt-0 font-sans text-sm text-body-text leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </GridBackground>
  );
}

// Hover border gradient button component to match Aceternity visual standards
function HoverBorderButton({ 
  href, 
  children, 
  primary = false,
  className = ''
}: { 
  href: string; 
  children: React.ReactNode; 
  primary?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`relative inline-flex h-11 items-center justify-center rounded-full p-[1px] focus:outline-none overflow-hidden group transition-all duration-300 shadow-sm cursor-pointer ${className}`}
    >
      {/* Dynamic light border backdrop */}
      <span className="absolute inset-0 bg-gradient-to-r from-brand-start via-brand-end to-brand-start rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
      
      {/* Main button layout container */}
      <span className={`inline-flex h-full w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition-all duration-300 ${
        primary 
          ? 'bg-gradient-to-r from-brand-start to-brand-end text-white' 
          : 'bg-white text-ink group-hover:bg-canvas/90'
      }`}>
        {children}
      </span>
    </a>
  );
}

// Partner Logo Item wrapper
function MarqueeItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="inline-flex items-center justify-center px-8 py-3 bg-white border border-hairline rounded-full shadow-sm hover:scale-105 transition-all duration-200">
      <img src={src} alt={alt} className="h-8 w-auto filter grayscale opacity-60 hover:filter-none hover:opacity-100 transition-all duration-200" />
    </div>
  );
}
