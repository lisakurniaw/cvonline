import { useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";

/* =======================
   TYPES
======================= */
type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

type Education = {
  id: string;
  school: string;
  degree: string;
  year: string;
};

/* =======================
   APP
======================= */
export default function App() {
  /* ---------- PERSONAL ---------- */
  const [fullName, setFullName] = useState("Daniel Gallego");
  const [title, setTitle] = useState("Arsitek & Desainer");
  const [email, setEmail] = useState("hello@reallygreatsite.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [address, setAddress] = useState("123 Anywhere St., Any City");
  const [summary, setSummary] = useState(
    "Saya merupakan seorang profesional dalam bidang arsitektur dan telah berpengalaman lebih dari 2 tahun dalam pembangunan infrastruktur."
  );

  /* ---------- EXPERIENCE ---------- */
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      role: "Project Manager",
      company: "PT Borcelle",
      period: "2020 - Sekarang",
      description:
        "Memimpin proyek pembangunan infrastruktur dan mengelola tim lapangan.",
    },
  ]);

  /* ---------- EDUCATION ---------- */
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      school: "Universitas Fauget",
      degree: "S1 Arsitektur",
      year: "2019",
    },
  ]);

  /* =======================
     HANDLERS
  ======================= */
  const addExperience = () =>
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        role: "",
        company: "",
        period: "",
        description: "",
      },
    ]);

  const removeExperience = (id: string) =>
    setExperiences(experiences.filter((e) => e.id !== id));

  const addEducation = () =>
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        school: "",
        degree: "",
        year: "",
      },
    ]);

  const removeEducation = (id: string) =>
    setEducations(educations.filter((e) => e.id !== id));

  const printCV = () => window.print();

  /* =======================
     UI
  ======================= */
  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center print:hidden">
        <h1 className="text-xl font-bold">Auto CV Generator</h1>
        <button
          onClick={printCV}
          className="bg-blue-600 px-4 py-2 rounded flex items-center gap-2"
        >
          <Download size={16} />
          Print / Save PDF
        </button>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* ================= EDITOR ================= */}
        <section className="space-y-6 print:hidden">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold mb-4">Informasi Pribadi</h2>
            <input
              className="input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nama Lengkap"
            />
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Profesi"
            />
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telepon"
            />
            <input
              className="input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Alamat"
            />
            <textarea
              className="input"
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Ringkasan"
            />
          </div>

          {/* EXPERIENCE */}
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">Pengalaman</h2>
              <button onClick={addExperience}>
                <Plus />
              </button>
            </div>

            {experiences.map((e) => (
              <div key={e.id} className="border p-3 rounded mb-3 relative">
                <button
                  onClick={() => removeExperience(e.id)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <Trash2 size={14} />
                </button>
                <input
                  className="input"
                  placeholder="Posisi"
                  value={e.role}
                  onChange={(ev) =>
                    setExperiences(
                      experiences.map((x) =>
                        x.id === e.id ? { ...x, role: ev.target.value } : x
                      )
                    )
                  }
                />
                <input
                  className="input"
                  placeholder="Perusahaan"
                  value={e.company}
                  onChange={(ev) =>
                    setExperiences(
                      experiences.map((x) =>
                        x.id === e.id ? { ...x, company: ev.target.value } : x
                      )
                    )
                  }
                />
                <input
                  className="input"
                  placeholder="Periode"
                  value={e.period}
                  onChange={(ev) =>
                    setExperiences(
                      experiences.map((x) =>
                        x.id === e.id ? { ...x, period: ev.target.value } : x
                      )
                    )
                  }
                />
                <textarea
                  className="input"
                  rows={3}
                  placeholder="Deskripsi"
                  value={e.description}
                  onChange={(ev) =>
                    setExperiences(
                      experiences.map((x) =>
                        x.id === e.id
                          ? { ...x, description: ev.target.value }
                          : x
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>

          {/* EDUCATION */}
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">Pendidikan</h2>
              <button onClick={addEducation}>
                <Plus />
              </button>
            </div>

            {educations.map((e) => (
              <div key={e.id} className="border p-3 rounded mb-3 relative">
                <button
                  onClick={() => removeEducation(e.id)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <Trash2 size={14} />
                </button>
                <input
                  className="input"
                  placeholder="Sekolah"
                  value={e.school}
                  onChange={(ev) =>
                    setEducations(
                      educations.map((x) =>
                        x.id === e.id ? { ...x, school: ev.target.value } : x
                      )
                    )
                  }
                />
                <input
                  className="input"
                  placeholder="Gelar"
                  value={e.degree}
                  onChange={(ev) =>
                    setEducations(
                      educations.map((x) =>
                        x.id === e.id ? { ...x, degree: ev.target.value } : x
                      )
                    )
                  }
                />
                <input
                  className="input"
                  placeholder="Tahun"
                  value={e.year}
                  onChange={(ev) =>
                    setEducations(
                      educations.map((x) =>
                        x.id === e.id ? { ...x, year: ev.target.value } : x
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
        </section>

        {/* ================= PREVIEW ================= */}
        <section className="bg-white p-10 shadow print:w-full" id="cv-area">
          <h1 className="text-4xl font-bold text-blue-700">{fullName}</h1>
          <h2 className="text-xl italic mb-4">{title}</h2>
          <p className="mb-6">{summary}</p>

          <h3 className="font-bold mt-6">Pengalaman</h3>
          {experiences.map((e) => (
            <div key={e.id} className="mb-4">
              <strong>{e.role}</strong> – {e.company} ({e.period})
              <p className="text-sm">{e.description}</p>
            </div>
          ))}

          <h3 className="font-bold mt-6">Pendidikan</h3>
          {educations.map((e) => (
            <div key={e.id}>
              {e.degree} – {e.school} ({e.year})
            </div>
          ))}
        </section>
      </div>

      {/* PRINT STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-area, #cv-area * {
            visibility: visible;
          }
          #cv-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            min-height: 297mm;
          }
        }
      `}</style>
    </div>
  );
}
