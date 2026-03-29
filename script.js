// ---------- Small utilities ----------
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ---------- Page loader + reveal transitions ----------
const pageLoader = $("#pageLoader");
window.addEventListener("load", () => {
  setTimeout(() => {
    pageLoader.classList.add("hidden");
  }, 900);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

$$('.reveal').forEach((section) => revealObserver.observe(section));

// ---------- Hero typing animation ----------
const typedMessage = $("#typedMessage");
const loveLine =
  "From our first hello to forever, every beat of my heart whispers your name, Salina.";
let typingIndex = 0;

function typeHeroMessage() {
  if (typingIndex <= loveLine.length) {
    typedMessage.textContent = loveLine.slice(0, typingIndex);
    typingIndex += 1;
    setTimeout(typeHeroMessage, 45);
  }
}

typeHeroMessage();

// ---------- Smooth start journey ----------
const startJourney = $("#startJourney");
startJourney.addEventListener("click", () => {
  $("#love-story").scrollIntoView({ behavior: "smooth" });
});

// ---------- Floating hearts ----------
const floatingHearts = $("#floatingHearts");
function spawnFloatingHeart() {
  const heart = document.createElement("span");
  const symbols = ["❤", "💖", "💗", "💘", "✨"];
  const duration = 6000 + Math.random() * 5000;
  heart.className = "floating-heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  heart.style.animationDuration = `${duration}ms`;
  floatingHearts.appendChild(heart);
  setTimeout(() => heart.remove(), duration);
}

setInterval(spawnFloatingHeart, 700);

// ---------- 3D tilt cards ----------
$$('.tilt-card').forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
});

// ---------- Hidden note reveal ----------
const hiddenNoteBox = $("#hiddenNoteBox");
$$('.reveal-btn').forEach((btn) => {
  btn.addEventListener("click", () => {
    hiddenNoteBox.textContent = btn.dataset.message;
    createHeartBurst(window.innerWidth / 2, hiddenNoteBox.getBoundingClientRect().top + 20, 14);
  });
});

// ---------- Message modals ----------
const messageModal = $("#messageModal");
const surpriseModal = $("#surpriseModal");
const modalMessage = $("#modalMessage");

function openModal(modal) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

$$('.gallery-item').forEach((item) => {
  item.addEventListener("click", () => {
    modalMessage.textContent = item.dataset.message;
    openModal(messageModal);
  });
});

$("#closeModal").addEventListener("click", () => closeModal(messageModal));
$("#closeSurprise").addEventListener("click", () => closeModal(surpriseModal));

messageModal.addEventListener("click", (event) => {
  if (event.target === messageModal) closeModal(messageModal);
});

surpriseModal.addEventListener("click", (event) => {
  if (event.target === surpriseModal) closeModal(surpriseModal);
});

$("#surpriseNow").addEventListener("click", () => openModal(surpriseModal));
setTimeout(() => openModal(surpriseModal), 12000);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(messageModal);
    closeModal(surpriseModal);
  }
});

// ---------- Love meter animation ----------
const meterFill = $("#meterFill");
const meterText = $("#meterText");
let meterPlayed = false;

const meterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !meterPlayed) {
        meterPlayed = true;
        animateLoveMeter();
      }
    });
  },
  { threshold: 0.4 }
);

meterObserver.observe($("#love-meter"));

function animateLoveMeter() {
  let value = 0;
  const meterStep = setInterval(() => {
    value += 1;
    meterFill.style.setProperty("--love", value);
    meterText.textContent = `${value}%`;

    if (value >= 100) {
      clearInterval(meterStep);
      setTimeout(() => {
        meterText.textContent = "∞%";
      }, 700);
    }
  }, 25);
}

