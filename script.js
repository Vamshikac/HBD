// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const show = (el) => el.classList.remove('hidden');

// types text into an element one letter at a time
function typeText(el, text, speed = 40) {
  return new Promise((resolve) => {
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) { clearInterval(timer); resolve(); }
    }, speed);
  });
}

// ---------- animated background (grid + floating dots) ----------
const cv = $('#bg');
const ctx = cv.getContext('2d');
let dots = [];

function resize() {
  cv.width = innerWidth;
  cv.height = innerHeight;
  dots = Array.from({ length: Math.min(70, Math.floor(innerWidth / 12)) }, () => ({
    x: Math.random() * cv.width,
    y: Math.random() * cv.height,
    v: 0.2 + Math.random() * 0.6,
    r: Math.random() * 1.6 + 0.4,
  }));
}

function draw() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.strokeStyle = 'rgba(230,36,41,0.07)';
  for (let x = 0; x < cv.width; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cv.height); ctx.stroke(); }
  for (let y = 0; y < cv.height; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cv.width, y); ctx.stroke(); }
  dots.forEach((d) => {
    d.y -= d.v;
    if (d.y < 0) { d.y = cv.height; d.x = Math.random() * cv.width; }
    ctx.fillStyle = 'rgba(245,179,1,0.6)';
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 7); ctx.fill();
  });
  requestAnimationFrame(draw);
}
window.addEventListener('resize', resize);
resize();
draw();

// ---------- SECTION 1: boot + cake ----------
const bootLines = [
  '> BOOTING STARK OS v24.0...',
  '> LOADING SARCASM MODULE... OK',
  '> TARGET LOCATED: AKASH',
  '> BIRTHDAY PROTOCOL READY',
];

async function boot() {
  for (const line of bootLines) {
    await typeText($('#boot'), line, 35);
    await wait(500);
  }
  show($('#cakeArea'));
}
boot();

// make 24 candles
for (let i = 0; i < 24; i++) {
  const c = document.createElement('div');
  c.className = 'candle';
  c.innerHTML = '<div class="flame"></div>';
  $('#candles').appendChild(c);
}

$('#blowBtn').addEventListener('click', async () => {
  const btn = $('#blowBtn');
  btn.disabled = true;
  btn.textContent = 'SCANNING LUNG CAPACITY...';

  document.querySelectorAll('.candle').forEach((c, i) => {
    setTimeout(() => c.classList.add('out'), i * 70);
  });

  await wait(24 * 70 + 900);
  btn.classList.add('hidden');
  show($('#birthdayMsg'));
  $('#birthdayMsg').scrollIntoView({ behavior: 'smooth' });

  await wait(600);
  await typeText($('#ageLine'), 'Age: 24', 60);
  await wait(300);
  await typeText($('#proxLine'), 'Proximity to 30: CONCERNING', 50);
  await wait(400);
  show($('#toWishBtn'));
});

$('#toWishBtn').addEventListener('click', () => {
  show($('#wish'));
  $('#wish').scrollIntoView({ behavior: 'smooth' });
});

// ---------- SECTION 2: wish ----------
$('#wishBtn').addEventListener('click', async () => {
  $('#reactor').classList.add('active');
  const btn = $('#wishBtn');
  btn.disabled = true;
  btn.textContent = 'WISH RECORDED ✨';
  typeText($('#wishMsg'), 'ARC REACTOR AT 100%. WISH SUBMITTED. PROBABILITY OF IT COMING TRUE: LOW. UNLOCKING DATABASE...', 25);
  await wait(3800);
  show($('#main'));
  $('#career').scrollIntoView({ behavior: 'smooth' });
});

