"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HiAcademicCap, HiChartBar, HiCpuChip, HiCodeBracket, HiBriefcase } from "react-icons/hi2";
import { useEffect, useRef } from "react";

const MOCK_COURSES = [
  {
    id: "course-1",
    title: "Generative AI for Executives",
    category: "Leadership & AI",
    duration: "2 Days",
    icon: <HiBriefcase className="w-6 h-6 text-(--color-amber)" />,
    gradient: "from-(--color-amber)/20 to-transparent",
    borderHover: "hover:border-(--color-amber)/40",
  },
  {
    id: "course-2",
    title: "WSQ Data Analytics with Python",
    category: "Data Science",
    duration: "3 Days",
    icon: <HiChartBar className="w-6 h-6 text-(--color-cyan)" />,
    gradient: "from-(--color-cyan)/20 to-transparent",
    borderHover: "hover:border-(--color-cyan)/40",
  },
  {
    id: "course-3",
    title: "Advanced Prompt Engineering",
    category: "AI Tools",
    duration: "1 Day",
    icon: <HiCpuChip className="w-6 h-6 text-(--color-purple)" />,
    gradient: "from-(--color-purple)/20 to-transparent",
    borderHover: "hover:border-(--color-purple)/40",
  },
  {
    id: "course-4",
    title: "Full-Stack Web Development BootCamp",
    category: "Software Engineering",
    duration: "5 Days",
    icon: <HiCodeBracket className="w-6 h-6 text-(--color-green)" />,
    gradient: "from-(--color-green)/20 to-transparent",
    borderHover: "hover:border-(--color-green)/40",
  },
  {
    id: "course-5",
    title: "Certified AI Ethics & Governance",
    category: "Compliance",
    duration: "2 Days",
    icon: <HiAcademicCap className="w-6 h-6 text-white" />,
    gradient: "from-white/20 to-transparent",
    borderHover: "hover:border-white/40",
  },
];

// Duplicate the courses many times to create a practically infinite native scroll 
// without any JavaScript fighting the browser's momentum/snap mechanics.
const SETS_COUNT = 14; 
const START_INDEX = Math.floor(SETS_COUNT / 2);

export function CoursesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start in the middle of the massive list so the user can swipe left or right forever
    const singleSet = el.children[1] as HTMLElement;
    if (singleSet) {
      const jumpDistance = singleSet.offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
      el.scrollLeft = jumpDistance * START_INDEX;
    }
  }, []);

  return (
    <section id="featured-courses" className="relative pt-24 pb-16 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "10%",
          left: "-10%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, var(--color-purple) 0%, transparent 60%)",
          opacity: 0.15,
        }}
      />
      <Container className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="kicker mb-3">[ FEATURED PROGRAMS ]</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1]">
              Explore Our <span className="gradient-text">Top Courses</span>
            </h2>
            <p className="mt-4 text-(--color-muted) max-w-xl text-lg">
              Level up your skills with our industry-leading, SSG-approved training programs designed for the future of work.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="#contact" className="btn-secondary">
              View All Courses
            </Link>
          </div>
        </div>

        <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" 
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {Array.from({ length: SETS_COUNT }).map((_, setIdx) => (
              <div key={setIdx} className="flex gap-6 shrink-0">
                {MOCK_COURSES.map((course, idx) => (
                  <div
                    key={`${setIdx}-${course.id}-${idx}`}
                    className={`shrink-0 w-[280px] sm:w-[320px] snap-center sm:snap-start relative group card-hover`}
                  >
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <div className={`relative h-full glass-soft p-6 sm:p-8 flex flex-col justify-between border ${course.borderHover} transition-colors overflow-hidden`}>
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${course.gradient} blur-[40px] rounded-full -mr-10 -mt-10 opacity-50`} />
                      
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner relative z-10">
                          {course.icon}
                        </div>
                        <div className="kicker mb-2 !text-(--color-muted)">{course.category}</div>
                        <h3 className="font-display font-bold text-xl text-white leading-snug mb-3 relative z-10">
                          {course.title}
                        </h3>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
                        <span className="text-sm font-medium text-(--color-muted)">
                          {course.duration}
                        </span>
                        <button className="text-sm font-bold text-white flex items-center gap-1 opacity-70 group-hover:opacity-100 group-hover:text-(--color-cyan) transition-all">
                          Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
