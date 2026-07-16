'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GridBackground } from '@/components/ui/grid-background';

export default function Privacy() {
  return (
    <GridBackground>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-36 pb-24 font-sans text-body-text">
        <h1 className="font-display font-bold text-ink text-4xl mb-6 tracking-tight">
          Privacy Policy &amp; Terms
        </h1>
        <p className="text-sm text-body-text/80 mb-8">Last updated: July 2026</p>

        <section className="flex flex-col gap-6 leading-relaxed">
          <p>
            At raindeer.social, we take your data security and brand privacy seriously. This policy explains how we collect, process, and protect your information when using our multi-agent platform.
          </p>

          <h2 className="font-display font-bold text-ink text-xl tracking-tight mt-6">
            1. Data Collection
          </h2>
          <p>
            When you register for early access or set up a Brand Brain, we collect details including your name, company name, email address, phone number, and any brand guides/assets you upload to build your vector memory index.
          </p>

          <h2 className="font-display font-bold text-ink text-xl tracking-tight mt-6">
            2. Brand Brain Memory Indexes
          </h2>
          <p>
            Your Brand Brain embeddings are private and fully isolated. We store them in secure, segmented Qdrant collection spaces. We do not use your brand files or generated drafts to train shared public foundation models.
          </p>

          <h2 className="font-display font-bold text-ink text-xl tracking-tight mt-6">
            3. Platform Operations
          </h2>
          <p>
            All generated drafts and visual assets are stored strictly for review and human-in-the-loop approvals. You retain complete ownership of all created content and can request full deletion of your brand collection index at any time.
          </p>
        </section>
      </main>
      <Footer />
    </GridBackground>
  );
}