// ---------- 50 romantic questions quiz ----------
const romanticQuestions = [
  {
    question: "What was your first impression of me?",
    answers: ["Sweet and curious", "Comforting and warm", "Magnetic and unforgettable", "It felt like destiny"]
  },
  {
    question: "When did you realize you loved me?",
    answers: ["Slowly over time", "During a deep moment", "After a special memory", "I felt it from the start"]
  },
  {
    question: "What do you love most about us?",
    answers: ["How we laugh", "How we communicate", "How we support each other", "How natural forever feels"]
  },
  {
    question: "What is your favorite memory with me?",
    answers: ["A small daily moment", "Our first real date", "A random adventure", "A memory I replay all the time"]
  },
  {
    question: "Which moment felt the most magical?",
    answers: ["Our first long talk", "A quiet hug", "A perfect date", "A moment when time stopped"]
  },
  {
    question: "Movie date or night walk?",
    answers: ["Movie date", "Night walk", "Both in one day", "Anything if it is with you"]
  },
  {
    question: "Dance together or sing together?",
    answers: ["Dance", "Sing", "Both and laugh", "Whatever makes us close"]
  },
  {
    question: "What does love mean to you?",
    answers: ["Care", "Commitment", "Peace + passion", "Choosing each other forever"]
  },
  {
    question: "Where do you see us in 5 years?",
    answers: ["Still growing together", "Building our dream life", "Traveling and creating memories", "Happily inseparable"]
  },
  {
    question: "One word that describes our story?",
    answers: ["Beautiful", "Healing", "Unstoppable", "Soulmate"]
  },
  {
    question: "What makes you feel closest to me?",
    answers: ["Our conversations", "Physical closeness", "Shared dreams", "The way we understand each other"]
  },
  {
    question: "Which habit of mine is cutest?",
    answers: ["My texts", "My smile", "My protective side", "Everything about me"]
  },
  {
    question: "What place reminds you of me?",
    answers: ["A cozy cafe", "A sunset spot", "Our favorite road", "Every beautiful place"]
  },
  {
    question: "How do you like being surprised by me?",
    answers: ["Sweet notes", "Small gifts", "Unexpected dates", "Anything thoughtful"]
  },
  {
    question: "What song feels like our relationship?",
    answers: ["Soft and calm", "Fun and energetic", "Deep and emotional", "A forever love song"]
  },
  {
    question: "Which date should we repeat soon?",
    answers: ["Food date", "Long walk", "Drive + music", "All of them"]
  },
  {
    question: "Sunrise date or midnight drive?",
    answers: ["Sunrise date", "Midnight drive", "Both", "Any moment with you"]
  },
  {
    question: "When you are sad, what from me helps most?",
    answers: ["A message", "A hug", "Listening carefully", "Just your presence"]
  },
  {
    question: "What adventure should we do next?",
    answers: ["New restaurant tour", "Weekend getaway", "Spontaneous trip", "Dream destination"]
  },
  {
    question: "What do you admire most in me?",
    answers: ["My heart", "My effort", "My loyalty", "How I love you"]
  },
  {
    question: "What does commitment feel like to you?",
    answers: ["Consistency", "Trust", "Emotional safety", "Forever choice"]
  },
  {
    question: "Which memory shows our strongest bond?",
    answers: ["When we laughed hard", "When we solved a problem", "When we stayed patient", "When we chose each other"]
  },
  {
    question: "Which of my messages makes you smile fastest?",
    answers: ["Good morning text", "Random appreciation", "Late-night paragraph", "Simple \"I miss you\""]
  },
  {
    question: "What color feels most like our love?",
    answers: ["Soft pink", "Passionate red", "Dreamy purple", "Golden sunset"]
  },
  {
    question: "What should we learn together this year?",
    answers: ["A dance", "A recipe", "A language", "Anything as a team"]
  },
  {
    question: "Coffee date or dinner date?",
    answers: ["Coffee", "Dinner", "Both", "Whichever gives more time together"]
  },
  {
    question: "Dream proposal vibe?",
    answers: ["Private and simple", "Family celebration", "Travel surprise", "Heartfelt and personal"]
  },
  {
    question: "Beach trip or mountain trip?",
    answers: ["Beach", "Mountain", "Both", "Wherever your hand is in mine"]
  },
  {
    question: "Which tiny moment makes you happiest?",
    answers: ["Eye contact", "Hand holding", "Random laugh", "Warm silence together"]
  },
  {
    question: "What fear should we heal together?",
    answers: ["Misunderstandings", "Distance", "Overthinking", "Anything by communicating"]
  },
  {
    question: "What promise matters most to us?",
    answers: ["Honesty", "Loyalty", "Patience", "Never stop choosing each other"]
  },
  {
    question: "Your favorite thing about my voice?",
    answers: ["Calm tone", "Excited tone", "How I say your name", "How it feels like home"]
  },
  {
    question: "Best rainy-day plan with me?",
    answers: ["Movie + snacks", "Long talk", "Music + dance", "All cozy moments"]
  },
  {
    question: "What should never change about us?",
    answers: ["Our honesty", "Our friendship", "Our teamwork", "Our deep love"]
  },
  {
    question: "How should we handle conflict?",
    answers: ["Take a pause", "Talk gently", "Listen deeply", "Protect love over ego"]
  },
  {
    question: "What do you miss first when we are apart?",
    answers: ["My texts", "My voice", "My touch", "My whole presence"]
  },
  {
    question: "What feeling should our future home have?",
    answers: ["Peaceful", "Playful", "Creative", "Safe + full of love"]
  },
  {
    question: "If we make a scrapbook, first page title?",
    answers: ["How It Began", "Our Favorite Days", "Two Hearts One Story", "Forever Starts Here"]
  },
  {
    question: "What tradition should we start together?",
    answers: ["Monthly date night", "Yearly trip", "Love letters", "All of these"]
  },
  {
    question: "Most romantic compliment I gave you?",
    answers: ["About your smile", "About your heart", "About your strength", "About forever with you"]
  },
  {
    question: "What do you want us to celebrate more often?",
    answers: ["Small wins", "Special dates", "Growth moments", "Every day together"]
  },
  {
    question: "What does forever with me mean to you?",
    answers: ["Long commitment", "Shared purpose", "Unbreakable bond", "Love that keeps growing"]
  },
  {
    question: "If we relive one day, which one?",
    answers: ["First meet", "First date", "A perfect memory", "A day full of pure love"]
  },
  {
    question: "Where should we watch our next sunset?",
    answers: ["Rooftop", "Hilltop", "Beach", "Anywhere together"]
  },
  {
    question: "What makes you feel safest with me?",
    answers: ["My words", "My actions", "My consistency", "The way I love you"]
  },
  {
    question: "What dream should we chase this year?",
    answers: ["Travel dream", "Career dream", "Health and peace", "Our shared love dream"]
  },
  {
    question: "What shows love most to you?",
    answers: ["Words", "Actions", "Time", "All when sincere"]
  },
  {
    question: "What should I always remember about you?",
    answers: ["Your softness", "Your fire", "Your depth", "Your beautiful heart"]
  },
  {
    question: "What do you want to build with me forever?",
    answers: ["A joyful life", "A peaceful home", "A deep partnership", "An infinite love story"]
  },
  {
    question: "Final question: Ready to keep writing our love story forever?",
    answers: ["Yes, one chapter at a time", "Yes, with patience and love", "Yes, with all my heart", "Forever yes"]
  }
];

