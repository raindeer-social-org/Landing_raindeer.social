'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GridBackground } from '@/components/ui/grid-background';

export default function About() {
  return (
    <GridBackground>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-36 pb-24 font-sans">
        <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-6 tracking-tight">
          About Us
        </h1>
        <p className="text-body-text text-lg leading-relaxed mb-8">
          raindeer.social was started by a group of student innovators at the Newton School of Technology, Delhi NCR. Our mission is to build highly coordinated, autonomous agent meshes that take over operational complexity for builders, content creators, and SMBs.
        </p>

        <section className="flex flex-col gap-6 text-body-text">
          <h2 className="font-display font-bold text-ink text-2xl tracking-tight mt-6">
            Our Vision
          </h2>
          <p className="leading-relaxed">
            We believe that social media management shouldn&apos;t require expensive traditional agency overheads, endless back-and-forth approval logs, or template prompt builders. By organizing specialized AI agents into dynamic CrewAI and LangGraph meshes, we create custom, grounded weeks of content aligned with your brand guidelines in under thirty seconds.
          </p>

          <h2 className="font-display font-bold text-ink text-2xl tracking-tight mt-6">
            Grounded intelligence
          </h2>
          <p className="leading-relaxed">
            Every run from the raindeer.social mesh operates with absolute brand tone grounding. We connect our generation agents directly to a custom Qdrant Brand Brain knowledge graph containing your past post history, whitepapers, offers, and positioning guides. The result is clinical compliance and voice consistency on autopilot.
          </p>
        </section>
      </main>
      <Footer />
    </GridBackground>
  );
}
