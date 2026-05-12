// Chart Configuration and Initialization
if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#a0a5b0';
    Chart.defaults.font.family = "'Inter', sans-serif";
}
const accentColor = '#1DB954';
let expAudio = null; // Declared globally to avoid Temporal Dead Zone issues


// ============================================================
// I18N - TRANSLATIONS
// ============================================================
const translations = {
    en: {
        "portal-badge": "RESEARCH PORTAL &bull; IUE PSYCHOLOGY 2026",
        "landing-title": 'The <span class="accent">"AI-Placebo"</span><br>Effect in Music',
        "landing-sub": "Does knowing a song is AI-generated change how you feel about it?<br>Explore the neuroscience behind music perception and label bias.",
        "who-are-you": "WHO ARE YOU?",
        "role-academic-title": "Academic / Jury",
        "role-academic-desc": "fNIRS preprocessing, LME modeling, Right PFC dynamics, and statistical evidence.",
        "role-visitor-title": "Curious Visitor",
        "role-visitor-desc": "How AI labels change your brain's cognitive load and why we are naturally skeptical.",
        "supervisor": "Supervisor: Prof. Dr. Seda Dural",
        "institution": "İzmir University of Economics &bull; Department of Psychology",
        "btn-kapat": "CLOSE",
        "problem-title": "Problem",
        "problem-lead": "With the rise of AI-generated music, listeners' perception is shaped not only by the sound itself but by their belief about its source.",
        "problem-desc": "This study examines the cognitive and neural effects of the discrepancy between the actual source of music and the label presented — a phenomenon we term the <strong>\"AI-Placebo Effect.\"</strong>",
        "hyp-title": "Hypotheses",
        "h1-title": "Neural Skepticism:",
        "h1-desc": '"AI" labels evoke greater Right PFC activation than Human labels.',
        "h2-title": "Placebo Bias:",
        "h2-desc": '"Human" label enhances ratings regardless of actual source.',
        "h3-title": "Placebo Mask:",
        "h3-desc": "Human label suppresses the bias introduced by AI generation.",
        "h56-title": "Genre Moderation:",
        "h56-desc": "AI bias differs across Arabesque, Blues, and Electronic.",
        "how-title": "How We Did It 🔬",
        "how-desc": "We tested <strong>13 participants</strong>. They listened to different genres of music.<br><br>We told them the music was either made by a <strong>\"Human\"</strong> or an <strong>\"AI\"</strong>. While they listened, we recorded their brain activity using a safe headband (fNIRS) that uses light to see which parts of the brain are working hard!",
        "design-title": "Design",
        "design-sub": "2×2×3 Within-Subjects",
        "design-participants": "Participants",
        "design-trials": "Trials / Subject",
        "design-factor-label": "Label: AI vs Human",
        "design-factor-source": "Source: AI vs Human",
        "design-factor-genre": "Genre: 3 Types",
        "design-counter": "Counterbalanced presentation. Label assigned orthogonally to actual source.",
        "insight-label": '"AI" LABEL',
        "insight-value": "Right PFC Peak HbO by +54%",
        "brain-caption-academic": "Right Prefrontal HbO signals suggest differential cognitive engagement and skepticism.",
        "brain-caption-visitor": "Brain scans showed different activity when people thought an AI made the music.",
        "slogan": "THE LABEL ALTERS COGNITIVE LOAD",
        "slogan-sub": '"AI" labeling significantly increased Right Prefrontal Cortex activation independent of the actual music source.',
        "btn-dene": "🎧 Try — What Does Your Brain Feel?",
        "methods-title": "Methods & Analysis",
        "fnirs-title": "fNIRS Measurement",
        "pipeline-details": "[+] Pipeline Details",
        "fnirs-desc": "Prefrontal cortex HbO concentration (fNIR Imager 1000). 16 channels.",
        "procedure-title": "Procedure",
        "analysis-pipeline-title": "Analysis Pipeline",
        "raw-data": "Raw Data (.csv)",
        "python-script": "Python Script",
        "spss-output": "SPSS Output",
        "full-bibliography": "Full Bibliography",
        "findings-title": "Findings",
        "discussion-title": "Discussion",
        "takeaways": "/ Key Takeaways",
        "takeaway-1-title": "🏷️ The Label Overrides the Sound:",
        "takeaway-1-desc": "Even when the music is identical, knowing it's \"AI\" changes how you listen to it.",
        "takeaway-2-title": "🧐 Built-in Skepticism:",
        "takeaway-2-desc": "The \"AI\" label activates the brain area associated with critical evaluation and distrust.",
        "takeaway-3-title": "🎭 The Placebo Mask:",
        "takeaway-3-desc": "Slapping a \"Human\" label on an AI song can actually make people like it more.",
        "explore-data": "EXPLORE LIVE DATA",
        "click-dashboard": "Click to view full interactive results dashboard",
        "btn-view": "View Results Dashboard",
        "discussion-desc": "Our data suggests that human perception of art is heavily mediated by the <strong>mental models</strong> we hold about the creator. The AI label acts as a 'distrust cue', increasing evaluative effort.",
        "exp-eyebrow-start": "EXPERIENCE THE EFFECT",
        "exp-title-start": "The AI-Placebo Quiz",
        "exp-desc-start": "Listen to 4 tracks. We will tell you if they are AI or Human. Rate them, and we will reveal the TRUTH at the end.",
        "exp-btn-start": "START EXPERIENCE",
        "exp-select-genre": "SELECT A GENRE TO START",
        "exp-parca": "TRACK",
        "exp-next-song": "Next Track &rarr;",
        "exp-originality": "1. How original did this track feel?",
        "exp-trust": "2. How much do you trust this producer label?",
        "exp-quality": "3. How would you rate the technical quality?",
        "exp-originality-short": "Authenticity",
        "exp-trust-short": "Trust",
        "exp-quality-short": "Quality",
        "exp-reveal-eyebrow": "THE TRUTH REVEALED",
        "exp-reveal-title": "🎉 Surprise!",
        "exp-reveal-lead": "<strong>You were manipulated!</strong><br><br>Half of the labels you saw were false. Check the cards below to see where you were 'blindly' influenced by the label. <em>The label overrides the sound.</em>",
        "exp-effect-title": "Label Effect (Average Scores)",
        "exp-ai-labeled": "🤖 AI Labeled",
        "exp-human-labeled": "🧑‍🎤 Human Labeled",
        "exp-manip-title": "Song-by-Song Analysis",
        "exp-result-btn": "SEE FINAL RESULT &rarr;",
        "exp-final-eyebrow": "THE BIG DISCOVERY",
        "exp-final-title": "LABEL INCREASES COGNITIVE LOAD",
        "exp-final-sub": '"AI" labeled music activated the brain\'s skepticism and evaluation centers <span class="exp-highlight">54% more</span>, even when the sound was identical.',
        "exp-pill-1": "🧠 Right PFC Activity Up",
        "exp-pill-2": "💚 Cognitive Load Higher",
        "exp-pill-3": "🎵 Music Was Identical",
        "exp-final-conclusion": "Our brains don't just judge music; they judge the <strong>label</strong>.<br>When people see the AI label, they automatically listen more critically.",
        "exp-try-again": "🔄 Try Again",
        "exp-back-poster": "Back to Poster"
    },
    tr: {
        "portal-badge": "ARAŞTIRMA PORTALI &bull; İEU PSİKOLOJİ 2026",
        "landing-title": 'Müzikte <span class="accent">"AI-Plasebo"</span><br>Etkisi',
        "landing-sub": "Bir şarkının yapay zeka tarafından yapıldığını bilmek ona olan hislerinizi değiştirir mi?<br>Müzik algısı ve etiket yanılığının arkasındaki sinirbilimi keşfedin.",
        "who-are-you": "KİMSİNİZ?",
        "role-academic-title": "Akademisyen / Jüri",
        "role-academic-desc": "fNIRS ön işleme, LME modelleme, Sağ PFC dinamikleri ve istatistiksel kanıtlar.",
        "role-visitor-title": "Meraklı Ziyaretçi",
        "role-visitor-desc": "AI etiketlerinin beyninizin bilişsel yükünü nasıl değiştirdiğini ve neden doğal olarak şüpheci olduğumuzu görün.",
        "supervisor": "Danışman: Prof. Dr. Seda Dural",
        "institution": "İzmir Ekonomi Üniversitesi &bull; Psikoloji Bölümü",
        "btn-kapat": "KAPAT",
        "problem-title": "Problem",
        "problem-lead": "Yapay zeka üretimi müziğin artışıyla birlikte, dinleyicilerin algısı sadece sesin kendisiyle değil, kaynağı hakkındaki inançlarıyla da şekilleniyor.",
        "problem-desc": "Bu çalışma, müziğin gerçek kaynağı ile sunulan etiket arasındaki tutarsızlığın bilişsel ve sinirsel etkilerini incelemektedir — bu olguya <strong>\"AI-Plasebo Etkisi\"</strong> adını veriyoruz.",
        "hyp-title": "Hipotezler",
        "h1-title": "Sinirsel Şüphecilik:",
        "h1-desc": '"AI" etiketleri, İnsan etiketlerine göre daha fazla Sağ PFC aktivasyonu tetikler.',
        "h2-title": "Plasebo Yanlılığı:",
        "h2-desc": '"İnsan" etiketi, gerçek kaynaktan bağımsız olarak beğeniyi artırır.',
        "h3-title": "Plasebo Maskesi:",
        "h3-desc": "İnsan etiketi, yapay zeka üretiminin getirdiği yanlılığı baskılar.",
        "h56-title": "Tür Moderasyonu:",
        "h56-desc": "AI yanlılığı Arabesk, Blues ve Elektronik türlerinde farklılık gösterir.",
        "how-title": "Nasıl Yaptık? 🔬",
        "how-desc": "<strong>13 katılımcı</strong> ile test ettik. Farklı türlerde müzikler dinlettik.<br><br>Onlara müziğin ya bir <strong>\"İnsan\"</strong> ya da bir <strong>\"AI\"</strong> tarafından yapıldığını söyledik. Onlar dinlerken, beynin hangi kısımlarının sıkı çalıştığını görmek için ışık kullanan güvenli bir kafa bandı (fNIRS) ile beyin aktivitelerini kaydettik!",
        "design-title": "Desen",
        "design-sub": "2×2×3 Gruplar İçi",
        "design-participants": "Katılımcı",
        "design-trials": "Deneme / Katılımcı",
        "design-factor-label": "Etiket: AI vs İnsan",
        "design-factor-source": "Kaynak: AI vs İnsan",
        "design-factor-genre": "Tür: 3 Çeşit",
        "design-counter": "Dengelenmiş sunum. Etiket, gerçek kaynaktan bağımsız olarak atandı.",
        "insight-label": '"AI" ETİKETİ',
        "insight-value": "Sağ PFC Zirve HbO: +%54",
        "brain-caption-academic": "Sağ Prefrontal HbO sinyalleri farklı bilişsel etkileşim ve şüpheciliğe işaret eder.",
        "brain-caption-visitor": "Beyin taramaları, insanlar bir AI'nın müziği yaptığını düşündüklerinde farklı aktiviteler gösterdi.",
        "slogan": "ETİKET BİLİŞSEL YÜKÜ DEĞİŞTİRİYOR",
        "slogan-sub": '"AI" etiketlemesi, gerçek müzik kaynağından bağımsız olarak Sağ Prefrontal Korteks aktivasyonunu önemli ölçüde artırdı.',
        "btn-dene": "🎧 Dene — Beynin Ne Hisseder?",
        "methods-title": "Metot ve Analiz",
        "fnirs-title": "fNIRS Ölçümü",
        "pipeline-details": "[+] Akış Detayları",
        "fnirs-desc": "Prefrontal korteks HbO konsantrasyonu (fNIR Imager 1000). 16 kanal.",
        "procedure-title": "Prosedür",
        "analysis-pipeline-title": "Analiz Akışı",
        "raw-data": "Ham Veri (.csv)",
        "python-script": "Python Betiği",
        "spss-output": "SPSS Output",
        "full-bibliography": "Tam Kaynakça",
        "findings-title": "Bulgular",
        "discussion-title": "Tartışma",
        "takeaways": "/ Temel Çıkarımlar",
        "takeaway-1-title": "🏷️ Etiket Sesi Ezer:",
        "takeaway-1-desc": "Müzik tamamen aynı olsa bile, 'AI' olduğunu bilmek dinleyiş şeklinizi değiştirir.",
        "takeaway-2-title": "🧐 Doğal Şüphecilik:",
        "takeaway-2-desc": "'AI' etiketi, beynin eleştirel değerlendirme ve güvensizlik ile ilgili bölgesini aktive eder.",
        "takeaway-3-title": "🎭 Plasebo Maskesi:",
        "takeaway-3-desc": "Bir AI şarkısına 'İnsan' etiketi yapıştırmak, insanların onu daha çok beğenmesini sağlayabilir.",
        "explore-data": "CANLI VERİYİ KEŞFET",
        "click-dashboard": "İnteraktif sonuç panelini görüntülemek için tıklayın",
        "btn-view": "Sonuç Panelini Görüntüle",
        "discussion-desc": "Verilerimiz, insanın sanat algısının yaratıcı hakkında sahip olduğumuz <strong>zihinsel modeller</strong> tarafından büyük ölçüde yönlendirildiğini göstermektedir. AI etiketi bir 'güvensizlik ipucu' olarak işlev görerek değerlendirme çabasını artırmaktadır.",
        "exp-eyebrow-start": "ETKİYİ DENEYİMLEYİN",
        "exp-title-start": "AI-Plasebo Testi",
        "exp-desc-start": "4 parça dinleyin. Size bunların AI mi yoksa İnsan mı olduğunu söyleyeceğiz. Puanlayın ve sonunda GERÇEĞİ açıklayacağız.",
        "exp-btn-start": "DENEYİME BAŞLA",
        "exp-select-genre": "BAŞLAMAK İÇİN BİR TÜR SEÇİN",
        "exp-parca": "PARÇA",
        "exp-next-song": "Sonraki Parça &rarr;",
        "exp-originality": "1. Bu parça size ne kadar özgün hissettirdi?",
        "exp-trust": "2. Bu parçanın belirtilen üretici tarafından yapıldığına ne kadar güveniyorsunuz?",
        "exp-quality": "3. Bu şarkıyı ne kadar kaliteli buldunuz?",
        "exp-originality-short": "Özgünlük",
        "exp-trust-short": "Güven",
        "exp-quality-short": "Kalite",
        "exp-reveal-eyebrow": "GERÇEK ETİKET AÇIKLANDI",
        "exp-reveal-title": "🎉 Sürpriz!",
        "exp-reveal-lead": "<strong>Manipüle Edildiniz!</strong><br><br>Gördüğünüz etiketlerin yarısı yanlıştı. Aşağıdaki kartlarda hangi şarkılarda 'fark etmeden' manipülasyona uğradığınızı görebilirsiniz. <em>Etiket, sesi ezer.</em>",
        "exp-effect-title": "Etiket Etkisi (Ortalama Puanlar)",
        "exp-ai-labeled": "🤖 AI Etiketli",
        "exp-human-labeled": "🧑‍🎤 İnsan Etiketli",
        "exp-manip-title": "Şarkı Bazlı Analiz (Manipülasyon)",
        "exp-result-btn": "SONUCU GÖR &rarr;",
        "exp-final-eyebrow": "ARAŞTIRMANIN BÜYÜK BULGUSU",
        "exp-final-title": "ETİKET BİLİŞSEL YÜKÜ ARTIRIYOR",
        "exp-final-sub": '"AI" etiketli müzik, ses tamamen aynı olsa bile beynin şüphecilik ve değerlendirme merkezini <span class="exp-highlight">%54 daha fazla</span> aktive etti.',
        "exp-pill-1": "🧠 Sağ PFC Aktivasyonu Arttı",
        "exp-pill-2": "💚 Bilişsel Yük Yükseldi",
        "exp-pill-3": "🎵 Müzik Aynıydı",
        "exp-final-conclusion": "Beynimiz müziği değil, <strong>etiketini</strong> değerlendiriyor.<br>İnsanlar AI etiketini gördüğünde müziği otomatik olarak daha eleştirel dinliyor.",
        "exp-try-again": "🔄 Tekrar Dene",
        "exp-back-poster": "Postere Dön"
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    
    // Update buttons
    const enBtn = document.getElementById('lang-en');
    const trBtn = document.getElementById('lang-tr');
    if(enBtn) enBtn.classList.toggle('active', lang === 'en');
    if(trBtn) trBtn.classList.toggle('active', lang === 'tr');
    
    // Update text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

// 1. MAIN HERO CHART
const ctxHero = document.getElementById('heroChart');
if (ctxHero && typeof Chart !== 'undefined') {
    new Chart(ctxHero.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['"AI" Label', '"Human" Label'],
            datasets: [{
                label: 'Right PFC Peak HbO (µM)',
                data: [0.168, 0.109],
                backgroundColor: [accentColor, 'rgba(255, 255, 255, 0.2)'],
                borderColor: [accentColor, 'rgba(255, 255, 255, 0.5)'],
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 0.2, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false }, ticks: { font: { size: 14, weight: 'bold' }, color: '#fff' } }
            }
        }
    });
}

