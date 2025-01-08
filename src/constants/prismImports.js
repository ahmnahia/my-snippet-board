import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import "prismjs/components/prism-go";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-git";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-powershell";
import "prismjs/themes/prism-tomorrow.css";

export const prismLanguages = {
  javascript: { name: "JavaScript" },
  css: { name: "CSS" },
  html: { name: "HTML", doNotImport: true },
  go: { name: "GO" },
  java: { name: "Java" },
  c: { name: "C" },
  cpp: { name: "C++" },
  csharp: { name: "C#" },
  xml: { name: "XML", doNotImport: true },
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
  svg: { name: "SVG", doNotImport: true },
};

const sorted = Object.keys(prismLanguages).sort((key1, key2) =>
  key1.localeCompare(key2)
);
export const prismLanguagesSorted = sorted.map((eachKey) => ({
  prismKey: eachKey,
  name: prismLanguages[eachKey].name,
}));
