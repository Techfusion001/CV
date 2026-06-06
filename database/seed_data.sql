-- Seed data generated from the current portfolio JSON files.

-- Run this after supabase_schema.sql.


insert into public.site_settings (
  id, hero_image, about_image, home_about_image, page_hero_media, cta_media,
  hero_badge, about_title, about_content, about_highlight, page_hero_overlay, cta_overlay
) values (
  1,
  'assets/svg/hero-avatar.svg',
  'assets/svg/about-portrait.svg',
  'assets/svg/home-about-visual.svg',
  'assets/videos/hero-background.mp4',
  'assets/videos/cta-background.mp4',
  'Available for AI, web, game, VFX and cybersecurity projects',
  'A multidisciplinary creator shaping technology with design, security and real-world purpose.',
  'I am Muhammad Haider Abbas, a UK-based MSc Computer Science & Technology student and multidisciplinary creator working across AI, cybersecurity, web systems, game development, 3D animation and VFX. My work combines academic research, practical software engineering, operational discipline and visual storytelling. I like building systems that are clean, scalable, secure-thinking and visually strong, so every project feels ready for real users, employers, clients and academic presentation.',
  'My portfolio is designed to show one clear identity: a technical problem-solver who can also design, present and build polished digital experiences.',
  '0.50',
  '0.50'
) on conflict (id) do update set
  hero_image=excluded.hero_image,
  about_image=excluded.about_image,
  home_about_image=excluded.home_about_image,
  page_hero_media=excluded.page_hero_media,
  cta_media=excluded.cta_media,
  hero_badge=excluded.hero_badge,
  about_title=excluded.about_title,
  about_content=excluded.about_content,
  about_highlight=excluded.about_highlight,
  page_hero_overlay=excluded.page_hero_overlay,
  cta_overlay=excluded.cta_overlay,
  updated_at=now();


insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('ml-anomaly-detection-concept-drift','ML-Based Anomaly Detection with Concept Drift','AI / Machine Learning','A streaming machine learning research project focused on detecting anomalies when behaviour changes over time.','assets/svg/ai-drift.svg','Academic Research','Researcher & Developer','2026','Python, Scikit-learn, River, Pandas, Matplotlib','["Python", "Scikit-learn", "River", "Streaming ML"]'::jsonb,'{"overview": "This MSc research direction explores how anomaly detection systems can stay accurate when incoming data patterns shift over time. Traditional static models often lose performance when real-world behaviour changes, so this project studies concept drift-aware detection and evaluation.", "problem": "Static anomaly detectors can become unreliable when the underlying data distribution changes. In security, finance, infrastructure and IoT systems, this can lead to missed threats or excessive false alarms.", "solution": "The project uses streaming data preparation, model training, drift monitoring and comparative evaluation to identify when models need adaptation.", "features": ["Dataset preparation for streaming-style analysis", "Baseline anomaly detection model", "Concept drift monitoring workflow", "Evaluation using precision, recall and false alarm behaviour", "Research-backed implementation roadmap"], "outcome": "A strong MSc project foundation suitable for research, implementation, evaluation and dissertation writing.", "future": "Add dashboard visualisation, live stream simulation, adaptive model retraining and explainable anomaly reports."}'::jsonb,true,1)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('miners-spice-restaurant-platform','The Miner’s Spice Restaurant Platform','Web Systems','A restaurant website and management system with menu, ordering, admin and customer-facing pages.','assets/svg/restaurant.svg','Commercial Project','Full-Stack Developer','2026','PHP, MySQL, HTML, CSS, JavaScript','["PHP", "MySQL", "Admin Dashboard", "Ordering"]'::jsonb,'{"overview": "A commercial restaurant platform designed to support online menu browsing, customer ordering, bookings, gallery pages and backend management.", "problem": "Small restaurants often rely on generic templates that do not manage menu structure, orders and presentation professionally.", "solution": "The platform connects customer-facing pages with backend/admin logic so the restaurant can manage content and orders in one system.", "features": ["Menu sections and item cards", "Online ordering flow", "Booking/contact pages", "Gallery and customer pages", "Admin-linked management structure"], "outcome": "A practical business system that can be customised and sold to restaurants.", "future": "Add payment gateway, kitchen dashboard, order tracking and analytics."}'::jsonb,true,2)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('smartcv-ai-cv-analyzer','SmartCV AI CV Analyzer','AI / Machine Learning','An AI-supported CV optimisation workspace with ATS feedback, role-fit analysis and subscription logic.','assets/svg/smartcv.svg','Live / In Progress','Product Builder','2026','AI workflows, Web stack, Stripe, Resume parsing','["AI", "ATS", "Stripe", "CV Analysis"]'::jsonb,'{"overview": "SmartCV AI is a CV optimisation concept/platform focused on helping candidates improve their CVs through ATS scoring, keyword alignment and improvement suggestions.", "problem": "Many job seekers submit CVs that are not aligned with job descriptions or ATS keyword patterns.", "solution": "The system analyses CV content, compares it with role requirements and provides structured suggestions for improvement.", "features": ["CV upload workflow", "ATS score direction", "Keyword extraction", "Missing keyword detection", "Role-fit feedback", "Subscription-ready product logic"], "outcome": "A strong AI SaaS-style project for job-tech and career support.", "future": "Add job-description matching, rewrite suggestions, dashboard history and recruiter view."}'::jsonb,true,3)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('q-learning-grid-world-agent','Q-Learning Grid World Agent','AI / Machine Learning','A reinforcement learning coursework project using Q-learning in a 5×5 grid with obstacles and sparse rewards.','assets/svg/q-learning.svg','Academic Project','ML Developer','2026','Python, NumPy, Matplotlib','["RL", "Q-Learning", "Python", "AI"]'::jsonb,'{"overview": "This project demonstrates reinforcement learning through a grid-world environment where an agent learns to navigate from start to goal using Q-table updates.", "problem": "The agent must learn optimal navigation despite obstacles, sparse rewards and exploration trade-offs.", "solution": "Q-learning with epsilon-greedy exploration is used to compare learning behaviour across different exploration values.", "features": ["5×5 grid environment", "Q-table implementation", "Bellman update rule", "Epsilon comparison", "Reward tracking", "Path optimisation"], "outcome": "A clear academic AI project showing practical reinforcement learning understanding.", "future": "Add visual simulation, animated training steps and comparison charts."}'::jsonb,true,4)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('coursera-digital-transformation-strategy','Coursera Digital Transformation Strategy','Academic Projects','A digital transformation strategy analysis for Coursera covering AI, data analytics, cloud and EdTech maturity.','assets/svg/coursera.svg','Academic Project','Research Analyst','2026','Research, Strategy, Presentation, Data analysis','["Digital Strategy", "AI", "Cloud", "EdTech"]'::jsonb,'{"overview": "This project analyses Coursera as a digital education platform and explores its maturity, platform strategy and use of digital technologies.", "problem": "EdTech platforms must adapt to learner expectations, AI personalisation and scalable infrastructure.", "solution": "The strategy reviews AI, big data, learner analytics, cloud systems and recommendation concepts.", "features": ["Digital maturity review", "AI recommendation direction", "Student segmentation concept", "Cloud and LMS analysis", "Platform business model review"], "outcome": "A professional academic strategy project suitable for demonstrating business and technical analysis.", "future": "Add interactive strategy dashboard and competitor benchmarking."}'::jsonb,true,5)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('cloud-air-pollution-respiratory-analysis','Cloud-Native Air Pollution & Respiratory Death Analysis','Data / Cloud','A cloud data project analysing average PM2.5 pollution and respiratory deaths using Azure and PySpark.','assets/svg/cloud-data.svg','Academic Project','Data Engineer','2026','Azure Data Lake Gen2, Synapse Spark, PySpark, Plotly','["Azure", "PySpark", "Big Data", "Analytics"]'::jsonb,'{"overview": "This project studies the relationship between PM2.5 pollution and respiratory deaths using cloud-native data engineering and analytics workflows.", "problem": "Environmental and health datasets need scalable processing before meaningful insights can be extracted.", "solution": "Raw CSV data is ingested, transformed with Spark, stored as Parquet and analysed through country-level aggregation and visualisation.", "features": ["Azure Data Lake ingestion", "Synapse Spark transformations", "PySpark cleaning and aggregation", "Parquet storage", "Plotly visual analytics", "Geospatial and correlation insight"], "outcome": "A strong big data portfolio project connecting cloud infrastructure with real-world health analytics.", "future": "Add automated ETL pipeline, Power BI dashboard and predictive modelling."}'::jsonb,true,6)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('pentest-ont-cybersecurity-ontology','PenTest-Ont Cybersecurity Ontology','Cybersecurity','A cybersecurity ontology modelling tools, techniques, vulnerabilities and penetration testing knowledge.','assets/svg/cyber-ontology.svg','Academic Project','Security Researcher','2026','OWL, Protégé, SPARQL, Knowledge Graphs','["OWL", "Protégé", "SPARQL", "Cybersecurity"]'::jsonb,'{"overview": "PenTest-Ont structures penetration testing knowledge using ontology engineering and semantic technologies.", "problem": "Cybersecurity knowledge can become fragmented across tools, techniques and vulnerability categories.", "solution": "The ontology models relationships between tools, testing techniques, vulnerabilities and reasoning concepts.", "features": ["OWL ontology structure", "Protégé modelling", "SPARQL queries", "Knowledge graph concepts", "Tools and vulnerability mapping", "AI-assisted reasoning direction"], "outcome": "A unique cybersecurity research project showing structured knowledge modelling.", "future": "Connect ontology to automated security reports and AI assistants."}'::jsonb,true,7)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('automarketpro-car-marketplace','AutoMarketPro Car Marketplace','Web Systems','A car-selling marketplace with seller ads, subscriptions, Stripe checkout, image uploads and admin moderation.','assets/svg/car-market.svg','In Progress','Full-Stack Developer','2026','PHP, MySQL, Stripe, Admin/User Panels','["PHP", "MySQL", "Stripe", "Marketplace"]'::jsonb,'{"overview": "AutoMarketPro is a car marketplace platform inspired by vehicle listing systems, allowing sellers to post ads and manage subscription-based listings.", "problem": "Car-selling platforms need listing control, payment workflows, admin moderation and clean search/filtering.", "solution": "The system connects seller ad posting with subscription packages, Stripe checkout and admin review tools.", "features": ["Seller ad posting", "Subscription packages", "Stripe checkout and webhook direction", "Image upload", "Admin moderation", "User dashboard", "Featured/boosted listing direction"], "outcome": "A monetisable web system with strong commercial potential.", "future": "Add advanced search, valuations, dealer profiles, finance calculator and analytics."}'::jsonb,true,8)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('unity-fps-sniper-contracts-prototype','Unity FPS Sniper Contracts Prototype','Game Development','A tactical FPS sniper prototype with AI states, missions, vehicles, weapons, ADS and large terrain design.','assets/svg/unity-fps.svg','Prototype','Game Developer','2026','Unity, C#, Blender, AI Systems, Vehicle Controller','["Unity", "C#", "AI", "Level Design"]'::jsonb,'{"overview": "A sniper contracts-style tactical FPS prototype built in Unity with mission structure, AI behaviour, terrain, vehicles and scoped weapon systems.", "problem": "Tactical shooter prototypes require multiple systems to work together: AI, movement, weapons, mission logic and level design.", "solution": "The project builds modular systems for missions, weapons, vehicles and enemy AI states.", "features": ["Large terrain and mission zones", "AI idle/patrol/alert/combat states", "Weapon ADS and scopes", "Vehicle controller direction", "Mission objective system", "Level design with refinery-style environment"], "outcome": "A serious game development prototype that demonstrates systems thinking and Unity engineering.", "future": "Add polished AI, UI, audio, cinematic intro and Steam-ready vertical slice."}'::jsonb,true,9)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('dvwa-ethical-hacking-labs','Cybersecurity DVWA & Ethical Hacking Labs','Cybersecurity','Hands-on cybersecurity labs using DVWA, Burp Suite, OWASP concepts and professional reporting practice.','assets/svg/dvwa.svg','Practical Labs','Security Learner','2026','DVWA, Burp Suite, OWASP testing workflow','["DVWA", "Burp Suite", "OWASP", "Security"]'::jsonb,'{"overview": "This lab project demonstrates practical ethical hacking awareness through controlled vulnerable environments and reporting practice.", "problem": "Security concepts are easier to understand when tested in legal, controlled lab environments.", "solution": "DVWA-style workflows are used to practise vulnerability testing, evidence capture and mitigation thinking.", "features": ["OWASP-style vulnerability testing", "Burp Suite workflows", "Evidence screenshots direction", "Risk explanation", "Professional report writing"], "outcome": "A practical cybersecurity learning portfolio section.", "future": "Add full write-ups, remediation steps and lab videos."}'::jsonb,true,10)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('jarvis-ai-agent-workflow','Jarvis AI Agent Workflow','AI / Automation','A modular AI assistant workflow concept using n8n-style automation, local models and API actions.','assets/svg/jarvis.svg','Concept / Prototype','Automation Designer','2026','n8n, Ollama, Prompting, APIs','["AI Agents", "n8n", "Ollama", "Automation"]'::jsonb,'{"overview": "Jarvis is a personal assistant concept built around modular AI workflows, automation and action-based tasks.", "problem": "Many daily workflows are repetitive but require context, decision-making and structured tool use.", "solution": "The concept uses agents, prompts, local models and API-style actions to automate productivity tasks.", "features": ["Personal assistant workflow", "n8n-style automation", "Ollama/local model direction", "Prompt modules", "API action planning", "Productivity automation"], "outcome": "A strong AI automation concept for future development.", "future": "Build working agent modules for email, calendar, files, research and project management."}'::jsonb,true,11)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('full-stack-dating-app-prototype','Full-Stack Dating App Prototype','Web Systems','A full-stack app prototype with authentication direction, profile flow, matching concept and database schema planning.','assets/svg/dating-app.svg','Prototype','Full-Stack Developer','2026','React, Node.js, Prisma, PostgreSQL','["React", "Node", "Prisma", "PostgreSQL"]'::jsonb,'{"overview": "A product-style dating app prototype exploring full-stack structure, user profiles, authentication and matching workflows.", "problem": "Modern dating apps require secure authentication, clean data modelling and smooth profile/matching flows.", "solution": "The prototype plans frontend, backend, Prisma schema and PostgreSQL database structure.", "features": ["Frontend/backend architecture", "Prisma schema direction", "PostgreSQL setup", "Authentication planning", "Profile flow", "Matching concept"], "outcome": "A useful full-stack learning and product design project.", "future": "Add working auth, chat, profile verification and recommendations."}'::jsonb,true,12)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('blender-animation-vfx-portfolio','Blender Animation & VFX Portfolio','3D / VFX / Animation','A creative portfolio area for 2D/3D animation, Blender assets, VFX, video editing and modular game/promo visuals.','assets/svg/blender-vfx.svg','Creative Portfolio','3D/VFX Artist','2026','Blender, After Effects, Premiere Pro, Unity assets','["Blender", "VFX", "Animation", "Video Editing"]'::jsonb,'{"overview": "This creative portfolio section presents Haider’s experience across 2D/3D animation, VFX, video editing and game-ready visual production.", "problem": "Creative technical work needs a polished showcase that connects visual skill with practical production outcomes.", "solution": "The project groups animation, modular assets, VFX and editing work into a professional portfolio format.", "features": ["2D/3D animation", "Blender assets", "VFX compositions", "Video editing", "Modular assets", "Game and promo presentation support"], "outcome": "A creative-technical showcase supporting freelance, game and media opportunities.", "future": "Add showreel video, before/after VFX breakdowns and asset galleries."}'::jsonb,true,13)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.projects (slug,title,category,summary,image,status,role,year,tools,tags,content,is_featured,sort_order)
values ('family-haven-shopify-store','Family Haven Shopify Store','E-commerce / Business','A UK-focused Shopify pet supplies store with product research, CJ Dropshipping, SEO blogs and paid ad testing.','assets/svg/shopify-store.svg','Business Project','Store Builder & Marketer','2026','Shopify, CJ Dropshipping, Meta Ads, Pinterest, SEO blogs','["Shopify", "CJ Dropshipping", "Meta Ads", "SEO"]'::jsonb,'{"overview": "Family Haven is a pet supplies e-commerce store focused on UK customers, product testing and digital marketing.", "problem": "New stores need niche selection, product research, conversion-focused pages and traffic testing.", "solution": "The store uses Shopify, CJ Dropshipping, UK-focused delivery messaging, blogs and paid ad experiments.", "features": ["Shopify store setup", "Pet supplies niche", "Product research", "CJ Dropshipping", "Meta Ads testing", "SEO/blog content", "UK-focused marketing"], "outcome": "A practical e-commerce business project showing product, marketing and store-building skills.", "future": "Add winning product funnel, email automation, reviews and conversion optimisation."}'::jsonb,true,14)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,status=excluded.status,role=excluded.role,year=excluded.year,tools=excluded.tools,tags=excluded.tags,content=excluded.content,is_featured=excluded.is_featured,sort_order=excluded.sort_order,updated_at=now();