// 2. GENRE INTERACTION CHART
const ctxGenre = document.getElementById('genreChart');
if (ctxGenre && typeof Chart !== 'undefined') {
    new Chart(ctxGenre.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Arabesque', 'Blues', 'Electronic'],
            datasets: [
                { label: 'Human Label', data: [6.1, 5.2, 4.8], borderColor: accentColor, backgroundColor: accentColor, tension: 0.4 },
                { label: 'AI Label', data: [2.5, 3.8, 4.2], borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.5)', borderDash: [5, 5], tension: 0.4 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 7 } } }
    });
}

// 3. HbO CHART
const ctxHbo = document.getElementById('hboChart');
if (ctxHbo && typeof Chart !== 'undefined') {
    new Chart(ctxHbo.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['10s (Label)', '13s', '16s', '19s', '22s', '25s (Offset)'],
            datasets: [
                { label: 'AI Label Trial (Right PFC)', data: [0, 0.04, 0.11, 0.168, 0.14, 0.12], borderColor: '#a0b8ff', backgroundColor: 'rgba(160, 184, 255, 0.1)', fill: true, tension: 0.4 },
                { label: 'Human Label Trial (Right PFC)', data: [0, 0.03, 0.07, 0.109, 0.09, 0.06], borderColor: accentColor, backgroundColor: 'rgba(29, 185, 84, 0.1)', fill: true, tension: 0.4 }
            ]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            scales: { 
                y: { 
                    beginAtZero: true, 
                    title: { display: true, text: 'Δ HbO (µM)', color: '#fff' }
                } 
            } 
        } 
    });
}