const quizProgress = $("#quizProgress");
const quizQuestion = $("#quizQuestion");
const quizOptions = $("#quizOptions");
const nextQuestionBtn = $("#nextQuestionBtn");
const quizResult = $("#quizResult");

let quizIndex = 0;
let quizScore = 0;
let selectedScore = null;
let quizFinished = false;

function renderQuizQuestion() {
  const current = romanticQuestions[quizIndex];
  quizProgress.textContent = `Question ${quizIndex + 1} / ${romanticQuestions.length}`;
  quizQuestion.textContent = current.question;
  quizOptions.innerHTML = "";
  nextQuestionBtn.disabled = true;

  current.answers.forEach((answer, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = answer;
    btn.type = "button";
    btn.dataset.value = idx + 1;

    btn.addEventListener("click", () => {
      $$('.option-btn').forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedScore = Number(btn.dataset.value);
      nextQuestionBtn.disabled = false;
    });

    quizOptions.appendChild(btn);
  });
}

function showQuizResult() {
  const maxScore = romanticQuestions.length * 4;
  const percentage = Math.round((quizScore / maxScore) * 100);

  let message = "";
  if (percentage >= 95) {
    message = `Compatibility: ∞% 💞 You two are cosmic soulmates.`;
  } else if (percentage >= 85) {
    message = `Compatibility: ${percentage}% ❤️ Deep emotional connection and amazing chemistry.`;
  } else if (percentage >= 70) {
    message = `Compatibility: ${percentage}% 💖 A strong, caring bond that keeps getting better.`;
  } else {
    message = `Compatibility: ${percentage}% 🌸 Beautiful potential with lots of room to grow together.`;
  }

  quizResult.textContent = message;
  quizQuestion.textContent = "You completed all 50 romantic questions.";
  quizOptions.innerHTML = "";
  quizProgress.textContent = "Quiz complete";
  nextQuestionBtn.textContent = "Restart Quiz";
  nextQuestionBtn.disabled = false;
  quizFinished = true;
}

