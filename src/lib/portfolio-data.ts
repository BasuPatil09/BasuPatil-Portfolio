// ── Every value below comes from Basu's own resume / existing portfolio data.
// Update anything here and the whole site follows.

export const personal = {
  legalName: 'Basanagoud N Patil',
  displayName: 'Basu Patil',
  initials: 'BP',
  role: 'CS & AI/ML Engineer in the making',
  tagline:
    'Self-motivated and driven by curiosity — on a mission to make an impact in AI, ML, and Data Science.',
  email: 'BasuPatil09@outlook.com',
  phone: '+91 93803 58480',
  location: 'Belagavi, Karnataka, India',
  // Resume is a plain static file — drop your own PDF at public/resume.pdf
  // (keep the filename) and the button serves it. No generator involved.
  resumeUrl: '/resume.pdf',
  links: {
    linkedin: 'https://linkedin.com/in/basupatil09',
    github: 'https://github.com/BasuPatil09',
    leetcode: 'https://leetcode.com/BasuPatil09',
  },
  stats: [
    { icon: 'folder-kanban', value: '4', suffix: '+', label: 'Projects Shipped' },
    { icon: 'badge-check', value: '9', suffix: '+', label: 'Certifications Earned' },
    { icon: 'target', value: '99.93', suffix: '%', label: 'Best Model Precision' },
    { icon: 'trophy', value: '70', suffix: '+', label: 'Teams Outranked at Technotsav' },
  ],
} as const

export const education = [
  {
    degree: 'B.E. — Computer Science & Engineering (AI/ML)',
    institution: 'KLS Gogte Institute of Technology',
    location: 'Belagavi, Karnataka',
    period: 'Sep 2024 – Present',
    status: 'Currently enrolled',
    detail:
      'Coursework: Data Structures & Algorithms, Database Management Systems, Networking Essentials',
  },
  {
    degree: 'Intermediate Education — Science (PCMB)',
    institution: "K.L.E. Society's Raja Lakhamagouda PU College",
    location: 'Belagavi, Karnataka',
    period: 'Jun 2022 – May 2024',
    status: 'Completed',
    detail: 'Science stream with PCMB — the foundation where problem-solving became a habit.',
  },
]

export const aboutStats = [
  { value: '2+', label: 'Years building in AI / ML' },
  { value: 'IEEE', label: 'Presented research at ICCMN-2026' },
  { value: '99.93%', label: 'Precision on my best shipped model' },
  { value: '9', label: 'Certifications, Oct 2024 – Oct 2026' },
]

export const journey = [
  {
    id: '01',
    year: '2022 – 2024',
    title: 'Foundations',
    place: 'PU College · Belagavi',
    body: 'Science stream at PU College — first contact with the logic and structure that would later become code.',
    insight:
      'The habits built solving problem sets became the same habits now used debugging models.',
  },
  {
    id: '02',
    year: '2024',
    title: 'Choosing AI/ML',
    place: 'KLS Gogte Institute of Technology',
    body: 'Enrolled in B.E. Computer Science & Engineering (AI/ML). Earned my first Generative AI credential from Microsoft & LinkedIn that same October.',
    insight:
      "The first certificate wasn't the credential — it was proof I could finish what I started.",
  },
  {
    id: '03',
    year: '2024 – 2025',
    title: 'Building the Toolkit',
    place: 'Belagavi',
    body: 'Took up NSS volunteering while going deep on Python and ML fundamentals — the same period the Sentiment Analysis System took shape: an MLOps-grade NLP pipeline at 90.6% accuracy, now live on Render with MLflow tracking behind it.',
    insight: 'NSS taught coordination under real constraints; the NLP pipeline taught the same discipline in code.',
  },
  {
    id: '04',
    year: 'Early 2026',
    title: 'Going Agentic',
    place: 'Belagavi',
    body: 'Studied autonomous agent design with Anthropic, then built the AI ATS Resume Agent — a 26-node LangChain pipeline that scores jobs and writes tailored resumes with zero manual steps.',
    insight:
      'Chaining five services into one pipeline is where AI stopped being a feature and started being an architecture.',
  },
  {
    id: '05',
    year: 'Apr 2026',
    title: 'Stepping Up',
    place: 'National stage',
    body: 'Runner-up among 70+ teams at TECHNOTSAV 2K26 National Webathon. Selected as Karnataka\u2019s Youth Representative for the MY BHARAT Budget Quest — Youth Dialogue.',
    insight:
      'A stage in front of judges and a seat at a national youth dialogue — different rooms, same lesson: show up prepared.',
  },
  {
    id: '06',
    year: 'Mid – Late 2026',
    title: 'Depth & Deployment',
    place: 'Belagavi',
    body: 'Certified in Deep Learning, Generative AI Engineering, AWS Cloud, and Oracle Agentic AI. Took the Smart Parking detector to an IEEE stage — presenting the YOLOv8-OBB paper at ICCMN-2026 with 99.93% precision — and shipped a production Hybrid-RAG system with citation-verified answers.',
    insight:
      "99.93% precision doesn't happen in the notebook — it happens in the weeks after, and again the day a conference audience watches it work.",
  },
]