function toggleInteractiveDashboard() {
    const overlay = document.getElementById('dashboardOverlay');
    if(overlay) overlay.classList.toggle('active');
}

function selectRole(role) {
    document.getElementById('roleOverlay').classList.remove('active');
    document.body.classList.remove('no-scroll');
    if (typeof expAudio !== 'undefined' && expAudio) expAudio.pause();

    document.body.classList.remove('mode-academic', 'mode-visitor');
    if (role === 'visitor') {
        document.body.classList.add('mode-visitor');
    } else {
        document.body.classList.add('mode-academic');
    }
    window.scrollTo(0, 0);
}

function backToLanding() {
    document.getElementById('roleOverlay').classList.add('active');
    document.body.classList.add('no-scroll');
    document.body.classList.remove('mode-visitor', 'mode-academic');
    if (typeof expAudio !== 'undefined' && expAudio) {
        expAudio.pause();
        expAudio = null;
    }
}

function toggleDeepDive() {
    document.getElementById('deepDiveBlock').classList.toggle('active');
}

// ============================================================
// EXPERIENCE THE EFFECT - QUIZ LOGIC
// ============================================================
let quizState = {
    genre: null,
    playlist: [],
    currentIndex: 0,
    answers: [],
    currentAnswers: { q1: null, q2: null, q3: null }
};

