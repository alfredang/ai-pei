"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import {
  HiBookOpen,
  HiAcademicCap,
  HiUserGroup,
  HiCalendarDays,
  HiClipboardDocumentCheck,
  HiCheckBadge,
} from "react-icons/hi2";

const TABS = [
  {
    id: "overview",
    label: "Course Overview",
    icon: HiBookOpen,
  },
  {
    id: "outcomes",
    label: "Program Outcomes",
    icon: HiAcademicCap,
  },
  {
    id: "who",
    label: "Who Should Enroll",
    icon: HiUserGroup,
  },
  {
    id: "intake",
    label: "Intake & Schedule",
    icon: HiCalendarDays,
  },
  {
    id: "requirements",
    label: "Requirements",
    icon: HiClipboardDocumentCheck,
  },
  {
    id: "graduation",
    label: "Graduation",
    icon: HiCheckBadge,
  },
];

export function CourseDetails() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section id="course-details" className="relative py-20 overflow-hidden">
      <div className="grid-bg opacity-30" />
      <div
        className="glow-blob"
        style={{
          top: "20%",
          right: "-5%",
          width: 480,
          height: 480,
          background: "radial-gradient(circle, #59EBFD 0%, transparent 60%)",
          opacity: 0.08,
        }}
      />

      <Container className="relative">
        <div className="text-center mb-12">
          <div className="kicker mb-4">[ COURSE DETAILS ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Everything You Need to <span className="gradient-text">Know</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            Comprehensive information about the Advanced Certificate in Cyber Security program.
          </p>
        </div>

        {/* Tab bar */}
        <div className="relative mb-10">
          <div className="flex overflow-x-auto gap-1 pb-px border-b border-white/8 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn flex items-center gap-2 ${activeTab === tab.id ? "tab-active" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab panels */}
        <div className="glass p-8 md:p-10 min-h-[320px]">
          {activeTab === "overview" && (
            <div className="reveal">
              <h3 className="font-display font-bold text-2xl text-white mb-5">
                Advanced Certificate in Cyber Security — Course Overview
              </h3>
              <div className="space-y-4 text-(--color-muted) leading-relaxed">
                <p>
                  The <span className="text-white font-semibold">Advanced Certificate in Cyber Security</span> is a structured,
                  industry-aligned training pathway designed to equip learners with the essential technical competencies and
                  practical skills required for entry-level and intermediate roles in the cybersecurity sector.
                </p>
                <p>
                  This certification consists of <span className="text-white font-semibold">four stackable modules</span>,
                  including <span className="text-(--color-cyan)">three foundation modules</span> and{" "}
                  <span className="text-(--color-amber)">one elective module</span>, all of which follow recognized{" "}
                  <span className="text-white font-semibold">CompTIA syllabus</span>, ensuring relevance to real-world job demands
                  and global certification standards.
                </p>
                <p>
                  Learners who complete CompTIA A+, Security+, and Linux+ (the foundation modules), along with one elective
                  module — either CompTIA CySA+ or CompTIA PenTest+ — will be awarded the Advanced Certificate in Cyber Security.
                </p>
                <p>
                  Each module follows the official CompTIA syllabus, ensuring strong industry alignment and relevance to
                  the cybersecurity job market. Learners will gain practical, hands-on experience in IT support, system
                  administration, network security, threat detection, and vulnerability assessment.
                </p>
              </div>
            </div>
          )}

          {activeTab === "outcomes" && (
            <div className="reveal">
              <h3 className="font-display font-bold text-2xl text-white mb-5">
                Program Outcomes
              </h3>
              <p className="text-(--color-muted) mb-6 leading-relaxed">
                By completing this stackable certification pathway, learners will:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Develop a solid foundation in IT support, networking, system administration, and security principles.",
                  "Acquire job-ready cybersecurity skills aligned with CompTIA industry standards.",
                  "Gain hands-on experience through practical labs and real-world case scenarios.",
                  "Be prepared to sit for globally recognized CompTIA certification exams (A+, Security+, Linux+, CySA+, PenTest+).",
                  "Qualify for roles such as IT Support Technician, Security Analyst, SOC Analyst, Cybersecurity Technician, Penetration Tester, or Vulnerability Assessor.",
                ].map((outcome) => (
                  <div key={outcome} className="flex gap-3 p-4 rounded-lg bg-white/3 border border-white/6">
                    <HiCheckBadge className="w-5 h-5 text-(--color-cyan) shrink-0 mt-0.5" />
                    <span className="text-sm text-white/85 leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "who" && (
            <div className="reveal">
              <h3 className="font-display font-bold text-2xl text-white mb-5">
                Who Should Enroll
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  {
                    title: "Aspiring Cybersecurity Professionals",
                    desc: "Individuals looking to start a career in the fast-growing cybersecurity sector.",
                  },
                  {
                    title: "Career Switchers",
                    desc: "Professionals from other fields entering the IT or cybersecurity domain.",
                  },
                  {
                    title: "Technical Staff",
                    desc: "IT support staff and system administrators seeking structured skills upgrading.",
                  },
                  {
                    title: "Certification Seekers",
                    desc: "Individuals aiming for globally recognized CompTIA certifications.",
                  },
                ].map((item) => (
                  <div key={item.title} className="glass-soft p-5 hover:border-(--color-cyan)/30 transition-colors">
                    <h4 className="font-display font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-(--color-muted) leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "intake" && (
            <div className="reveal">
              <h3 className="font-display font-bold text-2xl text-white mb-5">
                Intake Dates & Schedule
              </h3>
              <div className="space-y-3 mb-8">
                {[
                  { period: "3 Nov 2025 – 29 Sep 2026", status: "Open" },
                  { period: "2 Jan 2026 – 2 Mar 2026", status: "Open" },
                  { period: "2 Mar 2026 – 27 Apr 2026", status: "Open" },
                  { period: "4 May 2026 – 26 Jun 2026", status: "Open" },
                ].map((intake) => (
                  <div
                    key={intake.period}
                    className="flex items-center justify-between px-5 py-4 rounded-lg bg-white/3 border border-white/6"
                  >
                    <div className="flex items-center gap-3">
                      <HiCalendarDays className="w-5 h-5 text-(--color-cyan)" />
                      <span className="text-white font-medium">{intake.period}</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-(--color-green) px-3 py-1 rounded-full bg-(--color-green)/10 border border-(--color-green)/25">
                      {intake.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="p-5 rounded-lg bg-white/3 border border-white/6">
                  <div className="kicker mb-2">Duration</div>
                  <p className="text-white font-semibold">2 months (Full-Time)</p>
                </div>
                <div className="p-5 rounded-lg bg-white/3 border border-white/6">
                  <div className="kicker mb-2">Mode of Learning</div>
                  <p className="text-white font-semibold">Online Classes (E-Learning)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "requirements" && (
            <div className="reveal">
              <h3 className="font-display font-bold text-2xl text-white mb-5">
                Enrolment Requirements
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    label: "Age",
                    value: "21 years old and above",
                    icon: "🎂",
                  },
                  {
                    label: "Language Proficiency",
                    value: "At least C6 for GCE \"O\" Level English",
                    icon: "📝",
                  },
                  {
                    label: "Academic",
                    value: "At least C6 for GCE \"O\" Level in any 3 subjects",
                    icon: "🎓",
                  },
                ].map((req) => (
                  <div key={req.label} className="glass-soft p-5 text-center hover:border-(--color-cyan)/30 transition-colors">
                    <div className="text-3xl mb-3">{req.icon}</div>
                    <div className="font-display font-bold text-white mb-2">{req.label}</div>
                    <p className="text-sm text-(--color-muted)">{req.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-5 rounded-lg bg-white/3 border border-white/6">
                <div className="kicker mb-2">Assessment</div>
                <p className="text-white/85 text-sm">
                  3-hour online assessment after each module completion.
                </p>
              </div>
            </div>
          )}

          {activeTab === "graduation" && (
            <div className="reveal">
              <h3 className="font-display font-bold text-2xl text-white mb-5">
                Graduation Requirements
              </h3>
              <div className="grid md:grid-cols-2 gap-5 mb-8">
                <div className="glass-soft p-6 text-center hover:border-(--color-green)/30 transition-colors">
                  <div className="text-4xl font-display font-extrabold text-(--color-green) mb-2">75%</div>
                  <div className="font-display font-bold text-white mb-1">Attendance</div>
                  <p className="text-sm text-(--color-muted)">Minimum attendance required across all modules</p>
                </div>
                <div className="glass-soft p-6 text-center hover:border-(--color-cyan)/30 transition-colors">
                  <div className="text-4xl mb-2">✓</div>
                  <div className="font-display font-bold text-white mb-1">Assessment Passed</div>
                  <p className="text-sm text-(--color-muted)">Pass all module assessments to graduate</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-lg bg-white/3 border border-white/6">
                  <div className="kicker mb-2">Post-Course Support</div>
                  <p className="text-white/85 text-sm leading-relaxed">
                    We provide free consultation related to the subject matter after the course. Email your queries to{" "}
                    <a href="mailto:enquiry@tertiaryinfotech.com" className="text-(--color-cyan) hover:underline">
                      enquiry@tertiaryinfotech.com
                    </a>{" "}
                    and we will forward your queries to the subject matter experts.
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-white/3 border border-white/6">
                  <div className="kicker mb-2">Course Code</div>
                  <p className="text-white font-mono font-semibold">TGS-2025060519</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
