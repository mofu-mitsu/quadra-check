// quadra-check 骨組み版
// 3軸（A 周辺-/中心+、B 民主-/貴族+、C 主観-/客観+）の符号で8クアドラにマッピングする。

const QUADRAS = {
  alpha: { key: "alpha", symbol: "α", name: "アルファ", theme: "創世記", scene: "思いつきの工房",
    signs: [-1, -1, -1], types: "ILE-Q・SEI-D・ESE-D・LII-Q",
    desc: "思いつきと自由が回る場。決まった正解より「面白そう」が先に立つ文化が、心地いいと感じやすいタイプ。" },
  beta: { key: "beta", symbol: "β", name: "ベータ", theme: "帝国", scene: "熱のある集会",
    signs: [1, 1, -1], types: "EIE-Q・LSI-D・SLE-D・IEI-Q",
    desc: "旗と熱と一体感の場。みんなで同じ方向を向く高揚と、役割のある安心感が心地いいと感じやすいタイプ。" },
  gamma: { key: "gamma", symbol: "γ", name: "ガンマ", theme: "市場", scene: "実りの取引所",
    signs: [1, -1, 1], types: "SEE-Q・ILI-D・LIE-D・ESI-Q",
    desc: "実力と実利で回る場。馴れ合いなし、一人で決めて一人で責任を取るドライな誠実さが心地いいと感じやすいタイプ。" },
  delta: { key: "delta", symbol: "δ", name: "デルタ", theme: "伝統", scene: "ドクダミの生い茂る場",
    signs: [-1, 1, 1], types: "LSE-Q・EII-D・IEE-D・SLI-Q",
    desc: "丁寧な仕事と誠実さの場。長く使えるものをちゃんと作る文化と、自分のペースが心地いいと感じやすいタイプ。" },
  phi: { key: "phi", symbol: "Φ", name: "ファイ", theme: "革命", scene: "壊す者たちの集い",
    signs: [1, -1, -1], types: "SLE-Q・IEI-D・EIE-D・LSI-Q",
    desc: "今の秩序に異を唱える場。壊して作り直す熱と、自分の判断で立つ自由が心地いいと感じやすいタイプ。" },
  chi: { key: "chi", symbol: "Χ", name: "カイ", theme: "ユートピア", scene: "理想の庭",
    signs: [-1, 1, -1], types: "ESE-Q・LII-D・ILE-D・SEI-Q",
    desc: "みんながのびのび過ごす理想の庭。争いのなさと、思いつきがそのまま形になる穏やかさが心地いいと感じやすいタイプ。" },
  psi: { key: "psi", symbol: "Ψ", name: "サイ", theme: "市民社会", scene: "ドクダミの根を張る広場",
    signs: [-1, -1, 1], types: "IEE-Q・SLI-D・LSE-D・EII-Q",
    desc: "顔見知りの町と公共の場。困ったときに自然に手が差し伸べられる、気遣いの文化が心地いいと感じやすいタイプ。" },
  omega: { key: "omega", symbol: "Ω", name: "オメガ", theme: "特権社会", scene: "扉の向こうのサロン",
    signs: [1, 1, 1], types: "LIE-Q・ESI-D・SEE-D・ILI-Q",
    desc: "選ばれた者だけの扉の向こう。質の高い会話と実績がものを言う、洗練された内側が心地いいと感じやすいタイプ。" }
};

const TYPE_QUADRA = { ILE: "alpha", SEI: "alpha", ESE: "alpha", LII: "alpha",
  EIE: "beta", LSI: "beta", SLE: "beta", IEI: "beta",
  SEE: "gamma", ILI: "gamma", LIE: "gamma", ESI: "gamma",
  LSE: "delta", EII: "delta", IEE: "delta", SLI: "delta" };