insert into public.blogs (slug,title,category,summary,image,publish_date,author,content,is_published,sort_order)
values ('technical-creative-portfolio','Building a Portfolio That Shows Both Technical and Creative Skill','Career','A short article about presenting AI, cybersecurity, web, game and creative work inside one professional brand.','assets/svg/blog-portfolio.svg','2026-06-06','Muhammad Haider Abbas','A strong portfolio should not look like a random list of projects. It should explain identity, direction and proof. For a hybrid profile, the website must make categories clear: AI, cybersecurity, web systems, game development and creative/VFX work. Each project needs a short story: the problem, the solution, the tools and the result. This makes the portfolio useful for jobs, clients and university work at the same time.',true,1)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,publish_date=excluded.publish_date,author=excluded.author,content=excluded.content,is_published=excluded.is_published,sort_order=excluded.sort_order,updated_at=now();

insert into public.blogs (slug,title,category,summary,image,publish_date,author,content,is_published,sort_order)
values ('why-case-studies-matter','Why Case Studies Make Projects Look More Professional','Portfolio','Why project detail pages should explain process, challenges and outcomes instead of only showing images.','assets/svg/blog-case-study.svg','2026-06-06','Muhammad Haider Abbas','Project cards are useful for browsing, but case studies build trust. A case study shows how the work was planned, what problem was solved, what tools were used and what outcome was achieved. This is especially important for software, AI and cybersecurity projects because recruiters and clients want to understand the thinking behind the result.',true,2)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,publish_date=excluded.publish_date,author=excluded.author,content=excluded.content,is_published=excluded.is_published,sort_order=excluded.sort_order,updated_at=now();