export type ToolkitItem = { code: string; label: string }
export type ToolkitGroup = { group: string; items: readonly ToolkitItem[] }

export const toolkit: readonly ToolkitGroup[] = [
  {
    group: 'AI / ML',
    items: [
      { code: 'Py', label: 'Python' },
      { code: 'Pt', label: 'PyTorch' },
      { code: 'Tf', label: 'TensorFlow' },
      { code: 'Sk', label: 'Scikit-learn' },
      { code: 'Hf', label: 'Hugging Face' },
      { code: 'Lc', label: 'LangChain' },
      { code: 'Lg', label: 'LangGraph' },
      { code: 'Cv', label: 'OpenCV' },
      { code: 'Yv', label: 'YOLOv8' },
    ],
  },
  {
    group: 'Data',
    items: [
      { code: 'Pd', label: 'Pandas' },
      { code: 'Np', label: 'NumPy' },
      { code: 'Mt', label: 'Matplotlib' },
      { code: 'Sb', label: 'Seaborn' },
    ],
  },
  {
    group: 'Programming',
    items: [
      { code: 'C+', label: 'C++' },
      { code: 'Js', label: 'JavaScript' },
      { code: 'Sq', label: 'SQL' },
    ],
  },
  {
    group: 'Web & Backend',
    items: [
      { code: 'Re', label: 'React' },
      { code: 'Fa', label: 'FastAPI' },
      { code: 'Fl', label: 'Flask' },
      { code: 'No', label: 'Node.js' },
    ],
  },
  {
    group: 'Cloud & Tools',
    items: [
      { code: 'Aw', label: 'AWS' },
      { code: 'Dk', label: 'Docker' },
      { code: 'Ml', label: 'MLflow' },
      { code: 'Mo', label: 'MLOps' },
      { code: 'Md', label: 'Modal' },
      { code: 'Su', label: 'Supabase' },
      { code: 'Gt', label: 'Git & GitHub' },
      { code: 'Cl', label: 'Colab' },
      { code: 'Fg', label: 'Figma' },
    ],
  },
]

export type Project = {
  id: number
  number: string
  title: string
  year: string
  category: string
  tagline: string
  description: string
  highlights: readonly string[]
  tags: readonly string[]
  github: string
}