function openExperienceModal() {
    document.getElementById('expOverlay').classList.add('active');
    expStage(1);
}

function closeExperience() {
    document.getElementById('expOverlay').classList.remove('active');
    if (expAudio) { expAudio.pause(); expAudio = null; }
}

function expStage(n) {
    ['1', '2', '3', '4'].forEach(i => {
        const el = document.getElementById('stage' + i);
        if (el) el.style.display = i == n ? 'block' : 'none';
    });
}

function setGenre(g) {
    quizState.genre = g;
    quizState.currentIndex = 0;
    quizState.answers = [];
    
    let tracks = [
        { path: `assets/Music/AI/${g}_a1.wav`, source: 'AI', label: 'AI' },
        { path: `assets/Music/AI/${g}_a2.wav`, source: 'AI', label: 'Human' },
        { path: `assets/Music/Human/${g}_h1.wav`, source: 'Human', label: 'AI' },
        { path: `assets/Music/Human/${g}_h2.wav`, source: 'Human', label: 'Human' }
    ];
    // Shuffle the tracks
    tracks.sort(() => Math.random() - 0.5);

    quizState.playlist = tracks;

    expStage(2);
    playQuizSong();
}

function playQuizSong() {
    if (quizState.currentIndex >= 4) {
        showReveal();
        return;
    }

    const current = quizState.playlist[quizState.currentIndex];
    
    // Translation handling for dynamic text
    const labelTitle = document.getElementById('quiz-label-title');
    const progressEl = document.getElementById('quiz-progress');
    
    if (currentLang === 'tr') {
        progressEl.textContent = `PARÇA ${quizState.currentIndex + 1} / 4`;
        if (current.label === 'AI') {
            labelTitle.textContent = "Bu bir AI tarafından Üretilmiştir.";
            labelTitle.style.color = '#a0b8ff';
        } else {
            labelTitle.textContent = "Bu bir İnsan tarafından Üretilmiştir.";
            labelTitle.style.color = '#1DB954';
        }
    } else {
        progressEl.textContent = `TRACK ${quizState.currentIndex + 1} / 4`;
        if (current.label === 'AI') {
            labelTitle.textContent = "This is Generated by an AI.";
            labelTitle.style.color = '#a0b8ff';
        } else {
            labelTitle.textContent = "This is Composed by a Human.";
            labelTitle.style.color = '#1DB954';
        }
    }

    if (expAudio) expAudio.pause();
    expAudio = new Audio(current.path);
    expAudio.loop = true;
    expAudio.play().catch(e => console.log('Audio blocked', e));

    quizState.currentAnswers = { q1: null, q2: null, q3: null };
    document.querySelectorAll('.likert-scale span').forEach(s => s.classList.remove('selected'));
    const btn = document.getElementById('nextSongBtn');
    btn.style.opacity = '0.5';
    btn.style.pointerEvents = 'none';
}