insert into public.blogs (slug,title,category,summary,image,publish_date,author,content,is_published,sort_order)
values ('ai-cybersecurity-game-dev-brand','Combining AI, Cybersecurity and Game Development in One Brand','Personal Brand','A focused way to connect multiple skills without making the website feel confusing.','assets/svg/blog-brand.svg','2026-06-06','Muhammad Haider Abbas','A multi-skill portfolio works best when every skill supports one main identity: a technical creator who builds practical digital systems. AI shows research and automation ability. Cybersecurity shows defensive thinking and technical awareness. Game development shows systems, interaction and creative engineering. 3D and VFX show visual communication. Together, they create a strong modern technical brand.',true,3)
on conflict (slug) do update set title=excluded.title,category=excluded.category,summary=excluded.summary,image=excluded.image,publish_date=excluded.publish_date,author=excluded.author,content=excluded.content,is_published=excluded.is_published,sort_order=excluded.sort_order,updated_at=now();

insert into public.certifications (slug,title,issuer,completion_date,summary,icon,image,sort_order)
values ('sia-door-supervisor-license','SIA Door Supervisor License','UK Security Training','Completed','Door supervisor training covering first aid, access control, conflict management, venue safety and public-facing security readiness.','Shield','assets/svg/cert-security.svg',1)
on conflict (slug) do update set title=excluded.title,issuer=excluded.issuer,completion_date=excluded.completion_date,summary=excluded.summary,icon=excluded.icon,image=excluded.image,sort_order=excluded.sort_order,updated_at=now();