function resetQuiz() {
  quizIndex = 0;
  quizScore = 0;
  selectedScore = null;
  quizFinished = false;
  quizResult.textContent = "";
  nextQuestionBtn.textContent = "Next Question";
  renderQuizQuestion();
}

function handleNextQuestion() {
  if (quizFinished) {
    resetQuiz();
    return;
  }

  if (selectedScore === null) return;
  quizScore += selectedScore;
  selectedScore = null;
  quizIndex += 1;

  if (quizIndex < romanticQuestions.length) {
    renderQuizQuestion();
  } else {
    showQuizResult();
  }
}

nextQuestionBtn.addEventListener("click", handleNextQuestion);
renderQuizQuestion();

// ---------- Game 1: Mini love quiz ----------
const miniQuizData = [
  {
    q: "Pick your perfect date with me:",
    options: ["Street food date", "Long walk with deep talk", "Sunset + music", "Anything with you"],
  },
  {
    q: "When I miss you, I should:",
    options: ["Send one text", "Call you", "Plan a surprise", "All of the above"],
  },
  {
    q: "Best relationship strength:",
    options: ["Trust", "Laughter", "Communication", "All together"],
  },
  {
    q: "Pick a forever vibe:",
    options: ["Peaceful home", "Adventure life", "Creative partnership", "Every dream together"],
  },
  {
    q: "How do we win love every day?",
    options: ["Kindness", "Consistency", "Patience", "Choosing each other"],
  },
];

const miniQuizPrompt = $("#miniQuizPrompt");
const miniQuizOptions = $("#miniQuizOptions");
const miniQuizStart = $("#miniQuizStart");
const miniQuizFeedback = $("#miniQuizFeedback");

let miniIndex = 0;
let miniScore = 0;

function renderMiniQuiz() {
  const current = miniQuizData[miniIndex];
  miniQuizPrompt.textContent = current.q;
  miniQuizOptions.innerHTML = "";

  current.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "mini-option";
    btn.type = "button";
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      miniScore += idx + 1;
      miniIndex += 1;

      if (miniIndex < miniQuizData.length) {
        renderMiniQuiz();
      } else {
        const max = miniQuizData.length * 4;
        const percent = Math.round((miniScore / max) * 100);
        let text = "";

        if (percent >= 90) {
          text = `Romantic Sync: ${percent}% 💋 You are perfectly in tune.`;
        } else if (percent >= 70) {
          text = `Romantic Sync: ${percent}% 💖 Great chemistry and beautiful energy.`;
        } else {
          text = `Romantic Sync: ${percent}% 🌷 Cute bond with room for playful growth.`;
        }

        miniQuizPrompt.textContent = "Love Quiz Complete.";
        miniQuizOptions.innerHTML = "";
        miniQuizFeedback.textContent = text;
        miniQuizStart.textContent = "Play Again";
      }
    });

    miniQuizOptions.appendChild(btn);
  });
}

miniQuizStart.addEventListener("click", () => {
  miniIndex = 0;
  miniScore = 0;
  miniQuizFeedback.textContent = "";
  miniQuizStart.textContent = "Restart Love Quiz";
  renderMiniQuiz();
});

// ---------- Game 2: Love calculator ----------
function lovePercentage(nameA, nameB) {
  const cleanA = nameA.toLowerCase().replace(/\s+/g, "").trim();
  const cleanB = nameB.toLowerCase().replace(/\s+/g, "").trim();
  const merged = `${cleanA}${cleanB}`;
  let hash = 0;

  for (let i = 0; i < merged.length; i += 1) {
    hash = (hash * 31 + merged.charCodeAt(i)) % 9973;
  }

  let percentage = 65 + (hash % 36);
  if (merged.includes("salina")) percentage = Math.max(percentage, 92);
  return Math.min(100, percentage);
}

const nameOneInput = $("#nameOne");
const nameTwoInput = $("#nameTwo");
const calcLoveBtn = $("#calcLoveBtn");
const calcResult = $("#calcResult");