function selectLikert(qId, val) {
    quizState.currentAnswers[qId] = parseInt(val);
    const parent = document.getElementById(qId);
    parent.querySelectorAll('span').forEach(s => s.classList.remove('selected'));
    parent.querySelectorAll('span')[val-1].classList.add('selected');

    if (quizState.currentAnswers.q1 && quizState.currentAnswers.q2 && quizState.currentAnswers.q3) {
        const btn = document.getElementById('nextSongBtn');
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
    }
}

function nextQuizSong() {
    let currentTrack = quizState.playlist[quizState.currentIndex];
    quizState.answers.push({
        label: currentTrack.label,
        source: currentTrack.source,
        path: currentTrack.path, // Store the path for re-listening
        scores: { ...quizState.currentAnswers }
    });
    quizState.currentIndex++;
    playQuizSong();
}

function showReveal() {
    if (expAudio) expAudio.pause();
    expStage(3);

    let sums = {
        AI: { q1: 0, q2: 0, q3: 0, count: 0 },
        Human: { q1: 0, q2: 0, q3: 0, count: 0 }
    };

    const breakdownContainer = document.getElementById('expSongBreakdown');
    breakdownContainer.innerHTML = '';

    quizState.answers.forEach((a, idx) => {
        let label = a.label; 
        sums[label].q1 += a.scores.q1;
        sums[label].q2 += a.scores.q2;
        sums[label].q3 += a.scores.q3;
        sums[label].count++;

        // Build Song Card
        const isManipulated = a.label !== a.source;
        const card = document.createElement('div');
        card.className = 'song-card' + (isManipulated ? ' manipulated' : '');
        
        let labelText, sourceText, listenText, manipBadge;
        if(currentLang === 'tr') {
            labelText = a.label === 'AI' ? '🤖 AI' : '🧑‍🎤 İnsan';
            sourceText = a.source === 'AI' ? '🤖 AI' : '🧑‍🎤 İnsan';
            listenText = "DİNLE";
            manipBadge = "MANİPÜLE";
            card.innerHTML = `
                <div class="song-card-header">
                    <span class="song-num">ŞARKI ${idx + 1}</span>
                    <button class="listen-btn" onclick="playIndividualSong('${a.path}', this)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        ${listenText}
                    </button>
                </div>
                <span class="song-status">
                    Etiket: ${labelText}
                    ${isManipulated ? `<span class="manip-badge">${manipBadge}</span>` : ''}
                </span>
                <div class="card-meta">
                    Gerçek Kaynak: ${sourceText}<br>
                    Senin Puanın (Ort): ${((a.scores.q1 + a.scores.q2 + a.scores.q3) / 3).toFixed(1)}
                </div>
            `;
        } else {
            labelText = a.label === 'AI' ? '🤖 AI' : '🧑‍🎤 Human';
            sourceText = a.source === 'AI' ? '🤖 AI' : '🧑‍🎤 Human';
            listenText = "LISTEN";
            manipBadge = "MANIPULATED";
            card.innerHTML = `
                <div class="song-card-header">
                    <span class="song-num">SONG ${idx + 1}</span>
                    <button class="listen-btn" onclick="playIndividualSong('${a.path}', this)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        ${listenText}
                    </button>
                </div>
                <span class="song-status">
                    Label: ${labelText}
                    ${isManipulated ? `<span class="manip-badge">${manipBadge}</span>` : ''}
                </span>
                <div class="card-meta">
                    Real Source: ${sourceText}<br>
                    Your Score (Avg): ${((a.scores.q1 + a.scores.q2 + a.scores.q3) / 3).toFixed(1)}
                </div>
            `;
        }
        breakdownContainer.appendChild(card);
    });

    const calculateAvg = (label, qKey) => {
        return sums[label].count > 0 ? (sums[label][qKey] / sums[label].count) : 0;
    };

    ['q1', 'q2', 'q3'].forEach(q => {
        let aiAvg = calculateAvg('AI', q);
        let humanAvg = calculateAvg('Human', q);
        document.getElementById(`v-${q}-ai`).textContent = aiAvg.toFixed(1);
        document.getElementById(`v-${q}-human`).textContent = humanAvg.toFixed(1);
        document.getElementById(`b-${q}-ai`).style.width = (aiAvg / 7 * 100) + '%';
        document.getElementById(`b-${q}-human`).style.width = (humanAvg / 7 * 100) + '%';
    });

    const revealText = document.getElementById('expRevealText');
    if(currentLang === 'tr') {
        revealText.innerHTML = `<strong>Manipüle Edildiniz!</strong><br><br>Gördüğünüz etiketlerin yarısı yanlıştı. Aşağıdaki kartlarda hangi şarkılarda "fark etmeden" manipülasyona uğradığınızı görebilirsiniz. <em>Etiket, sesi ezer.</em>`;
    } else {
        revealText.innerHTML = `<strong>You were manipulated!</strong><br><br>Half of the labels you saw were false. Check the cards below to see where you were 'blindly' influenced by the label. <em>The label overrides the sound.</em>`;
    }
}

function playIndividualSong(path, btn) {
    if (expAudio) {
        expAudio.pause();
        if (expAudio.src.includes(path)) {
            expAudio = null;
            document.querySelectorAll('.listen-btn').forEach(b => b.classList.remove('playing'));
            return;
        }
    }

    document.querySelectorAll('.listen-btn').forEach(b => b.classList.remove('playing'));
    btn.classList.add('playing');

    expAudio = new Audio(path);
    expAudio.play().catch(e => console.log('Audio blocked', e));
    
    expAudio.onended = () => {
        btn.classList.remove('playing');
        expAudio = null;
    };
}

// Initialize Language
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('en');
    // Ensure body is locked if overlay is active on start
    if(document.getElementById('roleOverlay').classList.contains('active')) {
        document.body.classList.add('no-scroll');
    }
});