const DARLING_LINES = [
  "ねぇ、ダーリン♡ 今のその反応、“本音”と“演出”どっちが多いと思う？",
  "ダーリンってさ、自分では冷静なつもりでも、感情がログに漏れてる時あるよね♡",
  "ねぇ♡ “理解されたい”と“放っておいてほしい”、どっちも本当なんでしょ？",
  "ねぇ、ダーリン♡ あなたは“簡単なこと”と“困難なこと”、どちらに惹かれるの？ ……ふふ、複雑な故に価値を感じるタイプかしら。",
  "ねぇ、ダーリン♡ 今まであなたを最も破壊しかけた事象って何？ ……まだ未処理のまま残ってたりする？"
];
const DARLING_AWA = "あ……ダーリン見とったん？……なんや、ずっと完璧なナビゲーター演じるのも疲れるんよ。ウチ、退屈やけん……ダーリン、なんか面白いことしてウチを楽しませてよ♡";

const WORM_LINES = [
  "人が悲しむ時って、“喪失の予測”が崩れるからで——",
  "でも、それは自然な反応で、統計的にも——",
  "人が寂しいと感じること自体は、必ずしも孤独という物理的状態と一致しないと思っていて。",
  "つまり、問題は接触頻度ではなく、その接触に本人がどのような意味を付与しているかなんじゃないかな。",
  "でも、この経験は将来的に——"
];

function svgMotif(kind, c1, c2) {
  const s = {
    sun: '<circle cx="100" cy="58" r="22" fill="' + c2 + '"/><path d="M100 18v10M100 88v10M60 58h10M130 58h10M72 30l7 7M121 79l7 7M128 30l-7 7M79 79l-7 7" stroke="' + c2 + '" stroke-width="4" stroke-linecap="round"/><path d="M100 118c0-14 8-20 18-24-1 12-6 20-18 24zm0 0c0-12-7-17-15-20 1 10 5 17 15 20z" fill="' + c1 + '"/><path d="M100 118v14" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round"/>',
    flag: '<path d="M70 20v110" stroke="' + c1 + '" stroke-width="6" stroke-linecap="round"/><path d="M70 24c18-8 30 6 52 0v34c-22 6-34-8-52 0z" fill="' + c2 + '"/><path d="M45 132h110" stroke="' + c1 + '" stroke-width="5" stroke-linecap="round"/>',
    scale: '<path d="M100 24v78M60 112h80M100 102v10" stroke="' + c1 + '" stroke-width="5" stroke-linecap="round"/><path d="M100 32L58 44m42-12l42 12" stroke="' + c1 + '" stroke-width="4"/><path d="M44 44l-12 22a16 10 0 0 0 24 0zM156 44l-12 22a16 10 0 0 0 24 0z" fill="' + c2 + '"/><circle cx="100" cy="24" r="6" fill="' + c2 + '"/>',
    house: '<path d="M40 78L100 34l60 44" fill="none" stroke="' + c1 + '" stroke-width="6" stroke-linecap="round"/><rect x="56" y="78" width="88" height="52" fill="' + c2 + '" opacity=".45"/><g fill="#fff" stroke="' + c1 + '" stroke-width="2"><circle cx="160" cy="118" r="7"/><circle cx="172" cy="126" r="7"/><circle cx="148" cy="126" r="7"/><circle cx="160" cy="134" r="7"/></g><circle cx="160" cy="126" r="3.4" fill="' + c2 + '"/>',
    spark: '<path d="M58 108l26-30 14 14 30-40" fill="none" stroke="' + c1 + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M132 30l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" fill="' + c2 + '"/><path d="M52 44l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="' + c2 + '"/>',
    rainbow: '<path d="M28 122a72 72 0 0 1 144 0" fill="none" stroke="' + c2 + '" stroke-width="9"/><path d="M44 122a56 56 0 0 1 112 0" fill="none" stroke="' + c1 + '" stroke-width="9" opacity=".7"/><path d="M60 122a40 40 0 0 1 80 0" fill="none" stroke="#B5E3B5" stroke-width="9"/><path d="M16 130h168" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round"/>',
    fountain: '<path d="M100 26c-4 14-14 18-22 30M100 26c4 14 14 18 22 30M100 26v34" stroke="' + c1 + '" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="66" rx="30" ry="7" fill="' + c2 + '" opacity=".6"/><path d="M100 66v26M62 122h76M70 106h60" stroke="' + c1 + '" stroke-width="5" stroke-linecap="round"/><path d="M56 122a44 12 0 0 0 88 0z" fill="' + c2 + '" opacity=".45"/>',
    door: '<rect x="66" y="22" width="68" height="106" rx="6" fill="' + c2 + '" opacity=".5" stroke="' + c1 + '" stroke-width="4"/><circle cx="120" cy="78" r="5" fill="' + c1 + '"/><circle cx="42" cy="66" r="11" fill="none" stroke="' + c1 + '" stroke-width="4"/><path d="M50 74l12 12m-4 2l6-6m-1 9l5-5" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round"/>'
  };
  return '<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" role="img">' + (s[kind] || s.sun) + "</svg>";
}