export const projects: readonly Project[] = [
  {
    id: 1,
    number: '01',
    title: 'Smart Parking System',
    year: '2026',
    category: 'COMPUTER VISION',
    tagline: 'Occupancy detection, trained and served end to end.',
    description:
      'A full-stack CV system that detects and classifies parking-space occupancy from overhead lot imagery using a YOLOv8 oriented-bounding-box model.',
    highlights: [
      '99.93% precision, 99.95% recall, 99.48 mAP50 across 67.7k PKLot instances',
      'Presented at IEEE ICCMN-2026 — “A Robust YOLOv8-OBB Framework for Smart Parking”',
      'FastAPI tiled-scan inference backend with batch detection and live metrics endpoint',
      'React 18 dashboard for detection, batch results, and model evaluation',
    ],
    tags: ['Python', 'YOLOv8-OBB', 'PyTorch', 'FastAPI', 'React 18', 'Modal'],
    github: 'https://github.com/BasuPatil09/Smart-Parking-System',
  },
  {
    id: 2,
    number: '02',
    title: 'AI ATS Resume Agent',
    year: '2026',
    category: 'AI AGENTS · AUTOMATION',
    tagline: 'An agentic pipeline that finds jobs, scores fit, and writes the resume.',
    description:
      'A 26-node automated pipeline that discovers job postings, scores them via a Gemini-backed LangChain agent, and compiles a tailored LaTeX resume to PDF — zero manual steps.',
    highlights: [
      'Async run-and-poll handling for long-running scraper jobs',
      'Two-stage Supabase deduplication to prevent redundant LLM calls',
      'Five external services chained: Drive/Docs, Apify, Gemini, Supabase, Gmail',
    ],
    tags: ['n8n', 'LangChain', 'Google Gemini', 'Supabase', 'Apify'],
    github: 'https://github.com/BasuPatil09/AI-ATS-Resume-Agent',
  },
  {
    id: 3,
    number: '03',
    title: 'Sentiment Analysis System',
    year: '2026',
    category: 'NLP · MLOPS',
    tagline: 'A production-deployed NLP pipeline, benchmarked across five models.',
    description:
      'An end-to-end sentiment classifier trained on 50,000 IMDB reviews with a full MLOps loop — MLflow experiment tracking, a champion/challenger model registry, and CI/CD — deployed live on Render.',
    highlights: [
      '90.6% accuracy, 0.966 ROC-AUC with SGDClassifier (best of 5 models)',
      'MLflow tracking + model registry with automatic champion/challenger promotion',
      'Docker + GitHub Actions CI/CD, Flask/gunicorn serving with live monitoring',
      'Live demo: sentiment-analysis-icmn.onrender.com',
    ],
    tags: ['Python', 'NLP', 'Scikit-learn', 'MLflow', 'Docker'],
    github: 'https://github.com/BasuPatil09/Sentiment-Analysis',
  },
  {
    id: 4,
    number: '04',
    title: 'Hybrid RAG Pipeline',
    year: '2026',
    category: 'RETRIEVAL · LLM SYSTEMS',
    tagline: 'Hybrid retrieval with grounded, citation-verified answers.',
    description:
      'A production-hardened RAG system: dense ChromaDB + sparse BM25 retrieval fused with weighted Reciprocal Rank Fusion, cross-encoder reranking, and answers where every claim is citation-verified — or the system refuses.',
    highlights: [
      '97% behavior match on a 29-question golden set, 100% on multi-hop & unanswerable',
      'Weighted RRF fusion + cross-encoder rerank narrowing top-20 candidates to top-5',
      'INSUFFICIENT_CONTEXT refusal guard with per-claim LLM verification',
      '230 tests, per-IP rate limiting, non-root Docker deployment',
    ],
    tags: ['FastAPI', 'ChromaDB', 'BM25', 'Cross-Encoder', 'Groq', 'Docker'],
    github: 'https://github.com/BasuPatil09/Hybrid-RAG',
  },
]

export type Experience = {
  icon: 'trophy' | 'flag' | 'heart' | 'academic'
  type: string
  title: string
  org: string
  period: string
  bullets: readonly string[]
  impact: string
  tags: readonly string[]
}

