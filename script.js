document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const experience = [
        {
            company: "Sponte",
            role: "AI Engineer (Founding Team)",
            period: "Apr 2026 – Present",
            description: "Built real-time ASR name correction for live sales calls (phonetic sound-alike corrector, context-aware LLM rewriter, post-call cleanup pass, admin-approved learning from transcript edits), raising name accuracy from 40% to 93% on re-decoded production (Parakeet) calls. Architected the retrieval layer for AI pitch generation: an OpenSearch chunk index with facet labels and section-criteria scoring, a source registry with MinHash near-duplicate detection, recency-based fact reconciliation and grounding checks on refinements. Engineered core real-time sales assistant workflows: idempotent mid-call product/deal switching with isolated per-call state, automatic deal resolution, per-org funnel stages classified once post-call, and DeepSeek/Bedrock integration via LiteLLM. Built event-driven Recall.ai bot scheduling for Meet, Zoom and Teams from Google Calendar webhooks and forwarded Gmail invites (Pub/Sub, .ics parsing), deduplicating via iCalUID with leader-gated dispatch. Took Terraform-managed AWS infrastructure (ECS, ALB, S3, SES, Secrets Manager) to production and shipped Electron in-app updates with server-enforced minimum versions and on-device crash tracing.",
            tech: ["Python", "FastAPI", "LLMs", "LiteLLM", "AWS Bedrock", "OpenSearch", "ASR", "Terraform", "ECS", "PostgreSQL", "Electron"]
        },
        {
            company: "Freshmenu",
            role: "Software Development Engineer",
            period: "Jan 2024 – Mar 2026",
            description: "Built an LLM-driven financial reconciliation platform and rules engine (FastAPI, Next.js, SQL, FAISS) across Zomato, Swiggy, Magicpin and Bitsila, parsing sanitized partner contract rules (commissions, GST, valid cancellations) to auto-generate reconciliation logic and flag payout mismatches. Engineered a procurement automation pipeline (OpenCV invoice parsing, AI-based invoice-to-PO matching) letting kitchen staff photograph invoices for structured ingestion at ~88–90% extraction accuracy. Built a visual quality-audit feature in the OMS using pixel- and color-level comparison against reference dish photos, reducing missing-item complaints by ~80%. Owned channel partner and ONDC integrations (Magicpin, Bitsila) in Java/Spring Boot with JWT-secured APIs, ActiveMQ async processing and daily menu/add-on sync, cutting missed orders from ~40% to 5–7%. Dockerized legacy services for CI/CD and refactored for horizontal scaling on AWS, raising peak holiday capacity from under 1,000 to 2,000–3,000+ orders/hour without downtime.",
            tech: ["Java", "Spring Boot", "MySQL", "MongoDB", "FastAPI", "Next.js", "FAISS", "OpenCV", "ActiveMQ", "Docker", "AWS"]
        },
        {
            company: "Freshmenu",
            role: "Software Developer Intern",
            period: "Sep 2023 – Dec 2023",
            description: "Shipped REST APIs and third-party integrations in Java/Spring Boot, MySQL and MongoDB; converted to a full-time SDE role.",
            tech: ["Java", "Spring Boot", "MySQL", "MongoDB", "REST APIs"]
        }
    ];

    const projects = [
        {
            title: "Personal AI Agent",
            description: "Fully local autonomous agent with a ReAct plan–act–observe loop, decorator-based tool registry and ChromaDB long-term memory. Sandboxed file and shell tools block path traversal and destructive commands; includes token-budget alerts and exponential-backoff retries.",
            year: "2026",
            tech: ["Python", "Ollama", "ChromaDB", "sentence-transformers"],
            link: "https://github.com/sunnyarya0/my-personal-assistant"
        },
        {
            title: "AI Knowledge Assistant",
            description: "Self-hosted RAG system that ingests PDFs and text, retrieves with semantic search and streams answers with source citations, using local LLMs and no external APIs.",
            year: "2026",
            tech: ["FastAPI", "Next.js", "ChromaDB", "Ollama", "Llama 3.2"],
            link: "https://github.com/sunnyarya0/ai-knowledge-assistant"
        },
        {
            title: "AI Agent for Academic Guidance",
            description: "Full-stack RAG system for context-aware academic guidance with tuned chunking, reranking, JWT authentication and rate limiting; deployed on AWS EC2 with Docker, Nginx and GitHub Actions CI/CD.",
            year: "2024",
            tech: ["FastAPI", "LangChain", "OpenAI", "pgvector", "AWS", "Docker"],
            link: null
        }
    ];

    // --- Rendering Functions ---
    const createBadgeContainer = (techList) => {
        const container = document.createElement('div');
        container.className = 'badge-container';
        techList.forEach(tech => {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = tech;
            container.appendChild(badge);
        });
        return container;
    };

    // 1. Sidebar Cards (Timeline Replacement)
    const timelineList = document.getElementById('timeline-list');
    experience.forEach((exp, index) => {
        const card = document.createElement('div');
        card.className = 'timeline-card';
        card.setAttribute('data-index', index);
        card.innerHTML = `
            <span class="exp-company">${exp.company}</span>
            <span class="exp-role">${exp.role}</span>
            <span class="exp-period">${exp.period}</span>
        `;
        card.addEventListener('click', () => openModal(exp));
        timelineList.appendChild(card);
    });

    // 2. Main Column Projects
    const projectsList = document.getElementById('projects-list');
    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'project-item';
        item.innerHTML = `
            <div class="project-header-row">
                ${project.link
                    ? `<a href="${project.link}" class="project-title" target="_blank" rel="noopener noreferrer">${project.title}</a>
                <a href="${project.link}" class="live-link" target="_blank" rel="noopener noreferrer">Code</a>`
                    : `<span class="project-title">${project.title}</span>`}
            </div>
            <div class="project-year">${project.year}</div>
            <p class="project-desc">${project.description}</p>
        `;
        item.appendChild(createBadgeContainer(project.tech));
        projectsList.appendChild(item);
    });

    // --- Modal Logic ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const openModal = (data, isProject = false) => {
        const title = isProject ? data.title : data.role;
        const meta = isProject ? data.year : `${data.company} | ${data.period}`;
        
        modalBody.innerHTML = `
            <h2>${title}</h2>
            <div class="modal-meta">${meta}</div>
            <p class="modal-desc">${data.description}</p>
            <h3>Technologies Used</h3>
        `;
        modalBody.appendChild(createBadgeContainer(data.tech));
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeModal = () => {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scroll
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Mobile Toggles ---
    const navToggle = document.getElementById('nav-toggle');
    const historyToggle = document.getElementById('history-toggle');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');
    const profileSidebar = document.getElementById('profile-sidebar');

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinksWrapper.classList.toggle('active');
        profileSidebar.classList.remove('active'); // Close history if nav opens
    });

    historyToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        profileSidebar.classList.toggle('active');
        navLinksWrapper.classList.remove('active'); // Close nav if history opens
    });

    // Close mobile menus on click outside
    document.addEventListener('click', (e) => {
        if (!navLinksWrapper.contains(e.target) && !navToggle.contains(e.target)) {
            navLinksWrapper.classList.remove('active');
        }
        if (!profileSidebar.contains(e.target) && !historyToggle.contains(e.target)) {
            profileSidebar.classList.remove('active');
        }
    });
});