insert into public.certifications (slug,title,issuer,completion_date,summary,icon,image,sort_order)
values ('certified-ethical-hacker-ceh','Certified Ethical Hacker — CEH','EC-Council','2023','Ethical hacking methodology, reconnaissance, vulnerability concepts, tools and defensive awareness.','Terminal','assets/svg/cert-tech.svg',2)
on conflict (slug) do update set title=excluded.title,issuer=excluded.issuer,completion_date=excluded.completion_date,summary=excluded.summary,icon=excluded.icon,image=excluded.image,sort_order=excluded.sort_order,updated_at=now();

insert into public.certifications (slug,title,issuer,completion_date,summary,icon,image,sort_order)
values ('comptia-security-sy0-601','CompTIA Security+ SY0-601','CompTIA','Completed','Risk management, threats, incident response, architecture, cryptography and security operations.','Lock','assets/svg/cert-academic.svg',3)
on conflict (slug) do update set title=excluded.title,issuer=excluded.issuer,completion_date=excluded.completion_date,summary=excluded.summary,icon=excluded.icon,image=excluded.image,sort_order=excluded.sort_order,updated_at=now();

insert into public.certifications (slug,title,issuer,completion_date,summary,icon,image,sort_order)
values ('cyber-security-understand-threats-and-prevent-attacks','Cyber Security: Understand Threats and Prevent Attacks','Online Certification','Completed','Foundational security learning focused on common threats, prevention strategies and secure digital behaviour.','Alert','assets/svg/cert-security.svg',4)
on conflict (slug) do update set title=excluded.title,issuer=excluded.issuer,completion_date=excluded.completion_date,summary=excluded.summary,icon=excluded.icon,image=excluded.image,sort_order=excluded.sort_order,updated_at=now();

