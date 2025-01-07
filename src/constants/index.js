export const boardSize = 15000;

const prismLanguages = {
  javascript: { name: "JavaScript" },
  css: { name: "CSS" },
  html: { name: "HTML" },
  go: { name: "GO" },
  java: { name: "Java" },
  c: { name: "C" },
  cpp: { name: "C++" },
  csharp: { name: "C#" },
  xml: { name: "xml" },
  php: { name: "PHP" },
  sql: { name: "SQL" },
  git: { name: "Git" },
  perl: { name: "Perl" },
  json: { name: "JSON" },
  python: { name: "Python" },
  bash: { name: "Bash" },
  swift: { name: "Swift" },
  typescript: { name: "TypeScript" },
  yaml: { name: "YAML" },
  powershell: { name: "PowerShell" },
  svg: { name: "SVG" },
};

const sorted = Object.keys(prismLanguages).sort((key1, key2) =>
  key1.localeCompare(key2)
);
export const prismLanguagesSorted = sorted.map((eachKey) => ({
  prismKey: eachKey,
  name: prismLanguages[eachKey].name,
}));