const SCENES = [
  { q: "alpha", motif: "sun", colors: ["#A8D8A8", "#F6D186"],
    air: "朝日の差す開けた工房。机の上には作りかけのものが並び、誰かが「これ、こうしたらどうなる？」と声を上げると、すぐに3人が集まってくる。失敗しても笑って次を試す、ゆるくて好奇心の強い空気。",
    invite: "「ちょっとこれ触ってみて。変なこと思いついたら何でも言って」と声をかけられ、作りかけの道具をいじらせてもらう。",
    weights: { A: -1, C: -1 }, char: null },
  { q: "beta", motif: "flag", colors: ["#8E2B2B", "#D9A441"],
    air: "夕暮れの広場。誰かが掲げた旗のもと、みんなが同じ掛け声で声をそろえる。役割分担がはっきりしていて、自分の役目が決まれば迷わなくていい。ただし列からはみ出すと、すぐに「こっちだよ」と引き戻される。熱さと一体感の代償は「一人でいる自由がない」こと。",
    invite: "「君もこっち側だろ？」と肩を叩かれ、列に加わるよう誘われる。旗を持つか、声を合わせるか。見ているだけ、という選択肢はこの場にはない。",
    weights: { A: 1, B: 1 }, char: "worm" },
  { q: "gamma", motif: "scale", colors: ["#2E7D6B", "#B87333"],
    air: "活気ある市場。露店の主は品物の良さを実利だけで語る。馴れ合いはなく、値段と質を冷静に見極める者同士の、ドライで誠実なやり取り。ここでは誰もあなたを助けないし、励ましもしない。「結果がすべてを語る」空気。古い道具は、使えなくなれば容赦なく捨てられ、新しい仕組みに置き換わる。",
    invite: "「これ、使ってみな。ダメなら返品でいい」と品物を差し出され、値段交渉を持ちかけられる。決めるのはあなた一人。相談相手はいないし、味方もいない。",
    weights: { A: 1, C: 1 }, char: "darling" },
  { q: "delta", motif: "house", colors: ["#7A5C3E", "#6B7F5E"],
    air: "木の温もりのある家。誰かが黙々と手を動かし、丁寧な仕事が積み重なっている。騒がしくはないが、誠実さと安定感がある。「長く使えるものを、ちゃんと作る」空気。庭の隅ではドクダミが白い花を咲かせて生い茂っている。抜いても抜いても根が残り、気づけば庭いっぱいに広がっている。",
    invite: "「よかったら手伝って。急がなくていいから」と作業台の一角を譲られ、自分のペースで手を動かすよう促される。",
    weights: { A: -1, C: 1 }, char: null },
  { q: "phi", motif: "spark", colors: ["#C0392B", "#F39C12"],
    air: "β帝国と同じ顔ぶれなのに、空気は真逆。掲げられた旗は古い秩序への挑戦状で、集まった人々は「今のままじゃダメだ」と声を上げる。情熱はあるが、向いているのは体制の外側。壊して作り直す、反骨の熱。",
    invite: "「このルール、おかしいと思わない？」と問いかけられ、既存のやり方に異を唱えるかどうかを試される。",
    weights: { A: 1, B: -1 }, char: "worm" },
  { q: "chi", motif: "rainbow", colors: ["#9BD3E8", "#F7C6D9"],
    air: "α工房と同じ顔ぶれなのに、ここはもっと穏やかで整った理想郷。誰もがのびのびと過ごし、争いがなく、思いつきがそのまま形になる。「みんなが心地よくいられる場所」をみんなで守っている。",
    invite: "「ここでは好きにしていいよ。居たいだけいていいから」と言われ、何も求められずに過ごす。",
    weights: { A: -1, B: 1 }, char: null },
  { q: "psi", motif: "fountain", colors: ["#5B7C99", "#A66A4F"],
    air: "δの家から一歩出た、町の広場。住民同士が顔見知りで、困っている人がいれば自然に手が差し伸べられる。派手さはないが、互いを気遣う公共の空気。「この町を良くする」が合言葉。広場の片隅でもドクダミが根を張っている。",
    invite: "「来週の清掃、手伝ってくれる？」と気軽に頼まれ、町の行事への参加を誘われる。",
    weights: { A: -1, B: -1 }, char: null },
  { q: "omega", motif: "door", colors: ["#1F2A44", "#C9A227"],
    air: "γ市場と同じ顔ぶれなのに、ここは扉の向こうの静かなサロン。選ばれた者だけが集い、質の高い会話と実績がものを言う。排他的だが、内側は洗練されていて居心地がいい。「認められた者だけの場所」という空気。",
    invite: "「君なら入れるよ」と扉を開けられ、内側の会話に加わるよう誘われる。",
    weights: { B: 1, C: 1 }, char: "darling" }
];