insert into public.certifications (slug,title,issuer,completion_date,summary,icon,image,sort_order)
values ('introduction-to-cism','Introduction to CISM','Security Governance','Completed','Security governance, risk, information security programs and incident management principles.','Graph','assets/svg/cert-tech.svg',5)
on conflict (slug) do update set title=excluded.title,issuer=excluded.issuer,completion_date=excluded.completion_date,summary=excluded.summary,icon=excluded.icon,image=excluded.image,sort_order=excluded.sort_order,updated_at=now();

insert into public.certifications (slug,title,issuer,completion_date,summary,icon,image,sort_order)
values ('ulster-msc-coursework-portfolio','Ulster MSc Coursework Portfolio','Ulster University','2026','Academic evidence across AI, big data, cloud infrastructure, digital transformation and cybersecurity ontology research.','Academic','assets/svg/cert-academic.svg',6)
on conflict (slug) do update set title=excluded.title,issuer=excluded.issuer,completion_date=excluded.completion_date,summary=excluded.summary,icon=excluded.icon,image=excluded.image,sort_order=excluded.sort_order,updated_at=now();

insert into public.skills (title,summary,image,sort_order)
values ('AI / Machine Learning','Research-focused ML, anomaly detection, concept drift, data preprocessing and model evaluation.','assets/svg/skill-ai.svg',1);

insert into public.skills (title,summary,image,sort_order)
values ('Cybersecurity & Ethical Hacking','DVWA labs, Burp Suite workflows, OWASP concepts, risk awareness and professional reporting.','assets/svg/skill-cyber.svg',2);

insert into public.skills (title,summary,image,sort_order)
values ('Web Systems & Backend','Responsive interfaces, PHP/MySQL systems, admin panels, Stripe flows and reusable data structures.','assets/svg/skill-web.svg',3);

insert into public.skills (title,summary,image,sort_order)
values ('Unity Game Development','FPS prototypes, AI behaviour, mission systems, vehicles, weapons and level design.','assets/svg/skill-game.svg',4);

insert into public.skills (title,summary,image,sort_order)
values ('Blender 3D / VFX','3D assets, animation, cinematic visuals, video editing and presentation-ready creative production.','assets/svg/skill-vfx.svg',5);

insert into public.skills (title,summary,image,sort_order)
values ('Business & E-commerce','Shopify stores, product research, digital marketing direction and commercial platform thinking.','assets/svg/skill-business.svg',6);

insert into public.experience (slug,title,place,start_year,end_year,period,summary,type,sort_order)
values ('sia-door-supervisor','SIA Door Supervisor','UK Security Operations','','Current / Recent',' - Current / Recent','Security operations, access control, conflict awareness, public-facing safety and incident response.','Security',1)
on conflict (slug) do update set title=excluded.title,place=excluded.place,start_year=excluded.start_year,end_year=excluded.end_year,period=excluded.period,summary=excluded.summary,type=excluded.type,sort_order=excluded.sort_order,updated_at=now();

insert into public.experience (slug,title,place,start_year,end_year,period,summary,type,sort_order)
values ('night-supervisor-night-porter','Night Supervisor / Night Porter','Hermitage Park Hotel','','Recent',' - Recent','Night operations, guest support, premises monitoring, emergency handling and shift responsibility.','Operations',2)
on conflict (slug) do update set title=excluded.title,place=excluded.place,start_year=excluded.start_year,end_year=excluded.end_year,period=excluded.period,summary=excluded.summary,type=excluded.type,sort_order=excluded.sort_order,updated_at=now();

