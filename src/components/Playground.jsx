import React, { useState, useEffect, useRef } from "react";
import SectionReveal from "./SectionReveal";
import TextScramble from "./TextScramble";
import { useLanguage } from "../context/LanguageContext";

export default function Playground() {
  const { t, lang } = useLanguage();

  // --- WIDGET 1: Cache Flow Simulator States ---
  const [isHitMode, setIsHitMode] = useState(true);
  const [simState, setSimState] = useState("idle"); // idle, to_nginx, check_redis, redis_hit, to_db, db_to_redis, returning, complete
  const [simLogs, setSimLogs] = useState([]);
  const [latencyResult, setLatencyResult] = useState(null);
  const consoleRef = useRef(null);

  // --- WIDGET 2: Rate Limiter States ---
  const [tokens, setTokens] = useState(5);
  const [maxTokens] = useState(5);
  const [rateLogs, setRateLogs] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);

  // --- WIDGET 3: Password Hash & Bcrypt Simulator States ---
  const [inputPassword, setInputPassword] = useState("admin123");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");
  const [bcryptHash, setBcryptHash] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("Weak");

  // --- WIDGET 4: CSS Glassmorphism Generator States ---
  const [glassOpacity, setGlassOpacity] = useState(0.2);
  const [glassBlur, setGlassBlur] = useState(10);
  const [glassBorder, setGlassBorder] = useState(1);
  const [glassRadius, setGlassRadius] = useState(12);
  const [isDarkGlass, setIsDarkGlass] = useState(true);
  const [copiedCSS, setCopiedCSS] = useState(false);

  // --- WIDGET 5: HTML/CSS Live Sandbox States ---
  const [htmlCode, setHtmlCode] = useState(`<div class="card">
  <h2>Ival Permana</h2>
  <p>Backend & Cloud Engineer</p>
  <button onclick="alert('Hello from sandbox!')">Ping Server</button>
</div>

<style>
  .card {
    padding: 24px;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 8px;
    text-align: center;
    max-width: 200px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }
  h2 { margin: 0 0 6px 0; color: #fafafa; font-size: 15px; font-weight: 500; }
  p { margin: 0 0 16px 0; color: #a1a1aa; font-size: 11px; }
  button {
    padding: 6px 14px;
    background: #fafafa;
    color: #09090b;
    border: none;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  button:hover { opacity: 0.9; }
</style>`);

  // --- WIDGET 6: Base64 / URL Encoder & Decoder States [NEW] ---
  const [codecInput, setCodecInput] = useState("Hello, World!");
  const [codecMode, setCodecMode] = useState("base64_encode"); // base64_encode, base64_decode, url_encode, url_decode
  const [codecOutput, setCodecOutput] = useState("");

  // --- WIDGET 7: Regex Pattern Matcher States [NEW] ---
  const [regexPattern, setRegexPattern] = useState("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b");
  const [regexText, setRegexText] = useState("Send email to ival@permana.com or contact support@eval04.org.");
  const [regexMatches, setRegexMatches] = useState([]);
  const [regexError, setRegexError] = useState(null);

  // --- WIDGET 8: Keycode Keyboard Event Listener States [NEW] ---
  const [lastKey, setLastKey] = useState(null);

  // --- WIDGET 9: Markdown Live Previewer States [NEW] ---
  const [markdownInput, setMarkdownInput] = useState(`# Markdown Previewer

- This is a custom regex parser.
- Support **bold** and *italic*.
- Render \`inline code\` blocks.

## Sub-header
Enjoy writing documents!`);

  // --- WIDGET 10: Sorting Algorithm Visualizer States ---
  const [sortArray, setSortArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeSortIndices, setActiveSortIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [sortSpeed, setSortSpeed] = useState(60); // 1-100
  const [sortAlgo, setSortAlgo] = useState("bubble"); // bubble, selection, insertion, quick
  const isSortingRef = useRef(false);

  // --- WIDGET 11: SQL Injection (SQLi) Simulator States ---
  const [sqliUsername, setSqliUsername] = useState("admin");
  const [sqliPassword, setSqliPassword] = useState("' OR '1'='1");
  const [sqliResult, setSqliResult] = useState(null);
  const [sqliLogs, setSqliLogs] = useState([]);
  const [sqliTab, setSqliTab] = useState("query"); // query, logs, data

  // --- WIDGET 12: WebSocket Pub-Sub Visualizer States ---
  const [wsChannel, setWsChannel] = useState("metrics");
  const [wsMessage, setWsMessage] = useState(`{"cpu": "42%", "memory": "78%"}`);
  const [wsLogsA, setWsLogsA] = useState([]);
  const [wsLogsB, setWsLogsB] = useState([]);
  const [wsLogsC, setWsLogsC] = useState([]);
  const [wsSubA, setWsSubA] = useState(["metrics"]);
  const [wsSubB, setWsSubB] = useState(["alerts"]);
  const [wsSubC, setWsSubC] = useState(["metrics", "alerts"]);
  const [wsAnimState, setWsAnimState] = useState("idle"); // idle, publishing, broker, delivering
  const [wsLastChannel, setWsLastChannel] = useState("");

  // --- WIDGET 13: Git Commit Graph Simulator States ---
  const [gitHistory, setGitHistory] = useState([
    { hash: "8a2f4", msg: "initial commit", branch: "main", parent: null }
  ]);
  const [gitBranches, setGitBranches] = useState(["main", "dev"]);
  const [gitActiveBranch, setGitActiveBranch] = useState("main");
  const [gitConsole, setGitConsole] = useState(["$ git log --oneline", "8a2f4 initial commit"]);
  const [commitCount, setCommitCount] = useState(1);

  // Auto-scroll logs internally
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [simLogs]);

  // Rate Limiter Token Refill (1 token every 2 seconds, up to max)
  useEffect(() => {
    const refill = setInterval(() => {
      if (!isBlocked) {
        setTokens((prev) => Math.min(prev + 1, maxTokens));
      }
    }, 2000);
    return () => clearInterval(refill);
  }, [isBlocked, maxTokens]);

  // Rate Limiter Block Timer
  useEffect(() => {
    let timer;
    if (isBlocked && blockTimeLeft > 0) {
      timer = setTimeout(() => {
        setBlockTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isBlocked && blockTimeLeft === 0) {
      setIsBlocked(false);
      setTokens(maxTokens);
      setRateLogs((prev) => [
        {
          time: new Date().toLocaleTimeString(),
          endpoint: "/api/v1/resource",
          status: 200,
          msg: lang === "id" ? "Rate limit di-reset. Akses pulih." : "Rate limit reset. Access restored.",
        },
        ...prev.slice(0, 8),
      ]);
    }
    return () => clearTimeout(timer);
  }, [isBlocked, blockTimeLeft, maxTokens, lang]);

  // --- WIDGET 3: Hashing & Bcrypt Simulator Effects ---
  const calculateSha256 = async (pwd) => {
    if (!pwd) {
      setSha256Hash("");
      return;
    }
    try {
      const msgBuffer = new TextEncoder().encode(pwd);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setSha256Hash(hashHex);
    } catch (e) {
      setSha256Hash("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    }
  };

  const calculateBcryptAndStrength = (pwd) => {
    if (!pwd) {
      setBcryptHash("");
      setPasswordStrength(lang === "id" ? "Kosong" : "Empty");
      return;
    }

    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    let strengthLabel = "Weak";
    if (score >= 4) strengthLabel = lang === "id" ? "Kuat" : "Strong";
    else if (score >= 2) strengthLabel = lang === "id" ? "Sedang" : "Medium";
    else strengthLabel = lang === "id" ? "Lemah" : "Weak";

    setPasswordStrength(strengthLabel);

    const salt = "R9h.lS76eR4L9T3G.K.oZe";
    let hashPart = "";
    for (let i = 0; i < 31; i++) {
      const charCode = (pwd.charCodeAt(i % pwd.length) + i) % 62;
      hashPart += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./"[charCode];
    }
    setBcryptHash(`$2b$12$${salt}${hashPart}`);
  };

  useEffect(() => {
    calculateSha256(inputPassword);
    calculateBcryptAndStrength(inputPassword);
  }, [inputPassword, lang]);

  // --- WIDGET 4: CSS Glassmorphism Generator Helpers ---
  const getGlassStyles = () => {
    const bgColor = isDarkGlass
      ? `rgba(0, 0, 0, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`;
    
    const borderColor = isDarkGlass
      ? `rgba(255, 255, 255, 0.08)`
      : `rgba(255, 255, 255, 0.2)`;

    return {
      background: bgColor,
      backdropFilter: `blur(${glassBlur}px)`,
      WebkitBackdropFilter: `blur(${glassBlur}px)`,
      border: `${glassBorder}px solid ${borderColor}`,
      borderRadius: `${glassRadius}px`,
    };
  };

  const getGlassCSSCode = () => {
    const bgColor = isDarkGlass
      ? `rgba(0, 0, 0, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`;
    
    const borderColor = isDarkGlass
      ? `rgba(255, 255, 255, 0.08)`
      : `rgba(255, 255, 255, 0.2)`;

    return `background: ${bgColor};
backdrop-filter: blur(${glassBlur}px);
-webkit-backdrop-filter: blur(${glassBlur}px);
border: ${glassBorder}px solid ${borderColor};
border-radius: ${glassRadius}px;`;
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(getGlassCSSCode());
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  // --- WIDGET 6: Base64 / URL Encoder & Decoder Effect [NEW] ---
  useEffect(() => {
    try {
      if (!codecInput) {
        setCodecOutput("");
        return;
      }
      if (codecMode === "base64_encode") {
        setCodecOutput(btoa(unescape(encodeURIComponent(codecInput))));
      } else if (codecMode === "base64_decode") {
        setCodecOutput(decodeURIComponent(escape(atob(codecInput))));
      } else if (codecMode === "url_encode") {
        setCodecOutput(encodeURIComponent(codecInput));
      } else if (codecMode === "url_decode") {
        setCodecOutput(decodeURIComponent(codecInput));
      }
    } catch (e) {
      setCodecOutput(lang === "id" ? "ERROR: Masukan tidak valid / Kesalahan enkripsi" : "ERROR: Invalid Input / Encoding mismatch");
    }
  }, [codecInput, codecMode, lang]);

  // --- WIDGET 7: Regex Pattern Matcher Effect [NEW] ---
  useEffect(() => {
    if (!regexPattern || !regexText) {
      setRegexMatches([]);
      setRegexError(null);
      return;
    }
    try {
      const re = new RegExp(regexPattern, "g");
      const matches = regexText.match(re);
      setRegexMatches(matches || []);
      setRegexError(null);
    } catch (e) {
      setRegexError(e.message);
      setRegexMatches([]);
    }
  }, [regexPattern, regexText]);

  // --- WIDGET 8: Keycode Keyboard Event Listener Effect [NEW] ---
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        return;
      }
      // Check if it's escape/tilde shortcut
      if ((e.ctrlKey && e.key === "`") || e.key === "Escape") {
        return;
      }
      e.preventDefault();
      setLastKey({
        key: e.key === " " ? "Space" : e.key,
        code: e.code,
        keyCode: e.keyCode,
        shift: e.shiftKey,
        ctrl: e.ctrlKey,
        alt: e.altKey,
      });
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // --- WIDGET 9: Markdown Parser Helper [NEW] ---
  const parseMarkdownToHtml = (md) => {
    if (!md) return "";
    let html = md;
    
    // Safety escape
    html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // Headers
    html = html.replace(/^## (.*$)/gim, '<h3 class="text-xs sm:text-sm font-bold mt-4 mb-2 text-primary border-b border-border/50 pb-1">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="text-sm sm:text-base font-bold mt-5 mb-2 border-b border-border pb-1.5 text-primary font-sans">$1</h2>');
    
    // Bold & Italics
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong class="text-primary font-medium">$1</strong>');
    html = html.replace(/\*(.*)\*/gim, '<em class="text-zinc-300 italic">$1</em>');
    
    // Code block
    html = html.replace(/`(.*?)`/gim, '<code class="bg-void border border-border px-1.5 py-0.5 rounded text-pink-400 font-mono text-[9px]">$1</code>');
    
    // List Items
    html = html.replace(/^\- (.*$)/gim, '<li class="list-disc ml-4 text-[10px] text-secondary">$1</li>');
    
    // Paragraph spacing
    html = html.replace(/\n\n/gim, "<br/>");
    return html;
  };

  // --- WIDGET 10: Sorting Algorithm Visualizer Logic ---
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runBubbleSort = async () => {
    let arr = [...sortArray];
    let n = arr.length;
    isSortingRef.current = true;
    setIsSorting(true);

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSortingRef.current) {
          setIsSorting(false);
          setActiveSortIndices([]);
          return;
        }
        setActiveSortIndices([j, j + 1]);
        await sleep(50 + (100 - sortSpeed) * 8);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setSortArray([...arr]);
        }
      }
      if (!isSortingRef.current) {
        setIsSorting(false);
        setActiveSortIndices([]);
        return;
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    if (isSortingRef.current) {
      setSortedIndices(Array.from({ length: n }, (_, i) => i));
      setActiveSortIndices([]);
      setIsSorting(false);
    }
  };

  const runSelectionSort = async () => {
    let arr = [...sortArray];
    let n = arr.length;
    isSortingRef.current = true;
    setIsSorting(true);

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (!isSortingRef.current) {
          setIsSorting(false);
          setActiveSortIndices([]);
          return;
        }
        setActiveSortIndices([i, j, minIdx]);
        await sleep(50 + (100 - sortSpeed) * 8);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setSortArray([...arr]);
      }
      if (!isSortingRef.current) {
        setIsSorting(false);
        setActiveSortIndices([]);
        return;
      }
      setSortedIndices((prev) => [...prev, i]);
    }
    if (isSortingRef.current) {
      setSortedIndices(Array.from({ length: n }, (_, i) => i));
      setActiveSortIndices([]);
      setIsSorting(false);
    }
  };

  const runInsertionSort = async () => {
    let arr = [...sortArray];
    let n = arr.length;
    isSortingRef.current = true;
    setIsSorting(true);

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        if (!isSortingRef.current) {
          setIsSorting(false);
          setActiveSortIndices([]);
          return;
        }
        setActiveSortIndices([j, j + 1]);
        await sleep(50 + (100 - sortSpeed) * 8);
        arr[j + 1] = arr[j];
        j = j - 1;
        setSortArray([...arr]);
      }
      arr[j + 1] = key;
      setSortArray([...arr]);
      if (!isSortingRef.current) {
        setIsSorting(false);
        setActiveSortIndices([]);
        return;
      }
      setSortedIndices((prev) => [...prev, i]);
    }
    if (isSortingRef.current) {
      setSortedIndices(Array.from({ length: n }, (_, i) => i));
      setActiveSortIndices([]);
      setIsSorting(false);
    }
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      if (!isSortingRef.current) return;
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const runQuickSort = async () => {
    let arr = [...sortArray];
    isSortingRef.current = true;
    setIsSorting(true);
    await quickSortHelper(arr, 0, arr.length - 1);
    if (isSortingRef.current) {
      setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
      setActiveSortIndices([]);
      setIsSorting(false);
    }
  };

  const startSort = () => {
    if (isSorting) return;
    setSortedIndices([]);
    if (sortAlgo === "bubble") {
      runBubbleSort();
    } else if (sortAlgo === "selection") {
      runSelectionSort();
    } else if (sortAlgo === "insertion") {
      runInsertionSort();
    } else if (sortAlgo === "quick") {
      runQuickSort();
    }
  };

  const stopSort = () => {
    isSortingRef.current = false;
    setIsSorting(false);
    setActiveSortIndices([]);
  };

  // --- WIDGET 1: Cache Simulator Helper ---
  const startCacheSimulation = () => {
    if (simState !== "idle") return;

    setSimLogs([]);
    setLatencyResult(null);
    setSimState("to_nginx");
    addLog(lang === "id" ? "Mengirim request GET /api/profile..." : "Sending request GET /api/profile...");

    // 1. To Nginx
    setTimeout(() => {
      setSimState("check_redis");
      addLog(lang === "id" ? "NGINX menerima request. Memeriksa cache Redis..." : "NGINX received request. Checking Redis cache...");
      
      // 2. To Redis
      setTimeout(() => {
        if (isHitMode) {
          setSimState("redis_hit");
          addLog("Redis Hit! Key 'profile:data' ditemukan.");
          
          setTimeout(() => {
            setSimState("returning");
            addLog(lang === "id" ? "Mengembalikan data cached ke Browser." : "Returning cached data to Browser.");
            setLatencyResult(8);

            setTimeout(() => {
              setSimState("complete");
              addLog(lang === "id" ? "Request Selesai. Latency: 8ms (Sangat Cepat)" : "Request Complete. Latency: 8ms (Super Fast)");
              setTimeout(() => setSimState("idle"), 2000);
            }, 600);
          }, 800);
        } else {
          setSimState("to_db");
          addLog(lang === "id" ? "Redis Miss! Key tidak ditemukan. Mengarahkan ke PostgreSQL..." : "Redis Miss! Key not found. Querying PostgreSQL...");

          setTimeout(() => {
            setSimState("db_to_redis");
            addLog(lang === "id" ? "PostgreSQL memproses query. Menulis data baru ke Redis..." : "PostgreSQL completed query. Caching result in Redis...");

            setTimeout(() => {
              setSimState("returning");
              addLog(lang === "id" ? "Mengembalikan data dari Database ke Browser." : "Returning data from Database to Browser.");
              setLatencyResult(240);

              setTimeout(() => {
                setSimState("complete");
                addLog(lang === "id" ? "Request Selesai. Latency: 240ms (Query Database)" : "Request Complete. Latency: 240ms (Database Query)");
                setTimeout(() => setSimState("idle"), 2000);
              }, 600);
            }, 800);
          }, 1000);
        }
      }, 800);
    }, 800);
  };

  // --- WIDGET 2: Click Rate Limiter Game Helper ---
  const handleRateRequest = () => {
    if (isBlocked) return;
    const time = new Date().toLocaleTimeString();
    
    if (tokens > 0) {
      const nextTokens = tokens - 1;
      setTokens(nextTokens);
      setRateLogs((prev) => [
        {
          time,
          endpoint: "/api/v1/resource",
          status: 200,
          msg: lang === "id" ? `Request Sukses. Sisa kuota: ${nextTokens}` : `Request OK. Tokens remaining: ${nextTokens}`,
        },
        ...prev.slice(0, 8),
      ]);

      if (nextTokens === 0) {
        setIsBlocked(true);
        setBlockTimeLeft(8);
        setRateLogs((prev) => [
          {
            time,
            endpoint: "/api/v1/resource",
            status: 429,
            msg: lang === "id" ? "LIMIT TERCAPAI. IP diblokir sementara." : "RATE LIMIT EXCEEDED. Temporary IP block triggered.",
          },
          ...prev,
        ]);
      }
    }
  };

  // Get dot position classes based on cache animation state
  const getDotPosition = () => {
    switch (simState) {
      case "idle":
        return "left-[8%] top-[50%] -translate-y-1/2 opacity-0 scale-50";
      case "to_nginx":
        return "left-[36%] top-[50%] -translate-y-1/2 opacity-100 scale-100 transition-all duration-700 ease-out";
      case "check_redis":
      case "redis_hit":
        return "left-[70%] top-[20%] -translate-y-1/2 opacity-100 scale-100 transition-all duration-700 ease-out";
      case "to_db":
        return "left-[70%] top-[80%] -translate-y-1/2 opacity-100 scale-100 transition-all duration-700 ease-out";
      case "db_to_redis":
        return "left-[70%] top-[20%] -translate-y-1/2 opacity-100 scale-100 transition-all duration-700 ease-out";
      case "returning":
        return "left-[36%] top-[50%] -translate-y-1/2 opacity-100 scale-100 transition-all duration-500 ease-in-out";
      case "complete":
        return "left-[8%] top-[50%] -translate-y-1/2 opacity-100 scale-125 transition-all duration-500 ease-out";
      default:
        return "left-[8%] top-[50%] -translate-y-1/2 opacity-0";
    }
  };

  // HTML Sandbox Source Doc compilation
  const getSandboxSrcDoc = () => {
    return `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 16px;
        background-color: #09090b;
        color: #fafafa;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    ${htmlCode}
  </body>
</html>`;
  };

  // --- WIDGET 1 helpers ---
  const addLog = (msg) => {
    setSimLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // --- WIDGET 10 helpers ---
  const generateRandomArray = () => {
    if (isSortingRef.current) return;
    const arr = Array.from({ length: 40 }, () => Math.floor(Math.random() * 80) + 15);
    setSortArray(arr);
    setActiveSortIndices([]);
    setSortedIndices([]);
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (!isSortingRef.current) return i + 1;
      setActiveSortIndices([j, high]);
      await sleep(50 + (100 - sortSpeed) * 8);
      if (arr[j] < pivot) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setSortArray([...arr]);
      }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    setSortArray([...arr]);
    return i + 1;
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  // --- WIDGET 11 helpers ---
  const executeSQLQuery = () => {
    const logs = [];
    logs.push(`[SQL] Initializing connection to database...`);
    logs.push(`[SQL] Compiling parameterized SQL statement...`);
    logs.push(`[SQL] Executing query: SELECT * FROM users WHERE username = '${sqliUsername}' AND password = '${sqliPassword}';`);
    
    const queryLower = (sqliUsername + " " + sqliPassword).toLowerCase();
    const isSQLi = queryLower.includes("' or '1'='1") || 
                   queryLower.includes("' or 1=1") || 
                   queryLower.includes("' or ''='") || 
                   queryLower.includes("' or true") || 
                   queryLower.includes("' or '' = ''");
    
    setTimeout(() => {
      if (isSQLi) {
        logs.push(`[Engine] Parse Tree compiled. Detected logical OR condition.`);
        logs.push(`[Engine] Condition '1'='1' or 'true' evaluated to TRUE for all rows.`);
        logs.push(`[Engine] Authentication bypassed. Cryptography check skipped.`);
        logs.push(`[Engine] Retrieval complete: 1 user record matched (Role: Super Admin).`);
        setSqliResult("success");
      } else if (sqliUsername === "admin" && sqliPassword === "admin123") {
         logs.push(`[Engine] Record match found for user 'admin'.`);
         logs.push(`[Engine] Password validation succeeded. Authorized.`);
         setSqliResult("success");
      } else {
        logs.push(`[Engine] Record match found: 0. Invalid credentials.`);
        logs.push(`[Engine] Authentication Failed.`);
        setSqliResult("fail");
      }
      setSqliLogs(logs);
    }, 300);
  };

  // --- WIDGET 12 helpers ---
  const publishWSMessage = () => {
    if (wsAnimState !== "idle") return;
    setWsAnimState("publishing");
    setWsLastChannel(wsChannel);
    
    setTimeout(() => {
      setWsAnimState("broker");
      
      setTimeout(() => {
        setWsAnimState("delivering");
        
        setTimeout(() => {
          setWsAnimState("idle");
          const time = new Date().toLocaleTimeString();
          const logMsg = `[${time}] [${wsChannel.toUpperCase()}] ${wsMessage}`;
          
          if (wsSubA.includes(wsChannel)) {
            setWsLogsA(prev => [logMsg, ...prev.slice(0, 4)]);
          }
          if (wsSubB.includes(wsChannel)) {
            setWsLogsB(prev => [logMsg, ...prev.slice(0, 4)]);
          }
          if (wsSubC.includes(wsChannel)) {
            setWsLogsC(prev => [logMsg, ...prev.slice(0, 4)]);
          }
        }, 800);
      }, 800);
    }, 800);
  };

  // --- WIDGET 13 helpers ---
  const handleGitCommit = () => {
    if (gitHistory.length >= 10) {
      setGitConsole(prev => ["Error: Commit history size capped at 10 for simulation.", ...prev]);
      return;
    }
    const hash = Math.random().toString(16).substring(2, 7);
    const msg = `feat: add module ${commitCount}`;
    const branchCommits = gitHistory.filter(c => c.branch === gitActiveBranch);
    const parent = branchCommits.length > 0 ? branchCommits[branchCommits.length - 1].hash : "8a2f4";
    
    const newCommit = { hash, msg, branch: gitActiveBranch, parent };
    setGitHistory(prev => [...prev, newCommit]);
    setCommitCount(prev => prev + 1);
    setGitConsole(prev => [
      `[${gitActiveBranch} ${hash}] ${msg}`,
      ` 1 file changed, 24 insertions(+), 2 deletions(-)`,
      `$ git commit -m "${msg}"`,
      ...prev
    ]);
  };

  const handleGitBranch = () => {
    if (gitHistory.length >= 10) {
      setGitConsole(prev => ["Error: History limit reached for simulation.", ...prev]);
      return;
    }
    const nextBranchName = gitBranches.includes("feature-auth") ? "feature-ui" : "feature-auth";
    if (gitBranches.includes(nextBranchName)) {
      setGitConsole(prev => [`Branch '${nextBranchName}' already exists.`, ...prev]);
      return;
    }
    setGitBranches(prev => [...prev, nextBranchName]);
    setGitConsole(prev => [
      `Created branch '${nextBranchName}'`,
      `$ git branch ${nextBranchName}`,
      ...prev
    ]);
  };

  const handleGitCheckout = (branch) => {
    setGitActiveBranch(branch);
    setGitConsole(prev => [
      `Switched to branch '${branch}'`,
      `$ git checkout ${branch}`,
      ...prev
    ]);
  };

  const handleGitMerge = (sourceBranch) => {
    if (sourceBranch === gitActiveBranch) {
      setGitConsole(prev => ["Cannot merge branch into itself.", ...prev]);
      return;
    }
    
    const currentBranchCommits = gitHistory.filter(c => c.branch === gitActiveBranch);
    const sourceBranchCommits = gitHistory.filter(c => c.branch === sourceBranch);
    
    if (sourceBranchCommits.length === 0) {
      setGitConsole(prev => [`Nothing to merge from ${sourceBranch}.`, ...prev]);
      return;
    }
    
    const parent1 = currentBranchCommits.length > 0 ? currentBranchCommits[currentBranchCommits.length - 1].hash : "8a2f4";
    const parent2 = sourceBranchCommits[sourceBranchCommits.length - 1].hash;
    
    const hash = Math.random().toString(16).substring(2, 7);
    const msg = `Merge branch '${sourceBranch}' into ${gitActiveBranch}`;
    
    const newMergeCommit = { hash, msg, branch: gitActiveBranch, parent: parent1, mergeParent: parent2 };
    setGitHistory(prev => [...prev, newMergeCommit]);
    setGitConsole(prev => [
      `Merge made by the 'ort' strategy.`,
      `[${gitActiveBranch} ${hash}] ${msg}`,
      `$ git merge ${sourceBranch}`,
      ...prev
    ]);
  };

  return (
    <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-void min-h-screen relative select-none">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8 sm:mb-12">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("projects.backHome")}
          </a>
        </div>

        {/* Title */}
        <div className="mb-10 sm:mb-16">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-tertiary block mb-3 sm:mb-4">
            {lang === "id" ? "LAB INTERAKTIF" : "SANDBOX PLAYGROUND"}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-sans font-medium tracking-tight text-primary leading-none">
            <TextScramble text={lang === "id" ? "Mainan Developer" : "Dev Playground"} />
          </h1>
          <p className="text-sm sm:text-base text-secondary mt-4 sm:mt-6 max-w-2xl text-balance">
            {lang === "id"
              ? "Koleksi simulasi interaktif sederhana yang mendemonstrasikan konsep backend, arsitektur, dan keamanan sistem."
              : "A collection of simple interactive sandboxes demonstrating backend systems, architecture, and network security concepts."}
          </p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Widget 1: Cache Flow Simulator */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm">
                    01 // Cache Flow Simulator
                  </h2>
                  {latencyResult !== null && (
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 border rounded-sm ${
                        latencyResult < 50
                          ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                          : "border-blue-500/30 bg-blue-500/5 text-blue-400"
                      }`}
                    >
                      Latency: {latencyResult}ms
                    </span>
                  )}
                </div>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Lihat bagaimana Redis Cache memangkas waktu respon dengan menyimpan data sementara di memori, menghindari query langsung ke Database (PostgreSQL)."
                    : "Simulate how Redis Cache bypasses database queries by storing transient data in-memory for fast API responses."}
                </p>

                {/* Simulation Canvas */}
                <div className="relative h-40 bg-void/50 border border-border/80 rounded-md mb-4 overflow-hidden flex items-center justify-between px-6">
                  <svg className="absolute inset-0 w-full h-full text-border pointer-events-none z-0">
                    <line x1="15%" y1="50%" x2="42%" y2="50%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" />
                    <line x1="48%" y1="50%" x2="72%" y2="25%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" />
                    <line x1="48%" y1="50%" x2="72%" y2="75%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" />
                  </svg>

                  <div className={`w-3 h-3 rounded-full absolute z-20 shadow-md ${
                    simState === "complete" ? "bg-emerald-500 animate-ping" : "bg-accent-warm animate-pulse"
                  } ${getDotPosition()}`} />

                  <div className="flex flex-col items-center z-10 w-16 text-center">
                    <div className="w-9 h-9 rounded-sm border border-indigo-500/40 bg-indigo-950/20 flex items-center justify-center text-indigo-400 text-xs font-mono">
                      CLI
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-tertiary mt-2">Browser</span>
                  </div>

                  <div className="flex flex-col items-center z-10 w-16 text-center">
                    <div className="w-9 h-9 rounded-sm border border-zinc-500/40 bg-zinc-950/20 flex items-center justify-center text-zinc-400 text-xs font-mono">
                      Proxy
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-tertiary mt-2">NGINX</span>
                  </div>

                  <div className="flex flex-col justify-between h-28 z-10">
                    <div className="flex items-center gap-3 w-28">
                      <div className={`w-9 h-9 rounded-sm border flex items-center justify-center text-xs font-mono transition-colors duration-500 ${
                        simState === "redis_hit" || simState === "check_redis" ? "border-orange-500 bg-orange-950/30 text-orange-400" : "border-orange-500/30 bg-orange-950/10 text-orange-400/50"
                      }`}>
                        Cache
                      </div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-tertiary">Redis</span>
                    </div>

                    <div className="flex items-center gap-3 w-28">
                      <div className={`w-9 h-9 rounded-sm border flex items-center justify-center text-xs font-mono transition-colors duration-500 ${
                        simState === "to_db" || simState === "db_to_redis" ? "border-blue-500 bg-blue-950/30 text-blue-400" : "border-blue-500/30 bg-blue-950/10 text-blue-400/50"
                      }`}>
                        DB
                      </div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-tertiary">Postgres</span>
                    </div>
                  </div>
                </div>

                {/* Console Logs */}
                <div
                  ref={consoleRef}
                  className="bg-void/80 border border-border p-3 sm:p-4 rounded-sm h-20 sm:h-28 overflow-y-auto mb-4 font-mono text-[9px] sm:text-[10px] text-zinc-400 space-y-1"
                >
                  {simLogs.length === 0 ? (
                    <div className="text-tertiary italic">
                      {lang === "id" ? "[Klik 'Jalankan Request' untuk memulai simulasi]" : "[Click 'Send Request' to start simulation]"}
                    </div>
                  ) : (
                    simLogs.map((log, i) => <div key={i}>{log}</div>)
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex border border-border rounded-sm overflow-hidden flex-grow">
                  <button
                    disabled={simState !== "idle"}
                    onClick={() => setIsHitMode(true)}
                    className={`flex-1 font-mono text-[11px] sm:text-[10px] uppercase py-2 tracking-wider transition-colors cursor-pointer disabled:cursor-not-allowed ${
                      isHitMode ? "bg-primary text-void font-bold" : "text-secondary hover:bg-surface/50"
                    }`}
                  >
                    Cache Hit
                  </button>
                  <button
                    disabled={simState !== "idle"}
                    onClick={() => setIsHitMode(false)}
                    className={`flex-1 font-mono text-[11px] sm:text-[10px] uppercase py-2 tracking-wider transition-colors cursor-pointer disabled:cursor-not-allowed ${
                      !isHitMode ? "bg-primary text-void font-bold" : "text-secondary hover:bg-surface/50"
                    }`}
                  >
                    Cache Miss
                  </button>
                </div>
                <button
                  onClick={startCacheSimulation}
                  disabled={simState !== "idle"}
                  className="bg-void border border-border hover:border-primary text-primary hover:bg-primary hover:text-void font-mono text-[11px] sm:text-[10px] uppercase tracking-widest py-2.5 px-6 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {lang === "id" ? "Jalankan Request" : "Send Request"}
                </button>
              </div>
            </div>
          </SectionReveal>

          {/* Widget 2: Rate Limiter Game */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between overflow-hidden">
              {isBlocked && (
                <div className="absolute inset-0 bg-void/90 z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full border border-red-500/40 flex items-center justify-center text-red-500 mb-4 animate-bounce">
                    🔒
                  </div>
                  <h3 className="font-mono text-sm uppercase tracking-widest text-red-500 mb-2">
                    429 RATE LIMIT EXCEEDED
                  </h3>
                  <p className="text-xs text-secondary max-w-sm mb-6 leading-relaxed">
                    {lang === "id" ? "Spam terlalu cepat! IP diblokir sementara." : "Spamming too fast! Temporary IP block triggered."}
                  </p>
                  <span className="font-mono text-2xl text-primary font-bold">{blockTimeLeft}s</span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm">
                    02 // Rate Limiter Game
                  </h2>
                  <span className="font-mono text-[10px] text-tertiary">Limit: 5req / 10s</span>
                </div>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Uji ketahanan API dengan melakukan spam klik. Rate limiter akan mendeteksi lonjakan trafik dan memblokir request."
                    : "Try spamming requests to see the rate limiter protect the API by dropping requests once the bucket hits zero."}
                </p>

                <div className="flex flex-col gap-3 mb-4 bg-void/30 p-4 border border-border/80 rounded-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-secondary uppercase tracking-wider">Bucket Status:</span>
                    <span className="font-mono text-xs text-primary font-bold">{tokens} / {maxTokens}</span>
                  </div>
                  <div className="flex gap-2">
                    {Array.from({ length: maxTokens }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 flex-grow rounded-sm transition-all duration-300 ${
                          idx < tokens ? "bg-emerald-500 shadow-sm shadow-emerald-500/20" : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-void/80 border border-border p-3 sm:p-4 rounded-sm h-24 sm:h-[142px] overflow-y-auto mb-4 font-mono text-[9px] sm:text-[10px] space-y-1">
                  {rateLogs.length === 0 ? (
                    <div className="text-tertiary italic">
                      {lang === "id" ? "[Klik tombol di bawah untuk kirim request]" : "[Click button below to send requests]"}
                    </div>
                  ) : (
                    rateLogs.map((log, idx) => (
                      <div key={idx} className="flex justify-between gap-4">
                        <span className="text-tertiary">[{log.time}]</span>
                        <span className="text-secondary">{log.endpoint}</span>
                        <span className={log.status === 200 ? "text-emerald-400" : "text-red-400 font-bold"}>{log.status}</span>
                        <span className="text-zinc-500 flex-grow text-right truncate">{log.msg}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                onClick={handleRateRequest}
                className="w-full bg-void border border-border hover:border-primary text-primary hover:bg-primary hover:text-void font-mono text-[11px] sm:text-[11px] uppercase tracking-widest py-3 rounded-sm transition-all duration-300 cursor-pointer"
              >
                {lang === "id" ? "KIRIM REQUEST API" : "SEND API REQUEST"}
              </button>
            </div>
          </SectionReveal>

          {/* Widget 3: Password Hash & Bcrypt Simulator */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm">
                    03 // Bcrypt & SHA-256 Hashing
                  </h2>
                  <span className={`font-mono text-[9px] uppercase px-2 py-0.5 border rounded-sm ${
                    passwordStrength === "Strong" || passwordStrength === "Kuat" ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" :
                    passwordStrength === "Medium" || passwordStrength === "Sedang" ? "border-yellow-500/30 bg-yellow-500/5 text-yellow-400" :
                    "border-red-500/30 bg-red-500/5 text-red-400"
                  }`}>
                    {passwordStrength}
                  </span>
                </div>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Ketik password untuk melihat hash SHA-256 (cepat tapi rentan) vs Bcrypt (salt dinamis & lambat sehingga aman dari brute-force)."
                    : "Type a password to see SHA-256 hash (fast but vulnerable) vs Bcrypt (slow, salted, and brute-force resistant)."}
                </p>

                {/* Password Input */}
                <div className="flex flex-col gap-1 mb-4">
                  <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Password Input</label>
                  <input
                    type="text"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="bg-void border border-border rounded-sm px-3 py-2 text-xs font-mono text-primary outline-none focus:border-accent"
                    placeholder="Type a password..."
                    maxLength={32}
                  />
                </div>

                {/* Hashes Output */}
                <div className="space-y-3 font-mono text-[10px] sm:text-[9px] mb-4">
                  <div className="bg-void/50 border border-border p-2.5 rounded-sm overflow-x-auto">
                    <span className="text-orange-400 font-bold block mb-1">SHA-256 HASH (Static):</span>
                    <span className="text-secondary break-all select-all">{sha256Hash || "No input"}</span>
                  </div>
                  <div className="bg-void/50 border border-border p-2.5 rounded-sm overflow-x-auto">
                    <span className="text-blue-400 font-bold block mb-1">BCRYPT HASH (Salted):</span>
                    <span className="text-secondary break-all select-all">{bcryptHash || "No input"}</span>
                  </div>
                </div>
              </div>

              {/* Verify Password Section */}
              <div className="border-t border-border pt-4">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex flex-col gap-1 flex-grow w-full">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Verify Password (bcrypt.compare)</label>
                    <input
                      type="password"
                      value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                      className="bg-void border border-border rounded-sm px-3 py-2 text-xs font-mono text-primary outline-none focus:border-accent w-full"
                      placeholder={lang === "id" ? "Cocokkan password..." : "Check matching password..."}
                    />
                  </div>
                  {verifyPassword && (
                    <div className={`text-[10px] font-mono font-medium py-2 px-3 border rounded-sm w-full sm:w-auto text-center shrink-0 ${
                      verifyPassword === inputPassword
                        ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                        : "border-red-500/30 bg-red-500/5 text-red-400"
                    }`}>
                      {verifyPassword === inputPassword ? "✔ MATCH (200 OK)" : "✘ MISMATCH (401)"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Widget 4: CSS Glassmorphism Generator */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm">
                    04 // Glassmorphism Generator
                  </h2>
                  <button
                    onClick={() => setIsDarkGlass(!isDarkGlass)}
                    className="font-mono text-[9px] uppercase tracking-wider text-secondary border border-border px-2 py-0.5 rounded-sm hover:border-accent hover:text-primary transition-all duration-300 cursor-pointer"
                  >
                    {isDarkGlass ? "Dark Mode" : "Light Mode"}
                  </button>
                </div>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Sesuaikan slider untuk mendesain efek kaca transparan modern dan salin kode CSS-nya langsung ke proyek Anda."
                    : "Adjust the sliders to design custom modern frosted glass UI cards and copy the CSS styles directly."}
                </p>

                {/* Display Sandbox Area */}
                <div className="relative h-36 bg-zinc-950 border border-border/80 rounded-md mb-4 overflow-hidden flex items-center justify-center">
                  <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 blur-xl opacity-60 animate-pulse top-4 left-10" />
                  <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 blur-xl opacity-60 animate-pulse bottom-4 right-10" />
                  
                  <div
                    style={getGlassStyles()}
                    className="w-44 h-20 z-10 flex flex-col justify-center items-center p-2 text-[10px] text-center font-mono text-primary shadow-2xl transition-all duration-150"
                  >
                    <span>Glassmorphism Preview</span>
                    <span className="text-tertiary mt-1 text-[8px] uppercase tracking-wider">
                      blur: {glassBlur}px
                    </span>
                  </div>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[10px] sm:text-[9px] text-secondary">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="uppercase text-tertiary">Opacity</span>
                      <span>{Math.round(glassOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={glassOpacity * 100}
                      onChange={(e) => setGlassOpacity(Number(e.target.value) / 100)}
                      className="accent-primary h-1 bg-zinc-800 rounded-sm cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="uppercase text-tertiary">Blur</span>
                      <span>{glassBlur}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={glassBlur}
                      onChange={(e) => setGlassBlur(Number(e.target.value))}
                      className="accent-primary h-1 bg-zinc-800 rounded-sm cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="uppercase text-tertiary">Border</span>
                      <span>{glassBorder}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={glassBorder}
                      onChange={(e) => setGlassBorder(Number(e.target.value))}
                      className="accent-primary h-1 bg-zinc-800 rounded-sm cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="uppercase text-tertiary">Radius</span>
                      <span>{glassRadius}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={glassRadius}
                      onChange={(e) => setGlassRadius(Number(e.target.value))}
                      className="accent-primary h-1 bg-zinc-800 rounded-sm cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* CSS Code Snippet Copy */}
              <div className="border-t border-border pt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                <pre className="bg-void/80 border border-border rounded-sm p-2 text-[9px] sm:text-[8px] font-mono text-zinc-500 overflow-x-auto flex-grow min-h-14 sm:h-14 select-all leading-normal">
                  {getGlassCSSCode()}
                </pre>
                <button
                  onClick={handleCopyCSS}
                  className="bg-void border border-border hover:border-primary text-primary hover:bg-primary hover:text-void font-mono text-[10px] sm:text-[9px] uppercase tracking-wider py-3 sm:py-4 px-4 rounded-sm transition-all duration-300 cursor-pointer shrink-0 w-full sm:w-auto"
                >
                  {copiedCSS ? "Copied!" : "Copy CSS"}
                </button>
              </div>
            </div>
          </SectionReveal>

          {/* Widget 5: HTML/CSS Live Sandbox */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm mb-4">
                  05 // HTML/CSS Live Sandbox
                </h2>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Tulis kode HTML dan CSS inline untuk melihat hasilnya di-render secara instan di dalam iframe sandbox."
                    : "Write inline HTML/CSS markup and watch it render instantly inside a secured sandbox browser container."}
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">HTML & CSS Editor</label>
                    <textarea
                      value={htmlCode}
                      onChange={(e) => setHtmlCode(e.target.value)}
                      className="bg-void border border-border rounded-sm p-3 sm:p-3.5 text-[10px] sm:text-[9px] font-mono text-secondary h-36 sm:h-44 outline-none focus:border-accent resize-none select-text"
                      spellCheck="false"
                      placeholder="Type HTML here..."
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Live Render Output</label>
                    <iframe
                      srcDoc={getSandboxSrcDoc()}
                      className="w-full h-36 sm:h-44 bg-zinc-950 border border-border rounded-sm overflow-hidden"
                      sandbox="allow-scripts"
                      title="HTML Preview Sandbox"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4 text-right">
                <button
                  onClick={() => setHtmlCode(`<div class="card">
  <h2>Ival Permana</h2>
  <p>Backend & Cloud Engineer</p>
  <button onclick="alert('Hello from sandbox!')">Ping Server</button>
</div>

<style>
  .card {
    padding: 24px;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 8px;
    text-align: center;
    max-width: 200px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }
  h2 { margin: 0 0 6px 0; color: #fafafa; font-size: 15px; font-weight: 500; }
  p { margin: 0 0 16px 0; color: #a1a1aa; font-size: 11px; }
  button {
    padding: 6px 14px;
    background: #fafafa;
    color: #09090b;
    border: none;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  button:hover { opacity: 0.9; }
</style>`)}
                  className="font-mono text-[9px] uppercase tracking-wider text-secondary border border-border px-3 py-1.5 rounded-sm hover:border-accent hover:text-primary transition-all duration-300 cursor-pointer"
                >
                  Reset Template
                </button>
              </div>
            </div>
          </SectionReveal>

          {/* Widget 6: Base64 / URL Encoder & Decoder [NEW] */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm mb-4">
                  06 // Base64 & URL Codec
                </h2>
                <p className="text-xs text-secondary mb-6 leading-relaxed">
                  {lang === "id"
                    ? "Alat praktis untuk mengonversi data string menjadi format Base64 atau URL Encoding secara instan di browser Anda."
                    : "A handy utility tool to convert text strings to Base64 format or URL encoding formats instantly in your browser."}
                </p>

                <div className="flex flex-col gap-4">
                  {/* Select Mode */}
                  <div className="flex border border-border rounded-sm overflow-hidden">
                    <select
                      value={codecMode}
                      onChange={(e) => setCodecMode(e.target.value)}
                      className="bg-void border-none text-secondary text-[11px] font-mono px-3 py-2.5 rounded-sm outline-none focus:ring-0 w-full cursor-pointer"
                    >
                      <option value="base64_encode">Base64 Encode</option>
                      <option value="base64_decode">Base64 Decode</option>
                      <option value="url_encode">URL Encode</option>
                      <option value="url_decode">URL Decode</option>
                    </select>
                  </div>

                  {/* Input area */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Input String</label>
                    <textarea
                      value={codecInput}
                      onChange={(e) => setCodecInput(e.target.value)}
                      className="bg-void border border-border rounded-sm p-3 sm:p-3.5 text-xs font-mono text-secondary h-16 sm:h-20 outline-none focus:border-accent resize-none select-text"
                      spellCheck="false"
                      placeholder="Type text to convert..."
                    />
                  </div>

                  {/* Output area */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Codec Output</label>
                    <textarea
                      value={codecOutput}
                      readOnly
                      className="bg-void/50 border border-border rounded-sm p-3 sm:p-3.5 text-xs font-mono text-primary h-16 sm:h-20 outline-none resize-none select-all"
                      placeholder="Output will appear here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Widget 7: Regex Pattern Matcher [NEW] */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm mb-4">
                  07 // Regex Tester & Matcher
                </h2>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Uji ekspresi reguler (Regex) Anda secara interaktif. Tampilkan hasil pencocokan teks secara dinamis."
                    : "Test your regular expressions (Regex) interactively. View string matches dynamically from your custom pattern."}
                </p>

                <div className="flex flex-col gap-3">
                  {/* Pattern input */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Regex Pattern (RegExp)</label>
                    <input
                      type="text"
                      value={regexPattern}
                      onChange={(e) => setRegexPattern(e.target.value)}
                      className={`bg-void border rounded-sm px-3 py-2 text-xs font-mono text-primary outline-none ${
                        regexError ? "border-red-500/50 focus:border-red-500" : "border-border focus:border-accent"
                      }`}
                      placeholder="e.g. \\b[A-Z]\\w+\\b"
                    />
                    {regexError && (
                      <span className="font-mono text-[9px] sm:text-[8px] text-red-400 mt-1">
                        Syntax Error: {regexError}
                      </span>
                    )}
                  </div>

                  {/* Source text input */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Source Text</label>
                    <textarea
                      value={regexText}
                      onChange={(e) => setRegexText(e.target.value)}
                      className="bg-void border border-border rounded-sm p-2.5 text-xs font-mono text-secondary h-16 sm:h-20 outline-none focus:border-accent resize-none select-text"
                      spellCheck="false"
                    />
                  </div>

                  {/* Matches Found */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">
                      Matches Found ({regexMatches.length})
                    </label>
                    <div className="bg-void/50 border border-border p-2.5 rounded-sm min-h-12 sm:h-14 overflow-y-auto font-mono text-[10px] sm:text-[9px] text-emerald-400 flex flex-wrap gap-2">
                      {regexMatches.length === 0 ? (
                        <span className="text-tertiary italic">No matches</span>
                      ) : (
                        regexMatches.map((m, idx) => (
                          <span key={idx} className="bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-sm">
                            "{m}"
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Widget 8: Keycode Keyboard Event Listener [NEW] */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm mb-4">
                  08 // Keyboard Event Inspector
                </h2>
                <p className="text-xs text-secondary mb-6 leading-relaxed">
                  {lang === "id"
                    ? "Tekan sembarang tombol di keyboard Anda (di luar kolom teks) untuk menginspeksi properti JavaScript KeyboardEvent."
                    : "Press any key on your keyboard (outside inputs) to inspect the triggered JavaScript KeyboardEvent attributes."}
                </p>

                {lastKey ? (
                  <div className="flex flex-col gap-4 bg-void/30 p-3 sm:p-4 border border-border/80 rounded-sm font-mono">
                    <div className="flex flex-col items-center justify-center py-3 sm:py-4 border-b border-border/50">
                      <span className="text-tertiary text-[10px] sm:text-[9px] uppercase tracking-wider mb-2">giant keycode display</span>
                      <span className="text-4xl sm:text-5xl font-bold text-primary animate-pulse">{lastKey.keyCode}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3 text-[11px] sm:text-[10px] text-secondary">
                      <div className="flex justify-between pr-3 sm:pr-4 border-r border-border/30">
                        <span className="text-tertiary uppercase text-[9px] sm:text-[8px]">e.key</span>
                        <span className="text-primary font-bold">{lastKey.key}</span>
                      </div>
                      <div className="flex justify-between pl-3 sm:pl-4">
                        <span className="text-tertiary uppercase text-[9px] sm:text-[8px]">e.code</span>
                        <span className="text-primary font-bold">{lastKey.code}</span>
                      </div>
                      <div className="flex justify-between pr-3 sm:pr-4 border-r border-border/30 mt-1">
                        <span className="text-tertiary uppercase text-[9px] sm:text-[8px]">Shift / Ctrl / Alt</span>
                        <span className="text-zinc-400">
                          {lastKey.shift ? "S " : ""}{lastKey.ctrl ? "C " : ""}{lastKey.alt ? "A" : ""}
                          {!lastKey.shift && !lastKey.ctrl && !lastKey.alt ? "None" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between pl-3 sm:pl-4 mt-1">
                        <span className="text-tertiary uppercase text-[9px] sm:text-[8px]">Event Type</span>
                        <span className="text-zinc-500 font-bold">keydown</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-44 sm:h-56 bg-void/50 border border-border border-dashed rounded-md flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-tertiary text-xs font-mono animate-pulse">
                      {lang === "id" ? "[Tekan sembarang tombol untuk menguji]" : "[Press any key to test]"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </SectionReveal>

          {/* Widget 9: Markdown Live Previewer [NEW] */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm mb-4">
                  09 // Markdown Live Previewer
                </h2>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Tulis teks dalam sintaks Markdown di sisi kiri dan lihat hasilnya di-render secara instan menjadi HTML terformat di sisi kanan."
                    : "Write text in Markdown markup on the left and see it compiled instantly into rich HTML output on the right."}
                </p>

                <div className="grid grid-cols-1 gap-4">
                  {/* Editor */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Markdown Editor</label>
                    <textarea
                      value={markdownInput}
                      onChange={(e) => setMarkdownInput(e.target.value)}
                      className="bg-void border border-border rounded-sm p-3 sm:p-3.5 text-[10px] sm:text-[9px] font-mono text-secondary h-40 sm:h-[230px] outline-none focus:border-accent resize-none select-text"
                      spellCheck="false"
                      placeholder="Type markdown..."
                    />
                  </div>

                  {/* HTML Preview */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">HTML Render Output</label>
                    <div
                      className="bg-void/50 border border-border rounded-sm p-3 sm:p-3.5 h-40 sm:h-[230px] overflow-y-auto text-secondary text-[11px] sm:text-[10px] select-text prose prose-invert max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(markdownInput) }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Widget 11: SQL Injection (SQLi) Simulator */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm">
                    11 // SQL Injection Simulator
                  </h2>
                  <span className={`font-mono text-[9px] uppercase px-2 py-0.5 border rounded-sm ${
                    sqliResult === "success" ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" :
                    sqliResult === "fail" ? "border-red-500/30 bg-red-500/5 text-red-400" :
                    "border-border text-tertiary"
                  }`}>
                    {sqliResult === "success" ? "Access Granted" : sqliResult === "fail" ? "Access Denied" : "Standby"}
                  </span>
                </div>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Pelajari kerentanan keamanan database. Gunakan input standar vs bypass payload SQL injection untuk menembus autentikasi."
                    : "Learn database security vulnerabilities. Use standard input vs SQL injection payloads to bypass authentication."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Username</label>
                      <input
                        type="text"
                        value={sqliUsername}
                        onChange={(e) => setSqliUsername(e.target.value)}
                        className="bg-void border border-border rounded-sm px-3 py-1.5 text-xs font-mono text-primary outline-none focus:border-accent"
                        placeholder="admin"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] sm:text-[9px] uppercase text-tertiary">Password</label>
                      <input
                        type="text"
                        value={sqliPassword}
                        onChange={(e) => setSqliPassword(e.target.value)}
                        className="bg-void border border-border rounded-sm px-3 py-1.5 text-xs font-mono text-primary outline-none focus:border-accent"
                        placeholder="' OR '1'='1"
                      />
                    </div>
                    
                    <button
                      onClick={executeSQLQuery}
                      className="mt-2 bg-void border border-border hover:border-primary text-primary hover:bg-primary hover:text-void font-mono text-[10px] sm:text-[9px] uppercase tracking-wider py-2 rounded-sm transition-all duration-300 cursor-pointer"
                    >
                      {lang === "id" ? "Jalankan Query SQL" : "Run SQL Query"}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex border border-border rounded-sm overflow-hidden mb-1">
                      {["query", "logs", "data"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setSqliTab(tab)}
                          className={`flex-1 font-mono text-[10px] sm:text-[8px] uppercase py-1 tracking-wider transition-colors cursor-pointer ${
                            sqliTab === tab ? "bg-primary text-void font-bold" : "text-secondary hover:bg-surface/50"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div className="bg-void/50 border border-border rounded-sm p-3 h-32 sm:h-36 overflow-y-auto text-[10px] sm:text-[9px] font-mono text-secondary">
                      {sqliTab === "query" && (
                        <div className="space-y-2 select-text leading-normal">
                          <span className="text-zinc-500 block">// Generated SQL Query:</span>
                          <code className="text-pink-400 break-all select-all">
                            SELECT <span className="text-sky-400">*</span> FROM <span className="text-sky-400">users</span> WHERE <span className="text-emerald-400">username</span> = '<span className="text-yellow-300">{sqliUsername}</span>' AND <span className="text-emerald-400">password</span> = '<span className="text-yellow-300">{sqliPassword}</span>';
                          </code>
                          <span className="text-zinc-500 block mt-2 text-[8px]">
                            {lang === "id" 
                              ? "* Tips: Payload ' OR '1'='1 bypass karena mengevaluasi kondisi WHERE menjadi selalu bernilai TRUE."
                              : "* Tips: The ' OR '1'='1 payload bypasses because it forces the WHERE condition to evaluate to TRUE."}
                          </span>
                        </div>
                      )}
                      
                      {sqliTab === "logs" && (
                        <div className="space-y-1">
                          {sqliLogs.length === 0 ? (
                            <span className="text-tertiary italic">{lang === "id" ? "[Menunggu eksekusi query]" : "[Awaiting query execution]"}</span>
                          ) : (
                            sqliLogs.map((log, idx) => (
                              <div key={idx} className={
                                log.startsWith("[SQL]") ? "text-sky-400" :
                                log.startsWith("[Engine] Parse") ? "text-yellow-400" :
                                log.includes("bypassed") || log.includes("matched") ? "text-emerald-400" : "text-zinc-500"
                              }>
                                {log}
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {sqliTab === "data" && (
                        <div className="h-full">
                          {sqliResult === "success" ? (
                            <div className="space-y-2 select-text">
                              <span className="text-emerald-400 block">// Retrieved Database Records:</span>
                              <table className="w-full text-left border-collapse border border-border text-[8px]">
                                <thead>
                                  <tr className="bg-void border-b border-border">
                                    <th className="p-1 font-bold">id</th>
                                    <th className="p-1 font-bold">username</th>
                                    <th className="p-1 font-bold">role</th>
                                    <th className="p-1 font-bold">flag</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-border">
                                    <td className="p-1">1</td>
                                    <td className="p-1 text-primary">super_admin</td>
                                    <td className="p-1 text-sky-400">root</td>
                                    <td className="p-1 text-pink-400">FLAG{"{sqli_injection_bypassed_2026}"}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-tertiary italic text-center">
                              {lang === "id" ? "Kueri gagal atau belum diautentikasi untuk melihat data sensitif." : "Query failed or unauthorized to view schema data."}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Widget 12: WebSocket Pub-Sub Visualizer */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between overflow-hidden">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm mb-4">
                  12 // WebSocket Pub-Sub Broker
                </h2>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Kirim pesan secara pub-sub. Lihat bagaimana Broker mendistribusikan pesan secara real-time hanya ke client yang berlangganan."
                    : "Simulate WebSocket publish-subscribe. Observe how the Broker routes real-time data packets only to subscribed clients."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Publisher Column */}
                  <div className="border border-border bg-void/30 p-2.5 rounded-sm flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[8px] uppercase text-primary block mb-2 font-bold">// Publisher</span>
                      <div className="flex flex-col gap-1.5">
                        <select
                          value={wsChannel}
                          onChange={(e) => setWsChannel(e.target.value)}
                          className="bg-void border border-border text-secondary text-[10px] sm:text-[9px] font-mono px-2 py-1 rounded-sm outline-none focus:border-accent w-full cursor-pointer"
                        >
                          <option value="metrics">/channel/metrics</option>
                          <option value="alerts">/channel/alerts</option>
                        </select>
                        <textarea
                          value={wsMessage}
                          onChange={(e) => setWsMessage(e.target.value)}
                          className="bg-void border border-border rounded-sm p-1.5 text-[10px] sm:text-[8px] font-mono text-secondary h-12 outline-none resize-none"
                          placeholder="Payload JSON..."
                        />
                      </div>
                    </div>
                    <button
                      onClick={publishWSMessage}
                      disabled={wsAnimState !== "idle"}
                      className="mt-3 bg-void border border-border hover:border-primary text-primary hover:bg-primary hover:text-void font-mono text-[10px] sm:text-[8px] uppercase tracking-wider py-1.5 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {lang === "id" ? "Publikasikan" : "Publish"}
                    </button>
                  </div>

                  {/* Broker Visual Area */}
                  <div className="border border-border bg-void/50 p-2.5 rounded-sm flex flex-col items-center justify-center relative min-h-[140px] sm:min-h-0">
                    <span className="font-mono text-[7px] uppercase text-tertiary absolute top-2">// Broker Engine</span>
                    
                    {/* SVG Connector lines */}
                    <svg className="absolute inset-0 w-full h-full text-border pointer-events-none z-0">
                      {/* Publisher to Broker */}
                      <path d="M 10,75 L 50,75" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3" />
                      {/* Broker to Client A */}
                      <path d="M 50,75 L 120,30" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3" />
                      {/* Broker to Client B */}
                      <path d="M 50,75 L 120,75" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3" />
                      {/* Broker to Client C */}
                      <path d="M 50,75 L 120,120" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3" />
                    </svg>

                    {/* Animated packets */}
                    {wsAnimState === "publishing" && (
                      <div className="absolute left-[10%] w-1.5 h-1.5 rounded-full bg-accent-warm shadow animate-ws-pub z-10" />
                    )}
                    {wsAnimState === "delivering" && (
                      <>
                        {wsSubA.includes(wsLastChannel) && (
                          <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500 shadow animate-ws-client-a z-10" />
                        )}
                        {wsSubB.includes(wsLastChannel) && (
                          <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500 shadow animate-ws-client-b z-10" />
                        )}
                        {wsSubC.includes(wsLastChannel) && (
                          <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500 shadow animate-ws-client-c z-10" />
                        )}
                      </>
                    )}

                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-mono text-[9px] z-10 transition-colors duration-300 ${
                      wsAnimState === "broker" ? "border-accent-warm bg-accent-warm/15 text-accent-warm animate-pulse font-bold" : "border-border bg-void text-secondary"
                    }`}>
                      WS
                    </div>
                  </div>

                  {/* Clients Configuration Column */}
                  <div className="border border-border bg-void/30 p-2.5 rounded-sm flex flex-col justify-between gap-2 text-[10px] sm:text-[8px] font-mono">
                    <span className="font-mono text-[10px] sm:text-[8px] uppercase text-primary block font-bold">// Subscriptions</span>
                    
                    {/* Client A */}
                    <div className="border-b border-border/40 pb-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-secondary font-bold">Client A</span>
                        <div className="flex gap-1.5">
                          <label className="flex items-center gap-0.5 text-[9px] sm:text-[7px] text-tertiary cursor-pointer">
                            <input
                              type="checkbox"
                              checked={wsSubA.includes("metrics")}
                              onChange={(e) => {
                                setWsSubA(prev => e.target.checked ? [...prev, "metrics"] : prev.filter(x => x !== "metrics"));
                              }}
                              className="accent-primary"
                            /> M
                          </label>
                          <label className="flex items-center gap-0.5 text-[9px] sm:text-[7px] text-tertiary cursor-pointer">
                            <input
                              type="checkbox"
                              checked={wsSubA.includes("alerts")}
                              onChange={(e) => {
                                setWsSubA(prev => e.target.checked ? [...prev, "alerts"] : prev.filter(x => x !== "alerts"));
                              }}
                              className="accent-primary"
                            /> A
                          </label>
                        </div>
                      </div>
                      <div className="text-[9px] sm:text-[7px] text-zinc-500 h-6 overflow-hidden truncate">
                        {wsLogsA[0] || "Waiting data..."}
                      </div>
                    </div>

                    {/* Client B */}
                    <div className="border-b border-border/40 pb-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-secondary font-bold">Client B</span>
                        <div className="flex gap-1.5">
                          <label className="flex items-center gap-0.5 text-[9px] sm:text-[7px] text-tertiary cursor-pointer">
                            <input
                              type="checkbox"
                              checked={wsSubB.includes("metrics")}
                              onChange={(e) => {
                                setWsSubB(prev => e.target.checked ? [...prev, "metrics"] : prev.filter(x => x !== "metrics"));
                              }}
                              className="accent-primary"
                            /> M
                          </label>
                          <label className="flex items-center gap-0.5 text-[9px] sm:text-[7px] text-tertiary cursor-pointer">
                            <input
                              type="checkbox"
                              checked={wsSubB.includes("alerts")}
                              onChange={(e) => {
                                setWsSubB(prev => e.target.checked ? [...prev, "alerts"] : prev.filter(x => x !== "alerts"));
                              }}
                              className="accent-primary"
                            /> A
                          </label>
                        </div>
                      </div>
                      <div className="text-[9px] sm:text-[7px] text-zinc-500 h-6 overflow-hidden truncate">
                        {wsLogsB[0] || "Waiting data..."}
                      </div>
                    </div>

                    {/* Client C */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-secondary font-bold">Client C</span>
                        <div className="flex gap-1.5">
                          <label className="flex items-center gap-0.5 text-[9px] sm:text-[7px] text-tertiary cursor-pointer">
                            <input
                              type="checkbox"
                              checked={wsSubC.includes("metrics")}
                              onChange={(e) => {
                                setWsSubC(prev => e.target.checked ? [...prev, "metrics"] : prev.filter(x => x !== "metrics"));
                              }}
                              className="accent-primary"
                            /> M
                          </label>
                          <label className="flex items-center gap-0.5 text-[9px] sm:text-[7px] text-tertiary cursor-pointer">
                            <input
                              type="checkbox"
                              checked={wsSubC.includes("alerts")}
                              onChange={(e) => {
                                setWsSubC(prev => e.target.checked ? [...prev, "alerts"] : prev.filter(x => x !== "alerts"));
                              }}
                              className="accent-primary"
                            /> A
                          </label>
                        </div>
                      </div>
                      <div className="text-[9px] sm:text-[7px] text-zinc-500 h-6 overflow-hidden truncate">
                        {wsLogsC[0] || "Waiting data..."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Widget 13: Git Commit Graph Simulator */}
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm mb-4">
                  13 // Git Commit Graph Visualizer
                </h2>
                <p className="text-xs text-secondary mb-4 leading-relaxed">
                  {lang === "id"
                    ? "Simulasikan diagram riwayat git. Lakukan commit, buat branch, dan merge secara visual untuk melihat bagaimana diagram commit terbentuk."
                    : "Simulate a Git commit tree history. Execute commit, checkout, branch creation, and merge commands visually."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Graph Render Area */}
                  <div className="bg-void/50 border border-border/80 rounded-md h-36 sm:h-44 relative overflow-y-auto p-4 flex flex-col-reverse justify-end select-none">
                    <svg className="w-full h-[300px] absolute top-0 left-0 text-border pointer-events-none">
                      {/* Draw parent lines */}
                      {gitHistory.map((commit, index) => {
                        const x = 30 + gitBranches.indexOf(commit.branch) * 35;
                        const y = 30 + index * 26;
                        
                        return (
                          <g key={`lines-${commit.hash}`}>
                            {commit.parent && (() => {
                              const parentCommit = gitHistory.find(c => c.hash === commit.parent);
                              if (!parentCommit) return null;
                              const px = 30 + gitBranches.indexOf(parentCommit.branch) * 35;
                              const py = 30 + gitHistory.indexOf(parentCommit) * 26;
                              return <line x1={px} y1={py} x2={x} y2={y} stroke="#3f3f46" strokeWidth="1.5" />;
                            })()}
                            
                            {commit.mergeParent && (() => {
                              const mergeParentCommit = gitHistory.find(c => c.hash === commit.mergeParent);
                              if (!mergeParentCommit) return null;
                              const mx = 30 + gitBranches.indexOf(mergeParentCommit.branch) * 35;
                              const my = 30 + gitHistory.indexOf(mergeParentCommit) * 26;
                              return <line x1={mx} y1={my} x2={x} y2={y} stroke="#10b981" strokeWidth="1" strokeDasharray="3" />;
                            })()}
                          </g>
                        );
                      })}

                      {/* Draw commit nodes */}
                      {gitHistory.map((commit, index) => {
                        const x = 30 + gitBranches.indexOf(commit.branch) * 35;
                        const y = 30 + index * 26;
                        const isHead = gitHistory.filter(c => c.branch === gitActiveBranch).pop()?.hash === commit.hash;
                        
                        return (
                          <g key={`nodes-${commit.hash}`}>
                            <circle
                              cx={x}
                              cy={y}
                              r={isHead ? 5 : 4}
                              fill={isHead ? "#10b981" : "#f97316"}
                              className={isHead ? "animate-pulse" : ""}
                            />
                            {isHead && (
                              <circle
                                cx={x}
                                cy={y}
                                r={8}
                                stroke="#10b981"
                                strokeWidth="0.8"
                                fill="none"
                                className="animate-ping"
                              />
                            )}
                            <text
                              x={x + 9}
                              y={y + 3}
                              fill="#71717a"
                              fontSize="7px"
                              fontFamily="monospace"
                            >
                              {commit.hash}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    <div className="absolute bottom-2 right-2 font-mono text-[7px] uppercase tracking-wider text-secondary bg-void/80 border border-border/60 px-1.5 py-0.5 rounded-sm">
                      {lang === "id" ? "Cabang aktif: " : "active: "}
                      <span className="text-emerald-400 font-bold">{gitActiveBranch}</span>
                    </div>
                  </div>

                  {/* Git Terminal Command Console */}
                  <div className="flex flex-col gap-2">
                    <div className="bg-void border border-border rounded-sm p-3 sm:p-3.5 h-24 sm:h-32 overflow-y-auto font-mono text-[9px] sm:text-[8px] text-zinc-400 space-y-1">
                      {gitConsole.map((log, idx) => (
                        <div
                          key={idx}
                          className={
                            log.startsWith("$") ? "text-emerald-400" :
                            log.startsWith("Error:") ? "text-red-400 font-bold" :
                            log.startsWith("[") ? "text-primary font-medium" : "text-zinc-500"
                          }
                        >
                          {log}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={handleGitCommit}
                        className="bg-void border border-border hover:border-primary text-primary hover:bg-primary hover:text-void font-mono text-[10px] sm:text-[8px] uppercase tracking-wider py-1.5 rounded-sm transition-all duration-300 cursor-pointer"
                      >
                        git commit
                      </button>
                      <button
                        onClick={handleGitBranch}
                        className="bg-void border border-border hover:border-primary text-primary hover:bg-primary hover:text-void font-mono text-[10px] sm:text-[8px] uppercase tracking-wider py-1.5 rounded-sm transition-all duration-300 cursor-pointer"
                      >
                        git branch
                      </button>
                      
                      {/* Checkout / Switch selectors */}
                      <select
                        value={gitActiveBranch}
                        onChange={(e) => handleGitCheckout(e.target.value)}
                        className="bg-void border border-border text-secondary text-[10px] sm:text-[8px] font-mono px-2 py-1.5 rounded-sm outline-none focus:border-accent cursor-pointer"
                      >
                        {gitBranches.map((br) => (
                          <option key={br} value={br}>
                            checkout: {br}
                          </option>
                        ))}
                      </select>

                      {/* Merge selectors */}
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleGitMerge(e.target.value);
                            e.target.value = ""; // Reset
                          }
                        }}
                        className="bg-void border border-border text-secondary text-[10px] sm:text-[8px] font-mono px-2 py-1.5 rounded-sm outline-none focus:border-accent cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          merge branch...
                        </option>
                        {gitBranches.map((br) => (
                          <option key={br} value={br} disabled={br === gitActiveBranch}>
                            merge: {br}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Embedded Custom Styles for WebSocket and Git widgets */}
          <style>{`
            @keyframes wsPub {
              0% { left: 10%; top: 50%; opacity: 0; transform: translateY(-50%) scale(0.5); }
              20% { opacity: 1; transform: translateY(-50%) scale(1); }
              80% { opacity: 1; transform: translateY(-50%) scale(1); }
              100% { left: 50%; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            }
            @keyframes wsClientA {
              0% { left: 50%; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
              20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              100% { left: 85%; top: 20%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            }
            @keyframes wsClientB {
              0% { left: 50%; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
              20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              100% { left: 85%; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            }
            @keyframes wsClientC {
              0% { left: 50%; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
              20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              100% { left: 85%; top: 80%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            }
            .animate-ws-pub {
              animation: wsPub 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            .animate-ws-client-a {
              animation: wsClientA 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            .animate-ws-client-b {
              animation: wsClientB 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            .animate-ws-client-c {
              animation: wsClientC 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
          `}</style>
        </div>

        {/* Widget 10: Sorting Algorithm Visualizer (Full Width) */}
        <div className="mt-8 lg:mt-12">
          <SectionReveal>
            <div className="border border-border bg-surface/10 rounded-md p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-4">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm">
                    10 // Sorting Algorithm Visualizer
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[9px] text-tertiary uppercase">
                      Array Size: {sortArray.length}
                    </span>
                    <span className="font-mono text-[9px] text-tertiary uppercase">
                      Speed: {sortSpeed}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-secondary mb-6 leading-relaxed">
                  {lang === "id"
                    ? "Pilih algoritma (Bubble, Selection, Insertion, Quick Sort) dan jalankan simulasi pengurutan data acak. Balok kuning menunjukkan proses pembandingan, sedangkan hijau menunjukkan balok yang telah terurut."
                    : "Select an algorithm (Bubble, Selection, Insertion, Quick Sort) and run the sorting simulation. Visual elements turn yellow when compared and green when positioned in their correct sorted location."}
                </p>

                {/* Visualizer bars graph */}
                <div className="h-40 sm:h-52 bg-void/50 border border-border/80 rounded-md flex items-end justify-between px-2 sm:px-8 py-3 mb-6 relative">
                  {sortArray.map((value, idx) => {
                    const isActive = activeSortIndices.includes(idx);
                    const isSorted = sortedIndices.includes(idx);
                    let barColor = "bg-zinc-800 border-zinc-700";
                    if (isActive) barColor = "bg-yellow-500 border-yellow-400";
                    else if (isSorted) barColor = "bg-emerald-500/80 border-emerald-400/50 animate-pulse";

                    return (
                      <div
                        key={idx}
                        className={`w-[2.2%] sm:w-[2.2%] rounded-t-sm border transition-all duration-150 ${barColor}`}
                        style={{ height: `${value}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-border pt-4">
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  {/* Select Algorithm */}
                  <select
                    disabled={isSorting}
                    value={sortAlgo}
                    onChange={(e) => setSortAlgo(e.target.value)}
                    className="bg-void border border-border text-secondary text-[11px] font-mono px-3 py-2 rounded-sm outline-none focus:border-accent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="bubble">Bubble Sort</option>
                    <option value="selection">Selection Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="quick">Quick Sort (Recursive)</option>
                  </select>

                  {/* Speed Slider */}
                  <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
                    <span className="font-mono text-[9px] uppercase text-tertiary">Slow</span>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={sortSpeed}
                      onChange={(e) => setSortSpeed(Number(e.target.value))}
                      className="accent-primary bg-zinc-800 rounded-lg cursor-pointer h-1 flex-grow"
                    />
                    <span className="font-mono text-[9px] uppercase text-tertiary">Fast</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={generateRandomArray}
                    disabled={isSorting}
                    className="bg-void border border-border text-secondary hover:text-primary hover:border-accent font-mono text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {lang === "id" ? "Acak Array" : "Randomize Array"}
                  </button>
                  {isSorting ? (
                    <button
                      onClick={stopSort}
                      className="bg-red-950/20 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white font-mono text-[10px] uppercase tracking-widest py-2.5 px-5 rounded-sm cursor-pointer transition-all duration-300"
                    >
                      {lang === "id" ? "Berhenti" : "Stop"}
                    </button>
                  ) : (
                    <button
                      onClick={startSort}
                      className="bg-void border border-border hover:border-primary text-primary hover:bg-primary hover:text-void font-mono text-[10px] uppercase tracking-widest py-2.5 px-5 rounded-sm cursor-pointer transition-all duration-300"
                    >
                      {lang === "id" ? "Jalankan Sort" : "Run Sort"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
