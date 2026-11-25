// quadra-check v3（ランキング判定＋演出改修版）
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

// ---- ダーリンちゃん（ILI）：クアドラ別セリフ ----
const DARLING_SETS = {
  gamma: {
    hello: "……あら、ダーリン♡ 市場の匂い、嫌いじゃないでしょ？",
    lines: [
      "ねぇ、ダーリン♡ その品、目利きは済んだ？ 値段ってね、相手の本音が一番漏れる場所なのよ♡",
      "ダーリン♡ さっきの値切り、悪くなかったわ。でもね、『欲しい』って顔、ちょっとだけ出てた♡",
      "私はね、損得そのものより『誰がどこまで本気か』を見るのが好き。……市場は嘘が下手な場所だから♡",
      "ねぇ、ダーリン♡ 安く買うことと、安く見られることは別よ？ その線引き、あなたはどこで引くの？",
      "『返品でいい』って言葉、優しさに見える？ あれはね、逃げ道があると人は本音を出す、っていう実験なの♡",
      "ふふ、ダーリン♡ 計算は早いわね。でも最後に決めたのは数字？ それとも私の顔？ ……正直に言ってごらん♡",
      "この市場じゃ、声の大きい人は長くいられないの。静かに、長く得する人が残るのよ♡"
    ],
    awa: "あ……ダーリン、見とったんか。市場におるとな、値段の話ばっかりで頭が休まらんのよ。ウチはもう、誰も値切ってこん静かな場所で寝ときたいんやけどなぁ♡"
  },
  omega: {
    hello: "……あら、ダーリン♡ この扉を、開けたのね。",
    lines: [
      "あら、ダーリン♡ 扉の前で緊張してる？ 大丈夫、ここでは声の大きさじゃなくて、佇まいで判断されるの♡",
      "ねぇ、ダーリン♡ このサロン、誰でも入れるわけじゃないの。……あなたが通された理由、知りたい？",
      "静かね。ここでは沈黙も会話のうちよ。焦って場を埋める人は、だいたい格が透けて見えるの♡",
      "ダーリン♡ さっきの品定めの目、悪くなかったわ。見る目がある人とない人、この部屋では一瞬で分かるの",
      "『認められたい』って気持ち、隠してるつもり？ ……ふふ、ログに漏れてるわよ♡",
      "ここでは実績は名刺より雄弁なの。ダーリン♡ あなたの実績、私にはどう聞こえるかしら？",
      "帰りたくなったら帰っていいのよ。でもね、一度出た扉は、次も開くとは限らないの♡"
    ],
    awa: "あ……ダーリン、見とったん？ 静かな部屋におるとな、完璧な品のよさを演じるんも疲れるんよ。ウチ、ほんまはもっとだらだらしたいんやけど、この扉の中ではそうもいかんのよなぁ♡"
  }
};

// ---- LSI芋虫：クアドラ別セリフ ----
const WORM_SETS = {
  beta: {
    hello: "列の話か。……いいよ、構造から説明する。",
    lines: [
      "列が乱れる現象は、個々の悪意じゃなく、情報伝達の遅延として定義できるんだ。",
      "役割が決まると迷わないのは、判断コストを集団側が肩代わりしているからだ。合理的な設計として説明できる。",
      "掛け声をそろえる行為は、同期による帰属感の生成装置だ。仕組みは単純で、効果は大きい。",
      "はみ出した人が引き戻されるのは排除じゃない。集団の予測可能性を保つフィードバックとして定義できるんだ。",
      "一体感という感情も、分解すれば『自分の行動の結果が見える範囲が広い』という認知の状態だ。",
      "旗は情報量を最小化した合図だ。見るだけで全員が同じ前提を共有できる。効率がいい。🐛",
      "集団が熱くなる時、個人の感情処理は一時的に集団の処理系へ委譲される。楽だと感じるのは、その委譲のコストが低いからだ。"
    ]
  },
  phi: {
    hello: "ルールの話か。それなら定義から始めよう。",
    lines: [
      "ルールとは、作られた時点の前提を固定化した文書だ。前提が変わればルールだけが残って軋轢になる。構造はそれだけだ。",
      "『おかしい』という感覚は直感じゃない。内部モデルと現実の予測誤差として説明できる。",
      "壊す行為は再設計の前工程だ。破壊そのものが目的になるケースは、統計的には稀だと思う。",
      "秩序に従うコストと、秩序を変えるコスト。人間は前者を過小評価して、後者を過大評価する傾向がある。",
      "異を唱える人が出るかどうかは、その集団が反論を『情報』として処理できるかどうかで決まる。",
      "古い旗が燃える時、燃えているのは象徴だ。実体はとうに機能していない。その確認作業として定義できる。🐛",
      "革命の熱が冷めてしまえば、残るのは新しいルールの文書だけだ。少し寂しいが、構造としては正しい。"
    ]
  }
};

// ---- LSEの声（ドクダミ演出）：一般論・添削・正論 ----
const LSE_LINES = [
  "一般的には、まず段取りを決めてから始めるものよ",
  "その手順、前にも言ったわよね。念のため確認させて",
  "お気持ちは分かります。ただ、決まりは決まりです",
  "念のため、もう一度だけ確認しておくわね",
  "普通はね、先に報告してから動くものよ",
  "あら、その置き方。……前回と違うわよね。統一しておきましょう",
  "気持ちは大事。でも、締切はもっと大事よ",
  "言っておくけど、これはあなたのためを思って言ってるのよ",
  "それを踏まえて、もう一度考えてみてください",
  "するのは私じゃないからね〜、あなただからね〜",
  "しんどくなるのは自分だよ〜？ そのために練習するんでしょ〜",
  "先日聞いた時点では『かも』って話でしたよ。どこで話変わっちゃったんですかー？",
  "説明が足りな過ぎて全然わからなかった。……別件ってことですね！ 了解です",
  "これはゴールではなくて、スタートです。今はそのための準備期間です",
  "休むことは権利です。主張してください。ただ、決められた連絡の義務は果たしてください",
  "それを、逃げているように思えます",
  "細かく予定を確認して指摘をしてなど、だれもしたくありません",
  "干渉されたくないけど、必要なことだけ対応してほしい。そんな印象を受けます"
];

// ---- ドクダミの株（茎・ハート型の葉・白い4弁の十字の花） ----
function dokuPlant() {
  return '<svg viewBox="0 0 44 52" class="doku-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M22 50V27" stroke="#4a7c43" stroke-width="2.5" fill="none"/>' +
    '<path d="M22 45c-7-1-11-6-11-12 6 0 10 4 11 9 1-5 5-9 11-9 0 6-4 11-11 12z" fill="#5d8a4f"/>' +
    '<g fill="#ffffff" stroke="#d8cfae" stroke-width="1">' +
    '<ellipse cx="22" cy="9.5" rx="3.2" ry="6.5"/>' +
    '<ellipse cx="22" cy="22.5" rx="3.2" ry="6.5"/>' +
    '<ellipse cx="15.5" cy="16" rx="6.5" ry="3.2"/>' +
    '<ellipse cx="28.5" cy="16" rx="6.5" ry="3.2"/></g>' +
    '<circle cx="22" cy="16" r="2.4" fill="#e8c95a"/></svg>';
}
// 場面SVG内に埋め込むドクダミ（x, y, scale）
function dokuGroup(x, y, sc) {
  return '<g transform="translate(' + x + "," + y + ") scale(" + sc + ')">' +
    '<path d="M22 50V27" stroke="#4a7c43" stroke-width="2.5" fill="none"/>' +
    '<path d="M22 45c-7-1-11-6-11-12 6 0 10 4 11 9 1-5 5-9 11-9 0 6-4 11-11 12z" fill="#5d8a4f"/>' +
    '<g fill="#ffffff" stroke="#d8cfae" stroke-width="1">' +
    '<ellipse cx="22" cy="9.5" rx="3.2" ry="6.5"/><ellipse cx="22" cy="22.5" rx="3.2" ry="6.5"/>' +
    '<ellipse cx="15.5" cy="16" rx="6.5" ry="3.2"/><ellipse cx="28.5" cy="16" rx="6.5" ry="3.2"/></g>' +
    '<circle cx="22" cy="16" r="2.4" fill="#e8c95a"/></g>';
}