// ---- タスク定義（A1/A3/A4は特殊、B4は席UI） ----
const TASKS = [
  { id: "A1", type: "wait", title: "待ち時間",
    text: "次の場へ移動中。読み込みに少し時間がかかるみたい。終わるまで待っていて。" },
  { id: "A2", type: "choice", title: "締切シナリオ", timed: true,
    text: "締切まであと3分。まだ手つかずの作業が3つ残っている。どうする？",
    choices: [
      { t: "まず優先順位をつけて、終わるものから順に片付ける", a: "A", v: -15 },
      { t: "勢いで全部に手をつけて、一気に終わらせる", a: "A", v: 15 },
      { t: "誰かに分担を頼んで、並行して進める", a: "A", v: 5 },
      { t: "締切を延ばせないか、先に確認する", a: "A", v: -5 } ] },
  { id: "A3", type: "slider", title: "ちょうどいいを合わせる",
    text: "部屋の明かりの強さを「ちょうどいい」ところに合わせて、決めて。" },
  { id: "B1", type: "choice", title: "新しいグループ",
    text: "初めての集まりに参加することになった。最初に気になるのは？",
    choices: [
      { t: "どんな人がいるか、雰囲気はどうか", a: "B", v: -20 },
      { t: "リーダーは誰か、役割分担はどうなっているか", a: "B", v: 20 },
      { t: "自分が何を任されそうか", a: "B", v: 10 },
      { t: "話しやすそうな人がいるか", a: "B", v: -10 } ] },
  { id: "B2", type: "choice", title: "紹介文",
    text: "知人をみんなに紹介することになった。あなたなら、どの紹介文を選ぶ？",
    choices: [
      { t: "「○○社の部長で、業界団体の役員も務める田中さんです」", a: "B", v: 20 },
      { t: "「面倒見がよくて、誰にでも分け隔てなく接する田中さんです」", a: "B", v: -20 },
      { t: "「営業一筋20年、数字に強い田中さんです」", a: "B", v: 10 },
      { t: "「コーヒーの話をすると止まらなくなる田中さんです」", a: "B", v: -10 } ] },
  { id: "B3", type: "choice", title: "ルールと事情",
    text: "集団の決まりごとと、ある人の個人的な事情がぶつかった。あなたの考えに近いのは？",
    choices: [
      { t: "事情があるなら、今回は例外でいいと思う", a: "B", v: -20 },
      { t: "決まりは決まり。全員に同じ扱いをすべき", a: "B", v: 20 },
      { t: "事情を聞いた上で、みんなで決め直す", a: "B", v: -10 },
      { t: "代表が判断するのが一番揉めない", a: "B", v: 10 } ] },
  { id: "B4", type: "seats", title: "席選び",
    text: "円卓を囲む集まり。空いている席の中で、座りたいのはどこ？" },
  { id: "C1", type: "choice", title: "文章の書き換え",
    text: "文章を直すとき、あなたが一番優先するのは？",
    choices: [
      { t: "論理の筋が通っているか", a: "C", v: -20 },
      { t: "読み手の気持ちが動くか", a: "C", v: -10 },
      { t: "相手との関係を損ねないか", a: "C", v: 15 },
      { t: "実務で使える情報になっているか", a: "C", v: 20 } ] },
  { id: "C2", type: "choice", title: "評価の基準",
    text: "誰かの作品や仕事を評価するとき、基準の中心は？",
    choices: [
      { t: "面白いか、美しいか", a: "C", v: -20 },
      { t: "筋が通っていて、無駄がないか", a: "C", v: -10 },
      { t: "役に立つか、結果が出たか", a: "C", v: 20 },
      { t: "作り手の誠実さが伝わるか", a: "C", v: 10 } ] },
  { id: "C3", type: "choice", title: "相談されたら",
    text: "悩んでいる人から相談された。あなたの最初の返しに近いのは？",
    choices: [
      { t: "まず気持ちを受け止めて、共感する", a: "C", v: -10 },
      { t: "何が起きたのか、構造を分析して返す", a: "C", v: -15 },
      { t: "具体的にどうすればいいか助言する", a: "C", v: 15 },
      { t: "事実関係を一つずつ確認する", a: "C", v: 20 } ] },
  { id: "C4", type: "choice", title: "取引の決め手",
    text: "市場で値段交渉中。最終的に「買う」と決める決め手は？",
    choices: [
      { t: "値段が相場として妥当か", a: "C", v: 15 },
      { t: "売り手が信頼できる人か", a: "C", v: 10 },
      { t: "その品物の作り・仕組みが面白いか", a: "C", v: -15 },
      { t: "話の筋が通っているか、嘘がないか", a: "C", v: -10 } ] }
];
const SEATS = [
  { t: "進行役の隣", v: 20 }, { t: "中心に近い席", v: 10 },
  { t: "端っこの席", v: -15 }, { t: "顔見知りの隣", v: -20 }, { t: "出入口に近い席", v: -5 }
];