export const experience: readonly Experience[] = [
  {
    icon: 'academic',
    type: 'Research',
    title: 'Paper Presenter — IEEE ICCMN-2026',
    org: 'Intl. Conference on Computing, Communication & Mobile Networks · Belagavi',
    period: 'Oct 2026',
    bullets: [
      'Presented “A Robust YOLOv8-OBB Framework for Smart Parking” in the conference technical session',
      'Reported 99.93% precision, 99.95% recall, and 99.48 mAP50 across 67.7k PKLot instances',
      'Volunteered across conference operations — received a Certificate of Appreciation',
    ],
    impact: 'Research presented before an IEEE-associated international conference audience',
    tags: ['Computer Vision', 'Research', 'Public Speaking'],
  },
  {
    icon: 'trophy',
    type: 'Hackathon',
    title: 'Runner-Up — TECHNOTSAV 2K26 National Webathon',
    org: 'National-level webathon',
    period: 'Apr 2026',
    bullets: [
      'Built a full-stack Land Ownership Management System from scratch within a fixed sprint window',
      'Designed the data model for transparent, real-time land-record access for citizens and authorities',
      'Presented the working system to judges alongside 70+ competing teams from across India',
    ],
    impact: 'Runner-up nationally, out of 70+ teams',
    tags: ['Full-Stack', 'System Design', 'Rapid Prototyping'],
  },
  {
    icon: 'flag',
    type: 'Recognition',
    title: 'Youth Representative — MY BHARAT Budget Quest',
    org: 'Government of India · Youth Dialogue 2026',
    period: 'Apr 2026',
    bullets: [
      "Selected as Karnataka's Youth Representative among all states and union territories",
      'Took part in Youth Parliament budget debates representing student and youth priorities',
      'Attended a virtual conference with the Prime Minister as part of the cohort',
    ],
    impact: 'One of the youth voices selected to represent Karnataka nationally',
    tags: ['Public Policy', 'Communication', 'Representation'],
  },
  {
    icon: 'heart',
    type: 'Volunteer',
    title: 'NSS Volunteer',
    org: 'KLS Gogte Institute of Technology',
    period: 'Dec 2024 – Present',
    bullets: [
      'Supported blood donation drives and environmental initiatives on campus',
      'Helped run community awareness campaigns alongside orphanage social-service activities',
      'Handled poster design, video editing, and on-ground coordination for events',
    ],
    impact: 'Ongoing — about two years of consistent community contribution',
    tags: ['Coordination', 'Design', 'Community'],
  },
]

export type Certification = {
  index: string
  title: string
  issuer: string
  date: string
  credId: string
  topics: readonly string[]
  link: string
}

