import graduationCap from "../assets/icons/graduation-cap.svg";
import studyBook from "../assets/icons/study-book.svg";
import calendarMoon from "../assets/icons/calendar-moon.svg";
import codeMonitor from "../assets/icons/code-monitor.svg";
import weatherCloud from "../assets/icons/weather-sun-cloud.svg";
import gestureTouchpad from "../assets/icons/gesture-touchpad.svg";
import pdfKeyboard from "../assets/icons/pdf-keyboard.svg";
import checklist from "../assets/icons/checklist.svg";
import terminal from "../assets/icons/terminal.svg";
import compassMountain from "../assets/icons/compass-mountain.svg";
import lineCounterIcon from "../assets/icons/line-counter.svg";
import smms from "../assets/imgs/SMMS.webp";
import smms1 from "../assets/imgs/SMMS1.webp";
import smms2 from "../assets/imgs/SMMS2.webp";
import smms3 from "../assets/imgs/SMMS3.webp";
import smms4 from "../assets/imgs/SMMS4.webp";
import smms5 from "../assets/imgs/SMMS5.webp";
import smms6 from "../assets/imgs/SMMS6.webp";
import smms7 from "../assets/imgs/SMMS7.webp";
import smms8 from "../assets/imgs/SMMS8.webp";
import smms9 from "../assets/imgs/SMMS9.webp";
import smms10 from "../assets/imgs/SMMS10.webp";
import smms11 from "../assets/imgs/SMMS11.webp";
import smms12 from "../assets/imgs/SMMS12.webp";
import smms13 from "../assets/imgs/SMMS13.webp";
import smms14 from "../assets/imgs/SMMS14.webp";
import study1 from "../assets/imgs/Study1.webp";
import study2 from "../assets/imgs/Study2.webp";
import study3 from "../assets/imgs/Study3.webp";
import study4 from "../assets/imgs/Study4.webp";
import study5 from "../assets/imgs/Study5.webp";
import study6 from "../assets/imgs/Study6.webp";
import study7 from "../assets/imgs/Study7.webp";
import study8 from "../assets/imgs/Study8.webp";
import bahireHasab1 from "../assets/imgs/BahireHasab1.webp";
import bahireHasab2 from "../assets/imgs/BahireHasab2.webp";
import bahireHasab3 from "../assets/imgs/BahireHasab3.webp";
import bahireHasab4 from "../assets/imgs/BahireHasab4.webp";
import bahireHasab10 from "../assets/imgs/BahireHasab10.webp";
import bahireHasab11 from "../assets/imgs/BahireHasab11.webp";
import bahireHasab12 from "../assets/imgs/BahireHasab12.webp";
import bahireHasab13 from "../assets/imgs/BahireHasab13.webp";
import addisCoder1 from "../assets/imgs/AddisCoder1.webp";
import addisCoder2 from "../assets/imgs/AddisCoder2.webp";
import addisCoder3 from "../assets/imgs/AddisCoder3.webp";
import weatherDashboard from "../assets/imgs/WeatherDashbaord.webp";
import weatherDashboard2 from "../assets/imgs/WeatherDashboard2.webp";
import pdfExt1 from "../assets/imgs/PdfExt1.webp";
import pdfExt2 from "../assets/imgs/PdfExt2.webp";
import pdfExt3 from "../assets/imgs/PdfExt3.webp";
import pdfExt4 from "../assets/imgs/PdfExt4.webp";
import taskList from "../assets/imgs/TaskList.webp";
import taskList1 from "../assets/imgs/TaskList1.webp";
import taskList2 from "../assets/imgs/TaskList2.webp";
import touristSite1 from "../assets/imgs/TouristSite1.webp";
import touristSite2 from "../assets/imgs/TouristSite2.webp";
import touristSite3 from "../assets/imgs/TouristSite3.webp";
import touristSite4 from "../assets/imgs/TouristSite4.webp";
import touristSite5 from "../assets/imgs/TouristSite5.webp";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Experience {
  icon: string;
  title: string;
  description: string;
  detailedDescription: string;
  techStack: string[];
  highlights: string[];
  circleBg: string;
  images?: string[];
  links?: ProjectLink[];
}