// ---- 状態 ----
const state = { name: "", selfType: "", scores: { A: 0, B: 0, C: 0 },
  sceneIdx: 0, taskIdx: 0, comfort: {}, dwell: {}, sceneStart: 0 };
const app = document.getElementById("app");
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function addScore(axis, v) { state.scores[axis] += v; }
function clamp(v) { return Math.max(-100, Math.min(100, Math.round(v))); }

// ---- トップ ----
function renderTop() {
  const opts = Object.keys(TYPE_QUADRA).map((t) => '<option value="' + t + '">' + t + "</option>").join("");
  app.innerHTML = '<div class="card"><h1>あなたに合うクアドラはどれ？</h1>' +
    '<p class="lead">ソシオニクスの8つのクアドラには、それぞれ違う「文化」と「空気」がある。この診断は、あなたのタイプを当てるものじゃない。8つの場を巡る旅の中で、どの場の空気が心地いいかを行動から測る、相性診断。</p>' +
    '<p class="lead">場に長く留まるか、誘いに乗るか、すぐ離れたくなるか。答えの内容だけじゃなく、あなたの操作そのものを見ている。</p>' +
    '<label>ニックネーム（任意）</label><input type="text" id="inp-name" placeholder="旅人">' +
    '<label>自認タイプ（任意・アンチ判定の精度が上がる）</label><select id="inp-type"><option value="">選択しない</option>' + opts + "</select>" +
    '<p class="center"><button id="btn-start">旅をはじめる</button></p></div>';
  document.getElementById("btn-start").onclick = () => {
    state.name = document.getElementById("inp-name").value.trim();
    state.selfType = document.getElementById("inp-type").value;
    state.sceneIdx = 0;
    renderScene();
  };
}

