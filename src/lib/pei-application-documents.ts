import JSZip from "jszip";

type CourseRecord = {
  title: string;
  slug: string;
  courseCode: string | null;
  certificate: string | null;
  summary: string | null;
  overview: string | null;
  outcomes: string | null;
  whoShouldEnroll: string | null;
  assessment: string | null;
};

type ModuleRecord = {
  title: string;
  details: string | null;
  sessions: string | null;
  duration: string | null;
  sortOrder: number;
};

export type PeiApplicationCourse = CourseRecord & {
  modules: ModuleRecord[];
};

const PEI_NAME = "Tertiary Infotech Academy";
const PEI_LEGAL_NAME = "Tertiary Infotech Academy Pte Ltd";
const MANAGER_NAME = "Dr. Ang Chew Hoe";
const COURSE_WRITEUP_TEMPLATE_URL =
  "https://www.tpgateway.gov.sg/docs/default-source/default-document-library/resources/course-write-up-%28courses-other-than-edps%29.docx?sfvrsn=48eea8bb_3";
const ELEARNING_CHECKLIST_TEMPLATE_URL =
  "https://www.tpgateway.gov.sg/docs/default-source/default-document-library/information-for-private-education-institutions/information-required-for-e-learning-courses.docx?sfvrsn=997a67_2";

type DocBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "table"; rows: string[][] };

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitLines(value: string | null | undefined): string[] {
  return (value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normaliseModuleTitle(title: string, index: number): string {
  return title.trim() || `Module ${index + 1}`;
}

function moduleRows(course: PeiApplicationCourse): string[][] {
  const modules =
    course.modules.length > 0
      ? course.modules
      : [{ title: "Module 1", details: "To be confirmed.", sessions: null, duration: null, sortOrder: 0 }];

  return [
    ["S/N", "Module Title", "Learning Objective / Details", "Sessions / Duration"],
    ...modules.map((module, index) => [
      String(index + 1),
      normaliseModuleTitle(module.title, index),
      module.details || "Learners will develop the required knowledge and skills for this module.",
      [module.sessions, module.duration].filter(Boolean).join(" / ") || "10 sessions / 30 hours",
    ]),
  ];
}

function sessionModel(course: PeiApplicationCourse): string {
  const count = Math.max(course.modules.length, 1);
  const sessions = count * 10;
  const instructional = count * 9;
  const assessment = count;
  const hours = sessions * 3;
  return `${count} modules x 10 sessions x 3 hours = ${hours} hours (${instructional} instructional sessions + ${assessment} assessment sessions). Classes are conducted live online for 3 nights per week, 7:00 PM - 10:00 PM.`;
}

function paragraph(text: string, style?: string): string {
  const styleXml = style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : "";
  const lines = text.split("\n");
  const textXml = lines
    .map((line, index) => {
      const br = index === 0 ? "" : "<w:br/>";
      return `${br}<w:t xml:space="preserve">${escapeXml(line)}</w:t>`;
    })
    .join("");
  return `<w:p>${styleXml}<w:r>${textXml}</w:r></w:p>`;
}

function table(rows: string[][]): string {
  const rowXml = rows
    .map((row, rowIndex) => {
      const cells = row
        .map((cell) => {
          const pStyle = rowIndex === 0 ? "TableHeader" : undefined;
          return `<w:tc><w:tcPr><w:tcW w:w="2400" w:type="dxa"/></w:tcPr>${paragraph(cell, pStyle)}</w:tc>`;
        })
        .join("");
      return `<w:tr>${cells}</w:tr>`;
    })
    .join("");
  return `<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:left w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:right w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="808080"/></w:tblBorders></w:tblPr>${rowXml}</w:tbl>`;
}

function documentXml(blocks: DocBlock[]): string {
  const body = blocks
    .map((block) => {
      if (block.type === "h1") return paragraph(block.text, "Title");
      if (block.type === "h2") return paragraph(block.text, "Heading1");
      if (block.type === "bullets") {
        return block.items.map((item) => paragraph(`• ${item}`)).join("");
      }
      if (block.type === "table") return table(block.rows);
      return paragraph(block.text);
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${body}
    <w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>
  </w:body>
</w:document>`;
}

const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="22"/></w:rPr><w:pPr><w:spacing w:after="160"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="32"/></w:rPr><w:pPr><w:spacing w:after="240"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="26"/></w:rPr><w:pPr><w:spacing w:before="240" w:after="120"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="TableHeader"><w:name w:val="Table Header"/><w:basedOn w:val="Normal"/><w:rPr><w:b/></w:rPr></w:style>
</w:styles>`;

async function makeDocx(blocks: DocBlock[]): Promise<Buffer> {
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`,
  );
  zip.folder("_rels")?.file(
    ".rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
  );
  zip.folder("word")?.file("document.xml", documentXml(blocks));
  zip.folder("word")?.file("styles.xml", stylesXml);
  zip.folder("word")?.folder("_rels")?.file(
    "document.xml.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`,
  );
  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

function certificateTitle(course: PeiApplicationCourse): string {
  return course.certificate?.trim() || course.title;
}

function minimumEntryItems(): string[] {
  return [
    'Age: 21 years old.',
    'Language proficiency: At least C6 for GCE "O" Level English or equivalent.',
    'Academic: At least C6 for GCE "O" Level in any 3 subjects or equivalent.',
    "Recommended but not mandatory: basic IT literacy, basic programming familiarity, and readiness for live online classes.",
  ];
}

function courseProposal(course: PeiApplicationCourse): DocBlock[] {
  return [
    { type: "h1", text: "Course Proposal" },
    { type: "p", text: `Private Education Institution: ${PEI_LEGAL_NAME}` },
    { type: "p", text: `Course Title: ${course.title}` },
    { type: "p", text: `Qualification: ${certificateTitle(course)}` },
    { type: "h2", text: "Course Rationale" },
    { type: "p", text: course.summary || course.overview || "This course is proposed to equip learners with current industry-relevant knowledge and practical skills." },
    { type: "h2", text: "Learning Outcomes" },
    { type: "bullets", items: splitLines(course.outcomes).length ? splitLines(course.outcomes) : ["Explain core concepts covered by the course.", "Apply practical skills through guided exercises.", "Complete module-level assessments to demonstrate learning achievement."] },
    { type: "h2", text: "Target Audience" },
    { type: "bullets", items: splitLines(course.whoShouldEnroll).length ? splitLines(course.whoShouldEnroll) : ["Adult learners and working professionals seeking structured upskilling.", "Learners who meet the minimum entry requirements."] },
    { type: "h2", text: "Modules" },
    { type: "table", rows: moduleRows(course) },
    { type: "h2", text: "Delivery and Assessment" },
    { type: "p", text: sessionModel(course) },
    { type: "p", text: `Assessment: ${course.assessment || "One assessment at the end of each module."}` },
  ];
}

function sampleCertificate(course: PeiApplicationCourse): DocBlock[] {
  return [
    { type: "h1", text: "Sample Certificate" },
    { type: "p", text: PEI_NAME },
    { type: "p", text: "This is to certify that" },
    { type: "h2", text: "[Learner Name]" },
    { type: "p", text: "has successfully completed all requirements for" },
    { type: "h2", text: certificateTitle(course) },
    { type: "p", text: `Course Title: ${course.title}` },
    { type: "p", text: `Course Code: ${course.courseCode || "To be assigned"}` },
    { type: "p", text: "Date of Award: [DD Month YYYY]" },
    { type: "p", text: "Authorised Signatory: ______________________________" },
    { type: "p", text: `For and on behalf of ${PEI_LEGAL_NAME}` },
  ];
}

function academicBoardMinutes(course: PeiApplicationCourse): DocBlock[] {
  return [
    { type: "h1", text: "Academic Board Approval Minutes" },
    { type: "p", text: `Private Education Institution: ${PEI_LEGAL_NAME}` },
    { type: "p", text: "Meeting Date: [DD Month YYYY]" },
    { type: "p", text: "Venue / Mode: Online meeting" },
    { type: "h2", text: "Agenda" },
    { type: "p", text: `Review and approval of ${course.title}.` },
    { type: "h2", text: "Resolution" },
    { type: "p", text: `The Academic Board reviewed the course proposal, curriculum structure, minimum entry requirements, delivery mode, assessment approach, and qualification title for ${course.title}.` },
    { type: "p", text: `Resolved that the course be approved for submission to SSG, subject to management completing the required ERF course application documents and maintaining records of trainer deployment and assessment approval.` },
    { type: "h2", text: "Approved Course Details" },
    { type: "table", rows: [["Item", "Approved Detail"], ["Course Title", course.title], ["Qualification", certificateTitle(course)], ["Delivery Mode", "100% synchronous e-learning"], ["Course Hours", sessionModel(course)]] },
    { type: "p", text: "Chairperson Signature: ______________________________" },
  ];
}

function minimumEntryRequirements(course: PeiApplicationCourse): DocBlock[] {
  return [
    { type: "h1", text: "Minimum Entry Requirements" },
    { type: "p", text: `Course Title: ${course.title}` },
    { type: "p", text: `Qualification: ${certificateTitle(course)}` },
    { type: "h2", text: "Minimum Requirements" },
    { type: "bullets", items: minimumEntryItems() },
    { type: "h2", text: "Admission Review" },
    { type: "p", text: "Applicants who do not meet the standard academic profile may be reviewed case-by-case based on relevant work experience, prior learning, or equivalent qualifications." },
  ];
}

function eLearningChecklist(course: PeiApplicationCourse): DocBlock[] {
  return [
    { type: "h1", text: "E-Learning Information Checklist" },
    { type: "p", text: `Based on TP Gateway E-Learning Information Checklist template: ${ELEARNING_CHECKLIST_TEMPLATE_URL}` },
    { type: "p", text: `Course Title: ${course.title}` },
    { type: "table", rows: [["Checklist Item", "Course Response"], ["Delivery mode", "100% synchronous live virtual classes"], ["Class timing", "3 nights per week, 7:00 PM - 10:00 PM"], ["Learning hours", sessionModel(course)], ["Learner identity / attendance", "Attendance is taken for each live session. Learner identity is verified through login, attendance records, and instructor interaction."], ["Assessment", course.assessment || "One assessment at the end of each module."], ["Learning platform", "Video conferencing and learning management tools used for live lessons, resources, submissions, and learner support."], ["Technical support", "Learners receive onboarding instructions and support contacts before course commencement."]] },
  ];
}

function courseWriteUp(course: PeiApplicationCourse): DocBlock[] {
  return [
    { type: "h1", text: "Course Write-up for Courses Other than External Degree Programmes" },
    { type: "p", text: `Based on TP Gateway course write-up template: ${COURSE_WRITEUP_TEMPLATE_URL}` },
    { type: "table", rows: [["Key Item", "PEI Input"], ["Course Title", course.title], ["Course Developer", `Self-developed by ${PEI_NAME}`], ["Qualification to be Awarded", certificateTitle(course)], ["Qualification to be Awarded By", PEI_NAME], ["Brief Description", course.overview || course.summary || "Structured private education course delivered by live e-learning."], ["Mode of Delivery", "E-learning (100% synchronous live virtual classes)"], ["Course Hours", sessionModel(course)], ["Minimum Entry Requirements", minimumEntryItems().join("\n")]] },
    { type: "h2", text: "Learning Objectives by Module" },
    { type: "table", rows: moduleRows(course) },
  ];
}

export async function generatePeiApplicationPack(course: PeiApplicationCourse): Promise<Buffer> {
  const zip = new JSZip();
  const docs: [string, DocBlock[]][] = [
    ["01 Sample Certificate.docx", sampleCertificate(course)],
    ["02 Academic Board Approval Minutes.docx", academicBoardMinutes(course)],
    ["03 Course Proposal.docx", courseProposal(course)],
    ["04 Minimum Entry Requirements.docx", minimumEntryRequirements(course)],
    ["05 E-Learning Checklist.docx", eLearningChecklist(course)],
    ["06 TP Gateway Course Write-up.docx", courseWriteUp(course)],
  ];

  for (const [filename, blocks] of docs) {
    zip.file(filename, await makeDocx(blocks));
  }

  zip.file(
    "README.txt",
    [
      `Generated for: ${course.title}`,
      `Generated by: ${PEI_NAME} CMS`,
      "",
      "Official TP Gateway references used:",
      `- ERF resources page: https://www.tpgateway.gov.sg/resources/information-for-private-education-institutions-%28peis%29/enhanced-registration-framework-%28erf%29/where-can-i-get-more-information`,
      `- Course write-up template: ${COURSE_WRITEUP_TEMPLATE_URL}`,
      `- E-learning information checklist: ${ELEARNING_CHECKLIST_TEMPLATE_URL}`,
      "",
      "Review all generated documents before submission. Replace placeholders such as learner name, meeting date, and signatures.",
    ].join("\n"),
  );

  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

export function peiApplicationPackFilename(course: Pick<PeiApplicationCourse, "slug" | "title">) {
  const base = (course.slug || course.title || "course")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "course"}-pei-application-documents.zip`;
}
