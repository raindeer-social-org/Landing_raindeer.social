import re

with open('index.html', 'r') as f:
    content = f.read()

faq_pattern = r"(<!-- ===== FAQ SECTION ===== -->.*?)(?=<!-- ===== WAITLIST SECTION)"
waitlist_pattern = r"(<!-- ===== WAITLIST SECTION \(FOUNDERS STORY & NARRATIVE\) ===== -->.*?)(?=<!-- ===== FOOTER ===== -->)"

faq_match = re.search(faq_pattern, content, re.DOTALL)
waitlist_match = re.search(waitlist_pattern, content, re.DOTALL)

if faq_match and waitlist_match:
    faq_text = faq_match.group(1)
    waitlist_text = waitlist_match.group(1)
    
    # We replace the entire segment from start of FAQ to end of WAITLIST
    # with Waitlist then FAQ
    
    full_pattern = faq_pattern[:-33] + r"<!-- ===== WAITLIST SECTION \(FOUNDERS STORY & NARRATIVE\) ===== -->.*?(?=<!-- ===== FOOTER ===== -->)"
    
    new_content = content.replace(faq_text + waitlist_text, waitlist_text + faq_text)
    
    with open('index.html', 'w') as f:
        f.write(new_content)
    print("Swapped successfully")
else:
    print("Could not find sections")