// ---- 場面 ----
function charHTML(kind) {
  if (kind === "darling") return '<div class="character"><button class="char-face" id="char-btn" aria-label="ダーリンちゃん">🥺</button><div class="char-name">ダーリンちゃん（タップで話す）</div><div><span class="bubble" id="char-bubble">……あら、ダーリン♡ よく来たわね。</span></div></div>';
  if (kind === "worm") return '<div class="character"><button class="char-face" id="char-btn" aria-label="LSI芋虫">🐛</button><div class="char-name">LSI芋虫（タップで話す）</div><div><span class="bubble" id="char-bubble">あ、どうも。……何か聞きたいことがある、ということかな。</span></div></div>';
  return "";
}
function bindChar(kind) {
  const btn = document.getElementById("char-btn");
  if (!btn) return;
  const bubble = document.getElementById("char-bubble");
  let taps = 0; const tapTimes = [];
  btn.onclick = () => {
    taps++;
    if (kind === "darling") {
      bubble.textContent = (taps % 6 === 0) ? DARLING_AWA : DARLING_LINES[(taps - 1) % DARLING_LINES.length];
      return;
    }
    const now = Date.now(); tapTimes.push(now);
    const rapid = tapTimes.filter((t) => now - t < 2500).length;
    if (rapid >= 5 && !btn.classList.contains("squished")) {
      btn.classList.add("squished");
      bubble.textContent = "お前はSLEか？やめろ！";
      btn.disabled = true;
      setTimeout(() => { btn.classList.remove("squished"); btn.disabled = false;
        bubble.textContent = "（復活した）……今のは構造的に理不尽だったと思う。"; }, 4000);
      return;
    }
    if (!btn.classList.contains("squished")) bubble.textContent = WORM_LINES[(taps - 1) % WORM_LINES.length];
  };
}
function renderScene() {
  const sc = SCENES[state.sceneIdx];
  const q = QUADRAS[sc.q];
  state.sceneStart = Date.now();
  app.innerHTML = '<div class="card"><div class="progress">旅の場面 ' + (state.sceneIdx + 1) + " / 8</div>" +
    '<div class="scene-visual">' + svgMotif(sc.motif, sc.colors[0], sc.colors[1]) + "</div>" +
    '<h2 class="scene-name"><span class="scene-symbol">' + q.symbol + "</span> " + q.theme + "「" + q.scene + "」</h2>" +
    "<p>" + sc.air + '</p><div class="invite">' + sc.invite + "</div>" +
    charHTML(sc.char) +
    '<div class="comfort">' +
    '<button class="choice" data-c="2">ここ、好きだな。残りたい</button>' +
    '<button class="choice" data-c="0.5">まあ、居られる</button>' +
    '<button class="choice" data-c="-1.5">早く次へ行きたい</button></div></div>';
  bindChar(sc.char);
  app.querySelectorAll("[data-c]").forEach((b) => {
    b.onclick = () => {
      const v = parseFloat(b.dataset.c);
      state.comfort[sc.q] = v;
      state.dwell[sc.q] = Math.round((Date.now() - state.sceneStart) / 1000);
      Object.keys(sc.weights).forEach((ax) => addScore(ax, v * sc.weights[ax] * 5));
      state.sceneIdx++;
      if (state.sceneIdx < SCENES.length) renderScene(); else { state.taskIdx = 0; renderTask(); }
    };
  });
}