export const experiences: Experience[] = [
  {
    icon: graduationCap,
    title: "Student Mark Management System",
    description:
      "A full-stack role-based platform for managing student grades, reports, and academic workflows.",
    detailedDescription:
      "A full-stack student mark management platform supporting six distinct user roles: admin, director, secretary, teacher, and student. Each role has dedicated dashboards with route-level access control and tailored views. The backend runs on Express 5 with TypeScript and uses Prisma ORM connected to a MySQL database. Academic terms are calculated using the Ethiopian calendar (via the ethiopic-calendar package) with automatic conversion between Ethiopian and Gregorian dates.\n\n" +
      "The system generates PDF reports through Puppeteer and Excel exports via ExcelJS. Background job processing is handled by Bull queues backed by Redis for operations like email notifications through Nodemailer. Helmet security headers protect the API endpoints, while Winston provides structured logging with daily log rotation. The React 19 frontend uses MUI 7 with Recharts for data visualization dashboards, Framer Motion for animations, and notistack for snackbar notifications.\n\n" +
      "Use cases include schools and universities managing student grades across multiple terms, teachers submitting and editing marks with a dedicated grade editor, secretaries handling bulk student registration via CSV upload, directors viewing aggregate performance reports, and students accessing their own academic records and progress. Additional features include student promotion workflows between grade levels and an admin panel for user and system log management.",
    techStack: [
      "React 19",
      "TypeScript",
      "Express 5",
      "Prisma",
      "MySQL",
      "MUI 7",
      "Redis",
      "Bull",
      "Puppeteer",
      "ExcelJS",
      "Nodemailer",
      "Winston",
      "Framer Motion",
      "Recharts",
      "Zod",
      "Helmet",
    ],
    highlights: [
      "Six user roles with granular route-level access control",
      "Ethiopian calendar integration with automatic date conversion",
      "PDF report generation and bulk CSV/Excel data export",
    ],
    circleBg: "#4849FF",
    images: [smms, smms1, smms2, smms3, smms4, smms5, smms6, smms7, smms8, smms9, smms10, smms11, smms12, smms13, smms14],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Samuel3434/Student-Mark-Management",
      },
    ],
  },
  {
    icon: studyBook,
    title: "Study Snippet Tool",
    description:
      "A dockable workspace for Ethiopian Matric exam preparation, organizing study snippets with smart focus recommendations.",
    detailedDescription:
      "A full-stack study tool designed specifically for Ethiopian Grade 12 students preparing for the Ethiopian Higher Education Entrance Examination (Matric). The frontend is built with React 19 and TypeScript using Vite with the SWC compiler. The dockable multi-panel workspace is powered by FlexLayout, allowing students to arrange question previews, PDF textbooks, math formula sheets, and performance charts side by side in a customizable tabbed interface with dark and light mode themes. KaTeX renders mathematical notation inline, react-pdf provides native PDF textbook viewing within the workspace, and Recharts charts visualize performance across subjects.\n\n" +
      "The application uses algorithmic analysis of student performance to identify weak areas and recommend what to focus on. Students can upload past exam questions, organize them by subject and topic, and track their progress over time. The backend runs on Express 5 with Prisma ORM, using JWT authentication with bcrypt password hashing.\n\n" +
      "This tool addresses the challenge of Ethiopia's low Matric pass rates (under 10% in recent years) by giving students a structured way to practice past exam questions, identify knowledge gaps through performance analytics, and focus their study time on the areas that need the most improvement. Subjects covered include the natural science stream (Biology, Chemistry, Physics, Mathematics, English) based on the Ethiopian national curriculum.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite (SWC)",
      "Express 5",
      "Prisma",
      "MUI 7",
      "FlexLayout",
      "KaTeX",
      "react-pdf",
      "Recharts",
      "React Router 7",
      "notistack",
      "JWT",
      "Zod",
    ],
    highlights: [
      "Dockable multi-panel workspace with FlexLayout for customized study layouts",
      "Algorithm-based weakness detection to focus on high-impact topics",
      "Past exam question management with performance analytics and progress tracking",
    ],
    circleBg: "#7C3AED",
    images: [study1, study2, study3, study4, study5, study6, study7, study8],
    links: [
      { label: "GitHub", url: "https://github.com/Samuel3434/Study-Tool" },
    ],
  },
  {
    icon: calendarMoon,
    title: "Bahire Hasab GUI",
    description:
      "A desktop application for Ethiopian Orthodox calendar computations with an interactive quiz mode.",
    detailedDescription:
      "A Python desktop application built with Tkinter that computes the Bahire Hasab, the traditional Ethiopian Orthodox calendar system. The core computation engine (BHCal.py) calculates all key calendar values for a given year: Amete Alem (Year of the World), Metene Rabit, Mebacha (New Year day of week), Wengelawi (the year's Evangelist), Medeb, Wenber, Metqi, Abekte, Mebaja Hammer, and the date of Nineveh Fast. It then computes the dates of 10 major feasts including Abiy Tsom (Great Lent), Debre Zeyit, Hosanna, Siklet (Good Friday), Tinsae (Easter), Rikbe Kahinat, Erget (Ascension), Peraklitos (Pentecost), Tsome Hawaryat, and Tsome Dehrent.\n\n" +
      "The GUI displays the Ethiopian calendar one month at a time with month-to-month navigation. A moon phase calculator uses Julian day formulas to determine one of eight moon phases for any input date. The application also includes a simple eclipse predictor and an educational quiz mode that generates random years and tests the user on calendar values. The entire interface uses Amharic and Ge'ez script for all labels, months, numbers, and holiday names.\n\n" +
      "Use cases include Ethiopian Orthodox Church officials and clergy calculating feast dates and fasting periods for the liturgical year, teachers educating students about the traditional calendar system in religious schools, and anyone needing to convert between Ethiopian and Gregorian dates or determine moon phases for cultural and religious observances.",
    techStack: [
      "Python 3",
      "Tkinter",
      "Amharic/Ge'ez UI",
      "Julian Day algorithms",
    ],
    highlights: [
      "Ancient Ethiopian calendar algorithms computing 10 major feast dates",
      "Full Amharic/Ge'ez interface with moon phase and eclipse prediction",
      "Interactive teacher quiz mode for classroom calendar education",
    ],
    circleBg: "#059669",
    images: [bahireHasab10, bahireHasab11, bahireHasab12, bahireHasab13],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Samuel3434/BahirHasab-GUI",
      },
    ],
  },
  {
    icon: codeMonitor,
    title: "Addis Coder Website",
    description:
      "An application website built to show appreciation for the AddisCoder program and propose a website redesign.",
    detailedDescription:
      "A single-page website built as an application to show appreciation for the AddisCoder program and demonstrate the ability to redesign their online presence. AddisCoder is a free, intensive 4-week summer program in Addis Ababa that introduces Ethiopian high school students to programming and algorithms, founded by Prof. Jelani Nelson of MIT and organized with the Meles Zenawi Foundation and the Ethiopian Ministry of Education. The site was built to present a modern, engaging redesign concept, though it was not ultimately implemented by the program.\n\n" +
      "The website is built entirely with vanilla HTML, CSS, and JavaScript with no frameworks. It features a custom animated SVG blob background that morphs between different shapes using SVG animate elements with gradient fills. A custom cursor follows mouse and wheel movement and changes appearance over interactive elements. The homepage includes animated social media cards for Instagram, Twitter, and Facebook. The Alumni section has a horizontal scrollable gallery. Navigation uses a full-screen hamburger menu with smooth slide transitions. The site supports bilingual content with Amharic and English throughout.\n\n" +
      "Use cases include promoting the AddisCoder program to prospective students and their families across Ethiopia, providing program information (curriculum, dates, application process), showcasing alumni success stories to encourage new applicants, and serving as a template for how the program's online presence could be updated to better reach students.",
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "SVG Animation",
      "IntersectionObserver",
    ],
    highlights: [
      "Custom animated SVG blob morphing background with gradient fills",
      "Custom cursor with interactive hover and drag state changes",
      "Bilingual Amharic/English interface with full-screen slide navigation",
    ],
    circleBg: "#DC2626",
    images: [addisCoder1, addisCoder2, addisCoder3],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Samuel3434/AddisCoder-Website",
      },
      {
        label: "Live Demo",
        url: "https://samuel3434.github.io/AddisCoder-Website/",
      },
    ],
  },
  {
    icon: weatherCloud,
    title: "Weather Dashboard",
    description:
      "A real-time weather app with 4-day forecasts, geolocation, and interactive search history.",
    detailedDescription:
      "A weather dashboard built with vanilla JavaScript and jQuery that fetches real-time weather data from the OpenWeatherMap API. On page load, it automatically detects the user's location via the browser Geolocation API and uses the Nominatim reverse geocoding service to convert coordinates into a city name. The current weather display shows temperature, humidity, wind speed, pressure, max and min temperatures, and weather conditions with emoji icons. A 5-day forecast API provides data that is sampled at daily intervals to produce a 4-day forecast. Users can toggle between Celsius and Fahrenheit.\n\n" +
      "A city search feature allows looking up weather by name with Enter key or button. Search history is persisted in localStorage with up to 10 entries and displayed in a collapsible section. The app also shows random cities from a predefined list for weather discovery. Online and offline detection shows error messages when the network is unavailable and restores functionality when connectivity returns. Audio alert files are included for weather event notifications.\n\n" +
      "Use cases include travelers checking weather conditions for trip planning, students monitoring weather for outdoor activities and events, and general daily weather checking with quick access to frequently searched locations through the localStorage search history.",
    techStack: [
      "JavaScript",
      "jQuery",
      "HTML5",
      "CSS3",
      "OpenWeatherMap API",
      "Nominatim API",
      "Geolocation API",
    ],
    highlights: [
      "Geolocation auto-detection with reverse geocoding city name resolution",
      "Celsius/Fahrenheit toggle with localStorage search history persistence",
      "Offline detection with automatic restoration and audio alert effects",
    ],
    circleBg: "#0EA5E9",
    images: [weatherDashboard, weatherDashboard2],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Samuel3434/Weather-App",
      },
      {
        label: "Live Demo",
        url: "https://samuel3434.github.io/Weather-App/",
      },
    ],
  },
  {
    icon: gestureTouchpad,
    title: "Touchpad Gesture Disabler",
    description:
      "A GNOME Shell extension to disable multi-touch touchpad gestures with a temporary Shift-key bypass.",
    detailedDescription:
      "A GNOME Shell extension that intercepts low-level Clutter touchpad gesture events at the compositor level to disable multi-touch gestures. Specifically targets the 3-finger swipe up gesture that opens the Activities overview and the 3 or 4-finger swipe gesture for switching workspaces. The extension is written in TypeScript and compiled to GJS-compatible JavaScript using the GNOME Shell extension API with GObject type definitions.\n\n" +
      "A key feature is the Shift-key bypass mechanism: when the Shift key is held down, the extension checks the current keyboard modifier state and allows the original gesture handler to process the event, giving users temporary access to gestures when needed. The extension includes a full preferences UI built with GJS that exposes settings through a GSettings schema, allowing users to enable or disable the extension through GNOME Settings. It follows the standard GNOME Shell extension project structure and works on both X11 and Wayland display servers.\n\n" +
      "Use cases include Linux users who accidentally trigger the Activities overview while typing or working, people with motor control difficulties who find multi-touch gestures problematic, and users in focused work environments (writing, designing, coding) where unintentional workspace switches disrupt workflow. The Shift-key bypass ensures gestures remain accessible on demand without being permanently disabled.",
    techStack: [
      "TypeScript",
      "GJS/GObject",
      "GNOME Shell API",
      "Clutter",
      "GSettings",
    ],
    highlights: [
      "Low-level Clutter gesture interception at the GNOME compositor level",
      "Shift-key hold-to-bypass for temporary gesture access when needed",
      "Full preferences UI with GSettings schema for toggle configuration",
    ],
    circleBg: "#F59E0B",
  },
  {
    icon: pdfKeyboard,
    title: "PDF Hotkey Chrome Extension",
    description:
      "A Chrome extension for capturing text snippets from Ethiopian curriculum PDFs using keyboard shortcuts.",
    detailedDescription:
      "A Manifest V3 Chrome extension that lets students and teachers capture selected text snippets from Ethiopian curriculum PDF textbooks using configurable keyboard shortcuts. Four hotkey commands drive the workflow: Ctrl+Shift+Y opens an overlay to capture selected text as a snippet, Ctrl+Shift+Q opens a full snippet viewer with filtering and pagination, Ctrl+Shift+Z creates a checkpoint for the current subject and unit, and Ctrl+Shift+U opens a question mapper that accepts AI-generated JSON input for organized question storage.\n\n" +
      "Captured snippets include metadata for subject, grade, unit, page number, a SHA-256 hash for deduplication, capture method, filename, and timestamp. The extension supports predefined textbook mappings for Ethiopian Grades 9 through 12 across Biology, Chemistry, Physics, and Mathematics, with unit-to-page mappings and known PDF filenames. Subject configuration files in YAML format define subject-specific data. Snippets can be exported as JSON files organized by subject, grade, and unit.\n\n" +
      "Use cases include Ethiopian high school students building a personal question bank from their digital textbooks, teachers compiling practice questions organized by subject and unit for classroom use, and tutors creating targeted study materials for specific grade levels and subjects within the Ethiopian national curriculum framework.",
    techStack: [
      "Chrome Extensions API",
      "Manifest V3",
      "JavaScript",
      "SHA-256",
      "YAML",
    ],
    highlights: [
      "Four hotkey commands for capture, preview, checkpoint, and question mapping",
      "Subject and grade-specific textbook mappings for Ethiopian Grades 9-12",
      "SHA-256 deduplication with organized JSON export by subject and unit",
    ],
    circleBg: "#8B5CF6",
    images: [pdfExt1, pdfExt2, pdfExt3, pdfExt4],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Samuel3434/pdf-hotkey-extension",
      },
    ],
  },
  {
    icon: checklist,
    title: "Task List Manager",
    description:
      "A modern task management app built with React 19, TypeScript, and Material UI 7.",
    detailedDescription:
      "A feature-rich task management application built with the latest React 19 and Material UI 7 component library. TypeScript provides full type safety throughout the application. The build system uses Vite for fast development and optimized production builds. Material UI components provide the interface including the MUI X Date Pickers for deadline and due date management, MUI Icons for visual elements, and Emotion for custom styling. The date-fns library handles date formatting and manipulation.\n\n" +
      "The application provides a clean, responsive interface for creating, organizing, and tracking tasks. ESLint with TypeScript-specific rules ensures code quality, and GitHub Actions workflows are configured for continuous integration. No backend or database is required, making it a lightweight client-only application that can be deployed as a static site.\n\n" +
      "Use cases include individuals managing personal to-do lists and daily schedules, students tracking assignment deadlines and study session plans, and small teams coordinating project tasks with shared milestone tracking. The MUI X Date Pickers make it particularly well-suited for deadline-driven workflows where due dates and scheduling are central to the task management process.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "MUI 7",
      "MUI X Date Pickers",
      "Emotion",
      "date-fns",
    ],
    highlights: [
      "Built with cutting-edge React 19 and Material UI 7 component library",
      "MUI X Date Pickers integration for deadline and schedule management",
      "Responsive design with ESLint and GitHub Actions CI configuration",
    ],
    circleBg: "#0891B2",
    images: [taskList, taskList1, taskList2],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Samuel3434/Task-List-Manager",
      },
      {
        label: "Live Demo",
        url: "https://samuel3434.github.io/Task-List-Manager/",
      },
    ],
  },
  {
    icon: terminal,
    title: "Bahire Hasab CLI",
    description:
      "A C++ command-line tool for computing Ethiopian Orthodox calendar dates and religious feasts.",
    detailedDescription:
      "A console-based C++ application that computes the Ethiopian Orthodox calendar, known as Bahire Hasab, for any given input year. The program calculates the New Year day of week (Mebacha), the year's Evangelist (Wengelawi), and the dates of all major religious observances including Nineveh Fast, Abiy Tsom (Great Lent), Debrezeit, Hosanna, Good Friday (Siklet), Easter (Tinsae), Ascension (Erget), Pentecost (Peraklitos), Apostles Fast (Tsome Hawaryat), and Tsome Dehrent. The computation is based on the traditional 19-year Metonic cycle formula used by the Ethiopian Orthodox Church.\n\n" +
      "The application accepts a year as input through standard input and outputs the computed calendar data to the console. Co-developed by a team of four as an ICT class project, this CLI version is the original implementation that later evolved into the Python Tkinter GUI version and the JavaFX desktop port.\n\n" +
      "Use cases include students learning the traditional Ethiopian calendar computation system in educational settings, developers understanding the algorithmic foundation before working with the GUI versions, and anyone needing quick command-line access to feast date calculations without a graphical interface.",
    techStack: ["C++", "CLI", "Standard IO"],
    highlights: [
      "Complete Bahire Hasab calendar computations for any given Ethiopian year",
      "Calculates all major Ethiopian Orthodox feasts and fasting periods",
      "Original CLI version that preceded the Python GUI and JavaFX ports",
    ],
    circleBg: "#D97706",
    images: [bahireHasab1, bahireHasab2, bahireHasab3, bahireHasab4],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Samuel3434/BahirHasab-CLI",
      },
    ],
  },
  
  {
    icon: compassMountain,
    title: "Tourist Site",
    description:
      "An Ethiopia tourism website showcasing cultural experiences, history, and natural destinations.",
    detailedDescription:
      "A single-page tourism website for Ethiopia built with vanilla HTML, CSS, and JavaScript. The homepage features a parallax layered landscape effect with multiple image layers for mountains, fog, sun, and birds, each with configurable speed and rotation data attributes. An image carousel cycles through destination photos with CSS class animations and 5-second autoplay with next and previous navigation buttons. The site includes dedicated sections for a photo gallery, destination guides, cultural experiences, natural experiences, visitor testimonials, events, and an Ethiopia Today overview.\n\n" +
      "Each section has its own CSS stylesheet for modular styling. Content subdirectories provide detailed pages for Cultural Experiences, Destination Details, Testimonials, History, and Natural Experiences, giving visitors in-depth information about Ethiopia's attractions.\n\n" +
      "Use cases include tourists planning a trip to Ethiopia researching destinations and cultural experiences, travel agencies using the site to showcase Ethiopian attractions to potential visitors, and cultural organizations promoting Ethiopia's heritage sites, natural landscapes, and historical landmarks to an international audience.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Parallax CSS"],
    highlights: [
      "Multi-layer parallax landscape with configurable speed and rotation attributes",
      "Autoplay image carousel with CSS animation-based slide transitions",
      "Modular section design with dedicated content pages for each tourism category",
    ],
    circleBg: "#15803D",
    images: [touristSite1, touristSite2, touristSite3, touristSite4, touristSite5],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Samuel3434/Tourist-Site",
      },
      {
        label: "Live Demo",
        url: "https://samuel3434.github.io/Tourist-Site/",
      },
    ],
  },
  {
    icon: lineCounterIcon,
    title: "Line Counter",
    description:
      "A CLI tool for counting lines of code across projects while intelligently skipping noise files.",
    detailedDescription:
      "A command-line tool written in TypeScript for Node.js that recursively counts lines of code in project directories. The tool uses async generator functions with fs.createReadStream and the readline module for efficient streaming line counting, avoiding loading entire files into memory. It intelligently filters out non-code artifacts: binary extensions (.svg, .png, .jpg, .gif, .ico, .mp3, .mp4, .pdf, and more), lockfiles (package-lock.json, yarn.lock, pnpm-lock.yaml), build output directories (node_modules, dist, build, out, cache, coverage, .git, .github, .vscode, .idea, log, logs), and common config files (.env, .DS_Store, .gitignore, .npmrc, README.md).\n\n" +
      "The tool accepts file or directory paths as command-line arguments and resolves them relative to the current working directory. It includes a shebang line for direct execution and is published with a bin entry point in package.json for use via npx. Output shows each file path with its line count, followed by a total count and execution duration in milliseconds.\n\n" +
      "Use cases include developers getting quick codebase size metrics for their projects, project managers estimating project scale and complexity, open source maintainers generating line count statistics for documentation or reporting, and teams auditing codebases to identify unusually large files that may need refactoring.",
    techStack: ["TypeScript", "Node.js", "Streaming readline"],
    highlights: [
      "Intelligent filtering of binaries, lockfiles, build artifacts, and config files",
      "Streaming line counting with async generators for memory efficiency",
      "Published CLI tool with shebang and bin entry point for direct execution",
    ],
    circleBg: "#6B7280",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Samuel3434/Line-Counter",
      },
    ],
  },
];