function runLoveCalculator() {
  const n1 = nameOneInput.value.trim();
  const n2 = nameTwoInput.value.trim();

  if (!n1 || !n2) {
    calcResult.textContent = "Please enter both names for the magic.";
    return;
  }

  const score = lovePercentage(n1, n2);
  let verdict = "";

  if (score >= 95) verdict = "Twin flames level unlocked.";
  else if (score >= 85) verdict = "A beautiful forever connection.";
  else if (score >= 75) verdict = "Sweet and strong romantic energy.";
  else verdict = "Love grows strongest when hearts choose each other daily.";

  calcResult.textContent = `${n1} + ${n2} = ${score}% ❤️ ${verdict}`;
}

calcLoveBtn.addEventListener("click", runLoveCalculator);

[nameOneInput, nameTwoInput].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runLoveCalculator();
    }
  });
});

// ---------- Game 3: Catch the heart ----------
const catchArea = $("#catchArea");
const catchHeart = $("#catchHeart");
const catchScoreEl = $("#catchScore");
const catchTimeEl = $("#catchTime");
const catchFeedback = $("#catchFeedback");
const catchStart = $("#catchStart");

let catchScore = 0;
let catchTime = 20;
let catchTimer = null;
let moveTimer = null;

function moveCatchHeart() {
  const areaRect = catchArea.getBoundingClientRect();
  const heartSize = catchHeart.offsetWidth || 52;
  const x = Math.random() * (areaRect.width - heartSize);
  const y = Math.random() * (areaRect.height - heartSize);

  catchHeart.style.left = `${x}px`;
  catchHeart.style.top = `${y}px`;
}

function stopCatchGame() {
  clearInterval(catchTimer);
  clearInterval(moveTimer);
  catchHeart.style.display = "none";

  if (catchScore >= 18) {
    catchFeedback.textContent = `Amazing! You caught ${catchScore} hearts. Pure romantic champion!`;
  } else if (catchScore >= 10) {
    catchFeedback.textContent = `Great! You caught ${catchScore} hearts. Love is in the air!`;
  } else {
    catchFeedback.textContent = `You caught ${catchScore} hearts. Round two for extra romance?`;
  }

  catchStart.disabled = false;
}

catchHeart.addEventListener("click", () => {
  catchScore += 1;
  catchScoreEl.textContent = String(catchScore);
  moveCatchHeart();
});

catchStart.addEventListener("click", () => {
  catchScore = 0;
  catchTime = 20;
  catchScoreEl.textContent = "0";
  catchTimeEl.textContent = "20";
  catchFeedback.textContent = "";
  catchStart.disabled = true;

  catchHeart.style.display = "grid";
  catchHeart.style.placeItems = "center";
  moveCatchHeart();

  moveTimer = setInterval(moveCatchHeart, 650);

  catchTimer = setInterval(() => {
    catchTime -= 1;
    catchTimeEl.textContent = String(catchTime);

    if (catchTime <= 0) {
      stopCatchGame();
    }
  }, 1000);
});

// ---------- Click heart explosion effect ----------
function createHeartBurst(x, y, count = 10) {
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = i % 3 === 0 ? "✨" : "❤";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty("--x", `${(Math.random() - 0.5) * 120}px`);
    heart.style.setProperty("--y", `${(Math.random() - 0.5) * 120}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 700);
  }
}

document.addEventListener("click", (event) => {
  if (event.target.closest("input")) return;
  createHeartBurst(event.clientX, event.clientY, 8);
});

// ---------- Particle/stars background ----------
const canvas = $("#particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.2 + 0.6,
    speed: Math.random() * 0.4 + 0.1,
    alpha: Math.random() * 0.8 + 0.2,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.y += p.speed;
    if (p.y > canvas.height + 5) {
      p.y = -5;
      p.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 214, 235, ${p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
initParticles();
drawParticles();
window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

// ---------- Background romantic music toggle (generated audio) ----------
const musicToggle = $("#musicToggle");
let audioCtx;
let musicInterval;
let musicPlaying = false;
let noteIndex = 0;

const romanticNotes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63];

function playSoftNote(freq) {
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 0.48);
}

function startMusic() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  audioCtx.resume();

  musicInterval = setInterval(() => {
    playSoftNote(romanticNotes[noteIndex]);
    noteIndex = (noteIndex + 1) % romanticNotes.length;
  }, 500);

  musicPlaying = true;
  musicToggle.textContent = "🎵 Music On";
}

function stopMusic() {
  clearInterval(musicInterval);
  musicPlaying = false;
  musicToggle.textContent = "🎵 Music Off";
}

musicToggle.addEventListener("click", () => {
  if (musicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});