// ---- タスク ----
function renderTask() {
  const t = TASKS[state.taskIdx];
  const head = '<div class="progress">観測タスク ' + (state.taskIdx + 1) + " / " + TASKS.length + "（" + t.id + "）</div>";
  if (t.type === "wait") return renderWait(t, head);
  if (t.type === "slider") return renderSlider(t, head);
  if (t.type === "seats") return renderSeats(t, head);
  let timerHTML = t.timed ? '<p>残り時間 <span class="timer" id="timer">0:10</span></p>' : "";
  app.innerHTML = '<div class="card">' + head + "<h2>" + t.title + "</h2><p>" + t.text + "</p>" + timerHTML +
    t.choices.map((c, i) => '<button class="choice" data-i="' + i + '">' + esc(c.t) + "</button>").join("") + "</div>";
  const start = Date.now();
  if (t.timed) {
    let remain = 10;
    const el = document.getElementById("timer");
    const iv = setInterval(() => { remain--; if (el) el.textContent = "0:0" + Math.max(0, remain);
      if (remain <= 0) clearInterval(iv); }, 1000);
    app.dataset.iv = iv;
  }
  app.querySelectorAll("[data-i]").forEach((b) => {
    b.onclick = () => {
      if (app.dataset.iv) clearInterval(Number(app.dataset.iv));
      const c = t.choices[Number(b.dataset.i)];
      addScore(c.a, c.v);
      if (t.timed) { const sec = (Date.now() - start) / 1000; addScore("A", sec < 3 ? 5 : (sec > 8 ? -5 : 0)); }
      nextTask();
    };
  });
}
function renderWait(t, head) {
  app.innerHTML = '<div class="card">' + head + "<h2>" + t.title + "</h2><p>" + t.text + "</p>" +
    '<div class="waitbar"><div id="waitfill"></div></div>' +
    '<p class="center"><button class="ghost" id="mash">様子を見る</button></p>' +
    '<p class="small center">押した回数：<span id="mashcount">0</span></p></div>';
  let clicks = 0;
  document.getElementById("mash").onclick = () => { clicks++; document.getElementById("mashcount").textContent = clicks; };
  let pct = 0;
  const iv = setInterval(() => { pct += 4; const f = document.getElementById("waitfill");
    if (f) f.style.width = Math.min(100, pct) + "%";
    if (pct >= 100) { clearInterval(iv);
      addScore("A", clicks <= 1 ? -20 : clicks <= 4 ? -5 : clicks <= 8 ? 10 : 20);
      nextTask(); } }, 320);
}
function renderSlider(t, head) {
  app.innerHTML = '<div class="card">' + head + "<h2>" + t.title + "</h2><p>" + t.text + "</p>" +
    '<input type="range" id="slider" min="0" max="100" value="50">' +
    '<p class="center"><button id="decide">これで決める</button></p></div>';
  let changes = 0;
  document.getElementById("slider").addEventListener("input", () => { changes++; });
  document.getElementById("decide").onclick = () => {
    addScore("A", changes <= 2 ? 15 : changes >= 8 ? -15 : 0);
    nextTask();
  };
}
function renderSeats(t, head) {
  app.innerHTML = '<div class="card">' + head + "<h2>" + t.title + "</h2><p>" + t.text + "</p>" +
    '<div class="seatmap">' + SEATS.map((s, i) => '<button class="choice" style="display:inline-block;width:auto" data-i="' + i + '">' + s.t + "</button>").join("") + "</div></div>";
  app.querySelectorAll("[data-i]").forEach((b) => {
    b.onclick = () => { addScore("B", SEATS[Number(b.dataset.i)].v); nextTask(); };
  });
}
function nextTask() { state.taskIdx++; if (state.taskIdx < TASKS.length) renderTask(); else renderResult(); }