export const certifications: readonly Certification[] = [
  {
    index: '6.1',
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft & LinkedIn',
    date: 'Oct 2024',
    credId: 'On File',
    topics: ['LLMs', 'Prompt engineering', 'Responsible AI'],
    link: 'https://www.linkedin.com/learning/certificates/53b04cf8daffdfed42e7ae4820f920c1f9080005bdb5d7d534efba7dbe124246',
  },
  {
    index: '6.2',
    title: 'Introduction to Agent Skills',
    issuer: 'Anthropic (Skilljar)',
    date: 'Mar 2026',
    credId: 'FPKS28V84A6D',
    topics: ['Autonomous AI agents', 'Tool integration', 'LLM execution'],
    link: 'https://verify.skilljar.com/c/fpks28v84a6d',
  },
  {
    index: '6.3',
    title: 'Machine Learning with Python',
    issuer: 'IBM · Coursera',
    date: 'May 2026',
    credId: 'GUBPYIIGZXJZ',
    topics: ['Supervised learning', 'Scikit-learn', 'Model evaluation'],
    link: 'https://www.coursera.org/account/accomplishments/verify/GUBPYIIGZXJZ',
  },
  {
    index: '6.4',
    title: 'Data Analysis with Python',
    issuer: 'IBM · Coursera',
    date: 'May 2026',
    credId: 'DCSUQ3K4PD9A',
    topics: ['EDA', 'Data cleaning', 'Pandas / NumPy / Matplotlib'],
    link: 'https://www.coursera.org/account/accomplishments/verify/DCSUQ3K4PD9A',
  },
  {
    index: '6.5',
    title: 'Deep Learning with Keras and TensorFlow',
    issuer: 'IBM · Coursera',
    date: 'Jun 2026',
    credId: 'DKQVGSRGTMB1',
    topics: ['Neural networks', 'Keras', 'Training & evaluation'],
    link: 'https://www.coursera.org/account/accomplishments/verify/DKQVGSRGTMB1',
  },
  {
    index: '6.6',
    title: 'IBM Generative AI Engineering',
    issuer: 'IBM · Coursera — Professional Certificate, 16 courses',
    date: 'Jul 2026',
    credId: 'ANG6ARQRXGKO',
    topics: ['LLMs & Transformers', 'RAG', 'Hugging Face', 'LangChain'],
    link: 'https://coursera.org/verify/professional-cert/ANG6ARQRXGKO',
  },
  {
    index: '6.7',
    title: 'Generative AI Engineering with LLMs',
    issuer: 'IBM · Coursera — Specialization, 7 courses',
    date: 'Jul 2026',
    credId: 'DLT744LPFWWI',
    topics: ['Gen AI architecture', 'LLM fine-tuning', 'Agents with RAG'],
    link: 'https://coursera.org/verify/specialization/DLT744LPFWWI',
  },
  {
    index: '6.8',
    title: 'AWS Cloud Technical Essentials',
    issuer: 'Amazon Web Services · Coursera',
    date: 'Aug 2026',
    credId: 'WZUC7FV52B85',
    topics: ['Compute & storage', 'Databases', 'Security & monitoring'],
    link: 'https://www.coursera.org/account/accomplishments/verify/WZUC7FV52B85',
  },
  {
    index: '6.9',
    title: 'Agentic AI Certified Foundations Associate',
    issuer: 'Oracle University',
    date: 'Oct 2026',
    credId: '332486422AAI26OFA',
    topics: ['Agentic AI foundations', 'LLM agents & tools', 'Enterprise AI agents'],
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=B8F7832667A6E222E6D84A041E34009C5DA6D0787A921D97E2A4691E3757C452',
  },
]

/* Hero remains fixed. The other sections populate automatically from their folders. */
export const media = {
  hero: {
    src: '/images/portrait.jpeg',
    alt: 'Basu Patil',
  },
}

/* Original src/data/gallery.generated.js — work-and-group archive. */
export const archivePhotos = [
  { src: '/images/work/work-01.jpg', label: 'DSCF8750' },
  { src: '/images/work/work-02.jpg', label: 'DSCF8753' },
  { src: '/images/work/work-03.jpg', label: 'DSCF8786' },
  { src: '/images/work/work-04.jpg', label: 'DSCF8818' },
  { src: '/images/work/work-05.jpg', label: 'Picture1' },
  { src: '/images/work/work-06.jpg', label: 'Picture2' },
  { src: '/images/work/work-07.jpg', label: 'Team moment 04/16' },
  { src: '/images/work/work-08.jpg', label: 'Team moment 04/16 II' },
  { src: '/images/work/work-09.jpg', label: 'Team moment 04/16 III' },
  { src: '/images/work/work-10.jpg', label: 'Team moment 08/12' },
  { src: '/images/work/work-11.jpg', label: 'Team moment 08/12 II' },
  { src: '/images/work/work-12.jpg', label: 'Team moment 08/12 III' },
  { src: '/images/work/work-13.jpg', label: 'Presenting YOLOv8-OBB · ICCMN-2026' },
  { src: '/images/work/work-14.jpg', label: 'Results session · 99.93% precision' },
  { src: '/images/work/work-15.jpg', label: 'Volunteer appreciation · ICCMN-2026' },
  { src: '/images/work/work-16.jpg', label: 'IEEE presentation certificate' },
]

/* Original personalPhotos.slice(0, 5) — final connect gallery. */
export const finalGalleryPhotos = [
  { src: '/images/personal-1.jpeg', label: 'Portrait study' },
  { src: '/images/personal-2.jpeg', label: 'Portrait study II' },
  { src: '/images/personal-3.jpeg', label: 'Campus life' },
  { src: '/images/personal-4.jpeg', label: 'Moments' },
  { src: '/images/personal-5.jpeg', label: 'With the team' },
]