// ---------- SECTION 4: offers ----------
const offers = [
  {
    name: 'Goldman Sachs', logo: 'GS',
    body: `<p>Dear Akash,</p>
      <p>We have reviewed your MBA, CFA Level I and unnecessarily high confidence levels.</p>
      <p>We would like to formally request that you stop applying elsewhere and come work for us.</p>
      <p>Your compensation package includes:</p>
      <p>💰 Money<br>📈 More money<br>☕ Excessive coffee<br>🧑‍💻 Questionable work-life balance</p>
      <p>Please accept before we reconsider.</p>
      <p>— Goldman Sachs HR</p>`,
  },
  {
    name: 'JPMorgan Chase', logo: 'JPM',
    body: `<p>We heard you already have a TCS offer.</p>
      <p>Respectfully:</p>
      <p><b class="gold">Aim higher.</b></p>
      <p>So we're offering you a job too.</p>
      <p>Because apparently one offer isn't enough for Mr. MBA Finance himself.</p>
      <p>— JPMorgan Chase Recruitment</p>`,
  },
  {
    name: 'Morgan Stanley', logo: 'MS',
    body: `<p>After reviewing your profile, we noticed an unusual level of confidence.</p>
      <p>At first we thought it was a bug.</p>
      <p>Then we realized:</p>
      <p><b class="gold">That's just Akash.</b></p>
      <p>We're interested.</p>
      <p>— Morgan Stanley HR</p>`,
  },
  {
    name: 'BlackRock', logo: 'BR',
    body: `<p>We manage trillions of dollars.</p>
      <p>And yet somehow our biggest problem today is finding Akash.</p>
      <p>Our algorithms can predict markets, but not why you still haven't replied.</p>
      <p>Please join us immediately.</p>
      <p>— BlackRock Talent Team</p>`,
  },
  {
    name: 'Bank of America', logo: 'BofA',
    body: `<p>Dear Candidate Akash,</p>
      <p>Per our internal memo (Ref: #HIRE-AKASH-24), you have been identified as a "high-value asset with dangerously high self-esteem."</p>
      <p>Benefits include:</p>
      <p>🖊️ Free pens<br>📎 Unlimited sticky notes<br>📧 Meetings that could have been emails</p>
      <p>Kindly accept at your earliest convenience, or at least before you ask for a higher package.</p>
      <p>Warm regards,<br>Bank of America HR</p>`,
  },
  {
    name: 'Citigroup', logo: 'C',
    body: `<p>Our risk team has analysed your profile.</p>
      <p>📉 Humility: delisted<br>📈 Ego: all-time high<br>📊 Confidence vs. actual results: very overvalued</p>
      <p>Still, we're buying.</p>
      <p>We're offering synergy, leverage, and "exposure" (you will be exposed to a LOT of Excel).</p>
      <p>— Citi Talent Acquisition</p>`,
  },
  {
    name: 'UBS', logo: 'UBS',
    body: `<p><b class="gold">PLEASE.</b></p>
      <p>We have sent 47 emails.<br>We have called 12 times.<br>Our CEO is standing outside your house. (Not really. Probably.)</p>
      <p>Name your price.</p>
      <p>Actually don't, you'll say something insane.</p>
      <p>Actually do. Just reply.</p>
      <p>— A very desperate UBS</p>`,
  },
  {
    name: 'Barclays', logo: 'BAR',
    body: `<p>Update from the Barclays recruitment floor:</p>
      <p>👤 Recruiter 1 is waiting for your reply.<br>👤 Recruiter 2 is waiting for your reply.<br>👤 Recruiter 3 has started a candlelight vigil.<br>👤 Recruiter 4 is refreshing the inbox every 30 seconds.</p>
      <p>Please respond before they start sending carrier pigeons.</p>
      <p>— Barclays HR (and 6 anxious recruiters)</p>`,
  },
  {
    name: 'Deutsche Bank', logo: 'DB',
    body: `<p>Akash.</p>
      <p>The markets tremble. The spreadsheets weep. The world is in turmoil.</p>
      <p>And only ONE man can save us: a guy who hasn't even finished his MBA.</p>
      <p>Your destiny awaits.</p>
      <p>Also, we have a cafeteria.</p>
      <p>— Deutsche Bank, in dramatic desperation</p>`,
  },
  {
    name: 'Baker Tilly', logo: 'BT',
    body: `<p><b>Dear Akash,</b></p>
      <p>We are pleased to inform you that your recruitment process has been postponed.</p>
      <p>Again.</p>
      <p>We sincerely appreciate your continued patience while we postpone it once more.</p>
      <p>At this point, we're not entirely sure whether we're recruiting you or simply testing your character.</p>
      <p><b class="gold">Recruitment status:</b> STILL LOADING...</p>
      <p><b class="gold">Expected next update:</b> Soon™</p>
      <p><b class="gold">Expected joining date:</b> We don't want to make promises anymore.</p>
      <p>Regards,<br>Baker Tilly HR<br><i>Professional Postponers™</i></p>`,
    accept: `<b>OFFER ACCEPTED.</b><br>Baker Tilly has received your acceptance and will postpone processing it. Expected reply: Soon™.`,
  },
];

const acceptReplies = [
  `<b>OFFER ACCEPTED.</b><br>JARVIS has notified HR.<br>Unfortunately, HR has gone offline.`,
  `<b>ERROR 404</b><br>Akash's humility could not be located.`,
  `<b>OFFER ACCEPTED.</b><br>Salary: ₹∞<br>Reality check: pending.`,
  `<b>JARVIS NOTICE:</b><br>TCS has been informed. They are not worried.`,
  `<b>OFFER ACCEPTED... TO NAGPUR.</b><br>Please enjoy your relocation. 🚂`,
  `<b>SYSTEM ALERT:</b><br>Offer accepted, but your ego required an additional seat. Request denied.`,
];

// build the 10 cards
offers.forEach((offer, i) => {
  const card = document.createElement('button');
  card.className = 'card';
  card.innerHTML = `<div class="logo">${offer.logo}</div>
    <div class="name">${offer.name}</div>
    <div class="view">VIEW OFFER →</div>`;
  card.addEventListener('click', () => openOffer(i));
  $('#grid').appendChild(card);
});

// modal logic
let current = null;

function openOffer(i) {
  current = offers[i];
  $('#mTitle').textContent = current.name;
  $('#mBody').innerHTML = current.body;
  $('#mResult').className = 'result';
  $('#mResult').innerHTML = '';
  $('#overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOffer() {
  $('#overlay').classList.remove('open');
  document.body.style.overflow = '';
}

$('#acceptBtn').addEventListener('click', () => {
  const reply = current.accept || acceptReplies[Math.floor(Math.random() * acceptReplies.length)];
  const box = $('#mResult');
  box.className = 'result';
  void box.offsetWidth; // restarts the animation
  box.innerHTML = reply;
  box.classList.add('show');
});

$('#closeBtn').addEventListener('click', closeOffer);
$('#overlay').addEventListener('click', (e) => { if (e.target.id === 'overlay') closeOffer(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOffer(); });

// ---------- scroll reveal animations ----------
document.querySelectorAll('.stagger').forEach((parent) => {
  parent.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = i * 0.2 + 's';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));