insert into public.experience (slug,title,place,start_year,end_year,period,summary,type,sort_order)
values ('warehouse-resource-recruiter','Warehouse Resource Recruiter','Right Recruitment','','Previous',' - Previous','Candidate communication, scheduling, workforce coordination and operational support.','Recruitment',3)
on conflict (slug) do update set title=excluded.title,place=excluded.place,start_year=excluded.start_year,end_year=excluded.end_year,period=excluded.period,summary=excluded.summary,type=excluded.type,sort_order=excluded.sort_order,updated_at=now();

insert into public.experience (slug,title,place,start_year,end_year,period,summary,type,sort_order)
values ('cybersecurity-ethical-hacking-projects','Cybersecurity & Ethical Hacking Projects','Academic / Practical Labs','','Ongoing',' - Ongoing','DVWA, Burp Suite workflows, vulnerability testing, documentation and defensive thinking.','Cybersecurity',4)
on conflict (slug) do update set title=excluded.title,place=excluded.place,start_year=excluded.start_year,end_year=excluded.end_year,period=excluded.period,summary=excluded.summary,type=excluded.type,sort_order=excluded.sort_order,updated_at=now();

insert into public.experience (slug,title,place,start_year,end_year,period,summary,type,sort_order)
values ('animation-video-editing-instructor','Instructor — 2D/3D Animation & Video Editing','Creative Technology Training','','Previous',' - Previous','Teaching, mentoring, creative production, Blender/VFX guidance and technical delivery.','Creative',5)
on conflict (slug) do update set title=excluded.title,place=excluded.place,start_year=excluded.start_year,end_year=excluded.end_year,period=excluded.period,summary=excluded.summary,type=excluded.type,sort_order=excluded.sort_order,updated_at=now();

insert into public.education (slug,title,place,start_year,end_year,period,summary,type,sort_order)
values ('msc-computer-science-technology','MSc Computer Science & Technology','Ulster University, Birmingham Campus','','Current',' - Current','AI, big data infrastructure, digital transformation and cybersecurity knowledge representation.','Master''s Degree',1)
on conflict (slug) do update set title=excluded.title,place=excluded.place,start_year=excluded.start_year,end_year=excluded.end_year,period=excluded.period,summary=excluded.summary,type=excluded.type,sort_order=excluded.sort_order,updated_at=now();

insert into public.education (slug,title,place,start_year,end_year,period,summary,type,sort_order)
values ('bachelor-information-technology','Bachelor in Information Technology','Quaid-i-Azam University, Islamabad','','Completed',' - Completed','Technical foundation in computing, software concepts, information technology and project-based learning.','Bachelor''s Degree',2)
on conflict (slug) do update set title=excluded.title,place=excluded.place,start_year=excluded.start_year,end_year=excluded.end_year,period=excluded.period,summary=excluded.summary,type=excluded.type,sort_order=excluded.sort_order,updated_at=now();

insert into public.design_skills (title,percent,sort_order)
values ('2D/3D Animation and Modeling',95,1);

insert into public.design_skills (title,percent,sort_order)
values ('Game Development',85,2);

insert into public.design_skills (title,percent,sort_order)
values ('Video Editing and Graphic Design',75,3);

insert into public.design_skills (title,percent,sort_order)
values ('E-commerce Virtual Assistance / Business Platforms',90,4);

insert into public.design_skills (title,percent,sort_order)
values ('Digital Marketing & SEO',85,5);

insert into public.coding_skills (title,percent,sort_order)
values ('C# / C++',85,1);

insert into public.coding_skills (title,percent,sort_order)
values ('PHP',90,2);

insert into public.coding_skills (title,percent,sort_order)
values ('JavaScript',90,3);

insert into public.coding_skills (title,percent,sort_order)
values ('HTML / CSS',85,4);

insert into public.coding_skills (title,percent,sort_order)
values ('Cyber Security',90,5);


-- After you create your Supabase Auth user, run this with your real Auth user id:
-- insert into public.admin_users (user_id, email)
-- values ('PASTE-YOUR-AUTH-USER-ID-HERE', 'your@email.com');

