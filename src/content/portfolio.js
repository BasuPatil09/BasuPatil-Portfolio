// ── Every value below comes from Basu's own resume / existing portfolio data.
// Update anything here and the whole site follows.

export const personal = {
  legalName: 'Basanagoud N Patil',
  displayName: 'Basu Patil',
  initials: 'BP',
  role: 'CS & AI/ML Engineer in the making',
  tagline: "Self-motivated and driven by curiosity — on a mission to make an impact in AI, ML, and Data Science.",
  email: 'BasuPatil09@outlook.com',
  phone: '+91 93803 58480',
  location: 'Belagavi, Karnataka, India',
  resumeUrl: '/basu-patil-resume.pdf',
  links: {
    linkedin: 'https://linkedin.com/in/basupatil09',
    github: 'https://github.com/BasuPatil09',
    leetcode: 'https://leetcode.com/BasuPatil09',
  },
  // floating stat badges around the hero portrait
  stats: [
    { icon: 'folder-kanban', value: '3', suffix: '+', label: 'Projects Shipped' },
    { icon: 'badge-check', value: '8', suffix: '+', label: 'Certifications Earned' },
    { icon: 'target', value: '99.9', suffix: '%', label: 'Best Model Precision' },
    { icon: 'trophy', value: '70', suffix: '+', label: 'Teams Outranked at Technotsav' },
  ],
}

export const education = [
  {
    degree: 'B.E. — Computer Science & Engineering (AI/ML)',
    institution: 'KLS Gogte Institute of Technology',
    location: 'Belagavi, Karnataka',
    period: 'Sep 2024 – Present',
    status: 'Currently enrolled',
    detail: 'Coursework: Data Structures & Algorithms, Database Management Systems, Networking Essentials',
  },
  {
    degree: 'Intermediate Education — Science (PCMB)',
    institution: "K.L.E. Society's Raja Lakhamagouda PU College",
    location: 'Belagavi, Karnataka',
    period: 'Jun 2022 – May 2024',
    status: 'Completed',
  },
]

// stat callouts under the About headline
export const aboutStats = [
  { value: '2+', label: 'Years building in AI / ML' },
  { value: 'Runner-Up', label: 'TECHNOTSAV 2K26 · among 70+ teams' },
  { value: '99.9%', label: 'Precision on my best shipped model' },
  { value: '8', label: 'Certifications, Oct 2024 – Aug 2026' },
]

// "chapters" — the scroll-driven journey scene
export const journey = [
  {
    id: '01',
    year: '2022 – 2024',
    title: 'Foundations',
    place: 'PU College · Belagavi',
    body: 'Science stream at PU College — first contact with the logic and structure that would later become code.',
    insight: 'The habits built solving problem sets became the same habits now used debugging models.',
  },
  {
    id: '02',
    year: '2024',
    title: 'Choosing AI/ML',
    place: 'KLS Gogte Institute of Technology',
    body: 'Enrolled in B.E. Computer Science & Engineering (AI/ML). Earned my first Generative AI credential from Microsoft & LinkedIn that same October.',
    insight: "The first certificate wasn't the credential — it was proof I could finish what I started.",
  },
  {
    id: '03',
    year: '2024 – 2025',
    title: 'Building the Toolkit',
    place: 'Belagavi',
    body: 'Took up NSS volunteering while going deep on Python and ML fundamentals — the same period the Sentiment Analysis System took shape: a full NLP pipeline reaching 90.6% accuracy.',
    insight: 'NSS taught coordination under real constraints; the NLP pipeline taught the same discipline in code.',
  },
  {
    id: '04',
    year: 'Early 2026',
    title: 'Going Agentic',
    place: 'Belagavi',
    body: 'Studied autonomous agent design with Anthropic, then built the AI ATS Resume Agent — a 26-node LangChain pipeline that scores jobs and writes tailored resumes with zero manual steps.',
    insight: 'Chaining five services into one pipeline is where AI stopped being a feature and started being an architecture.',
  },
  {
    id: '05',
    year: 'Apr 2026',
    title: 'Stepping Up',
    place: 'National stage',
    body: 'Runner-up among 70+ teams at TECHNOTSAV 2K26 National Webathon. Selected as Karnataka\u2019s Youth Representative for the MY BHARAT Budget Quest — Youth Dialogue.',
    insight: 'A stage in front of judges and a seat at a national youth dialogue — different rooms, same lesson: show up prepared.',
  },
  {
    id: '06',
    year: 'Mid 2026',
    title: 'Depth & Deployment',
    place: 'Belagavi',
    body: 'Certified in Deep Learning, Generative AI Engineering, and AWS Cloud. Shipped the Smart Parking System — a computer-vision pipeline hitting 99.9% precision on real-world imagery.',
    insight: "99.9% precision doesn't happen in the notebook — it happens in the weeks after, hardening the pipeline for real images.",
  },
]

// flat toolkit grid — code = monogram fallback shown when there's no icon
export const toolkit = [
  { group: 'AI / ML', items: [
    { code: 'Py', label: 'Python' },
    { code: 'Pt', label: 'PyTorch' },
    { code: 'Tf', label: 'TensorFlow' },
    { code: 'Sk', label: 'Scikit-learn' },
    { code: 'Hf', label: 'Hugging Face' },
    { code: 'Lc', label: 'LangChain' },
    { code: 'Cv', label: 'OpenCV' },
    { code: 'Yv', label: 'YOLOv8' },
  ]},
  { group: 'Data', items: [
    { code: 'Pd', label: 'Pandas' },
    { code: 'Np', label: 'NumPy' },
    { code: 'Mt', label: 'Matplotlib' },
    { code: 'Sb', label: 'Seaborn' },
  ]},
  { group: 'Programming', items: [
    { code: 'C+', label: 'C++' },
    { code: 'Js', label: 'JavaScript' },
    { code: 'Sq', label: 'SQL' },
  ]},
  { group: 'Web & Backend', items: [
    { code: 'Re', label: 'React' },
    { code: 'Fa', label: 'FastAPI' },
    { code: 'Fl', label: 'Flask' },
    { code: 'No', label: 'Node.js' },
    { code: 'Tw', label: 'Tailwind' },
  ]},
  { group: 'Cloud & Tools', items: [
    { code: 'Aw', label: 'AWS' },
    { code: 'Md', label: 'Modal' },
    { code: 'Su', label: 'Supabase' },
    { code: 'Gt', label: 'Git & GitHub' },
    { code: 'Cl', label: 'Colab' },
    { code: 'Fg', label: 'Figma' },
  ]},
]

export const projects = [
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
      '99.90% precision/recall, 99.48% mAP50 on 1,863 held-out PKLot test images',
      'FastAPI inference backend — tiled-scan inference, batch detection, live metrics endpoint',
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
    category: 'NLP',
    tagline: 'A full NLP pipeline, benchmarked across five models.',
    description:
      'An end-to-end binary sentiment classifier trained on 50,000 IMDB reviews, benchmarking five models before selecting SGDClassifier for production.',
    highlights: [
      '90.6% accuracy, 0.966 ROC-AUC with SGDClassifier',
      'Negation-preserving stopword removal, lemmatization, TF-IDF (word + char n-grams)',
      'Flask REST API with confidence-scored live inference',
    ],
    tags: ['Python', 'NLP', 'Scikit-learn', 'TF-IDF', 'Flask'],
    github: 'https://github.com/BasuPatil09/Sentiment-Analysis',
  },
]

// "Where I built my judgment" — experience & recognitions
export const experience = [
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
    impact: "One of the youth voices selected to represent Karnataka nationally",
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

export const certifications = [
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
]