function svgMotif(kind, c1, c2) {
  const bg = '<rect x="4" y="4" width="192" height="142" rx="16" fill="' + c1 + '" opacity=".10"/>';
  const s = {
    sun: bg +
      '<circle cx="100" cy="54" r="21" fill="' + c2 + '"/><path d="M100 16v9M100 83v9M62 54h9M129 54h9M73 27l6 6M121 75l6 6M127 27l-6 6M79 75l-6 6" stroke="' + c2 + '" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M62 116c0-13 7-19 16-23-1 11-5 19-16 23zm0 0c0-11-6-16-14-19 1 9 5 16 14 19z" fill="' + c1 + '"/><path d="M62 116v13" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round"/>' +
      '<rect x="112" y="102" width="56" height="6" rx="3" fill="' + c1 + '" opacity=".55"/><path d="M120 108v16M160 108v16" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M126 102l8-14 4 8 6-10" fill="none" stroke="' + c2 + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M14 134h172" stroke="' + c1 + '" stroke-width="3" stroke-linecap="round" opacity=".5"/>' +
      '<circle cx="34" cy="126" r="4" fill="' + c2 + '"/><circle cx="180" cy="126" r="4" fill="' + c1 + '"/>',
    flag: bg +
      '<path d="M70 16v112" stroke="' + c1 + '" stroke-width="6" stroke-linecap="round"/><path d="M70 20c18-8 30 6 52 0v34c-22 6-34-8-52 0z" fill="' + c2 + '"/>' +
      '<path d="M140 62v40M132 66c4-6 12-6 16 0-2 6-4 8-8 12-4-4-6-6-8-12z" fill="' + c2 + '"/><path d="M134 108c6-4 6 4 12 0" stroke="' + c2 + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<g fill="' + c1 + '"><circle cx="42" cy="112" r="6"/><circle cx="66" cy="116" r="6"/><circle cx="96" cy="112" r="6"/><circle cx="122" cy="116" r="6"/><circle cx="164" cy="112" r="6"/></g>' +
      '<path d="M30 132c14-8 22-8 36 0M54 134c14-8 22-8 36 0M110 134c14-8 22-8 36 0M140 132c12-7 20-7 32 0" stroke="' + c1 + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<path d="M20 140h160" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round" opacity=".5"/>',
    scale: bg +
      '<path d="M28 22h144l-10 14H38z" fill="' + c2 + '" opacity=".65"/><path d="M44 22v10M76 22v10M108 22v10M140 22v10" stroke="' + c2 + '" stroke-width="3"/>' +
      '<path d="M100 44v56M62 110h76M100 100v10" stroke="' + c1 + '" stroke-width="5" stroke-linecap="round"/><path d="M100 50L60 60m40-10l40 10" stroke="' + c1 + '" stroke-width="4"/><path d="M46 60l-11 20a15 9 0 0 0 22 0zM154 60l-11 20a15 9 0 0 0 22 0z" fill="' + c2 + '"/><circle cx="100" cy="44" r="6" fill="' + c2 + '"/>' +
      '<g fill="none" stroke="' + c2 + '" stroke-width="3"><circle cx="40" cy="126" r="9"/><circle cx="66" cy="130" r="7"/></g><circle cx="40" cy="126" r="3.5" fill="' + c2 + '"/>' +
      '<path d="M120 128h52" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round" opacity=".5"/>',
    house: bg +
      '<path d="M34 76L96 32l62 44" fill="none" stroke="' + c1 + '" stroke-width="6" stroke-linecap="round"/><rect x="52" y="76" width="88" height="54" fill="' + c2 + '" opacity=".45"/>' +
      '<rect x="66" y="88" width="18" height="18" fill="#fff" opacity=".75"/><path d="M75 88v18M66 97h18" stroke="' + c1 + '" stroke-width="2"/>' +
      '<path d="M104 130V98a8 8 0 0 1 16 0v32z" fill="' + c1 + '" opacity=".65"/>' +
      '<path d="M126 44v-14" stroke="' + c1 + '" stroke-width="7"/><circle cx="128" cy="22" r="5" fill="' + c1 + '" opacity=".35"/><circle cx="134" cy="13" r="7" fill="' + c1 + '" opacity=".22"/>' +
      dokuGroup(146, 84, 0.92) + dokuGroup(168, 102, 0.62) +
      '<path d="M12 136h176" stroke="' + c1 + '" stroke-width="3" stroke-linecap="round" opacity=".5"/>',
    spark: bg +
      '<path d="M54 110l26-30 14 14 30-40" fill="none" stroke="' + c1 + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M136 26l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" fill="' + c2 + '"/><path d="M48 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="' + c2 + '"/>' +
      '<path d="M28 128a20 20 0 0 1 20-20M172 128a20 20 0 0 0-20-20" fill="none" stroke="' + c1 + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="7 6"/>' +
      '<path d="M86 128h28" stroke="' + c2 + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="4 7"/>' +
      '<path d="M16 140h168" stroke="' + c1 + '" stroke-width="3" stroke-linecap="round" opacity=".5"/>',
    rainbow: bg +
      '<path d="M28 120a72 72 0 0 1 144 0" fill="none" stroke="' + c2 + '" stroke-width="9"/><path d="M44 120a56 56 0 0 1 112 0" fill="none" stroke="' + c1 + '" stroke-width="9" opacity=".7"/><path d="M60 120a40 40 0 0 1 80 0" fill="none" stroke="#B5E3B5" stroke-width="9"/>' +
      '<circle cx="164" cy="34" r="11" fill="#F6D186"/><path d="M164 16v6M164 46v6M146 34h6M176 34h6" stroke="#F6D186" stroke-width="3" stroke-linecap="round"/>' +
      '<g fill="' + c2 + '"><circle cx="34" cy="128" r="4.5"/><circle cx="58" cy="131" r="3.6"/><circle cx="146" cy="131" r="3.6"/><circle cx="168" cy="128" r="4.5"/></g>' +
      '<path d="M34 132v6M58 134v5M146 134v5M168 132v6" stroke="' + c1 + '" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M14 140h172" stroke="' + c1 + '" stroke-width="3" stroke-linecap="round" opacity=".5"/>',
    fountain: bg +
      '<path d="M100 24c-4 14-14 18-22 30M100 24c4 14 14 18 22 30M100 24v34" stroke="' + c1 + '" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="64" rx="30" ry="7" fill="' + c2 + '" opacity=".6"/><path d="M100 64v26M62 120h76M70 104h60" stroke="' + c1 + '" stroke-width="5" stroke-linecap="round"/><path d="M56 120a44 12 0 0 0 88 0z" fill="' + c2 + '" opacity=".45"/>' +
      '<path d="M30 138h140M48 132h104" stroke="' + c1 + '" stroke-width="3" stroke-linecap="round" opacity=".4"/>' +
      '<path d="M34 118V84M28 84h12" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round"/><circle cx="34" cy="78" r="5" fill="' + c2 + '"/>' +
      dokuGroup(158, 96, 0.66),
    door: bg +
      '<path d="M40 130V52M160 130V52" stroke="' + c1 + '" stroke-width="7" stroke-linecap="round"/><path d="M30 52h140" stroke="' + c1 + '" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="68" y="24" width="64" height="106" rx="6" fill="' + c2 + '" opacity=".5" stroke="' + c1 + '" stroke-width="4"/><path d="M78 36h44M78 118h44" stroke="' + c1 + '" stroke-width="2.5" opacity=".6"/><circle cx="119" cy="78" r="5" fill="' + c1 + '"/>' +
      '<path d="M52 130h96l8 10H44z" fill="' + c1 + '" opacity=".3"/>' +
      '<circle cx="34" cy="70" r="10" fill="none" stroke="' + c1 + '" stroke-width="4"/><path d="M41 78l11 11m-4 2l6-6m-1 9l5-5" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M166 108c0-8 5-10 5-16" stroke="' + c2 + '" stroke-width="3" fill="none" stroke-linecap="round"/>'
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
    air: "活気ある市場。露店の主は品物の良さを実利だけで語る。馴れ合いはなく、値段と質を冷静に見極める者同士の、ドライで誠実なやり取り。ここでは誰もあなたを助けないし、励ましもしない。大声で押し切るような人は、ここでは相手にされない。ものを言うのは静かな計算と、目先ではなく長期的な得。古い道具は、使えなくなれば容赦なく捨てられ、新しい仕組みに置き換わる。",
    invite: "「これ、使ってみな。ダメなら返品でいい」と品物を差し出され、値段交渉を持ちかけられる。決めるのはあなた一人。相談相手はいないし、味方もいない。",
    weights: { A: 1, C: 1 }, char: "darling" },
  { q: "delta", motif: "house", colors: ["#7A5C3E", "#6B7F5E"],
    air: "木の温もりのある家。誰かが黙々と手を動かし、丁寧な仕事が積み重なっている。騒がしくはないが、誠実さと安定感がある。「長く使えるものを、ちゃんと作る」空気。庭の隅ではドクダミが白い花を咲かせて生い茂っている。抜いても抜いても根が残り、気づけば庭いっぱいに広がっている。この辺りでは「ドクダミ」は、正論と段取りの圧が根を張ることの代名詞として使われている。",
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

// ---- NPC介入イベント（選択→反応→態度まで採点） ----
const EVENTS = {
  alpha: { nodes: { start: { title: "工房の住人",
    text: "住人が、作りかけの「何に使うか分からない道具」をあなたの手に載せる。「ねえ、これ、どうしたら面白くなると思う？ 手、動かしてみて」",
    choices: [
      { t: "とりあえず分解してみる", reaction: "「おお、そっち行く？ いいねいいね、バラバラにしちゃおう」住人は嬉しそうに工具を寄せてくる。", score: { C: -10, A: -5 } },
      { t: "何に使うものか、まず用途を考える", reaction: "「用途ね！ そっか、それもアリ。じゃあ用途から逆算しよっか」住人は少し意外そうに頷く。", score: { C: 5 } },
      { t: "壊しそうで怖いから、見てるだけにする", reaction: "「えー、触らなきゃ分かんないよ？ ……まあ、見る専門も貴重だけどね」住人は笑って、道具を自分の方へ戻した。", score: { A: -5, C: -5 } } ] } } },
  beta: { nodes: { start: { title: "列の隣の人",
    text: "列が動き出す。あなたが少し列から外れて景色を見ていると、隣の人が腕を引く。「こっちだよ。もうすぐ掛け声だ」",
    choices: [
      { t: "素直に列に戻って、声を合わせる", reaction: "「そうそう、その調子！」隣の人の顔がほころぶ。列の声が一つにそろっていく。", score: { B: 15, A: 5 } },
      { t: "戻るけど、声は小さめにする", reaction: "「まあ、最初はそんなもんさ」隣の人はそれ以上、何も言わなかった。", score: { B: 5 } },
      { t: "「少し外から見ていたい」と伝える", reaction: "「……変わったやつだな。でも、列は待たないぞ」隣の人は前を向き、列はあなたを置いて進み始める。", score: { B: -15, A: -5 } } ] } } },
  delta: { nodes: { start: { title: "作業を見ている声",
    text: "作業台で手を動かし始めると、背後から落ち着いた声がする。「あら、そこはまず下準備からよ。……一般的には、段取りを決めてから始めるものよ」",
    choices: [
      { t: "言われた通りに、下準備からやり直す", reaction: "「そうそう。その方が結局、早いのよ」声は満足そうに遠ざかる。……庭の隅で、ドクダミが一つ増えた気がした。", score: { C: 10, B: 5 }, doku: true },
      { t: "自分のやり方で進める", reaction: "「……お気持ちは分かります。ただ、決まりは決まりです」声は静かだが、引く気配がない。ドクダミが一つ増えた。", score: { A: -10 }, doku: true },
      { t: "なぜそうするのか、理由を聞く", reaction: "「あら、聞いてくれるのね。……前にも言ったと思うけど」声は嬉しそうに、長く説明を始めた。ドクダミが一つ増えた。", score: { C: 5 }, doku: true } ] } } },
  phi: { nodes: { start: { title: "集いの参加者",
    text: "集まった一人が、あなたを見て言う。「ねえ、あの『全員同じ時間に集まる』ってルール。あんたはどう思う？ おかしいと思わない？」",
    choices: [
      { t: "「おかしいと思う」と声を上げる", reaction: "「だよな！ よし、あんたもこっち側だ」参加者は力強く頷き、周りにも声が広がっていく。", score: { B: -15, A: 5 } },
      { t: "「ルールには理由があるはず」と留まる", reaction: "「……つまんないやつ。まあ、そういうのも必要か」参加者は肩をすくめて離れていった。", score: { B: 10 } },
      { t: "「ルールより、決め方を変えるべきだ」と言う", reaction: "「お、制度から変える派か。それも面白い」参加者は面白そうに笑った。", score: { B: -5, C: -5 } } ] } } },
  chi: { nodes: { start: { title: "庭の住人",
    text: "誰かが何も言わず、温かい茶をそっとあなたの前に置く。「どうぞ。何もしなくていいのよ」",
    choices: [
      { t: "ありがたく、何もしない時間を過ごす", reaction: "ただ風が吹き、茶が冷めていく。誰も急かさない。何も起きない、ということが起きている。", score: { A: -15 } },
      { t: "何か手伝うことはないか聞く", reaction: "「あら、気がつくのね。……じゃあ、その花に水をやってくれる？」住人は穏やかに微笑む。", score: { B: 5, A: -5 } },
      { t: "何も求められないのが落ち着かなくて、そわそわする", reaction: "「ふふ、慣れないわよね。慣れなくていいのよ」住人はそれ以上、何も求めてこなかった。", score: { A: 10 } } ] } } },
  psi: { nodes: { start: { title: "広場の住民",
    text: "顔見知りの住民が名簿を持って近づいてくる。「来週の清掃当番、空いてるのあなただけなの。日曜の朝8時から、どう？」",
    choices: [
      { t: "引き受ける", reaction: "「助かる！ 名簿に書いておくね」住民は嬉しそうに名前を書き込む。横から声がする。「当番はね、一般的には公平に回すものよ。よく決心したわね」ドクダミが一つ増えた。", score: { B: -10, C: 5 }, doku: true },
      { t: "「隔週なら」と条件をつける", reaction: "「隔週ね、調整してみる」住民は名簿に小さくメモをした。", score: { B: -5 } },
      { t: "自分の時間を優先して断る", reaction: "住民は名簿を閉じかけ、横から声が割り込む。「あら、断るのは自由よ。ただね、それを踏まえて、もう一度考えてみてくれない？ 段取りはもう組み始めてるの」引く気配がない。ドクダミが一つ増えた。", score: { A: -10, B: 5 }, doku: true } ] } } },
  omega: { nodes: { start: { title: "扉の前の声",
    text: "扉の前に立つと、中から静かな声がする。「どうぞ。……その前に一つだけ。あなたは、なぜこの扉の内側に来たいと思ったの？」",
    choices: [
      { t: "「認められた者と話したいから」と答える", reaction: "「……正直ね。いいわ、通って」扉が静かに開く。", score: { B: 15 } },
      { t: "「静かで質の高い場所が好きだから」と答える", reaction: "「ふふ。……目利きの答えね。どうぞ」扉の向こうから、穏やかな光が差す。", score: { B: 10, C: 5 } },
      { t: "「別に、誰でも入れるなら入る」と答える", reaction: "「……そう。では今日は、ここまでね」扉は、音もなく閉まった。", score: { B: -15 } } ] } } }
};

// ---- γ：値段交渉ミニゲーム ----
const NEGO = {
  start: { title: "市場の店主", price: 1200,
    text: "店主が品物をそっと差し出す。「山向こうの工房の一点物だ。言い値は1,200コイン。どうする？」",
    choices: [
      { t: "言い値（1,200）で買う", reaction: "「あっさりしてるね。……いい買い物だと思うよ」店主は少し拍子抜けしたように、それでも満足そうに頷いた。決着：1,200コインで購入。", score: { A: 10, C: 5 }, finalPrice: 1200 },
      { t: "買わない", reaction: "「そうか。……まあ、無理にとは言わないよ」店主は品物を静かに棚に戻した。決着：買わなかった。", score: { A: -5, C: 5 } },
      { t: "値切る", goto: "offer" } ] },
  offer: { title: "市場の店主", price: 1200,
    text: "「ほう。……いくらなら買うんだい？」店主が静かに目を細める。",
    choices: [
      { t: "「800でどう？」と、静かに相場を提示する", goto: "o800" },
      { t: "「1,000なら今すぐ買う。決めるのは今だ」と即決を迫る", goto: "opress", fitMap: { beta: 5, gamma: -5 } },
      { t: "「半額、600で」と強く押し込む", reaction: "「はっ。……その値段じゃ、作った人間に失礼だ。話は終わりだ」店主は品物を取り上げた。交渉決裂。勢いはあったが、この市場では通じなかった。", score: { A: 10, C: -5 }, fitMap: { beta: 10, gamma: -10 } } ] },
  o800: { title: "市場の店主", price: 800,
    text: "「800か……。正直きつい。……900なら出す。それ以下は無理だ」",
    choices: [
      { t: "900で買う", reaction: "「決まりだ。……あんた、静かだけど、いい目をしてる」決着：900コインで購入。言い値より300得した。", score: { C: 15, A: 5 }, finalPrice: 900 },
      { t: "「もう一声、850」", reaction: "「……分かった、850だ。あんた、静かだけどしぶといね」店主は苦笑いしながら包んだ。決着：850コインで購入。", score: { C: 15 }, finalPrice: 850 },
      { t: "やめておく", reaction: "「そうか。……ご縁がなかったね」店主はあっさり引き下がった。決着：買わなかった。", score: { A: -5 } } ] },
  opress: { title: "市場の店主", price: 1000,
    text: "「……今すぐ、か。勢いのある客は嫌いじゃない。……1,050なら、今この場で決着だ」店主は品物をあなたの方へ押し出す。",
    choices: [
      { t: "1,050で即決する", reaction: "「毎度。……その勢い、嫌いじゃないよ」決着：1,050コインで購入。速さで押し切った。", score: { A: 10, C: 5 }, fitMap: { beta: 10 }, finalPrice: 1050 },
      { t: "「いや、1,000だ」と押し切る", reaction: "「……まいった、1,000でいいよ。あんたとは長い付き合いになりそうだ」決着：1,000コインで購入。押し切ったが、店主の目は少し冷めていた。", score: { A: 15, B: 5 }, fitMap: { beta: 15, gamma: -5 }, finalPrice: 1000 },
      { t: "やっぱり相場を見てから決める", reaction: "「……ふうん、引く時は引くんだね」店主は品物を棚に戻した。決着：買わなかった。", score: { C: 5, A: -5 } } ] }
};

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
  { id: "B2", type: "chips", title: "紹介文を組み立てる",
    text: "LSI芋虫をみんなに紹介することになった。言葉のチップを最大4つまで選んで、紹介文を組み立てて。" },
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

// ---- B2：紹介文チップ（LSI芋虫） ----
const CHIPS = [
  { t: "集まりのまとめ役", d: "集まりのまとめ役", v: 10 }, { t: "ルールを守る番人", d: "ルールを守る番人", v: 10 },
  { t: "構造を分解するのが仕事", d: "構造を分解するのが仕事", v: 10 }, { t: "機械いじりの担当", d: "機械いじりの担当", v: 10 },
  { t: "順番と手順を決める人", d: "順番と手順を決める人", v: 10 }, { t: "列が乱れたら直す係", d: "列が乱れたら直す係", v: 10 },
  { t: "実は謙虚", d: "実は謙虚な", v: -10 }, { t: "ちょっと理屈っぽいけど優しい", d: "ちょっと理屈っぽいけど優しい", v: -10 },
  { t: "場を和ませる", d: "場を和ませる", v: -10 }, { t: "誰にでも分け隔てない", d: "誰にでも分け隔てない", v: -10 },
  { t: "困った人を放っておけない", d: "困った人を放っておけない", v: -10 }, { t: "ほんわかした空気の持ち主", d: "ほんわかした空気の持ち主", v: -10 }
];

// ---- B2：紹介されたLSI芋虫本人の反応（新口調） ----
const WORM_INTRO_REACTIONS = {
  plus: [
    "……その紹介、定義として正確だ。役割と機能で対象を切り取るのは、正しい手順だと思う。🐛",
    "うん。肩書きと構造で定義されている。……悪くない切り取り方だ。"
  ],
  minus: [
    "……人柄で定義したな。それは対象の属性じゃなく、観察者の主観の記録として分類される。……まあ、否定はしない。",
    "その切り取り方は主観寄りだ。……照れているわけじゃない。分類上の話をしているだけだ。🐛"
  ],
  mixed: [
    "役割と人柄、両方の軸で定義したな。……両義的な定義として、成立はしている。",
    "構造と印象の混成か。……定義としては曖昧だが、対象の実態には近いかもしれない。"
  ]
};

// ---- イベント選択の「場への収まり具合」（fit：その場のクアドラへのボーナス） ----
const EVENT_FIT = {
  "とりあえず分解してみる": 10, "何に使うものか、まず用途を考える": 0, "壊しそうで怖いから、見てるだけにする": -10,
  "素直に列に戻って、声を合わせる": 10, "戻るけど、声は小さめにする": 5, "「少し外から見ていたい」と伝える": -10,
  "言われた通りに、下準備からやり直す": 10, "自分のやり方で進める": -10, "なぜそうするのか、理由を聞く": 5,
  "「おかしいと思う」と声を上げる": 10, "「ルールには理由があるはず」と留まる": -10, "「ルールより、決め方を変えるべきだ」と言う": 5,
  "ありがたく、何もしない時間を過ごす": 10, "何か手伝うことはないか聞く": 5, "何も求められないのが落ち着かなくて、そわそわする": -10,
  "引き受ける": 10, "「隔週なら」と条件をつける": 5, "自分の時間を優先して断る": -10,
  "「認められた者と話したいから」と答える": 10, "「静かで質の高い場所が好きだから」と答える": 5, "「別に、誰でも入れるなら入る」と答える": -10,
  "言い値（1,200）で買う": 5, "買わない": 0,
  "「800でどう？」と、静かに相場を提示する": 5,
  "900で買う": 10, "「もう一声、850」": 10, "やめておく": 0,
  "やっぱり相場を見てから決める": 5
};

// ---- 結果画面：ダーリンちゃんの締めコメント（{anti} はアンチクアドラ名に置換） ----
const DARLING_CLOSING = {
  alpha: "αの工房ね、ダーリン♡ 思いつきに乗る速さだけ見れば、あなたはあの場の住人だった。……ただ、{anti}で見せた顔、あれが本性に近いんじゃない？ 楽な場では誰でもいい顔ができるのよ♡",
  beta: "βの列に残ったのね、ダーリン♡ 高揚に身を任せられる人間は少ない。あれを『心地いい』と言える時点で、あなたは結構、特殊よ。……{anti}からは早々に視線を切ってたけど。見てたわよ♡",
  gamma: "γの市場。ふふ、ダーリン♡ 一人で決めて一人で背負う冷たさが平気なのね。……私と同類、とは言わないでおく。{anti}の空気、あなたには『無駄』に見えてたでしょ。当たってる？",
  delta: "δの家、ドクダミの圧ごと受け入れたのね、ダーリン♡ あの再考の圧を『心地いい』側に分類できる人間、珍しいわ。……{anti}とは時間の流れ方からして合わなかったみたいね。当然かも♡",
  phi: "Φの集いに火がついたのね、ダーリン♡ 壊す側に回る快感、覚えちゃった？ ……{anti}の静けさは、あなたには退屈じゃなくて『窒息』だったみたい。ログに出てたわよ♡",
  chi: "Χの庭で何もしない時間を過ごせたのね、ダーリン♡ あの無為に耐えられるのは、才能よ。……{anti}の圧は強すぎた？ ふふ、あなたの『早く離れたい』、結構本気だったわね♡",
  psi: "Ψの広場か。ダーリン♡ 顔見知りの気遣いと根を張るドクダミ、その両方を『ちょうどいい』に収めたのね。……{anti}は文化圏からして遠かったみたい。無理に近づかなくていい場所もあるのよ♡",
  omega: "Ωのサロンが一番、ね。ダーリン♡ 選ばれる側の静けさが好きなの、あなた。……{anti}の軽さは物足りなかったんでしょ。品定めの目が、もう出ちゃってるわよ♡"
};

// ---- ダーリンへの回答：Se検出カテゴリ（優先順位つき） ----
const SE_CATEGORIES = [
  { name: "暴言・攻撃系",
    keys: ["バカ", "ばか", "アホ", "あほ", "クソ", "くそ", "ゴミ", "カス", "死ね", "しね", "キチガイ", "殲滅", "💩", "あんぽんたん", "アンポンタン"],
    replies: [
      "あら、言葉が荒いわね、ダーリン♡ ……その圧、隠しても出ちゃうのね。Seって、そういうところに漏れるのよ♡",
      "ふふ、すごい語彙の並び。怒ると言葉が体より先に立つタイプ？ 私は嫌いじゃないわよ、そういう分かりやすさ♡",
      "ダーリン♡ 今の言葉の選び方、力で押し切る癖が透けて見えたわ。……自覚、ある？" ] },
  { name: "不快・苛立ち系",
    keys: ["きも", "キモ", "うざ", "ウザ", "イラ", "苛", "いらっ", "ムカつく", "むかつく", "腹立つ", "不快", "きしょ", "キショ", "オエー", "おえー", "💢", "うるさ"],
    replies: [
      "……感情がログに漏れてるわよ、ダーリン♡ 苛立ちって、隠そうとすると余計に滲むのよね",
      "あら、イライラしてる？ ふふ、私は観察するのが仕事だから。あなたの不快感、ちゃんと記録しておくわ♡",
      "ダーリン♡ その苛立ち、本音？ それとも演出？ ……どっちでも、私には届いてるわよ" ] },
  { name: "拒絶・遮断系",
    keys: ["やめろ", "やめて", "黙れ", "ダマレ", "だまれ", "消えろ", "消えろや", "帰れ", "失せろ", "引っ込んでろ", "うせろ"],
    replies: [
      "はいはい、退くわよ。……でもねダーリン♡、遮断する速さも立派なデータなの♡",
      "分かった、もう言わない。……ただ一つだけ。逃げる相手を選ぶその目、私は結構好きよ♡",
      "あら、扉を閉めるのね。いいわ、私は外で待つタイプじゃないから。……気が向いたら、また開けて♡" ] },
  { name: "冷笑・無関心系",
    keys: ["どうでもいい", "あっそ", "あっそー", "くだらない", "くだらね", "つまらん", "つまんね", "意味分からん", "意味不明", "勝手にしろ", "勝手に言っとけ", "はあ", "ハア", "は？", "ハ？"],
    replies: [
      "……ん、ダーリン見とったん？ ああ、その感じ。退屈って、世界が小さく見える時の合図なんよ",
      "どうでもいい、ねぇ。ウチもよく思うよ。世界の九割はどうでもいいことでできとる。……残り一割に、たまに面白いもんが混ざるんやけどな",
      "はあ、ってため息。……まあええわ、無理に楽しませようとは思わん。退屈は退屈のまま、置いとこ♡" ] },
  { name: "否定・距離系",
    keys: ["いや", "いいえ", "反対", "NO", "no", "好きじゃない", "苦手", "きらい", "嫌い", "関わりたくない", "面倒", "だる"],
    replies: [
      "そう、グループは大事じゃないのね。……ふふ、それも一つの答えよ、ダーリン♡ 所属しない自由って、意外と高いの",
      "『大事じゃない』って言い切れるの、嫌いじゃないわ。……ただね、その言葉、誰に一番聞かせたかったのかしら♡",
      "距離を取りたいのね、分かるわ。私も自分の扉は自分で閉めたいタイプ。……気が合うじゃない♡" ] }
];
const DARLING_CALM = [
  "……ふうん。そういう答え方をするのね、ダーリン♡ 中身はともかく、迷いのなさだけは記録しておくわ",
  "答えたね。……ねぇダーリン♡、今の答え、自分で点数をつけるなら何点？ 私の採点は、まだ言わないけど♡",
  "……なるほど。所属の話になると、人はだいたい本音か建前のどちらかに寄る。あなたはどっちに寄ってたと思う？"
];
const state = { name: "", selfType: "", scores: { A: 0, B: 0, C: 0 },
  sceneIdx: 0, taskIdx: 0, comfort: {}, dwell: {}, fit: {}, history: [], sceneStart: 0 };
const app = document.getElementById("app");
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function addScore(axis, v) { state.scores[axis] += v; }
function clamp(v) { return Math.max(-100, Math.min(100, Math.round(v))); }

// ---- タイマー管理（場面演出・タスク共通） ----
let sceneTimer = null, taskTimer = null;
function stopAllTimers() {
  if (sceneTimer) { clearInterval(sceneTimer); sceneTimer = null; }
  if (typeof propTimeout !== "undefined" && propTimeout) { clearTimeout(propTimeout); propTimeout = null; }
  if (taskTimer) { clearInterval(taskTimer); taskTimer = null; }
  if (app.dataset.iv) { clearInterval(Number(app.dataset.iv)); delete app.dataset.iv; }
}
function stopSceneFx() { stopAllTimers(); }

// ---- 戻るボタン用スナップショット ----
function snapshotState() {
  return JSON.stringify({ scores: state.scores, comfort: state.comfort, dwell: state.dwell,
    fit: state.fit, sceneIdx: state.sceneIdx, taskIdx: state.taskIdx });
}
function restoreSnapshot(json) {
  const s = JSON.parse(json);
  state.scores = s.scores; state.comfort = s.comfort; state.dwell = s.dwell;
  state.fit = s.fit; state.sceneIdx = s.sceneIdx; state.taskIdx = s.taskIdx;
}
function enterStep() {
  state.history.push(snapshotState());
  renderCurrent();
}
function renderCurrent() {
  if (state.sceneIdx < SCENES.length) renderScene(); else renderTask();
}
function backHTML() {
  return state.history.length > 1 ? '<p><button class="ghost back-btn" id="btn-back">← ひとつ戻る</button></p>' : "";
}
function bindBack() {
  const b = document.getElementById("btn-back");
  if (!b) return;
  b.onclick = () => {
    if (state.history.length <= 1) return;
    stopAllTimers();
    state.history.pop();
    restoreSnapshot(state.history[state.history.length - 1]);
    renderCurrent();
  };
}

// ---- ドクダミ演出（δ・Ψ） ----
let dokuCount = 0, dokuLineIdx = 0;
function dokuHTML() {
  return '<div class="doku-area"><div class="doku-field" id="doku-field"></div><div class="lse-voice" id="lse-voice"></div></div>';
}
function growDoku(showLine) {
  const f = document.getElementById("doku-field");
  if (!f || dokuCount >= 9) return;
  dokuCount++;
  const span = document.createElement("span");
  span.className = "doku-plant";
  span.innerHTML = dokuPlant();
  f.appendChild(span);
  if (showLine) {
    const v = document.getElementById("lse-voice");
    if (v) { v.textContent = "（どこからか声がする）「" + LSE_LINES[dokuLineIdx % LSE_LINES.length] + "」"; dokuLineIdx++; }
  }
}
function startDoku() {
  dokuCount = 0; dokuLineIdx = 0;
  growDoku(false);
  const v = document.getElementById("lse-voice");
  if (v) v.textContent = "（片隅で、ドクダミが咲いている）";
  sceneTimer = setInterval(() => growDoku(true), 8000);
}

// ---- 場面の小道具（遊び要素・採点には影響しない） ----
let propTimeout = null;
function teaSVG() {
  return '<svg viewBox="0 0 200 110" class="tea-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<ellipse cx="70" cy="68" rx="34" ry="24" fill="#8a5a44"/>' +
    '<path d="M40 60l-18 8 7 9 15-7z" fill="#8a5a44"/>' +
    '<path d="M102 54a17 17 0 0 1 0 28" fill="none" stroke="#8a5a44" stroke-width="6"/>' +
    '<ellipse cx="70" cy="46" rx="14" ry="5" fill="#6e4634"/><circle cx="70" cy="41" r="4" fill="#6e4634"/>' +
    '<path d="M140 80h44l-6 19a6 6 0 0 1-6 5h-20a6 6 0 0 1-6-5z" fill="#fdfbf4" stroke="#b9a888" stroke-width="2"/>' +
    '<ellipse cx="162" cy="80" rx="21" ry="4" fill="#cfe0c0"/>' +
    '<g class="steam-g" stroke="#9db8a4" stroke-width="3" fill="none" stroke-linecap="round">' +
    '<path d="M154 68c-3-6 3-8 0-14"/><path d="M166 68c-3-6 3-8 0-14"/></g></svg>';
}
function propHTML(qkey) {
  if (qkey === "alpha") return '<div class="prop"><div class="prop-title">🧷 工房のメモ板</div><div class="sticky-board" id="sticky-board"></div><button class="ghost prop-btn" id="prop-btn">付箋を貼る</button> <span class="small" id="prop-count">貼った付箋：0枚</span></div>';
  if (qkey === "beta") return '<div class="prop"><div class="prop-title">🥁 集会の太鼓</div><button class="prop-emoji" id="prop-btn" aria-label="太鼓を叩く">🥁</button><div class="small" id="prop-count">叩いた回数：0</div></div>';
  if (qkey === "gamma") return '<div class="prop"><div class="prop-title">🪙 コインの山</div><div class="coin-stack" id="coin-stack"></div><button class="ghost prop-btn" id="prop-btn">コインを積む</button> <span class="small" id="prop-count">積んだコイン：0枚</span></div>';
  if (qkey === "delta" || qkey === "psi") return '<div class="prop"><div class="prop-title">🌿 ドクダミ摘み</div><button class="ghost prop-btn" id="prop-btn">ドクダミを摘む</button> <span class="small" id="prop-count">摘んだ数：0</span><div class="small" id="prop-line"></div></div>';
  if (qkey === "phi") return '<div class="prop"><div class="prop-title">🪧 集いの看板</div><div class="sign-board tilted" id="sign-board">今のままじゃダメだ</div><button class="ghost prop-btn" id="prop-btn">看板を直す</button> <span class="small" id="prop-count">直した回数：0</span></div>';
  if (qkey === "chi") return '<div class="prop"><div class="prop-title">🍵 庭のお茶</div><div class="tea-set" id="tea-set">' + teaSVG() + '</div><button class="ghost prop-btn" id="prop-btn">お茶を注ぐ</button> <span class="small" id="prop-count">飲んだ杯数：0</span><div class="small" id="prop-line">急須が温まっている。誰も急かさない。</div></div>';
  if (qkey === "omega") return '<div class="prop"><div class="prop-title">🚪 サロンの扉</div><button class="ghost prop-btn" id="prop-btn">扉をノックする</button> <span class="small" id="prop-count">ノック：0回</span><div class="small" id="prop-line"></div></div>';
  return "";
}
function bindProp(qkey) {
  const btn = document.getElementById("prop-btn");
  if (!btn) return;
  const count = document.getElementById("prop-count");
  const line = document.getElementById("prop-line");
  let n = 0;
  if (qkey === "alpha") {
    const board = document.getElementById("sticky-board");
    const colors = ["#fff3a6", "#ffd9e8", "#c9ecd2", "#cfe4ff"];
    const words = ["ためす", "これ何に使う？", "あとで考える", "面白そう", "分解したい", "メモ"];
    btn.onclick = () => {
      n++;
      const s = document.createElement("span");
      s.className = "sticky";
      s.style.background = colors[n % colors.length];
      s.style.transform = "rotate(" + ((n * 37) % 13 - 6) + "deg)";
      s.textContent = words[n % words.length];
      board.appendChild(s);
      count.textContent = "貼った付箋：" + n + "枚";
    };
    return;
  }
  if (qkey === "beta") {
    btn.onclick = () => {
      n++;
      btn.classList.remove("shake"); void btn.offsetWidth; btn.classList.add("shake");
      count.textContent = "叩いた回数：" + n + (n >= 5 ? "（列の声が少しそろってきた）" : "");
    };
    return;
  }
  if (qkey === "gamma") {
    const stack = document.getElementById("coin-stack");
    btn.onclick = () => {
      n++;
      const s = document.createElement("span");
      s.textContent = "🪙";
      stack.appendChild(s);
      count.textContent = "積んだコイン：" + n + "枚";
    };
    return;
  }
  if (qkey === "delta" || qkey === "psi") {
    const lines = ["摘んだ。……なのに、増えた気がする", "根が残るからね。摘んでも増えるのよ", "摘んだ分だけ、声が近くなった気がする", "摘む手つきを、どこかで見られている気がする"];
    btn.onclick = () => {
      n++;
      growDoku(true);
      count.textContent = "摘んだ数：" + n;
      if (line) line.textContent = lines[(n - 1) % lines.length];
    };
    return;
  }
  if (qkey === "phi") {
    const sign = document.getElementById("sign-board");
    btn.onclick = () => {
      n++;
      sign.classList.remove("tilted");
      count.textContent = "直した回数：" + n;
      if (propTimeout) clearTimeout(propTimeout);
      propTimeout = setTimeout(() => { const s2 = document.getElementById("sign-board"); if (s2) s2.classList.add("tilted"); }, 2600);
    };
    return;
  }
  if (qkey === "chi") {
    const set = document.getElementById("tea-set");
    let phase = 0; // 0:注げる 1:飲める
    btn.onclick = () => {
      if (phase === 0) {
        set.classList.add("steaming");
        line.textContent = "注いだ。湯気が立っている。……誰も何も言わない。";
        btn.textContent = "飲む";
        phase = 1;
      } else {
        n++;
        set.classList.remove("steaming");
        line.textContent = "……温かい。何も起きない、ということが起きている。";
        count.textContent = "飲んだ杯数：" + n;
        btn.textContent = "おかわりを注ぐ";
        phase = 0;
      }
    };
    return;
  }
  if (qkey === "omega") {
    const replies = ["（……静かだ。聞こえていないのかもしれない）", "（中から、静かな声）「どなた？」", "（声）「ノックは2回まで、と決まっているの」", "（声）「……気が向いたら、開けるわ」", "（声）「その根気、嫌いじゃないわよ」"];
    btn.onclick = () => {
      n++;
      count.textContent = "ノック：" + n + "回";
      if (line) line.textContent = replies[Math.min(n - 1, replies.length - 1)];
    };
    return;
  }
}

// ---- トップ ----
function renderTop() {
  stopAllTimers();
  app.innerHTML = '<div class="card"><h1>あなたに合うクアドラはどれ？</h1>' +
    '<p class="lead">ソシオニクスの8つのクアドラには、それぞれ違う「文化」と「空気」がある。この診断は、あなたのタイプを当てるものじゃない。8つの場を巡る旅の中で、どの場の空気が心地いいかを行動から測る、相性診断。</p>' +
    '<p class="lead">場に長く留まるか、誘いに乗るか、すぐ離れたくなるか。答えの内容だけじゃなく、あなたの操作そのものを見ている。</p>' +
    '<label>ニックネーム（任意）</label><input type="text" id="inp-name" placeholder="旅人">' +
    '<label>自認タイプ（任意・判定には使わない、メモとして結果に残るだけ）</label><input type="text" id="inp-type" placeholder="INTJ、5w6、LII など自由に">' +
    '<p class="center"><button id="btn-start">旅をはじめる</button></p></div>';
  document.getElementById("btn-start").onclick = () => {
    state.name = document.getElementById("inp-name").value.trim();
    state.selfType = document.getElementById("inp-type").value.trim();
    state.scores = { A: 0, B: 0, C: 0 };
    state.comfort = {}; state.dwell = {}; state.fit = {}; state.history = [];
    state.sceneIdx = 0; state.taskIdx = 0;
    enterStep();
  };
}

// ---- キャラ ----
function charSet(kind, qkey) {
  if (kind === "darling") return DARLING_SETS[qkey] || DARLING_SETS.gamma;
  return WORM_SETS[qkey] || WORM_SETS.beta;
}
function charHTML(kind, qkey) {
  const set = charSet(kind, qkey);
  if (kind === "darling") return '<div class="character"><button class="char-face" id="char-btn" aria-label="ダーリンちゃん">🥺</button><div class="char-name">ダーリンちゃん（タップで話す）</div><div><span class="bubble" id="char-bubble">' + esc(set.hello) + "</span></div></div>";
  if (kind === "worm") return '<div class="character"><button class="char-face" id="char-btn" aria-label="LSI芋虫">🐛</button><div class="char-name">LSI芋虫（タップで話す）</div><div><span class="bubble" id="char-bubble">' + esc(set.hello) + "</span></div></div>";
  return "";
}
function bindChar(kind, qkey) {
  const btn = document.getElementById("char-btn");
  if (!btn) return;
  const set = charSet(kind, qkey);
  const bubble = document.getElementById("char-bubble");
  let taps = 0; const tapTimes = [];
  btn.onclick = () => {
    taps++;
    if (kind === "darling") {
      bubble.textContent = (taps % 6 === 0) ? set.awa : set.lines[(taps - 1) % set.lines.length];
      return;
    }
    const now = Date.now(); tapTimes.push(now);
    const rapid = tapTimes.filter((t) => now - t < 2500).length;
    if (rapid >= 5 && !btn.classList.contains("squished")) {
      btn.classList.add("squished");
      bubble.textContent = "お前はSLEか？やめろ！";
      btn.disabled = true;
      setTimeout(() => { btn.classList.remove("squished"); btn.disabled = false;
        bubble.textContent = "（復活した）……今のは構造的に理不尽だ。記録しておく。"; }, 4000);
      return;
    }
    if (!btn.classList.contains("squished")) bubble.textContent = set.lines[(taps - 1) % set.lines.length];
  };
}

// ---- NPCイベント・エンジン ----
function runTree(nodes, key, box, done, qkey) {
  const node = nodes[key];
  if (!node) { done(); return; }
  box.innerHTML = '<div class="event">' + (node.title ? '<div class="npc-name">' + esc(node.title) + "</div>" : "") +
    (node.price ? '<div class="nego-visual"><span class="nego-coins">💰🪙🪙🪙</span><span class="price-tag">提示 ' + node.price + ' コイン</span></div>' : "") +
    '<p class="event-text">' + esc(node.text) + "</p>" +
    '<div class="event-choices">' + node.choices.map((c, i) => '<button class="choice" data-ev="' + i + '">' + esc(c.t) + "</button>").join("") + "</div></div>";
  box.querySelectorAll("[data-ev]").forEach((b) => {
    b.onclick = () => {
      const c = node.choices[Number(b.dataset.ev)];
      if (c.score) Object.keys(c.score).forEach((ax) => addScore(ax, c.score[ax]));
      const f = EVENT_FIT[c.t];
      if (typeof f === "number" && qkey) state.fit[qkey] = (state.fit[qkey] || 0) + f;
      if (c.fitMap) Object.keys(c.fitMap).forEach((k) => { state.fit[k] = (state.fit[k] || 0) + c.fitMap[k]; });
      if (c.doku) growDoku(true);
      if (c.reaction) {
        box.innerHTML = '<div class="event">' + (c.finalPrice ? '<div class="nego-visual settled"><span class="nego-coins">💰</span><span class="price-tag">' + c.finalPrice + ' コインで決着</span></div>' : "") + '<p class="event-text">' + esc(c.reaction) + '</p><p class="center"><button id="ev-next">つづく</button></p></div>';
        document.getElementById("ev-next").onclick = () => {
          if (c.goto) runTree(nodes, c.goto, box, done, qkey); else done();
        };
      } else if (c.goto) runTree(nodes, c.goto, box, done, qkey);
      else done();
    };
  });
}
function startEvent(qkey) {
  const box = document.getElementById("event-box");
  if (!box) { finishEvent(); return; }
  if (qkey === "gamma") { runTree(NEGO, "start", box, finishEvent, "gamma"); return; }
  const ev = EVENTS[qkey];
  if (ev) runTree(ev.nodes, "start", box, finishEvent, qkey); else finishEvent();
}
function finishEvent() {
  const box = document.getElementById("event-box");
  if (box) box.innerHTML = "";
  const cb = document.getElementById("comfort-box");
  if (cb) cb.style.display = "grid";
}

// ---- 場面 ----
function renderScene() {
  stopAllTimers();
  const sc = SCENES[state.sceneIdx];
  const q = QUADRAS[sc.q];
  state.sceneStart = Date.now();
  const isDoku = (sc.q === "delta" || sc.q === "psi");
  app.innerHTML = '<div class="card">' + backHTML() + '<div class="progress">旅の場面 ' + (state.sceneIdx + 1) + " / 8</div>" +
    '<div class="scene-visual">' + svgMotif(sc.motif, sc.colors[0], sc.colors[1]) + "</div>" +
    '<h2 class="scene-name"><span class="scene-symbol">' + q.symbol + "</span> " + q.theme + "「" + q.scene + "」</h2>" +
    "<p>" + sc.air + '</p><div class="invite">' + sc.invite + "</div>" +
    charHTML(sc.char, sc.q) +
    '<div id="prop-box">' + propHTML(sc.q) + "</div>" +
    (isDoku ? dokuHTML() : "") +
    '<div id="event-box"></div>' +
    '<div class="comfort" id="comfort-box" style="display:none">' +
    '<button class="choice" data-c="2">ここ、好きだな。残りたい</button>' +
    '<button class="choice" data-c="0.5">まあ、居られる</button>' +
    '<button class="choice" data-c="-1.5">早く次へ行きたい</button></div></div>';
  bindBack();
  bindChar(sc.char, sc.q);
  bindProp(sc.q);
  if (isDoku) startDoku();
  startEvent(sc.q);
  function proceedScene(v) {
    stopAllTimers();
    state.comfort[sc.q] = v;
    state.dwell[sc.q] = Math.round((Date.now() - state.sceneStart) / 1000);
    Object.keys(sc.weights).forEach((ax) => addScore(ax, v * sc.weights[ax] * 5));
    state.sceneIdx++;
    if (state.sceneIdx < SCENES.length) enterStep(); else { state.taskIdx = 0; enterStep(); }
  }
  let leaveBlock = false;
  app.querySelectorAll("[data-c]").forEach((b) => {
    b.onclick = () => {
      const v = parseFloat(b.dataset.c);
      if (isDoku && v === -1.5 && !leaveBlock) {
        leaveBlock = true;
        growDoku(true);
        const cb = document.getElementById("comfort-box");
        cb.innerHTML = '<div class="event"><div class="npc-name">どこからか声がする</div>' +
          '<p class="event-text">「それを踏まえて、もう一度考えてみてください」——引く気配のない声と、視線の圧。ドクダミが1株、増えた。</p>' +
          '<div class="event-choices"><button class="choice" id="leave-stay">……もう少し居る</button>' +
          '<button class="choice" id="leave-go">それでも次へ行く</button></div></div>';
        document.getElementById("leave-stay").onclick = () => proceedScene(0.5);
        document.getElementById("leave-go").onclick = () => proceedScene(-1.5);
        return;
      }
      proceedScene(v);
    };
  });
}
// ---- タスク ----
function renderTask() {
  stopAllTimers();
  const t = TASKS[state.taskIdx];
  const head = backHTML() + '<div class="progress">観測タスク ' + (state.taskIdx + 1) + " / " + TASKS.length + "（" + t.id + "）</div>";
  if (t.type === "wait") return renderWait(t, head);
  if (t.type === "slider") return renderSlider(t, head);
  if (t.type === "seats") return renderSeats(t, head);
  if (t.type === "chips") return renderChips(t, head);
  let timerHTML = t.timed ? '<p>残り時間 <span class="timer" id="timer">0:10</span></p>' : "";
  app.innerHTML = '<div class="card">' + head + "<h2>" + t.title + "</h2><p>" + t.text + "</p>" + timerHTML +
    t.choices.map((c, i) => '<button class="choice" data-i="' + i + '">' + esc(c.t) + "</button>").join("") + "</div>";
  bindBack();
  const start = Date.now();
  if (t.timed) {
    let remain = 10;
    const el = document.getElementById("timer");
    const iv = setInterval(() => { remain--; if (el) el.textContent = "0:0" + Math.max(0, remain);
      if (remain <= 0) clearInterval(iv); }, 1000);
    app.dataset.iv = iv; taskTimer = iv;
  }
  app.querySelectorAll("[data-i]").forEach((b) => {
    b.onclick = () => {
      stopAllTimers();
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
  bindBack();
  let clicks = 0;
  document.getElementById("mash").onclick = () => { clicks++; document.getElementById("mashcount").textContent = clicks; };
  let pct = 0;
  const iv = setInterval(() => { pct += 4; const f = document.getElementById("waitfill");
    if (f) f.style.width = Math.min(100, pct) + "%";
    if (pct >= 100) { clearInterval(iv); taskTimer = null;
      addScore("A", clicks <= 1 ? -20 : clicks <= 4 ? -5 : clicks <= 8 ? 10 : 20);
      nextTask(); } }, 320);
  taskTimer = iv;
}
function lampRoomHTML() {
  return '<div class="lamp-room" id="lamp-room">' +
    '<div class="lamp-glow" id="lamp-glow"></div>' +
    '<svg viewBox="0 0 200 130" class="lamp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M100 0v26" stroke="#5a4a35" stroke-width="3"/>' +
    '<path d="M74 44a26 18 0 0 1 52 0z" fill="#7a5c3e"/>' +
    '<circle id="lamp-bulb" cx="100" cy="52" r="10" fill="#ffe9b0"/>' +
    '<rect x="34" y="104" width="132" height="7" rx="3" fill="#000" opacity=".18"/>' +
    '<rect x="52" y="86" width="30" height="18" rx="3" fill="#000" opacity=".12"/>' +
    '<rect x="122" y="80" width="24" height="24" rx="3" fill="#000" opacity=".10"/></svg></div>';
}
function mixColor(c1, c2, r) {
  const a = [parseInt(c1.slice(1, 3), 16), parseInt(c1.slice(3, 5), 16), parseInt(c1.slice(5, 7), 16)];
  const b = [parseInt(c2.slice(1, 3), 16), parseInt(c2.slice(3, 5), 16), parseInt(c2.slice(5, 7), 16)];
  return "rgb(" + a.map((v, i) => Math.round(v + (b[i] - v) * r)).join(",") + ")";
}
function renderSlider(t, head) {
  app.innerHTML = '<div class="card">' + head + "<h2>" + t.title + "</h2><p>" + t.text + "</p>" +
    '<p class="small">正解はない。あなたの感覚で「ちょうどいい」ところで止めて。</p>' +
    lampRoomHTML() +
    '<input type="range" id="slider" min="0" max="100" value="50">' +
    '<p class="center"><button id="decide">これで決める</button></p></div>';
  bindBack();
  const room = document.getElementById("lamp-room");
  const glow = document.getElementById("lamp-glow");
  const bulb = document.getElementById("lamp-bulb");
  function paint(v) {
    const r = v / 100;
    room.style.background = mixColor("#232c42", "#fdf0cd", r);
    glow.style.opacity = (0.15 + r * 0.85).toFixed(2);
    glow.style.transform = "translate(-50%,0) scale(" + (0.5 + r * 1.15).toFixed(2) + ")";
    bulb.setAttribute("fill", mixColor("#8a7a5c", "#ffdf8a", r));
  }
  paint(50);
  let changes = 0;
  const slider = document.getElementById("slider");
  slider.addEventListener("input", () => { changes++; paint(Number(slider.value)); });
  document.getElementById("decide").onclick = () => {
    addScore("A", changes <= 2 ? 15 : changes >= 8 ? -15 : 0);
    nextTask();
  };
}
function renderChips(t, head) {
  app.innerHTML = '<div class="card">' + head + "<h2>" + t.title + "</h2><p>" + t.text + "</p>" +
    '<p class="small">選んだ言葉は、押した順にそのまま並びます。</p>' +
    '<div class="chip-built" id="chip-built">（まだ選ばれていない）</div>' +
    '<div class="chip-pool">' + CHIPS.map((c, i) => '<button class="chip" data-chip="' + i + '">' + esc(c.t) + "</button>").join("") + "</div>" +
    '<p class="small center">選んだ数：<span id="chip-count">0</span> / 4</p>' +
    '<p class="center"><button id="chip-decide" disabled>この紹介文で決める</button></p>' +
    '<div id="chip-reaction"></div></div>';
  bindBack();
  const order = [];
  const built = document.getElementById("chip-built");
  const count = document.getElementById("chip-count");
  const decide = document.getElementById("chip-decide");
  function refresh() {
    built.textContent = order.length ? "「" + order.map((i) => CHIPS[i].d).join("、") + "、LSI芋虫です」" : "（まだ選ばれていない）";
    count.textContent = order.length;
    decide.disabled = order.length === 0;
  }
  app.querySelectorAll("[data-chip]").forEach((b) => {
    b.onclick = () => {
      const i = Number(b.dataset.chip);
      const at = order.indexOf(i);
      if (at >= 0) { order.splice(at, 1); b.classList.remove("selected"); }
      else if (order.length < 4) { order.push(i); b.classList.add("selected"); }
      refresh();
    };
  });
  decide.onclick = () => {
    let sum = 0;
    order.forEach((i) => { sum += CHIPS[i].v; });
    addScore("B", sum);
    decide.disabled = true;
    const kind = sum > 0 ? "plus" : (sum < 0 ? "minus" : "mixed");
    const pool = WORM_INTRO_REACTIONS[kind];
    const reply = pool[Math.floor(Math.random() * pool.length)];
    const box = document.getElementById("chip-reaction");
    box.innerHTML = '<div class="character"><span class="char-face-static">🐛</span><div class="char-name">紹介されたLSI芋虫</div><div><span class="bubble">' + esc(reply) + '</span></div></div>' +
      '<p class="center"><button id="chip-next">つづく</button></p>';
    document.getElementById("chip-next").onclick = () => nextTask();
  };
}function renderSeats(t, head) {
  app.innerHTML = '<div class="card">' + head + "<h2>" + t.title + "</h2><p>" + t.text + "</p>" +
    '<div class="seatmap">' + SEATS.map((s, i) => '<button class="choice" style="display:inline-block;width:auto" data-i="' + i + '">' + s.t + "</button>").join("") + "</div></div>";
  bindBack();
  app.querySelectorAll("[data-i]").forEach((b) => {
    b.onclick = () => { addScore("B", SEATS[Number(b.dataset.i)].v); nextTask(); };
  });
}
function nextTask() { state.taskIdx++; if (state.taskIdx < TASKS.length) enterStep(); else renderResult(); }

// ---- 結果 ----
function barHTML(leftLabel, rightLabel, v) {
  const pct = (v + 100) / 2;
  const fill = v < 0 ? 'left:' + pct + '%;width:' + (50 - pct) + '%' : 'left:50%;width:' + (pct - 50) + '%';
  return '<div class="bar-row"><span class="bar-label">' + leftLabel + '</span><div class="bar-track"><div class="bar-fill" style="' + fill + '"></div></div><span class="bar-label r">' + rightLabel + "</span></div>";
}
function affinityScores(A, B, C) {
  // 総合スコア＝軸成分（正規化して寄与を抑える・±35）＋場面成分（居心地±35＋イベントfit±25＋滞在±10＝±70）
  const axes = [A, B, C];
  const dwells = Object.values(state.dwell).slice().sort((a, b) => a - b);
  const median = dwells.length ? (dwells[Math.floor((dwells.length - 1) / 2)] + dwells[Math.ceil((dwells.length - 1) / 2)]) / 2 : 0;
  const parts = {};
  Object.values(QUADRAS).forEach((q) => {
    let axisRaw = 0;
    q.signs.forEach((sg, i) => { axisRaw += sg * axes[i]; });
    const axisComp = axisRaw / 300 * 35;
    const cv = state.comfort[q.key];
    const comfortComp = typeof cv === "number" ? (cv === 2 ? 35 : cv === 0.5 ? 12 : -35) : 0;
    const eventComp = Math.max(-25, Math.min(25, (state.fit[q.key] || 0) * 2.5));
    const d = state.dwell[q.key];
    let dwellComp = 0;
    if (typeof d === "number" && dwells.length) {
      dwellComp = d > median ? Math.min(10, (d - median) / 5) : (d < median ? -Math.min(10, (median - d) / 5) : 0);
    }
    const sceneComp = comfortComp + eventComp + dwellComp;
    parts[q.key] = { total: Math.round(axisComp + sceneComp), scene: sceneComp, axis: axisComp };
  });
  return parts;
}function rankBarHTML(rank, q, aff, min, max) {
  const pct = max > min ? Math.round(((aff - min) / (max - min)) * 88) + 8 : 50;
  return '<div class="rank-row"><span class="rank-num">' + rank + '位</span>' +
    '<span class="rank-name">' + q.symbol + " " + q.name + "「" + q.scene + "」</span>" +
    '<div class="bar-track"><div class="bar-fill" style="left:0;width:' + pct + '%"></div></div>' +
    '<span class="rank-score">' + aff + "</span></div>";
}
function saveResultImage(result, anti, ranking, aff) {
  const cv = document.createElement("canvas");
  cv.width = 840; cv.height = 1080;
  const g = cv.getContext("2d");
  g.fillStyle = "#f7f2e6"; g.fillRect(0, 0, 840, 1080);
  g.strokeStyle = "#3f6033"; g.lineWidth = 6; g.strokeRect(24, 24, 792, 1032);
  g.strokeStyle = "#b9c4a4"; g.lineWidth = 2; g.strokeRect(40, 40, 760, 1000);
  g.fillStyle = "#2b2622"; g.textAlign = "center";
  g.font = "26px sans-serif"; g.fillText("quadra-check｜あなたに合うクアドラはどれ？", 420, 92);
  g.font = "130px serif"; g.fillStyle = "#3f6033"; g.fillText(result.symbol, 420, 250);
  g.fillStyle = "#2b2622";
  g.font = "bold 46px sans-serif"; g.fillText(result.name + " ― " + result.theme, 420, 322);
  g.font = "30px sans-serif"; g.fillText("「" + result.scene + "」", 420, 368);
  if (state.name) { g.font = "26px sans-serif"; g.fillText(state.name + " さんの結果", 420, 420); }
  g.textAlign = "left";
  g.font = "28px sans-serif";
  g.fillText("アンチクアドラ：" + anti.symbol + " " + anti.name + "「" + anti.scene + "」", 90, 510);
  g.font = "bold 28px sans-serif"; g.fillText("合うクアドラランキング", 90, 585);
  g.font = "28px sans-serif";
  ranking.slice(0, 3).forEach((q, i) => {
    g.fillText((i + 1) + "位　" + q.symbol + " " + q.name + "「" + q.scene + "」（" + aff[q.key] + "）", 90, 640 + i * 54);
  });
  g.font = "23px sans-serif"; g.fillStyle = "#6d5f4d";
  g.fillText("結果は所属を決めるものじゃない。どの場の空気が楽か、という傾向。", 90, 950);
  g.fillText("quadra-check ― もふみつ工房", 90, 1005);
  cv.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "quadra-check-result.png";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  });
}
function renderResult() {
  stopAllTimers();
  const A = clamp(state.scores.A), B = clamp(state.scores.B), C = clamp(state.scores.C);
  const parts = affinityScores(A, B, C);
  const aff = {};
  Object.keys(parts).forEach((k) => { aff[k] = parts[k].total; });
  const ranking = Object.values(QUADRAS).slice().sort((x, y) => aff[y.key] - aff[x.key]);
  const result = ranking[0];
  // アンチは「場面での実体験」を強く反映：場面成分＋軸成分の半分。「早く離れたい」を選んだ場はさらに沈める
  let anti = null, antiScore = Infinity;
  Object.values(QUADRAS).forEach((q) => {
    if (q.key === result.key) return;
    let s = parts[q.key].scene + parts[q.key].axis * 0.5;
    if (state.comfort[q.key] === -1.5) s -= 15;
    if (s < antiScore) { antiScore = s; anti = q; }
  });
  const affVals = ranking.map((q) => aff[q.key]);
  const affMin = Math.min.apply(null, affVals), affMax = Math.max.apply(null, affVals);
  const who = state.name ? esc(state.name) + "さん" : "あなた";
  const dwellSorted = Object.keys(state.dwell).sort((x, y) => state.dwell[y] - state.dwell[x]);
  const longest = dwellSorted.length ? QUADRAS[dwellSorted[0]] : null;
  const shortest = dwellSorted.length ? QUADRAS[dwellSorted[dwellSorted.length - 1]] : null;
  const closing = (DARLING_CLOSING[result.key] || "").replace("{anti}", anti.symbol + " " + anti.name);
  app.innerHTML = '<div class="card result-card"><div class="result-deco l">' + dokuPlant() + '</div><div class="result-deco r">' + dokuPlant() + "</div>" +
    '<div class="result-symbol">' + result.symbol + "</div>" +
    "<h2 class='center'>" + who + "に合うクアドラは</h2>" +
    "<h1 class='center result-title'>" + result.symbol + " " + result.name + " ― " + result.theme + "「" + result.scene + "」</h1>" +
    "<p>" + result.desc + "</p>" +
    '<p class="small">このクアドラのタイプ候補：' + result.types + "</p>" +
    '<p class="small">この結果は、あなたが「所属するクアドラ」を決めるものじゃない。8つの場の中で、どの空気が楽に感じられたかという傾向にすぎない。別のクアドラの人と一緒にいて楽しい、なんてことは普通にあるし、クアドラが違うからこそ見える景色もある。</p>' +
    (state.selfType ? '<p class="small">あなたの自認：' + esc(state.selfType) + "</p>" : "") +
    "<h2>3軸パラメータ</h2>" +
    barHTML("周辺", "中心", A) + barHTML("民主", "貴族", B) + barHTML("主観", "客観", C) +
    "<h2>あなたに合うクアドラランキング</h2>" +
    ranking.map((q, i) => rankBarHTML(i + 1, q, aff[q.key], affMin, affMax)).join("") +
    "<h2>アンチクアドラ</h2>" +
    "<p><strong>" + anti.symbol + " " + anti.name + " ― " + anti.theme + "「" + anti.scene + "」</strong>：今回の旅で、最も遠かった場。アンチは符号の反転で自動的に決めたものじゃない。場面での居心地・イベントへの反応・滞在のしかた——旅での実体験から測った最下位で、特に「早く離れたい」と感じた場は強く沈むようにしてある。あの場の価値観が、あなたには一番遠かったということ。</p>" +
    (longest ? '<p class="small">旅の記録：一番長く留まった場は ' + longest.symbol + "「" + longest.scene + "」（" + state.dwell[longest.key] + "秒）、一番早く離れた場は " + shortest.symbol + "「" + shortest.scene + "」（" + state.dwell[shortest.key] + "秒）。</p>" : "") +
    '<div class="darling-block"><h2>ダーリンちゃんから</h2>' +
    '<div class="character"><span class="char-face-static">🥺</span><div class="char-name">ダーリンちゃん</div></div>' +
    '<p class="center"><span class="bubble">' + esc(closing) + "</span></p>" +
    '<p>ねぇダーリン♡ あなたは自分の所属するグループ（クアドラ）が大事？ それとも、グループの外の人と楽しくやる方？</p>' +
    '<input type="text" id="darling-answer" placeholder="自由に書いてね">' +
    '<p class="center"><button id="darling-send">答える</button></p>' +
    '<div id="darling-reply"></div></div>' +
    '<div class="share-row"><button id="btn-share">結果を共有</button><button class="ghost" id="btn-save-img">結果を画像で保存</button></div>' +
    '<p class="small center" id="share-msg"></p>' +
    '<p class="center"><button class="ghost" id="btn-again">もう一度旅する</button></p></div>';
  document.getElementById("btn-again").onclick = () => {
    state.scores = { A: 0, B: 0, C: 0 }; state.comfort = {}; state.dwell = {}; state.fit = {}; state.history = [];
    state.sceneIdx = 0; state.taskIdx = 0;
    renderTop();
  };
  document.getElementById("btn-share").onclick = async () => {
    const text = who + "に合うクアドラは " + result.symbol + " " + result.name + "「" + result.scene + "」でした（アンチ：" + anti.symbol + " " + anti.name + "）";
    const url = location.href;
    const msg = document.getElementById("share-msg");
    if (navigator.share) {
      try { await navigator.share({ title: "quadra-check", text: text, url: url }); } catch (e) { /* キャンセル時は何もしない */ }
    } else {
      try { await navigator.clipboard.writeText(text + " " + url); if (msg) msg.textContent = "結果テキストとURLをコピーしたよ"; }
      catch (e) { if (msg) msg.textContent = text + " " + url; }
    }
  };
  document.getElementById("btn-save-img").onclick = () => saveResultImage(result, anti, ranking, aff);
  document.getElementById("darling-send").onclick = () => {
    const text = document.getElementById("darling-answer").value;
    const box = document.getElementById("darling-reply");
    let hit = null;
    for (const cat of SE_CATEGORIES) {
      if (cat.keys.some((k) => text.includes(k))) { hit = cat; break; }
    }
    if (hit) {
      const reply = hit.replies[Math.floor(Math.random() * hit.replies.length)];
      box.innerHTML = '<p class="center"><span class="se-badge">Se検出</span></p>' +
        '<p class="center"><span class="bubble">' + esc(reply) + "</span></p>" +
        '<p class="small center">（ダーリンちゃん談：その言葉の選び方、Se語彙だったわよ♡）</p>';
    } else {
      const reply = DARLING_CALM[Math.floor(Math.random() * DARLING_CALM.length)];
      box.innerHTML = '<p class="center"><span class="bubble">' + esc(reply) + "</span></p>";
    }
  };
}

renderTop();
