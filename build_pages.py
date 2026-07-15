import re

def generate_page(source_file, output_file, title, section_content):
    with open(source_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update Title
    content = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', content)
    
    # Optional: Update OG title
    content = re.sub(r'<meta property="og:title" content=".*?">', f'<meta property="og:title" content="{title}">', content)
    content = re.sub(r'<meta name="twitter:title" content=".*?">', f'<meta name="twitter:title" content="{title}">', content)

    # Dynamic SEO tags for Subpages (Canonical and OG URL)
    clean_name = output_file.replace('.html', '')
    canonical_url = f"https://raindeer.social/{clean_name}"
    if output_file == 'index.html':
        canonical_url = "https://raindeer.social/"

    content = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{canonical_url}">', content)
    content = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="{canonical_url}">', content)

    # Process JSON-LD Schema on subpages (remove FAQPage, add BreadcrumbList)
    if output_file != 'index.html':
        import json
        json_ld_match = re.search(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
        if json_ld_match:
            try:
                schema_list = json.loads(json_ld_match.group(1).strip())
                # Filter out FAQPage
                filtered_schema = [item for item in schema_list if item.get('@type') != 'FAQPage']
                
                # Create Breadcrumb Schema
                page_name = "About Us" if "about" in clean_name else "Privacy Policy"
                breadcrumb_schema = {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://raindeer.social"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": page_name,
                            "item": canonical_url
                        }
                    ]
                }
                filtered_schema.append(breadcrumb_schema)
                
                # Replace back
                content = content.replace(
                    json_ld_match.group(0),
                    f'<script type="application/ld+json">\n{json.dumps(filtered_schema, indent=2)}\n</script>'
                )
            except Exception as e:
                print(f"Error parsing/modifying JSON-LD in {output_file}: {e}")

    # Find the injection points
    header_start = content.find('<header class="hero" id="hero-header">')
    footer_start = content.find('<footer class="footer">')

    if header_start != -1 and footer_start != -1:
        before = content[:header_start]
        after = content[footer_start:]
        
        # Replace the active nav link to not highlight home, if needed. (Optional, leaving as is for now)
        
        new_content = before + section_content + after
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully generated {output_file}.")
    else:
        print(f"Could not find header or footer in {source_file}.")

about_html = """
    <section class="section" id="about-us" style="padding-top: 150px; min-height: 80vh;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 0 20px;">
            <div class="section-header" style="text-align: left;">
                <h1 class="section-title" style="font-family: var(--font-serif); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; color: var(--ink); margin-bottom: 16px;">About raindeer.social</h1>
                <p class="section-subtitle" style="margin-top: 20px; text-align: left; font-size: 1.25rem; color: var(--cobalt-600); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em;">Your Strategic AI Social Media Partner</p>
            </div>

            <div class="about-content" style="color: var(--ink-2); line-height: 1.8; margin-top: 40px; font-size: 1.1rem; padding-bottom: 60px;">
                
                <h2 style="color: var(--ink); margin-top: 40px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 700; font-family: var(--font-serif);">Who We Are</h2>
                <p style="margin-bottom: 15px;">We are a technology-enabled social media agency. We provide strategic, operational, and AI-driven social media management services across digital platforms including LinkedIn, X (formerly Twitter), Instagram, and YouTube.</p>

                <h2 style="color: var(--ink); margin-top: 40px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 700; font-family: var(--font-serif);">Our Mission</h2>
                <p style="margin-bottom: 15px;">Our goal is to strengthen our clients' digital presence, brand visibility, audience engagement, and long-term online growth through structured social media operations, content strategy, and digital optimization.</p>

                <h2 style="color: var(--ink); margin-top: 40px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 700; font-family: var(--font-serif);">What We Do</h2>
                <p style="margin-bottom: 15px;">We offer end-to-end management of your brand's presence. Our specialized services include:</p>
                <ul style="margin-bottom: 15px; padding-left: 20px;">
                    <li style="margin-bottom: 8px;"><strong style="color: var(--ink);">Content Strategy & Execution:</strong> Creation of tailored content strategies, including static posts, carousels, video planning, and professional copywriting.</li>
                    <li style="margin-bottom: 8px;"><strong style="color: var(--ink);">Platform Management:</strong> Content scheduling, publishing, and ongoing platform optimization to maintain brand consistency.</li>
                    <li style="margin-bottom: 8px;"><strong style="color: var(--ink);">Performance Monitoring:</strong> Periodic reviews of content performance and engagement metrics to support continuous growth.</li>
                </ul>

                <h2 style="color: var(--ink); margin-top: 40px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 700; font-family: var(--font-serif);">Our Partnerships</h2>
                <p style="margin-bottom: 15px;">We proudly partner with forward-thinking brands like <strong style="color: var(--cobalt-600);">Hoblix & Slay.health</strong> to elevate their digital narrative and create meaningful connections with their audience.</p>

            </div>
        </div>
    </section>
"""