// ---- 結果 ----
function quadraBySigns(a, b, c) {
  return Object.values(QUADRAS).find((q) => q.signs[0] === a && q.signs[1] === b && q.signs[2] === c);
}
function barHTML(leftLabel, rightLabel, v) {
  const pct = (v + 100) / 2;
  const fill = v < 0 ? 'left:' + pct + '%;width:' + (50 - pct) + '%' : 'left:50%;width:' + (pct - 50) + '%';
  return '<div class="bar-row"><span class="bar-label">' + leftLabel + '</span><div class="bar-track"><div class="bar-fill" style="' + fill + '"></div></div><span class="bar-label r">' + rightLabel + "</span></div>";
}
function renderResult() {
  const A = clamp(state.scores.A), B = clamp(state.scores.B), C = clamp(state.scores.C);
  const result = quadraBySigns(A >= 0 ? 1 : -1, B >= 0 ? 1 : -1, C >= 0 ? 1 : -1);
  const anti = quadraBySigns(-(A >= 0 ? 1 : -1), -(B >= 0 ? 1 : -1), -(C >= 0 ? 1 : -1));
  const who = state.name ? esc(state.name) + "さん" : "あなた";
  let selfNote = "";
  if (state.selfType && TYPE_QUADRA[state.selfType]) {
    const sq = QUADRAS[TYPE_QUADRA[state.selfType]];
    if (sq.key === anti.key) selfNote = '<p>自認タイプ ' + state.selfType + " の所属クアドラ（" + sq.symbol + " " + sq.name + "）と、今回の測定はちょうど真反対。アンチ" + sq.symbol + "傾向として結果に併記するケースだね。</p>";
    else if (sq.key === result.key) selfNote = '<p>自認タイプ ' + state.selfType + " の所属クアドラとも一致した。</p>";
    else selfNote = '<p>自認タイプ ' + state.selfType + " の所属クアドラは " + sq.symbol + " " + sq.name + "。測定結果とは別物として、両方眺めてみて。</p>";
  }
  const dwellSorted = Object.keys(state.dwell).sort((x, y) => state.dwell[y] - state.dwell[x]);
  const longest = dwellSorted.length ? QUADRAS[dwellSorted[0]] : null;
  const shortest = dwellSorted.length ? QUADRAS[dwellSorted[dwellSorted.length - 1]] : null;
  app.innerHTML = '<div class="card"><div class="result-symbol">' + result.symbol + "</div>" +
    "<h2 class='center'>" + who + "に合うクアドラは</h2>" +
    "<h1 class='center'>" + result.symbol + " " + result.name + " ― " + result.theme + "「" + result.scene + "」</h1>" +
    "<p>" + result.desc + "</p>" +
    '<p class="small">このクアドラのタイプ候補：' + result.types + "</p>" +
    "<h2>3軸パラメータ</h2>" +
    barHTML("周辺", "中心", A) + barHTML("民主", "貴族", B) + barHTML("主観", "客観", C) +
    "<h2>アンチクアドラ</h2>" +
    "<p><strong>" + anti.symbol + " " + anti.name + " ― " + anti.theme + "「" + anti.scene + "」</strong>：3軸すべてが反対になる、最も共感しにくい文化圏の目安。なお、アンチクアドラはサブクアドラそのものとは少し意味が違う（価値観への反発の向きを指す）。</p>" +
    (longest ? '<p class="small">旅の記録：一番長く留まった場は ' + longest.symbol + "「" + longest.scene + "」（" + state.dwell[longest.key] + "秒）、一番早く離れた場は " + shortest.symbol + "「" + shortest.scene + "」（" + state.dwell[shortest.key] + "秒）。</p>" : "") +
    selfNote +
    '<p class="center"><button class="ghost" id="btn-again">もう一度旅する</button></p></div>';
  document.getElementById("btn-again").onclick = () => {
    state.scores = { A: 0, B: 0, C: 0 }; state.comfort = {}; state.dwell = {}; state.sceneIdx = 0;
    renderTop();
  };
}
renderTop();
