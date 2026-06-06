export const personal = {
  name: "Basanagoud N Patil",
  displayName: "Basu Patil",
  degree: "Bachelor of Engineering (CS & AIML)",
  tagline: "Self-motivated and driven by curiosity — on a mission to make an impact in AI / ML / Data Science.",
  shortTagline: "Building intelligent systems, one model at a time.",
  email: "om2580sai@gmail.com",
  phone: "+91 93803 58480",
  location: "Belagavi, India",
  photo: "/basu-photo.jpg",
  links: {
    linkedin: "https://linkedin.com/in/basupatil09",
    github: "https://github.com/BasuPatil09",
    leetcode: "https://leetcode.com/BasuPatil09",
  },
  focusAreas: [
    { title: "AI / ML", description: "Building models that solve real problems" },
    { title: "Data Science", description: "Extracting insights from complex datasets" },
    { title: "Web Development", description: "Clean, functional full-stack interfaces" },
  ],
};

export const skills = {
  coreStack: [
    "Python", "C++", "Machine Learning", "TensorFlow", "Scikit-learn",
    "Pandas", "NumPy", "React", "Git",
  ],
  categories: [
    {
      icon: "brain",
      color: "forest",
      title: "AI / ML",
      items: [
        "Machine Learning",
        "TensorFlow",
        "Scikit-learn",
        "Model Evaluation",
        "Feature Engineering",
        "NLP",
      ],
    },
    {
      icon: "bar-chart-2",
      color: "amber",
      title: "Data Science",
      items: [
        "Data Analysis",
        "Data Visualization",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
      ],
    },
    {
      icon: "code-2",
      color: "blue",
      title: "Programming",
      items: [
        "Python",
        "C++",
        "JavaScript",
        "SQL (MySQL)",
      ],
    },
    {
      icon: "globe",
      color: "purple",
      title: "Web & APIs",
      items: [
        "HTML5 / CSS3",
        "Basic React",
        "Node.js",
        "FastAPI",
        "REST APIs",
      ],
    },
    {
      icon: "wrench",
      color: "slate",
      title: "Tools",
      items: [
        "Git & GitHub",
        "Google Colab",
        "Postman",
        "Figma",
        "Modal",
        "RoboFlow",
        "Deployment basics",
      ],
    },
  ],
};

export const projects = [
  {
    id: 1,
    number: "PROJECT 01",
    title: "Sentiment Analysis System",
    description:
      "A binary sentiment analysis system using NLP and ML techniques to classify text into positive and negative sentiments. Achieved 90.6% accuracy with SGDClassifier across a complete pipeline: preprocessing → feature engineering → training → evaluation.",
    highlights: [
      "90.6% accuracy with SGDClassifier",
      "Full NLP pipeline — tokenisation, stopword removal, TF-IDF",
      "Compared Logistic Regression, Naive Bayes, SGDClassifier",
    ],
    tags: ["Python", "NLP", "Scikit-learn", "TF-IDF", "Machine Learning"],
    github: "https://github.com/BasuPatil09/sentiment-analysis",
    year: "2026",
    image: null,
  },
];

export const experience = [
  {
    type: "volunteer",
    icon: "heart",
    color: "forest",
    title: "NSS Volunteer",
    organization: "KLS Gogte Institute of Technology",
    period: "Dec 2024 – Present",
    status: "Active",
    description:
      "Actively contributed to blood donation drives, environmental initiatives, orphanage social service activities, and community awareness campaigns. Supported event execution through poster design, video editing, and on-ground coordination.",
  },
];

export const education = [
  {
    icon: "graduation-cap",
    color: "forest",
    degree: "Bachelor of Engineering (CS & AIML)",
    institution: "KLS Gogte Institute of Technology",
    location: "Belagavi, Karnataka",
    period: "Sep 2024 – Present",
    status: "Currently enrolled",
  },
  {
    icon: "book-open",
    color: "amber",
    degree: "Intermediate Education (Science)",
    institution: "K.L.E. Society's Raja Lakhamagouda PU College",
    location: "Belagavi, Karnataka",
    period: "Jun 2022 – May 2024",
    status: "Completed",
  },
];

export const achievements = [
  {
    icon: "trophy",
    color: "amber",
    title: "Runner's Up",
    subtitle: "TECHNOTSAV 2K26 National Webathon",
    period: "April 2026",
    description:
      "Secured Runner-Up among 70+ teams across India by building a full-stack Land Ownership Management System enabling transparent, real-time access to land records for citizens and government authorities.",
  },
  {
    icon: "flag",
    color: "forest",
    title: "Youth Representative",
    subtitle: "MY BHARAT Budget Quest — Karnataka",
    period: "April 2026",
    description:
      "Selected as Karnataka Youth Representative for the Budget Quest — Youth Dialogue 2026. Participated in Youth Parliament debates and attended a virtual conference with PM Narendra Modi.",
  },
];

export const certifications = [
  {
    icon: "sparkles",
    color: "blue",
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "Oct 2024",
    topics: "LLMs, Prompt engineering, Responsible AI",
    link: "https://www.linkedin.com/learning/certificates/53b04cf8daffdfed42e7ae4820f920c1f9080005bdb5d7d534efba7dbe124246?trk=share_certificate",
  },
  {
    icon: "cpu",
    color: "forest",
    title: "Machine Learning with Python",
    issuer: "IBM (Coursera)",
    date: "May 2026",
    topics: "Supervised learning, Scikit-learn, Model evaluation",
    link: "https://www.coursera.org/account/accomplishments/verify/GUBPYIIGZXJZ",
  },
  {
    icon: "bar-chart-2",
    color: "amber",
    title: "Data Analysis with Python",
    issuer: "IBM (Coursera)",
    date: "May 2026",
    topics: "EDA, Data Cleaning, Pandas, NumPy, Matplotlib",
    link: "https://www.coursera.org/account/accomplishments/verify/DCSUQ3K4PD9A",
  },
  {
    icon: "bot",
    color: "purple",
    title: "Introduction to Agent Skills",
    issuer: "Anthropic (Skilljar)",
    date: "March 2026",
    topics: "Autonomous AI agents, Tool integration, LLM execution",
    link: "https://verify.skilljar.com/c/fpks28v84a6d",
  },
];
