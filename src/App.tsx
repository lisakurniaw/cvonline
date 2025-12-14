import React, { useState, useRef } from 'react';
import {
  Download,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Layout,
  Palette,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';


// --- Tipe Data ---
type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
};

type Education = {
  id: string;
  school: string;
  degree: string;
  year: string;
};

type PersonalInfo = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  photo: string | null;
};

// --- Data Awal (Default State) ---
const initialPersonalInfo: PersonalInfo = {
  fullName: "Daniel Gallego",
  title: "Arsitek & Desainer",
  email: "hello@reallygreatsite.com",
  phone: "123-456-7890",
  address: "123 Anywhere St., Any City",
  summary: "Saya merupakan seorang profesional dalam bidang arsitektur, dan telah berpengalaman lebih dari 2 tahun dalam pembangunan infrastruktur. Memiliki jiwa pemimpin serta mampu bekerja dalam tim untuk mencapai target proyek yang presisi.",
  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
};

const initialExperience: Experience[] = [
  {
    id: '1',
    company: "PT Borcelle",
    role: "Project Manager",
    period: "2020 - Sekarang",
    description: "Menganalisis data dan memantau kinerja di lapangan. Merancang pembuatan rencana anggaran belanja dan memimpin pelaksanaan pembangunan infrastruktur skala besar.",
  },
  {
    id: '2',
    company: "PT Fauget",
    role: "Junior Architect",
    period: "2018 - 2020",
    description: "Membangun dan merancang gambar gudang penyimpanan. Merancang pembuatan rencana anggaran belanja proyek perumahan.",
  }
];

const initialEducation: Education[] = [
  {
    id: '1',
    school: "Universitas Fauget",
    degree: "S1 Arsitektur",
    year: "2019",
  },
  {
    id: '2',
    school: "SMA Negeri 1 Fauget",
    degree: "Jurusan IPA",
    year: "2015",
  }
];

const initialSkills: string[] = ["Desain Bangunan", "AutoCAD", "Manajemen Proyek", "Analisis Anggaran", "Kepemimpinan", "Bermain Musik"];

// --- Definisi Template & Pattern ---

const layouts = [
  { id: 'modern', name: 'Modern Sidebar' },
  { id: 'classic', name: 'Classic Header' },
  { id: 'minimal', name: 'Clean Minimalist' },
  { id: 'bold', name: 'Bold Creative' },
  { id: 'executive', name: 'Executive Pro' },
  { id: 'compact', name: 'Compact Technical' },
  { id: 'geometric', name: 'Geometric Modern' },
  { id: 'stylish', name: 'Stylish Professional' },
  { id: 'overlap', name: 'Modern Overlap' },
  { id: 'elegant', name: 'Elegant Dark' },
];

const fontOptions = [
  { id: 'sans', name: 'Modern (Sans)', class: 'font-sans' },
  { id: 'serif', name: 'Classic (Serif)', class: 'font-serif' },
  { id: 'mono', name: 'Technical (Mono)', class: 'font-mono' },
];

const colorThemes = [
  { id: 'slate', name: 'Professional Grey', primary: 'text-slate-800', bg: 'bg-slate-800', border: 'border-slate-800', light: 'bg-slate-100', pill: 'bg-slate-700', lighter: 'bg-slate-200' },
  { id: 'blue', name: 'Corporate Blue', primary: 'text-blue-800', bg: 'bg-blue-800', border: 'border-blue-800', light: 'bg-blue-50', pill: 'bg-blue-700', lighter: 'bg-blue-100' },
  { id: 'emerald', name: 'Nature Green', primary: 'text-emerald-800', bg: 'bg-emerald-800', border: 'border-emerald-800', light: 'bg-emerald-50', pill: 'bg-emerald-700', lighter: 'bg-emerald-100' },
  { id: 'indigo', name: 'Royal Indigo', primary: 'text-indigo-800', bg: 'bg-indigo-800', border: 'border-indigo-800', light: 'bg-indigo-50', pill: 'bg-indigo-700', lighter: 'bg-indigo-100' },
  { id: 'rose', name: 'Dynamic Red', primary: 'text-rose-800', bg: 'bg-rose-800', border: 'border-rose-800', light: 'bg-rose-50', pill: 'bg-rose-700', lighter: 'bg-rose-100' },
  { id: 'violet', name: 'Creative Violet', primary: 'text-violet-800', bg: 'bg-violet-800', border: 'border-violet-800', light: 'bg-violet-50', pill: 'bg-violet-700', lighter: 'bg-violet-100' },
  { id: 'teal', name: 'Calm Teal', primary: 'text-teal-800', bg: 'bg-teal-800', border: 'border-teal-800', light: 'bg-teal-50', pill: 'bg-teal-700', lighter: 'bg-teal-100' },
  { id: 'orange', name: 'Warm Orange', primary: 'text-orange-700', bg: 'bg-orange-700', border: 'border-orange-700', light: 'bg-orange-50', pill: 'bg-orange-700', lighter: 'bg-orange-100' },
];