privacy_html = """
    <section class="section" id="privacy-policy" style="padding-top: 150px; min-height: 80vh;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 0 20px;">
            <div class="section-header" style="text-align: left;">
                <h1 class="section-title" style="font-family: var(--font-serif); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; color: var(--ink); margin-bottom: 16px;">Privacy Policy & Terms</h1>
                <p class="section-subtitle" style="margin-top: 20px; text-align: left; font-size: 1.25rem; color: var(--cobalt-600); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em;">Confidentiality, Data Protection & Client Terms</p>
            </div>

            <div class="privacy-content" style="color: var(--ink-2); line-height: 1.8; margin-top: 40px; font-size: 1.1rem; padding-bottom: 60px;">
                
                <h2 style="color: var(--ink); margin-top: 40px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 700; font-family: var(--font-serif);">1. Confidentiality & Data Protection</h2>
                <p style="margin-bottom: 15px;">At <strong style="color: var(--cobalt-600);">raindeer.social</strong>, we recognize the confidential nature of our clients' information. We maintain strict confidentiality regarding all materials, business information, strategic plans, and proprietary data.</p>
                <ul style="margin-bottom: 15px; padding-left: 20px;">
                    <li style="margin-bottom: 8px;"><strong style="color: var(--ink);">Restricted Access:</strong> All credentials and platform access shared by the client remain strictly limited to authorized personnel.</li>
                    <li style="margin-bottom: 8px;"><strong style="color: var(--ink);">Data Security:</strong> We implement robust safeguards to ensure the protection and responsible handling of digital assets.</li>
                    <li style="margin-bottom: 8px;"><strong style="color: var(--ink);">Non-Disclosure:</strong> We do not disclose, sell, or share confidential information to unauthorized third parties.</li>
                </ul>

                <h2 style="color: var(--ink); margin-top: 40px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 700; font-family: var(--font-serif);">2. Client Responsibilities</h2>
                <p style="margin-bottom: 15px;">To ensure effective service delivery, clients are expected to provide necessary brand assets, cooperate in good faith for timely approvals, and ensure all business claims or data provided for public communication are accurate and lawful.</p>

                <h2 style="color: var(--ink); margin-top: 40px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 700; font-family: var(--font-serif);">3. Brand Attribution & Marketing Rights</h2>
                <p style="margin-bottom: 15px;">In consideration of the services rendered, we retain limited attribution rights. This includes using the <code style="background: var(--snow-2); border: 1px solid var(--hairline); padding: 2px 6px; border-radius: 4px; color: var(--cobalt-600);">#raindeersocial</code> hashtag where appropriate, and subtle, non-intrusive references on carousel slides.</p>
                <p style="margin-bottom: 15px;">We also retain a revocable right to reference the client for portfolio and promotional purposes, including displaying the client's name and logo on our official channels, without disclosing confidential analytics.</p>

                <h2 style="color: var(--ink); margin-top: 40px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 700; font-family: var(--font-serif);">4. Intellectual Property</h2>
                <p style="margin-bottom: 15px;">Final approved content created specifically for the client belongs to the client. However, proprietary workflows, AI systems, frameworks, and methodologies developed by raindeer.social remain our exclusive intellectual property.</p>

            </div>
        </div>
    </section>
"""

if __name__ == '__main__':
    generate_page('index.html', 'about.html', 'About Us — raindeer.social', about_html)
    generate_page('index.html', 'privacy.html', 'Privacy Policy & Terms — raindeer.social', privacy_html)
