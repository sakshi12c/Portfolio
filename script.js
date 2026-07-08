/* ========================================
   SAKSHI CHILLA — PORTFOLIO · script.js
   ======================================== */

/* ---- HAMBURGER / MOBILE DRAWER ---- */
const hamburger   = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobile-drawer');

hamburger.addEventListener('click', () => {
  const isOpen = mobileDrawer.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
});

mobileDrawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (mobileDrawer.classList.contains('open') &&
      !mobileDrawer.contains(e.target) &&
      !hamburger.contains(e.target)) {
    mobileDrawer.classList.remove('open');
    hamburger.classList.remove('open');
  }
});


/* ---- PROJECT SCROLL BUTTONS ---- */
const scrollLeftBtn  = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');
const projectsGrid   = document.getElementById('projects-grid');

if (scrollLeftBtn && scrollRightBtn && projectsGrid) {
  const scrollAmount = 360; // Match card width + gap
  
  scrollLeftBtn.addEventListener('click', () => {
    projectsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  
  scrollRightBtn.addEventListener('click', () => {
    projectsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}


/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ---- NAV ACTIVE LINK ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));


/* ---- PDF RESUME DOWNLOAD ---- */
document.getElementById('download-resume').addEventListener('click', function () {
  // jsPDF loaded from CDN in index.html
  if (typeof window.jspdf === 'undefined') {
    alert('PDF library is still loading. Please try again in a moment.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW   = doc.internal.pageSize.getWidth();
  const margin  = 18;
  const colW    = pageW - margin * 2;
  let y         = 0;

  // ---- helpers ----
  const addPage = () => { doc.addPage(); y = margin; };

  const checkY = (needed = 10) => { if (y + needed > 272) addPage(); };

  const line = (color = [220, 220, 220]) => {
    checkY(6);
    doc.setDrawColor(...color);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 5;
  };

  const text = (str, x, fontSize = 10, style = 'normal', color = [60, 60, 80]) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', style);
    doc.setTextColor(...color);
    doc.text(str, x, y);
  };

  const wrappedText = (str, x, w, fontSize = 9.5, style = 'normal', color = [80, 80, 100]) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', style);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(str, w);
    checkY(lines.length * 5 + 2);
    doc.text(lines, x, y);
    y += lines.length * 5 + 2;
  };

  const sectionTitle = (title) => {
    checkY(14);
    y += 4;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(124, 58, 237);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    line([200, 190, 255]);
  };

  // ===== HEADER BLOCK =====
  // Violet top bar
  doc.setFillColor(124, 58, 237);
  doc.rect(0, 0, pageW, 36, 'F');

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('SAKSHI PRAFULLA CHILLA', margin, 16);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(210, 200, 255);
  doc.text('Software Developer  ·  BCA Graduate  ·  Published Researcher', margin, 24);

  doc.setFontSize(8.5);
  doc.setTextColor(220, 215, 255);
  doc.text(
    'sakshichilla7@gmail.com   |   +91 9579011801   |   linkedin.com/in/sakshi-chilla   |   Solapur, Maharashtra',
    margin, 31
  );

  y = 44;

  // ===== SUMMARY =====
  sectionTitle('Professional Summary');
  wrappedText(
    'Motivated BCA graduate with hands-on internship experience in software development and SQL. Published research papers in cybersecurity, AI, and digital commerce. National award winner at TECHNOVA 2026 and Dexter Innofest 2026; IIIT Delhi Tech Frontier 2025 finalist. Proficient in Python, C#/.NET, SQL, Power BI, and modern web technologies.',
    margin, colW
  );

  // ===== EDUCATION =====
  sectionTitle('Education');
  text('Prin. K.P. Mangalvedhekar Institute of Management, Solapur', margin, 10.5, 'bold', [28, 28, 46]);
  text('Jul 2023 – Apr 2026', pageW - margin - 32, 10.5, 'normal', [120, 120, 154]);
  y += 6;
  text('Bachelor of Computer Applications (BCA)  |  CGPA: 8.42', margin, 9.5, 'normal', [80, 80, 100]);
  y += 5;
  text('Coursework: OOP · DSA · DBMS · OS · Data Science · Power BI · Data Warehousing', margin, 8.5, 'normal', [140, 140, 160]);
  y += 7;

  // ===== EXPERIENCE =====
  sectionTitle('Work Experience');

  const jobs = [
    {
      company: 'Lemonade Software Developers',
      role: 'Software Development Intern',
      dates: 'Jan 2026 – Feb 2026',
      bullets: [
        'Strengthened practical skills in Windows application architecture and database-driven app design.',
        'Gained hands-on experience with the C# / .NET development workflow in a professional environment.',
      ],
    },
    {
      company: 'Elevate Labs',
      role: 'SQL Developer Intern',
      dates: 'Oct 2025 – Dec 2025',
      bullets: [
        'Executed real-world SQL tasks demonstrating strong analytical and professional skills.',
        'Built and optimised queries on real datasets in a fast-paced environment.',
      ],
    },
  ];

  jobs.forEach(job => {
    checkY(18);
    text(job.company, margin, 10.5, 'bold', [28, 28, 46]);
    text(job.dates, pageW - margin - 32, 10.5, 'normal', [120, 120, 154]);
    y += 6;
    text(job.role, margin, 9.5, 'italic', [124, 58, 237]);
    y += 6;
    job.bullets.forEach(b => {
      const lines = doc.splitTextToSize(`• ${b}`, colW - 4);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 100);
      checkY(lines.length * 5);
      doc.text(lines, margin + 2, y);
      y += lines.length * 5 + 1;
    });
    y += 4;
  });

  // ===== PROJECTS =====
  sectionTitle('Projects');

  const projects = [
    {
      name: 'BuildGuard',
      stack: 'Node.js · Express · SQLite · Web App',
      url: 'build-guard-flax.vercel.app',
      bullets: [
        'Full-stack web tool for reproducible-build verification in C programs.',
        'Detects tampering in software build processes — inspired by the 2020 SolarWinds supply chain attack.',
        'National award winner (TECHNOVA 2026 & Dexter Innofest 2026). Accompanied by a published research paper.',
      ],
    },
    {
      name: 'DarkShield — Dark Pattern Detector',
      stack: 'Pure HTML · CSS · JavaScript · CORS Proxy · Regex Detection',
      url: 'dark-shield-dark-pattern-detector.vercel.app',
      bullets: [
        'Browser-based tool that detects deceptive UX patterns (fake urgency, hidden fees, confirm shaming, etc.).',
        'Runs entirely client-side; users enter a URL or paste HTML for instant analysis.',
        'Outputs threat score, evidence panel, and report export. Inspired by ASCI/DoCA reports & EU regulations.',
      ],
    },
    {
      name: 'SoftLicense Manager',
      stack: 'C# · .NET · SQL Server · Windows Desktop',
      url: '',
      bullets: [
        'Desktop application for enterprise software license administration.',
        'Tracks license records, monitors expiration dates, and generates automated reports.',
        'Final-year BCA project with a real-world enterprise use case.',
      ],
    },
  ];

  projects.forEach(proj => {
    checkY(20);
    text(proj.name, margin, 10.5, 'bold', [28, 28, 46]);
    y += 6;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(124, 58, 237);
    doc.text(`Stack: ${proj.stack}`, margin, y);
    if (proj.url) {
      doc.setTextColor(124, 58, 237);
      doc.text(`  |  ${proj.url}`, margin + doc.getTextWidth(`Stack: ${proj.stack}`), y);
    }
    y += 6;
    proj.bullets.forEach(b => {
      const lines = doc.splitTextToSize(`• ${b}`, colW - 4);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 100);
      checkY(lines.length * 5);
      doc.text(lines, margin + 2, y);
      y += lines.length * 5 + 1;
    });
    y += 5;
  });

  // ===== SKILLS =====
  sectionTitle('Technical Skills');
  const skills = [
    ['Languages',     'C#, Python, Core Java, C, C++, SQL'],
    ['Web & Backend', 'HTML5, CSS3, JavaScript, ASP.NET Core MVC, Flask, Node.js'],
    ['Tools',         'Power BI, Advanced Excel, GitHub, Firebase'],
  ];
  skills.forEach(([cat, vals]) => {
    checkY(8);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(28, 28, 46);
    doc.text(`${cat}: `, margin, y);
    const labelW = doc.getTextWidth(`${cat}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 100);
    const lines = doc.splitTextToSize(vals, colW - labelW);
    doc.text(lines, margin + labelW, y);
    y += lines.length * 5 + 2;
  });
  y += 3;

  // ===== RESEARCH =====
  sectionTitle('Research Publications');
  const papers = [
    'Evolution of Ransomware Attacks and Mitigation Strategies',
    'Human-Machine Collaboration in Industry 5.0 (SYNERGY Framework)',
    'The Economics of Digital Shadows — Akshara MRJ, Jan 2026 (73% poor purchase decisions)',
    'Role of AI in Modern Education (Survey: 120 students, 26 educators)',
    'Additional papers: cybersecurity, Indian heritage architecture, reproducible builds',
  ];
  papers.forEach((p, i) => {
    checkY(7);
    const lines = doc.splitTextToSize(`${i + 1}. ${p}`, colW - 4);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 100);
    doc.text(lines, margin + 2, y);
    y += lines.length * 5 + 2;
  });
  doc.setFontSize(8.5);
  doc.setTextColor(124, 58, 237);
  checkY(6);
  doc.text('Full list: independent.academia.edu/SakshiChilla', margin + 2, y);
  y += 7;

  // ===== CERTIFICATIONS =====
  sectionTitle('Certifications');
  wrappedText(
    'C · C++ · C# · Python · Core Java · Advanced Java · Data Structures · Web Designing · SQL · Advanced Excel · Network Fundamentals · Data Science',
    margin, colW
  );

  // ===== ACHIEVEMENTS =====
  sectionTitle('Achievements & Recognition');
  const awards = [
    '3rd Prize (National) — Dexter Innofest 2026, Punyashlok Ahilyadevi Holkar Solapur University',
    '3rd Prize (National) — TECHNOVA 2026 Poster Presentation: AI in Cybersecurity',
    'Finalist — Tech Frontier 2025, organized by IIIT Delhi on Unstop',
    '2nd Prize — Intercollegiate Cyber Security Seminar (Ransomware Research Paper)',
    '2nd Prize — Intercollegiate Industry 5.0 Seminar (Research Paper Presentation)',
    '3rd Prize — Indian Knowledge System Seminar (Cultural Convergence in Stone)',
  ];
  awards.forEach(a => {
    checkY(7);
    const lines = doc.splitTextToSize(`• ${a}`, colW - 4);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 100);
    doc.text(lines, margin + 2, y);
    y += lines.length * 5 + 2;
  });

  // ===== FOOTER =====
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 200);
    doc.text(`Sakshi Chilla · sakshichilla7@gmail.com · Page ${i} of ${totalPages}`, margin, 290);
  }

  doc.save('Sakshi_Chilla_Resume.pdf');

  // Button feedback
  const btn = document.getElementById('download-resume');
  const orig = btn.textContent;
  btn.textContent = 'Downloaded! ✓';
  btn.disabled = true;
  setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2500);
});


/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');
const submitBtn   = document.getElementById('form-submit');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    showStatus('Please fill in all fields.', 'error'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus('Please enter a valid email address.', 'error'); return;
  }

  submitBtn.textContent = 'Opening mail client…';
  submitBtn.disabled = true;
  clearStatus();

  const mailto =
    `mailto:sakshichilla7@gmail.com` +
    `?subject=${encodeURIComponent('[Portfolio] ' + subject)}` +
    `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  window.location.href = mailto;

  setTimeout(() => {
    showStatus('Your mail client has opened with the message pre-filled. Hit send from there!', 'success');
    contactForm.reset();
    submitBtn.textContent = 'Send Message →';
    submitBtn.disabled = false;
  }, 900);
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
}
function clearStatus() {
  formStatus.textContent = '';
  formStatus.className = 'form-status';
}


/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