const backgroundPatterns = [
  { id: 'none', name: 'Solid (Polos)', style: {} },
  { id: 'gradient', name: 'Soft Gradient', style: { backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 100%)' } },
  { id: 'dots', name: 'Polka Dots', style: { backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' } },
  { id: 'lines', name: 'Stripes', style: { backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 10px)' } },
  { id: 'grid', name: 'Grid', style: { backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' } },
  { id: 'rhombus', name: 'Rhombus', style: { backgroundImage: 'linear-gradient(135deg, #0000000d 25%, transparent 25%), linear-gradient(225deg, #0000000d 25%, transparent 25%), linear-gradient(45deg, #0000000d 25%, transparent 25%), linear-gradient(315deg, #0000000d 25%, transparent 25%)', backgroundPosition: '10px 0, 10px 0, 0 0, 0 0', backgroundSize: '20px 20px', backgroundRepeat: 'repeat' } },
  { id: 'zigzag', name: 'Zigzag', style: { backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.05) 25%, transparent 25%), linear-gradient(225deg, rgba(0,0,0,0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%), linear-gradient(315deg, rgba(0,0,0,0.05) 25%, transparent 25%)', backgroundPosition: '10px 0, 10px 0, 0 0, 0 0', backgroundSize: '10px 10px', backgroundRepeat: 'repeat' } },
  { id: 'circles', name: 'Circles', style: { backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.05) 2px, transparent 2.5px)', backgroundSize: '15px 15px' } },
];

// --- Komponen Utama ---

export default function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperience);
  const [educations, setEducations] = useState<Education[]>(initialEducation);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState('');

  // State untuk Template
  const [selectedLayout, setSelectedLayout] = useState('elegant');
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [selectedPattern, setSelectedPattern] = useState('none');
  const [selectedFont, setSelectedFont] = useState('sans');
  const [activeTab, setActiveTab] = useState('editor');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handlePrint = () => {
    window.print();
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPersonalInfo({ ...personalInfo, photo: imageUrl });
    }
  };

  const removePhoto = () => {
    setPersonalInfo({ ...personalInfo, photo: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now().toString(), company: '', role: '', period: '', description: '' }]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    setEducations([...educations, { id: Date.now().toString(), school: '', degree: '', year: '' }]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // --- Watermark Component ---
  const Watermark = () => (
    <div className="absolute inset-0 z-[50] pointer-events-none flex flex-wrap content-center justify-center gap-x-12 gap-y-24 p-4 overflow-hidden opacity-10">
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="transform -rotate-45 text-slate-900 text-xl font-extrabold uppercase tracking-widest whitespace-nowrap select-none">
          Jasa CV online Murah
        </div>
      ))}
    </div>
  );

  // --- Render Preview Helper ---
  const currentTheme = colorThemes.find(t => t.id === selectedTheme) || colorThemes[0];
  const currentPattern = backgroundPatterns.find(p => p.id === selectedPattern) || backgroundPatterns[0];
  const currentFont = fontOptions.find(f => f.id === selectedFont) || fontOptions[0];

  const renderPreviewContent = () => {
    const wrapperClass = `w-full h-full bg-white shadow-lg min-h-[1123px] ${currentFont.class} text-slate-800 relative`;

    // Layout 1: Modern Sidebar
    if (selectedLayout === 'modern') {
      return (
        <div className={`${wrapperClass} flex flex-row`} id="cv-area">
          <Watermark />
          {/* Sidebar */}
          <div className={`w-1/3 ${currentTheme.bg} text-white p-8 flex flex-col gap-6 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={currentPattern.style}></div>
            
            <div className="relative z-10 flex flex-col items-center text-center mb-4">
               {personalInfo.photo && (
                 <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white/20 mb-4 shadow-lg" />
               )}
               <h1 className="text-2xl font-bold leading-tight">{personalInfo.fullName}</h1>
               <p className="text-md opacity-90 mt-2 font-light">{personalInfo.title}</p>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-3">Kontak</h3>
              <div className="text-sm space-y-2 opacity-90">
                <p>{personalInfo.email}</p>
                <p>{personalInfo.phone}</p>
                <p>{personalInfo.address}</p>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-3">Pendidikan</h3>
              <div className="space-y-4">
                {educations.map(edu => (
                  <div key={edu.id}>
                    <p className="font-bold text-sm">{edu.degree}</p>
                    <p className="text-xs">{edu.school}</p>
                    <p className="text-xs opacity-75">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-3">Keahlian</h3>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {skills.map((skill, i) => (
                  <span key={i} className="text-xs bg-white/20 px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-2/3 p-8">
            <div className="mb-8">
              <h2 className={`text-xl font-bold uppercase tracking-widest ${currentTheme.primary} border-b-2 ${currentTheme.border} pb-2 mb-4`}>Tentang Saya</h2>
              <p className="text-slate-600 leading-relaxed text-sm text-justify">{personalInfo.summary}</p>
            </div>

            <div>
              <h2 className={`text-xl font-bold uppercase tracking-widest ${currentTheme.primary} border-b-2 ${currentTheme.border} pb-2 mb-6`}>Pengalaman Kerja</h2>
              <div className="space-y-6">
                {experiences.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                      <span className={`text-sm font-medium ${currentTheme.primary}`}>{exp.period}</span>
                    </div>
                    <p className="text-slate-700 font-medium mb-2">{exp.company}</p>
                    <p className="text-slate-600 text-sm leading-relaxed text-justify whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Layout 2: Classic Header
    if (selectedLayout === 'classic') {
      return (
        <div className={`${wrapperClass} p-12`} id="cv-area">
          <Watermark />
          <header className={`border-b-2 ${currentTheme.border} pb-6 mb-8 flex items-center gap-8`}>
             {personalInfo.photo && (
               <div className="flex-shrink-0">
                  <img src={personalInfo.photo} alt="Profile" className={`w-32 h-32 rounded-lg object-cover shadow-sm border-2 ${currentTheme.border}`} />
               </div>
             )}
             <div className="flex-grow text-left">
                <h1 className={`text-4xl font-bold ${currentTheme.primary} mb-2 uppercase`}>{personalInfo.fullName}</h1>
                <p className="text-xl text-slate-600 mb-4 tracking-wide">{personalInfo.title}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <span>{personalInfo.email}</span>
                  <span>•</span>
                  <span>{personalInfo.phone}</span>
                  <span>•</span>
                  <span>{personalInfo.address}</span>
                </div>
             </div>
          </header>

          <section className="mb-6">
            <h2 className={`text-sm font-bold uppercase tracking-widest text-slate-800 bg-slate-100 p-2 mb-3 border-l-4 ${currentTheme.border} relative overflow-hidden`}>
              <span className="relative z-10">Ringkasan</span>
              <div className={`absolute inset-0 opacity-10 ${currentTheme.bg}`} style={currentPattern.style}></div>
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">{personalInfo.summary}</p>
          </section>

          <section className="mb-6">
            <h2 className={`text-sm font-bold uppercase tracking-widest text-slate-800 bg-slate-100 p-2 mb-4 border-l-4 ${currentTheme.border} relative overflow-hidden`}>
              <span className="relative z-10">Pengalaman</span>
              <div className={`absolute inset-0 opacity-10 ${currentTheme.bg}`} style={currentPattern.style}></div>
            </h2>
            <div className="space-y-5">
              {experiences.map(exp => (
                <div key={exp.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-slate-500 text-sm font-medium pt-1">{exp.period}</div>
                  <div className="col-span-9">
                    <h3 className="font-bold text-slate-800">{exp.role}</h3>
                    <p className={`text-sm ${currentTheme.primary} mb-1 italic`}>{exp.company}</p>
                    <p className="text-sm text-slate-600">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-8">
            <section>
              <h2 className={`text-sm font-bold uppercase tracking-widest text-slate-800 bg-slate-100 p-2 mb-4 border-l-4 ${currentTheme.border} relative overflow-hidden`}>
                 <span className="relative z-10">Pendidikan</span>
                 <div className={`absolute inset-0 opacity-10 ${currentTheme.bg}`} style={currentPattern.style}></div>
              </h2>
              <div className="space-y-3">
                {educations.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-800 text-sm">{edu.degree}</h3>
                    <p className="text-slate-600 text-xs">{edu.school}</p>
                    <p className="text-slate-400 text-xs">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className={`text-sm font-bold uppercase tracking-widest text-slate-800 bg-slate-100 p-2 mb-4 border-l-4 ${currentTheme.border} relative overflow-hidden`}>
                 <span className="relative z-10">Keahlian</span>
                 <div className={`absolute inset-0 opacity-10 ${currentTheme.bg}`} style={currentPattern.style}></div>
              </h2>
              <div className="flex flex-wrap gap-2">
                 {skills.map((skill, i) => (
                  <span key={i} className={`text-xs border ${currentTheme.border} ${currentTheme.primary} px-3 py-1 rounded-full`}>{skill}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      );
    }

    // Layout 3: Clean Minimalist
    if (selectedLayout === 'minimal') {
      return (
        <div className={`${wrapperClass} p-10`} id="cv-area">
          <Watermark />
          <div className="flex justify-between items-start border-b pb-6 mb-8 relative">
            <div>
              <h1 className="text-5xl font-thin text-slate-900 mb-1">{personalInfo.fullName}</h1>
              <p className={`text-xl font-medium ${currentTheme.primary}`}>{personalInfo.title}</p>
              <div className="mt-4 text-sm text-slate-500 leading-relaxed">
                <p>{personalInfo.email} • {personalInfo.phone}</p>
                <p>{personalInfo.address}</p>
              </div>
            </div>
            {personalInfo.photo && (
               <div className="flex-shrink-0 ml-4">
                  <img src={personalInfo.photo} alt="Profile" className="w-28 h-28 rounded-full object-cover shadow-md" />
               </div>
             )}
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 pr-4">
              <section className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Profil</h2>
                <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
              </section>

              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Experience</h2>
                <div className="space-y-8">
                  {experiences.map(exp => (
                    <div key={exp.id} className="relative pl-6 border-l border-slate-200">
                      <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full ${currentTheme.bg}`}></div>
                      <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                      <p className="text-slate-500 text-sm mb-2">{exp.company} | {exp.period}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="col-span-4 bg-slate-50 p-6 rounded-lg h-fit relative overflow-hidden">
               <div className="absolute inset-0 opacity-5 pointer-events-none" style={currentPattern.style}></div>

               <section className="mb-8 relative z-10">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Education</h2>
                <div className="space-y-4">
                  {educations.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-slate-800 text-sm">{edu.degree}</h3>
                      <p className="text-slate-600 text-xs">{edu.school}</p>
                      <p className={`text-xs ${currentTheme.primary} mt-1`}>{edu.year}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="relative z-10">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Skills</h2>
                <ul className="space-y-2">
                  {skills.map((skill, i) => (
                    <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 ${currentTheme.bg}`}></div>
                       {skill}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      );
    }

    // Layout 4: Executive Pro
    if (selectedLayout === 'executive') {
       return (
        <div className={`${wrapperClass} p-12 text-slate-900`} id="cv-area">
          <Watermark />
          <header className="flex flex-col items-center border-b-2 border-slate-800 pb-6 mb-8 text-center relative overflow-hidden">
             {/* Subtle Pattern in header */}
             <div className="absolute inset-0 opacity-5 pointer-events-none" style={currentPattern.style}></div>
             
             {personalInfo.photo && (
               <img src={personalInfo.photo} alt="Profile" className="w-28 h-28 rounded-full object-cover border-2 border-slate-800 mb-4 z-10" />
             )}
             <h1 className="text-4xl font-serif font-bold tracking-tight uppercase z-10">{personalInfo.fullName}</h1>
             <p className={`text-lg font-medium mt-1 uppercase tracking-widest ${currentTheme.primary} z-10`}>{personalInfo.title}</p>
             <div className="mt-3 text-sm font-medium flex gap-3 text-slate-600 z-10">
                <span>{personalInfo.email}</span> | <span>{personalInfo.phone}</span> | <span>{personalInfo.address}</span>
             </div>
          </header>

          <div className="space-y-8">
            <section>
               <h2 className="text-md font-bold uppercase border-b border-slate-400 pb-1 mb-3 tracking-widest">Professional Summary</h2>
               <p className="text-justify leading-relaxed text-sm">{personalInfo.summary}</p>
            </section>

            <section>
               <h2 className="text-md font-bold uppercase border-b border-slate-400 pb-1 mb-4 tracking-widest">Work Experience</h2>
               <div className="space-y-6">
                 {experiences.map(exp => (
                   <div key={exp.id}>
                      <div className="flex justify-between items-end mb-1">
                        <h3 className="font-bold text-lg">{exp.role}</h3>
                        <span className="text-sm font-bold text-slate-500">{exp.period}</span>
                      </div>
                      <div className={`text-sm font-bold mb-2 uppercase ${currentTheme.primary}`}>{exp.company}</div>
                      <p className="text-sm text-justify leading-relaxed">{exp.description}</p>
                   </div>
                 ))}
               </div>
            </section>

             <div className="grid grid-cols-2 gap-10">
               <section>
                  <h2 className="text-md font-bold uppercase border-b border-slate-400 pb-1 mb-4 tracking-widest">Education</h2>
                  <div className="space-y-4">
                    {educations.map(edu => (
                      <div key={edu.id}>
                        <h3 className="font-bold">{edu.degree}</h3>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="italic">{edu.school}</span>
                          <span className="font-medium text-slate-500">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </section>
               
               <section>
                  <h2 className="text-md font-bold uppercase border-b border-slate-400 pb-1 mb-4 tracking-widest">Core Competencies</h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.bg}`}></div>
                        {skill}
                      </div>
                    ))}
                  </div>
               </section>
             </div>
          </div>
        </div>
       );
    }

    // Layout 5: Compact Technical
    if (selectedLayout === 'compact') {
      return (
        <div className={`${wrapperClass} p-10`} id="cv-area">
          <Watermark />
          <header className={`flex justify-between items-center border-b-4 ${currentTheme.border} pb-6 mb-8`}>
             <div className="flex items-center gap-6">
               {personalInfo.photo && (
                 <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-lg object-cover shadow-sm" />
               )}
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">{personalInfo.fullName}</h1>
                  <p className={`text-lg font-mono mt-1 ${currentTheme.primary}`}>{personalInfo.title}</p>
               </div>
             </div>
             <div className="text-right text-xs font-mono text-slate-500 space-y-1">
                <p>{personalInfo.email}</p>
                <p>{personalInfo.phone}</p>
                <p>{personalInfo.address}</p>
             </div>
          </header>

          <div className="space-y-8">
             {/* Profile Section */}
             <div className="grid grid-cols-12 gap-6">
               <div className="col-span-3">
                 <h2 className={`text-sm font-bold uppercase tracking-wider text-right ${currentTheme.primary}`}>Profile</h2>
               </div>
               <div className="col-span-9">
                 <p className="text-sm leading-relaxed text-slate-700 border-l-2 border-slate-200 pl-4">{personalInfo.summary}</p>
               </div>
             </div>

             {/* Skills Section (Technical Style) */}
             <div className="grid grid-cols-12 gap-6">
               <div className="col-span-3">
                 <h2 className={`text-sm font-bold uppercase tracking-wider text-right ${currentTheme.primary}`}>Skills</h2>
               </div>
               <div className="col-span-9">
                  <div className="flex flex-wrap gap-2 border-l-2 border-slate-200 pl-4">
                     {skills.map((skill, i) => (
                      <span key={i} className="bg-slate-100 text-slate-800 px-2 py-1 text-xs font-mono rounded border border-slate-300">{skill}</span>
                    ))}
                  </div>
               </div>
             </div>

             {/* Experience Section */}
             <div className="grid grid-cols-12 gap-6">
               <div className="col-span-3">
                 <h2 className={`text-sm font-bold uppercase tracking-wider text-right ${currentTheme.primary}`}>Experience</h2>
               </div>
               <div className="col-span-9 space-y-6 border-l-2 border-slate-200 pl-4">
                  {experiences.map(exp => (
                    <div key={exp.id}>
                       <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-md">{exp.role}</h3>
                          <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">{exp.period}</span>
                       </div>
                       <div className="text-sm font-medium text-slate-500 mb-2">{exp.company}</div>
                       <p className="text-sm text-slate-600">{exp.description}</p>
                    </div>
                  ))}
               </div>
             </div>

             {/* Education Section */}
             <div className="grid grid-cols-12 gap-6">
               <div className="col-span-3">
                 <h2 className={`text-sm font-bold uppercase tracking-wider text-right ${currentTheme.primary}`}>Education</h2>
               </div>
               <div className="col-span-9 space-y-4 border-l-2 border-slate-200 pl-4">
                  {educations.map(edu => (
                    <div key={edu.id} className="flex justify-between">
                       <div>
                          <h3 className="font-bold text-sm">{edu.degree}</h3>
                          <div className="text-xs text-slate-500">{edu.school}</div>
                       </div>
                       <div className="text-xs font-mono text-slate-400">{edu.year}</div>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        </div>
      );
    }
    
    // Layout 6: Geometric Modern
    if (selectedLayout === 'geometric') {
      return (
        <div className={`${wrapperClass} flex flex-row relative overflow-hidden`} id="cv-area">
          <Watermark />
          {/* Top Decorative Shape */}
          <div 
             className={`absolute top-0 right-0 w-[80%] h-[200px] z-0 ${currentTheme.bg}`}
             style={{ 
               clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)',
               backgroundImage: currentPattern.style.backgroundImage
             }}
          ></div>
          
           <div 
             className="absolute top-0 left-0 w-[40%] h-[200px] bg-slate-900 z-0"
             style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
          ></div>

          {/* Left Sidebar */}
          <div className="w-[35%] bg-slate-900 text-white p-8 pt-[220px] flex flex-col gap-8 relative z-10">
             
             {/* Photo */}
             <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center w-full">
               {personalInfo.photo ? (
                 <img src={personalInfo.photo} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-slate-900 shadow-2xl z-20" />
               ) : (
                 <div className="w-40 h-40 rounded-full bg-slate-700 border-4 border-slate-900 z-20 flex items-center justify-center">
                    <User className="w-16 h-16 text-slate-400" />
                 </div>
               )}
             </div>

             <div className="mt-8">
               <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-4 border-b border-slate-700 pb-2">About Me</h3>
               <p className="text-sm text-slate-300 leading-relaxed text-justify">{personalInfo.summary}</p>
             </div>

             <div>
               <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-4 border-b border-slate-700 pb-2">Contact</h3>
               <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${currentTheme.bg}`}><MapPin className="w-4 h-4 text-white"/></div>
                    <span>{personalInfo.address}</span>
                  </div>
                   <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${currentTheme.bg}`}><Mail className="w-4 h-4 text-white"/></div>
                    <span>{personalInfo.email}</span>
                  </div>
                   <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${currentTheme.bg}`}><Phone className="w-4 h-4 text-white"/></div>
                    <span>{personalInfo.phone}</span>
                  </div>
               </div>
             </div>

             <div>
               <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-4 border-b border-slate-700 pb-2">Expertise</h3>
               <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                 {skills.map((skill, i) => (
                   <li key={i}>{skill}</li>
                 ))}
               </ul>
             </div>

          </div>

          {/* Right Content */}
          <div className="w-[65%] p-8 pt-12 relative z-10">
             
             {/* Header Info */}
             <div className="mb-16 pl-8">
                <h1 className="text-5xl font-bold text-white uppercase leading-tight drop-shadow-md text-right">{personalInfo.fullName.split(' ')[0]}</h1>
                <h1 className="text-5xl font-bold text-white uppercase leading-tight drop-shadow-md text-right mb-2">{personalInfo.fullName.split(' ').slice(1).join(' ')}</h1>
                <p className="text-xl text-white/90 uppercase tracking-widest text-right font-medium">{personalInfo.title}</p>
             </div>

             <div className="space-y-10 pl-4">
                {/* Experience */}
                <section>
                   <div className={`${currentTheme.pill || currentTheme.bg} text-white py-2 px-8 rounded-full inline-block mb-6 shadow-md`}>
                      <h2 className="text-lg font-bold uppercase tracking-wider">Experience</h2>
                   </div>
                   
                   <div className="space-y-6 border-l-2 border-slate-200 pl-6 ml-4">
                      {experiences.map(exp => (
                        <div key={exp.id} className="relative">
                           <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white ${currentTheme.bg}`}></div>
                           <h3 className="font-bold text-lg text-slate-900">{exp.company}</h3>
                           <div className="text-sm font-bold text-slate-500 mb-1">{exp.role} | {exp.period}</div>
                           <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                   </div>
                </section>

                {/* Education */}
                <section>
                   <div className={`${currentTheme.pill || currentTheme.bg} text-white py-2 px-8 rounded-full inline-block mb-6 shadow-md`}>
                      <h2 className="text-lg font-bold uppercase tracking-wider">Education</h2>
                   </div>
                   
                   <div className="space-y-6 border-l-2 border-slate-200 pl-6 ml-4">
                      {educations.map(edu => (
                        <div key={edu.id} className="relative">
                           <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white ${currentTheme.bg}`}></div>
                           <h3 className="font-bold text-lg text-slate-900">{edu.school}</h3>
                           <div className="text-sm font-bold text-slate-500 mb-1">{edu.degree}</div>
                           <p className="text-sm text-slate-400">{edu.year}</p>
                        </div>
                      ))}
                   </div>
                </section>
                
                 {/* Skills Summary */}
                <section>
                   <div className={`${currentTheme.pill || currentTheme.bg} text-white py-2 px-8 rounded-full inline-block mb-6 shadow-md`}>
                      <h2 className="text-lg font-bold uppercase tracking-wider">Skills Summary</h2>
                   </div>
                   
                   <div className="space-y-3 pl-4">
                      {skills.slice(0, 4).map((skill, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <div className="w-1/3 text-sm font-bold text-slate-700">{skill}</div>
                           <div className="w-2/3 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full ${currentTheme.bg}`} style={{ width: `${Math.floor(Math.random() * (95 - 70) + 70)}%` }}></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </section>

             </div>
          </div>
        </div>
      );
    }

    // Layout 7: Stylish Professional (Based on Daniel Gallego image)
    if (selectedLayout === 'stylish') {
      return (
        <div className={`${wrapperClass} flex flex-row relative`} id="cv-area">
           <Watermark />
           {/* Left Sidebar */}
           <div className={`w-[35%] ${currentTheme.lighter} flex flex-col py-12 px-6 border-r border-slate-200 items-center text-center`}>
              
              {/* Photo Box */}
              <div className="w-48 h-56 mb-10 bg-white p-2 shadow-lg rotate-1">
                 {personalInfo.photo ? (
                   <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                       <User size={48} />
                    </div>
                 )}
              </div>

              {/* Sidebar Content */}
              <div className="w-full space-y-8">
                 {/* Contact */}
                 <div>
                    <div className={`inline-block ${currentTheme.pill} text-white px-8 py-1.5 rounded-full font-bold uppercase text-sm mb-4 shadow-md`}>
                       Kontak
                    </div>
                    <div className="space-y-3 text-sm text-slate-600 font-medium">
                       <p>{personalInfo.phone}</p>
                       <p>{personalInfo.email}</p>
                       <p className="px-4 leading-tight">{personalInfo.address}</p>
                    </div>
                 </div>
                 
                 {/* Socials / Hobbies (Simulated using Contact or Static for visual fidelity) */}
                 <div>
                    <div className={`inline-block ${currentTheme.pill} text-white px-8 py-1.5 rounded-full font-bold uppercase text-sm mb-4 shadow-md`}>
                       Hobi
                    </div>
                    <ul className="text-sm text-slate-600 font-medium space-y-1">
                       <li>Membaca Buku</li>
                       <li>Bermain Musik</li>
                       <li>Traveling</li>
                    </ul>
                 </div>
                 
              </div>
           </div>

           {/* Right Main Content */}
           <div className="w-[65%] bg-white relative">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={currentPattern.style}></div>

              {/* Header Block */}
              <div className={`${currentTheme.bg} text-white p-10 rounded-bl-[4rem] mb-10 shadow-lg relative z-10`}>
                 <h1 className="text-4xl font-bold uppercase tracking-wide mb-1">{personalInfo.fullName}</h1>
                 <p className="text-xl opacity-90 font-light tracking-widest uppercase">{personalInfo.title}</p>
              </div>

              <div className="px-10 pb-10 space-y-8 relative z-10">
                 {/* About */}
                 <section>
                    <div className="flex items-center gap-4 mb-3">
                       <h2 className={`text-xl font-bold uppercase tracking-widest ${currentTheme.primary}`}>Tentang Saya</h2>
                       <div className={`h-0.5 flex-grow ${currentTheme.bg} opacity-50`}></div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify">{personalInfo.summary}</p>
                 </section>

                 {/* Education */}
                 <section>
                    <div className="flex items-center gap-4 mb-4">
                       <h2 className={`text-xl font-bold uppercase tracking-widest ${currentTheme.primary}`}>Pendidikan</h2>
                       <div className={`h-0.5 flex-grow ${currentTheme.bg} opacity-50`}></div>
                    </div>
                    <div className="space-y-4">
                       {educations.map(edu => (
                          <div key={edu.id} className="flex justify-between items-baseline">
                             <div>
                                <h3 className="font-bold text-slate-800">{edu.school}</h3>
                                <p className="text-sm text-slate-600">{edu.degree}</p>
                             </div>
                             <span className="font-bold text-slate-500 text-sm">{edu.year}</span>
                          </div>
                       ))}
                    </div>
                 </section>

                 {/* Experience */}
                 <section>
                    <div className="flex items-center gap-4 mb-4">
                       <h2 className={`text-xl font-bold uppercase tracking-widest ${currentTheme.primary}`}>Pengalaman Kerja</h2>
                       <div className={`h-0.5 flex-grow ${currentTheme.bg} opacity-50`}></div>
                    </div>
                    <div className="space-y-6">
                       {experiences.map(exp => (
                          <div key={exp.id}>
                             <div className="font-bold text-lg text-slate-800">{exp.company}</div>
                             <div className="text-sm font-bold text-slate-500 mb-2">{exp.role} ( {exp.period} )</div>
                             <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                          </div>
                       ))}
                    </div>
                 </section>
                 
                 {/* Skills */}
                 <section>
                    <div className="flex items-center gap-4 mb-4">
                       <h2 className={`text-xl font-bold uppercase tracking-widest ${currentTheme.primary}`}>Kemampuan</h2>
                       <div className={`h-0.5 flex-grow ${currentTheme.bg} opacity-50`}></div>
                    </div>
                    <ul className="list-disc list-inside grid grid-cols-2 gap-2 text-sm text-slate-700">
                       {skills.map((skill, i) => (
                          <li key={i}>{skill}</li>
                       ))}
                    </ul>
                 </section>
              </div>
           </div>
        </div>
      );
    }
    
    // Layout 8: Modern Overlap (Fixed - Photo in Sidebar)
    if (selectedLayout === 'overlap') {
       return (
         <div className={`${wrapperClass} flex flex-row bg-white relative min-h-[1123px]`} id="cv-area">
            <Watermark />
            {/* Sidebar Dark */}
            <div className="w-[35%] bg-slate-900 text-white flex flex-col items-center py-12 px-6 text-center relative z-20">
               
               {/* Photo - Centered in Sidebar */}
               <div className="mb-10">
                  <div className={`w-48 h-48 rounded-full border-8 border-slate-800 shadow-2xl overflow-hidden ${currentTheme.border}`}>
                      {personalInfo.photo ? (
                        <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                         <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-400">
                            <User size={64} />
                         </div>
                      )}
                  </div>
               </div>
               
               {/* Sidebar Content */}
               <div className="w-full space-y-10">
                   {/* Contact Info */}
                   <div>
                      <h3 className="text-lg font-serif mb-4 border-b border-slate-700 pb-2 inline-block">Contact</h3>
                      <div className="space-y-4 text-sm font-light text-slate-300">
                         <div className="flex flex-col items-center gap-1">
                            <div className={`p-2 rounded-full ${currentTheme.bg} mb-1`}><Phone size={16}/></div>
                            {personalInfo.phone}
                         </div>
                         <div className="flex flex-col items-center gap-1">
                            <div className={`p-2 rounded-full ${currentTheme.bg} mb-1`}><Mail size={16}/></div>
                            {personalInfo.email}
                         </div>
                         <div className="flex flex-col items-center gap-1">
                            <div className={`p-2 rounded-full ${currentTheme.bg} mb-1`}><MapPin size={16}/></div>
                            {personalInfo.address}
                         </div>
                      </div>
                   </div>
                   
                   {/* Expertise */}
                   <div>
                       <h3 className="text-lg font-serif mb-4 border-b border-slate-700 pb-2 inline-block">Expertise</h3>
                       <ul className="text-sm font-light text-slate-300 space-y-2">
                          {skills.map((skill, i) => (
                            <li key={i} className="flex items-center justify-center gap-2">
                               <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.bg}`}></div>
                               {skill}
                            </li>
                          ))}
                       </ul>
                   </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="w-[65%] flex flex-col relative z-10">
               
               {/* Header Strip - Top of Right Column */}
               <div className={`h-48 ${currentTheme.bg} w-full flex flex-col justify-center px-12 text-white shadow-md`}>
                   <h1 className="text-5xl font-bold uppercase tracking-wider leading-tight">{personalInfo.fullName}</h1>
                   <p className="text-xl font-light tracking-widest uppercase opacity-90 mt-2">{personalInfo.title}</p>
               </div>

               {/* Body Content */}
               <div className="p-12 space-y-10 bg-slate-50 flex-grow">
                  {/* About */}
                  <div className="mb-8">
                     <h2 className={`text-2xl font-serif ${currentTheme.primary} mb-3 border-b-2 border-slate-200 pb-2 inline-block`}>About Me</h2>
                     <p className="text-sm text-slate-600 leading-relaxed text-justify">{personalInfo.summary}</p>
                  </div>
                  
                  {/* Experience */}
                  <section>
                      <h2 className={`text-xl font-bold uppercase tracking-widest ${currentTheme.primary} mb-6 flex items-center gap-3`}>
                         <Briefcase size={20}/> Experience
                      </h2>
                      <div className="space-y-8 border-l-2 border-slate-300 pl-6 ml-2">
                         {experiences.map(exp => (
                            <div key={exp.id} className="relative">
                               <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full ${currentTheme.bg} border-2 border-white`}></div>
                               <h3 className="font-bold text-lg text-slate-900">{exp.company}</h3>
                               <div className={`text-sm font-bold ${currentTheme.primary} mb-2`}>{exp.role} | {exp.period}</div>
                               <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                            </div>
                         ))}
                      </div>
                  </section>

                   {/* Education */}
                  <section>
                      <h2 className={`text-xl font-bold uppercase tracking-widest ${currentTheme.primary} mb-6 flex items-center gap-3`}>
                         <GraduationCap size={20}/> Education
                      </h2>
                      <div className="space-y-4">
                         {educations.map(edu => (
                            <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                               <h3 className="font-bold text-slate-900">{edu.school}</h3>
                               <p className="text-sm text-slate-600">{edu.degree}</p>
                               <p className="text-xs text-slate-400 font-mono mt-1">{edu.year}</p>
                            </div>
                         ))}
                      </div>
                  </section>
               </div>
            </div>
         </div>
       );
    }

    // Layout 9: Elegant Dark (Based on Ketut Susilo image)
    if (selectedLayout === 'elegant') {
      return (
        <div className={`${wrapperClass} flex flex-col min-h-[1123px]`} id="cv-area">
          <Watermark />
          {/* Top Header - Light Background */}
          <div className={`h-auto ${currentTheme.light} p-12 flex items-center gap-10`}>
              {/* Photo */}
              <div className="flex-shrink-0">
                 {personalInfo.photo ? (
                   <img src={personalInfo.photo} alt="Profile" className={`w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg`} />
                 ) : (
                   <div className={`w-44 h-44 rounded-full ${currentTheme.bg} flex items-center justify-center text-white shadow-lg`}>
                      <User size={64} />
                   </div>
                 )}
              </div>
              {/* Text Info */}
              <div className="flex-grow">
                 <h1 className={`text-5xl font-bold ${currentTheme.primary} mb-2 tracking-tight`}>{personalInfo.fullName}</h1>
                 <p className="text-2xl font-bold italic text-slate-600 mb-6">{personalInfo.title}</p>
                 <p className="text-sm leading-relaxed text-slate-600 max-w-xl text-justify border-l-4 border-slate-300 pl-4">{personalInfo.summary}</p>
              </div>
          </div>

          {/* Body - Dark Background */}
          <div className={`flex-grow ${currentTheme.bg} text-white p-10 flex gap-10 relative`}>
              {/* Decorative Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={currentPattern.style}></div>

              {/* Left Card - Skills & Contact */}
              <div className={`w-1/3 relative z-10`}>
                 <div className={`${currentTheme.lighter} text-slate-800 rounded-3xl p-8 shadow-2xl h-full flex flex-col`}>
                    
                    {/* Skills Section */}
                    <div className="mb-10">
                       <div className={`${currentTheme.bg} text-white py-3 rounded-full flex items-center justify-center mb-6 shadow-md w-full`}>
                          <span className="text-sm font-bold tracking-[0.2em] uppercase">Kemampuan</span>
                       </div>
                       <div className="space-y-5">
                          {skills.map((skill, i) => (
                             <div key={i}>
                                <div className="text-xs font-bold mb-2 uppercase tracking-wide flex justify-between">
                                   <span>{skill}</span>
                                </div>
                                <div className="w-full bg-slate-300 h-3 rounded-full overflow-hidden">
                                   <div className={`h-full ${currentTheme.bg}`} style={{width: `${Math.floor(Math.random() * (95 - 60) + 60)}%`}}></div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-auto">
                       <hr className={`border-t-2 ${currentTheme.border} opacity-20 my-8`} />
                       <div className="space-y-6 text-sm font-medium">
                          <div className="flex items-center gap-4">
                             <div className={`p-2 rounded-lg ${currentTheme.bg} text-white`}><Phone size={18}/></div>
                             <div className="pt-1">{personalInfo.phone}</div>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className={`p-2 rounded-lg ${currentTheme.bg} text-white`}><Mail size={18}/></div>
                             <div className="pt-1 break-all">{personalInfo.email}</div>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className={`p-2 rounded-lg ${currentTheme.bg} text-white`}><MapPin size={18}/></div>
                             <div className="pt-1 leading-tight">{personalInfo.address}</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right Content - Education & Experience */}
              <div className="w-2/3 space-y-8 pt-4 relative z-10">
                 {/* Education */}
                 <section>
                    <div className={`${currentTheme.lighter} text-slate-800 py-2 px-8 rounded-full inline-block mb-6 shadow-lg`}>
                       <h2 className="text-lg font-bold tracking-[0.2em] uppercase">Edukasi</h2>
                    </div>
                    <div className="space-y-5">
                       {educations.map(edu => (
                          <div key={edu.id} className="relative pl-8 border-l-2 border-white/20">
                             <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-slate-500"></div>
                             <h3 className="font-bold text-lg tracking-wide">{edu.school}</h3>
                             <p className="text-white/80 text-sm mb-1">{edu.degree}</p>
                             <p className="text-xs text-white/50 font-mono tracking-widest">{edu.year}</p>
                          </div>
                       ))}
                    </div>
                 </section>

                 {/* Experience */}
                 <section>
                    <div className={`${currentTheme.lighter} text-slate-800 py-2 px-8 rounded-full inline-block mb-6 shadow-lg`}>
                       <h2 className="text-lg font-bold tracking-[0.2em] uppercase">Pengalaman</h2>
                    </div>
                    <div className="space-y-6">
                       {experiences.map(exp => (
                          <div key={exp.id} className="relative pl-8 border-l-2 border-white/20">
                             <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-slate-500"></div>
                             <h3 className="font-bold text-lg tracking-wide">{exp.company}</h3>
                             <div className="text-xs font-bold text-white/70 mb-2 uppercase tracking-wider">{exp.role} | {exp.period}</div>
                             <p className="text-xs leading-relaxed text-white/90 text-justify">{exp.description}</p>
                          </div>
                       ))}
                    </div>
                 </section>
              </div>
          </div>
        </div>
      );
    }

    // Default Fallback (Bold Creative)
    return (
      <div className={`${wrapperClass} shadow-lg`} id="cv-area">
        <Watermark />
        <div className={`${currentTheme.bg} p-12 text-center text-white relative overflow-hidden`}>
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={currentPattern.style}></div>
           <div className="relative z-10 flex flex-col items-center">
             {personalInfo.photo && (
                <img src={personalInfo.photo} alt="Profile" className="w-36 h-36 rounded-full object-cover border-4 border-white mb-6 shadow-xl" />
             )}
             <h1 className="text-4xl font-black uppercase tracking-widest mb-2">{personalInfo.fullName}</h1>
             <p className="font-light tracking-wider opacity-90">{personalInfo.title}</p>
           </div>
        </div>
        
        <div className={`grid grid-cols-12 ${currentTheme.light} min-h-[50px]`}>
           <div className="col-span-4 text-center py-4 border-r border-slate-200 text-xs text-slate-600 font-bold uppercase">{personalInfo.email}</div>
           <div className="col-span-4 text-center py-4 border-r border-slate-200 text-xs text-slate-600 font-bold uppercase">{personalInfo.phone}</div>
           <div className="col-span-4 text-center py-4 text-xs text-slate-600 font-bold uppercase">{personalInfo.address}</div>
        </div>

        <div className="p-12">
           <section className="mb-10 text-center max-w-2xl mx-auto">
             <p className="text-lg text-slate-600 italic leading-relaxed">"{personalInfo.summary}"</p>
           </section>

           <div className="grid grid-cols-1 gap-12">
             <section>
                <h2 className={`text-2xl font-black uppercase ${currentTheme.primary} mb-6 flex items-center gap-4`}>
                  <span className={`w-8 h-1 ${currentTheme.bg}`}></span>
                  Pengalaman
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {experiences.map(exp => (
                    <div key={exp.id} className="bg-slate-50 p-6 rounded border-l-4 border-slate-300 hover:border-slate-800 transition-colors">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold text-lg">{exp.role}</h3>
                        <span className="font-mono text-sm text-slate-500 bg-white px-2 py-1 rounded">{exp.period}</span>
                      </div>
                      <p className={`font-bold ${currentTheme.primary} text-sm mb-3 uppercase tracking-wider`}>{exp.company}</p>
                      <p className="text-slate-600 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
             </section>

             <div className="grid grid-cols-2 gap-12">
                <section>
                  <h2 className={`text-2xl font-black uppercase ${currentTheme.primary} mb-6 flex items-center gap-4`}>
                    <span className={`w-8 h-1 ${currentTheme.bg}`}></span>
                    Pendidikan
                  </h2>
                  <div className="space-y-4">
                    {educations.map(edu => (
                      <div key={edu.id} className="border-b border-slate-200 pb-4">
                        <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                        <p className="text-slate-600 text-sm">{edu.school}</p>
                        <p className="text-slate-400 text-xs mt-1">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className={`text-2xl font-black uppercase ${currentTheme.primary} mb-6 flex items-center gap-4`}>
                    <span className={`w-8 h-1 ${currentTheme.bg}`}></span>
                    Skillset
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => (
                      <span key={i} className={`${currentTheme.bg} text-white px-4 py-2 text-sm font-bold rounded shadow-sm`}>{skill}</span>
                    ))}
                  </div>
                </section>
             </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      
      {/* Header Bar */}
      <div className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50 print:hidden flex justify-between items-center">
        <div className="flex items-center gap-2">
           <Layout className="w-6 h-6 text-blue-400" />
           <h1 className="text-xl font-bold">Auto CV Generator</h1>
        </div>
        <div className="flex gap-4">
           {/* Tab Switcher for Mobile */}
           <div className="lg:hidden flex bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 text-sm rounded ${activeTab === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
              >
                Editor
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-sm rounded ${activeTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
              >
                Preview
              </button>
           </div>
           
           <button 
             onClick={handlePrint}
             className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20"
           >
             <Download className="w-4 h-4" />
             <span className="hidden sm:inline">Download PDF</span>
           </button>
        </div>
      </div>

      <div className="container mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT PANEL: EDITOR */}
        <div className={`w-full lg:w-5/12 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'} print:hidden`}>
          
          {/* Template Selector */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
               <Palette className="w-5 h-5 text-blue-600" />
               Desain & Tampilan
             </h2>
             
             <div className="mb-4">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Layout Struktur</label>
               <div className="grid grid-cols-2 gap-2">
                 {layouts.map(l => (
                   <button
                     key={l.id}
                     onClick={() => setSelectedLayout(l.id)}
                     className={`p-3 text-sm font-medium rounded-lg border-2 transition-all text-left
                       ${selectedLayout === l.id ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300'}`}
                   >
                     {l.name}
                   </button>
                 ))}
               </div>
             </div>

             <div className="mb-4">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Gaya Huruf (Font)</label>
               <div className="grid grid-cols-3 gap-2">
                 {fontOptions.map(f => (
                   <button
                     key={f.id}
                     onClick={() => setSelectedFont(f.id)}
                     className={`p-2 text-xs font-medium rounded border transition-all text-center
                       ${selectedFont === f.id ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                   >
                     <span className={f.class}>{f.name}</span>
                   </button>
                 ))}
               </div>
             </div>

             <div className="mb-4">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Tema Warna</label>
               <div className="flex gap-3 flex-wrap">
                 {colorThemes.map(t => (
                   <button
                     key={t.id}
                     onClick={() => setSelectedTheme(t.id)}
                     className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${t.bg}
                       ${selectedTheme === t.id ? 'ring-4 ring-offset-2 ring-slate-300' : ''}`}
                     title={t.name}
                   >
                     {selectedTheme === t.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Corak Background</label>
               <div className="grid grid-cols-3 gap-2">
                 {backgroundPatterns.map(p => (
                   <button
                     key={p.id}
                     onClick={() => setSelectedPattern(p.id)}
                     className={`p-2 text-xs font-medium rounded border transition-all overflow-hidden relative
                       ${selectedPattern === p.id ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                   >
                     <div className="absolute inset-0 opacity-10" style={p.style}></div>
                     <span className="relative z-10">{p.name}</span>
                   </button>
                 ))}
               </div>
             </div>
          </div>

          {/* Form: Personal Info & Photo */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Informasi Pribadi
            </h2>
            
            {/* Photo Upload */}
            <div className="mb-6 p-4 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center bg-slate-50 group hover:border-blue-400 transition-colors">
               {personalInfo.photo ? (
                 <div className="relative">
                   <img src={personalInfo.photo} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                   <button onClick={removePhoto} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600">
                     <Trash2 className="w-4 h-4" />
                   </button>
                 </div>
               ) : (
                 <div className="flex flex-col items-center text-slate-400">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-2">
                       <ImageIcon className="w-6 h-6 text-slate-300" />
                    </div>
                    <span className="text-sm font-medium">Upload Pas Foto</span>
                 </div>
               )}
               <input 
                 ref={fileInputRef}
                 type="file" 
                 accept="image/*" 
                 onChange={handlePhotoUpload} 
                 className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${personalInfo.photo ? 'hidden' : 'block'}`}
               />
            </div>

            <div className="space-y-4">
              <input type="text" name="fullName" placeholder="Nama Lengkap" value={personalInfo.fullName} onChange={handleInfoChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="title" placeholder="Judul Pekerjaan (Contoh: Marketing Manager)" value={personalInfo.title} onChange={handleInfoChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                 <input type="email" name="email" placeholder="Email" value={personalInfo.email} onChange={handleInfoChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                 <input type="text" name="phone" placeholder="No. Telepon" value={personalInfo.phone} onChange={handleInfoChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <input type="text" name="address" placeholder="Alamat Singkat" value={personalInfo.address} onChange={handleInfoChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              <textarea name="summary" placeholder="Ringkasan Profesional" value={personalInfo.summary} onChange={handleInfoChange} rows={4} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
            </div>
          </div>

          {/* Form: Experience */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" /> Pengalaman
              </h2>
              <button onClick={addExperience} className="text-blue-600 hover:bg-blue-50 p-1 rounded-full"><Plus className="w-5 h-5" /></button>
            </div>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 relative group">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                  <div className="space-y-3">
                    <input type="text" placeholder="Posisi / Jabatan" value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} className="w-full p-2 bg-white border rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm font-bold" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Perusahaan" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full p-2 bg-white border rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm" />
                      <input type="text" placeholder="Periode (2020 - 2021)" value={exp.period} onChange={(e) => updateExperience(exp.id, 'period', e.target.value)} className="w-full p-2 bg-white border rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm" />
                    </div>
                    <textarea placeholder="Deskripsi pekerjaan..." value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows={3} className="w-full p-2 bg-white border rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm resize-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form: Education */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" /> Pendidikan
              </h2>
              <button onClick={addEducation} className="text-blue-600 hover:bg-blue-50 p-1 rounded-full"><Plus className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 relative group">
                   <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                   <div className="grid grid-cols-1 gap-2">
                      <input type="text" placeholder="Gelar / Jurusan" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full p-2 bg-white border rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm font-bold" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Sekolah / Universitas" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} className="w-full p-2 bg-white border rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm" />
                        <input type="text" placeholder="Tahun" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} className="w-full p-2 bg-white border rounded focus:ring-1 focus:ring-blue-500 outline-none text-sm" />
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form: Skills */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-600" /> Keahlian (Skills)
            </h2>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="Tambah skill baru..." 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={addSkill} className="bg-slate-800 text-white px-4 rounded-lg hover:bg-slate-700">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 group">
                  {skill}
                  <button onClick={() => removeSkill(index)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: LIVE PREVIEW */}
        <div className={`w-full lg:w-7/12 flex flex-col items-center ${activeTab === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="sticky top-24 w-full flex flex-col items-center">
             <div className="mb-4 text-slate-500 text-sm print:hidden">
               Live Preview (A4 Size)
             </div>
             
             {/* THE A4 PAPER CONTAINER */}
             <div className="shadow-2xl print:shadow-none w-full max-w-[210mm] bg-white print:w-full overflow-hidden">
                {renderPreviewContent()}
             </div>
          </div>
        </div>

      </div>

      {/* CSS untuk Print agar ukuran pas A4 dan elemen UI hilang */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white;
            -webkit-print-color-adjust: exact;
          }
          #cv-area {
            width: 210mm;
            min-height: 297mm;
            height: auto;
            margin: 0;
            page-break-after: avoid;
          }
          /* Hide everything except cv-area */
          body > *:not(#root) { display: none; }
          #root > div { background: white; }
          nav, button, input, textarea, .print\\:hidden { display: none !important; }
          /* Ensure layout containers are full width */
          .container { width: 100% !important; max-width: none !important; padding: 0 !important; margin: 0 !important; display: block !important; }
          .lg\\:w-5\\/12 { display: none !important; }
          .lg\\:w-7\\/12 { width: 100% !important; display: block !important; }
          .sticky { position: static !important; }
        }
      `}</style>

    </div>
  );
}