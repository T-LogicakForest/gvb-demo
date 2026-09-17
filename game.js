


const GOLD_SPECIAL_POOL = {
  OH: ['ベンチの声援'],
  MB: ['鉄壁の中央', 'ベンチの声援'],
  OP: ['右翼砲台', 'ベンチの声援'],
  S: ['ベンチの声援'],
  L: ['ベンチの声援'],
};

const DELETED_GOLD_SPECIALS=new Set(["怪物エース", "勝負師", "高打点の王", "絶対ブロック", "空中支配", "右の要塞", "剛腕砲台", "勝負の右腕", "天才司令塔", "完全配球", "試合の支配者", "絶対守護神", "不落の守備範囲", "奇跡の一歩", "絶対守護領域", "威圧感", "春高の星", "インハイの星", "エースの風格", "絶対指揮官"]);

const NORMAL_SPECIAL_POOL = [
  '勝負強い',
  '重い球',
  '広い守備範囲',
  '読みのセッター',
  '高速トス',
  '対エースブロック',
  'ジャンプサーブ',
  'クイック職人',
  'サーブレシーブ職人',
  '守護神',
  'ムードメーカー',
  '二段トス適性',
  '冷静沈着',
  '流れを変える一本',
  'ブロックアウト',
  '狙い撃ち',
  '大舞台',
  '二段トス',
  'パワーヒッター',
  'サーブ職人',
  'フライングレシーブ',
  'ワンタッチ職人',
  '司令塔',
  'ツーアタック',
  'ワンチ回収',
  '対速攻〇',
  'ライト〇',
  '分析家',
  'ドライブ回転'
];

function isGoldSpecial(name) {
  return Object.values(GOLD_SPECIAL_POOL).some(list => list.includes(name));
}

const SPECIAL_DESCRIPTIONS={
  '勝負強い':'20点以降の勝負所で、サーブ・攻撃などの計算が少し強くなります。',
  '重い球':'スパイク時、確率で相手のディグ値を下げます。',
  '広い守備範囲':'ディグ時、守備範囲の良さで守備力が上がります。',
  '読みのセッター':'配球やトス判断に関わる能力です。セッターの安定感を高めます。',
  '高速トス':'テンポの速い攻撃を作りやすくなります。',
  '対エースブロック':'相手エースに対するブロックで力を発揮します。',
  'ジャンプサーブ':'サーブ威力が上がる代わりに、制球が少し下がります。',
  'クイック職人':'クイック攻撃（Aクイック・Cクイック・平行攻撃）のとき、決定力が1.12倍になります。',
  'サーブレシーブ職人':'サーブレシーブ時、レセプション値が上がります。',
  '守護神':'レセプション・ディグ失敗を崩れに抑えることがあります。',
  'ムードメーカー':'プレーに関わるたび、チームの偏り累計に+0.03します。',
  '二段トス適性':'崩れた場面からの攻撃でミス率を抑えます。',
  '冷静沈着':'不調時の悪影響を軽減します。',
  '流れを変える一本':'劣勢や重要局面で流れを変えるプレーが出やすくなります。',
  'ブロックアウト':'コース打ちC以上で取得可能。ワンタッチ判定時、コース打ち÷100の確率でブロックアウト得点を狙います。',
  '狙い撃ち':'相手の弱い守備者を狙いやすくなります。',
  '大舞台':'全国大会中、身長以外の能力が試合計算上3%上がります。',
  '鉄壁の中央':'金特殊能力。MB向け。ブロック評価A以上、またはシャットアウト・リードの両方がA以上で取得可能。中央ブロッカー時、主ブロック値×1.18、隣接ブロック支援×1.08。',
  '右翼砲台':'金特殊能力。OP向け。左利き、スパイク評価A以上、ジャンプA以上で取得可能。OP攻撃時、攻撃値×1.15。Aカット時はさらに×1.05。',
  '二段トス':'コース打ちB以上で取得可能。崩れたトスからのアタック時、崩れトスのマイナス補正を1緩和します。',
  'パワーヒッター':'ワンタッチ判定時、ディグ難度にかかるワンタッチ係数を0.10下げます。',
  'サーブ職人':'サーブ威力またはサーブ制球C以上で取得可能。サーブ時、サーブ制球が5%上がります。',
  'フライングレシーブ':'ディグD以上・守備範囲D以上で取得可能。レセプションまたはディグ判定時、20%で値が1.05倍になります。',
  'ワンタッチ職人':'ブロックでワンタッチ判定になった時、ワンタッチ係数を10%上げます。',
  '司令塔':'トス読みB以上で取得可能。最も有利なアタッカーへの配球時、トス読み補正が50%増えます。',
  'ツーアタック':'左利き・トス総合B以上・スパイク決定力B以上で取得可能。ツーアタック発動率が2.5倍、威力計算が1.05倍になります。',
  '神童':'一般入部時、上限のポジション評価になった選手に低確率で付与。練習の伸びが常に大きくなります。',
  '怪物':'一般入部時、上限評価かつスパイク決定力・身長・ジャンプがC以上の選手に低確率で付与。スパイク・ブロック・ジャンプ・身長がとても伸びやすく、その代わりレシーブ・トス・メンタルは伸びにくくなります。',
  '努力の天才':'選手生成時に低確率で付与。2年時から伸びが良くなり、3年時にはさらに大きく伸びます。',
  '転生OG':'伝説級OGの再来。全国大会出場校以上の格で出現します。練習の伸びが常に大きく、生成時にOGタイプに応じた能力傾向を持ちます。',
  'ワンチ回収':'コース打ちC以上で取得可能。シャットアウト回避フェイント判定に成功した時、自チームのAカット状態から攻撃を始め直します。',
  '威圧感':'金特殊能力。いずれかの能力A以上で取得可能。相手のランダム補正のプラス上限を10%下げます。',
  'ブロード':'身長またはジャンプC以上で取得可能。OP配置時、崩れ以外のアタックで10%の確率でセンターブロックの応援をキャンセルします。',
  'Bクイック':'身長またはジャンプC以上で取得可能。MB配置時、崩れ以外のアタックで10%の確率で相手のレフトブロッカーのみとの勝負にします。',
  '対速攻〇':'ブロックまたはリードC以上で取得可能。相手のクイック攻撃時にブロッカーになるとブロック値が1.1倍になります。',
  'ライト〇':'右利きでOPに入った時のアタック減衰がなくなります。',
  '春高の星':'金特殊能力。過去に春高全国大会でスタメン出場した選手が取得可能。春高全国大会時、身長以外の能力が1.1倍になります。',
  'インハイの星':'金特殊能力。過去にインハイ全国大会でスタメン出場した選手が取得可能。インハイ全国大会時、身長以外の能力が1.1倍になります。',
  '分析家':'試合から得るものが人より大きい選手です。'
};
function specialDescription(name){
  return SPECIAL_DESCRIPTIONS[name]||'特殊能力です。試合中またはイベントで有利な効果を発揮します。';
}
function escapeAttrText(s){
  return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function specialChipHtml(name) {
  const cls = isGoldSpecial(name) ? 'gold-special-chip' : 'special-chip';
  return `<span class="${cls} special-tooltip" tabindex="0" data-tip="${escapeAttrText(specialDescription(name))}">${name}</span>`;
}

let currentRallyScore={own:0,opp:0};
let currentAttackTeam=null;
let currentAttackQuality='';
let currentAttackSetterId=null;
let currentMatchTournamentType=null;
let currentLogOpponentPlayers=null;
let currentLastPointOwn=null;
let watchMatchSession=null;
// ============================================================
// v176: セーブ領域と、その可用性チェック
// ============================================================
// file:// で開いたとき、localStorage のオリジンはフォルダを問わず "file://" ひとつになる
// （Chromiumで実測）。体験版と製品版を別フォルダに置いても保存領域が丸ごと共通になり、
// 片方がもう片方のセーブを上書きしてしまう。そこで体験版だけキーを分ける。
// 製品版のキーは従来のままなので、既存のセーブはそのまま引き継がれる。
// 体験版から製品版への持ち込みは、終了画面の「セーブを書き出す」→「ファイルから読み込む」で行う。
const STORAGE_KEY_BASE='wakaba-mvp-save-v16';
const STORAGE_KEY=STORAGE_KEY_BASE+(isDemoBuild()?'-demo':'');

// localStorage / sessionStorage は、プライベートウィンドウやサイトデータ遮断の設定で
// 参照しただけで例外を投げることがある。素で触ると起動そのものが止まるので、必ずここを通す。
let storageStatusCache=null;
function checkStorageAvailability(){
  if(storageStatusCache)return storageStatusCache;
  let ok=false,reason='';
  try{
    if(typeof localStorage==='undefined'||!localStorage)throw new Error('unavailable');
    const probe=STORAGE_KEY+'-probe';
    localStorage.setItem(probe,'1');
    const back=localStorage.getItem(probe);
    localStorage.removeItem(probe);
    if(back!=='1')throw new Error('readback');
    ok=true;
  }catch(e){
    ok=false;
    reason=(e&&(e.name||e.message))||'error';
  }
  storageStatusCache={ok,reason};
  return storageStatusCache;
}
function storageAvailable(){return checkStorageAvailability().ok;}
function lsGet(key){try{return localStorage.getItem(key);}catch(e){return null;}}
function lsSet(key,val){try{localStorage.setItem(key,val);return true;}catch(e){return false;}}
function lsRemove(key){try{localStorage.removeItem(key);return true;}catch(e){return false;}}
// sessionStorage が使えないと、タイトル画面の出し分け（このタブで開始済みか）が
// 毎回 false になり、renderAll のたびにタイトル画面がゲームの上に戻ってきて先へ進めなくなる。
// 実ブラウザで再現を確認したうえで、使えないときはメモリに退避する。
// タブ内では正しく動き、リロードでタイトルへ戻るのは元の挙動と同じ。
let sessionFallback=false;
const memSession=Object.create(null);
function ssGet(key){
  if(!sessionFallback){try{return sessionStorage.getItem(key);}catch(e){sessionFallback=true;}}
  return (key in memSession)?memSession[key]:null;
}
function ssSet(key,val){
  if(!sessionFallback){try{sessionStorage.setItem(key,String(val));return true;}catch(e){sessionFallback=true;}}
  memSession[key]=String(val);
  return false;
}
function ssRemove(key){
  if(!sessionFallback){try{sessionStorage.removeItem(key);return true;}catch(e){sessionFallback=true;}}
  delete memSession[key];
  return false;
}
const MONTHS=['4月','5月','6月','7月','8月','9月','10月','11月','12月','1月','2月','3月'];
function isMarchMonth(){return state?.monthIndex===11 || MONTHS[state?.monthIndex]==='3月';}
const COMP_KEYS=['spikePower','spikeControl','recReception','recDig','recRange','blockRead','blockStuff','servePower','serveControl','tossAccuracy','tossRead','jump','stamina','mental'];
// ============================================================
// v195: 選手の性格（Tak指示）
//   目的：ランダム生成選手にも育ち方の個性を出す。試合中の性格AIは入れず、成長補正だけに限定する。
//   伸びやすい能力は ×1.15、伸びにくい能力は ×0.90。記載のない能力は ×1.00。
//   ・性格によって初期能力そのものは変えない。
//   ・性格とポジションは紐づけない（負けず嫌いのL、献身的なOPなども普通に出る）。
//   ・内部倍率は画面に表示しない。
// ============================================================
const PERSONALITY_TYPES=['普通','負けず嫌い','冷静','献身的','熱血'];
const PERSONALITY_GROWTH={
  '普通':{},
  '負けず嫌い':{spikePower:1.15,jump:1.15,servePower:1.15,mental:1.15,recReception:0.90,recDig:0.90},
  '冷静':{tossAccuracy:1.15,tossRead:1.15,blockRead:1.15,serveControl:1.15,spikePower:0.90,jump:0.90},
  '献身的':{recReception:1.15,recDig:1.15,recRange:1.15,blockRead:1.15,spikePower:0.90,servePower:0.90},
  '熱血':{stamina:1.15,mental:1.15,jump:1.15,blockStuff:1.15,tossAccuracy:0.90,serveControl:0.90}
};
// 画面に出す説明。倍率そのものは見せない。
const PERSONALITY_HINTS={
  '普通':'得意も苦手もなく、どの能力もまんべんなく伸びます。',
  '負けず嫌い':'攻撃的な能力が伸びやすく、レシーブの能力は伸びにくい。',
  '冷静':'トスと読みの能力が伸びやすく、攻撃の能力は伸びにくい。',
  '献身的':'守備の能力が伸びやすく、攻撃の能力は伸びにくい。',
  '熱血':'体力と粘りの能力が伸びやすく、細かい制球の能力は伸びにくい。'
};
function personalityXpMultiplier(player,key){
  const t=PERSONALITY_GROWTH[player&&player.personality];
  if(!t)return 1;
  return t[key]||1;
}
// 旧セーブの補完用。選手IDから決まる割当なので、試合や新入部員生成の乱数列を消費しない。
// v203: 性格の出方を「普通50%／負けず嫌い・冷静・献身的・熱血を各12.5%」にする（Supabase登録の仕様）。
//        以前は5種類を均等（各20%）に引いていた。
const PERSONALITY_SPECIAL_TYPES=['負けず嫌い','冷静','献身的','熱血'];
function rollPersonality(){
  if(Math.random()<0.5)return '普通';
  return randomChoice(PERSONALITY_SPECIAL_TYPES);
}
// v203: 旧セーブの補完用。選手IDから決定的に割り当てるので、試合や新入部員生成の
//        乱数列を消費しない。出方の比率は新規生成と同じ「普通50%／他4種 各12.5%」。
const PERSONALITY_WEIGHTED_SLOTS=['普通','普通','普通','普通','負けず嫌い','冷静','献身的','熱血'];
function personalityFromId(id){
  const str=String(id||'');
  let h=0;
  for(let i=0;i<str.length;i++)h=(h*31+str.charCodeAt(i))>>>0;
  return PERSONALITY_WEIGHTED_SLOTS[h%PERSONALITY_WEIGHTED_SLOTS.length];
}
function ensurePersonality(player){
  if(!player)return;
  if(typeof player.personality!=='string'||!PERSONALITY_TYPES.includes(player.personality)){
    player.personality=personalityFromId(player.id||player.name);
  }
}
function personalityChipHtml(player){
  const t=player&&player.personality;
  if(!PERSONALITY_TYPES.includes(t))return '';
  return `<span class="personality-chip" title="${PERSONALITY_HINTS[t]||''}" onclick="showPersonalityHint('${t}')">性格：${t}</span>`;
}
// 性格名を押したときの説明。倍率は出さず、傾向だけを伝える。
function showPersonalityHint(type){
  if(!PERSONALITY_HINTS[type])return;
  managerSay(`${type}：${PERSONALITY_HINTS[type]}`);
}
if(typeof window!=='undefined')window.showPersonalityHint=showPersonalityHint;
const STAT_LABEL_ASSETS={
 spike:'assets/ui_label_spike.png',
 receive:'assets/ui_label_receive.png',
 block:'assets/ui_label_block.png',
 serve:'assets/ui_label_serve.png',
 toss:'assets/ui_label_toss.png',
 jump:'assets/ui_label_jump.png',
 height:'assets/ui_label_height.png'
};
// v78: 新入部員の評価上限と人数のカーブを寝かせた。
// 学校格が上がると新入部員の質と人数が同時に跳ね上がり、
// 「地区決勝に1回勝つ→翌年から一気に強くなる」正のフィードバックが効きすぎていたため。
// 旧値: 中堅max12/6〜8人, 全国出場max14/9〜12人, 強豪max15/10〜13人, 名門max16/10〜14人
// v80: scoutGreat（スカウト大成功）を「通常入部の評価上限 ±1」に揃えた。
//      旧値: 新設[8,10] 弱小[9,11] 中堅[11,12] 全国出場[13,14] 強豪[15,16] 名門[15,17]
// v81: scoutSuccess（スカウト成功）を「通常入部の評価上限 -3〜-1」に揃えた。
//      旧値のままだと強豪校[11,15]・名門校[12,16]で成功の上限が大成功の上限を上回っていた。
//      これで 成功 < 大成功 < 通常入部の上限+1 の順序が常に保たれる。
const SCHOOL_CLASSES={
 '新設校':{min:5,max:8,recruits:[3,5],scoutSuccess:[5,7],scoutGreat:[7,9]},
 '弱小校':{min:6,max:10,recruits:[4,6],scoutSuccess:[7,9],scoutGreat:[9,11]},
 '中堅校':{min:7,max:11,recruits:[5,7],scoutSuccess:[8,10],scoutGreat:[10,12]},
 '全国大会出場校':{min:8,max:12,recruits:[6,9],scoutSuccess:[9,11],scoutGreat:[11,13]},
 '強豪校':{min:10,max:13,recruits:[8,10],scoutSuccess:[10,12],scoutGreat:[12,14]},
 '名門校':{min:10,max:14,recruits:[9,12],scoutSuccess:[11,13],scoutGreat:[13,15]}
};
// v157: 控えの人数。ensureData より前で宣言しないとTDZで起動できない。
const BENCH_SIZE=7;
// ===== v161: 疲労システム =====
// 内部は疲労度0〜100で持ち、画面には「元気度＝100−疲労度」を出す。
const FATIGUE_MAX=100;
const FATIGUE_REST_THRESHOLD=60;   // これ以上で週の練習を自動的に休む
const FATIGUE_REST_RECOVER=60;     // 自動休息・休息メニューの回復量
const FATIGUE_TRAIN_BASE=15;       // 通常練習の基本疲労
const FATIGUE_TRAIN_PER_LEVEL=2;   // 練習レベル1ごとの追加
const FATIGUE_DEV_SQUAD_EXTRA=5;   // 育成組の追加疲労
const FATIGUE_TRAIN_MOTIVATION_RELIEF=3; // v168: モチベ管理レベル1つにつき、練習の疲労を軽くする量
const FATIGUE_DEV_SQUAD_XP=5;      // 育成組の重点能力への追加XP
// 元気度の段階。境界は疲労度で持つ。
const GENKI_STAGES=[
  {key:'fresh', label:'元気',   maxFatigue:39,  mult:1.00},
  {key:'light', label:'軽疲労', maxFatigue:49,  mult:0.90},
  {key:'mid',   label:'中疲労', maxFatigue:59,  mult:0.80},
  {key:'rest',  label:'要休息', maxFatigue:100, mult:0.80}
];
function fatigueOf(p){ return clamp(Math.round(Number(p&&p.fatigue||0)),0,FATIGUE_MAX); }
// v205: 練習試合・強化試合・OG戦が組まれている間は、試合前の選手カードの元気度も100として見せる（Tak指示）。
//        実際の p.fatigue は書き換えない。試合が始まると beginPracticeMatchStamina が実際に0にするので、
//        「試合前のカードは疲れているのに、試合に入ると全快になる」という食い違いがなくなる。
//        休養の目安計算（restWeeksNeeded）や自動休息の判定には使わない＝表示だけの扱い。
function displayFatigueOf(p){
  if(practiceMatchActive())return 0;
  return fatigueOf(p);
}
// v161: 元気度のUI。バーは満タンから減り、緑→黄→橙→赤に変わる。
const GENKI_COLORS={fresh:'#16a34a',light:'#eab308',mid:'#f97316',rest:'#dc2626'};
const GENKI_ICON_COLORS={fresh:'#16a34a',light:'#ca8a04',mid:'#ea580c',rest:'#dc2626'};
// 目だけで4段階を描き分ける。縦楕円→点→短い横線→小さめのバツ。
function genkiFaceSvg(p,size=20){
  const st=genkiStage(p), c=GENKI_ICON_COLORS[st.key];
  const small=size<=16;
  const sw=small?4:(size<=22?3.4:3);
  const ew=small?4.2:(size<=22?3.6:3.2);
  let eyes='';
  if(st.key==='fresh'){
    const rx=small?2.7:(size<=22?2.3:2.0), ry=small?4.7:(size<=22?4.3:3.9);
    eyes=`<ellipse cx="18" cy="23" rx="${rx}" ry="${ry}" fill="${c}"/><ellipse cx="30" cy="23" rx="${rx}" ry="${ry}" fill="${c}"/>`;
  }else if(st.key==='light'){
    const r=small?3:(size<=22?2.6:2.4);
    eyes=`<circle cx="18" cy="23" r="${r}" fill="${c}"/><circle cx="30" cy="23" r="${r}" fill="${c}"/>`;
  }else if(st.key==='mid'){
    eyes=`<path d="M15 23 h6 M27 23 h6" fill="none" stroke="${c}" stroke-width="${ew}" stroke-linecap="round"/>`;
  }else{
    eyes=`<path d="M15 20 l6 6 M21 20 l-6 6 M27 20 l6 6 M33 20 l-6 6" fill="none" stroke="${c}" stroke-width="${ew}" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 48 48" class="genki-face" style="width:${size}px;height:${size}px" aria-hidden="true"><circle cx="24" cy="24" r="17" fill="none" stroke="${c}" stroke-width="${sw}"/>${eyes}</svg>`;
}
function genkiBarHtml(p){
  const st=genkiStage(p), g=genkiOf(p);
  return `<div class="genki-bar" title="元気度 ${g}"><div class="genki-bar-fill" style="width:${g}%;background:${GENKI_COLORS[st.key]}"></div></div>`;
}
function genkiBadgeHtml(p,opt={}){
  const st=genkiStage(p), g=genkiOf(p);
  const size=opt.size||14;
  const text=opt.labelOnly?st.label:(opt.numberOnly?String(g):`${st.label} ${g}`);
  return `<span class="genki-badge genki-${st.key}">${genkiFaceSvg(p,size)}${text}</span>`;
}
// v162: チーム画面用。アイコンだけを出す。
function genkiIconHtml(p,size=18){
  const st=genkiStage(p);
  return `<span class="genki-icon-only genki-${st.key}" title="元気度 ${genkiOf(p)}（${st.label}）">${genkiFaceSvg(p,size)}</span>`;
}
function genkiRowHtml(p){
  return `<div class="genki-row">${genkiBarHtml(p)}${genkiBadgeHtml(p)}</div>`;
}
function genkiOf(p){ return FATIGUE_MAX-displayFatigueOf(p); }
function genkiStage(p){
  const f=displayFatigueOf(p);
  return GENKI_STAGES.find(g=>f<=g.maxFatigue)||GENKI_STAGES[GENKI_STAGES.length-1];
}
// 疲労による試合能力の倍率。身長は対象外なので、この倍率を掛ける側で除外する。
// v193: 練習試合・U-18日本代表戦・OG特別試合は体力全快の状態で行う（Tak指示）。
//        この3つはいずれも setPracticeMatch() で組まれるため practiceMatchActive() が真になる。
//        （U-18は {u18Annual:true}、OG戦は {ogMatch:true} のフラグ付きで同じ仕組みに乗っている）
//        疲労による能力低下を無効にする。交代で入るベンチ選手にも同じように効く。
//        実際の疲労値（p.fatigue）は書き換えないので、これらの試合が全回復手段にはならない。
// v199: v193では計算だけを全快扱いにしていたため、画面の元気度は疲れたままで
//        「体力が全快していない」ように見えていた（Tak指摘）。
//        beginPracticeMatchStamina() で試合開始時に実際の疲労値を0にし、
//        endPracticeMatchStamina() で試合後に元の値へ戻す方式に変えた。
//        これで画面表示も全快になり、消費0・持ち越しなし・全回復手段にもならない、が揃う。
function fatigueMod(p){ if(practiceMatchActive())return 1; return genkiStage(p).mult; }
// v199: 練習試合系（練習試合・U-18日本代表戦・OG特別試合）の間だけ、全員の疲労を0にする。
//        元の値は state.practiceStaminaBackup に預け、試合が終わったら戻す。
//        セーブされる場所へ預けるので、途中でリロードしても元に戻せる。
function beginPracticeMatchStamina(){
  if(!practiceMatchActive())return;
  if(state.practiceStaminaBackup)return;
  const bk={};
  (state.players||[]).forEach(p=>{
    bk[p.id]={f:Number(p.fatigue)||0,c:Number(p.matchFatigueCarry)||0};
    p.fatigue=0;
    p.matchFatigueCarry=0;
  });
  state.practiceStaminaBackup=bk;
}
function endPracticeMatchStamina(){
  const bk=state.practiceStaminaBackup;
  if(!bk)return;
  (state.players||[]).forEach(p=>{
    const v=bk[p.id];
    if(!v)return;
    p.fatigue=clamp(Number(v.f)||0,0,FATIGUE_MAX);
    p.matchFatigueCarry=Number(v.c)||0;
  });
  state.practiceStaminaBackup=null;
}
function addFatigue(p,amount){
  if(!p)return 0;
  const before=fatigueOf(p);
  p.fatigue=clamp(before+Math.round(Number(amount)||0),0,FATIGUE_MAX);
  return p.fatigue-before;
}
function recoverFatigue(p,amount){ return -addFatigue(p,-Math.abs(Number(amount)||0)); }
function recoverFatigueAll(amount,logs=null,label=''){
  const arr=(state.players||[]);
  let n=0;
  arr.forEach(p=>{ if(recoverFatigue(p,amount)>0)n++; });
  if(logs&&n)logs.push(`${label?label+'：':''}部員の疲労が回復しました（元気度 +${Math.round(amount)}）。`);
  return n;
}
// 育成組＝登録14名（スタメン6＋リベロ＋控え7）以外の部員。最大23名。
function registeredMemberIds(){
  const ids=[...(state.starterIds||[]).slice(0,6), state.liberoId, ...(state.benchIds||[])].filter(Boolean);
  return new Set(ids);
}
function developmentSquadPlayers(){
  const reg=registeredMemberIds();
  return (state.players||[]).filter(p=>p&&!reg.has(p.id));
}
function isDevelopmentSquad(p){ return !!p && !registeredMemberIds().has(p.id); }
function trainingFatigueFor(p,lv){
  const base=FATIGUE_TRAIN_BASE + effectiveTrainingLevel(lv)*FATIGUE_TRAIN_PER_LEVEL + (isDevelopmentSquad(p)?FATIGUE_DEV_SQUAD_EXTRA:0);
  // v168: 監督のモチベ管理（レクリエーション）のレベルが1上がるごとに、練習の疲労を3減らす。
  //        Lv1が基準なので (Lv-1)×3。Lv5なら-12。0未満にはしない。
  const relief=Math.max(0,coachMotivationLevel()-1)*FATIGUE_TRAIN_MOTIVATION_RELIEF;
  return Math.max(0, base-relief);
}
const POSITIONS=['OH','MB','OP','S','L'];
const regularTrainingMenus=[
 {id:'omakase',name:'おまかせ',type:'omakase',keys:[],cat:'team'},
 {id:'side_attack',name:'強打スパイク練習',type:'composite',cat:'spike',effects:{spikePower:10,jump:6,recDig:2,spikeControl:2}},
 {id:'receive_foundation',name:'守備基礎レシーブ練習',type:'composite',cat:'receive',effects:{recDig:8,recRange:4,recReception:8}},
 {id:'block_reaction',name:'ブロック反応練習',type:'composite',cat:'block',effects:{blockStuff:8,jump:6,blockRead:4,spikeControl:2}},
 {id:'serve_receive',name:'サーブ＆レセプション練習',type:'composite',cat:'serve',effects:{servePower:12,serveControl:6,recReception:4}},
 {id:'setter_build',name:'セッター育成',type:'composite',cat:'toss',effects:{tossAccuracy:11,tossRead:5,blockRead:2,jump:2}},
 {id:'form_check',name:'基本フォームチェック',type:'composite',cat:'skill',effects:{spikeControl:6,serveControl:6,recReception:6,recRange:3}},
 {id:'tactical_instruction',name:'戦術理解ミーティング',type:'composite',cat:'tactics',effects:{spikeControl:2,blockRead:6,tossRead:6,serveControl:3,recRange:5}},
 {id:'jump_training',name:'ジャンプ強化トレーニング',type:'composite',cat:'physical',effects:{jump:10,spikePower:4,servePower:4,blockStuff:2}},
 // v161: 休息。練習XPは入らず、疲労だけを回復する。
 {id:'rest',name:'休息',type:'rest',cat:'rest',effects:null}
];
const individualTrainingMenus=[
 {id:'omakase',name:'おまかせ',type:'omakase',keys:[],cat:'team'},
 {id:'spikePower',name:'個人指導：スパイク決定力',type:'single',keys:['spikePower'],cat:'spike'},
 {id:'spikeControl',name:'個人指導：コース打ち',type:'single',keys:['spikeControl'],cat:'spike'},
 {id:'recReception',name:'個人指導：レセプション',type:'single',keys:['recReception'],cat:'receive'},
 {id:'recDig',name:'個人指導：ディグ',type:'single',keys:['recDig'],cat:'receive'},
 {id:'recRange',name:'個人指導：守備範囲',type:'single',keys:['recRange'],cat:'receive'},
 {id:'blockStuff',name:'個人指導：シャットアウト',type:'single',keys:['blockStuff'],cat:'block'},
 {id:'blockRead',name:'個人指導：リード',type:'single',keys:['blockRead'],cat:'block'},
 {id:'servePower',name:'個人指導：サーブ威力',type:'single',keys:['servePower'],cat:'serve'},
 {id:'serveControl',name:'個人指導：サーブ制球',type:'single',keys:['serveControl'],cat:'serve'},
 {id:'tossAccuracy',name:'個人指導：トス正確性',type:'single',keys:['tossAccuracy'],cat:'toss'},
 {id:'tossRead',name:'個人指導：トス読み',type:'single',keys:['tossRead'],cat:'toss'},
 {id:'jump',name:'個人指導：ジャンプ',type:'jump',keys:['jump'],cat:'physical'}
];
// v181: 監督行動の練習メニューから「おまかせ」を外した（Tak指示）。12種を1行4枚で並べる。
// チーム画面の選手ごとの「練習設定」は regularTrainingMenus を使う別物なので、こちらは従来どおり。
function coachIndividualTrainingMenus(){
  return individualTrainingMenus.filter(m=>m.type==='single' || m.type==='jump');
}
const trainingMenus=[...regularTrainingMenus,...individualTrainingMenus.filter(m=>m.id!=='omakase')];
const opponentTemplate={name:'東峰女学院',basePower:11,setter:'tsudaka',libero:'mizuharaL',rotation:['sawamura','mabuchi','maebara','tsudaka','ishioka','hikawa'],players:{
 sawamura:{id:'sawamura',name:'沢村',role:'OH',portrait:'assets/opp_sawamura.png',height:172,spikePower:18,spikeControl:16,recReception:13,recDig:13,recRange:12,blockRead:12,blockStuff:12,servePower:16,serveControl:14,tossAccuracy:7,tossRead:7,jump:15,stamina:15,mental:15},hikawa:{id:'hikawa',name:'氷川',role:'OH',portrait:'assets/opp_hikawa.png',height:168,spikePower:15,spikeControl:14,recReception:14,recDig:14,recRange:14,blockRead:10,blockStuff:11,servePower:12,serveControl:14,tossAccuracy:7,tossRead:7,jump:13,stamina:14,mental:14},maebara:{id:'maebara',name:'前原',role:'OP',portrait:'assets/opp_maebara.png',height:173,spikePower:16,spikeControl:13,recReception:11,recDig:10,recRange:10,blockRead:13,blockStuff:14,servePower:13,serveControl:13,tossAccuracy:6,tossRead:6,jump:14,stamina:15,mental:14},mabuchi:{id:'mabuchi',name:'真壁',role:'MB',portrait:'assets/opp_mabuchi.png',height:178,spikePower:12,spikeControl:12,recReception:7,recDig:8,recRange:8,blockRead:17,blockStuff:19,servePower:10,serveControl:11,tossAccuracy:5,tossRead:5,jump:14,stamina:14,mental:15},ishioka:{id:'ishioka',name:'石岡',role:'MB',portrait:'assets/opp_ishioka.png',height:176,spikePower:11,spikeControl:11,recReception:7,recDig:7,recRange:8,blockRead:15,blockStuff:17,servePower:10,serveControl:10,tossAccuracy:5,tossRead:5,jump:13,stamina:14,mental:13},tsudaka:{id:'tsudaka',name:'津高',role:'S',portrait:'assets/opp2_tsudaka.png',height:166,spikePower:8,spikeControl:8,recReception:12,recDig:11,recRange:11,blockRead:10,blockStuff:9,servePower:10,serveControl:13,tossAccuracy:17,tossRead:14,jump:10,stamina:14,mental:15},mizuharaL:{id:'mizuharaL',name:'水原',role:'L',portrait:'assets/opp2_mizuharaL.png',height:159,spikePower:5,spikeControl:6,recReception:17,recDig:17,recRange:16,blockRead:4,blockStuff:4,servePower:8,serveControl:12,tossAccuracy:9,tossRead:8,jump:8,stamina:17,mental:16},
opp_bench1:{id:'opp_bench1',name:'大鳥',role:'OH',portrait:'assets/opp2_bench1.png',height:170,spikePower:14,spikeControl:13,recReception:13,recDig:13,recRange:13,blockRead:10,blockStuff:10,servePower:12,serveControl:12,tossAccuracy:6,tossRead:6,jump:13,stamina:13,mental:13},
opp_bench2:{id:'opp_bench2',name:'篠宮',role:'MB',portrait:'assets/opp2_bench2.png',height:177,spikePower:11,spikeControl:11,recReception:7,recDig:7,recRange:8,blockRead:14,blockStuff:16,servePower:10,serveControl:10,tossAccuracy:5,tossRead:5,jump:13,stamina:13,mental:13},
opp_bench3:{id:'opp_bench3',name:'小清水',role:'S',portrait:'assets/opp2_bench3.png',height:165,spikePower:7,spikeControl:8,recReception:12,recDig:12,recRange:11,blockRead:8,blockStuff:8,servePower:10,serveControl:12,tossAccuracy:15,tossRead:14,jump:10,stamina:13,mental:14}}};
function defaultHandForRole(role){
  // 現実の左利き比率に近づけ、全体で約10%程度にする
  return Math.random()<0.10?'左':'右';
}
function generatedHandForRecruit(pos, isScout=false){
  if(isScout && pos==='OP')return Math.random()<0.75?'左':'右';
  if(isScout && pos==='S')return Math.random()<0.30?'左':'右';
  return defaultHandForRole(pos);
}
function handLabel(p){return (p&&p.hand)==='左'?'左利き':'右利き';}
function handShort(p){return (p&&p.hand)==='左'?'左':'右';}
function handBadgeHtml(p){return `<span class="hand-badge hand-${handShort(p)}" title="${handLabel(p)}">${handShort(p)}</span>`;}
function handShort(p){return (p&&p.hand)==='左'?'左':'右';}
function handBadgeHtml(p){return `<span class="hand-badge ${handShort(p)==='左'?'lefty':'righty'}" title="${handLabel(p)}">${handShort(p)}</span>`;}
function p(id,name,year,role,subRole,portrait,height,growth,starter,mood,special,comps,hand=null){return{id,name,year,role,subRole,portrait,height,growth,starter,mood,special,comps,compXp:{},heightXp:0,hand:hand||defaultHandForRole(role)};}
function initialSchoolComps(role, bonus=0, seed=0){
  const base={};
  COMP_KEYS.forEach((k,i)=>{base[k]=clamp(6+((seed+i*7)%3)+bonus,1,25);});
  const roleMain={
    OH:['spikePower','spikeControl','recReception','recDig','recRange','serveControl'],
    MB:['blockStuff','blockRead','jump','spikePower'],
    OP:['spikePower','blockStuff','servePower','jump'],
    S:['tossAccuracy','tossRead','serveControl','mental'],
    L:['recReception','recDig','recRange','mental','stamina']
  }[role]||[];
  roleMain.forEach((k,i)=>{base[k]=clamp(base[k]+1+((seed+i)%2),1,25);});
  return base;
}
function initialHeightFor(role, seed=0){
  const ranges={OH:[160,170],MB:[166,176],OP:[164,174],S:[158,168],L:[154,164]};
  const r=ranges[role]||[158,170];
  return r[0]+(seed%(r[1]-r[0]+1));
}
function initialPlayers(){
  const specs=[
    ['y3_oh',3,'OH','エース',0],
    ['y3_mb',3,'MB','ブロック',1],
    ['y3_op',3,'OP','攻撃型',2],
    ['y3_l',3,'L','守備型',3],
    ['y2_oh',2,'OH','攻撃型',4],
    ['y2_mb',2,'MB','高さ',5],
    ['y2_s',2,'S','司令塔',6],
    ['y2_l',2,'L','守備型',7],
    ['y1_oh',1,'OH','新入生',8],
    ['y1_mb',1,'MB','新入生',9],
    ['y1_s',1,'S','新入生',10],
    ['y1_op',1,'OP','新入生',11]
  ];
  const lastNames=['相沢','青柳','秋月','朝比奈','天野','有馬','飯島','五十嵐','石動','一ノ瀬','今宮','入江','岩倉','宇佐美','大崎','岡崎','小笠原','小野寺','香坂','片桐','神崎','北条','霧島','倉橋','黒川','近衛','佐伯','榊原','桜庭','篠宮','白石','瀬戸','高梨','橘','千歳','月城','東雲','長沢','七瀬','鳴海','羽柴','花房','日向','藤堂','藤宮','星野','御影','水無瀬','三船','宮園','望月','森園','八神','結城','柚木','雪村','若槻'];
  const firstNames=['あかり','葵','茜','梓','彩音','杏','伊織','一花','いろは','詩乃','海音','瑛莉','絵麻','乙葉','佳奈','花音','華恋','希実','琴葉','小春','咲良','紗季','沙羅','汐音','雫','朱里','鈴音','千尋','千夏','月乃','紬','透子','凪紗','菜月','七海','寧々','乃愛','陽菜','日和','風花','穂乃花','真央','美琴','美咲','美月','美羽','美緒','結衣','結菜','優花','莉央','莉子','凛','玲奈','若菜'];
  const foreignNames=['ミラー アリス','ブラウン エマ','スミス サラ','ジョンソン ミア','ウィルソン ノア','テイラー リナ','アンダーソン リサ','マーティン アンナ','トンプソン マリア','ハリス エリカ','クラーク カレン','ルイス ルナ','ロビンソン ニナ','ウォーカー レイラ','ホワイト ソフィア','キング クララ'];
  const portraits=[
    'assets/recruit_face_01.png','assets/recruit_face_02.png','assets/recruit_face_03.png','assets/recruit_face_04.png',
    'assets/recruit_face_05.png','assets/recruit_face_06.png','assets/recruit_face_07.png','assets/recruit_face_08.png',
    'assets/recruit_face_09.png','assets/recruit_face_10.png','assets/recruit_face_11.png','assets/recruit_face_12.png',
    'assets/recruit_face_13.png','assets/recruit_face_14.png','assets/recruit_face_15.png','assets/recruit_face_16.png',
    'assets/recruit_face_17.png','assets/recruit_face_18.png','assets/recruit_face_19.png','assets/recruit_face_20.png',
    'assets/recruit_face_21.png','assets/recruit_face_22.png','assets/recruit_face_23.png','assets/recruit_face_24.png',
    'assets/recruit_face_25.png','assets/recruit_face_26.png','assets/recruit_face_27.png','assets/recruit_face_28.png',
    'assets/recruit_face_29.png','assets/recruit_face_30.png','assets/recruit_face_31.png','assets/recruit_face_32.png',
    'assets/recruit_face_33.png','assets/recruit_face_34.png','assets/recruit_face_35.png','assets/recruit_face_36.png',
    'assets/recruit_face_37.png','assets/recruit_face_38.png','assets/recruit_face_39.png','assets/recruit_face_40.png',
    'assets/recruit_face_41.png','assets/recruit_face_42.png','assets/recruit_face_43.png','assets/recruit_face_44.png',
    'assets/recruit_face_45.png','assets/recruit_face_46.png','assets/recruit_face_47.png','assets/recruit_face_48.png',
    'assets/recruit_face_49.png','assets/recruit_face_50.png','assets/recruit_face_51.png','assets/recruit_face_52.png','assets/recruit_face_53.png','assets/recruit_face_54.png','assets/recruit_face_55.png','assets/recruit_face_56.png','assets/recruit_face_57.png','assets/recruit_face_58.png','assets/recruit_face_59.png','assets/recruit_face_60.png','assets/recruit_face_61.png','assets/recruit_face_62.png','assets/recruit_face_63.png','assets/recruit_face_64.png','assets/recruit_face_65.png','assets/recruit_face_66.png','assets/recruit_face_67.png','assets/recruit_face_68.png','assets/recruit_face_69.png','assets/recruit_face_70.png','assets/recruit_face_71.png','assets/recruit_face_72.png','assets/recruit_face_73.png','assets/recruit_face_74.png','assets/recruit_face_75.png','assets/recruit_face_76.png','assets/recruit_face_77.png','assets/recruit_face_78.png','assets/recruit_face_79.png','assets/recruit_face_80.png','assets/recruit_face_81.png','assets/recruit_face_82.png','assets/recruit_face_83.png','assets/recruit_face_84.png','assets/recruit_face_85.png','assets/recruit_face_86.png','assets/recruit_face_87.png','assets/recruit_face_88.png','assets/recruit_face_89.png','assets/recruit_face_90.png','assets/recruit_face_91.png','assets/recruit_face_92.png','assets/recruit_face_93.png','assets/recruit_face_94.png','assets/recruit_face_95.png','assets/recruit_face_96.png','assets/recruit_face_97.png','assets/recruit_face_98.png','assets/recruit_face_99.png','assets/recruit_face_100.png','assets/recruit_face_101.png','assets/recruit_face_102.png'
  ];
  const usedLast=new Set(), usedFirst=new Set(), usedFull=new Set(), usedPortrait=new Set();
  const take=(arr,used,prefix)=>{
    const pool=arr.filter(x=>!used.has(x));
    if(pool.length){const v=randomChoice(pool);used.add(v);return v;}
    let i=1;while(used.has(`${prefix}${i}`))i++;
    const v=`${prefix}${i}`;used.add(v);return v;
  };
  const takeName=()=>{
    const currentForeign=[...usedFull].filter(n=>/[ァ-ンヴー]/.test(n)).length;
    const foreignMax=Math.floor((usedFull.size+1)/10);
    if(currentForeign<foreignMax && Math.random()<0.10){
      const pool=foreignNames.filter(n=>{const parts=n.split(/\s+/);return !usedFull.has(n)&&!usedLast.has(parts[0])&&!usedFirst.has(parts.slice(1).join(' '));});
      if(pool.length){
        const n=randomChoice(pool),parts=n.split(/\s+/),last=parts[0],first=parts.slice(1).join(' ');
        usedFull.add(n);usedLast.add(last);usedFirst.add(first);
        return n;
      }
    }
    const last=take(lastNames,usedLast,'新姓');
    const first=take(firstNames,usedFirst,'新名');
    const full=`${last} ${first}`;
    usedFull.add(full);
    return full;
  };
  const takePortrait=()=>{
    const pool=portraits.filter(x=>!usedPortrait.has(x));
    const v=randomChoice(pool.length?pool:portraits);
    usedPortrait.add(v);
    return v;
  };
  return specs.map(([id,year,role,sub,seed])=>{
    const bonus=year===3?2:year===2?1:0;
    const pl=p(id,takeName(),year,role,sub,takePortrait(),initialHeightFor(role,seed),year===1?'普通':year===2?'標準':'経験型',false,0,[],initialSchoolComps(role,bonus,seed));
    return randomizeInitialXp?randomizeInitialXp(pl):pl;
  });
}

function defaultCompValueForPlayer(player,key){
  const initial=(typeof initialPlayers==='function'?initialPlayers():[]).find(x=>x.id===player?.id);
  if(initial?.comps && typeof initial.comps[key]==='number')return initial.comps[key];
  const generated=initialSchoolComps(player?.role||'OH',0,0);
  return typeof generated[key]==='number'?generated[key]:1;
}
function ensurePlayerComponentData(player){
  if(!player)return;
  // v161: 疲労度はここで必ず初期化する。新入部員や生成選手にも確実に入る。
  if(typeof player.fatigue!=='number')player.fatigue=0;
  if(!player.comps)player.comps={};
  if(!player.compXp)player.compXp={};
  for(const k of COMP_KEYS){
    if(typeof player.comps[k]!=='number')player.comps[k]=defaultCompValueForPlayer(player,k);
    player.comps[k]=clamp(Math.round(player.comps[k]),1,25);
    if(typeof player.compXp[k]!=='number')player.compXp[k]=0;
  }
  if(typeof player.heightXp!=='number')player.heightXp=0;
}

const MANAGER_PORTRAIT_POOL = [
  'assets/manager_face_01.png',
  'assets/manager_face_02.png',
  'assets/manager_face_03.png',
  'assets/manager_face_04.png',
  'assets/manager_face_05.png',
  'assets/manager_face_06.png'
];
const MANAGER_DATA = {
  'assets/manager_face_01.png':{name:'相沢 ひまり',unlock:'新設校',effect:'差し入れで稀に数人の調子+1'},
  'assets/manager_face_02.png':{name:'クリス',unlock:'弱小校',effect:'練習がわずかに はかどる'},
  'assets/manager_face_03.png':{name:'ソフィア',unlock:'新設校',effect:'独自ルートで稀にスカウトの噂'},
  'assets/manager_face_04.png':{name:'アリシア',unlock:'全国大会出場校',effect:'稀に分析メモで練習効率+5%'},
  'assets/manager_face_05.png':{name:'七瀬 つむぎ',unlock:'新設校',effect:'稀に不調選手をケア'},
  'assets/manager_face_06.png':{name:'朝倉 琴音',unlock:'強豪校',effect:'稀に特殊能力のきっかけ'}
};
const MANAGER_NAMES = Object.fromEntries(Object.entries(MANAGER_DATA).map(([k,v])=>[k,v.name]));
function managerNameForPortrait(src){
  return MANAGER_NAMES[src] || '相沢 ひまり';
}
function managerInfo(src=currentManagerPortrait()){
  return MANAGER_DATA[src] || MANAGER_DATA[MANAGER_PORTRAIT_POOL[0]];
}
function currentManagerName(){
  return (state&&state.managerName)||managerNameForPortrait(currentManagerPortrait());
}
function managerLine(message){
  return `${currentManagerName()}「${message}」`;
}
function managerUnlocked(src){
  const info=managerInfo(src);
  return schoolClassIndex(state?.schoolClass||'新設校')>=schoolClassIndex(info.unlock||'新設校');
}
function unlockedManagerPortraits(){
  return MANAGER_PORTRAIT_POOL.filter(src=>managerUnlocked(src));
}
function managerEffectText(src){
  const info=managerInfo(src);
  return `${info.effect||''}${info.unlock&&info.unlock!=='新設校'?` / 解放：${info.unlock}以上`:''}`;
}

function defaultManagerPortrait(){
  // v67: `let state` の一時的死角(TDZ)対策。`typeof state` はTDZ中でも例外を投げるため、
  // 初回起動(localStorageが空)でinitialState()経由で呼ばれるとReferenceErrorで起動不能になっていた。
  let __s=null; try{ __s=state; }catch(e){ __s=null; }
  const pool=(__s)?unlockedManagerPortraits():[MANAGER_PORTRAIT_POOL[0],MANAGER_PORTRAIT_POOL[2],MANAGER_PORTRAIT_POOL[4]];
  return randomChoice(pool.length?pool:[MANAGER_PORTRAIT_POOL[0]]) || 'assets/new_shino.png';
}
function currentManagerPortrait(){
  if(state&&MANAGER_PORTRAIT_POOL.includes(state.managerPortrait))return state.managerPortrait;
  return MANAGER_PORTRAIT_POOL[0] || 'assets/new_shino.png';
}
// v185: 画面下の発言枠では顔グラを出さない（Tak指示）。枠の左に大きい顔グラが既にあるため。
//        スカウトマップの説明文など、枠の外で使う場所は従来どおり顔グラを出す。
function managerInlineHtml(msg,opts){
  const icon=(opts&&opts.icon===false)?'':`<img class="manager-inline-icon" src="${currentManagerPortrait()}" alt="${currentManagerName()}">`;
  const cls=icon?'manager-inline':'manager-inline no-icon';
  return `<div class="${cls}">${icon}<span class="manager-inline-name">${currentManagerName()}</span><span>${msg}</span></div>`;
}
function initialState(){return{year:1,monthIndex:0,turnIndex:0,schoolName:'若葉高校',schoolBaseName:'若葉',schoolKind:'高校',gameIntroDone:true,initialAprilNoEvents:true,schoolRank:'新設校',schoolClass:'新設校',qualifiedInterhigh:false,qualifiedHaruko:false,seniorsRetired:false,selectedPlayerId:'y3_oh',lastTrainingMenu:'side_attack',lastIndividualPlayerId:'y3_oh',lastIndividualTrainingMenu:'spikePower',equipmentLevel:0,coachAction:'individual',scoutRegion:'関東',scoutPosition:'OH',scoutLockedMonthKey:null,nextYearScoutRecruits:[],scoutedPlayers:[],scoutRumor:null,lastActionPromptKey:null,recruitSerial:1,lastRecruitYear:1,trainingLog:['新設校として女子バレー部が始動しました。'],monthResult:'初期状態です。',lastMatchSummary:'未実施',managerMessage:'監督、今日もよろしくお願いします。',managerPortrait:defaultManagerPortrait(),managerName:null,managerGraduationYear:null,managerSupportKey:null,matchLog:[],starterIds:['y3_oh','y3_mb','y3_op','y2_s','y2_mb','y2_oh'],liberoId:'y3_l',benchIds:['y2_l','y1_oh','y1_mb','y1_s','y1_op'],players:initialPlayers(),interhighBest4Year:null,japanRep:null,japanRepReturnKey:null,studyAbroad:null,studyAbroadOfferYear:null,directorVisitPlace:'street',directorFirstStudyDone:{},schoolClassDropWatch:null,directorLegacy:{equipment:0,pipeline:0,studyRoutes:[],contacts:[],exchangeStudents:0,u18Access:false},u15GoldenGenerationYear:null,u15GoldenRecruitYear:null,campTheme:null,campThemeKey:null,proRecruitBonus:0,proEntryHistory:[],seasonNationalResult:{interhigh:null,haruko:null},ogMatchScheduledYear:null,ogMatchStartedKey:null,u18SisterReward:null,u18SisterRewardClaimed:false,u18SisterGraduationYear:null,u18DefeatedYear:null,lastNationalChampionYear:null,u18AnnualStartedKey:null,u18TimelineRevealed:false,ogTimelineRevealed:false,nationalFirstEncounter:{},u18WinEventShown:false,ogWinEventShown:false,seasonBaseline:null,monthTransitionPending:null,monthTransitionModalOpen:false,monthlyRetiredSnapshots:[],nationalAppearanceYear:null,nationalFirstRoundWonYear:null,nationalFinalReachedYear:null,tohoRivalDefeatCount:0,tohoRivalEventShown:{},tohoRivalEventCount:0,tohoFirstEncounterDone:false,tohoFirstLossTauntSeen:false,promiseRookieId:null,promiseTargetYear:null,promiseDistrictWon:false,promiseFinalReached:false,promiseReachEventShown:false,promisePendingReachEvent:false,promiseGraduationPending:null,promiseLastPrefPreShown:false,promiseLastPrefPostShown:false,practiceStaminaBackup:null,promiseGrade2Shown:false,promiseGrade3Shown:false,promiseGraduationShown:false,matchServeOrder:'none',newDrinkTestYear:0,devSquadTrainingKey:'',firstSquadPlan:'normal',devSquadPlan:'normal',koutokuAwakened:false,koutokuAwakeningPending:null,districtChampionStoryShown:false,demoCleared:false,demoClearedYear:null,demoClearedTournament:''};}


// v146: この定数は現在どこからも参照されていないが、初期化で initialPlayers() を呼び乱数を消費している。
// 削除すると乱数列の位置がずれて挙動が変わるため、意図的に残している。
const EXISTING_RECRUIT_PORTRAIT_POOL = [...new Set(initialPlayers().map(p=>p.portrait).filter(Boolean))];
const NEW_RECRUIT_PORTRAIT_POOL = [
  'assets/recruit_face_01.png',
  'assets/recruit_face_02.png',
  'assets/recruit_face_03.png',
  'assets/recruit_face_04.png',
  'assets/recruit_face_05.png',
  'assets/recruit_face_06.png',
  'assets/recruit_face_07.png',
  'assets/recruit_face_08.png',
  'assets/recruit_face_09.png',
  'assets/recruit_face_10.png',
  'assets/recruit_face_11.png',
  'assets/recruit_face_12.png',
  'assets/recruit_face_13.png',
  'assets/recruit_face_14.png',
  'assets/recruit_face_15.png',
  'assets/recruit_face_16.png',
  'assets/recruit_face_17.png',
  'assets/recruit_face_18.png',
  'assets/recruit_face_19.png',
  'assets/recruit_face_20.png',
  'assets/recruit_face_21.png',
  'assets/recruit_face_22.png',
  'assets/recruit_face_23.png',
  'assets/recruit_face_24.png',
  'assets/recruit_face_25.png',
  'assets/recruit_face_26.png',
  'assets/recruit_face_27.png',
  'assets/recruit_face_28.png',
  'assets/recruit_face_29.png',
  'assets/recruit_face_30.png',
  'assets/recruit_face_31.png',
  'assets/recruit_face_32.png',
  'assets/recruit_face_33.png',
  'assets/recruit_face_34.png',
  'assets/recruit_face_35.png',
  'assets/recruit_face_36.png',
  'assets/recruit_face_37.png',
  'assets/recruit_face_38.png',
  'assets/recruit_face_39.png',
  'assets/recruit_face_40.png',
  'assets/recruit_face_41.png',
  'assets/recruit_face_42.png',
  'assets/recruit_face_43.png',
  'assets/recruit_face_44.png',
  'assets/recruit_face_45.png',
  'assets/recruit_face_46.png',
  'assets/recruit_face_47.png',
  'assets/recruit_face_48.png',
  'assets/recruit_face_49.png',
  'assets/recruit_face_50.png',
  'assets/recruit_face_51.png',
  'assets/recruit_face_52.png',
  'assets/recruit_face_53.png',
  'assets/recruit_face_54.png',
  'assets/recruit_face_55.png',
  'assets/recruit_face_56.png',
  'assets/recruit_face_57.png',
  'assets/recruit_face_58.png',
  'assets/recruit_face_59.png',
  'assets/recruit_face_60.png',
  'assets/recruit_face_61.png',
  'assets/recruit_face_62.png',
  'assets/recruit_face_63.png',
  'assets/recruit_face_64.png',
  'assets/recruit_face_65.png',
  'assets/recruit_face_66.png',
  'assets/recruit_face_67.png',
  'assets/recruit_face_68.png',
  'assets/recruit_face_69.png',
  'assets/recruit_face_70.png',
  'assets/recruit_face_71.png',
  'assets/recruit_face_72.png',
  'assets/recruit_face_73.png',
  'assets/recruit_face_74.png',
  'assets/recruit_face_75.png',
  'assets/recruit_face_76.png',
  'assets/recruit_face_77.png',
  'assets/recruit_face_78.png',
  'assets/recruit_face_79.png',
  'assets/recruit_face_80.png',
  'assets/recruit_face_81.png',
  'assets/recruit_face_82.png',
  'assets/recruit_face_83.png',
  'assets/recruit_face_84.png',
  'assets/recruit_face_85.png',
  'assets/recruit_face_86.png',
  'assets/recruit_face_87.png',
  'assets/recruit_face_88.png',
  'assets/recruit_face_89.png',
  'assets/recruit_face_90.png',
  'assets/recruit_face_91.png',
  'assets/recruit_face_92.png',
  'assets/recruit_face_93.png',
  'assets/recruit_face_94.png',
  'assets/recruit_face_95.png',
  'assets/recruit_face_96.png',
  'assets/recruit_face_97.png',
  'assets/recruit_face_98.png',
  'assets/recruit_face_99.png',
  'assets/recruit_face_100.png',
  'assets/recruit_face_101.png',
  'assets/recruit_face_102.png',
  // v107: 顔グラフォルダにあってリポジトリに無かった14枚を追加。
  'assets/recruit_face_103.png','assets/recruit_face_104.png','assets/recruit_face_105.png',
  'assets/recruit_face_106.png','assets/recruit_face_107.png','assets/recruit_face_108.png',
  'assets/recruit_face_109.png','assets/recruit_face_110.png','assets/recruit_face_111.png',
  'assets/recruit_face_112.png','assets/recruit_face_113.png','assets/recruit_face_114.png',
  'assets/recruit_face_115.png','assets/recruit_face_116.png',
  // v110: ダウンロード直下にあった一般部員用の顔グラ19枚を追加。
  'assets/recruit_face_117.png','assets/recruit_face_118.png','assets/recruit_face_119.png',
  'assets/recruit_face_120.png','assets/recruit_face_121.png','assets/recruit_face_122.png',
  'assets/recruit_face_123.png','assets/recruit_face_124.png','assets/recruit_face_125.png',
  'assets/recruit_face_126.png','assets/recruit_face_127.png','assets/recruit_face_128.png',
  'assets/recruit_face_129.png','assets/recruit_face_130.png','assets/recruit_face_131.png',
  'assets/recruit_face_132.png','assets/recruit_face_133.png','assets/recruit_face_134.png',
  'assets/recruit_face_135.png',
  // v106: assets にありながらコードから一度も参照されておらず、
  //       部員の顔グラとして一度も使われていなかった17枚を追加した。
  'assets/kurasaki.png','assets/makino.png','assets/mizuhara.png','assets/nagase.png',
  'assets/okumura.png','assets/sagami.png','assets/segawa.png','assets/takamori.png','assets/takatsuki.png',
  'assets/new_amina.png','assets/new_fujisaki.png','assets/new_hayase.png','assets/new_kanae.png',
  'assets/new_kurumi.png','assets/new_momose.png','assets/new_nadia.png','assets/new_sophia.png',
  // v150: 外国名の選手に使う顔グラ。この4枚が引かれたときは必ず外国名になる。
  'assets/recruit_face_136.png','assets/recruit_face_137.png',
  'assets/recruit_face_138.png','assets/recruit_face_139.png'
];
const RECRUIT_PORTRAIT_POOL = [...new Set(NEW_RECRUIT_PORTRAIT_POOL)];
// v150: 見た目が外国人の顔グラ。名前の抽選でこの顔グラが選ばれたら、日本名にはしない。
const FOREIGN_LOOK_PORTRAITS = new Set([
  'assets/recruit_face_136.png','assets/recruit_face_137.png',
  'assets/recruit_face_138.png','assets/recruit_face_139.png'
]);
// v98: ユニフォームが相手チームの色（赤）になっていたため、全31枚を青ユニフォームの新規画像に差し替えた。
// 旧24枚は同じファイル名のまま中身を置き換え、25〜31を新規に追加している。
const EXCLUSIVE_TALENT_PORTRAITS = [
  'assets/talent_face_01.png',
  'assets/talent_face_02.png',
  'assets/talent_face_03.png',
  'assets/talent_face_04.png',
  'assets/talent_face_05.png',
  'assets/talent_face_06.png',
  'assets/talent_face_07.png',
  'assets/talent_face_08.png',
  'assets/talent_face_09.png',
  'assets/talent_face_10.png',
  'assets/talent_face_11.png',
  'assets/talent_face_12.png',
  'assets/talent_face_13.png',
  'assets/talent_face_14.png',
  'assets/talent_face_15.png',
  'assets/talent_face_16.png',
  'assets/talent_face_17.png',
  'assets/talent_face_18.png',
  'assets/talent_face_19.png',
  'assets/talent_face_20.png',
  'assets/talent_face_21.png',
  'assets/talent_face_22.png',
  'assets/talent_face_23.png',
  'assets/talent_face_24.png',
  'assets/talent_face_25.png',
  'assets/talent_face_26.png',
  'assets/talent_face_27.png',
  'assets/talent_face_28.png',
  'assets/talent_face_29.png',
  'assets/talent_face_30.png',
  'assets/talent_face_31.png',
];
const EXCLUSIVE_PORTRAIT_TALENTS=['神童','怪物','努力の天才'];
const MANAGED_PLAYER_PORTRAIT_POOL=[...new Set([...RECRUIT_PORTRAIT_POOL,...EXCLUSIVE_TALENT_PORTRAITS])];
function hasExclusivePortraitTalent(p){return !!(p&&EXCLUSIVE_PORTRAIT_TALENTS.some(s=>(p.special||[]).includes(s)));}
function isExclusiveTalentPortrait(src){return EXCLUSIVE_TALENT_PORTRAITS.includes(src);}
function isManagedPlayerPortrait(src){return MANAGED_PLAYER_PORTRAIT_POOL.includes(src);}
function collectPortraitUsage(pool,extraUsed=[]){
  const counts={};
  (pool||[]).forEach(src=>counts[src]=0);
  const add=(src)=>{if(src&&Object.prototype.hasOwnProperty.call(counts,src))counts[src]++;};
  (state.players||[]).forEach(p=>add(p?.portrait));
  (state.pendingAprilRecruits||[]).forEach(p=>add(p?.portrait));
  (state.scoutedPlayers||[]).forEach(s=>{add(s?.portrait);add(s?.detail?.portrait);});
  (state.nextYearScoutRecruits||[]).forEach(s=>{add(s?.portrait);add(s?.fixedRecruit?.portrait);});
  (extraUsed||[]).forEach(add);
  return counts;
}


function pickLeastUsedPortrait(pool,extraUsed=[]){
  if(!pool?.length)return null;
  const counts=collectPortraitUsage(pool,extraUsed);
  const unused=pool.filter(src=>(counts[src]||0)===0);
  if(unused.length)return randomChoice(unused);
  let min=Infinity;
  pool.forEach(src=>{min=Math.min(min,counts[src]||0);});
  const least=pool.filter(src=>(counts[src]||0)===min);
  return randomChoice(least.length?least:pool);
}
function pickRecruitPortrait(extraUsed=[]){return pickLeastUsedPortrait(RECRUIT_PORTRAIT_POOL,extraUsed);}
// v100: 才能持ち専用の顔グラは「何をしている絵か」がはっきりしている。
// リベロにスパイクやブロックの絵が当たるようなチグハグを避けるため、
// 絵の動作ごとに似合うポジションを決め、ポジション適性で候補を絞る。
//   receive=レシーブ姿勢 / spike=打つ / toss=上げる / block=跳んで止める /
//   serve=サーブ / neutral=どの役割でも成立する立ち姿
const TALENT_PORTRAIT_ACTIONS={
  'assets/talent_face_01.png':'receive',
  'assets/talent_face_02.png':'receive',
  'assets/talent_face_03.png':'receive',
  'assets/talent_face_04.png':'receive',
  'assets/talent_face_05.png':'receive',
  'assets/talent_face_06.png':'neutral',
  'assets/talent_face_07.png':'receive',
  'assets/talent_face_08.png':'neutral',
  'assets/talent_face_09.png':'receive',
  'assets/talent_face_10.png':'receive',
  'assets/talent_face_11.png':'spike',
  'assets/talent_face_12.png':'neutral',
  'assets/talent_face_13.png':'receive',
  'assets/talent_face_14.png':'neutral',
  'assets/talent_face_15.png':'neutral',
  'assets/talent_face_16.png':'spike',
  'assets/talent_face_17.png':'neutral',
  'assets/talent_face_18.png':'neutral',
  'assets/talent_face_19.png':'spike',
  'assets/talent_face_20.png':'receive',
  'assets/talent_face_21.png':'receive',
  'assets/talent_face_22.png':'neutral',
  'assets/talent_face_23.png':'receive',
  'assets/talent_face_24.png':'neutral',
  'assets/talent_face_25.png':'toss',
  'assets/talent_face_26.png':'block',
  'assets/talent_face_27.png':'toss',
  'assets/talent_face_28.png':'block',
  'assets/talent_face_29.png':'serve',
  'assets/talent_face_30.png':'serve',
  'assets/talent_face_31.png':'serve',
};
const TALENT_ACTION_ROLES={
  neutral:['OH','MB','OP','S','L'],
  receive:['OH','MB','OP','S','L'],
  serve:['OH','MB','OP','S'],     // リベロはサーブを打たない
  spike:['OH','MB','OP'],
  block:['OH','MB','OP'],
  toss:['S']
};
function talentPortraitAction(src){return TALENT_PORTRAIT_ACTIONS[src]||'neutral';}
function talentPortraitFitsRole(src, role){
  const allow=TALENT_ACTION_ROLES[talentPortraitAction(src)];
  if(!allow||!allow.length)return true;
  if(!role)return true;
  return allow.includes(role);
}
// 本人の役割と、ポジション評価の最上位のどちらかに似合えば採用する。
function talentPortraitsForPlayer(p){
  const roles=new Set([p?.role, ...topPositionsOf(p)].filter(Boolean));
  const fit=EXCLUSIVE_TALENT_PORTRAITS.filter(src=>[...roles].some(r=>talentPortraitFitsRole(src,r)));
  return fit.length?fit:EXCLUSIVE_TALENT_PORTRAITS.filter(src=>talentPortraitAction(src)==='neutral');
}
function pickExclusiveTalentPortrait(extraUsed=[],player=null){
  const pool=player?talentPortraitsForPlayer(player):EXCLUSIVE_TALENT_PORTRAITS;
  return pickLeastUsedPortrait(pool.length?pool:EXCLUSIVE_TALENT_PORTRAITS,extraUsed);
}

function portraitUsedByAnotherPlayer(src,playerId=null){
  if(!src)return false;
  const seenIds=new Set();
  let found=false;
  const check=(p)=>{
    if(!p||p.portrait!==src)return;
    const id=String(p.id||`${p.name||''}:${p.portrait}`);
    if(seenIds.has(id))return;
    seenIds.add(id);
    if(!playerId||String(playerId)!==id)found=true;
  };
  (state.players||[]).forEach(check);
  (state.pendingAprilRecruits||[]).forEach(check);
  (state.nextYearScoutRecruits||[]).forEach(s=>check(s?.fixedRecruit));
  (state.scoutedPlayers||[]).forEach(s=>check(s?.detail));
  return found;
}
// v100: 神童・怪物・努力の天才に加えて、「大成功の上限を1だけ超える最大値」を引いた選手も
// 専用顔グラの対象にする（例：大成功の上限が14なら、15を引いた選手も対象）。
function exclusivePortraitScoreThreshold(){
  const cfg=schoolCfg();
  const great=cfg&&cfg.scoutGreat;
  const top=Array.isArray(great)?Number(great[1]||0):Number((cfg&&cfg.max)||0)+2;
  return top>0?top+1:0;
}
function qualifiesForExclusivePortrait(p){
  if(!p)return false;
  if(hasExclusivePortraitTalent(p))return true;
  const th=exclusivePortraitScoreThreshold();
  if(!th)return false;
  return calcPositionScore25(p,p.role)>=th;
}
function assignExclusiveTalentPortrait(player,extraUsed=[]){
  if(!player||!qualifiesForExclusivePortrait(player))return false;
  if(player.u18SisterRecruit)return false; // U-18妹は「姉と同じ顔」を優先
  if(isExclusiveTalentPortrait(player.portrait) && talentPortraitFitsRole(player.portrait,player.role) && !portraitUsedByAnotherPlayer(player.portrait,player.id))return false;
  const next=pickExclusiveTalentPortrait(extraUsed,player);
  if(!next)return false;
  player.portrait=next;
  return true;
}
function syncManagedPortraitCopies(changedById){
  if(!changedById?.size)return;
  (state.nextYearScoutRecruits||[]).forEach(s=>{
    const p=s?.fixedRecruit;
    if(p?.id&&changedById.has(String(p.id)))p.portrait=changedById.get(String(p.id));
  });
  (state.scoutedPlayers||[]).forEach(s=>{
    const p=s?.detail;
    if(p?.id&&changedById.has(String(p.id))){
      const portrait=changedById.get(String(p.id));
      p.portrait=portrait;
      s.portrait=portrait;
    }
  });
  (state.pendingAprilRecruits||[]).forEach(p=>{
    if(p?.id&&changedById.has(String(p.id)))p.portrait=changedById.get(String(p.id));
  });
}
function repairDuplicateRecruitPortraitsInState(){
  if(!state||!MANAGED_PLAYER_PORTRAIT_POOL.length)return;
  const canonical=[];
  const seenIds=new Set();
  const add=(p)=>{
    if(!p||!isManagedPlayerPortrait(p.portrait))return;
    const id=String(p.id||`${p.name||''}:${p.portrait}`);
    if(seenIds.has(id))return;
    seenIds.add(id);
    canonical.push(p);
  };
  (state.players||[]).forEach(add);
  (state.pendingAprilRecruits||[]).forEach(add);
  (state.nextYearScoutRecruits||[]).forEach(s=>add(s?.fixedRecruit));
  (state.scoutedPlayers||[]).forEach(s=>add(s?.detail));

  const used=new Set();
  const changedById=new Map();

  for(const p of canonical){
    const eligible=hasExclusivePortraitTalent(p);
    let current=p.portrait;

    // 専用顔は神童・怪物・努力の天才だけが使用可能。
    if(isExclusiveTalentPortrait(current) && !eligible){
      const candidates=RECRUIT_PORTRAIT_POOL.filter(src=>!used.has(src));
      const replacement=randomChoice(candidates.length?candidates:RECRUIT_PORTRAIT_POOL);
      if(replacement){
        p.portrait=replacement;
        current=replacement;
        if(p.id)changedById.set(String(p.id),replacement);
      }
    }

    if(!used.has(current)){
      used.add(current);
      continue;
    }

    // 同じ顔を別選手が使っていたら、資格に合う未使用顔へ変更。
    const preferred=eligible
      ? [...EXCLUSIVE_TALENT_PORTRAITS,...RECRUIT_PORTRAIT_POOL]
      : [...RECRUIT_PORTRAIT_POOL];
    const unused=preferred.filter(src=>!used.has(src));
    if(!unused.length)continue;
    const replacement=randomChoice(unused);
    p.portrait=replacement;
    used.add(replacement);
    if(p.id)changedById.set(String(p.id),replacement);
  }
  syncManagedPortraitCopies(changedById);
}

let state=loadState();

function migrateLegacyTalentLabelDeep(obj){
  const legacy='\u5929\u624d\u808c';
  if(obj===null||typeof obj==='undefined')return obj;
  if(typeof obj==='string')return obj===legacy?'神童':obj;
  if(Array.isArray(obj)){
    for(let i=0;i<obj.length;i++)obj[i]=migrateLegacyTalentLabelDeep(obj[i]);
    return obj;
  }
  if(typeof obj==='object'){
    Object.keys(obj).forEach(k=>{ obj[k]=migrateLegacyTalentLabelDeep(obj[k]); });
  }
  return obj;
}

function normalizeV69State(){
  if(!state||typeof state!=='object')return;
  // v174: 体験版のセーブを製品版で読み込んだら、終了状態を解除して続きから遊べるようにする。
  // （ensureData でも同じことをしている。読込直後にも効かせるためここにも置く）
  if(state.demoCleared&&!isDemoBuild()){state.demoCleared=false;state.demoClearedYear=null;state.demoClearedTournament='';}
  migrateLegacyTalentLabelDeep(state);
  if(!state.coachXpResetV1Migrated){
    ensureCoachStats();
    Object.values(state.coachStats||{}).forEach(s=>{
      if((Number(s?.level)||1)>1)s.xp=0;
    });
    state.coachXpResetV1Migrated=true;
  }
  if(!Array.isArray(state.proEntryHistory))state.proEntryHistory=[];
  /* v209: 旧セーブのプロ入り一覧に顔グラを補完する。歴代ベスト14・今月の引退者・在籍選手から
     同じIDを探す。ベスト14から外れて記録も残っていない選手は既定の顔のままになる。 */
  {
    const faceById=new Map();
    [].concat(state.retiredPlayerSnapshots||[], state.monthlyRetiredSnapshots||[], state.players||[])
      .forEach(function(x){ if(x&&x.id&&x.portrait&&!faceById.has(String(x.id)))faceById.set(String(x.id),x.portrait); });
    state.proEntryHistory.forEach(function(r){
      if(r&&!r.portrait){ const f=faceById.get(String(r.id)); if(f)r.portrait=f; }
    });
  }
  if(typeof state.proRecruitBonus!=='number')state.proRecruitBonus=0;
  if(!state.seasonNationalResult)state.seasonNationalResult={interhigh:null,haruko:null};
  if(!Array.isArray(state.retiredPlayerSnapshots))state.retiredPlayerSnapshots=[];
  if(!Array.isArray(state.retiredPlayerIds))state.retiredPlayerIds=[];
  if(!Object.prototype.hasOwnProperty.call(state,'campTheme'))state.campTheme=null;
  if(!Object.prototype.hasOwnProperty.call(state,'campThemeKey'))state.campThemeKey=null;
  if(!Object.prototype.hasOwnProperty.call(state,'ogMatchScheduledYear'))state.ogMatchScheduledYear=null;
  if(!Object.prototype.hasOwnProperty.call(state,'ogMatchStartedKey'))state.ogMatchStartedKey=null;
  if(!Object.prototype.hasOwnProperty.call(state,'u18SisterReward'))state.u18SisterReward=null;
  if(typeof state.u18SisterRewardClaimed!=='boolean')state.u18SisterRewardClaimed=!!state.u18SisterReward;/* v208: 妹の卒業年。旧セーブで既に妹が入部済みなら 加入年+2 を復元する。入部前なら null のまま。 */if(typeof state.u18SisterGraduationYear==='undefined'){const _r=state.u18SisterReward;state.u18SisterGraduationYear=(_r&&_r.consumed&&Number(_r.joinYear))?Number(_r.joinYear)+2:null;}
  if(!Object.prototype.hasOwnProperty.call(state,'monthTransitionPending'))state.monthTransitionPending=null;
  if(typeof state.monthTransitionModalOpen!=='boolean')state.monthTransitionModalOpen=false;
  if(!Array.isArray(state.monthlyRetiredSnapshots))state.monthlyRetiredSnapshots=[];
  if(!Object.prototype.hasOwnProperty.call(state,'coachActionExecutedMonthKey'))state.coachActionExecutedMonthKey=null;
  if(typeof state.coachActionMatchWeekMode!=='boolean')state.coachActionMatchWeekMode=false;
  repairDuplicateRecruitPortraitsInState();
}
function loadState(){try{const raw=lsGet(STORAGE_KEY);return raw?JSON.parse(raw):initialState();}catch{return initialState();}}
// v176: 自動保存が落ちたことに気づけるようにする。黙って失敗し続けるのが一番まずい。
let saveEverSucceeded=false;
let saveFailureWarned=false;
function saveState(){
  // v67: trainingLog等の無制限増加でセーブが肥大化し、localStorage(約5MB)を超えて保存失敗(QuotaExceededError)する問題を修正。
  // 表示用ログは直近分のみ保持する。
  try{
    if(Array.isArray(state.trainingLog)&&state.trainingLog.length>400)state.trainingLog=state.trainingLog.slice(-400);
    if(Array.isArray(state.monthlyReportMatches)&&state.monthlyReportMatches.length>300)state.monthlyReportMatches=state.monthlyReportMatches.slice(-300);
    if(Array.isArray(state.matchLog)&&state.matchLog.length>2000)state.matchLog=state.matchLog.slice(-2000);
  }catch(e){}
  if(lsSet(STORAGE_KEY,JSON.stringify(state))){saveEverSucceeded=true;return true;}
  // 容量超過時のフォールバック：さらにログを削ってもう一度だけ試す
  try{ if(Array.isArray(state.trainingLog))state.trainingLog=state.trainingLog.slice(-100); }catch(e){}
  if(lsSet(STORAGE_KEY,JSON.stringify(state))){saveEverSucceeded=true;return true;}
  // v176: 2回とも失敗。一度でも保存できていたなら、途中で保存できなくなったということ。
  // 起動時から使えない場合は maybeWarnStorageUnavailable が案内するのでここでは出さない。
  if(saveEverSucceeded&&!saveFailureWarned){
    saveFailureWarned=true;
    try{ enqueueImportantPopup('自動保存に失敗しました', storageTroubleHtml('途中から保存できなくなりました。ブラウザの保存領域がいっぱいになっているか、設定が変わった可能性があります。'), 'info', ''); }catch(e){}
  }
  return false;
}
// v181: 3スロットのブラウザ内セーブはやめた（Tak指示 ⑥）。
//        セーブは「ファイルへ書き出す」だけ、ロードは「ファイルから読み込む」だけ。
//        自動保存（localStorage）はそのまま残す。
function saveLabelForState(s=state){
  const y=s?.year||1;
  const m=MONTHS[s?.monthIndex||0]||'4月';
  const t=(s?.turnIndex||0)+1;
  const cls=s?.schoolClass||'新設校';
  // v177: 学校名は導入で入力する値なので、周回の見分けに使える。
  const school=(s&&s.schoolName)||'若葉高校';
  return `${school} / ${y}年目 ${m} 第${t}週 / ${cls}`;
}
// v177: 書き出しファイル名を「学校名_4年目7月2週_20260829.json」にする。
// 学校名はユーザーの入力値（10文字以内）なので、ファイル名に使えない文字を落としてから使う。
function sanitizeFileNamePart(text){
  return String(text||'')
    .replace(/[\\/:*?"<>|]/g,'')      // Windows で使えない文字
    .replace(/[\x00-\x1f\x7f]/g,'')   // 制御文字
    .replace(/\s+/g,'')                // 空白は詰める
    .replace(/^[.\s]+|[.\s]+$/g,'')    // 先頭末尾のドット（Windowsで問題になる）
    .slice(0,20);
}
// v177: toLocaleString はブラウザの言語設定で書式が変わる（en-US だと 8/29/2026, 10:03 PM）。
// 日本語のゲームなので、表示は固定の書式にする。
function formatSavedAt(iso){
  if(!iso)return '不明';
  try{
    const d=new Date(iso);
    if(isNaN(d.getTime()))return '不明';
    const p2=n=>String(n).padStart(2,'0');
    return `${d.getFullYear()}/${p2(d.getMonth()+1)}/${p2(d.getDate())} ${p2(d.getHours())}:${p2(d.getMinutes())}`;
  }catch(e){return '不明';}
}
function saveFileNameForState(s=state,now=new Date()){
  const school=sanitizeFileNamePart((s&&s.schoolName)||'')||'セーブ';
  const y=s?.year||1;
  const m=MONTHS[s?.monthIndex||0]||'4月';
  const t=(s?.turnIndex||0)+1;
  const p2=n=>String(n).padStart(2,'0');
  const stamp=`${now.getFullYear()}${p2(now.getMonth()+1)}${p2(now.getDate())}`;
  return `${school}_${y}年目${m}${t}週_${stamp}.json`;
}
function saveSlotPayload(slot,stateData=state){
  return {version:STORAGE_KEY,slot,savedAt:new Date().toISOString(),label:saveLabelForState(stateData),state:stateData};
}
// v181: モーダルは廃止。呼び出し側を壊さないよう、空の関数だけ残す。
function closeSaveModal(){}
// v181: 「セーブ」はファイルへの書き出しに一本化した（Tak指示 ⑥）。
function manualSave(){
  exportCurrentSave();
  renderAll();
}
function exportCurrentSave(){
  saveState();
  const payload=saveSlotPayload('export',state);
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  const fileName=saveFileNameForState(state);
  a.href=URL.createObjectURL(blob);
  a.download=fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},0);
  // v177: どの名前で書き出したかを伝える。あとで探すときの手掛かりになる。
  managerSay(`セーブデータを「${fileName}」として書き出しました。`);
  return fileName;
}
function importSaveFile(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const payload=JSON.parse(String(reader.result||''));
      const imported=payload?.state || payload;
      if(!imported || !Array.isArray(imported.players))throw new Error('セーブデータ形式が正しくありません。');
      // v177: ファイル名は自由に変えられるうえ、ダウンロード時に (1) が付くこともあるので当てにならない。
      // 中身から作り直したラベルを見せてから確認する。
      const label=saveLabelForState(imported);
      const savedAt=formatSavedAt(payload?.savedAt);
      if(!confirm(`このセーブデータを読み込みますか？\n\n　${label}\n　書き出した日時：${savedAt}\n\n今の進行状況は上書きされます。`))return;
      state=imported;
      normalizeV69State();
      watchMatchSession=null;
      saveState();
      closeSaveModal();
      renderAll();
      managerSay('セーブデータを読み込みました。');
    }catch(e){
      alert('セーブデータを読み込めませんでした：'+e.message);
    }
  };
  reader.readAsText(file);
}

function ownSchoolName(){return (state&&state.schoolName)||'若葉高校';}
// v213: 学校名を「名前」＋「種別」に分ける（Tak指示）。
//        実況の「若葉、打ち切った！」のような短い呼び方に、名前の側だけを使えるようにするため。
//        長いものから先に照合したいので、この配列は文字数の長い順に並べてある。
const SCHOOL_KIND_PRESETS=[
  '女子高等学校','高等女学校','女子高校','高等学校','ハイスクール','アカデミー',
  '女子学院','女学院','女学園','女学館','女子高','高等部','高校','学院','学園','学館'
];
// 正式名称（例：若葉高校）。
// 短い呼び方（例：若葉）。種別を分けていない古いセーブは、学校名をそのまま短い呼び方としても使う（Tak指示）。
function ownSchoolShortName(){
  const b=state&&state.schoolBaseName;
  return (typeof b==='string'&&b.trim())?b.trim():ownSchoolName();
}
// v212: 読み込み時に確定している定数テーブルの文章は、学校名をまだ知らない（Tak指示の学校名変更に追従できない）。
//        そこで文章側には {{校名}}（正式名称）／{{略称}}（短い呼び方）と書いておき、
//        画面に出す直前にここで実際の学校名へ差し替える。
const SCHOOL_NAME_TOKEN='{{校名}}';
const SCHOOL_SHORT_TOKEN='{{略称}}';
function withSchoolName(text){
  if(typeof text==='string')return text.split(SCHOOL_NAME_TOKEN).join(ownSchoolName()).split(SCHOOL_SHORT_TOKEN).join(ownSchoolShortName());
  if(Array.isArray(text))return text.map(withSchoolName);
  return text;
}
// 「桜丘高校」と打たれたうえで種別「高校」を選ばれても「桜丘高校高校」にしない。
function stripSchoolKindSuffix(name){
  let s=String(name||'').trim();
  for(const k of SCHOOL_KIND_PRESETS){ if(s.length>k.length && s.endsWith(k))return s.slice(0,-k.length).trim(); }
  return s;
}
function composeSchoolName(base,kind){
  const b=String(base||'').trim();
  const k=String(kind||'').trim();
  return b+k;
}
function isOwnTeamName(team){return team==='若葉高校'||team===ownSchoolName();}
function showTitleScreenIfNeeded(){
  const m=document.getElementById('titleScreen');
  if(!m)return;
  const sessionStarted=ssGet(STORAGE_KEY+'-session-started')==='1';
  const introActive=ssGet(STORAGE_KEY+'-intro-active')==='1';
  m.classList.toggle('hidden', sessionStarted||introActive);
}
let introSelectedManager=null;
function startGameFromTitle(){
  // v118: 「始める」は新規ゲーム。前回のセーブが state に読み込まれたままだと、
  //       managerUnlocked() が前のデータの学校格を見てしまい、本来まだ選べないマネージャーが
  //       選択できてしまう。ここで状態を初期化してから導入に入る。
  state=initialState();
  ensureData();
  ssSet(STORAGE_KEY+'-intro-active','1');
  document.getElementById('titleScreen')?.classList.add('hidden');
  introSelectedManager=null;
  openIntroNarration(0);
}
// v118: タイトル画面から「セーブから始める」。セーブ一覧を開いて選んでもらう。
function startFromSaveAtTitle(){
  ssSet(STORAGE_KEY+'-session-started','1');
  document.getElementById('titleScreen')?.classList.add('hidden');
  // v181: スロットが無くなったので、そのままファイル選択を開く。
  document.getElementById('saveImportInput')?.click();
  managerSay('書き出しておいたセーブファイルを選んでください。');
}
if(typeof window!=='undefined')window.startFromSaveAtTitle=startFromSaveAtTitle;
function openIntroNarration(step=0){
  const modal=document.getElementById('introFlowModal'), box=document.getElementById('introFlowContent');
  if(!modal||!box)return;
  const lines=[
    '春。小さな体育館に、春高を夢見る女子バレー部の声が響き始めます。',
    'あなたは、新設校の女子バレー部を任された新監督です。部員は12人。ここから春高の頂点を目指します。',
    'まずは、チームを支えるマネージャーを選びましょう。誰と歩き出すかで、少しだけチームの色が変わります。'
  ];
  if(step<lines.length-1){
    box.innerHTML=`<div class="intro-narration">${lines[step]}</div><div class="action-row top-gap"><button class="primary" type="button" onclick="openIntroNarration(${step+1})">次へ</button></div>`;
  }else{
    box.innerHTML=`<div class="intro-narration">${lines[step]}</div><div class="action-row top-gap"><button class="primary" type="button" onclick="openManagerSelectModal()">マネージャーを選ぶ</button></div>`;
  }
  modal.classList.remove('hidden');
  modal.style.display='flex';
}
function managerSelectCardsHtml(clickFn='selectIntroManager'){
  return MANAGER_PORTRAIT_POOL.map((src,i)=>{
    const unlocked=managerUnlocked(src);
    const info=managerInfo(src);
    return `<button class="manager-select-card ${unlocked?'':'locked'}" type="button" data-manager-src="${src}" ${unlocked?'': 'disabled'}>
      <img src="${src}" alt="${info.name}">
      <span>${info.name}</span>
      <small>${managerEffectText(src)}</small>
      ${unlocked?'':'<em>まだ選べません</em>'}
    </button>`;
  }).join('');
}
function openManagerSelectModal(){
  const box=document.getElementById('introFlowContent');
  if(!box)return;
  box.innerHTML=`<div class="intro-narration">担当マネージャーを選んでください。</div><div class="manager-select-grid">${managerSelectCardsHtml('selectIntroManager')}</div>`;
  box.querySelectorAll('.manager-select-card:not(.locked)').forEach(btn=>btn.addEventListener('click',()=>selectIntroManager(btn.dataset.managerSrc)));
}
function selectIntroManager(src){
  introSelectedManager=src||defaultManagerPortrait();
  const box=document.getElementById('introFlowContent');
  if(!box)return;
  // v213: 学校名は「名前」と「種別」に分けて決める（Tak指示）。
  introSchoolKind='高校';
  box.innerHTML=`<div class="intro-manager-line"><img src="${introSelectedManager}" alt=""><div class="intro-narration">${managerNameForPortrait(introSelectedManager)}「よろしくお願いします、監督。春高を目指す学校の名前と種別を教えてください。」</div></div>`
    +`<label class="field-label top-gap" for="introSchoolNameInput">学校名（8文字以内）</label>`
    +`<input id="introSchoolNameInput" class="school-name-input" maxlength="8" value="若葉" oninput="updateIntroSchoolPreview()">`
    +`<div class="field-label top-gap">種別</div>`
    +`<div class="school-kind-grid" id="introSchoolKindGrid">${introSchoolKindChipsHtml()}</div>`
    +`<div class="school-name-preview top-gap">この学校の名前：<strong id="introSchoolPreview">若葉高校</strong></div>`
    +`<div class="action-row top-gap"><button class="primary" type="button" onclick="confirmIntroSchoolName()">この学校で始める</button></div>`
    +`<div id="introSchoolNameError" class="hint top-gap"></div>`;
  setTimeout(()=>document.getElementById('introSchoolNameInput')?.focus(),50);
}
// v213: 種別の選択チップ。表示順は選びやすさ優先（配列は照合用に長い順なので並べ替える）。
const SCHOOL_KIND_CHOICE_ORDER=['高校','高等学校','女子高','女子高校','女子高等学校','高等女学校','高等部','学院','女学院','女子学院','学園','女学園','学館','女学館','ハイスクール','アカデミー'];
let introSchoolKind='高校';
function introSchoolKindChipsHtml(){
  return SCHOOL_KIND_CHOICE_ORDER.map(k=>`<button type="button" class="school-kind-chip${k===introSchoolKind?' selected':''}" onclick="selectIntroSchoolKind('${k}')">${k}</button>`).join('');
}
function selectIntroSchoolKind(kind){
  introSchoolKind=SCHOOL_KIND_CHOICE_ORDER.includes(kind)?kind:'高校';
  const grid=document.getElementById('introSchoolKindGrid');
  if(grid)grid.innerHTML=introSchoolKindChipsHtml();
  updateIntroSchoolPreview();
}
if(typeof window!=='undefined')window.selectIntroSchoolKind=selectIntroSchoolKind;
function introSchoolNameParts(){
  const input=document.getElementById('introSchoolNameInput');
  let base=stripSchoolKindSuffix(input?.value||'');
  if(!base)base='若葉';
  const kind=SCHOOL_KIND_CHOICE_ORDER.includes(introSchoolKind)?introSchoolKind:'高校';
  return {base,kind,full:composeSchoolName(base,kind)};
}
function updateIntroSchoolPreview(){
  const el=document.getElementById('introSchoolPreview');
  if(el)el.textContent=introSchoolNameParts().full;
}
if(typeof window!=='undefined')window.updateIntroSchoolPreview=updateIntroSchoolPreview;
function confirmIntroSchoolName(){
  const input=document.getElementById('introSchoolNameInput');
  const err=document.getElementById('introSchoolNameError');
  const raw=stripSchoolKindSuffix(input?.value||'');
  if(!raw){if(err)err.textContent='学校名を入力してください。';return;}
  if(raw.length>8){if(err)err.textContent='学校名は8文字以内にしてください（種別を除いた部分）。';return;}
  const parts=introSchoolNameParts();
  const name=parts.full;
  state=initialState();
  state.schoolBaseName=parts.base;
  state.schoolKind=parts.kind;
  state.managerPortrait=introSelectedManager||defaultManagerPortrait();
  state.schoolName=name;
  state.gameIntroDone=true;
  state.initialAprilNoEvents=true;
  state.autoCoachScreenKey=actionPromptKey();
  state.lastActionPromptKey=actionPromptKey();
  state.managerMessage=`${name}女子バレー部、始動です。まずは4月の練習でチームの基礎を作りましょう。`;
  state.trainingLog=[`ナレーション：${name}女子バレー部の物語が始まりました。`];
  // v196: 学校名を決めたあと、最初に声を掛けてくる1年生との会話に入る（Tak指示）。
  //        セーブと導入の終了処理は、その会話が終わってから finishIntroAfterPromise() で行う。
  //        途中でリロードした場合は導入がやり直しになる。
  openPromiseRookieIntro(0);
}
function finishIntroAfterPromise(){
  saveState();
  ssRemove(STORAGE_KEY+'-intro-active');
  ssSet(STORAGE_KEY+'-session-started','1');
  const modal=document.getElementById('introFlowModal');
  if(modal){modal.classList.add('hidden');modal.style.display='';}
  switchTab('dashboard');
  renderAll();
}
if(typeof window!=='undefined')window.finishIntroAfterPromise=finishIntroAfterPromise;

// ============================================================
// v196: ゲーム開始時「最初の約束」（Tak指示）
//   新任監督に最初に声を掛けてくる1年生を、会話の流れの中で作る。
//   名前・希望ポジション・顔・得意能力3つ・性格の5項目を、設定画面ではなく会話の中で決める。
//   監督は一切しゃべらない。選択肢がそのまま監督の意思表示になる。
//   能力は天才ではなくD帯。得意3つだけD帯上位、他はD帯下位。
//   （現行の ratingLetter では 10〜12 がD。上位=12、下位=10 とする）
// ============================================================
const PROMISE_D_HIGH=12;   // 得意能力3つ
const PROMISE_D_LOW=10;    // それ以外
// 仕様書に並んだ順。身長は対象外。
const PROMISE_STRENGTH_KEYS=['spikePower','spikeControl','jump','blockStuff','blockRead','servePower','serveControl','recReception','recDig','recRange','tossAccuracy','tossRead','stamina','mental'];
const PROMISE_PERSONALITY_CHOICES=[
  {type:'普通',      line:'何かひとつじゃなくて、何でもできるようになりたいです。',           reply:'高校では、できることをひとつずつ増やしていきたいです。'},
  {type:'負けず嫌い',line:'負けるのが、本当に嫌なんです。次は絶対にって、ずっと思っちゃいます。',reply:'ベンチで負けるのを見るのは、もう嫌なんです。'},
  {type:'冷静',      line:'苦しいときほど、慌てない選手になりたいです。',                     reply:'今度は、コートの中でちゃんと考えられる選手になりたいです。'},
  {type:'献身的',    line:'自分が目立つより、みんながプレーしやすくなる方が嬉しいです。',       reply:'自分のプレーで、誰かが楽になれたらいいなって思います。'},
  {type:'熱血',      line:'最後まで声を出して、気持ちでは絶対に負けたくないです。',            reply:'今度はコートの中から、みんなに声をかけたいです。'}
];
let promiseDraft=null;
function promiseFaceHtml(){
  const src=promiseDraft&&promiseDraft.portrait;
  // 顔が決まる前はシルエット表示にする
  return `<div class="promise-face">${src?`<img src="${src}" alt="">`:'<div class="promise-face-silhouette"></div>'}</div>`;
}
function promiseSay(lines){
  return `<div class="promise-talk">${lines.map(x=>`<p class="promise-line">${x}</p>`).join('')}</div>`;
}
function promiseNarration(lines){
  return `<div class="promise-narration">${lines.map(x=>`<p>${x}</p>`).join('')}</div>`;
}
function promiseRender(inner){
  const box=document.getElementById('introFlowContent');
  const modal=document.getElementById('introFlowModal');
  if(!box||!modal)return;
  box.innerHTML=`<div class="promise-scene">${promiseFaceHtml()}<div class="promise-body">${inner}</div></div>`;
  modal.classList.remove('hidden');
  modal.style.display='flex';
}
function promiseName(){return (promiseDraft&&promiseDraft.name)||'その子';}
// 1. 導入
function openPromiseRookieIntro(step=0){
  if(step===0)promiseDraft={name:'',role:'',portrait:'',strengths:[],personality:''};
  const pages=[
    promiseNarration(['4月。新しく監督として体育館に足を踏み入れた日のことだった。','練習後、帰り支度をしていると、ひとりの1年生が少し迷った様子でこちらへ近づいてきた。']),
    promiseSay(['「……あの。今日から来た、新しい監督ですよね。」','「私、中学ではずっとベンチだったんです。」','「試合に出たことも、ほとんどなくて。」','「だから、高校でも同じなのかなって、少し思ってました。」']),
    promiseSay(['「でも、新しい監督が来るって聞いて……」','「高校では、今までと違う3年間にしたいって思ったんです。」','「私、ちゃんと選手になりたいです。」'])
  ];
  if(step<pages.length-1){
    promiseRender(pages[step]+`<div class="action-row top-gap"><button class="primary" type="button" onclick="openPromiseRookieIntro(${step+1})">次へ</button></div>`);
  }else{
    promiseRender(pages[step]+`<div class="action-row top-gap"><button class="primary" type="button" onclick="openPromiseNameStep()">次へ</button></div>`);
  }
}
if(typeof window!=='undefined')window.openPromiseRookieIntro=openPromiseRookieIntro;
// 2. 名前
function openPromiseNameStep(){
  promiseRender(
    promiseSay(['「……そうだ。まだ名前、言ってませんでした。」','「私の名前は――」'])+
    `<label class="field-label top-gap" for="promiseNameInput">名前</label>
     <input id="promiseNameInput" class="school-name-input" maxlength="12" placeholder="例：日向 千尋">
     <div class="action-row top-gap"><button class="primary" type="button" onclick="confirmPromiseName()">名前を伝える</button></div>
     <div id="promiseNameError" class="hint top-gap"></div>`
  );
  setTimeout(()=>document.getElementById('promiseNameInput')?.focus(),50);
}
if(typeof window!=='undefined')window.openPromiseNameStep=openPromiseNameStep;
function confirmPromiseName(){
  const input=document.getElementById('promiseNameInput');
  const err=document.getElementById('promiseNameError');
  const name=(input?.value||'').trim();
  if(!name){if(err)err.textContent='名前を入力してください。';return;}
  if(name.length>12){if(err)err.textContent='名前は12文字以内にしてください。';return;}
  promiseDraft.name=name;
  promiseRender(
    promiseSay([`「${escapeAttrText(name)}です。」`,'「これから、よろしくお願いします。」'])+
    `<div class="action-row top-gap"><button class="primary" type="button" onclick="openPromisePositionStep()">次へ</button></div>`
  );
}
if(typeof window!=='undefined')window.confirmPromiseName=confirmPromiseName;
// 3. 希望ポジション
function openPromisePositionStep(){
  const labels={OH:'アウトサイドヒッター（OH）',MB:'ミドルブロッカー（MB）',OP:'オポジット（OP）',S:'セッター（S）',L:'リベロ（L）'};
  promiseRender(
    promiseSay(['「中学では、試合に出ることがほとんどなかったので……」','「高校では、自分が本当にやりたいポジションで挑戦してみたいんです。」','「私は――」'])+
    `<div class="promise-choice-grid top-gap">${POSITIONS.map(x=>`<button class="promise-choice" type="button" onclick="selectPromisePosition('${x}')">${labels[x]||x}</button>`).join('')}</div>`
  );
}
if(typeof window!=='undefined')window.openPromisePositionStep=openPromisePositionStep;
function selectPromisePosition(role){
  if(!POSITIONS.includes(role))return;
  promiseDraft.role=role;
  promiseRender(
    promiseSay([`「${role}で頑張りたいです。」`,'「まだ全然足りないけど、そこで勝負できる選手になりたいです。」'])+
    `<div class="action-row top-gap"><button class="primary" type="button" onclick="openPromiseFaceStep()">次へ</button></div>`
  );
}
if(typeof window!=='undefined')window.selectPromisePosition=selectPromisePosition;
// 4. 顔
function openPromiseFaceStep(){
  // 希望ポジションに合う専用顔グラだけを候補にする
  const pool=EXCLUSIVE_TALENT_PORTRAITS.filter(src=>talentPortraitFitsRole(src,promiseDraft.role));
  const list=pool.length?pool:EXCLUSIVE_TALENT_PORTRAITS.filter(src=>talentPortraitAction(src)==='neutral');
  promiseRender(
    promiseNarration(['そう話す彼女の表情を、改めて見つめる。'])+
    `<div class="promise-step-head top-gap">${escapeAttrText(promiseName())}のイメージを選んでください</div>
     <div class="promise-face-grid">${list.map(src=>`<button class="promise-face-pick" type="button" onclick="selectPromiseFace('${src}')"><img src="${src}" alt=""></button>`).join('')}</div>`
  );
}
if(typeof window!=='undefined')window.openPromiseFaceStep=openPromiseFaceStep;
function selectPromiseFace(src){
  if(!EXCLUSIVE_TALENT_PORTRAITS.includes(src))return;
  promiseDraft.portrait=src;
  openPromiseStrengthStep();
}
if(typeof window!=='undefined')window.selectPromiseFace=selectPromiseFace;
// 5. 得意能力3つ
function openPromiseStrengthStep(){
  promiseRender(
    promiseSay(['「でも、何もできないわけじゃないんです。」','「中学でも、練習だけはずっとやってきたから……」','「自分では、少しだけ得意だと思ってることがあります。」','「3つくらいなら……胸を張って言えます。」'])+
    `<div class="promise-step-head top-gap">${escapeAttrText(promiseName())}が少し自信を持っていることを3つ選ぶ</div>
     <div class="promise-choice-grid promise-strength-grid">${PROMISE_STRENGTH_KEYS.map(k=>`<button class="promise-choice" type="button" data-strength="${k}" onclick="togglePromiseStrength('${k}')">${compLabel(k)}</button>`).join('')}</div>
     <div id="promiseStrengthCount" class="hint top-gap">あと3つ</div>
     <div class="action-row top-gap"><button id="promiseStrengthNext" class="primary" type="button" disabled onclick="confirmPromiseStrengths()">この3つで決める</button></div>`
  );
  promiseDraft.strengths=[];
  refreshPromiseStrengthUi();
}
if(typeof window!=='undefined')window.openPromiseStrengthStep=openPromiseStrengthStep;
function togglePromiseStrength(key){
  if(!PROMISE_STRENGTH_KEYS.includes(key))return;
  const i=promiseDraft.strengths.indexOf(key);
  if(i>=0)promiseDraft.strengths.splice(i,1);
  else if(promiseDraft.strengths.length<3)promiseDraft.strengths.push(key);
  refreshPromiseStrengthUi();
}
if(typeof window!=='undefined')window.togglePromiseStrength=togglePromiseStrength;
function refreshPromiseStrengthUi(){
  const n=promiseDraft.strengths.length;
  document.querySelectorAll('[data-strength]').forEach(btn=>{
    btn.classList.toggle('is-selected',promiseDraft.strengths.includes(btn.dataset.strength));
  });
  const c=document.getElementById('promiseStrengthCount');
  if(c)c.textContent=n>=3?'3つ選びました。':`あと${3-n}つ`;
  const b=document.getElementById('promiseStrengthNext');
  if(b)b.disabled=(n!==3);
}
function confirmPromiseStrengths(){
  if(promiseDraft.strengths.length!==3)return;
  promiseRender(
    promiseSay(['「この3つは、中学でもずっと練習してきました。」','「まだ上手いって言えるほどじゃないけど……」','「高校では、もっと伸ばしたいです。」'])+
    `<div class="action-row top-gap"><button class="primary" type="button" onclick="openPromisePersonalityStep()">次へ</button></div>`
  );
}
if(typeof window!=='undefined')window.confirmPromiseStrengths=confirmPromiseStrengths;
// 6. 性格
function openPromisePersonalityStep(){
  promiseRender(
    promiseSay(['「中学では、ベンチにいる時間が長かったから……」','「そのぶん、自分がどんな選手になりたいかは、よく考えてました。」','「私がプレーするときに大事にしたいのは――」'])+
    `<div class="promise-choice-grid promise-personality-grid top-gap">${PROMISE_PERSONALITY_CHOICES.map((c,i)=>`<button class="promise-choice promise-choice-line" type="button" onclick="selectPromisePersonality(${i})">「${c.line}」</button>`).join('')}</div>`
  );
}
if(typeof window!=='undefined')window.openPromisePersonalityStep=openPromisePersonalityStep;
function selectPromisePersonality(i){
  const c=PROMISE_PERSONALITY_CHOICES[i];
  if(!c)return;
  promiseDraft.personality=c.type;
  promiseRender(
    promiseSay([`「${c.reply}」`])+
    `<div class="action-row top-gap"><button class="primary" type="button" onclick="openPromiseFinalStep()">次へ</button></div>`
  );
}
if(typeof window!=='undefined')window.selectPromisePersonality=selectPromisePersonality;
// 7. 3年間の目標
function openPromiseFinalStep(){
  promiseRender(
    promiseSay(['「……監督。」','「私、中学のときは、試合に出る側じゃありませんでした。」','「ずっと応援席から、先輩たちの試合を見てました。」','「一度だけ、決勝を見に行ったことがあって。」','「体育館の音が、全然違うんです。」','「コートに立ってる人たちが、遠くて、まぶしくて。」','「……いつか、あの舞台に立ちたいって思いました。」','「優勝したい、なんてところまでは言えません。」','「でも、卒業するまでに一度でいいから、決勝のコートに立ちたいです。」','「今の私がそんなこと言うの、変かもしれないけど。」','「新しい監督が来るって聞いたとき、もしかしたら、って思ったんです。」','「……これから3年間、よろしくお願いします。」'])+
    `<div class="action-row top-gap"><button class="primary" type="button" onclick="commitPromiseRookie()">次へ</button></div>`
  );
}
if(typeof window!=='undefined')window.openPromiseFinalStep=openPromiseFinalStep;
// 選手データを作って入部させる
function createPromiseRookie(){
  const d=promiseDraft||{};
  const role=POSITIONS.includes(d.role)?d.role:'OH';
  const comps={};
  COMP_KEYS.forEach(k=>{comps[k]=(d.strengths||[]).includes(k)?PROMISE_D_HIGH:PROMISE_D_LOW;});
  const id='promise_rookie';
  const height=initialHeightFor(role, randomInt(0,10));
  const pl=p(id, d.name||'新入生', 1, role, '最初の約束', d.portrait||pickExclusiveTalentPortrait([], {role}), height, '普通', false, 0, [], comps);
  pl.personality=PERSONALITY_TYPES.includes(d.personality)?d.personality:'普通';
  pl.joinSource='最初の約束';
  ensurePlayerComponentData(pl);
  return pl;
}
function commitPromiseRookie(){
  const pl=createPromiseRookie();
  state.players.push(pl);
  state.promiseRookieId=pl.id;
  // その子が3年生になる年＝開始年の2年後。この年の地区大会優勝が最初の大目標。
  state.promiseTargetYear=(state.year||1)+2;
  // v213: 目標を「地区大会優勝」から「地区大会の決勝の舞台に立つ」へ（Tak指示）。
  state.promiseDistrictWon=false;
  state.promiseFinalReached=false;
  state.promiseReachEventShown=false;
  state.promisePendingReachEvent=false;
  state.promiseGraduationPending=null;
  state.promiseLastPrefPreShown=false;
  state.promiseLastPrefPostShown=false;
  ensureBenchIds();
  const nm=escapeAttrText(pl.name);
  state.trainingLog.push(`最初の約束：${nm}が3年生になる年（${state.promiseTargetYear}年目）までに、地区大会の決勝の舞台に立つことを目指します。`);
  promiseRender(
    promiseNarration(['その日、最初に声を掛けてきた1年生。','彼女との3年間が始まった。'])+
    `<div class="promise-vow top-gap">
       <div class="promise-vow-head">最初の約束</div>
       <div class="promise-vow-body">${nm}が卒業するまでに、地区大会の決勝の舞台に立つ。</div>
     </div>
     <div class="action-row top-gap"><button class="primary" type="button" onclick="finishIntroAfterPromise()">はじめる</button></div>`
  );
}
if(typeof window!=='undefined')window.commitPromiseRookie=commitPromiseRookie;
function promiseRookie(){
  if(!state||!state.promiseRookieId)return null;
  return (state.players||[]).find(x=>x.id===state.promiseRookieId)||null;
}
// v197: 「最初の約束」の進級・卒業イベント（Tak指示／Supabaseの確定短縮版の台詞をそのまま使用）。
//   監督はここでも一切しゃべらない。選手の台詞と短い地の文だけで進める。
//   各イベントは一度だけ。台詞は実際のプレイ結果と矛盾しないものに限る
//   （卒業の分岐は state.promiseDistrictWon＝在籍中に地区大会で優勝したかで決まる）。
const PROMISE_STORY_EVENTS={
  // --- 2年生の4月 ---
  grade2:{
    title:'最初の約束・2年生',
    pages:[
      '4月。あの日の1年生も、今日から2年生になった。',
      '「監督。もう1年経ったんですね。」<br>「去年は、中学でずっとベンチだったことばかり気にしてました。」<br>「でも、もう後輩も入ってくるし……いつまでもそんなこと言ってられないですよね。」',
      '「あと2年あります。」<br>「決勝のコート、まだ諦めてませんから。」',
      '少し頼もしくなった背中で、彼女は体育館へ戻っていった。'
    ]
  },
  grade2Done:{
    title:'最初の約束・2年生',
    pages:[
      '4月。あの日の1年生も、今日から2年生になった。',
      '「監督。去年の決勝、まだ夢みたいです。」<br>「応援席から見てた景色の中に、自分が立ってたんですよね。」',
      '「……でも、一回だけじゃ満足できません。」<br>「何回でも、私、あの舞台に立ちたいです。」<br>「あと2年あります。付き合ってください。」',
      '少し頼もしくなった背中で、彼女は体育館へ戻っていった。'
    ]
  },
  // --- 3年生の4月 ---
  grade3:{
    title:'最初の約束・3年生',
    pages:[
      '4月。最後の春がやってきた。',
      '「監督。とうとう3年生です。」<br>「最初の日に、決勝のコートに立ちたいって言ったの、覚えてます。」<br>「あの頃はずいぶん大きなこと言ったなって思いますけど……」',
      '「今は違います。手ごたえがあるんです。」<br>「去年の自分とは、練習で見えてるものが変わりました。」<br>「今年なら絶対に行けるって、本気で信じています。」',
      '「最後の一年、お願いします。」',
      '三年前には遠すぎた場所が、いま手の届くところにある。'
    ]
  },
  grade3Done:{
    title:'最初の約束・3年生',
    pages:[
      '4月。最後の春がやってきた。',
      '「監督。とうとう3年生です。」<br>「最初の日に言った約束は、もう果たしてもらいました。」',
      '「だから、目標を変えます。」<br>「立つだけじゃもう足りません。」<br>「あの舞台で、勝ちたいです。」',
      '「最後の一年、お願いします。」',
      '約束を果たした彼女が、次の約束を自分で作った。'
    ]
  },
  // --- 決勝の舞台に初めて立った試合の直後（勝敗は問わない） ---
  reached:{
    title:'最初の約束・決勝の舞台',
    pages:[
      '地区大会、決勝。<br>コートの照明が、いつもの体育館より少し明るく見えた。',
      '「監督。」<br>「私、いま、あの舞台に立ってました。」',
      '彼女はコートの真ん中を見たまま、しばらく動かなかった。',
      '「中学のとき、応援席から見てた景色です。」<br>「反対側から見ると、こんな風なんですね。」',
      '「……約束、果たせました。」<br>「ありがとうございます。」',
      '三年前の約束が、ひとつ果たされた。'
    ]
  },
  // --- 3年目・最後の地区大会の前（10月第4週） ---
  lastPrefPre:{
    title:'最初の約束・最後の地区大会',
    pages:[
      '11月。最後の地区大会が、来週から始まる。',
      '練習が終わったあと、彼女が体育館に残っていた。',
      '「監督。次で最後ですね。」<br>「1年生のときに言ったこと、まだ果たせてません。」',
      '「……正直、間に合うかなって思う日もあります。」<br>「でも、ここまで来たら、行けるところまで行きたいです。」',
      '「一回でいいんです。あのコートに立たせてください。」',
      '彼女はボールを片付けて、電気を消した。'
    ]
  },
  lastPrefPreDone:{
    title:'最初の約束・最後の地区大会',
    pages:[
      '11月。最後の地区大会が、来週から始まる。',
      '練習が終わったあと、彼女が体育館に残っていた。',
      '「監督。次で最後ですね。」<br>「約束はもう果たしてもらったので、あとはおまけです。」',
      'そう言って笑ってから、少し黙った。',
      '「……嘘です。」<br>「もう一回、あの場所に立ちたいです。」<br>「今度は、勝って終わりたい。」',
      '彼女はボールを片付けて、電気を消した。'
    ]
  },
  // --- 3年目・最後の地区大会のあと（11月第4週） ---
  lastPrefPost:{
    title:'最初の約束・地区大会を終えて',
    pages:[
      '地区大会が終わった。',
      '体育館に戻ると、彼女がひとりで壁際に座っていた。',
      '「監督。」<br>「……届きませんでした。」',
      'しばらく、どちらも何も言わなかった。',
      '「悔しいです。すごく。」<br>「やれることは全部やったつもりです。それでも、届かなかった。」',
      '「最後まで、よろしくお願いします。」',
      '彼女は立ち上がって、いつもの場所へ戻っていった。'
    ]
  },
  // v215: 春高地区大会を勝ち抜いて全国大会へ進んだ場合。まだ大会は終わっていないので、
  //        「終わってしまった」言い方をしない（Tak指示）。
  lastPrefPostNationals:{
    title:'最初の約束・地区大会を終えて',
    pages:[
      '地区大会が終わった。',
      '体育館に戻ると、彼女がまだコートのほうを見ていた。',
      '「監督。」<br>「最後の大会でも、勝ててよかったです。」',
      '「……本当に信じられません。」<br>「1年生のときの私に言っても、絶対に信じないと思います。」',
      '「それに、まだ終わらないんですよね。」<br>「次は全国です。」<br>「夢みたいです。」',
      '彼女は振り返って、深く頭を下げた。'
    ]
  },
  lastPrefPostDone:{
    title:'最初の約束・地区大会を終えて',
    pages:[
      '地区大会が終わった。',
      '体育館に戻ると、彼女がひとりで壁際に座っていた。',
      '「監督。終わっちゃいましたね。」<br>「三年間、あっという間でした。」',
      '「中学のときの私に教えてあげたいです。」<br>「応援席で見てたあの場所、ちゃんと立てたよって。」',
      '彼女は立ち上がって、いつもの場所へ戻っていった。'
    ]
  },
  // --- 卒業 ---
  graduationWon:{
    title:'最初の約束・卒業',
    pages:[
      '卒業の日。彼女が体育館で待っていた。',
      '「監督。最初の日のこと、覚えてます。」<br>「中学ではずっとベンチで、高校では変わりたいって……」<br>「それで、決勝のコートに立ちたいって。」<br>「本当に……立てたんですよね。」',
      'その瞬間、彼女の声が震えた。<br>「……だめだ。卒業式では泣かなかったのに。」',
      '涙を拭いながら、彼女は笑った。<br>「中学の頃は、こんなの自分には関係ないと思ってました。」<br>「でも私……ちゃんと選手になれました。」',
      '「あの日、監督に声を掛けてよかったです。」<br>「三年間、本当にありがとうございました。」',
      '三年前、最初に声を掛けてきた1年生。<br><strong>最初の約束は、果たされた。</strong>'
    ]
  },
  graduationLost:{
    title:'最初の約束・卒業',
    pages:[
      '卒業の日。彼女が体育館で待っていた。',
      '「監督。」<br>「……やっぱり、悔しいです。」<br>「あのコートに立ちたかった。最初の日に、自分で言ったことだから。」',
      '少し黙って、彼女は体育館を見渡した。<br>「でも、高校でバレーを続けてよかったです。」<br>「あの日、監督に声を掛けなかったら、こんな三年間にはならなかったと思います。」<br>「三年間、ありがとうございました。」',
      'そして最後に、彼女は振り返った。<br>「……いつか、後輩たちをあの舞台に連れて行ってください。」',
      '最初の約束は果たせなかった。<br>彼女との三年間が終わった。'
    ]
  }
};
// 挿絵はその子の顔グラを使う。EVENT_ILLUSTRATIONS はキー→パスの対応表なので、
// 出すたびに約束の子の顔を差し込む。
function showPromiseStoryEvent(key, player){
  const ev=PROMISE_STORY_EVENTS[key];
  if(!ev||!player)return;
  EVENT_ILLUSTRATIONS.promise_rookie_face=player.portrait||'assets/new_shino.png';
  enqueueStoryEvent(ev.title, ev.pages, 'promise_rookie_face', 'event');
}
// 4月の進級直後に呼ぶ。2年・3年になった年に一度だけ。
function maybePromiseGradeUpEvent(){
  const pr=promiseRookie();
  if(!pr)return;
  // v213: すでに決勝の舞台に立てているかで台詞を分ける（Tak指示）。
  const done=!!state.promiseFinalReached;
  if(pr.year===2 && !state.promiseGrade2Shown){
    state.promiseGrade2Shown=true;
    showPromiseStoryEvent(done?'grade2Done':'grade2',pr);
  }else if(pr.year===3 && !state.promiseGrade3Shown){
    state.promiseGrade3Shown=true;
    showPromiseStoryEvent(done?'grade3Done':'grade3',pr);
  }
}
// v213: 決勝の舞台に初めて立った試合の直後に1回だけ（勝敗は問わない・Tak指示）。
//        大会側の演出を積んだあとに流したいので、予約（promisePendingReachEvent）を経由する。
function maybePromiseFinalReachedEvent(){
  const pr=promiseRookie();
  if(!pr)return;
  if(state.promiseReachEventShown)return;
  state.promiseReachEventShown=true;
  showPromiseStoryEvent('reached',pr);
}
function flushPromiseFinalReachedEvent(){
  if(!state.promisePendingReachEvent)return;
  state.promisePendingReachEvent=false;
  maybePromiseFinalReachedEvent();
}
// v213: 3年目の春高地区大会（＝約束を果たす最後の機会）の前後に1回ずつ（Tak指示）。
//        前＝10月第4週、後＝11月第4週。どちらも達成済みかどうかで台詞を分ける。
function maybePromiseLastPrefEvents(){
  const pr=promiseRookie();
  if(!pr)return;
  if((Number(state.year)||1)!==(Number(state.promiseTargetYear)||0))return;
  const done=!!state.promiseFinalReached;
  if(state.monthIndex===6 && state.turnIndex===3 && !state.promiseLastPrefPreShown){
    state.promiseLastPrefPreShown=true;
    showPromiseStoryEvent(done?'lastPrefPreDone':'lastPrefPre',pr);
    return;
  }
  if(state.monthIndex===7 && state.turnIndex===3 && !state.promiseLastPrefPostShown){
    state.promiseLastPrefPostShown=true;
    // v215: 春高地区を勝ち抜いて全国出場が決まっている年は、まだ大会が終わっていない（Tak指示）。
    const key=state.qualifiedHaruko?'lastPrefPostNationals':(done?'lastPrefPostDone':'lastPrefPost');
    showPromiseStoryEvent(key,pr);
  }
}
// v215: 卒業イベントは3月第3週に出す（Tak指示）。
//        3年生の引退は通常1月第4週なので、その時点では名前と顔を預かるだけにして、
//        3月第3週になったらここで出す。
//        春高全国優勝年だけは引退が3月第4週（OG特別試合のあと）で、3月第3週を過ぎている。
//        その年は預かりを作らず引退の直後に出す。3月第3週はOG戦の週でもあるので、
//        先に卒業させてしまうと、まだ試合を控えている選手に別れを告げることになる。
function maybePromiseGraduationWeek(){
  if(state.promiseGraduationShown)return;
  if(state.monthIndex!==11||state.turnIndex!==2)return;
  const who=state.promiseGraduationPending;
  if(!who)return;
  state.promiseGraduationShown=true;
  state.promiseGraduationPending=null;
  showPromiseStoryEvent(state.promiseFinalReached?'graduationWon':'graduationLost', who);
}
// 引退（卒業）のときに呼ぶ。名簿から消える前に呼ぶこと。
// v215: 通常はここでは出さず、名簿から消える前に名前と顔を預かって3月第3週に出す（Tak指示）。
//        ただし3月第3週を過ぎてからの引退（春高全国優勝年の3月第4週）は、預かっても
//        次の3月第3週が1年先になってしまうので、その場で出す。
function maybePromiseGraduationEvent(retirees){
  if(state.promiseGraduationShown)return;
  if(state.promiseGraduationPending)return;
  const pr=promiseRookie();
  if(!pr)return;
  if(!(retirees||[]).some(x=>x&&x.id===pr.id))return;
  const who={name:pr.name,portrait:pr.portrait||''};
  if(state.monthIndex===11&&state.turnIndex>=2){
    state.promiseGraduationShown=true;
    showPromiseStoryEvent(state.promiseFinalReached?'graduationWon':'graduationLost', who);
    return;
  }
  state.promiseGraduationPending=who;
}
function managerSay(msg){state.managerMessage=msg;const el=document.getElementById('managerMessage');if(el)el.innerHTML=managerInlineHtml(msg,{icon:false});updateManagerDockSpacing();}
// v183: 「メモ」タブを削除したため、イベント省略モードの切り替え口が無くなった（Tak指示）。
//        判定関数だけ残し（呼び出し側を触らずに済ませるため）、常に false を返す。
//        古いセーブで ON になっていても ensureData で false に戻る。
function eventSkipModeOn(){return false;}
function managerLogEntry(html){return `<div class="manager-log-entry log-text-only"><div class="manager-log-bubble"><div class="manager-log-text">${html}</div></div></div>`;}
const COACH_ACTION_LABELS={scout:'スカウト',individual:'個別練習',recreation:'レクリエーション',pro_watch:'プロの試合見学',director:'監督活動'};
function coachActionLabel(action){return COACH_ACTION_LABELS[action]||'未決定';}
function coachActionExecutedThisMonth(){return state.coachActionExecutedMonthKey===currentMonthKey();}
function markCoachActionExecutedThisMonth(){state.coachActionExecutedMonthKey=currentMonthKey();}
function coachActionInMatchWeekMode(){return !!state.coachActionMatchWeekMode;}


const COACH_STAT_MAX_LEVEL=5;
const COACH_STAT_XP_THRESHOLDS=[0,100,180,280,400,99999];
const COACH_STAT_DEFS={
  guidance:{label:'指導力',action:'個別練習',desc:'通常練習・個別練習の伸びに影響します。'},
  analysis:{label:'分析力',action:'プロ観戦',desc:'特殊能力ヒントイベントとプロ観戦の取得率に影響します。'},
  scout:{label:'スカウト力',action:'スカウト',desc:'スカウトの大成功率・失敗率に影響します。'},
  network:{label:'人脈',action:'監督活動',desc:'チームイベントや外部イベントの発生率に影響します。'},
  motivation:{label:'モチベ管理',action:'レクリエーション',desc:'調子回復と調子低下の抑制、レクリエーションの疲労回復量、通常練習でたまる疲労の軽さに影響します。'}
};
function ensureCoachStats(){
  if(!state.coachStats)state.coachStats={};
  for(const key of Object.keys(COACH_STAT_DEFS)){
    if(!state.coachStats[key])state.coachStats[key]={level:1,xp:0};
    const s=state.coachStats[key];
    if(typeof s.level!=='number')s.level=1;
    if(typeof s.xp!=='number')s.xp=0;
    s.level=clamp(Math.round(s.level),1,COACH_STAT_MAX_LEVEL);
  }
}
function coachStatLevel(stat){ensureCoachStats();return state.coachStats?.[stat]?.level||1;}
function coachStatXp(stat){ensureCoachStats();return state.coachStats?.[stat]?.xp||0;}
function coachAnalysisLevel(){return coachStatLevel('analysis');}

function coachScoutLevel(){return coachStatLevel('scout');}
function coachGuidanceLevel(){return coachStatLevel('guidance');}
function coachNetworkLevel(){return coachStatLevel('network');}
function coachMotivationLevel(){return coachStatLevel('motivation');}
function coachStatNextXp(stat='analysis'){
  ensureCoachStats();
  const s=state.coachStats[stat]||{level:1,xp:0};
  return COACH_STAT_XP_THRESHOLDS[s.level]||99999;
}
function gainCoachStat(stat,xp,logs=null){
  ensureCoachStats();
  if(state.turnIndex!==0)return false;
  const def=COACH_STAT_DEFS[stat];
  if(!def)return false;
  const s=state.coachStats[stat];
  if(s.level>=COACH_STAT_MAX_LEVEL)return false;
  const gained=Math.max(0,Math.round(xp||0));
  s.xp+=gained;
  let leveled=false;
  if(s.level<COACH_STAT_MAX_LEVEL && s.xp>=coachStatNextXp(stat)){
    s.level++;
    s.xp=0; // レベルアップ時は監督経験点を完全リセット。余剰XPも持ち越さない。
    leveled=true;
  }
  if(logs&&leveled)logs.push(`監督の${def.label}が Lv${s.level} に上がりました。`);
  if(leveled)enqueueImportantPopup(`監督${def.label}アップ`, `<div class="growth-manager">${managerLine(`監督の${def.label}がLv${s.level}に上がりました。`)}</div><div class="growth-item">${coachStatEffectText(stat)}</div>`, 'rankup', 'multi_event');
  return leveled;
}
function coachStatEffectText(stat){
  const lv=coachStatLevel(stat);
  if(stat==='guidance')return `練習の伸びが上がります（+${Math.round((coachGuidanceTrainingMultiplier()-1)*100)}%）`;
  if(stat==='analysis')return `プロ観戦取得率：${Math.round(proWatchSpecialChance()*100)}% / 分析イベント発生率：${Math.round(analysisSpecialEventChance('training')*100)}〜${Math.round(analysisSpecialEventChance('pro_watch')*100)}%`;
  if(stat==='scout')return `スカウト大成功率：+${Math.round((scoutGreatChanceBonus())*100)}% / 成功下限：${Math.round(scoutSuccessThreshold()*100)}%`;
  if(stat==='network')return `チームイベント発生率：+${Math.round(coachNetworkEventBonus()*100)}% / 監督活動の紹介系イベント重み：+${directorNetworkBonusWeight()}`;
  if(stat==='motivation')return `レクリエーションの疲労回復：${30+(lv-1)*5} / 通常練習でたまる疲労：-${Math.max(0,lv-1)*FATIGUE_TRAIN_MOTIVATION_RELIEF} / 不調回復と調子低下抑制も強化されます。`;
  return `Lv${lv}`;
}
function coachGuidanceTrainingMultiplier(){return 1+Math.max(0,coachGuidanceLevel()-1)*0.10;}
function coachFocusedTrainingMultiplier(){return 1+Math.max(0,coachGuidanceLevel()-1)*0.10;}
function scoutGreatChanceBonus(){return Math.max(0,coachScoutLevel()-1)*0.10;}
function scoutSuccessThreshold(){return clamp(0.95+Math.max(0,coachScoutLevel()-1)*0.01,0.95,0.99);}
function coachNetworkEventBonus(){return Math.max(0,coachNetworkLevel()-1)*0.03;}
function motivationMoodDelta(before){
  const lv=coachMotivationLevel();
  if(lv>=4 && before<0)return 2;
  if(lv>=5 && before===0)return 2;
  return 1;
}
function naturalMoodChoicesByMotivation(){
  const lv=coachMotivationLevel();
  if(lv>=4)return [0,0,0,1];
  if(lv>=2)return [-1,0,0,0,1];
  return [-1,0,0,1];
}
function analysisSpecialEventChance(context='turn'){
  const lv=coachAnalysisLevel();
  let base=0;
  if(context==='pro_watch')base=0.03;
  else if(context==='match')base=0.025;
  else if(context==='training')base=0.01;
  else base=0.006;
  return base + Math.max(0,lv-1)*0.012;
}
function proWatchSpecialChance(){
  return 0.05 + Math.max(0,coachAnalysisLevel()-1)*0.025;
}
function analysisSpecialCandidates(p){
  const byRole={
    OH:['ブロックアウト','パワーヒッター','重い球','勝負強い','流れを変える一本','ドライブ回転'],
    OP:['ライト〇','ブロックアウト','パワーヒッター','重い球','ジャンプサーブ','ドライブ回転'],
    MB:['対速攻〇','クイック職人','ワンタッチ職人','対エースブロック','冷静沈着'],
    S:['読みのセッター','高速トス','二段トス適性','二段トス','司令塔','ツーアタック','分析家'],
    L:['守護神','サーブレシーブ職人','広い守備範囲','フライングレシーブ','冷静沈着']
  };
  const preferred=(byRole[p?.role]||[]).filter(s=>NORMAL_SPECIAL_POOL.includes(s));
  const base=coachAnalysisLevel()>=5?[...preferred,...NORMAL_SPECIAL_POOL]:[...preferred];
  const pool=base.filter(s=>!p.special?.includes(s)&&canObtainSpecial(p,s));
  if(pool.length)return pool;
  return NORMAL_SPECIAL_POOL.filter(s=>!p.special?.includes(s)&&canObtainSpecial(p,s));
}
function pickAnalysisSpecialForPlayer(p){
  const pool=analysisSpecialCandidates(p);
  return pool.length?randomChoice(pool):null;
}
function maybeAnalysisSpecialInsight(logs, context='turn'){
  if(coachAnalysisLevel()<2)return false;
  if(Math.random()>=analysisSpecialEventChance(context))return false;
  const candidates=availablePlayers().filter(p=>analysisSpecialCandidates(p).length);
  if(!candidates.length)return false;
  const p=randomChoice(candidates);
  const special=pickAnalysisSpecialForPlayer(p);
  if(!special)return false;
  if(grantSpecialIfEligible(p,special,`監督の分析力Lv${coachAnalysisLevel()}による気づき`)){
    const msg=`監督の分析で、${nameSpan('若葉高校',p.name)}が${specialChipHtml(special)}のヒントをつかみました。`;
    if(logs)logs.push(msg);
    managerSay(`${p.name}が分析から特殊能力のヒントをつかみました。`);
    return true;
  }
  return false;
}
function coachStatusStatRowHtml(stat){
  const def=COACH_STAT_DEFS[stat];
  const lv=coachStatLevel(stat), xp=coachStatXp(stat), next=coachStatNextXp(stat);
  const pctVal=lv>=COACH_STAT_MAX_LEVEL?100:Math.round(Math.min(100,(xp/next)*100));
  return `<div class="coach-stat-row multi">
    <div><strong>${def.label} Lv${lv}</strong><p>${def.desc}</p><small>${coachStatEffectText(stat)}</small></div>
    <div class="coach-stat-level">${lv>=COACH_STAT_MAX_LEVEL?'MAX':`${xp}/${next}`}</div>
    <div class="coach-stat-bar"><span style="width:${pctVal}%"></span></div>
  </div>`;
}
function coachStatusCardHtml(){
  ensureCoachStats();
  return `<div class="coach-status-card">
    <div class="coach-status-head"><h3>監督ステータス</h3><span class="mini-tag">行動で成長</span></div>
    <div class="coach-stat-list">${['guidance','analysis','scout','network','motivation'].map(coachStatusStatRowHtml).join('')}</div>
  </div>`;
}
function renderCoachStatusCard(){
  const html=coachStatusCardHtml();
  // v104: 監督画面の右カラム（旧・個別練習の対象選択）にも監督ステータスを出す
  const panel=document.getElementById('coachStatusPanel');
  if(panel)panel.innerHTML=html;
}

function hasCoachActionDecision(){return state.lastActionPromptKey===actionPromptKey();}

function actionPromptKey(){return `${state.year}-${state.monthIndex}`;}

let monthlyActionFromAdvance=false;
let scoutMapMode='execute';
let directorVisitMode='execute';

function showMonthlyActionModal(fromAdvance=false){
  const modal=document.getElementById('monthlyActionModal');
  if(!modal)return;
  monthlyActionFromAdvance=!!fromAdvance;
  document.querySelectorAll('#monthlyActionModal [data-coach-action]').forEach(btn=>{
    const act=btn.dataset.coachAction;
    const locked=act==='director'&&!directorActivityAvailable();
    btn.disabled=locked;
    btn.classList.toggle('is-locked',locked);
    const lockNote=btn.querySelector('.choice-lock');
    if(lockNote)lockNote.textContent=locked?'弱小校になると解禁されます':'';
  });
  const msg=document.getElementById('monthlyActionMessage');
  if(msg)msg.innerHTML=monthlyActionAdviceText();
  modal.classList.remove('hidden');
  modal.style.display='flex';
  managerSay('監督、今月はどう動きますか？');
}
// v88: マネージャーが状況に応じて助言する。説明の少なさを補う。
function monthlyActionAdviceText(){
  const tips=[];
  const m=state.monthIndex;
  if(!directorActivityAvailable()){
    tips.push('監督活動はまだ解禁されていません。まずは地区大会で1勝して学校の格を上げましょう。');
  }
  if(m>=6&&m<=10)tips.push('来年度の入部候補を探すなら、この時期のスカウトが効いてきます。');
  if(m===0)tips.push('新年度の始まりです。今年の方針を決めましょう。');
  const next=nextTournamentHintText();
  if(next)tips.push(next);
  if(!tips.length)tips.push('どの行動を選んでも、チーム全体の通常練習は並行して行われます。');
  return tips.map(t=>`<span class="advice-line">${t}</span>`).join('');
}
// v88: 次の大会がいつかを常に言えるようにする
function nextTournamentHintText(){
  const m=state.monthIndex;
  const plan=[[3,'インターハイ地区大会'],[4,'インターハイ全国大会'],[7,'春高地区大会'],[9,'春高全国大会']];
  for(const [mi,label] of plan){
    if(mi===m)return `今月は${label}があります。スタメンの確認を。`;
    if(mi>m){
      const diff=mi-m;
      if(mi===4&&!state.qualifiedInterhigh)continue;
      if(mi===9&&!state.qualifiedHaruko)continue;
      return `次の大会は${label}（あと${diff}か月）です。`;
    }
  }
  return '';
}
function closeMonthlyActionModal(){
  const m=document.getElementById('monthlyActionModal');
  if(m){m.classList.add('hidden');m.style.display='';}
}
function chooseMonthlyAction(action){
  const fromMonthTransition=monthTransitionLocked();

  if(fromMonthTransition && action==='scout'){
    closeMonthlyActionModal();
    openScoutMapModal('select');
    return;
  }
  if(fromMonthTransition && action==='individual'){
    closeMonthlyActionModal();
    openIndividualTrainingModal();
    return;
  }
  if(fromMonthTransition && action==='director'){
    if(!directorActivityAvailable()){
      managerSay('新設校の間は監督活動はまだ行えません。まずは学校の格を上げましょう。');
      return;
    }
    closeMonthlyActionModal();
    openDirectorVisitModal('select');
    return;
  }

  state.lastActionPromptKey=actionPromptKey();
  state.scoutPending=action==='scout';
  state.coachAction=action;

  if(action==='scout'){
    managerSay(`第1週目の監督行動を「スカウト」に設定しました。${state.scoutRegion||'関東'}で${state.scoutPosition||'OH'}を探します。`);
  }else if(action==='individual'){
    managerSay('第1週目の監督行動を「個別練習」に設定しました。対象選手と練習メニューを選んでください。');
    setTimeout(()=>openIndividualTrainingModal(),50);
  }else if(action==='recreation'){
    managerSay('第1週目の監督行動を「レクリエーション」に設定しました。');
  }else if(action==='pro_watch'){
    managerSay('第1週目の監督行動を「プロの試合見学」に設定しました。');
  }else if(action==='director'){
    if(!directorActivityAvailable()){
      state.coachAction='individual';
      managerSay('新設校の間は監督活動はまだ行えません。まずは学校の格を上げましょう。');
    }else{
      const p=currentDirectorPlace();
      managerSay(`第1週目の監督行動を「監督活動」に設定しました。訪問先：${p?p.label:'未選択'}。`);
    }
  }

  if(fromMonthTransition){
    closeMonthlyActionModal();
    updateMonthTransitionModal();
  }else if(monthlyActionFromAdvance){
    // v94: 進行ボタンから開いた場合。
    // スカウトと監督活動は、行き先を選んでいないまま実行されてしまうので、先に設定モーダルを出す。
    monthlyActionFromAdvance=false;
    closeMonthlyActionModal();
    renderAll();
    saveState();
    if(action==='scout'){ setTimeout(()=>openScoutMapModal('select'),60); return; }
    if(action==='director'){ setTimeout(()=>openDirectorVisitModal('select'),60); return; }
    if(action!=='individual')setTimeout(()=>safeHandleAdvanceButton(),60);
    return;
  }else{
    closeMonthlyActionModal();
  }
  renderAll();
  saveState();
}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));} function rand(a,b){return Math.random()*(b-a)+a;} function randomInt(a,b){return Math.floor(rand(a,b+1));} function randomChoice(a){return a[Math.floor(Math.random()*a.length)];} function avg(a){return a.reduce((x,y)=>x+y,0)/a.length;} function int(v){return Math.round(v);} function num(v,d=1){return Number(v).toFixed(d);} function pct(v){return Math.round(v*1000)/10+'%';}
function ensureData(){const base=initialPlayers(); if(!Array.isArray(state.players))state.players=base; if(!Array.isArray(state.retiredPlayerIds))state.retiredPlayerIds=[];if(!Array.isArray(state.retiredPlayerSnapshots))state.retiredPlayerSnapshots=[]; const retiredSet=new Set(state.retiredPlayerIds||[]); for(const bp of base){if(retiredSet.has(bp.id)||((state.seniorsRetired||state.retiredInitialSeniors)&&bp.year>=3))continue;if(!state.players.find(x=>x.id===bp.id))state.players.push(bp);} if(typeof state.schoolBaseName!=='string')state.schoolBaseName='';if(typeof state.schoolKind!=='string')state.schoolKind='';Object.assign(state,{schoolName:state.schoolName||'若葉高校',gameIntroDone:state.gameIntroDone!==false,initialAprilNoEvents:state.initialAprilNoEvents!==false,schoolClass:state.schoolClass||'弱小校',coachAction:state.coachAction||'individual',scoutRegion:state.scoutRegion||'関東',scoutPosition:state.scoutPosition||'OH'});/* v183: メモタブごと切り替え口を消したので、イベント省略は常にOFF（Tak指示） */state.eventSkipMode=false;ensureCoachStats();/* v195: 性格の補完。旧セーブ対策。選手IDから決まる割当なので乱数列を消費しない（Tak指示） */(state.players||[]).forEach(ensurePersonality); if(typeof state.scoutPending!=='boolean')state.scoutPending=false; if(!Array.isArray(state.nextYearScoutRecruits))state.nextYearScoutRecruits=[];if(!Array.isArray(state.monthlyReportMatches))state.monthlyReportMatches=[];ensureMonthlyReportState();(state.players||[]).forEach(p=>{
  if(!p.hand)p.hand=defaultHandForRole(p.role);
  if(Array.isArray(p.special)){
    const hadOldRight=p.special.some(s=>['剛腕砲台','右の要塞','勝負の右腕'].includes(s));
    p.special=p.special.filter(s=>!DELETED_GOLD_SPECIALS.has(s));
    if(hadOldRight && canObtainSpecial(p,'右翼砲台') && !p.special.includes('右翼砲台'))p.special.push('右翼砲台');
  }
});if(!Array.isArray(state.starterIds))state.starterIds=['y3_oh','y3_mb','y3_op','y2_s','y2_mb','y2_oh']; if(!state.liberoId||!activeRosterPlayers().find(p=>p.id===state.liberoId)){const lp=activeRosterPlayers().find(p=>p.role==='L');state.liberoId=lp?lp.id:null;} if(typeof state.startRotationOffset!=='number')state.startRotationOffset=0; state.startRotationOffset=clamp(Math.round(state.startRotationOffset||0),0,5); if(typeof state.turnIndex!=='number')state.turnIndex=0; if(typeof state.recruitSerial!=='number')state.recruitSerial=1;if(typeof state.scoutRumor==='undefined')state.scoutRumor=null;if(!Array.isArray(state.scoutRumors))state.scoutRumors=[];if(state.scoutRumor){state.scoutRumors.push(state.scoutRumor);state.scoutRumor=null;}if(!Array.isArray(state.scoutedPlayers))state.scoutedPlayers=[];if(typeof state.lastActionPromptKey==='undefined')state.lastActionPromptKey=null;if(!state.playerTraining)state.playerTraining={};if(!state.managerMessage)state.managerMessage='監督、今日もよろしくお願いします。';if(!MANAGER_PORTRAIT_POOL.includes(state.managerPortrait))state.managerPortrait=MANAGER_PORTRAIT_POOL[0]||defaultManagerPortrait();state.managerName=managerNameForPortrait(state.managerPortrait);if(typeof state.managerGraduationYear==='undefined')state.managerGraduationYear=null;if(typeof state.managerSupportKey==='undefined')state.managerSupportKey=null; if(typeof state.lastRecruitYear!=='number')state.lastRecruitYear=0;if(typeof state.interhighBest4Year==='undefined')state.interhighBest4Year=null;if(typeof state.japanRep==='undefined')state.japanRep=null;if(typeof state.japanRepReturnKey==='undefined')state.japanRepReturnKey=null;if(typeof state.studyAbroad==='undefined')state.studyAbroad=null;if(typeof state.studyAbroadOfferYear==='undefined')state.studyAbroadOfferYear=null;if(typeof state.directorVisitPlace==='undefined')state.directorVisitPlace='street';if(typeof state.schoolClassDropWatch==='undefined')state.schoolClassDropWatch=null;if(typeof state.directorLegacy==='undefined')state.directorLegacy={equipment:0,pipeline:0,studyRoutes:[],contacts:[],exchangeStudents:0,u18Access:false};if(!Array.isArray(state.directorLegacy.studyRoutes))state.directorLegacy.studyRoutes=[];if(!Array.isArray(state.directorLegacy.contacts))state.directorLegacy.contacts=[];if(typeof state.u15GoldenGenerationYear==='undefined')state.u15GoldenGenerationYear=null;if(typeof state.u15GoldenRecruitYear==='undefined')state.u15GoldenRecruitYear=null;if(!Object.prototype.hasOwnProperty.call(state,'u18SisterReward'))state.u18SisterReward=null;if(typeof state.u18SisterRewardClaimed!=='boolean')state.u18SisterRewardClaimed=!!state.u18SisterReward;/* v208: 妹の卒業年。旧セーブで既に妹が入部済みなら 加入年+2 を復元する。入部前なら null のまま。 */if(typeof state.u18SisterGraduationYear==='undefined'){const _r=state.u18SisterReward;state.u18SisterGraduationYear=(_r&&_r.consumed&&Number(_r.joinYear))?Number(_r.joinYear)+2:null;}if(!Object.prototype.hasOwnProperty.call(state,'u18DefeatedYear'))state.u18DefeatedYear=state.u18SisterRewardClaimed?(state.year||1):null;if(!Object.prototype.hasOwnProperty.call(state,'seasonBaseline'))state.seasonBaseline=null;if(!Object.prototype.hasOwnProperty.call(state,'lastNationalChampionYear'))state.lastNationalChampionYear=null;if(!Object.prototype.hasOwnProperty.call(state,'u18AnnualStartedKey'))state.u18AnnualStartedKey=null;/* v201: 進行バーの解禁フラグ。旧セーブは実績から復元する（全国優勝経験があればU-18、U-18に勝っていればOG）。 *//* v203: 全国5校の初対戦イベント。旧セーブは未対戦扱いにし、次に全国で当たったときに1回出す。 */if(!state.nationalFirstEncounter||typeof state.nationalFirstEncounter!=='object')state.nationalFirstEncounter={};/* v203: U-18初勝利イベントは、すでにU-18に勝っている旧セーブでは出さない（過去の出来事のため）。OG勝利イベントは記録が無いので未表示として扱う。 */if(typeof state.u18WinEventShown!=='boolean')state.u18WinEventShown=!!state.u18DefeatedYear;if(typeof state.ogWinEventShown!=='boolean')state.ogWinEventShown=false;if(typeof state.u18TimelineRevealed!=='boolean')state.u18TimelineRevealed=!!state.lastNationalChampionYear;if(typeof state.ogTimelineRevealed!=='boolean')state.ogTimelineRevealed=!!state.u18DefeatedYear;if(typeof state.interhighPrefEliminated!=='boolean')state.interhighPrefEliminated=false;if(typeof state.interhighNatEliminated!=='boolean')state.interhighNatEliminated=false;if(typeof state.harukoPrefEliminated!=='boolean')state.harukoPrefEliminated=false;if(typeof state.harukoNatEliminated!=='boolean')state.harukoNatEliminated=false;if(typeof state.lastGradeUpYear!=='number')state.lastGradeUpYear=state.year;if(!Array.isArray(state.pendingAprilRecruits))state.pendingAprilRecruits=[];if(typeof state.aprilRecruitSelectionOpen!=='boolean')state.aprilRecruitSelectionOpen=false;if(typeof state.showAprilRecruitSelectionAfterPopup!=='boolean')state.showAprilRecruitSelectionAfterPopup=false;if(typeof state.aprilRecruitSelectionYear==='undefined')state.aprilRecruitSelectionYear=null;/* v181: 監督行動の個別練習から「おまかせ」を外したため、古いセーブの値を移行する */if(state.lastIndividualTrainingMenu==='omakase')state.lastIndividualTrainingMenu='spikePower'; for(const pl of state.players){if(!state.playerTraining[pl.id])state.playerTraining[pl.id]='omakase';ensurePlayerComponentData(pl);if(!Array.isArray(pl.nationalStarterHistory))pl.nationalStarterHistory=[];if(typeof pl.fatigue!=='number')pl.fatigue=0;}
if(typeof state.devSquadTrainingKey!=='string')state.devSquadTrainingKey='';
if(typeof state.newDrinkTestYear!=='number')state.newDrinkTestYear=0;
if(typeof state.firstSquadPlan!=='string')state.firstSquadPlan='normal';
if(typeof state.devSquadPlan!=='string')state.devSquadPlan='normal';
if(typeof state.devSquadTrainingMonth!=='string')state.devSquadTrainingMonth=''; if(!Array.isArray(state.benchIds))state.benchIds=[]; if(!Object.prototype.hasOwnProperty.call(state,'nationalAppearanceYear'))state.nationalAppearanceYear=(state.qualifiedInterhigh||state.qualifiedHaruko)?(state.year||1):null;if(!Object.prototype.hasOwnProperty.call(state,'nationalFirstRoundWonYear'))state.nationalFirstRoundWonYear=state.nationalFinalReachedYear||null;if(!Object.prototype.hasOwnProperty.call(state,'nationalFinalReachedYear'))state.nationalFinalReachedYear=null;if(typeof state.tohoRivalDefeatCount!=='number')state.tohoRivalDefeatCount=0;if(!state.tohoRivalEventShown||typeof state.tohoRivalEventShown!=='object')state.tohoRivalEventShown={};if(typeof state.matchServeOrder!=='string')state.matchServeOrder='none';if(typeof state.tohoRivalEventCount!=='number')state.tohoRivalEventCount=Object.values(state.tohoRivalEventShown).filter(Boolean).length;/* v195: 東峰との初対戦フラグを旧セーブに補完する。すでに東峰に勝ったことがある（tohoRivalDefeatCount>0）か、既存の敗北イベントを見ている場合は初対戦は済んでいるとみなし、挑発イベントも出さない。それ以外の旧セーブは未対戦として扱う。 */if(typeof state.tohoFirstEncounterDone!=='boolean')state.tohoFirstEncounterDone=!!((state.tohoRivalDefeatCount||0)>0||(state.tohoRivalEventCount||0)>0);if(typeof state.tohoFirstLossTauntSeen!=='boolean')state.tohoFirstLossTauntSeen=!!state.tohoFirstEncounterDone;/* v196: 「最初の約束」。v195以前のセーブには約束の選手がいないので null のまま＝約束なしとして扱う。 */if(!Object.prototype.hasOwnProperty.call(state,'promiseRookieId'))state.promiseRookieId=null;if(!Object.prototype.hasOwnProperty.call(state,'promiseTargetYear'))state.promiseTargetYear=null;if(typeof state.promiseDistrictWon!=='boolean')state.promiseDistrictWon=false;/* v213: 目標を「地区大会の決勝の舞台に立つ」へ変更。優勝していれば決勝には立っているので達成として引き継ぐ。 */if(typeof state.promiseFinalReached!=='boolean')state.promiseFinalReached=!!state.promiseDistrictWon;if(typeof state.promiseReachEventShown!=='boolean')state.promiseReachEventShown=!!state.promiseFinalReached;if(typeof state.promisePendingReachEvent!=='boolean')state.promisePendingReachEvent=false;if(!Object.prototype.hasOwnProperty.call(state,'promiseGraduationPending'))state.promiseGraduationPending=null;if(typeof state.promiseLastPrefPreShown!=='boolean')state.promiseLastPrefPreShown=false;if(typeof state.promiseLastPrefPostShown!=='boolean')state.promiseLastPrefPostShown=false;if(typeof state.promiseGrade2Shown!=='boolean')state.promiseGrade2Shown=false;if(typeof state.promiseGrade3Shown!=='boolean')state.promiseGrade3Shown=false;if(typeof state.promiseGraduationShown!=='boolean')state.promiseGraduationShown=false;/* v199: 練習試合系で預けた疲労の戻し忘れ対策。試合が終わっているのに預かりが残っていたら戻す。 */if(typeof state.practiceStaminaBackup==='undefined')state.practiceStaminaBackup=null;if(state.practiceStaminaBackup&&!practiceMatchActive())endPracticeMatchStamina();/* v200: 場所ごとの初回留学紹介フラグ。旧セーブは未消化として扱う（＝次の訪問で確定紹介が出る）。 */if(!state.directorFirstStudyDone||typeof state.directorFirstStudyDone!=='object')state.directorFirstStudyDone={};if(typeof state.koutokuAwakened!=='boolean')state.koutokuAwakened=false;if(!Object.prototype.hasOwnProperty.call(state,'koutokuAwakeningPending'))state.koutokuAwakeningPending=null;if(typeof state.districtChampionStoryShown!=='boolean')state.districtChampionStoryShown=!!(state.qualifiedInterhigh||state.qualifiedHaruko||state.nationalAppearanceYear);if(typeof state.demoCleared!=='boolean')state.demoCleared=false;if(typeof state.demoClearedYear==='undefined')state.demoClearedYear=null;if(typeof state.demoClearedTournament!=='string')state.demoClearedTournament='';/* v174: 体験版のセーブを製品版で読み込んだら、終了状態を解除して続きから遊べるようにする */if(state.demoCleared&&!isDemoBuild()){state.demoCleared=false;state.demoClearedYear=null;state.demoClearedTournament='';} ensureBenchIds();}
// v70: normalizeV69State() の呼び出しをここへ移動。
// 以前は game.js 先頭付近(loadState定義の直前)でトップレベル実行していたが、
// 内部で ensureCoachStats() → COACH_STAT_DEFS(下方の const) を参照するため TDZ で
// ReferenceError となり、game.js 全体の実行が中断してゲームが起動しなかった。
normalizeV69State();
ensureData(); if(trainingMenuHasInvalidKeys().length)console.warn('Invalid training menu keys',trainingMenuHasInvalidKeys());
function xpThreshold(v){if(v<=3)return 50;if(v<=6)return 70;if(v<=9)return 90;if(v<=12)return 110;if(v<=15)return 150;if(v<=19)return 200;if(v<=23)return 260;return 400;} function meetsAbsoluteGuardianDomainMinimum(p){
  return !!(p&&p.comps&&Array.isArray(p.special)
    && !p.special.includes('絶対守護領域')
    && (p.comps.recRange||0)>=20
    && ((p.comps.recReception||0)+(p.comps.recDig||0))>=35);
}
function canObtainSpecialByMinimum(p, specialName){
  if(specialName==='絶対守護領域')return meetsAbsoluteGuardianDomainMinimum(p);
  const c=p?.comps||p||{};
  const s=deriveStats(p||{comps:c});
  if(specialName==='二段トス')return (c.spikeControl||0)>=16;
  if(specialName==='パワーヒッター')return true;
  if(specialName==='サーブ職人')return (c.servePower||0)>=13 || (c.serveControl||0)>=13;
  if(specialName==='狙い撃ち')return (c.spikeControl||0)>=13 || (c.serveControl||0)>=13;
  if(specialName==='フライングレシーブ')return (c.recDig||0)>=10 && (c.recRange||0)>=10;
  if(specialName==='ワンタッチ職人')return true;
  if(specialName==='司令塔')return (c.tossRead||0)>=16;
  if(specialName==='ツーアタック')return p?.hand==='左' && (s.toss||0)>=16 && (c.spikePower||0)>=16;
  if(specialName==='ワンチ回収')return (c.spikeControl||0)>=13;
  if(specialName==='ブロックアウト')return (c.spikeControl||0)>=13;
  if(specialName==='高速トス')return (c.tossAccuracy||0)>=16;
  if(specialName==='威圧感')return Math.max(...COMP_KEYS.map(k=>c[k]||0), heightPoint(p?.height||156))>=20;
  if(specialName==='ブロード')return heightPoint(p?.height||156)>=13 || (c.jump||0)>=13;
  if(specialName==='Bクイック')return heightPoint(p?.height||156)>=13 || (c.jump||0)>=13;
  if(specialName==='対速攻〇')return (c.blockStuff||0)>=13 || (c.blockRead||0)>=13;
  if(specialName==='ライト〇')return p?.hand==='右';
  if(specialName==='鉄壁の中央')return !!(p&&p.role==='MB' && (calcPositionScore25(p,'MB')>=20 || ((c.blockStuff||0)>=20 && (c.blockRead||0)>=20)));
  if(specialName==='右翼砲台')return !!(p&&p.role==='OP' && p.hand==='左' && (s.spike||0)>=20 && (c.jump||0)>=20);
  if(specialName==='分析家')return true;
  if(specialName==='ドライブ回転')return true;
  if(specialName==='ベンチの声援')return benchCheerEligible(p);
  return true;
}
// v100: 能力の最低条件に加えて、役割の整合も見る共通の入口。
function canObtainSpecial(p,specialName){
  return canObtainSpecialByMinimum(p,specialName) && specialRoleAffinityOk(p,specialName);
}
// v100: 役割がはっきりしている特殊能力は、その選手のポジション評価でそのポジションが
// 最上位（同率最上位を含む）のときだけ取得できるようにする。
// MBなのにセッター系の技能を持つ、といったチグハグを防ぐのが目的。
const SPECIAL_ROLE_AFFINITY={
  // セッター系
  '読みのセッター':['S'],
  '高速トス':['S'],
  '司令塔':['S'],
  'ツーアタック':['S'],
  // ミドルブロッカー系
  '鉄壁の中央':['MB'],
  'Bクイック':['MB'],
  'クイック職人':['MB'],
  // オポジット系
  '右翼砲台':['OP'],
  'ライト〇':['OP'],
  'ブロード':['OP'],
  // ブロッカー系（前衛の攻撃陣）
  '対速攻〇':['MB','OP','OH'],
  '対エースブロック':['MB','OP','OH'],
  // 守備系（リベロとアウトサイドヒッター）
  '守護神':['L','OH'],
  'サーブレシーブ職人':['L','OH'],
  '広い守備範囲':['L','OH']
};
function topPositionsOf(p){
  if(!p)return [];
  const scores=POSITIONS.map(pos=>({pos,score:calcPositionScore25(p,pos)}));
  const max=Math.max(...scores.map(x=>x.score));
  // 同率最上位はすべて最上位として扱う（現行のポジション評価の見せ方と揃える）
  return scores.filter(x=>x.score>=max).map(x=>x.pos);
}
function specialRoleAffinityOk(p,specialName){
  const need=SPECIAL_ROLE_AFFINITY[specialName];
  if(!need||!need.length)return true;
  if(!p)return false;
  const tops=topPositionsOf(p);
  if(!tops.length)return true;
  return need.some(r=>tops.includes(r));
}
// v154: 特殊能力の取得通知は、いったん保留しておいて後でまとめてキューへ入れる。
// これまでは grantSpecialIfEligible の中で即 enqueueImportantPopup していたため、
// イベントの effect() の途中で積まれ、イベント本体の結果画面より先に表示されていた。
let pendingSpecialPopups=[];
function flushPendingSpecialPopups(){
  if(!pendingSpecialPopups.length)return;
  const list=pendingSpecialPopups;
  pendingSpecialPopups=[];
  if(typeof enqueueImportantPopup!=='function')return;
  list.forEach(x=>enqueueImportantPopup(x.title,x.html,x.kind,x.imageKey));
}
function grantSpecialIfEligible(p, specialName, reason='特殊能力取得イベント'){
  if(!p||!Array.isArray(p.special))return false;
  if(p.special.includes(specialName))return false;
  if(!canObtainSpecial(p,specialName))return false;
  p.special.push(specialName);
  const html=`<div class="growth-manager">${managerLine('特殊能力を取得しました！')}</div><div class="growth-item">${nameSpan('若葉高校',p.name)} が ${specialChipHtml(specialName)} を取得しました。</div><div class="hint">${reason}</div>`;
  pendingSpecialPopups.push({title:'特殊能力 取得',html,kind:isGoldSpecial(specialName)?'gold-special':'special',imageKey:'personal_change'});
  return true;
}
function pickNormalSpecialForRecruit(p){
  const pool=NORMAL_SPECIAL_POOL.filter(s=>!p.special.includes(s)&&canObtainSpecial(p,s));
  return pool.length?randomChoice(pool):null;
}
function pickGoldSpecialForRecruit(p){
  const pool=(GOLD_SPECIAL_POOL[p.role]||[]).filter(s=>!p.special.includes(s)&&canObtainSpecial(p,s));
  return pool.length?randomChoice(pool):null;
}
function addRecruitSpecial(p, specialName){
  if(!p||!specialName||!Array.isArray(p.special))return false;
  if(p.special.includes(specialName))return false;
  if(!canObtainSpecial(p,specialName))return false;
  p.special.push(specialName);
  return true;
}
function applyScoutSpecialRules(recruit, result){
  const cls=state.schoolClass||'弱小校';
  const acquired=[];
  const addNormal=()=>{
    const sp=pickNormalSpecialForRecruit(recruit);
    if(addRecruitSpecial(recruit,sp)){acquired.push(sp);return true;}
    return false;
  };
  const addGold=()=>{
    const sp=pickGoldSpecialForRecruit(recruit);
    if(addRecruitSpecial(recruit,sp)){acquired.push(sp);return true;}
    return false;
  };
  if(cls==='中堅校'){
    if(result==='大成功'&&Math.random()<0.50)addNormal();
  }else if(cls==='全国大会出場校'){
    const rate=result==='大成功'?0.75:0.30;
    if(Math.random()<rate)addNormal();
  }else if(cls==='強豪校'||cls==='名門校'){
    if(result==='大成功'){
      addNormal();
      if(Math.random()<0.25)addNormal();
      if(Math.random()<0.03)addGold();
    }else{
      if(Math.random()<0.75)addNormal();
    }
  }
  return acquired;
}
function scoutSpecialText(acquired){
  return acquired&&acquired.length ? ` 特殊能力：${acquired.map(s=>specialChipHtml(s)).join('、')}` : '';
}
function addXpDelta(p,k,xp){
  ensurePlayerComponentData(p);
  if(!COMP_KEYS.includes(k))return 0;
  // v195: 性格による成長補正。能力経験値が「増える」ときだけ掛ける（Tak指示）。
  //        ここは通常練習・個別練習・試合経験・イベントのすべてが通る合流点なので、これ1か所で共通適用になる。
  //        身長の自然成長は addHeightXpDelta という別の処理なので影響しない。
  //        固定値の上書き（adjustOpponentPlayer 等）と対戦校のプリセット強化もここを通らない。
  //        性格を持たない選手（対戦校など）は倍率1で素通りする。
  if(xp>0){
    const pm=personalityXpMultiplier(p,k);
    if(pm!==1)xp=Math.max(1,Math.round(xp*pm));
  }
  const before=p.comps[k];
  p.compXp[k]+=xp;
  let delta=0;
  while(p.comps[k]<25&&p.compXp[k]>=xpThreshold(p.comps[k])){
    p.compXp[k]-=xpThreshold(p.comps[k]);
    p.comps[k]++;
    delta++;
  }
  while(p.comps[k]>1&&p.compXp[k]<0){
    p.comps[k]--;
    p.compXp[k]+=xpThreshold(p.comps[k]);
    delta--;
  }
  if(p.comps[k]===1&&p.compXp[k]<0)p.compXp[k]=0;
  return delta;
}
function addXp(p,k,xp){return addXpDelta(p,k,xp);}
function heightPoint(h){
  // v145: 1cmごとに+1で通す。
  // v165: 基準を1cm下げて「身長cm − 155」にした。指定された評価表（156cm=1 / 160cm=5 / 173cm=18 / 190cm=35）に合わせる。
  // heightPoint は estAttack / estBlock からも参照されるため、試合の攻撃力・ブロック力にも効く。
  //        全選手に一律+1されるだけなので、両チームの有利不利は変わらない。
  return Math.max(1, Math.round(Number(h)||0)-155);
}
function addHeightXpDelta(p,xp){
  if(typeof p.heightXp!=='number')p.heightXp=0;
  p.heightXp+=xp;
  let delta=0;
  while(p.height<185&&p.heightXp>=xpThreshold(heightPoint(p.height))){
    p.heightXp-=xpThreshold(heightPoint(p.height));
    p.height++;
    delta++;
  }
  while(p.height>150&&p.heightXp<0){
    p.height--;
    p.heightXp+=xpThreshold(heightPoint(p.height));
    delta--;
  }
  if(p.height<=150&&p.heightXp<0)p.heightXp=0;
  return delta;
}
function addHeightXp(p,xp){return addHeightXpDelta(p,xp);}
const TALENT_SPECIALS=['神童','怪物','努力の天才','転生OG','威圧感','ブロード','Bクイック','対速攻〇','ライト〇','春高の星','インハイの星','分析家'];
function hasAnyTalent(p){return TALENT_SPECIALS.some(s=>(p?.special||[]).includes(s));}
function reincarnatedOgUnlocked(){return schoolClassIndex(state?.schoolClass||'新設校')>=schoolClassIndex('全国大会出場校');}
function isMonsterPositiveKey(key){return ['spikePower','spikeControl','blockRead','blockStuff','jump','height'].includes(key);}
function isMonsterNegativeKey(key){return ['recReception','recDig','recRange','tossAccuracy','tossRead','mental'].includes(key);}
function xpTalentMultiplier(player,key,context='general'){
  if(!player||!Array.isArray(player.special))return 1;
  let m=1;
  if(context==='training' && (player.special.includes('神童')||player.special.includes('転生OG')))m*=1.25;
  if(player.special.includes('怪物')){
    if(isMonsterPositiveKey(key))m*=1.40;
    else if(isMonsterNegativeKey(key))m*=0.60;
  }
  if(player.special.includes('努力の天才')){
    if(player.year===2)m*=1.20;
    else if(player.year>=3)m*=1.50;
  }
  return m;
}
function applyTalentXp(player,key,xp,context='general'){
  if(xp<=0)return xp;
  return Math.max(1,Math.round(xp*xpTalentMultiplier(player,key,context)));
}

const REINCARNATED_OG_TEMPLATES=[
{name:'森下 紗央',role:'OH',type:'大型万能エース',height:171,hand:'右',stats:{Sp:14,Bl:10,Jp:13,Rc:12,To:9,Sv:11}},
{name:'竹宮 佳乃',role:'S',type:'小柄な天才セッター',height:162,hand:'右',stats:{Sp:8,Bl:8,Jp:10,Rc:12,To:16,Sv:11}},
{name:'新川 瑛莉',role:'MB',type:'鉄壁ミドル',height:172,hand:'右',stats:{Sp:11,Bl:15,Jp:12,Rc:7,To:7,Sv:10}},
{name:'佐伯 優奈',role:'L',type:'守護神リベロ',height:160,hand:'右',stats:{Sp:5,Bl:5,Jp:10,Rc:16,To:8,Sv:7}},
{name:'栗森 恵那',role:'OH',type:'強打型大型OH',height:172,hand:'右',stats:{Sp:15,Bl:9,Jp:13,Rc:9,To:7,Sv:12}},
{name:'大森 果奈',role:'OH',type:'パワー型OH',height:171,hand:'右',stats:{Sp:16,Bl:8,Jp:12,Rc:8,To:6,Sv:10}},
{name:'高瀬 美幸',role:'OH',type:'技巧派サイド',height:165,hand:'右',stats:{Sp:13,Bl:8,Jp:14,Rc:12,To:8,Sv:12}},
{name:'吉岡 智花',role:'MB',type:'統率型MB',height:171,hand:'右',stats:{Sp:10,Bl:14,Jp:11,Rc:8,To:8,Sv:10}},
{name:'杉浦 咲子',role:'MB',type:'ブロック型MB',height:172,hand:'右',stats:{Sp:10,Bl:14,Jp:12,Rc:7,To:7,Sv:9}},
{name:'新名 梨央',role:'OH',type:'レシーブ型OH',height:166,hand:'右',stats:{Sp:11,Bl:8,Jp:11,Rc:15,To:8,Sv:10}},
{name:'江波 幸乃',role:'OH',type:'決定力型OH',height:168,hand:'右',stats:{Sp:15,Bl:8,Jp:13,Rc:9,To:7,Sv:12}},
{name:'坂田 紗央里',role:'OH',type:'バックアタック型OH',height:168,hand:'右',stats:{Sp:14,Bl:8,Jp:15,Rc:9,To:7,Sv:11}},
{name:'小日向 紗奈',role:'OH',type:'現代型エース',height:169,hand:'右',stats:{Sp:14,Bl:9,Jp:13,Rc:13,To:8,Sv:12}},
{name:'石森 優花',role:'OH',type:'安定型OH',height:168,hand:'右',stats:{Sp:13,Bl:9,Jp:12,Rc:13,To:8,Sv:12}},
{name:'黒瀬 愛莉',role:'OH',type:'パワー型OH',height:170,hand:'右',stats:{Sp:15,Bl:8,Jp:13,Rc:9,To:7,Sv:11}},
{name:'石河 真優',role:'OH',type:'スピード型OH',height:167,hand:'右',stats:{Sp:14,Bl:8,Jp:14,Rc:12,To:8,Sv:12}},
{name:'永丘 美悠',role:'OP',type:'左利きOP',height:169,hand:'左',stats:{Sp:15,Bl:11,Jp:12,Rc:9,To:7,Sv:12}},
{name:'宮原 遥香',role:'S',type:'読み型セッター',height:166,hand:'右',stats:{Sp:9,Bl:10,Jp:11,Rc:12,To:15,Sv:12}},
{name:'中森 久実',role:'S',type:'正統派司令塔',height:167,hand:'右',stats:{Sp:9,Bl:9,Jp:10,Rc:12,To:16,Sv:12}},
{name:'大原 素乃',role:'OP',type:'超大型エース候補',height:174,hand:'右',stats:{Sp:16,Bl:11,Jp:12,Rc:8,To:7,Sv:11}},
{name:'菅谷 香瑠',role:'OH',type:'姫系守備サイド',height:166,hand:'右',stats:{Sp:12,Bl:8,Jp:12,Rc:15,To:8,Sv:10}},
{name:'大倉 亜衣',role:'MB',type:'高さのある速攻MB',height:172,hand:'右',stats:{Sp:12,Bl:14,Jp:12,Rc:8,To:7,Sv:10}},
{name:'川島 昌枝',role:'S',type:'東洋の魔女系キャプテン',height:165,hand:'右',stats:{Sp:9,Bl:9,Jp:11,Rc:13,To:16,Sv:12}},
{name:'宮瀬 恵美',role:'OH',type:'東洋の魔女系万能サイド',height:166,hand:'右',stats:{Sp:13,Bl:10,Jp:12,Rc:14,To:9,Sv:12}},
{name:'谷川 絹乃',role:'MB',type:'東洋の魔女系粘着ブロック',height:170,hand:'右',stats:{Sp:11,Bl:15,Jp:12,Rc:10,To:8,Sv:10}}
];
function ogTemplateToComps(t){const s=t?.stats||{};return{spikePower:s.Sp||8,spikeControl:s.Sp||8,blockRead:s.Bl||8,blockStuff:s.Bl||8,recReception:s.Rc||8,recDig:s.Rc||8,recRange:s.Rc||8,tossAccuracy:s.To||8,tossRead:s.To||8,servePower:s.Sv||8,serveControl:s.Sv||8,jump:s.Jp||8,stamina:8,mental:8};}
function pickReincarnatedOgTemplate(role){const matches=REINCARNATED_OG_TEMPLATES.filter(t=>t.role===role);return randomChoice(matches.length?matches:REINCARNATED_OG_TEMPLATES);}
function applyReincarnatedOgTemplate(recruit,limit=null,extraNamesUsed=[]){const t=pickReincarnatedOgTemplate(recruit?.role);if(!recruit||!t)return;recruit.name=makeUniqueRecruitName(t.name,extraNamesUsed);recruit.role=t.role;recruit.subRole=`転生OG/${t.type}`;recruit.ogType=t.type;recruit.height=t.height;recruit.hand=t.hand||defaultHandForRole(t.role);recruit.comps=ogTemplateToComps(t);const cap=generatedTalentAbilityCap(limit);for(const k of COMP_KEYS){if(typeof recruit.comps[k]==='number')recruit.comps[k]=clamp(recruit.comps[k],1,cap);}if(!Array.isArray(recruit.special))recruit.special=[];if(!recruit.special.includes('転生OG'))recruit.special.push('転生OG');addGeneratedTalentNote(recruit,`転生OG：${t.type}タイプとして生成されました。`);}

function addTalentIfEligible(player,name){
  if(!player||hasAnyTalent(player))return false;
  if(!Array.isArray(player.special))player.special=[];
  player.special.push(name);
  return true;
}
function generatedTalentAbilityCap(limit=null){
  return clamp((Number(limit)||10)+3,1,25);
}
function addGeneratedTalentNote(recruit,text){
  if(!recruit)return;
  if(!Array.isArray(recruit.generatedTalentNotes))recruit.generatedTalentNotes=[];
  recruit.generatedTalentNotes.push(text);
}
function bumpGeneratedComp(recruit,key,delta,cap){
  if(!recruit?.comps || typeof recruit.comps[key]!=='number')return 0;
  const before=recruit.comps[key];
  recruit.comps[key]=clamp(before+delta,1,cap);
  return recruit.comps[key]-before;
}
function applyGeneratedTalentAbilityShape(recruit,talent,limit=null,extraNamesUsed=[]){
  if(!recruit||!recruit.comps||!talent)return;
  const cap=generatedTalentAbilityCap(limit);
  if(talent==='転生OG'){
    applyReincarnatedOgTemplate(recruit,limit,extraNamesUsed);
  }else if(talent==='神童'){
    const roleKeys=(POSITION_SCORE_KEYS[recruit.role]||COMP_KEYS).filter(k=>!['stamina','mental'].includes(k));
    const mainKeys=(archetype(recruit.role)?.main||[]).filter(k=>!['stamina','mental'].includes(k));
    const keys=[...new Set([...roleKeys,...mainKeys])];
    keys.forEach(k=>bumpGeneratedComp(recruit,k,1,cap));
    mainKeys.forEach(k=>bumpGeneratedComp(recruit,k,1,cap));
    if(recruit.role!=='L' && Math.random()<0.50)recruit.height=Math.min(cmFromHeightPoint(cap),recruit.height+1);
    addGeneratedTalentNote(recruit,'神童：生成時にポジション主要能力を広く底上げしました。');
  }else if(talent==='怪物'){
    ['spikePower','spikeControl','blockRead','blockStuff','jump'].forEach(k=>bumpGeneratedComp(recruit,k,2,cap));
    bumpGeneratedComp(recruit,'servePower',1,cap);
    if(recruit.role!=='L')recruit.height=Math.min(cmFromHeightPoint(cap),recruit.height+2);
    ['recReception','recDig','recRange','tossAccuracy','tossRead','mental'].forEach(k=>bumpGeneratedComp(recruit,k,-1,cap));
    addGeneratedTalentNote(recruit,'怪物：生成時にスパイク・ブロック・ジャンプ・身長を大きく伸ばし、守備・トス系は少し粗くしました。');
  }
}
function assignGeneratedTalent(recruit, limit=null, isGeneralAdmission=false, extraNamesUsed=[], extraPortraitsUsed=[]){
  if(!recruit||!Array.isArray(recruit.special))return [];
  const added=[];
  const topLimit=Number(limit||0);
  const atPositionLimit=topLimit>0 && calcPositionScore25(recruit,recruit.role)>=topLimit;
  const addTalent=(name)=>{
    if(addTalentIfEligible(recruit,name)){
      added.push(name);
      applyGeneratedTalentAbilityShape(recruit,name,limit,extraNamesUsed);
      return true;
    }
    return false;
  };
  if(isGeneralAdmission && atPositionLimit){
    const monsterOk=(recruit.comps?.spikePower||0)>=13 && heightPoint(recruit.height)>=13 && (recruit.comps?.jump||0)>=13;
    if(monsterOk && Math.random()<0.03)addTalent('怪物');
    else if(reincarnatedOgUnlocked() && Math.random()<0.04)addTalent('転生OG');
    else if(Math.random()<0.03)addTalent('神童');
  }
  if(!hasAnyTalent(recruit) && Math.random()<0.025)addTalent('努力の天才');
  if(qualifiesForExclusivePortrait(recruit))assignExclusiveTalentPortrait(recruit,extraPortraitsUsed);
  return added;
}
function ratingLetter(v){if(v>=24)return'S';if(v>=20)return'A';if(v>=16)return'B';if(v>=13)return'C';if(v>=10)return'D';if(v>=7)return'E';if(v>=4)return'F';return'G';} function rankClassFromValue(v){return 'rank-'+ratingLetter(v).toLowerCase();} function teamRank(v){if(v>=23.5)return'S';if(v>=22)return'A+';if(v>=20)return'A';if(v>=18.5)return'A-';if(v>=17)return'B+';if(v>=15.5)return'B';if(v>=14)return'B-';if(v>=12.5)return'C+';if(v>=11)return'C';if(v>=9.5)return'C-';if(v>=8)return'D+';if(v>=6.5)return'D';if(v>=5)return'D-';if(v>=3.5)return'E';if(v>=2)return'F';return'G';}
function getPlayer(id){return state.players.find(p=>p.id===id)||state.players[0];} function deriveStats(p){const c=p.comps||p;return{spike:avg([c.spikePower||1,c.spikeControl||1]),receive:avg([c.recReception||1,c.recDig||1,c.recRange||1]),block:avg([c.blockRead||1,c.blockStuff||1]),serve:avg([c.servePower||1,c.serveControl||1]),toss:avg([c.tossAccuracy||1,c.tossRead||1]),jump:c.jump||1,stamina:c.stamina||1,mental:c.mental||1};}
// v165: ポジション別の重みを、指定された評価表のとおりに設定した。
//        身長は「身長cm − 155」。利き手補正は OHの左利きとOPの右利きがスパイク決定力×0.9、
//        OPの左利きが合計スコア×1.1。いずれもポジション評価だけの補正で、試合計算には入れない。
//        この表はポジション評価とチーム評価レーダーの両方から参照する唯一の出どころ。
const POSITION_WEIGHTS={
  OH:{height:16,spikePower:22,spikeControl:3,jump:18,blockStuff:8,blockRead:5,recReception:9,recDig:4,recRange:3,servePower:8,serveControl:4},
  MB:{height:18,spikePower:11,spikeControl:3,jump:17,blockStuff:30,blockRead:8,recReception:2,recDig:0,recRange:1,servePower:7,serveControl:3},
  OP:{height:15,spikePower:12,spikeControl:2,jump:15,blockStuff:20,blockRead:4,recReception:10,recDig:5,recRange:5,servePower:8,serveControl:4},
  S:{height:12,spikePower:1,jump:13,blockStuff:15,blockRead:2,recDig:4,servePower:10,serveControl:3,tossAccuracy:21,tossRead:19},
  // リベロは指定が無いため v164 のまま据え置き。
  L:{recReception:53,recDig:26,recRange:21}
};
const POSITION_WEIGHT_LABELS={
  height:'身長',spikePower:'スパイク決定力',spikeControl:'コース打ち',jump:'ジャンプ',
  blockStuff:'シャットアウト',blockRead:'ブロックリード',recReception:'レセプション',recDig:'ディグ',recRange:'守備範囲',
  servePower:'サーブ威力',serveControl:'サーブ制球',tossAccuracy:'トス正確性',tossRead:'トス読み'
};
function positionScoreDetail25(p,pos){
  const c=p?.comps||p||{};
  const h=heightPoint(p?.height||156);
  const hand=p?.hand||'右';
  // v165: OHの左利きとOPの右利きは、スパイク決定力に×0.9。
  // v167: OPの左利きは、スパイク決定力ではなく合計スコアに×1.1。
  //       いずれもポジション評価だけの補正で、試合計算（attackHandMultiplier）には入れない。
  const attackHandMod=((pos==='OH'&&hand==='左')||(pos==='OP'&&hand==='右'))?0.90:1;
  const totalHandMod=(pos==='OP'&&hand==='左')?1.10:1;
  const table=POSITION_WEIGHTS[pos]||{};
  const parts=Object.entries(table)
    .filter(([,w])=>w>0)
    .sort((a,b)=>b[1]-a[1])
    .map(([k,w])=>{
      let v=(k==='height')?h:(c[k]||1);
      if(k==='spikePower')v*=attackHandMod;
      return [POSITION_WEIGHT_LABELS[k]||k,v,w];
    });
  const totalWeight=parts.reduce((a,x)=>a+x[2],0)||100;
  const raw=parts.reduce((a,[,v,w])=>a+v*w,0)/totalWeight*totalHandMod;
  return {score:clamp(Math.round(raw*100)/100,1,25),raw,parts,totalWeight,attackHandMod,totalHandMod};
}
function calcPositionScore25(p,pos){return positionScoreDetail25(p,pos).score;}
function maxPositionScore25(p){return Math.max(...POSITIONS.map(pos=>calcPositionScore25(p,pos)));}
// v143: ポジション別の評価尺度。
// リベロはレセプション・ディグ・守備範囲の3能力だけで100%を占めるため評価が上がりやすく、
// 他ポジションと同じ尺度ではSが乱発する。リベロだけ全体を8/7倍した尺度にする。
// v164: 重みを実測影響度へ入れ替えたことで各ポジションのスコア水準がずれたため、
//       旧尺度と同じ評価文字が出るように5ポジションとも回帰で校正し直した。
//       特にセッターは、身長・ジャンプ・シャットの実影響が大きい分だけスコアが下がるので尺度も下げている。
const POSITION_RATING_SCALES={
  _default:{S:21,A:19,B:17,C:15,D:13,E:11,F:9},
  OH:{S:21,A:19,B:17,C:15,D:13,E:11,F:9},
  MB:{S:21,A:19,B:17,C:15,D:13,E:11,F:9},
  OP:{S:21,A:19,B:17,C:15,D:13,E:11,F:9},
  S:{S:19,A:18,B:17,C:16,D:13,E:11,F:9},
  L:{S:24,A:20.5,B:17,C:14.5,D:11.5,E:8.5,F:5.5}
};
function positionRatingScale(pos){
  return POSITION_RATING_SCALES[pos]||POSITION_RATING_SCALES._default;
}
function positionRatingLetter(v,pos){
  const t=positionRatingScale(pos);
  if(v>=t.S)return'S';
  if(v>=t.A)return'A';
  if(v>=t.B)return'B';
  if(v>=t.C)return'C';
  if(v>=t.D)return'D';
  if(v>=t.E)return'E';
  if(v>=t.F)return'F';
  return'G';
}
function positionRankClass(v,pos){return 'rank-'+positionRatingLetter(v,pos).toLowerCase();}
function formatPositionScore(v){return Math.round(Number(v)||0);}
function benchCheerEligible(p){return !!(p&&p.year===3&&maxPositionScore25(p)<=12);}
function calcPositionScore(p,pos){return calcPositionScore25(p,pos)*4;}

function nameSpan(team,name){
  let img='';
  if(isOwnTeamName(team)){
    const p=state.players.find(x=>x.name===name);
    if(p)img=`<img class="mini-icon" src="${p.portrait}" alt="">`;
  }else{
    const pools=[];
    if(currentLogOpponentPlayers)pools.push(currentLogOpponentPlayers);
    if(opponentTemplate&&opponentTemplate.players)pools.push(opponentTemplate.players);
    let opp=null;
    for(const pool of pools){
      opp=Object.values(pool||{}).find(x=>x.name===name);
      if(opp)break;
    }
    if(opp&&opp.portrait)img=`<img class="mini-icon opp-mini-icon" src="${opp.portrait}" alt="">`;
  }
  return `<span class="${isOwnTeamName(team)?'own-name':'opp-name'}">${img}${name}</span>`;
} function resultTag(s){return `<span class="calc-result">${s}</span>`;}
function moodInfo(m){if(m>=2)return{label:'絶好調',mod:1.08};if(m===1)return{label:'やや好調',mod:1.04};if(m===0)return{label:'普通',mod:1};if(m===-1)return{label:'やや不調',mod:.96};return{label:'絶不調',mod:.91};}
function moodVisualInfo(m){const v=Number(m)||0;if(v>=2)return{label:'絶好調',cls:'mood-top',arrow:'⬆️'};if(v===1)return{label:'好調',cls:'mood-good',arrow:'↗️'};if(v===0)return{label:'普通',cls:'mood-normal',arrow:'➡️'};if(v===-1)return{label:'不調',cls:'mood-bad',arrow:'↘️'};return{label:'絶不調',cls:'mood-worst',arrow:'⬇️'};}
function moodBadgeHtml(m){const info=moodVisualInfo(m);return `<span class="mood-badge mood-badge-face ${info.cls}" title="調子：${info.label}" aria-label="調子：${info.label}"><span class="mood-title">調子</span><span class="mood-arrow" aria-hidden="true">${info.arrow}</span></span>`;}
function monthTurnLabel(){return `${MONTHS[state.monthIndex]} 第${state.turnIndex+1}週目`;} function currentMonthKey(){return `${state.year}-${state.monthIndex}`;} function clearScoutRumorsAtAprilStart(){state.scoutRumors=[];state.scoutRumor=null;} 
function monthlyReportKey(){return `${state.year}-${state.monthIndex}`;}
function monthlyReportSnapshot(){
  return {
    key:monthlyReportKey(),
    year:state.year,
    monthIndex:state.monthIndex,
    scoutedCount:(state.scoutedPlayers||[]).length,
    matchCount:(state.monthlyReportMatches||[]).length,
    players:(state.players||[]).map(p=>({
      id:p.id,name:p.name,portrait:p.portrait||'',role:p.role||'',
      comps:{...(p.comps||{})},height:p.height
    }))
  };
}
function ensureMonthlyReportState(){
  if(!Array.isArray(state.monthlyReportMatches))state.monthlyReportMatches=[];
  if(!state.monthReportSnapshot || state.monthReportSnapshot.key!==monthlyReportKey()){
    state.monthReportSnapshot=monthlyReportSnapshot();
  }
}

function monthlyGrowthRows(snap){
  if(!snap)return [];
  const currentById=new Map((state.players||[]).map(p=>[String(p.id),p]));
  const retiredById=new Map([...(state.retiredPlayerSnapshots||[]),...(state.monthlyRetiredSnapshots||[])].map(p=>[String(p.id),p]));
  const rows=[];
  for(const b of (snap.players||[])){
    const p=currentById.get(String(b.id))||retiredById.get(String(b.id));
    if(!p)continue;
    const changes=[];
    for(const k of ['spikePower','spikeControl','recReception','recDig','recRange','blockRead','blockStuff','servePower','serveControl','tossAccuracy','tossRead','jump','mental']){
      const before=b.comps?.[k], after=p.comps?.[k];
      if(typeof before==='number'&&typeof after==='number'&&after>before){
        changes.push({key:k,label:compLabel(k),before,after,unit:''});
      }
    }
    if(typeof b.height==='number'&&typeof p.height==='number'&&p.height>b.height){
      changes.push({key:'height',label:'身長',before:b.height,after:p.height,unit:'cm'});
    }
    if(changes.length){
      rows.push({
        id:p.id||b.id,
        name:p.name||b.name,
        portrait:p.portrait||b.portrait||'',
        role:p.role||b.role||'',
        changes
      });
    }
  }
  return rows;
}
function monthlyScoutRows(snap){
  const start=Number(snap?.scoutedCount||0);
  return (state.scoutedPlayers||[]).slice(start).map(s=>`${s.name} / ${s.region||'?'} / ${s.pos||'?'} / ${s.result||''} / ${s.height||'?'}cm`);
}
// v104: 成長報告は「左に顔グラ・学年・名前 / 右に成長内容」の2カラムにする。
// 顔グラが大きすぎて1人分が画面を占有していたため、顔は56pxに抑えた。
// 身長も他の能力と同じように評価（ランク）を付けて見せる。
function monthlyGrowthPlayerCardsHtml(rows){
  if(!rows.length)return '<div class="monthly-empty">能力上昇はありませんでした。</div>';
  const cur=new Map((state.players||[]).map(p=>[String(p.id),p]));
  return `<div class="month-growth-player-list">${rows.map(r=>{
    const p=cur.get(String(r.id));
    const yearLabel=p&&p.year?`${p.year}年`:'';
    const changes=r.changes.map(c=>{
      // v116: coloredValue / coloredHeightValue は評価チップを内蔵しているので、
      //       ここで rank-chip を足すと E や F が2つ並んでしまう。値だけを並べる。
      if(c.key==='height')return `<div class="month-growth-change"><span class="mgc-label">${c.label}</span><span class="mgc-val">${coloredHeightValue(c.before)} → ${coloredHeightValue(c.after)}</span></div>`;
      return `<div class="month-growth-change"><span class="mgc-label">${c.label}</span><span class="mgc-val">${coloredValue(c.before)} → ${coloredValue(c.after)}</span></div>`;
    }).join('');
    return `<div class="month-growth-player-card">
      <img class="mg-face" src="${r.portrait||'assets/new_shino.png'}" alt="">
      <div class="mg-name"><strong>${r.name}</strong><span class="mg-meta">${yearLabel}</span><span class="mg-meta">${r.role||''}</span></div>
      <div class="month-growth-change-list${r.changes.length>6?' is-many':''}">${changes}</div>
    </div>`;
  }).join('')}</div>`;
}
function topMonthlyGrowthHtml(rows){
  return monthlyGrowthPlayerCardsHtml(rows);
}
function monthlyMatchRows(snap){
  const start=Number(snap?.matchCount||0);
  return (state.monthlyReportMatches||[]).slice(start);
}
function nextTournamentAfterCurrentMonth(){
  const m=(state.monthIndex+1)%12;
  if(m===3)return 'インターハイ地区大会';
  if(m===4&&state.qualifiedInterhigh)return 'インターハイ全国大会';
  if(m===7)return '春高地区大会';
  if(m===9&&state.qualifiedHaruko)return '春高全国大会';
  return '';
}
function monthsUntilMajorTournament(){
  const m=state.monthIndex;
  const targets=[3,7,4,9].map(x=>x>=m?x:x+12).sort((a,b)=>a-b);
  return targets[0]-m;
}
function rosterNeedSummary(){
  const counts={OH:0,MB:0,OP:0,S:0,L:0};
  (state.players||[]).filter(p=>!isPlayerAbsent(p)).forEach(p=>{if(counts[p.role]!==undefined)counts[p.role]++;});
  const shortage=[];
  if(counts.S<2)shortage.push('セッター');
  if(counts.L<2)shortage.push('リベロ');
  if(counts.MB<3)shortage.push('ミドル');
  if(counts.OP<2)shortage.push('オポジット');
  if(counts.OH<4)shortage.push('OH');
  return shortage;
}
function monthlyRadarRecommendation(){
  const metrics=teamRadarMetrics();
  const weak=weakestMetric(metrics);
  const strong=strongestMetric(metrics);
  if(!weak)return 'チーム評価を確認し、来月の重点を一つ決めましょう。';
  const map={
    attack:'中心選手のスパイク決定力とジャンプを底上げしましょう。',
    block:'大会前にブロックと高さの確認を入れたいです。',
    receive:'サーブレシーブが崩れると試合が苦しくなります。守備基礎を優先しましょう。',
    serve:'サーブで崩す力を作ると、格上相手にも流れを作れます。',
    toss:'セッターのトス精度を上げると、攻撃全体が安定します。',
    height:'高さでは不利です。ブロックの読みと守備配置で補いましょう。'
  };
  return `レーダーでは${weak.label}が一番低めです。${map[weak.key]||'弱点を重点的に補強しましょう。'}${strong?` 強みは${strong.label}なので、そこは試合の軸にできます。`:''}`;
}
function monthlyScoutRecommendation(scoutRows){
  const needs=rosterNeedSummary();
  const pending=(state.nextYearScoutRecruits||[]).length;
  const rumors=eventScoutRumorList();
  if(rumors.length){
    const r=rumors[0];
    return `スカウトの噂があります。${r.region}の${r.pos}は狙い目です。`;
  }
  if(needs.length){
    return `新年度に向けて${needs.slice(0,2).join('・')}が薄めです。有望な選手をスカウトしにいきませんか？`;
  }
  if(pending<2)return '来年度の候補がまだ少なめです。余裕がある月はスカウトも選択肢です。';
  if(scoutRows.length)return '今月のスカウト候補は来年度の編成に効きそうです。入部時のポジションバランスを見ておきましょう。';
  return 'スカウト状況は大きな不足なしです。今月は育成を優先してもよさそうです。';
}
function monthlyActionRecommendation(growthRows, scoutRows, matchRows){
  const nextTour=nextTournamentAfterCurrentMonth();
  const until=monthsUntilMajorTournament();
  if(nextTour && until<=1){
    return `大会前の最後の月です。${monthlyRadarRecommendation()}`;
  }
  if(state.monthIndex===10||state.monthIndex===11||state.monthIndex===0){
    return `新年度を見据える時期です。${monthlyScoutRecommendation(scoutRows)}`;
  }
  if(matchRows.length && !matchRows[matchRows.length-1].win){
    return `直近の敗戦を受けて、来月は弱点補強が必要です。${monthlyRadarRecommendation()}`;
  }
  return monthlyScoutRecommendation(scoutRows)+' '+monthlyRadarRecommendation();
}
function managerMonthlyComment(growthRows, scoutRows, matchRows){
  const recommend=monthlyActionRecommendation(growthRows,scoutRows,matchRows);
  if(matchRows.length){
    const last=matchRows[matchRows.length-1];
    if(last.win)return `今月は${last.opp}戦の勝利が大きいです。${recommend}`;
    return `今月の${last.opp}戦は課題が残りました。${recommend}`;
  }
  if(scoutRows.length)return `スカウト候補が増えました。${recommend}`;
  if(growthRows.length)return `今月は育成が進みました。${recommend}`;
  return recommend;
}
function nextMonthFocusText(){
  const nextTour=nextTournamentAfterCurrentMonth();
  if(nextTour)return `${nextTour}を見据えた準備`;
  const next=(state.monthIndex+1)%12;
  if([3,7].includes(next))return '地区大会を見据えたサーブレシーブ';
  if([4,9].includes(next))return '全国大会または合宿を見据えた基礎強化';
  return 'チームの弱点補強';
}
function monthlyReportSections(snap){
  const growth=monthlyGrowthRows(snap);
  const scouts=monthlyScoutRows(snap);
  const matches=monthlyMatchRows(snap);
  const title=`${snap?.year||state.year}年目 ${MONTHS[snap?.monthIndex??state.monthIndex]} 月間レポート`;
  const head=`<div class="monthly-report-head"><img src="${currentManagerPortrait()}" alt="マネージャー"><div><h3>${title}</h3><div class="growth-manager">${managerLine(managerMonthlyComment(growth,scouts,matches))}</div></div></div>`;
  return {
    title,
    all:`<div class="monthly-report-card">${head}<div class="monthly-report-section"><h4>上がった能力</h4>${topMonthlyGrowthHtml(growth)}</div><div class="monthly-report-section"><h4>新規スカウト候補</h4>${scouts.length?scouts.map(x=>`<div class="monthly-chip">${x}</div>`).join(''):'<div class="monthly-empty">新規候補はいません。</div>'}</div><div class="monthly-report-section"><h4>試合・勝敗理由</h4>${matches.length?matches.map(m=>`<div class="monthly-match-row"><strong>${m.summary}</strong><span>${m.reason||''}</span>${m.analysisHtml||''}</div>`).join(''):'<div class="monthly-empty">今月の試合はありません。</div>'}</div><div class="monthly-report-section monthly-recommend-section"><h4>マネージャーおすすめ</h4><div class="monthly-recommend">${monthlyActionRecommendation(growth,scouts,matches)}</div></div><div class="monthly-report-section"><h4>来月の見通し</h4><div class="monthly-empty">${nextMonthFocusText()}</div></div></div>`,
    growth:`<div class="monthly-report-card">${head}<div class="monthly-report-section"><h4>上がった能力</h4>${topMonthlyGrowthHtml(growth)}</div></div>`,
    scout:`<div class="monthly-report-card">${head}<div class="monthly-report-section"><h4>新規スカウト候補</h4>${scouts.length?scouts.map(x=>`<div class="monthly-chip">${x}</div>`).join(''):'<div class="monthly-empty">新規候補はいません。</div>'}</div></div>`,
    match:`<div class="monthly-report-card">${head}<div class="monthly-report-section"><h4>試合・勝敗理由</h4>${matches.length?matches.map(m=>`<div class="monthly-match-row"><strong>${m.summary}</strong><span>${m.reason||''}</span>${m.analysisHtml||''}</div>`).join(''):'<div class="monthly-empty">今月の試合はありません。</div>'}</div></div>`,
    recommend:`<div class="monthly-report-card">${head}<div class="monthly-report-section monthly-recommend-section"><h4>マネージャーおすすめ</h4><div class="monthly-recommend">${monthlyActionRecommendation(growth,scouts,matches)}</div></div><div class="monthly-report-section"><h4>来月の見通し</h4><div class="monthly-empty">${nextMonthFocusText()}</div></div></div>`
  };
}

function storeMonthlyReportIfNeeded(){
  ensureMonthlyReportState();
  const snap=state.monthReportSnapshot;
  const growthRows=monthlyGrowthRows(snap);
  const sections=monthlyReportSections(snap);
  state.lastMonthlyReport={key:snap.key,title:sections.title,growthRows,sections};
  state.trainingLog.push(`${sections.title}を作成しました。月初の成長報告、またはチーム画面の月間レポートから確認できます。`);
}
function showMonthlyReportCategory(category='all'){
  const rep=state.lastMonthlyReport;
  if(!rep||!rep.sections){managerSay('表示できる月間レポートはまだありません。');return;}
  const html=rep.sections[category]||rep.sections.all;
  const label={all:'全体',growth:'上がった能力',scout:'スカウト',match:'試合',recommend:'おすすめ'}[category]||'レポート';
  enqueueImportantPopup(`${rep.title}：${label}`, html, 'event','multi_event');
}
if(typeof window!=='undefined')window.showMonthlyReportCategory=showMonthlyReportCategory;
function renderMonthlyReportPanel(){
  const el=document.getElementById('monthlyReportPanel');
  if(!el)return;
  const rep=state.lastMonthlyReport;
  if(!rep){el.innerHTML='<div class="monthly-report-buttons muted">月末になると、ここに月間レポートの確認ボタンが表示されます。</div>';return;}
  el.innerHTML=`<div class="monthly-report-buttons"><div class="monthly-report-title">${rep.title}</div><div class="action-row wrap"><button class="ghost small" type="button" onclick="showMonthlyReportCategory('all')">全体</button><button class="ghost small" type="button" onclick="showMonthlyReportCategory('growth')">上がった能力</button><button class="ghost small" type="button" onclick="showMonthlyReportCategory('scout')">スカウト</button><button class="ghost small" type="button" onclick="showMonthlyReportCategory('match')">試合</button><button class="ghost small" type="button" onclick="showMonthlyReportCategory('recommend')">おすすめ</button></div></div>`;
}

function sumResults(obj){
  return Object.values(obj||{}).reduce((a,b)=>a+(Number(b)||0),0);
}
function actionTeamResults(stats,action,teamName){
  return stats?.actions?.[action]?.teams?.[teamName]||{};
}
function rateText(n,d){
  if(!d)return '—';
  return `${Math.round((n/d)*100)}%`;
}
function matchAnalysisForTeam(stats,teamName){
  const rec=actionTeamResults(stats,'reception',teamName);
  const sp=actionTeamResults(stats,'spike',teamName);
  const bl=actionTeamResults(stats,'block',teamName);
  const serve=actionTeamResults(stats,'serve',teamName);
  const recTotal=sumResults(rec);
  const aCut=rec['Aカット']||0;
  const bCut=rec['Bカット']||0;
  const broken=(rec['崩れカット']||0)+(rec['チャンス返球']||0)+(rec['サービスエース']||0);
  const spikeTotal=sumResults(sp);
  const kills=(sp['得点']||0)+(sp['ノータッチ']||0)+(sp['フェイント得点']||0);
  const spikeErr=(sp['ミス']||0)+(sp['被シャット']||0);
  const blockTotal=sumResults(bl);
  const stuffs=bl['シャットアウト']||0;
  const serveTotal=sumResults(serve);
  const aces=serve['サービスエース']||0;
  const serveMiss=serve['ミス']||0;
  return {teamName,recTotal,aCut,bCut,broken,spikeTotal,kills,spikeErr,blockTotal,stuffs,serveTotal,aces,serveMiss,
    aCutRate:rateText(aCut,recTotal),brokenRate:rateText(broken,recTotal),killRate:rateText(kills,spikeTotal),spikeErrRate:rateText(spikeErr,spikeTotal),blockRate:rateText(stuffs,blockTotal),aceRate:rateText(aces,serveTotal),serveMissRate:rateText(serveMiss,serveTotal)};
}
function matchAnalysisRowsHtml(a){
  return `<div class="match-analysis-grid">
    <div><span>Aカット率</span><strong>${a.aCutRate}</strong><small>${a.aCut}/${a.recTotal}</small></div>
    <div><span>レセプション崩れ率</span><strong>${a.brokenRate}</strong><small>${a.broken}/${a.recTotal}</small></div>
    <div><span>スパイク決定率</span><strong>${a.killRate}</strong><small>${a.kills}/${a.spikeTotal}</small></div>
    <div><span>スパイク失点率</span><strong>${a.spikeErrRate}</strong><small>${a.spikeErr}/${a.spikeTotal}</small></div>
    <div><span>ブロック率</span><strong>${a.blockRate}</strong><small>${a.stuffs}/${a.blockTotal}</small></div>
    <div><span>サービスエース率</span><strong>${a.aceRate}</strong><small>${a.aces}/${a.serveTotal}</small></div>
  </div>`;
}
function matchAnalysisReportHtml(stats,ownName,oppName){
  const own=matchAnalysisForTeam(stats,ownName);
  const opp=matchAnalysisForTeam(stats,oppName);
  return `<div class="match-analysis-report">
    <div class="match-analysis-team"><h5>${ownName}</h5>${matchAnalysisRowsHtml(own)}</div>
    <div class="match-analysis-team"><h5>${oppName}</h5>${matchAnalysisRowsHtml(opp)}</div>
  </div>`;
}
function matchAnalysisManagerReason(stats,ownName,oppName,win){
  const own=matchAnalysisForTeam(stats,ownName);
  const opp=matchAnalysisForTeam(stats,oppName);
  const points=[];
  if(own.recTotal && opp.recTotal){
    if(own.broken/own.recTotal > opp.broken/opp.recTotal + 0.12)points.push('レセプションの崩れ率が相手より高めでした');
    else if(opp.broken/opp.recTotal > own.broken/own.recTotal + 0.12)points.push('相手のレセプションをよく崩せました');
    if(own.aCut/own.recTotal > opp.aCut/opp.recTotal + 0.10)points.push('Aカット率で優位でした');
  }
  if(own.spikeTotal && opp.spikeTotal){
    if(own.kills/own.spikeTotal > opp.kills/opp.spikeTotal + 0.10)points.push('スパイク決定率で上回りました');
    else if(opp.kills/opp.spikeTotal > own.kills/own.spikeTotal + 0.10)points.push('相手の決定率を抑えきれませんでした');
  }
  if(own.blockTotal && opp.blockTotal){
    if(own.stuffs/own.blockTotal > opp.stuffs/opp.blockTotal + 0.04)points.push('ブロックで流れを作れました');
    else if(opp.stuffs/opp.blockTotal > own.stuffs/own.blockTotal + 0.04)points.push('相手ブロックに捕まりました');
  }
  const head=win?'勝因':'敗因';
  return `${head}：${points.slice(0,2).join('。')||'細かい差の積み重ねです'}。`;
}

function recordMonthlyMatchResult(tour,opp,os,ps,win,stats){
  if(!Array.isArray(state.monthlyReportMatches))state.monthlyReportMatches=[];
  const ownName=ownSchoolName();
  const oppName=opp?.name||'相手校';
  const reason=matchAnalysisManagerReason(stats,ownName,oppName,win);
  const analysisHtml=matchAnalysisReportHtml(stats,ownName,oppName);
  state.monthlyReportMatches.push({key:monthlyReportKey(),summary:`${tour?.name||'試合'}：${ownName} ${os}-${ps} ${oppName} / ${win?'勝利':'敗戦'}`,opp:oppName,win,reason,analysisHtml});
}
// v90: 4月第1週を終えた時点（新入部員が加わりメンバーが確定した直後）のチーム評価を
// その年度の基準として記録する。チーム画面のレーダーで「今季どれだけ伸びたか」を出すため。
function captureSeasonBaselineIfNeeded(){
  if(state.monthIndex!==0||state.turnIndex!==0)return;
  if(state.seasonBaseline&&state.seasonBaseline.year===state.year)return;
  try{
    const metrics=teamRadarMetrics();
    if(!metrics||!metrics.length)return;
    state.seasonBaseline={year:state.year,values:Object.fromEntries(metrics.map(m=>[m.key,m.value]))};
  }catch(e){}
}
function advanceTurn(){
  // v188: 週が進んだら、前の試合のログと結果表示を消して試合画面を次の試合用に戻す（Tak指示）。
  //        試合直後の finalizeWatchMatch / simulateMatch は advanceTurn のあとで
  //        state.matchLog を入れ直すので、いま終えた試合のログは残る。
  //        消えるのは「次に週を進めたとき」の1回前のログ。
  clearMatchScreenForNextWeek();
  captureSeasonBaselineIfNeeded();
  ensureMonthlyReportState();
  const closingMonth=state.turnIndex>=3;
  if(closingMonth)storeMonthlyReportIfNeeded();
  state.turnIndex++;
  if(state.turnIndex>=4){
    state.turnIndex=0;
    state.monthIndex++;
    state.scoutLockedMonthKey=null;
    if(state.monthIndex>=12){
      state.monthIndex=0;
      state.year++;
      // v100: 新入部員の選考は年度切替のインターバルで行う。
      // ここは 3月第4週を終えて 4月第1週に入る直前。通常進行より先に選考を出す。
      openAprilRecruitSelectionAtYearRollover();
      state.qualifiedInterhigh=false;
      state.qualifiedHaruko=false;
      state.seniorsRetired=false;
      state.interhighPrefEliminated=false;
      state.interhighNatEliminated=false;
      state.harukoPrefEliminated=false;
      state.harukoNatEliminated=false;
    }
    if(state.monthIndex===0&&state.turnIndex===0)clearScoutRumorsAtAprilStart();
    state.monthReportSnapshot=monthlyReportSnapshot();
    state.monthTransitionPending={
      key:actionPromptKey(),
      reportKey:state.lastMonthlyReport?.key||null
    };
    state.monthTransitionModalOpen=false;
    state.monthlyRetiredSnapshots=[];
    state.coachActionMatchWeekMode=false;
  }
}
function isTournamentTurn(){
  const m=state.monthIndex,t=state.turnIndex;
  if(m===3&&t<=2){
    const names=['地区大会1回戦','地区大会ベスト4','地区大会決勝'];
    return{type:'interhigh_pref',name:`インターハイ ${names[t]}`,round:t+1};
  }
  if(m===7&&t<=2){
    const names=['地区大会1回戦','地区大会ベスト4','地区大会決勝'];
    return{type:'haruko_pref',name:`春高 ${names[t]}`,round:t+1};
  }
  if(m===4&&t<=2&&state.qualifiedInterhigh){
    const names=['全国1回戦','全国ベスト4','全国決勝'];
    return{type:'interhigh_nat',name:`インターハイ ${names[t]}`,round:t+1};
  }
  if(m===9&&t<=2&&state.qualifiedHaruko){
    const names=['全国1回戦','全国ベスト4','全国決勝'];
    return{type:'haruko_nat',name:`春高 ${names[t]}`,round:t+1};
  }
  return null;
} function isCampTurn(){return (state.monthIndex===4&&!state.qualifiedInterhigh) || (state.monthIndex===9&&!state.qualifiedHaruko);}

// 2026-07-26 Supabase統合: 合宿テーマ選択。合宿中は固定テーマを全選手へ毎週+5XPで加算する。
const CAMP_THEME_EFFECTS={
  spike:{label:'スパイク',effects:{spikePower:5,spikeControl:5}},
  block:{label:'ブロック',effects:{blockRead:5,blockStuff:5}},
  serve:{label:'サーブ',effects:{servePower:5,serveControl:5}},
  receive:{label:'レシーブ',effects:{recReception:5,recDig:5,recRange:5}},
  toss:{label:'トス',effects:{tossAccuracy:5,tossRead:5}},
  jump:{label:'ジャンプ',effects:{jump:5}}
};
function currentCampKey(){return `${state.year}-${state.monthIndex===9?'haruko':'interhigh'}-camp`;}
function currentCampTheme(){
  if(!isCampTurn() || state.campThemeKey!==currentCampKey())return null;
  return CAMP_THEME_EFFECTS[state.campTheme]||null;
}
function openCampThemeSelection(){
  const buttons=Object.entries(CAMP_THEME_EFFECTS).map(([id,cfg])=>`<button class="primary" type="button" onclick="chooseCampTheme('${id}')">${cfg.label}</button>`).join('');
  enqueueImportantPopup('合宿テーマを選択',`<div class="growth-manager">${managerLine('監督、この合宿で重点的に鍛えるテーマを決めましょう。')}</div><div class="growth-item">選んだテーマは合宿終了まで変更できません。合宿そのものの効果に加えて、毎週テーマの能力が全員少しずつ伸びます。</div><div class="choice-buttons">${buttons}</div>`,'event','camp_event',{requireChoice:true});
}
function chooseCampTheme(id){
  if(!CAMP_THEME_EFFECTS[id])return;
  state.campTheme=id;
  state.campThemeKey=currentCampKey();
  const label=CAMP_THEME_EFFECTS[id].label;
  state.trainingLog.push(`合宿テーマを「${label}」に決定しました。合宿中は毎週、テーマの能力が伸びやすくなります。`);
  managerSay(`合宿テーマは「${label}」です。期間中はこのテーマを重点的に鍛えます。`);
  closeImportantPopup(true);
  saveState();
  renderAll();
}
if(typeof window!=='undefined')window.chooseCampTheme=chooseCampTheme;

function tournamentMatchKey(tour){
  if(!tour)return '';
  return `${state.year}:${state.monthIndex}:${state.turnIndex}:${tour.type}:${tour.round}`;
}
function isTournamentMatchPending(tour=null){
  const t=tour||isTournamentTurn();
  return !!(t && !currentTournamentEliminated(t));
}
// v159: 未消化の練習試合も、大会と同じく消化しないと次へ進めないようにする。
function pendingPracticeMatchActive(){
  return !!(state.practiceMatch && state.practiceMatch.opponent && !state.practiceMatch.done);
}
// v205: U-18日本代表戦だけは「練習試合」ではなく「強化試合」と表示する（Tak指示）。
//        判定は相手が U-18日本代表（isU18AllStar）かどうか。2月の定例戦でも、
//        監督活動で組まれたU-18戦でも同じ扱いになる。
function practiceMatchKindLabel(opp=null){
  const o=opp||(state.practiceMatch&&state.practiceMatch.opponent);
  if(o&&o.isOgAllStar)return 'OG特別試合';
  return (o&&o.isU18AllStar)?'強化試合':'練習試合';
}
// v206: 進行状況の帯に出す表示名。OG戦だけは接頭辞を付けず、相手名だけを出す（Tak指示）。
function practiceMatchDisplayName(){
  const o=state.practiceMatch&&state.practiceMatch.opponent;
  if(!o)return '練習試合';
  if(o.isOgAllStar)return o.name;
  return `${practiceMatchKindLabel(o)}：${o.name}`;
}
// v160: 練習試合の組み方を1本化する。どの経路で組まれても必ず試合画面へ移行し、
//        消化するまで週を進められない（大会と同じ扱い）。
function setPracticeMatch(opp, extra={}){
  if(!opp)return null;
  state.practiceMatch={opponent:opp,createdKey:turnEventKey(),done:false,...extra};
  state.pendingSwitchToMatchTab=true;
  return state.practiceMatch;
}
// ポップアップも月初モーダルも出ていないのに試合画面から離れている場合は連れ戻す。
function enforcePracticeMatchFocus(){
  if(!state.pendingSwitchToMatchTab)return;
  if(!pendingPracticeMatchActive()){state.pendingSwitchToMatchTab=false;return;}
  if(popupOpen||popupQueue.length)return;
  if(monthTransitionLocked())return;
  if(state.aprilRecruitSelectionOpen)return;
  state.pendingSwitchToMatchTab=false;
  try{forceSwitchTab('match');}catch(e){}
}
// v173: 進行ボタンのラベルは常に同一（Tak指示）。v181で「次週に進む」に改称。
//        v159で入れた「試合に臨む」「練習試合に臨む」への切り替えは廃止した。
function currentAdvanceButtonLabel(){
  return '次週に進む';
}
function updateAdvanceButtonLabels(){
  const label=currentAdvanceButtonLabel();
  const a=document.getElementById('advanceMonthBtn');
  if(a)a.textContent=label;
  const c=document.getElementById('coachAdvanceBtn');
  if(c)c.textContent=label;
}
function tournamentRoundShortName(tour){
  if(!tour)return '試合';
  if(tour.name.includes('地区大会1回戦'))return '地区大会1回戦';
  if(tour.name.includes('地区大会ベスト4'))return '地区大会ベスト4';
  if(tour.name.includes('地区大会決勝'))return '地区大会決勝';
  if(tour.name.includes('全国1回戦'))return '全国1回戦';
  if(tour.name.includes('全国ベスト4'))return '全国ベスト4';
  if(tour.name.includes('全国決勝'))return '全国決勝';
  return tour.name;
}
function evaluationRowsFromTeam(team){
  const rows=[];
  (team?.rotation||[]).forEach(id=>{
    const p=team.players?.[id];
    if(p)rows.push({player:p,role:p.role||'OH',kind:'starter'});
  });
  const lib=team?.players?.[team.libero];
  if(lib)rows.push({player:lib,role:'L',kind:'libero'});
  return rows;
}
// v165: レーダーの各軸を「ポジション別の重み」で積み上げる。
// 従来は該当ポジションの選手を単純平均していたため、OHのスパイク決定力とMBのスパイク決定力が
// まったく同じ扱いになっていた。ポジション評価と同じ重み（OHの決定力22 : MBの決定力11 など）を
// そのまま選手間の傾斜にも使うことで、「OHがSのチームの方が攻撃力が高い」が図に出るようにする。
// 重みが0のポジションは、その軸に一切効かない（例：リベロは攻撃・ブロック・サーブ・トスに寄与しない）。
const RADAR_AXIS_KEYS={
  attack:['spikePower','spikeControl','jump','height'],
  block:['blockStuff','blockRead','jump','height'],
  receive:['recReception','recDig','recRange'],
  serve:['servePower','serveControl'],
  toss:['tossAccuracy','tossRead'],
  height:['height']
};
function teamMatchMetricForRows(rows,metric){
  const keys=RADAR_AXIS_KEYS[metric];
  if(!keys)return 1;
  let num=0,den=0;
  (rows||[]).forEach(r=>{
    if(!r||!r.player)return;
    const table=POSITION_WEIGHTS[r.role]||{};
    const c=r.player.comps||r.player;
    keys.forEach(k=>{
      const w=table[k]||0;
      if(w<=0)return;
      const v=(k==='height')?heightPoint(r.player.height||156):(c[k]||1);
      num+=v*w; den+=w;
    });
  });
  return den>0 ? num/den : 1;
}
function teamRadarNote(key){
  return {
    attack:'コート上7人の攻撃力です。ポジション評価と同じ重みで積み上げるので、同じスパイク決定力でもOH（22）はMB（11）の約2倍、OP（12）の約1.8倍だけ攻撃力を押し上げます。リベロは寄与しません。',
    block:'コート上7人のブロック力です。シャットアウトの重みがMB（30）・OP（20）・S（15）・OH（8）と違うため、MBのブロックが最も効きます。リベロは寄与しません。',
    receive:'コート上7人のレシーブ力です。リベロの重み（100）が最も大きく、次いでOP（20）・OH（16）。MB（3）とS（4）はほとんど効きません。',
    serve:'スタメン6人のサーブ力です。S（13）・OH（12）・OP（12）・MB（10）とほぼ横並びです。リベロはサーブを打たないため寄与しません。',
    toss:'セッターのトス力です。正確性21・読み19で、セッター以外は寄与しません。',
    height:'スタメン6人の高さです。ポジション評価の身長の重み（MB18・OH16・OP15・S12）で加重しています。'
  }[key]||'';
}
function teamMatchMetricsForTeam(team){
  const rows=evaluationRowsFromTeam(team);
  return [
    {key:'attack',label:'攻撃',value:teamMatchMetricForRows(rows,'attack'),note:teamRadarNote('attack')},
    {key:'block',label:'ブロック',value:teamMatchMetricForRows(rows,'block'),note:teamRadarNote('block')},
    {key:'receive',label:'レシーブ',value:teamMatchMetricForRows(rows,'receive'),note:teamRadarNote('receive')},
    {key:'serve',label:'サーブ',value:teamMatchMetricForRows(rows,'serve'),note:teamRadarNote('serve')},
    {key:'toss',label:'トス',value:teamMatchMetricForRows(rows,'toss'),note:teamRadarNote('toss')},
    {key:'height',label:'高さ',value:teamMatchMetricForRows(rows,'height'),note:teamRadarNote('height')}
  ];
}
function metricValue(metrics,key){return metrics.find(m=>m.key===key)?.value||1;}
function opponentFeatureLine(opp,oppMetrics){
  const rows=evaluationRowsFromTeam(opp);
  const top=[...oppMetrics].sort((a,b)=>b.value-a.value)[0];
  const mbBlock=teamMatchMetricForRows(rows.filter(r=>r.role==='MB'),'block');
  const ohAttack=teamMatchMetricForRows(rows.filter(r=>r.role==='OH'),'attack');
  const libReceive=teamMatchMetricForRows(rows.filter(r=>r.role==='L'),'receive');
  if(mbBlock>=13 && mbBlock>=ohAttack)return `${opp.name}はミドルブロックが強く、ブロックに自信のある学校のようです。中央を無理に打ち切ると止められるかもしれません。`;
  if(ohAttack>=13)return `${opp.name}はOHの攻撃力が高い学校のようです。レフトからの強打に苦戦するかもしれません。`;
  if(libReceive>=13 || metricValue(oppMetrics,'receive')>=13)return `${opp.name}はレシーブが安定している学校のようです。単調なサーブだけでは崩しにくいかもしれません。`;
  if(metricValue(oppMetrics,'serve')>=13)return `${opp.name}はサーブで攻めてくる学校のようです。レセプションで崩されない準備が必要です。`;
  if(top)return `${opp.name}は${top.label}に特徴がある学校のようです。`;
  return `${opp.name}は大きな穴が少ない相手です。`;
}
function opponentComparisonLines(own,opp){
  const ownM=teamMatchMetricsForTeam(own),oppM=teamMatchMetricsForTeam(opp);
  const diffs=oppM.map(m=>({key:m.key,label:m.label,opp:m.value,own:metricValue(ownM,m.key),diff:m.value-metricValue(ownM,m.key)}));
  const superior=diffs.filter(x=>x.diff>=1.2).sort((a,b)=>b.diff-a.diff).slice(0,2);
  const weaker=diffs.filter(x=>x.diff<=-1.2).sort((a,b)=>a.diff-b.diff).slice(0,1);
  const lines=[];
  if(superior.length){
    lines.push(`私たちより${superior.map(x=>x.label).join('と')}が上でしょう。${superior[0].label==='レシーブ'?'こちらのサーブで簡単には崩れない相手です。':superior[0].label==='ブロック'?'アグレッシブに打つだけだと苦戦するかもしれません。':superior[0].label==='サーブ'?'序盤からレセプションを乱されるかもしれません。':'正面からぶつかると苦戦するかもしれません。'}`);
  }else{
    lines.push('戦力差は極端ではありません。こちらの強みを出せれば十分に勝負できます。');
  }
  if(weaker.length){
    lines.push(`一方で、${opp.name}は${weaker[0].label}に隙があります。そこを突けば流れを作れそうです。`);
  }
  return lines;
}
function preMatchManagerMessage(tour,opp,own){
  const round=tournamentRoundShortName(tour);
  const lines=[`今週は${opp.name}との${round}があります。`, opponentFeatureLine(opp,teamMatchMetricsForTeam(opp)), ...opponentComparisonLines(own,opp)];
  return lines.join(' ');
}
function prepareTournamentIntro(tour){
  // v203: 全国大会でその学校と初めて当たったときは、試合前ミーティングより先に
  //        初対戦の会話イベントを出す（Tak指示）。
  maybeNationalFirstEncounterEvent(tour);
  const key=tournamentMatchKey(tour);
  const opp=buildOpp(tour);
  const own=buildOwnTeam();
  const msg=preMatchManagerMessage(tour,opp,own);
  state.pendingTournamentMatchKey=key;
  state.pendingTournamentOpponentName=opp.name;
  state.pendingTournamentIntroMessage=msg;
  state.trainingLog.push(`${tour.name}：${opp.name}との試合前ミーティングを行いました。`);
  managerSay(msg);
  enqueueImportantPopup(`${tour.name} 試合前`, `<div class="growth-manager">${managerLine(msg)}</div><div class="growth-item">準備ができたら「次週に進む」を押して試合画面へ進みます。</div>${matchComparisonRadarHtml(own,opp)}`, 'event','tournament_start');
}

function teamRankBaseClass(v){
  const r=teamRank(v);
  const base=String(r||'G').charAt(0).toLowerCase();
  return 'rank-'+base;
}
function coloredValue(v){
  // v92: deriveStats() は平均値を返すため 20.5 や 16.666… のような小数になる。
  // 表示は常に整数に丸める（評価レターの判定は元の値のまま）。
  const cls=rankClassFromValue(v);
  return `<strong class="${cls}">${Math.round(Number(v)||0)}<span class="rank-chip ${cls}">${ratingLetter(v)}</span></strong>`;
}
function abilityChangeHtml(before, after, key=''){
  if(key==='height')return `${coloredHeightValue(before)}→${coloredHeightValue(after)}`;
  return `${coloredValue(before)}→${coloredValue(after)}`;
}
function coloredHeightValue(cm){
  const v=heightPoint(cm),cls=rankClassFromValue(v);
  return `<strong class="${cls}">${cm}cm<span class="rank-chip ${cls}">${ratingLetter(v)}</span></strong>`;
}
function coloredRecruitPositionSummary(recruit){
  return POSITIONS.map(pos=>{
    const v=calcPositionScore25(recruit,pos),cls=positionRankClass(v,pos);
    return `<span class="candidate-pos ${cls}">${pos}:${formatPositionScore(v)}<span class="rank-chip ${cls}">${positionRatingLetter(v,pos)}</span></span>`;
  }).join(' ');
}

// ============================================================
// v176: 自動保存が使えないときの案内
// ============================================================
// このゲームはファイルを直接開いて遊ぶ形（file://）で配る。
// プライベートウィンドウやサイトデータ遮断の設定だと localStorage が使えず、
// 進行がまったく残らない。黙って進めると数時間分が消えるので、必ず知らせる。
function storageTroubleHtml(lead){
  return `<div class="storage-warn">
    <div class="storage-warn-lead">${lead}</div>
    <div class="storage-warn-body">
      <p><strong>ゲームはこのまま遊べますが、ページを閉じたり再読み込みすると進行が消えます。</strong>こまめにファイルへ書き出してください。</p>
      <ol class="storage-warn-steps">
        <li>チーム画面の「セーブ」を押してファイルに書き出す</li>
        <li>次に遊ぶときは「ロード」で、そのファイルを選ぶ</li>
      </ol>
      <div class="storage-warn-cause">
        <div class="storage-warn-cause-title">よくある原因</div>
        <ul>
          <li>プライベート／シークレットウィンドウで開いている</li>
          <li>サイトデータ（Cookie）の保存を禁止する設定になっている</li>
        </ul>
        <p>通常のウィンドウで開き直すと直ることがあります。</p>
      </div>
    </div>
  </div>`;
}
let storageWarningShown=false;
function maybeWarnStorageUnavailable(){
  if(storageAvailable())return false;
  if(storageWarningShown)return false;
  // タイトル画面の間は出さない。遊び始めてから知らせる。
  const t=document.getElementById('titleScreen');
  if(t&&!t.classList.contains('hidden'))return false;
  if(popupOpen||popupQueue.length)return false;
  storageWarningShown=true;
  enqueueImportantPopup('自動保存ができません', storageTroubleHtml('このブラウザでは、進行状況をブラウザに保存できませんでした。'), 'info', '');
  return true;
}
// ステータスバーの警告チップから、いつでも読み直せるようにする。
function openStorageTroubleInfo(){
  enqueueImportantPopup('自動保存ができません', storageTroubleHtml('このブラウザでは、進行状況をブラウザに保存できません。'), 'info', '');
}
if(typeof window!=='undefined')window.openStorageTroubleInfo=openStorageTroubleInfo;

// ============================================================
// v174: 体験版／有料版の判定と、体験版の終了画面
// ============================================================
// content-national.js が全国コンテンツを登録していなければ体験版。
// フラグではなく「データそのものの有無」で判定する。
function isDemoBuild(){
  return !(typeof GVB_NATIONAL!=='undefined' && GVB_NATIONAL);
}
// 体験版クリア後は、クリア演出以外のポップアップを積まない。
let demoEndingEnqueued=false;
function demoEndingActive(){
  return isDemoBuild() && !!(state && state.demoCleared);
}
// 地区大会優勝＝全国大会出場決定。体験版はここで終わる。
function maybeEnqueueDemoEnding(tour){
  if(!isDemoBuild())return false;
  if(!state || state.demoCleared)return false;
  state.demoCleared=true;
  state.demoClearedYear=state.year||1;
  // 「インターハイ 地区大会決勝」→「インターハイ 地区大会」。文中で読みやすくする。
  state.demoClearedTournament=String((tour&&tour.name)||'地区大会').replace(/決勝$/,'');
  enqueueStoryEvent('体験版はここまで',[
    '体育館の外に出ると、風がまだ夏の匂いをしていた。',
    'ここまで来るのに、何年かかっただろう。<br>新設校の、部員12人から始めたチームだ。',
    'だが、本当の戦いはここから始まる。<br>全国には、この学校がまだ見たことのない景色がある。',
    `<strong>体験版はここまでです。</strong><br>${state.demoClearedTournament}を制し、全国大会への切符を掴みました。<div class="hint top-gap">製品版では、この続きの全国大会を戦えます。今のセーブデータを書き出しておけば、製品版に読み込んでそのまま続きから遊べます。</div>`
  ],'district_champion','gold-special');
  demoEndingEnqueued=true;
  return true;
}
function demoEndingScreenOpen(){
  const m=document.getElementById('demoEndModal');
  return !!(m && !m.classList.contains('hidden'));
}
// v178: 終了画面の1枚絵。体験版でしか出ないので、src はここで入れる。
// index.html に直接書くと、製品版でも画像を取りに行って404になる。
const DEMO_END_HERO='assets/events/demo_end.png';
function showDemoEndingScreen(){
  if(!demoEndingActive())return false;
  const m=document.getElementById('demoEndModal');
  if(!m)return false;
  const hero=document.getElementById('demoEndHero');
  if(hero&&!hero.getAttribute('src')){
    hero.setAttribute('src',DEMO_END_HERO);
    hero.setAttribute('alt','体験版を遊んでくれてありがとう！続きは製品版で！');
    // 画像が無い環境でも枠だけ残さない
    hero.onerror=()=>{hero.style.display='none';};
  }
  const body=document.getElementById('demoEndBody');
  if(body){
    const y=state.demoClearedYear||state.year||1;
    const t=state.demoClearedTournament||'地区大会';
    // v186: ボタンの説明書きと「この記録はこれ以上進みません。」は不要（Tak指示）。
    body.innerHTML=`<div class="demo-end-lead">${ownSchoolName()}は${y}年目に${t}を制し、全国大会への出場を決めました。</div>
      <div class="demo-end-note">体験版で遊べるのはここまでです。</div>`;
  }
  m.classList.remove('hidden');
  m.style.display='flex';
  return true;
}
function demoExportSave(){
  try{ exportCurrentSave(); }
  catch(e){ alert('セーブデータを書き出せませんでした：'+(e.message||e)); }
}
function demoRestart(){
  if(!confirm('新しく始めますか？\n書き出していないセーブデータは失われます。'))return;
  try{
    ssRemove(STORAGE_KEY+'-session-started');
    ssRemove(STORAGE_KEY+'-intro-active');
  }catch(e){}
  state=initialState();
  watchMatchSession=null;
  demoEndingEnqueued=false;
  popupQueue.length=0;
  saveState();
  const m=document.getElementById('demoEndModal');
  if(m){m.classList.add('hidden');m.style.display='';}
  try{ location.reload(); }
  catch(e){ renderAll(); }
}
if(typeof window!=='undefined'){
  window.demoExportSave=demoExportSave;
  window.demoRestart=demoRestart;
}

const EVENT_ILLUSTRATIONS={
  // v97/v98/v99: 東峰女学院の東堂 蒼・西城 茜（段階1は体験版にもある）
  toho_rival_stage1:'assets/events/toho_rival_stage1.png',
  // v195: 東峰との初対戦に負けたときの挑発イベント専用（stage1は東峰が敗れた後の絵なので流用しない）
  toho_first_loss:'assets/events/toho_first_loss.png',
  new_students:'assets/events/new_students.png',
  multi_event:'assets/events/multi_event.png',
  retirement:'assets/events/retirement.png',
  og_sister_visit:'assets/events/og_sister_visit.png',
  tournament_start:'assets/events/tournament_start.png',
  og_visit:'assets/events/og_visit.png',
  district_champion:'assets/events/district_champion.png',
  personal_change:'assets/events/personal_change.png',
  scout_report:'assets/events/scout_report.png',
  // v139: 試合結果モーダル（勝利／敗戦）とスカウトの噂
  match_win:'assets/events/match_win.png',
  match_lose:'assets/events/match_lose.png',
  scout_rumor:'assets/events/scout_rumor.png',
  scout_great_success:'assets/events/scout_great_success.png',
  legendary_acupuncture:'assets/events/legendary_acupuncture.png',
  sea_event_1:'assets/events/sea_event_1.png',
  sea_event_2:'assets/events/sea_event_2.png',
  sea_event_3:'assets/events/sea_event_3.png',
  sea_event_4:'assets/events/sea_event_4.png',
  sea_event_5:'assets/events/sea_event_5.png',
  sea_event_6:'assets/events/sea_event_6.png',
  sea_event_7:'assets/events/sea_event_7.png',
  sea_event_8:'assets/events/sea_event_8.png',
  shrine_omikuji:'assets/events/shrine_omikuji.png',
  pro_watch_team:'assets/events/pro_watch_team.png',
  camp_event:'assets/events/camp_event.png',
  player_awakening:'assets/events/player_awakening.png',
  growth_spurt:'assets/events/growth_spurt.png',
  form_change:'assets/events/form_change.png',
  zone_event:'assets/events/zone_event.png',
  recreation_event:'assets/events/recreation_event.png',
  study_abroad_departure:'assets/events/study_abroad_departure.png',
  study_abroad_return:'assets/events/study_abroad_return.png'
};
// v174: 全国限定イベントの挿絵は content-national.js（有料版）で登録する。
if(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.eventIllustrations)Object.assign(EVENT_ILLUSTRATIONS,GVB_NATIONAL.eventIllustrations);
function randomSeaEventImageKey(){
  return randomChoice(['sea_event_1','sea_event_2','sea_event_3','sea_event_4','sea_event_5','sea_event_6','sea_event_7','sea_event_8']);
}
function popupIllustrationHtml(imageKey, alt=''){
  const src=EVENT_ILLUSTRATIONS[imageKey];
  if(!src)return '';
  // v211: 「最初の約束」のイベントだけは、一枚絵ではなくその子の顔グラ（正方形）を挿絵に使う。
  //        横長の一枚絵と同じ扱いで横幅いっぱいに伸ばすと絵が縦に伸びてカードからはみ出し、
  //        画面の高さが720px前後の環境で「次へ」が枠外に出て押せなくなる（Tak報告）。
  //        顔グラのときだけ専用クラスを付けて、縦横に上限を掛ける。
  const cls=(imageKey==='promise_rookie_face')?' popup-illustration-face':'';
  return `<div class="popup-illustration${cls}"><img src="${src}" alt="${alt||''}"></div>`;
}


// ============================================================
// v101: 物語形式のイベント（短い文を1枚ずつ送る、オープニングと同じ見せ方）
// ============================================================
// 大きめのイベントは、長い本文を一度に出すのではなく、1〜2文ずつ「次へ」で送る。
// pages は文字列か {text, imageKey} の配列。imageKey を書くと、その頁で挿絵が差し替わる。
const storySequences={};
let storySeq=0;
function storyPageText(page){return typeof page==='string'?page:(page&&page.text)||'';}
function storyPageImage(page){return (page&&typeof page==='object'&&page.imageKey)||'';}
// v186: .story-text は中身を上下中央に置くために flex にしてある。
//        本文が <strong> や <div class="hint"> を含むと、それぞれが別々のフレックス項目に
//        なって横に3列並んでしまう（体験版クリアの最終頁で発生）。
//        本文は必ずこの1枚で包んで、フレックス項目を1つに保つ。
function storyTextInnerHtml(html){return `<div class="story-text-inner">${html}</div>`;}
function storyBodyHtml(sid){
  const st=storySequences[sid];
  if(!st)return '';
  const total=st.pages.length;
  const first=storyPageText(st.pages[0]);
  return `<div class="story-seq" id="${sid}" data-index="0">
    <div class="story-text">${storyTextInnerHtml(first)}</div>
    <div class="story-foot">
      <span class="story-progress">1 / ${total}</span>
      <button type="button" class="primary small story-next" onclick="advanceStorySequence('${sid}')">次へ</button>
    </div>
  </div>`;
}
function advanceStorySequence(sid){
  const st=storySequences[sid];
  const box=document.getElementById(sid);
  if(!st||!box)return;
  const next=Number(box.dataset.index||0)+1;
  if(next>=st.pages.length)return;
  box.dataset.index=String(next);
  const page=st.pages[next];
  const textEl=box.querySelector('.story-text');
  if(textEl){
    textEl.innerHTML=storyTextInnerHtml(storyPageText(page));
    textEl.classList.remove('story-fade');
    void textEl.offsetWidth;
    textEl.classList.add('story-fade');
  }
  const img=storyPageImage(page);
  if(img&&EVENT_ILLUSTRATIONS[img]){
    const c=document.getElementById('growthModalContent');
    let imgEl=c&&c.querySelector('.popup-illustration img');
    if(imgEl)imgEl.src=EVENT_ILLUSTRATIONS[img];
    else if(c){ // v125: 挿絵なしで始まった物語に、最後の頁で絵を差し込む
      const kindEl=c.querySelector('.popup-kind');
      const html=popupIllustrationHtml(img,'');
      if(kindEl)kindEl.insertAdjacentHTML('afterend',html); else c.insertAdjacentHTML('afterbegin',html);
    }
  }
  const prog=box.querySelector('.story-progress');
  if(prog)prog.textContent=`${next+1} / ${st.pages.length}`;
  if(next>=st.pages.length-1){
    const btn=box.querySelector('.story-next');
    if(btn)btn.remove();
    const closeBtn=document.getElementById('growthModalClose');
    if(closeBtn)closeBtn.classList.remove('hidden');
  }
}
// 最後の頁まで送るまで閉じられないようにする（requireChoice の仕組みを流用しない軽い版）
// v125: imageKey に '' を渡すと挿絵なしで始まり、頁側の imageKey で初めて絵が出る
function enqueueStoryEvent(title, pages, imageKey='multi_event', kind='gold-special'){
  const list=(pages||[]).filter(x=>storyPageText(x));
  if(!list.length)return;
  if(list.length===1){
    enqueueImportantPopup(title, `<div class="story-seq"><div class="story-text">${storyTextInnerHtml(storyPageText(list[0]))}</div></div>`, kind, imageKey);
    return;
  }
  const sid='story_'+(++storySeq);
  storySequences[sid]={pages:list};
  enqueueImportantPopup(title, storyBodyHtml(sid), kind, imageKey);
}

const popupQueue=[];
let popupOpen=false;
let popupChoiceRequired=false;

function enqueueImportantPopup(title, html, kind='info', imageKey='', options={}){
  // v174: 体験版のクリア演出を積んだあとは、それ以降のポップアップを出さない。
  if(demoEndingEnqueued)return;
  popupQueue.push({title, html, kind, imageKey, ...(options||{})});
  showNextImportantPopup();
}


// v119: 以前はイベント表示時に一番下までスクロールしていたが、
//       文章の途中から始まってしまうため、常に先頭を表示するようにした。
//       （選択肢の追記などで呼ばれる既存の呼び出しはそのまま活かし、動きだけ先頭寄せに変える）
function scrollGrowthModalToBottom(){
  const body=document.querySelector('#growthModalContent .popup-scroll-body');
  requestAnimationFrame(()=>{
    if(body)body.scrollTop=0;
  });
}

function showNextImportantPopup(){
  if(popupOpen || !popupQueue.length)return;
  const item=popupQueue.shift();
  popupOpen=true;
  const m=document.getElementById('growthModal'),c=document.getElementById('growthModalContent');
  const titleEl=document.getElementById('growthModalTitle') || document.querySelector('#growthModal h2');
  const closeBtn=document.getElementById('growthModalClose');
  popupChoiceRequired=!!item.requireChoice;
  // v91: 中身に応じて種類バッジと残件数を出す
  try{
    const kind=item.requireChoice?'choice':(['match','graduation','rankup','gold-special'].includes(item.kind)||/優勝|敗退|試合|結果/.test(String(item.title||''))?'result':'info');
    setModalKind('growthModal',kind);
    const total=popupQueue.length+1;
    setModalStep('growthModal', total>1?`1 / ${total}`:'');
  }catch(e){}
  if(titleEl)titleEl.textContent=item.title||'お知らせ';
  const isStory=String(item.html||'').includes('class="story-seq" id="story_');
  if(closeBtn){
    closeBtn.textContent=popupChoiceRequired?'選択してください':(popupQueue.length?'次へ':'OK');
    closeBtn.disabled=popupChoiceRequired;
    // v101: 物語形式は最後の頁まで送ってから閉じられるようにする
    closeBtn.classList.toggle('hidden', popupChoiceRequired || isStory);
    // v207: 絵だけを画面いっぱいに出すポップアップは、右下の「閉じる」だけを残す（Tak指示）。
    if(item.imageOnly){
      closeBtn.textContent='閉じる';
      closeBtn.disabled=false;
      closeBtn.classList.remove('hidden');
    }
  }
  if(m&&c){
    // v207: 絵だけ表示モード。タイトル・種類バッジ・本文をCSSで隠し、絵を画面いっぱいにする。
    m.classList.toggle('popup-image-only', !!item.imageOnly);
    c.innerHTML=`<div class="popup-kind popup-${item.kind||'info'}"></div>`+popupIllustrationHtml(item.imageKey,item.title||'')+`<div class="popup-scroll-body">${item.html||''}</div>`;
    m.classList.remove('hidden');
    const body=c.querySelector('.popup-scroll-body');
    // v119: 種類を問わず先頭から表示する
    if(body)requestAnimationFrame(()=>{body.scrollTop=0;});
  }
}

function closeImportantPopup(force=false){
  if(popupChoiceRequired && !force){
    managerSay('どちらかの選択肢を選んでください。');
    return;
  }
  popupChoiceRequired=false;
  const m=document.getElementById('growthModal');
  if(m)m.classList.add('hidden');
  const closeBtn=document.getElementById('growthModalClose');if(closeBtn){closeBtn.textContent='OK';closeBtn.disabled=false;closeBtn.classList.remove('hidden');}
  popupOpen=false;
  setTimeout(()=>{
    if(popupQueue.length)showNextImportantPopup();
    // v174: 体験版はクリア演出を見終えたところで終了画面に入る。
    else if(demoEndingActive()){showDemoEndingScreen();}
    else if(state.aprilRecruitSelectionOpen&&state.showAprilRecruitSelectionAfterPopup){state.showAprilRecruitSelectionAfterPopup=false;showAprilRecruitSelection();}
    // v151: 練習試合を受けたときは、ポップアップを閉じ切ってから試合タブへ移す
    else if(state.pendingSwitchToMatchTab){state.pendingSwitchToMatchTab=false;try{forceSwitchTab('match');}catch(e){}saveState();}
    else maybeAutoSwitchCoachScreen();
    // v188: ポップアップが開いている間は試合画面から離れられない。
    //        閉じ切ったここで判定をやり直さないと、試合が無い週でも試合画面に留まる（Tak指示）。
    try{tryLeaveMatchTab();}catch(e){}
  },80);
}


function sortGrowthItemsByTeamOrder(items){
  if(!Array.isArray(items))return items||[];
  let order=[];
  try{order=teamDisplayOrderedPlayers().map(p=>p.name);}catch(e){order=(state.players||[]).map(p=>p.name);}
  const idx=(item)=>{
    const s=String(item||'');
    const found=order.findIndex(name=>name && s.includes(name));
    return found>=0?found:9999;
  };
  return [...items].sort((a,b)=>idx(a)-idx(b));
}



function scoutResultPopupHtml(res, region, pos, summary){
  if(res.recruit){
    const isGreat=res.result==='大成功';
    return `<div class="scout-result-popup ${isGreat?'great-success':''}">
      <div class="scout-result-head">${res.recruit.portrait?`<img class="scout-result-face" src="${res.recruit.portrait}" alt="">`:''}
        <div><div class="growth-manager">${managerLine(isGreat?'大成功です。かなり有望な選手を見つけました！':`${region}で${pos}候補を見つけました。`)}</div>
        <h3>${res.recruit.name}</h3>
        <div class="meta">${region} / ${pos} / ${res.recruit.height}cm / 加入予定：${state.year+1}年目4月</div></div>
      </div>
      <div class="top-gap">${positionSummaryBoxes(summary)}</div>
      <div class="hint top-gap">${isGreat?'大成功のため、来年度の加入候補として強く期待できます。':'来年度の加入候補に追加しました。'}</div>
    </div>`;
  }
  return `<div class="growth-manager">${managerLine(`${region}で${pos}候補を探しました。`)}</div><div class="growth-item">${res.text}</div>`;
}


// 2026-07-26 Supabase統合: 全国成績を卒業時のプロ入り判定に利用。
function recordSeasonNationalResult(tour,win){
  if(!tour||!win||!['interhigh_nat','haruko_nat'].includes(tour.type))return;
  if(!state.seasonNationalResult)state.seasonNationalResult={interhigh:null,haruko:null};
  const key=tour.type==='interhigh_nat'?'interhigh':'haruko';
  const stage=tour.round>=3?'champion':tour.round===2?'final':'best4';
  if(stage==='champion'){
    state.ogMatchScheduledYear=state.year;
    state.lastNationalChampionYear=state.year;
    // v201: 全国優勝した時点でU-18戦が解禁される。以後は進行バーに出したままにする。
    state.u18TimelineRevealed=true;
  }
  const order={best4:1,final:2,champion:3};
  const cur=state.seasonNationalResult[key];
  if(!cur||order[stage]>order[cur])state.seasonNationalResult[key]=stage;
}
function bestSeasonNationalResult(){
  const r=state.seasonNationalResult||{};
  const order={best4:1,final:2,champion:3};
  return [r.interhigh,r.haruko].filter(Boolean).sort((a,b)=>(order[b]||0)-(order[a]||0))[0]||null;
}
function grantAllCoachStatsXp(amount,logs){
  ensureCoachStats();
  const gained=Math.max(0,Math.round(amount||0));
  for(const [key,def] of Object.entries(COACH_STAT_DEFS)){
    const stat=state.coachStats[key];
    if(stat.level>=COACH_STAT_MAX_LEVEL)continue;
    stat.xp+=gained;
    let leveled=false;
    if(stat.level<COACH_STAT_MAX_LEVEL && stat.xp>=COACH_STAT_XP_THRESHOLDS[stat.level]){
      stat.level++;
      stat.xp=0; // プロ輩出実績でもレベルアップ時は余剰XPを持ち越さない。
      leveled=true;
    }
    if(logs&&leveled)logs.push(`プロ輩出の実績で、監督の${def.label}が Lv${stat.level} に上がりました。`);
  }
}
// v174: プロ入りは content-national.js（有料版）で登録する。全国大会の成績が前提。
function processProEntryForRetirees(retirees,logs){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.processProEntryForRetirees)||null;
  return fn?fn(retirees,logs):[];
}

// v97: 大会結果に応じたライバル関連の進行。
//  - 全国決勝に進出したら東峰の二人が3年生（最終段階）になる
//  - 全国決勝に勝ったら、翌月に全国王者の覚醒イベントを予約する（有料版）
//  - 地区決勝で東峰女学院に勝ったら、段階を1つ進めて短いイベントを出す
function scheduleKoutokuAwakening(){
  if(state.koutokuAwakened)return;
  if(state.koutokuAwakeningPending)return;
  const mi=(typeof state.monthIndex==='number')?state.monthIndex:0;
  // 翌月。3月(index 11)で負けることは無いが、念のため年度をまたぐ場合も扱う。
  const nextMonth=(mi+1)%12;
  const nextYear=(mi+1)>=12?(state.year||1)+1:(state.year||1);
  state.koutokuAwakeningPending={year:nextYear,monthIndex:nextMonth};
}
const TOHO_RIVAL_DEFEAT_EVENTS={
  // 段階1：試合直後。悔しさだけが残っている。茜は拳を握ったまま動かず、蒼は表情を変えない。
  1:{
    title:'東峰女学院・はじめての敗北',
    imageKey:'toho_rival_stage1',
    lines:[
      'コートに、東峰の二人がまだ残っていた。',
      '「東堂。次、いつ当たる」',
      '「一年後」',
      '「……長いな」',
      '茜は拳を握ったまま、それだけ言った。',
      '蒼は表情を変えずに、消えていく{{略称}}の背中を目で追っていた。'
    ]
  },
};
// v195: 東峰女学院との「初対戦」に負けたときだけ出す挑発イベント（Tak指示）。
//        既存の TOHO_RIVAL_DEFEAT_EVENTS は「若葉が東峰に勝ったあと、東峰側の悔しさを描く」もので、
//        こちらはその逆。置き換えずに別イベントとして持つ。
//        体験版にも出す。皇徳は学校名だけを出し、選手・能力・覚醒イベント等の全国限定データは
//        従来どおり content-national.js 側に残す。
const TOHO_FIRST_LOSS_TAUNT={
  title:'東峰女学院・はじめての壁',
  imageKey:'toho_first_loss',
  lines:[
    '東堂 蒼「……こんな程度なんだね。」',
    '西城 茜「蒼、もう行くよ。」',
    '東堂 蒼「私たちは、その先で勝つためにやってる。あなたたちと違って、本気で全国一を狙ってるから。」',
    '西城 茜「次に当たるなら、もっと強くなってきて。」',
    '東堂 蒼「皇徳に勝つのは、私たちだから。」',
    'その言葉が、何度も頭の中で繰り返される。<br>――次は、私たちが絶対に勝つ。'
  ]
};
// v174: 段階2以降の敗北イベントは content-national.js（有料版）で登録する。
if(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.tohoRivalDefeatEvents)Object.assign(TOHO_RIVAL_DEFEAT_EVENTS,GVB_NATIONAL.tohoRivalDefeatEvents);
// v174: イベントの発生段階は、東峰の能力の強化段階（tohoRivalStage）とは別に判定する（Tak指示）。
// 段階2の条件を「全国1回戦突破」から「全国ベスト4を突破（＝決勝進出）」へ引き上げた。
// tohoRivalStage は従来どおり全国1回戦突破で2段階目に上がる。そちらは相手の強さの話なので変えない。
function tohoRivalEventStage(){
  if(state.lastNationalChampionYear)return 3;
  if(state.nationalFinalReachedYear)return 2;
  return 1;
}
// v141: 東堂 蒼・西城 茜の学年は「イベントが発生した回数」で決まる。
// 能力の強化段階（tohoRivalStage＝若葉の全国での戦績）とは別に数える。
function tohoRivalGrade(){
  return clamp(1+(state.tohoRivalEventCount||0),1,3);
}
function showTohoRivalDefeatEvent(stage){
  const ev=TOHO_RIVAL_DEFEAT_EVENTS[stage];
  if(!ev)return;
  if(!state.tohoRivalEventShown||typeof state.tohoRivalEventShown!=='object')state.tohoRivalEventShown={};
  if(state.tohoRivalEventShown[stage])return;
  state.tohoRivalEventShown[stage]=true;
  // v141: イベントが実際に出たときだけ学年を1つ上げる
  const before=tohoRivalGrade();
  state.tohoRivalEventCount=(state.tohoRivalEventCount||0)+1;
  const after=tohoRivalGrade();
  if(after!==before && Array.isArray(state.trainingLog)){
    state.trainingLog.push(`東峰女学院の東堂 蒼と西城 茜が${after}年生になりました。`);
  }
  enqueueStoryEvent(ev.title, withSchoolName(ev.lines), ev.imageKey, 'event');
}
function handleRivalProgressAfterTournament(tour, win, oppName=''){
  if(!tour)return;
  const isNat=(tour.type==='interhigh_nat'||tour.type==='haruko_nat');
  const isPref=(tour.type==='interhigh_pref'||tour.type==='haruko_pref');
  // v195: 公式戦で東峰女学院とはじめて当たった試合の終了時に一度だけ判定する（Tak指示）。
  //        負けていれば挑発イベントを1回だけ表示。勝っていれば以後は二度と出さない。
  //        どちらの場合も「初対戦は済んだ」を永続保存するので、再戦で負けても再表示しない。
  if((isPref||isNat) && oppName==='東峰女学院' && !state.tohoFirstEncounterDone){
    state.tohoFirstEncounterDone=true;
    if(!win && !state.tohoFirstLossTauntSeen){
      enqueueStoryEvent(TOHO_FIRST_LOSS_TAUNT.title,TOHO_FIRST_LOSS_TAUNT.lines,TOHO_FIRST_LOSS_TAUNT.imageKey,'event');
    }
    // 出した場合も、初対戦で勝った場合も、以後この挑発イベントは出さない。
    state.tohoFirstLossTauntSeen=true;
  }
  // v111: 全国1回戦を突破した年を記録する（東峰の段階2の条件）
  if(isNat && win && tour.round===1 && !state.nationalFirstRoundWonYear){
    state.nationalFirstRoundWonYear=state.year;
    if(Array.isArray(state.trainingLog))state.trainingLog.push('全国大会1回戦突破。東峰女学院の東堂 蒼と西城 茜が一段強くなりました。');
  }
  // 全国決勝に進出（準決勝＝round2に勝利、または決勝＝round3を戦った時点）
  if(isNat && ((win&&tour.round===2)||tour.round===3) && !state.nationalFinalReachedYear){
    state.nationalFinalReachedYear=state.year;
    if(Array.isArray(state.trainingLog))state.trainingLog.push('全国大会決勝進出。東峰女学院の東堂 蒼と西城 茜がさらに力をつけました。');
  }
  // v98修正: 全国決勝で「勝った」翌月に全国王者の覚醒（有料版）。
  // v97では条件を取り違えて「敗れた翌月」にしていた。
  // 全国王者が決勝で敗れる＝若葉が全国優勝する、が正しい発生条件。
  if(isNat && tour.round===3 && win)scheduleKoutokuAwakening();
  // v196: 「最初の約束」の達成記録。約束の子が在籍している間（＝3年生で卒業する年まで）の記録で、
  //        卒業時の会話をここで分岐できるようにするためのもの。ゲームオーバー条件にはしない。
  // v213: 目標を「地区大会優勝」から「地区大会の決勝の舞台に立つ」へ変更（Tak指示）。
  //        決勝を戦った時点で達成とし、勝敗は問わない。
  if(isPref && tour.round===3 && state.promiseRookieId && (state.year||1)<=(state.promiseTargetYear||0)){
    if(!state.promiseFinalReached){
      state.promiseFinalReached=true;
      const pr=promiseRookie();
      if(pr && Array.isArray(state.trainingLog))state.trainingLog.push(`最初の約束を果たしました。${pr.name}と交わした「地区大会の決勝の舞台に立つ」を達成です。`);
      state.promisePendingReachEvent=true;
    }
  }
  if(isPref && tour.round===3 && win)state.promiseDistrictWon=true;
  // 地区決勝で東峰女学院に勝った → 段階を1つ進め、短いイベントを出す
  if(isPref && tour.round===3 && win && oppName==='東峰女学院'){
    const stage=tohoRivalEventStage(); // v174: 段階2は全国ベスト4突破（決勝進出）が条件
    state.tohoRivalDefeatCount=(state.tohoRivalDefeatCount||0)+1;
    showTohoRivalDefeatEvent(stage);
  }
}
// v104: 試合が終わったら、まず点数の結果を出す。
function enqueueMatchResultPopup(tour, opp, os, ps){
  const win=os>ps;
  const label=(tour&&tour.type==='practice')?practiceMatchKindLabel(opp):((tour&&tour.name)||'試合');
  const body=`<div class="match-result-score">
      <div class="mrs-team ${win?'is-win':''}"><span class="mrs-name">${ownSchoolName()}</span><strong class="mrs-num">${os}</strong></div>
      <div class="mrs-sep">-</div>
      <div class="mrs-team ${win?'':'is-win'}"><strong class="mrs-num">${ps}</strong><span class="mrs-name">${(opp&&opp.name)||'相手校'}</span></div>
    </div>
    <div class="match-result-verdict ${win?'win':'lose'}">${win?'勝利':'敗戦'}</div>
    <div class="hint">${label}</div>`;
  enqueueImportantPopup(win?'試合結果：勝利':'試合結果：敗戦', body, 'match', win?'match_win':'match_lose');
}
// v213: 「最初の約束・決勝の舞台」は、大会そのものの演出（地区大会優勝の物語など）を
//        積み終えたあとに出したい。ここでいったん包んで、中身を実行してから最後に流す。
function enqueueTournamentMilestonePopup(tour, win, os, ps, oppName=''){
  enqueueTournamentMilestonePopupInner(tour, win, os, ps, oppName);
  flushPromiseFinalReachedEvent();
}
function enqueueTournamentMilestonePopupInner(tour, win, os, ps, oppName=''){
  recordSeasonNationalResult(tour,win);
  handleRivalProgressAfterTournament(tour,win,oppName);
  if(!tour||!win)return;
  if(tour.round===1){
    return;
  }
  if((tour.type==='interhigh_pref'||tour.type==='haruko_pref')&&tour.round===3){
    // v102: 地区優勝の物語演出は初回だけ。2回目以降は短い通知にする。
    if(!state.districtChampionStoryShown){
      state.districtChampionStoryShown=true;
      enqueueStoryEvent('地区大会初優勝',[
        `最後の一本が床に落ちた。<br>${os}-${ps}。`,
        '一瞬の間があって、笛が鳴った。<br>コートの真ん中に、部員が駆け寄っていく。',
        'この学校が、初めて県の頂点に立った。',
        `<strong>${ownSchoolName()}、${tour.name}優勝。</strong><br>全国への切符を掴んだ。`
      ],'district_champion','event');
      maybeEnqueueDemoEnding(tour); // v174: 体験版は全国出場が決まった時点で終了
      return;
    }
    const body=`<div class="growth-manager">${managerLine('地区大会優勝です！')}</div><div class="growth-item">${ownSchoolName()}が ${os}-${ps} で勝利し、地区大会を制しました。</div><div class="hint">${tour.name}</div>`;
    enqueueImportantPopup('地区大会優勝', body, 'event', 'district_champion');
    maybeEnqueueDemoEnding(tour); // v174
    return;
  }
  if((tour.type==='interhigh_nat'||tour.type==='haruko_nat')&&tour.round===3){
    // v174: 全国優勝の物語は content-national.js（有料版）で登録する。
    const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.nationalChampionStory)||null;
    if(fn)fn(tour,os,ps);
    return;
  }
}


function validTrainingKeys(menu){
  if(menu?.effects)return Object.keys(menu.effects).filter(k=>COMP_KEYS.includes(k));
  return (menu?.keys||[]).filter(k=>COMP_KEYS.includes(k));
}
function trainingMenuHasInvalidKeys(){
  return trainingMenus.flatMap(m=>{
    const keys=m.effects?Object.keys(m.effects):(m.keys||[]);
    return keys.filter(k=>!COMP_KEYS.includes(k)).map(k=>`${m.id}:${k}`);
  });
}
function regularTrainingMenuById(id){
  return regularTrainingMenus.find(x=>x.id===id)||regularTrainingMenus[0];
}
function individualTrainingMenuById(id){
  const menus=coachIndividualTrainingMenus();
  return menus.find(x=>x.id===id)||menus.find(x=>x.id==='spikePower')||menus[0];
}

function trainingSelectHtml(value){
  const safe=regularTrainingMenus.some(m=>m.id===value)?value:'omakase';
  return `<select class="player-training-select">${regularTrainingMenus.map(m=>`<option value="${m.id}" class="menu-cat-${m.cat||'team'}" ${m.id===safe?'selected':''}>${m.name}</option>`).join('')}</select>`;
}
function trainingMenuEffectText(menu){
  const keys=validTrainingKeys(menu);
  if(!keys.length)return '';
  return keys.map(k=>`${compLabel(k)}${menu.effects?`+${menu.effects[k]}`:''}`).join(' / ');
}


function positionSummaryBoxes(summary){
  const map={};
  String(summary||'').split('/').forEach(part=>{
    const m=part.trim().match(/^([A-Z]+):(\d+)/);
    if(m)map[m[1]]=Number(m[2]);
  });
  return `<div class="position-grid scout-position-grid">${POSITIONS.map(pos=>{
    const v=map[pos]||1, cls=rankClassFromValue(v);
    return `<div class="position-box ${cls}"><div class="position-top"><span>${pos}</span><strong>${v}</strong></div><div class="subline"><span class="rank-chip ${cls}">${ratingLetter(v)}</span></div></div>`;
  }).join('')}</div>`;
}


function playerDetailHtml(p){
  const s=deriveStats(p);
  const pos=POSITIONS.map(x=>({pos:x,score25:calcPositionScore25(p,x)}));
  const yearLabel=p.year?`${p.year}年`:'入部予定';
  const agdText=p.special?.includes('絶対守護領域')
    ? `<div class="hint top-gap">${specialChipHtml('絶対守護領域')} 取得済み</div>`
    : '';
  return `<div class="detail-head"><img src="${p.portrait||'assets/new_shino.png'}"><div><h3 class="detail-name">${p.name}</h3><div class="detail-meta">${yearLabel} / ${p.height}cm${isPlayerAbsent(p)?` / <span class="absent-badge">${absentReasonText(p)}</span>`:''}</div><div class="personality-row">${personalityChipHtml(p)}</div><div class="mood-badge-row">${moodBadgeHtml(p.mood||0)}</div><div class="special-list">${(p.special||[]).map(s=>specialChipHtml(s)).join('')}</div>${agdText}</div></div><div class="detail-section"><h2>① 基本パラメータ</h2><div class="stat-grid">${statBox('スパイク',s.spike)}${statBox('レシーブ',s.receive)}${statBox('ブロック',s.block)}${statBox('サーブ',s.serve)}${statBox('トス',s.toss)}${statBox('ジャンプ',s.jump)}${statBox('身長',heightPoint(p.height))}${statBox('メンタル',s.mental)}</div></div><div class="detail-section"><h2>② ポジション完成度</h2><div class="position-grid">${pos.map(o=>`<div class="position-box ${positionRankClass(o.score25,o.pos)}"><div class="position-top"><span>${o.pos}</span><strong>${formatPositionScore(o.score25)}</strong></div><div class="subline"><span class="rank-chip ${positionRankClass(o.score25,o.pos)}">${positionRatingLetter(o.score25,o.pos)}</span></div></div>`).join('')}</div></div><div class="detail-section"><h2>③ 各項目の成分データ</h2><div class="component-grid">${compBox(p,'スパイク',[['spikePower','決定力'],['spikeControl','コース打ち']])}${compBox(p,'レシーブ',[['recReception','レセプション'],['recDig','ディグ'],['recRange','守備範囲']])}${compBox(p,'ブロック',[['blockRead','リード'],['blockStuff','シャット力']])}${compBox(p,'サーブ',[['servePower','威力'],['serveControl','コントロール']])}${compBox(p,'トス',[['tossAccuracy','正確性'],['tossRead','読み']])}</div></div>`;
}
function showScoutedDetail(i){
  const s=(state.scoutedPlayers||[])[i];
  if(!s){managerSay('選手詳細を確認できませんでした。');return;}
  const p=s.detail||s;
  if(!p.comps){managerSay('このスカウト選手は古い保存データのため、詳細能力が保存されていません。もう一度スカウトすると詳細を確認できます。');return;}
  const modal=document.getElementById('scoutDetailModal');
  const content=document.getElementById('scoutDetailContent');
  if(content)content.innerHTML=playerDetailHtml({...p,year:1,mood:p.mood||0});
  if(modal){modal.classList.remove('hidden');modal.style.display='flex';}
}
function closeScoutDetailModal(){
  const m=document.getElementById('scoutDetailModal');
  if(m){m.classList.add('hidden');m.style.display='';}
}


function scoutRumorListHtml(){
  const rumors=eventScoutRumorList();
  if(!rumors.length)return '現在、スカウトの噂はありません。';
  // v183: 噂のカードを押すと、スカウトの地域とポジションがその噂どおりに切り替わる（Tak指示）。
  //        噂を見てから自分で2つのプルダウンを合わせ直す手間を無くす。
  return rumors.map((r,i)=>{
    const on=(state.scoutRegion===r.region && state.scoutPosition===r.pos);
    return `<div class="scout-rumor-card scout-rumor-card-emphasis is-openable${on?' scout-rumor-card-active':''}" role="button" tabindex="0" data-rumor-region="${escapeAttrText(r.region)}" data-rumor-pos="${escapeAttrText(r.pos)}" title="押すと地域とポジションをこの噂に合わせます">
    <div class="scout-rumor-head"><strong>噂${i+1}</strong><span class="scout-rumor-arrow">${on?'設定中':'狙い目'}</span></div>
    <div class="scout-rumor-target">
      <span class="scout-rumor-region">${r.region}</span>
      <span class="scout-rumor-plus">×</span>
      <span class="scout-rumor-position">${r.pos}</span>
    </div>
    <div class="scout-rumor-label">${r.label}</div>
    <div class="hint">${on?'この条件に設定済みです。':'押すと、この地域・ポジションに設定します。'}</div>
  </div>`;}).join('');
}
// v183: 噂カードから地域・ポジションを一括で設定する。
//        監督タブのプルダウン、スカウトマップの地図と職種、どこから押しても同じ結果になるようにする。
function applyScoutRumorSelection(region,pos){
  if(!region||!pos)return false;
  state.scoutRegion=region;
  state.scoutPosition=pos;
  const rs=document.getElementById('scoutRegionSelect'); if(rs)rs.value=region;
  const ps=document.getElementById('scoutPositionSelect'); if(ps)ps.value=pos;
  const mp=document.getElementById('scoutMapPositionSelect'); if(mp)mp.value=pos;
  document.querySelectorAll('.region-shape').forEach(btn=>btn.classList.toggle('selected',btn.dataset.region===region));
  try{ updateScoutMapComment(); }catch(e){}
  managerSay(`スカウト先を「${region}」の「${pos}」に合わせました。${scoutRegionTraitText(region)}`);
  renderCoachPanel();
  renderScoutRumorList();
  saveState();
  return true;
}
if(typeof window!=='undefined')window.applyScoutRumorSelection=applyScoutRumorSelection;
function renderScoutRumorList(){
  const rumors=eventScoutRumorList();
  ['scoutRumorList','coachScoutRumorList','scoutMapRumorList'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    if(!rumors.length)el.classList.add('muted'); else el.classList.remove('muted');
    el.innerHTML=scoutRumorListHtml();
  });
}
function renderScoutedList(){
  const list=state.scoutedPlayers||[];
  const html = list.length ? list.map((s,i)=>`<div class="scouted-card scout-tab-card"><img src="${s.portrait||'assets/new_shino.png'}"><div><div><strong>${s.name}</strong> <span class="mini-tag">${s.result}</span>${s.rumor?'<span class="mini-tag rumor-tag">噂</span>':''}</div><div class="meta">${s.height||'?'}cm / ${s.year}年度加入予定</div>${positionSummaryBoxes(s.summary)}<div class="action-row top-gap"><button class="ghost small" type="button" onclick="showScoutedDetail(${i})">詳細を見る</button></div></div></div>`).join('') : 'まだスカウト済み選手はいません。';
  const dashHtml = list.length ? list.slice(0,3).map(s=>`<div class="scouted-mini"><img src="${s.portrait||'assets/new_shino.png'}"><span>${s.name}</span><span class="mini-tag">${s.result}</span></div>`).join('') : 'まだスカウト済み選手はいません。';
  const dash=document.getElementById('scoutedList');
  if(dash){dash.innerHTML=dashHtml;if(list.length)dash.classList.remove('muted');}
  const tab=document.getElementById('scoutedTabList');
  if(tab){tab.innerHTML=html;if(list.length)tab.classList.remove('muted');}
}

// v183: 「メモ」タブの削除で、あとから顔グラを変えるUIが無くなったため changeManagerPortrait を削除した（Tak指示）。
//        導入時のマネージャー選択（openIntroNarration 以降）は従来どおり。
// v95: 殿堂タブ。歴代ベスト14とプロ入り選手を表示する。
const HALL_ROLE_ORDER=['OH','MB','OP','S','L'];
// v149: 歴代OGドリームチームは、スタメン7人・控え7人を同じ並びで並べる。
// 歴代ベスト14の枠（OH4/MB4/OP2/S2/L2）がちょうどこの並びの2組ぶんになる。
// v150: 並びはスタメンのコート配置（0:OH 1:MB 2:OP 3:S 4:MB 5:OH）＋リベロに合わせる。
const HALL_LINEUP_SLOTS=['OH','MB','OP','S','MB','OH','L'];
function hallDreamTeamRows(){
  const pools={};
  HALL_ROLE_ORDER.forEach(r=>{pools[r]=historicalOgByRole(r).slice();});
  const cursor={OH:0,MB:0,OP:0,S:0,L:0};
  const pick=()=>HALL_LINEUP_SLOTS.map(role=>{
    const player=pools[role][cursor[role]]||null;
    cursor[role]++;
    return {role,player};
  });
  const starters=pick();
  const reserves=pick();
  return {starters,reserves};
}
function hallEmptySlotHtml(role){
  return '<div class="hall-card is-empty">'
    +'<div class="hall-slot-badge">'+role+'</div>'
    +'<div class="hall-empty-body">まだ該当する卒業生がいません</div>'
    +'</div>';
}
function hallOgCardHtml(x, slotRole){
  const st=deriveStats(x);
  const items=[['Sp',st.spike],['Bl',st.block],['J',st.jump],['Ht',heightPoint(x.height)],
               ['Re',st.receive],['To',st.toss],['Sv',st.serve]];
  const sp=(x.special||[]).filter(v=>!/^スカウト|^通常入部|^プロ入り|^OG妹|^U-18|^協会紹介/.test(v));
  const score=Number(x.positionScore||calcPositionScore25(x,x.role)||0);
  return '<div class="hall-card">'
    +'<div class="hall-slot-badge">'+(slotRole||x.role)+'</div>'
    +'<img class="hall-face" src="'+(x.portrait||'assets/new_shino.png')+'" alt="">'
    +'<div class="hall-body">'
    +'<div class="hall-name-row"><strong>'+x.name+'</strong>'

    +'<span class="hall-grade '+positionRankClass(score,x.role)+'">'+positionRatingLetter(score,x.role)+'</span></div>'
    +'<div class="hall-meta">'+(x.graduationYear||x.year||'?')+'年度卒 / '+(x.height||'?')+'cm / '+handLabel(x)+'</div>'
    +'<div class="player-mini-abilities">'+items.map(function(it){return '<span>'+it[0]+' '+coloredValue(it[1])+'</span>';}).join('')+'</div>'
    +(sp.length?'<div class="hall-specials">'+sp.map(function(v){return specialChipHtml(v);}).join('')+'</div>':'')
    +'</div></div>';
}
function renderHallPanel(){
  const og=document.getElementById('hallOgList');
  if(og){
    // v149: OH/OH/MB/MB/OP/S/L の並びで、スタメン7人と控え7人を並べる。
    const {starters,reserves}=hallDreamTeamRows();
    const total=starters.concat(reserves).filter(x=>x.player).length;
    if(!total){
      og.innerHTML='<p class="muted">まだ卒業生がいません。3年生が引退すると、ここに歴代OGドリームチームが並びます。</p>';
    }else{
      const group=(label,rows,cls)=>'<div class="hall-lineup-group '+cls+'">'
        +'<div class="hall-lineup-label">'+label+'</div>'
        +'<div class="hall-lineup-grid">'
        +rows.map(x=>x.player?hallOgCardHtml(x.player,x.role):hallEmptySlotHtml(x.role)).join('')
        +'</div></div>';
      og.innerHTML=group('スタメン',starters,'is-starters')+group('控え',reserves,'is-reserves');
    }
  }
  const pro=document.getElementById('hallProList');
  if(pro){
    const rows=(state.proEntryHistory||[]).slice().sort(function(a,b){return (b.year||0)-(a.year||0);});
    const stageLabel={best4:'全国ベスト4',final:'全国決勝',champion:'全国優勝'};
    pro.innerHTML=rows.length?rows.map(function(r){
      // v209: まず本人の顔グラ（プロ入り時に控えたもの）を使い、無ければ歴代ベスト14から探す。
      const snap=(state.retiredPlayerSnapshots||[]).find(function(x){return String(x.id)===String(r.id);});
      const face=r.portrait||(snap&&snap.portrait)||'assets/new_shino.png';
      return '<div class="hall-pro-row">'
        +'<img class="hall-pro-face" src="'+face+'" alt="">'
        +'<div><strong>'+r.name+'</strong><span class="hall-pos">'+r.role+'</span>'
        +'<div class="hall-meta">'+(r.year||'?')+'年度卒 / ポジション評価 '
        +'<strong class="'+positionRankClass(r.score||0,r.role)+'">'+positionRatingLetter(r.score||0,r.role)+'</strong>'
        +' / '+(stageLabel[r.stage]||r.stage||'')+'</div></div>'
        +'<span class="hall-pro-badge">プロ入り</span></div>';
    }).join(''):'<p class="muted">まだプロ入りした選手はいません。全国大会で上位に進んだ3年生から選ばれます。</p>';
  }
}
// v183: 「メモ」タブは丸ごと削除した（Tak指示）。
//        ここにあったイベント省略モードのON/OFFとマネージャー顔グラ変更も一緒に無くなる。
//        state.eventSkipMode は切り替え口が無くなるため、ensureData で false に戻す。
function isInitialAprilNoCoachMonth(){return !!state.initialAprilNoEvents && state.year===1 && state.monthIndex===0;}
// v140: 月替わりモーダルの上に出す月ごとのイラスト。MONTHS の index 0 が 4月。
const MONTH_HEADER_IMAGES=['assets/months/m04.png','assets/months/m05.png','assets/months/m06.png',
  'assets/months/m07.png','assets/months/m08.png','assets/months/m09.png','assets/months/m10.png',
  'assets/months/m11.png','assets/months/m12.png','assets/months/m01.png','assets/months/m02.png',
  'assets/months/m03.png'];
function monthHeaderImage(monthIndex=state?.monthIndex){
  return MONTH_HEADER_IMAGES[((monthIndex||0)%12+12)%12]||'';
}
// v140: 毎月出すとうるさいので、次の2種類だけに絞って出す。
//  ① 大会の前月：来月に大会があること
//  ② 春高（1月の全国／地区敗退なら1月の合宿）が終わった直後の2月：来年に向けたスカウトの促し
function monthTransitionNoticeHtml(){
  const m=state?.monthIndex;
  // ① 大会の前月
  if(m===2)return '<div class="month-transition-notice tournament">来月の<strong>7月</strong>は<strong>インターハイ地区大会</strong>です。今月が最後の仕上げになります。</div>';
  if(m===6)return '<div class="month-transition-notice tournament">来月の<strong>11月</strong>は<strong>春高地区大会</strong>です。今月が最後の仕上げになります。</div>';
  if(m===3&&state.qualifiedInterhigh)return '<div class="month-transition-notice tournament">来月の<strong>8月</strong>は<strong>インターハイ全国大会</strong>です。</div>';
  if(m===8&&state.qualifiedHaruko)return '<div class="month-transition-notice tournament">来月の<strong>1月</strong>は<strong>春高全国大会</strong>です。集大成の舞台になります。</div>';
  // ② 春高が終わった次の月（2月）
  if(m===10)return '<div class="month-transition-notice scout">春高が終わりました。来年に向けて、<strong>新入生のスカウト</strong>を進めておきましょう。入部は4月なので、動けるのは今月と3月です。</div>';
  return '';
}
// v161: 育成組への重点練習指示。月ごと固定で、翌月の育成組全員に同じ能力へ +5XP/週。
// v163: 1軍（登録14名）と2軍（育成組）に、月ごとの練習方針を設定できるようにする。
// 「通常通り」＝これまでどおり。「試合前調整」＝翌月第1週に元気度100で入れるよう、
// 月末に必要なぶんだけ休養を入れる（選手ごとに必要な週数が変わる）。
// v172: 選択肢は「試合前調整」と「しっかり練習」の2通り（Tak指示）。
// 「試合前調整」が休養を入れるのは翌月に大会がある月だけ。大会がない月は調整しない。
const SQUAD_TRAINING_PLANS={
  normal:{label:'しっかり練習', hint:'調整は行わず、練習を続けます。'},
  taper: {label:'試合前調整', hint:'翌月に大会がある月だけ、第1週を元気度100で迎えられるよう月末に休養を入れます。大会のない月は調整せずに練習します。'}
};
// 翌月に大会があるか。判定は月替わりモーダルのお知らせ（monthTransitionNoticeHtml）と同じ条件にそろえる。
function nextMonthHasTournament(){
  const m=state?.monthIndex;
  if(m===2)return true;                           // 来月7月＝インターハイ地区大会
  if(m===6)return true;                           // 来月11月＝春高地区大会
  if(m===3&&state.qualifiedInterhigh)return true; // 来月8月＝インターハイ全国大会
  if(m===8&&state.qualifiedHaruko)return true;    // 来月1月＝春高全国大会
  return false;
}
function normalizeSquadPlan(v){ return SQUAD_TRAINING_PLANS[v]?v:'normal'; }
function squadPlanOf(p){
  const key=isDevelopmentSquad(p)?'devSquadPlan':'firstSquadPlan';
  return normalizeSquadPlan(state[key]);
}
// 試合前調整：残り週で溜まる疲労より現在の疲労が多いなら、その週は休む。
// 休息1回で60回復、練習1回で trainingFatigueFor ぶん増える。
// 「最終週の終わりに疲労0」にするため、後ろから逆算して必要な休養週数を出す。
function taperRestWeeksNeeded(p,lv){
  const gain=trainingFatigueFor(p,lv);
  const remaining=Math.max(0,4-(state.turnIndex||0)); // 今週を含む残り週数
  // 「最後のr週を休養に充てたら月末に疲労0になるか」を r=0 から順に試し、
  // 最小の r を返す。自動休息（疲労60以上）も込みで前向きに1週ずつ回す。
  for(let r=0;r<=remaining;r++){
    let f=fatigueOf(p);
    for(let i=0;i<remaining;i++){
      const isRest=(i>=remaining-r);
      if(f>=FATIGUE_REST_THRESHOLD||isRest)f=Math.max(0,f-FATIGUE_REST_RECOVER);
      else f=Math.min(FATIGUE_MAX,f+gain);
    }
    if(f<=0)return r;
  }
  return remaining;
}
// この週に休むべきか。必要な休養週数が残り週数に達したら、そこから休ませる。
function shouldTaperRestThisWeek(p,lv){
  if(squadPlanOf(p)!=='taper')return false;
  if(!nextMonthHasTournament())return false; // v172: 大会のない月は調整しない
  const remaining=Math.max(0,4-(state.turnIndex||0));
  if(remaining<=0)return false;
  return taperRestWeeksNeeded(p,lv)>=remaining;
}
function devSquadTrainingOptions(){
  return individualTrainingMenus.filter(m=>m.type==='single'||m.type==='jump');
}
function currentDevSquadMonthKey(){ return `${state.year}-${state.monthIndex}`; }
function squadPlanSelectHtml(id,cur){
  return `<select id="${id}" class="sub-select">${Object.entries(SQUAD_TRAINING_PLANS)
    .map(([k,v])=>`<option value="${k}"${k===normalizeSquadPlan(cur)?' selected':''}>${v.label}</option>`).join('')}</select>`;
}
function devSquadPanelHtml(){
  const dev=developmentSquadPlayers();
  const reg=(state.players||[]).length-dev.length;
  const opts=devSquadTrainingOptions();
  const cur=state.devSquadTrainingKey||'';
  const sel=['<option value="">重点練習なし</option>']
    .concat(opts.map(m=>`<option value="${m.keys?m.keys[0]:m.id}"${(m.keys?m.keys[0]:m.id)===cur?' selected':''}>${m.name.replace('個人指導：','')}</option>`)).join('');
  const p1=normalizeSquadPlan(state.firstSquadPlan), p2=normalizeSquadPlan(state.devSquadPlan);
  return `<div class="dev-squad-panel">
    <div class="dev-squad-head"><strong>今月の練習方針${helpButtonHtml('squadPlan')}</strong></div>
    <div class="squad-plan-grid">
      <div class="squad-plan-col">
        <div class="squad-plan-label">1軍 <span class="mini-tag">${reg}名</span></div>
        ${squadPlanSelectHtml('firstSquadPlanSelect',p1)}
      </div>
      <div class="squad-plan-col">
        <div class="squad-plan-label">2軍（育成組） <span class="mini-tag">${dev.length}名</span></div>
        ${squadPlanSelectHtml('devSquadPlanSelect',p2)}
      </div>
    </div>
    <div class="dev-squad-head top-gap"><strong>育成組の重点練習${helpButtonHtml('devSquad')}</strong></div>
    <select id="devSquadTrainingSelect" class="sub-select">${sel}</select>
  </div>`;
}
function setSquadPlan(which,v){
  const key=which==='dev'?'devSquadPlan':'firstSquadPlan';
  state[key]=normalizeSquadPlan(v);
  const label=SQUAD_TRAINING_PLANS[state[key]].label;
  managerSay(`${which==='dev'?'2軍':'1軍'}は今月「${label}」でいきます。`);
  saveState();
}
if(typeof window!=='undefined')window.setSquadPlan=setSquadPlan;
function setDevSquadTraining(key){
  state.devSquadTrainingKey=COMP_KEYS.includes(key)?key:'';
  state.devSquadTrainingMonth=currentDevSquadMonthKey();
  managerSay(state.devSquadTrainingKey?`育成組は今月「${compLabel(state.devSquadTrainingKey)}」を重点的に伸ばします。`:'育成組の重点練習を外しました。');
  saveState();
}
if(typeof window!=='undefined')window.setDevSquadTraining=setDevSquadTraining;
function monthTransitionLocked(){
  return !!state?.monthTransitionModalOpen;
}
function currentMonthTransitionReport(){
  const pending=state?.monthTransitionPending;
  const rep=state?.lastMonthlyReport;
  if(!pending||!rep)return null;
  return !pending.reportKey || rep.key===pending.reportKey ? rep : null;
}
function monthTransitionCoachSummaryText(){
  if(!hasCoachActionDecision())return '今月の監督行動はまだ決まっていません。';
  const action=state.coachAction||'individual';
  if(action==='scout')return `監督行動：スカウト（${state.scoutRegion||'関東'} / ${state.scoutPosition||'OH'}）`;
  if(action==='individual')return `監督行動：個別練習（${individualTrainingSummaryText()}）`;
  if(action==='director'){
    const p=currentDirectorPlace();
    return `監督行動：監督活動${p?`（${p.label}）`:''}`;
  }
  return `監督行動：${coachActionLabel(action)}`;
}
function updateMonthTransitionModal(){
  const title=document.getElementById('monthTransitionTitle');
  const msg=document.getElementById('monthTransitionMessage');
  const growthLabel=document.getElementById('monthTransitionGrowthLabel');
  const coachSummary=document.getElementById('monthTransitionCoachSummary');
  const rep=currentMonthTransitionReport();
  if(title)title.textContent=`${MONTHS[state.monthIndex]}になりました`;
  // v172: 「N年目 M月 月間レポートを確認して、今月の方針を決めましょう。」の一文は不要（Tak指示）。
  if(msg){msg.textContent='';msg.classList.add('hidden');}
  // v140: 月ごとのイラストと、条件つきのお知らせ
  const hero=document.getElementById('monthTransitionImage');
  if(hero){const src=monthHeaderImage();if(src){hero.src=src;hero.alt=`${MONTHS[state.monthIndex]}`;hero.classList.remove('hidden');}else hero.classList.add('hidden');}
  const notice=document.getElementById('monthTransitionNotice');
  if(notice){const h=monthTransitionNoticeHtml();notice.innerHTML=h;notice.classList.toggle('hidden',!h);}
  // v161: 育成組への重点練習指示
  const dev=document.getElementById('monthTransitionDevSquad');
  if(dev){
    dev.innerHTML=devSquadPanelHtml();
    const sel=document.getElementById('devSquadTrainingSelect');
    if(sel)sel.onchange=()=>{setDevSquadTraining(sel.value);updateMonthTransitionModal();};
    const s1=document.getElementById('firstSquadPlanSelect');
    if(s1)s1.onchange=()=>{setSquadPlan('first',s1.value);updateMonthTransitionModal();};
    const s2=document.getElementById('devSquadPlanSelect');
    if(s2)s2.onchange=()=>{setSquadPlan('dev',s2.value);updateMonthTransitionModal();};
  }
  if(growthLabel)growthLabel.textContent=rep?`${MONTHS[(state.monthIndex+11)%12]}の成長を確認`:'成長報告を確認';
  if(coachSummary)coachSummary.textContent=monthTransitionCoachSummaryText();
}
function showMonthTransitionModal(){
  // v174: 体験版クリア後は月初確認を出さない。終了画面だけを見せる。
  if(demoEndingActive())return false;
  const pending=state?.monthTransitionPending;
  const modal=document.getElementById('monthTransitionModal');
  if(!pending||pending.key!==actionPromptKey()||!modal)return false;
  if(popupOpen||popupQueue.length)return false;
  if(document.getElementById('titleScreen')&&!document.getElementById('titleScreen').classList.contains('hidden'))return false;
  state.monthTransitionModalOpen=true;
  updateMonthTransitionModal();
  modal.classList.remove('hidden');
  modal.style.display='flex';
  saveState();
  return true;
}
function closeMonthTransitionModal(){
  const m=document.getElementById('monthTransitionModal');
  if(m){m.classList.add('hidden');m.style.display='';}
  state.monthTransitionModalOpen=false;
  state.monthTransitionPending=null;
  managerSay(`${MONTHS[state.monthIndex]}もよろしくお願いします、監督。`);
  // v188: 月初確認を閉じたときも、試合画面から離れる判定をやり直す（Tak指示）。
  try{tryLeaveMatchTab();}catch(e){}
  saveState();
}
function openMonthGrowthReportModal(){
  const m=document.getElementById('monthGrowthReportModal');
  const c=document.getElementById('monthGrowthReportContent');
  const t=document.getElementById('monthGrowthReportTitle');
  const rep=currentMonthTransitionReport();
  if(!m||!c)return;
  if(t)t.textContent=rep?`${rep.title.replace('月間レポート','')} 成長報告`:'成長報告';
  const rows=rep?.growthRows||[];
  c.innerHTML=monthlyGrowthPlayerCardsHtml(rows);
  m.classList.remove('hidden');
  m.style.display='flex';
}
function closeMonthGrowthReportModal(){
  const m=document.getElementById('monthGrowthReportModal');
  if(m){m.classList.add('hidden');m.style.display='';}
}
function maybeAutoSwitchCoachScreen(){
  if(state.turnIndex!==0)return;
  // v94: ポップアップが残っている間は待つが、消えたら必ず出す（下の renderAll 側でも再試行する）
  if(popupOpen||popupQueue.length)return;
  if(document.getElementById('titleScreen')&&!document.getElementById('titleScreen').classList.contains('hidden'))return;
  if(state.monthTransitionPending?.key===actionPromptKey()){
    showMonthTransitionModal();
    return;
  }
}
// v181: 進行バーで伏せている枠を出してよいか。
// v201: 一度でも解禁されたら、以後はその年に起きない年でも名前を出したままにする（Tak指示）。
//        フラグは解禁が確定した瞬間に立てる：
//          u18TimelineRevealed … 全国優勝した時（recordSeasonNationalResult）
//          ogTimelineRevealed  … U-18日本代表に勝った時
//        その年に実際には開かれない場合は、名前は出したまま薄く表示する（下の dim 判定）。
function timelineSecretRevealed(key){
  if(key==='u18')return !!state.u18TimelineRevealed;
  if(key==='og')return !!state.ogTimelineRevealed;
  return true;
}
// v201: その年に実際に開催されるかどうか（薄表示の判定に使う）。
function timelineSecretHappensThisYear(key){
  if(key==='u18'){
    try{ return !!u18AnnualMatchAvailable(); }catch(e){ return false; }
  }
  if(key==='og'){
    // v203: OG戦はU-18初勝利年より「後の年度」にのみ開催される（v201の同年開催は撤回）。
    return state.ogMatchScheduledYear===state.year
        && !!state.u18DefeatedYear
        && state.year>state.u18DefeatedYear;
  }
  return true;
}
// v88: ステータスバー。今の年月・大会の進行位置・今月の行動が決まっているかを常時表示する。
function renderStatusBar(){
  const y=document.getElementById('sbYear'), m=document.getElementById('sbMonth'), w=document.getElementById('sbWeek');
  if(y)y.textContent=String(state.year);
  // v184: 月と週を別の要素に分け、月だけを大きく出す（Tak指示）。
  if(m)m.textContent=MONTHS[state.monthIndex]||'';
  if(w)w.textContent=['第1週','第2週','第3週','第4週'][state.turnIndex]||'';
  // v182: 学校の格は上帯に置く（旧・チップから独立させた）。
  const sc=document.getElementById('sbClass');
  if(sc)sc.textContent=state.schoolClass||'—';
  const tl=document.getElementById('sbTimeline');
  if(tl){
    // v181: U-18戦とOG戦は、一度も解禁されていないうちは「？？？」で伏せる（Tak指示）。
    //        どちらも全国大会の実績が前提なので、体験版では伏せたままになる。
    // v201: U-18戦は12月→2月に移動。一度解禁されたら以後は名前を出したままにする（Tak指示）。
    // v182: 上帯に収めるため月名は title に逃がし、帯には大会名だけを出す（Tak指示：極小で残す）。
    const plan=[
      [3,'7月','IH地区',null],
      [4,'8月','IH全国',null],
      [7,'11月','春高地区',null],
      [9,'1月','春高全国',null],
      [10,'2月','U-18戦','u18'],
      [11,'3月','OG戦','og']
    ];
    tl.innerHTML=plan.map(([mi,mm,label,secret])=>{
      const cls=state.monthIndex===mi?'now':(state.monthIndex>mi?'done':'');
      const revealed=!secret||timelineSecretRevealed(secret);
      const shown=revealed?label:'？？？';
      const dim=(mi===4&&!state.qualifiedInterhigh)||(mi===9&&!state.qualifiedHaruko)||(secret&&(!revealed||!timelineSecretHappensThisYear(secret)));
      return `<span class="sb-tp ${cls}${revealed?'':' sb-tp-secret'}" title="${mm} ${shown}" style="${dim&&cls!=='now'?'opacity:.45':''}">${shown}</span>`;
    }).join('');
  }
  // v182: 「今月の行動」チップは廃止し、未決定のときだけ「監督」タブに●を付ける（Tak指示）。
  const coachTab=document.querySelector('.tab-btn[data-tab="coach"]');
  if(coachTab){
    const undecided=!hasCoachActionDecision();
    coachTab.classList.toggle('tab-todo',undecided);
    coachTab.title=undecided?'今月の監督行動が未決定です':'';
  }
  // v182: 練習Lv・部員数はチーム画面へ移した。上帯に残すのは、消えると困る保存の警告だけ。
  const chips=document.getElementById('sbChips');
  if(chips){
    // v176: 自動保存が効かない環境では、一度きりの案内だけでなく常に見える形で警告を出す。
    chips.innerHTML=storageAvailable()?'':`<span class="sb-chip danger" role="button" tabindex="0" title="詳しい対処を見る" onclick="openStorageTroubleInfo()">⚠ 自動保存できません</span>`;
  }
}
// v182: 上帯から外した「今月の行動 / 学校の格 / 練習Lv / 部員数」を、チーム画面の上に出す。
function teamStatusChipsHtml(){
  const decided=hasCoachActionDecision();
  const label=decided?`✔ 今月の行動：${coachActionLabel(state.coachAction)}`:'今月の行動：未決定';
  const elv=effectiveTrainingLevel(state.equipmentLevel||0);
  return `<div class="team-status-chips">`
    +`<span class="sb-chip ${decided?'ok':'todo'}">${label}</span>`
    +`<span class="sb-chip">学校の格：${state.schoolClass||'—'}</span>`
    +`<span class="sb-chip">練習Lv ${elv}</span>`
    // v184: 部員数の表示は不要（Tak指示）
    +`</div>`;
}
// ============================================================
// v91: モーダルを「情報 / 選択 / 結果」の3型に統一する。
// 各モーダルのヘッダに種類バッジを差し込み、フッタのボタン配置を揃える。
// 中身の作りは既存のまま活かし、外枠だけを共通化している。
// ============================================================
const MODAL_KINDS={
  monthTransitionModal:'choice',
  monthGrowthReportModal:'info',
  growthModal:'info',          // 中身によって動的に変わる（showNextImportantPopup で上書き）
  introFlowModal:'info',
  monthlyActionModal:'choice',
  individualTrainingModal:'choice',
  directorVisitModal:'choice',
  scoutMapModal:'choice',
  scoutDetailModal:'info',
  aprilRecruitModal:'choice',
  advanceConfirmModal:'choice'
};
const MODAL_KIND_LABEL={info:'情報',choice:'選択',result:'結果'};
function setModalKind(modalId,kind){
  const modal=document.getElementById(modalId);
  if(!modal)return;
  // .modal-title-row があればそこへ。無ければ最初の h2 の直前へ差し込む。
  const row=modal.querySelector('.modal-title-row');
  let badge=modal.querySelector('.modal-kind');
  if(!badge){
    badge=document.createElement('span');
    badge.className='modal-kind';
    if(row)row.insertBefore(badge,row.firstChild);
    else{
      const h=modal.querySelector('h2');
      if(!h)return;
      h.parentNode.insertBefore(badge,h);
    }
  }
  badge.className=`modal-kind kind-${kind}`;
  badge.textContent=MODAL_KIND_LABEL[kind]||'';
}
function setModalStep(modalId,text){
  const modal=document.getElementById(modalId);
  if(!modal)return;
  const row=modal.querySelector('.modal-title-row');
  if(!row)return;
  let step=row.querySelector('.modal-step');
  if(!step){
    step=document.createElement('span');
    step.className='modal-step';
    row.appendChild(step);
  }
  step.textContent=text||'';
}
// タイトル行が無いモーダルには作ってから差し込む
function ensureModalTitleRow(modalId,title){
  const modal=document.getElementById(modalId);
  if(!modal)return null;
  const card=modal.querySelector('.modal-card');
  if(!card)return null;
  let row=card.querySelector('.modal-title-row');
  if(!row){
    row=document.createElement('div');
    row.className='modal-title-row';
    const h=document.createElement('h2');
    h.textContent=title||'';
    row.appendChild(h);
    card.insertBefore(row,card.firstChild);
  }
  return row;
}
function initModalKinds(){
  ensureModalTitleRow('introFlowModal','はじめに');
  for(const [id,kind] of Object.entries(MODAL_KINDS))setModalKind(id,kind);
}

// v90: 見出し横のヘルプボタンを配置する
function renderHelpButtons(){
  const map={helpStarters:'starters',helpTeamRadar:'teamRadar',helpScoutRegion:'scoutRegion',
             helpTactics:'tactics',helpCoachAction:'coachAction',helpHall:'hall',helpTraining:'training',helpSchoolClass:'schoolClass'};
  for(const [id,key] of Object.entries(map)){
    const el=document.getElementById(id);
    if(el&&!el.dataset.filled){el.innerHTML=helpButtonHtml(key);el.dataset.filled='1';}
  }
}
// v94: 月が替わったら月替わりモーダルを必ず出す（描画のたびに未表示なら再試行）
function ensureMonthTransitionModal(){
  if(state.turnIndex!==0)return;
  if(state.monthTransitionModalOpen)return;
  if(!state.monthTransitionPending||state.monthTransitionPending.key!==actionPromptKey())return;
  if(popupOpen||popupQueue.length)return;
  const t=document.getElementById('titleScreen');
  if(t&&!t.classList.contains('hidden'))return;
  showMonthTransitionModal();
}
function renderAll(){ensureData();flushPendingSpecialPopups();enforcePracticeMatchFocus();renderStatusBar();renderHelpButtons();initModalKinds();renderHeader();renderStarterGrid();renderTeamSummary();renderMonthlyReportPanel();renderRoster();renderPlayerDetail();renderTrainingControls();renderCoachPanel();renderLogs();renderHallPanel();renderScoutRumorList();renderScoutedList();renderMatchControls();renderMatchRadarPanel();updateManagerDockVisibility();showTitleScreenIfNeeded();maybeAutoSwitchCoachScreen();ensureMonthTransitionModal();maybeWarnStorageUnavailable();maybeShowDemoEndingOnRender();tryLeaveMatchTab();saveState();}
// v174: リロードや読込で戻ってきたときも、体験版クリア済みなら終了画面を出す。
function maybeShowDemoEndingOnRender(){
  if(!demoEndingActive())return;
  if(popupOpen||popupQueue.length)return;
  const t=document.getElementById('titleScreen');
  if(t&&!t.classList.contains('hidden'))return;
  demoEndingEnqueued=true;
  showDemoEndingScreen();
}

function currentOpponentName(){
  if(practiceMatchActive())return state.practiceMatch.opponent.name;
  return buildOpp(isTournamentTurn()).name;
}


function currentTournamentEliminated(tour){
  if(!tour)return false;
  if(tour.type==='interhigh_pref')return state.interhighPrefEliminated;
  if(tour.type==='interhigh_nat')return state.interhighNatEliminated;
  if(tour.type==='haruko_pref')return state.harukoPrefEliminated;
  if(tour.type==='haruko_nat')return state.harukoNatEliminated;
  return false;
}
function canPlayCurrentMatch(){
  if(practiceMatchActive())return true;
  const tour=isTournamentTurn();
  return !!tour && !currentTournamentEliminated(tour);
}
function markTournamentLoss(tour){
  if(!tour)return;
  if(tour.type==='interhigh_pref')state.interhighPrefEliminated=true;
  if(tour.type==='interhigh_nat')state.interhighNatEliminated=true;
  if(tour.type==='haruko_pref')state.harukoPrefEliminated=true;
  if(tour.type==='haruko_nat')state.harukoNatEliminated=true;
}


function renderPreMatchLineups(){
  const el=document.getElementById('preMatchLineups');
  if(!el)return;
  if(watchMatchSession && !watchMatchSession.done){
    el.innerHTML=matchLineupsHtml(watchMatchSession.own,watchMatchSession.opp);
    return;
  }
  const tour=practiceMatchActive()?{type:'practice',name:practiceMatchKindLabel(),round:0}:isTournamentTurn();
  if(tour && tour.type!=='practice' && currentTournamentEliminated(tour)){
    el.innerHTML=`<div class="match-lineups muted"><h3>大会敗退済み</h3><div class="hint">${tour.name}は敗退済みです。次の相手スタメンは表示しません。</div></div>`;
    return;
  }
  const opp=buildOpp(tour);
  const own=buildOwnTeam();
  el.innerHTML=matchLineupsHtml(own,opp);
}

function cleanManagerMessage(msg){
  const s=String(msg||'');
  if(s.includes('学校格「')||s.includes('スカウトの噂どおり')||s.includes('大成功能力上限'))return '監督、結果を確認しました。次の行動を選びましょう。';
  if(s.length>90 && s.includes('スカウト'))return 'スカウト結果を確認しました。';
  return s||'監督、今日もよろしくお願いします。';
}
function renderHeader(){// v182: 年目／月／週と学校の格は上帯（renderStatusBar）に一本化した。
//        古いid（seasonYear / seasonMonthLabel / seasonTurnLabel）はHTMLから消えているので、あれば書くだけにする。
const _sy=document.getElementById('seasonYear');if(_sy)_sy.textContent=state.year;const _sm=document.getElementById('seasonMonthLabel');if(_sm)_sm.textContent=MONTHS[state.monthIndex];const _st=document.getElementById('seasonTurnLabel');if(_st)_st.textContent=`${state.turnIndex+1}週目`;const sr=document.getElementById('schoolRank');if(sr)sr.textContent=state.schoolRank;const sc=document.getElementById('schoolClass');if(sc)sc.textContent=state.schoolClass;const monthResultEl=document.getElementById('monthResult');if(monthResultEl)monthResultEl.textContent=state.monthResult;const matchResultEl=document.getElementById('matchResultSummary');if(matchResultEl)matchResultEl.textContent=state.lastMatchSummary;const me=document.getElementById('managerMessage');if(me)me.innerHTML=managerInlineHtml(cleanManagerMessage(state.managerMessage),{icon:false});const ownEl=document.getElementById('ownTeamName');if(ownEl)ownEl.textContent=ownSchoolName();const oppName=currentOpponentName();const oppEl=document.getElementById('currentOppName');if(oppEl)oppEl.textContent=oppName;const oppTxt=document.getElementById('currentOppNameText');if(oppTxt)oppTxt.textContent=oppName;const btn=document.getElementById('simulateMatchBtn');const playable=canPlayCurrentMatch();if(btn){const watching=!!watchMatchSession&&!watchMatchSession.done;btn.disabled=watching?false:!playable;btn.textContent=playable||watching?'結果を見る':'試合不可';}const srSel=document.getElementById('matchStartRotationOffsetSelect');if(srSel)srSel.value=String(state.startRotationOffset||0);const mp=currentManagerPortrait();const mpEl=document.getElementById('managerPortrait');if(mpEl)mpEl.src=mp;document.querySelectorAll('.manager-choice-portrait').forEach(img=>{img.src=mp;});renderPreMatchLineups();const te=document.getElementById('tournamentStatus');if(te){const tr=practiceMatchActive()?{type:'practice',name:practiceMatchDisplayName(),round:0}:isTournamentTurn();te.textContent=tr?(tr.type==='practice'?tr.name:(currentTournamentEliminated(tr)?`${tr.name} / 敗退済みのため試合不可`:`${tr.name}`)):isCampTurn()?((state.monthIndex===9&&!state.qualifiedHaruko)?'春高地区大会敗退のため1月合宿':'全国大会を逃したため合宿'):'通常期間';}}updateAdvanceButtonLabels();
function starters(){ensureStarterIds();return state.starterIds.map(id=>activeRosterPlayers().find(p=>p.id===id)).filter(Boolean);} function ensureStarterIds(){const roster=activeRosterPlayers();if(!Array.isArray(state.starterIds))state.starterIds=['y3_oh','y3_mb','y3_op','y2_s','y2_mb','y2_oh'];state.starterIds=state.starterIds.filter(id=>roster.find(p=>p.id===id));for(const p of roster){if(state.starterIds.length>=6)break;if(!state.starterIds.includes(p.id))state.starterIds.push(p.id);}state.players.forEach(p=>p.starter=state.starterIds.includes(p.id)&&!isPlayerAbsent(p));} 


function courtLabel(i){return ['前左','前中','前右','後左','後中','後右'][i]||'';}
function baseRotationRole(i){return ['OH','MB','OP','S','MB','OH'][i]||'OH';}
function rotationPositionForIndex(i){return baseRotationRole(i);}
function rotationPositionLabel(i,role=null){return `${courtLabel(i)} ${role||baseRotationRole(i)}`;}
function cloneForMatchRole(player,role){
  if(!player)return player;
  const cp={...player, comps:player.comps, compXp:player.compXp, role};
  return cp;
}
function liberoPlayer(){
  const roster=activeRosterPlayers();
  return roster.find(p=>p.id===state.liberoId) || roster.find(p=>p.role==='L') || null;
}
function liberoSelectHtml(currentId){
  return `<select id="liberoSelect" class="starter-select">${playerSelectOptionsHtml(teamDisplayOrderedPlayers(),currentId,false)}</select>`;
}
function changeLibero(newId){
  if(!activeRosterPlayers().find(p=>p.id===newId))return;
  // v172: リベロから外れる選手も、ベンチが空いていればベンチへ。
  const displaced=state.liberoId;
  state.liberoId=newId;
  ensureBenchIds();
  let benched=null;
  if(displaced && displaced!==newId && addToBenchIfSpace(displaced)){
    benched=state.players.find(p=>p.id===displaced);
  }
  managerSay(benched?`リベロ登録を変更しました。${benched.name}はベンチに回しました。`:'リベロ登録を変更しました。');
  renderAll();
  saveState();
}

function validBenchPool(){
  ensureStarterIds();
  const lib=liberoPlayer();
  const excluded=new Set([...state.starterIds.slice(0,6), lib?.id].filter(Boolean));
  return activeRosterPlayers().filter(p=>!excluded.has(p.id));
}

function ownBenchCheerPlayer(){
  const starterSet=new Set((state.starterIds||[]).slice(0,6));
  const libId=state.liberoId;
  return (state.benchIds||[])
    .map(id=>state.players.find(p=>p.id===id))
    .find(p=>p && !isPlayerAbsent(p) && !starterSet.has(p.id) && p.id!==libId && hasSpecial(p,'ベンチの声援')) || null;
}
function ownBenchCheerActiveForMatch(){
  return !!ownBenchCheerPlayer();
}
function applyBenchCheerMoodToTeam(team){
  if(!team || !isOwnTeamName(team.name) || !ownBenchCheerActiveForMatch())return team;
  Object.values(team.players||{}).forEach(p=>{
    if(p && p.comps){
      p.mood=clamp((Number(p.mood)||0)+1,-2,2);
      p.benchCheerMoodBonus=true;
    }
  });
  team.benchCheer=true;
  team.benchCheerPlayerName=ownBenchCheerPlayer()?.name||'ベンチの声援';
  return team;
}

function ensureBenchIds(){
  const pool=validBenchPool();
  const poolIds=new Set(pool.map(p=>p.id));
  if(!Array.isArray(state.benchIds))state.benchIds=[];
  // v157: ベンチは7枠。
  state.benchIds=state.benchIds.filter((id,i,arr)=>poolIds.has(id)&&arr.indexOf(id)===i).slice(0,BENCH_SIZE);
  // v162: 自動補充は初回だけ。以降は空き枠を作れるようにして、ベンチ→育成組の移動を可能にする。
  if(!state.benchInitialized){
    for(const p of pool){
      if(state.benchIds.length>=BENCH_SIZE)break;
      if(!state.benchIds.includes(p.id))state.benchIds.push(p.id);
    }
    state.benchInitialized=true;
  }
}
// v172: スタメン／リベロからはじかれた選手や新入部員は、ベンチが空いていればベンチに入れる（Tak指示）。
//        v162でベンチの自動補充を初回だけにしたため、外れた選手がそのまま育成組へ落ちていた。
function addToBenchIfSpace(id){
  if(!id)return false;
  ensureBenchIds();
  if(state.benchIds.includes(id))return false;
  if(state.benchIds.length>=BENCH_SIZE)return false;
  if(!validBenchPool().some(p=>p.id===id))return false;
  state.benchIds.push(id);
  return true;
}
function benchSelectHtml(slotIndex,currentId){
  const pool=validBenchPool();
  // v162: 空きを選ぶと、その選手は育成組に移る。
  const empty=`<option value=""${currentId?'':' selected'}>空き（育成組へ）</option>`;
  return `<select class="bench-select starter-select" data-bench-slot="${slotIndex}">${empty}${playerSelectOptionsHtml(teamDisplayOrderedPlayers().filter(p=>pool.some(x=>x.id===p.id)),currentId,true)}</select>`;
}

function playerCardOrderFallback(players){
  return [...players].sort((a,b)=>{
    if((a.year||9)!==(b.year||9))return (a.year||9)-(b.year||9);
    return String(a.name).localeCompare(String(b.name),'ja');
  });
}
function teamDisplayOrderedPlayers(){
  ensureStarterIds();
  ensureBenchIds();
  const ordered=[];
  const seen=new Set();
  const addId=(id)=>{
    const p=activeRosterPlayers().find(x=>x.id===id);
    if(p && !seen.has(p.id)){ordered.push(p);seen.add(p.id);}
  };
  const team=buildOwnTeam();
  (team.rotation||state.starterIds||[]).forEach(addId);
  addId(state.liberoId);
  (state.benchIds||[]).forEach(addId);
  playerCardOrderFallback(activeRosterPlayers().filter(p=>!seen.has(p.id))).forEach(p=>{ordered.push(p);seen.add(p.id);});
  return ordered;
}
// v162: 育成組の枠数は「部員数 − 先発7名」。ベンチを空けるとここが埋まっていく。
function devSquadSlotCount(){
  return Math.max(0, activeRosterPlayers().length - 7);
}
function reservePlayersForTeamView(){
  ensureStarterIds();
  ensureBenchIds();
  const excluded=new Set([...(state.starterIds||[]).slice(0,6), state.liberoId, ...(state.benchIds||[])].filter(Boolean));
  return playerCardOrderFallback(activeRosterPlayers().filter(p=>!excluded.has(p.id)));
}
function playerSelectOptionsHtml(players,currentId,withAbility=false){
  return players.map(p=>`<option value="${p.id}" ${p.id===currentId?'selected':''}>${p.name} / ${p.year}年 / ${p.height}cm</option>`).join('');
}

function changeBench(slotIndex,newId){
  ensureBenchIds();
  // v162: 空きを選んだら、その枠の選手を育成組へ移す。
  if(!newId){
    const removed=state.benchIds[slotIndex];
    if(removed!==undefined){
      state.benchIds.splice(slotIndex,1);
      const p=state.players.find(x=>x.id===removed);
      managerSay(p?`${p.name}をベンチから外し、育成組に回しました。`:'ベンチ枠を空けました。');
    }
    renderAll();saveState();return;
  }
  if(!validBenchPool().find(p=>p.id===newId))return;
  if(state.benchIds.includes(newId)){
    const other=state.benchIds.indexOf(newId);
    const old=state.benchIds[slotIndex];
    state.benchIds[other]=old;
  }
  state.benchIds[slotIndex]=newId;
  ensureBenchIds();
  managerSay('ベンチ入り選手を変更しました。');
  renderAll();
  saveState();
}

function rotateSixItems(items){
  const rot=items.slice(0,6);
  const offset=clamp(Math.round(state.startRotationOffset||0),0,5);
  for(let i=0;i<offset;i++){
    const a=rot[0],b=rot[1],c=rot[2],d=rot[3],e=rot[4],f=rot[5];
    rot.splice(0,6,d,a,b,e,f,c);
  }
  return rot;
}

function applyStartRotationPairs(rotation){
  const pairs=rotation.slice(0,6).map((id,i)=>({id,role:baseRotationRole(i),baseSlot:i}));
  return rotateSixItems(pairs);
}


function starterSelectHtml(slotIndex,currentId){
  return `<select class="starter-select" data-slot="${slotIndex}">${playerSelectOptionsHtml(teamDisplayOrderedPlayers(),currentId,false)}</select>`;
}
function changeStarter(slotIndex,newId){
  ensureStarterIds();
  // v172: この枠から外れる選手を控えておく。スタメン内どうしの入れ替えなら誰も外れない。
  const displaced=state.starterIds[slotIndex];
  const swapWithin=state.starterIds.includes(newId);
  if(swapWithin){
    const other=state.starterIds.indexOf(newId);
    const old=state.starterIds[slotIndex];
    state.starterIds[other]=old;
  }
  state.starterIds[slotIndex]=newId;
  ensureStarterIds();
  ensureBenchIds();
  let benched=null;
  if(!swapWithin && displaced && displaced!==newId && addToBenchIfSpace(displaced)){
    benched=state.players.find(p=>p.id===displaced);
  }
  managerSay(benched?`スタメンを変更しました。${benched.name}はベンチに回しました。`:'スタメンを変更しました。');
  renderAll();
  saveState();
}

// v169: スタメンプリセット。スタメン6人の並び順とリベロを記憶して呼び出す。
// v170: ベンチは記憶しない。呼び出したあとも、ベンチはそのときの設定のまま。
const LINEUP_PRESET_COUNT=3;
function ensureLineupPresets(){
  if(!Array.isArray(state.lineupPresets))state.lineupPresets=[];
  while(state.lineupPresets.length<LINEUP_PRESET_COUNT)state.lineupPresets.push(null);
  state.lineupPresets.length=LINEUP_PRESET_COUNT;
}
function lineupPresetPlayerName(id){
  const p=state.players.find(x=>x.id===id);
  return p?p.name:'';
}
function saveLineupPreset(i){
  ensureStarterIds(); ensureLineupPresets();
  const starterIds=state.starterIds.slice(0,6);
  const lib=liberoPlayer();
  state.lineupPresets[i]={
    starterIds,
    liberoId:lib?lib.id:'',
    savedAt:`${state.year}年目 ${monthTurnLabel()}`,
    // 卒業などで選手が消えたときに「誰が抜けたか」を出せるよう、名前も控えておく
    names:Object.fromEntries([...starterIds,lib?lib.id:''].filter(Boolean)
      .map(id=>[id,lineupPresetPlayerName(id)]))
  };
  managerSay(`いまのスタメンとリベロをプリセット${i+1}に保存しました。`);
  renderAll(); saveState();
}
function clearLineupPreset(i){
  ensureLineupPresets();
  state.lineupPresets[i]=null;
  managerSay(`プリセット${i+1}を消しました。`);
  renderAll(); saveState();
}
function loadLineupPreset(i){
  ensureLineupPresets();
  const pr=state.lineupPresets[i];
  if(!pr){managerSay(`プリセット${i+1}はまだ保存されていません。`);return;}
  const roster=activeRosterPlayers();
  const alive=id=>!!roster.find(x=>x.id===id);
  const gone=[];
  const seen=new Set();
  const starters=[];
  (pr.starterIds||[]).forEach(id=>{
    if(!id)return;
    if(!alive(id)){gone.push(pr.names?.[id]||id);return;}
    if(seen.has(id))return;
    seen.add(id); starters.push(id);
  });
  const libId=pr.liberoId;
  const libOk=!!(libId && alive(libId));
  if(libId && !libOk)gone.push(pr.names?.[libId]||libId);
  // 抜けた枠は在籍順で埋める。リベロを先に確保しておき、スタメンには入れない。
  for(const q of roster){
    if(starters.length>=6)break;
    if(starters.includes(q.id))continue;
    if(libOk && q.id===libId)continue;
    starters.push(q.id);
  }
  state.starterIds=starters;
  if(libOk)state.liberoId=libId;
  ensureStarterIds();
  // v170: ベンチは記憶しない。スタメン入れ替えでベンチと重複した選手だけを外す。
  state.benchInitialized=true;              // 自動補充させない（空き枠＝育成組を保つ）
  ensureBenchIds();
  const uniq=[...new Set(gone)];
  managerSay(uniq.length
    ? `プリセット${i+1}を呼び出しました。${uniq.join('・')}は在籍していないため、空いた枠は自動で埋めています。`
    : `プリセット${i+1}を呼び出しました。`);
  renderAll(); saveState();
}
if(typeof window!=='undefined'){
  window.saveLineupPreset=saveLineupPreset;
  window.loadLineupPreset=loadLineupPreset;
  window.clearLineupPreset=clearLineupPreset;
}
function lineupPresetPanelHtml(){
  ensureLineupPresets();
  const cards=state.lineupPresets.map((pr,i)=>{
    if(!pr){
      return `<div class="lineup-preset-card empty">
        <div class="lineup-preset-head"><strong>プリセット${i+1}</strong><span class="muted">未保存</span></div>
        <div class="lineup-preset-actions"><button type="button" class="primary small" onclick="saveLineupPreset(${i})">いまの並びを保存</button></div>
      </div>`;
    }
    const nm=id=>pr.names?.[id]||lineupPresetPlayerName(id)||'—';
    const rot=(pr.starterIds||[]).map((id,j)=>`<span class="lineup-preset-chip"><em>${courtLabel(j)}</em>${nm(id)}</span>`).join('');
    return `<div class="lineup-preset-card">
      <div class="lineup-preset-head"><strong>プリセット${i+1}</strong><span class="muted">${pr.savedAt||''}</span></div>
      <div class="lineup-preset-body">
        <div class="lineup-preset-chips">${rot}</div>
        <div class="lineup-preset-sub">リベロ：${nm(pr.liberoId)}</div>
      </div>
      <div class="lineup-preset-actions">
        <button type="button" class="primary small" onclick="loadLineupPreset(${i})">呼び出す</button>
        <button type="button" class="secondary small" onclick="saveLineupPreset(${i})">上書き保存</button>
        <button type="button" class="secondary small" onclick="clearLineupPreset(${i})">消去</button>
      </div>
    </div>`;
  }).join('');
  return `<div class="lineup-preset-section">
    <div class="starter-bench-title">スタメンプリセット${helpButtonHtml('lineupPreset')}</div>
    <div class="lineup-preset-grid">${cards}</div>
  </div>`;
}
function renderStarterGrid(){
  ensureStarterIds();
  const el=document.getElementById('starterGrid');
  el.innerHTML='';

  const team=buildOwnTeam();
  const slotMap={};
  state.starterIds.slice(0,6).forEach((id,i)=>slotMap[id]=i);

  const court=document.createElement('div');
  court.className='starter-court-layout';
  court.innerHTML=team.rotation.map((id,i)=>{
    const p=team.players[id];
    const original=state.players.find(x=>x.id===id)||p;
    const baseSlot=slotMap[id] ?? i;
    if(!p)return '';
    return `<div class="starter-card starter-court-card" data-player-id="${id}">
      <div class="starter-headline"><img class="player-face" src="${p.portrait}"><div class="starter-name-block"><div class="name">${p.name}${handBadgeHtml(p)}${moodBadgeHtml(p.mood||0)}${genkiIconHtml(p,16)}</div><div class="starter-slot-role">${rotationPositionLabel(i,p.role)}</div></div>${positionGradeBadgeHtml(p,'starter-position-grade')}</div>
      ${starterMiniGradeLine(p)}
      <label class="mini-label">この枠の選手を交代</label>
      ${starterSelectHtml(baseSlot,p.id)}
    </div>`;
  }).join('');
  court.querySelectorAll('.starter-select').forEach(sel=>{
    sel.addEventListener('change',ev=>changeStarter(Number(ev.target.dataset.slot),ev.target.value));
  });
  court.querySelectorAll('.starter-court-card').forEach(card=>{
    card.addEventListener('click',ev=>{
      if(ev.target.classList.contains('starter-select'))return;
      const p=state.players.find(x=>x.id===card.dataset.playerId);
      if(p){state.selectedPlayerId=p.id;switchTab('players');renderAll();}
    });
  });
  el.appendChild(court);

  const lib=liberoPlayer();
  const liberoRow=document.createElement('div');
  liberoRow.className='starter-libero-row';
  liberoRow.innerHTML=lib?`<div class="starter-card starter-libero-card" data-player-id="${lib.id}">
    <div class="starter-headline"><img class="player-face" src="${lib.portrait}"><div class="starter-name-block"><div class="name">${lib.name}${handBadgeHtml(lib)}${moodBadgeHtml(lib.mood||0)}${genkiIconHtml(lib,16)}</div><div class="starter-slot-role">L リベロ</div></div>${positionGradeBadgeHtml(lib,'starter-position-grade')}</div>
    ${starterMiniGradeLine(lib)}
    <label class="mini-label">リベロ登録</label>
    ${liberoSelectHtml(lib.id)}
  </div>`:`<div class="starter-control-card">リベロ：未設定<br>${liberoSelectHtml(state.liberoId)}</div>`;
  liberoRow.querySelector('#liberoSelect')?.addEventListener('change',ev=>changeLibero(ev.target.value));
  liberoRow.querySelector('.starter-libero-card')?.addEventListener('click',(ev)=>{
    if(ev.target.id==='liberoSelect'||ev.target.classList.contains('starter-select'))return;
    if(lib){state.selectedPlayerId=lib.id;switchTab('players');renderAll();}
  });
  el.appendChild(liberoRow);

  ensureBenchIds();
  const bench = benchPlayersForMatch();
  const benchBox=document.createElement('div');
  benchBox.className='starter-bench-section';
  benchBox.innerHTML=`<div class="starter-bench-title">ベンチ入り ${bench.filter(Boolean).length}/${BENCH_SIZE}枠</div><div class="starter-bench-grid">${
    Array.from({length:BENCH_SIZE}).map((_,i)=>{
      const p=bench[i];
      return p?`<div class="starter-card starter-bench-card" data-player-id="${p.id}">
        <div class="starter-headline"><img class="player-face" src="${p.portrait}"><div class="starter-name-block"><div class="name">${p.name}${handBadgeHtml(p)}${moodBadgeHtml(p.mood||0)}${genkiIconHtml(p,16)}</div><div class="starter-slot-role">ベンチ${i+1}</div></div>${positionGradeBadgeHtml(p,'starter-position-grade')}</div>
        ${starterMiniGradeLine(p)}
        <label class="mini-label">ベンチ登録</label>
        ${benchSelectHtml(i,p.id)}
      </div>`:`<div class="starter-card starter-bench-card empty"><div class="name">空き枠</div>${benchSelectHtml(i,'')}</div>`;
    }).join('')
  }</div>`;
  benchBox.querySelectorAll('.bench-select').forEach(sel=>{
    sel.addEventListener('change',ev=>changeBench(Number(ev.target.dataset.benchSlot),ev.target.value));
  });
  benchBox.querySelectorAll('.starter-bench-card[data-player-id]').forEach(card=>{
    card.addEventListener('click',(ev)=>{
      if(ev.target.classList.contains('bench-select')||ev.target.classList.contains('starter-select'))return;
      const p=state.players.find(x=>x.id===card.dataset.playerId);
      if(p){state.selectedPlayerId=p.id;switchTab('players');renderAll();}
    });
  });
  el.appendChild(benchBox);

  // v162: 「控え選手」を「育成組」に改めた。枠数は部員数−7で、ベンチを空けるとここが埋まる。
  const slots=devSquadSlotCount();
  const reserves=reservePlayersForTeamView().slice(0,slots);
  const reserveBox=document.createElement('div');
  reserveBox.className='starter-reserve-section';
  reserveBox.innerHTML=`<div class="starter-bench-title">育成組 ${reserves.length}/${slots}枠</div>
    <p class="hint">ベンチを空き枠にすると、その選手は育成組に移ります。育成組は毎週の重点練習で少し多く伸びますが、そのぶん疲れやすくなります。</p>
    <div class="starter-reserve-grid">${
    Array.from({length:slots}).map((_,i)=>{
      const p=reserves[i];
      if(!p)return `<div class="starter-card starter-reserve-card empty"><div class="name">空き枠</div></div>`;
      return `<div class="starter-card starter-reserve-card" data-player-id="${p.id}">
      <div class="starter-headline"><img class="player-face" src="${p.portrait}"><div class="starter-name-block"><div class="name">${p.name}${handBadgeHtml(p)}${moodBadgeHtml(p.mood||0)}${genkiIconHtml(p,16)}</div><div class="starter-slot-role">育成組 / ${p.year}年 / ${p.height}cm</div></div>${positionGradeBadgeHtml(p,'starter-position-grade')}</div>
      ${starterMiniGradeLine(p)}
    </div>`;
    }).join('') || '<div class="muted">育成組はいません。</div>'
  }</div>`;
  reserveBox.querySelectorAll('.starter-reserve-card[data-player-id]').forEach(card=>{
    card.addEventListener('click',()=>{
      const p=state.players.find(x=>x.id===card.dataset.playerId);
      if(p){state.selectedPlayerId=p.id;switchTab('players');renderAll();}
    });
  });
  el.appendChild(reserveBox);
}
function weightedAverageEntries(entries){
  const valid=(entries||[]).filter(x=>x&&Number.isFinite(x.value)&&Number.isFinite(x.weight)&&x.weight>0);
  const total=valid.reduce((a,x)=>a+x.weight,0);
  if(!total)return 1;
  return valid.reduce((a,x)=>a+x.value*x.weight,0)/total;
}
function blendValues(parts){
  const valid=(parts||[]).filter(x=>x&&Number.isFinite(x.value)&&Number.isFinite(x.weight)&&x.weight>0);
  const total=valid.reduce((a,x)=>a+x.weight,0);
  if(!total)return 1;
  return valid.reduce((a,x)=>a+x.value*x.weight,0)/total;
}
function teamEvaluationPlayers(){
  const team=buildOwnTeam();
  const rows=[];
  (team.rotation||[]).forEach(id=>{
    const p=team.players?.[id];
    if(p)rows.push({player:p,role:p.role||'OH',kind:'starter'});
  });
  const lib=team.players?.[team.libero];
  if(lib)rows.push({player:lib,role:'L',kind:'libero'});
  return rows;
}
function roleWeightForMetric(role,metric,kind='starter'){
  if(metric==='attack')return ({OH:1.15,OP:1.05,MB:.8,S:.2,L:0}[role]??0);
  if(metric==='block')return ({OH:.75,OP:1,MB:1.4,S:.65,L:0}[role]??0);
  if(metric==='receive')return ({OH:1,OP:.75,MB:0,S:.55,L:1.6}[role]??0);
  if(metric==='serve')return kind==='libero'?0:1;
  if(metric==='toss')return ({OH:0,OP:0,MB:0,S:1,L:0}[role]??0);
  if(metric==='height')return ({OH:1,OP:1,MB:1.25,S:.65,L:0}[role]??0);
  return 0;
}
// v164: チーム評価レーダーの6軸も、ポジション評価と同じ「実測した勝率影響度」に合わせた。
//        従来は攻撃＝スパイク平均(決定力とコース打ちの単純平均)×0.65 のように、
//        影響のほとんどない能力が半分の重みを持っていたため、レーダーが伸びても勝率が動かなかった。
//        攻撃＝決定力0.75/ジャンプ0.375/身長0.375（＋コース打ちのミス・フェイント寄与）、
//        ブロック＝シャット0.675/ジャンプ0.3375/身長0.375（2枚目は参加率0.40倍）、
//        サーブ＝威力0.75＋制球0.25（＋制球のミス回避）という式どおりの比率にしている。
// v165: 選手1人分の軸の値。チーム値と同じ重みを使い、監督のアドバイス（弱点の指摘）から参照する。
function playerMatchMetricValue(p,role,metric){
  return teamMatchMetricForRows([{player:p,role:role}],metric);
}

function teamRadarMetrics(){
  return teamMatchMetricsForTeam(buildOwnTeam());
}
function radarPoint(cx,cy,r,idx,n){
  const a=-Math.PI/2 + idx*2*Math.PI/n;
  return [cx+Math.cos(a)*r, cy+Math.sin(a)*r];
}
function teamRadarSvg(metrics){
  const cx=150,cy=138,maxR=92,n=metrics.length;
  const rings=[5,10,15,20,25].map(v=>{
    const pts=metrics.map((_,i)=>radarPoint(cx,cy,maxR*(v/25),i,n).map(x=>x.toFixed(1)).join(',')).join(' ');
    return `<polygon class="team-radar-ring" points="${pts}"></polygon>`;
  }).join('');
  const axes=metrics.map((m,i)=>{
    const [x,y]=radarPoint(cx,cy,maxR,i,n);
    return `<line class="team-radar-axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"></line>`;
  }).join('');
  const poly=metrics.map((m,i)=>{
    const r=maxR*(clamp(m.value,1,25)/25);
    return radarPoint(cx,cy,r,i,n).map(x=>x.toFixed(1)).join(',');
  }).join(' ');
  // v93: 今季の基準（4月第1週終了時）を点線で重ねて、伸びを図で見せる
  const b=state.seasonBaseline;
  const basePoly=(b&&b.year===state.year&&b.values)?metrics.map((m,i)=>{
    const bv=typeof b.values[m.key]==='number'?b.values[m.key]:m.value;
    const r=maxR*(clamp(bv,1,25)/25);
    return radarPoint(cx,cy,r,i,n).map(x=>x.toFixed(1)).join(',');
  }).join(' '):'';
  const labels=metrics.map((m,i)=>{
    const [x,y]=radarPoint(cx,cy,maxR+25,i,n);
    const cls=x<cx-8?'end':x>cx+8?'start':'middle';
    return `<text class="team-radar-label ${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${m.label}</text>`;
  }).join('');
  const values=metrics.map((m,i)=>{
    const [x,y]=radarPoint(cx,cy,maxR+9,i,n);
    const cls=x<cx-8?'end':x>cx+8?'start':'middle';
    return `<text class="team-radar-value ${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${int(m.value)}</text>`;
  }).join('');
  // v136: 参考画像（ウイイレのシーズンイン／現在の重ね塗り）に合わせる。
  //        伸びの線・数字は使わず、2つの多角形の重ね塗りで差を見せる。
  const legend=basePoly?`<g class="team-radar-legend"><circle class="lg-dot base" cx="14" cy="12" r="4.5"></circle><text class="lg-text" x="23" y="16">4月時点</text><circle class="lg-dot now" cx="14" cy="28" r="4.5"></circle><text class="lg-text" x="23" y="32">現在</text></g>`:'';
  return `<svg class="team-radar-svg" viewBox="0 0 300 280" role="img" aria-label="試合用チーム評価レーダー"><defs><linearGradient id="radarNowGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6aa8ff"></stop><stop offset="100%" stop-color="#2f6fe4"></stop></linearGradient><linearGradient id="radarBaseGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff"></stop><stop offset="100%" stop-color="#dce8fa"></stop></linearGradient></defs>${rings}${axes}<polygon class="team-radar-polygon" points="${poly}"></polygon>${basePoly?`<polygon class="team-radar-base" points="${basePoly}"></polygon>`:''}${labels}${values}${legend}</svg>`;
}
function playerRoleNameForAdvice(role){
  return {OH:'OH',OP:'OP',MB:'MB',S:'セッター',L:'リベロ'}[role]||role;
}
function advicePlayerLabel(row){
  return `${playerRoleNameForAdvice(row.role)}の${row.player.name}`;
}
function teamAdviceRows(){
  return teamEvaluationPlayers().map(r=>{
    const s=deriveStats(r.player);
    return {...r,stats:s,height:heightPoint(r.player.height)};
  });
}
function metricByKey(metrics,key){
  return metrics.find(m=>m.key===key)?.value||1;
}
function strongestMetric(metrics){
  return [...metrics].sort((a,b)=>b.value-a.value)[0];
}
function weakestMetric(metrics){
  return [...metrics].sort((a,b)=>a.value-b.value)[0];
}
function lowRows(rows,filter,valueFn,limit=2){
  return rows.filter(filter).map(r=>({row:r,value:valueFn(r)})).sort((a,b)=>a.value-b.value).slice(0,limit);
}

function teamManagerAnalysisHtml(){
  const metrics=teamRadarMetrics();
  const rows=teamAdviceRows();
  const lines=[];
  const actions=[];
  const strong=strongestMetric(metrics), weak=weakestMetric(metrics);
  if(strong&&weak){
    lines.push(`現状の強みは${strong.label}です。一方で、最優先の課題は${weak.label}です。`);
  }

  const attack=metricByKey(metrics,'attack'), block=metricByKey(metrics,'block'), receive=metricByKey(metrics,'receive'), serve=metricByKey(metrics,'serve'), toss=metricByKey(metrics,'toss'), height=metricByKey(metrics,'height');

  const attackers=rows.filter(r=>['OH','OP','MB'].includes(r.role));
  const opRows=rows.filter(r=>r.role==='OP');
  const ohRows=rows.filter(r=>r.role==='OH');
  const mbRows=rows.filter(r=>r.role==='MB');
  const setter=rows.find(r=>r.role==='S');
  const libero=rows.find(r=>r.role==='L');

  if(attack>=13){
    const lowAttack=lowRows(rows,r=>['OH','OP','MB'].includes(r.role),r=>playerMatchMetricValue(r.player,r.role,'attack'),2);
    const extra=lowAttack.length?`ただし、${lowAttack.map(x=>advicePlayerLabel(x.row)).join('、')}はまだ伸びしろがあります。`:'';
    lines.push(`攻撃力は比較的高めです。${extra}`);
  }else{
    const lowAttack=lowRows(rows,r=>['OH','OP','MB'].includes(r.role),r=>playerMatchMetricValue(r.player,r.role,'attack'),2);
    lines.push(`攻撃力はまだ物足りません。${lowAttack.map(x=>advicePlayerLabel(x.row)).join('、')||'主力アタッカー'}のスパイク決定力とジャンプを優先して伸ばしたいです。`);
    actions.push('通常練習：強打スパイク練習 / 個別練習：スパイク決定力・ジャンプ');
  }
  if(opRows.length){
    const op=opRows[0];
    if(op.stats.spike<attack-1 || op.stats.spike<11){
      lines.push(`OPは試合中に右側から点を取りたい役割ですが、${op.player.name}のスパイク力はまだ成長の余地があります。`);
      actions.push('OPの個別練習：スパイク決定力');
    }
  }

  if(receive<11){
    const weakReceivers=lowRows(rows,r=>['OH','OP','S','L'].includes(r.role),r=>r.stats.receive,3);
    lines.push(`全体的にレセプションが弱めです。${weakReceivers.map(x=>advicePlayerLabel(x.row)).join('、')}が崩されると、相手のサーブで連続失点しやすくなります。`);
    actions.push('通常練習：守備基礎レシーブ練習 / サーブ＆レセプション練習');
  }else{
    const weakOh=lowRows(rows,r=>r.role==='OH',r=>r.stats.receive,2);
    if(weakOh.length && weakOh[0].value<=10){
      lines.push(`守備全体は大崩れしていませんが、OHのレシーブには不安があります。${weakOh.map(x=>advicePlayerLabel(x.row)).join('、')}は相手サーブの狙い目になりやすいです。`);
      actions.push('OHの個別練習：レセプション');
    }
  }
  if(libero && libero.stats.receive<12){
    lines.push(`リベロの${libero.player.name}は守備の中心です。リベロのレシーブが上がると、チーム全体の安定感が一気に上がります。`);
    actions.push('リベロの個別練習：レセプション・ディグ');
  }

  if(block<11){
    const weakBlock=lowRows(rows,r=>['MB','OP','OH','S'].includes(r.role),r=>playerMatchMetricValue(r.player,r.role,'block'),2);
    lines.push(`ブロックはやや弱めです。特に${weakBlock.map(x=>advicePlayerLabel(x.row)).join('、')}は、相手の強打を止めきれない可能性があります。`);
    actions.push('通常練習：ブロック反応練習 / 個別練習：シャットアウト・ジャンプ');
  }else{
    const mbWeak=lowRows(rows,r=>r.role==='MB',r=>r.stats.block,2);
    if(mbWeak.length && mbWeak[0].value<=11){
      lines.push(`ブロック評価は悪くありませんが、MBのブロック技術にはまだ伸びしろがあります。中央で止められると試合がかなり楽になります。`);
      actions.push('MBの個別練習：シャットアウト・リード');
    }
  }

  if(toss<12 && setter){
    lines.push(`セッターのトス精度はまだ安定しきっていません。${setter.player.name}のトスが上がると、アタッカー全員の決定力が出やすくなります。`);
    actions.push('通常練習：セッター育成 / 個別練習：トス正確性');
  }
  if(serve<11){
    const weakServe=lowRows(rows,r=>r.kind!=='libero',r=>r.stats.serve,2);
    lines.push(`サーブ圧はまだ弱めです。${weakServe.map(x=>advicePlayerLabel(x.row)).join('、')}のサーブが伸びると、格上相手でも先に崩せます。`);
    actions.push('通常練習：サーブ＆レセプション練習 / 個別練習：サーブ威力・サーブ制球');
  }
  if(height<10 && block<12){
    lines.push('高さで押し切るチームではないので、ブロックは身長よりもジャンプと読みで補う必要があります。');
    actions.push('通常練習：ブロック反応練習 / ジャンプ強化トレーニング');
  }

  if(!lines.length){
    lines.push('全体のバランスは悪くありません。次は相手校に合わせて、サーブで崩すか、ブロックで止めるかを決めて伸ばすのが良さそうです。');
  }
  const uniqueActions=[...new Set(actions)].slice(0,4);
  return `<div class="team-manager-analysis">
    <div class="growth-manager">${managerLine('チーム評価を見た分析です。何を伸ばすべきか整理します。')}</div>
    <ul>${lines.slice(0,6).map(x=>`<li>${x}</li>`).join('')}</ul>
    ${uniqueActions.length?`<div class="team-manager-actions"><strong>優先したい練習</strong>${uniqueActions.map(x=>`<span>${x}</span>`).join('')}</div>`:''}
  </div>`;
}
function toggleTeamManagerAnalysis(){
  state.teamAnalysisOpen=!state.teamAnalysisOpen;
  renderTeamSummary();
  saveState();
}
if(typeof window!=='undefined')window.toggleTeamManagerAnalysis=toggleTeamManagerAnalysis;
// v90: 今季（4月第1週終了時）からの伸びを表示する
function seasonGrowthDelta(key,current){
  const b=state.seasonBaseline;
  if(!b||b.year!==state.year||!b.values||typeof b.values[key]!=='number')return null;
  const d=current-b.values[key];
  return Math.abs(d)<0.05?0:d;
}
function seasonGrowthChipHtml(key,current){
  const d=seasonGrowthDelta(key,current);
  if(d===null)return '';
  if(d===0)return `<span class="season-growth flat">±0</span>`;
  const up=d>0;
  return `<span class="season-growth ${up?'up':'down'}">${up?'▲':'▼'}${num(Math.abs(d),1)}</span>`;
}
// v184: フッターの説明文は3つとも不要（Tak指示）。
//        v183で「N年目・4月第1週終了時からの伸び」、v184で残り2文を消した。
//        呼び出し口を触らずに済ませるため、関数は空文字を返す形で残す。
function seasonGrowthFootHtml(){
  return '';
}
// ============================================================
// v90: 画面内ヘルプ。見出し横の「?」を押すとマネージャーが説明する。
// 別画面のヘルプは読まれないため、その場に1〜2文で出す方針。
// ============================================================
const HELP_TOPICS={
  // v172: 画面に直書きしていた説明文を、？アイコンから開く形に移した（Tak指示）。
  // v181: 試合中指示（サーブ・配球・ブロック）の説明もここへ移した。
  matchTactics:{title:'試合中指示',lines:[
    '<b>サーブ指示</b>：サーブが強くなる代わりにミスが増えます。打った選手のサーブ威力が少し伸びます。',
    '<b>配球指示</b>は2人まで。①のほうにトスが多く集まり、②はその次に回ります。',
    '表と裏のOHを両方指定したり、オポジットがいる試合だけそちらを①にする、といった使い方ができます。',
    '<b>ブロック指示</b>は、警戒したポジションのブロックが厚くなる代わりに、他が薄くなります。',
    'どれも試合中にいつでも変えられます。'
  ]},
  lineupPreset:{title:'スタメンプリセット',lines:[
    'スタメン6人の並び順とリベロを記憶します。呼び出すと、そのときの並びに戻ります。',
    'ベンチは記憶しないので、いまの設定のままです（スタメンに上がった選手だけベンチから外れます）。',
    '卒業などでいない選手がいた枠は、自動で埋めます。'
  ]},
  squadPlan:{title:'今月の練習方針',lines:[
    '<b>しっかり練習</b>：調整は行わず、練習を続けます。',
    '<b>試合前調整</b>：翌月に大会がある月だけ、第1週を元気度100で迎えられるよう月末に休養を入れます。大会のない月は調整せずに練習します。',
    '必要な休養の週数は選手ごとに変わります。疲労のたまり方が違うためです。',
    '1軍（登録メンバー14名）と2軍（育成組）で、別々に設定できます。'
  ]},
  devSquad:{title:'育成組',lines:[
    '登録メンバー14名（スタメン7・ベンチ7）以外の部員が育成組です。',
    '毎週この能力に少しだけ多く伸びますが、そのぶん疲れやすくなります。'
  ]},
  starters:{title:'スタメン',lines:[
    '左から順に <b>前左OH・前中MB・前右OP・後左S・後中MB・後右OH</b> の並びです。',
    '入れ替えると、その選手はその位置の役割で試合に出ます。セッターを前左に置けば、セッターの能力のままアタッカーとして出場することになります。',
    'リベロは別枠です。後衛のMBと入れ替わってコートに入ります。'
  ]},
  teamRadar:{title:'チーム評価',lines:[
    'この6項目は、実際の試合計算に使われる値をそのまま出しています。攻撃・ブロック・レシーブ・サーブ・トス・高さの6つです。',
    '各項目の右にある <b>▲</b> は、<b>4月第1週を終えた時点</b>からどれだけ伸びたかです。今season どれだけ成長できたかの目安にしてください。',
    'ポジションによって、同じ項目でも評価のされ方が違います。たとえば「高さ」はMBほど重く、セッターは軽く見られ、リベロは対象外です。'
  ]},
  training:{title:'練習メニュー',lines:[
    '選手ごとに別のメニューを設定できます。設定しないと「おまかせ」になります。',
    'おまかせはポジションに応じて自動配分しますが、<b>役割に合わせて自分で選んだ方が伸びます</b>。',
    '合宿期間中は練習の伸びが大きくなります。合宿テーマを選ぶと、それとは別に全員が毎週少しずつ伸びます。'
  ]},
  schoolClass:{title:'学校の格',lines:[
    '格が上がると <b>練習レベル</b>・<b>新入部員の質と人数</b>・<b>スカウトの上限</b>が上がります。',
    '上がる条件は、地区1回戦勝利で弱小校、地区ベスト4勝利で中堅校、地区決勝勝利で全国大会出場校、全国1回戦勝利で強豪校、全国ベスト4勝利で名門校です。',
    '監督活動の訪問先も格によって解禁されます。バレーボール協会は強豪校からです。'
  ]},
  tactics:{title:'配球指示とブロック指示',lines:[
    '<b>配球指示</b>：トスを集めたい選手を2人まで選べます。①のほうに多く、②はその次に回ります。',
    '<b>サーブ指示</b>：4択で、どれか1つだけを選びます。強気で攻めろ＝威力が上がる代わりにミスも増えます。絶対に入れろ＝威力を抑えるかわりにミスが減ります。エースを狙え＝狙い先を相手前衛のエースへ変えます。指示なし＝そのままです。',
    '<b>ブロック指示</b>：警戒するポジションを決めます。そのポジションへのブロックは強くなりますが、そのぶん他のポジションへは弱くなります。',
    'どちらも試合中いつでも変えられます。相手のエースがどこにいるかを見て切り替えてください。'
  ]},
  scoutRegion:{title:'スカウトの地域',lines:[
    '地域ごとに、伸びやすい能力が違います。北海道東北はブロック、関東は読み、北陸はコース打ち、東海はレセプションと守備範囲、近畿はスパイクとサーブ、中国はディグ、四国はトスとサーブ制球、九州はジャンプです。',
    '探すポジションも選べます。手薄なポジションを埋めるか、強い選手を重ねるかは方針次第です。',
    '見つけた選手は<b>翌年度の4月</b>に入部候補として並びます。'
  ]},
  hall:{title:'殿堂',lines:[
    '卒業していった選手のうち、<b>ポジションごとの歴代ベスト14</b>（OH4・MB4・OP2・S2・L2）がここに残ります。',
    '歴代ベスト14は、全国優勝した翌年以降に開かれる<b>OG特別試合</b>の相手にもなります。強い先輩を輩出するほど、その壁は高くなります。',
    'プロ入りは、全国大会でベスト4以上に進んだ年の3年生から選ばれます。1人プロ入りするごとに、翌年度の入部希望者が1人増えます。'
  ]},
  coachAction:{title:'監督の行動',lines:[
    '毎月の第1週に1つ選びます。どれを選んでも、チーム全体の通常練習はその週も行われます。',
    '<b>監督活動</b>は学校の格に応じて訪問先が増え、練習器具・留学先・練習試合・交換留学生などにつながります。',
    '<b>個別練習</b>は1人に集中指導を追加します。<b>スカウト</b>は来年度、<b>レクリエーション</b>は調子、<b>プロ観戦</b>は特殊能力のヒントを狙います。'
  ]}
};
function helpButtonHtml(key){
  const t=HELP_TOPICS[key];
  if(!t)return '';
  return `<button class="help-btn" type="button" title="${escapeAttrText(t.title)}の説明" onclick="openHelp('${key}')">?</button>`;
}
function openHelp(key){
  const t=HELP_TOPICS[key];
  if(!t)return;
  const body=`<div class="growth-manager">${managerLine(`${t.title}について説明しますね。`)}</div>`
    +t.lines.map(l=>`<div class="growth-item help-line">${l}</div>`).join('');
  enqueueImportantPopup(`ヘルプ：${t.title}`, body, 'info','help');
}
if(typeof window!=='undefined')window.openHelp=openHelp;
function teamRadarHtml(){
  const metrics=teamRadarMetrics();
  const open=!!state.teamAnalysisOpen;
  return `<div class="team-radar-card">
    <div class="team-radar-head"><strong>試合用チーム評価</strong></div>
    ${teamRadarSvg(metrics)}
    <div class="team-radar-list">${metrics.map(m=>{const cls=teamRankBaseClass(m.value);return `<div class="team-radar-row compact" title="${escapeAttrText(m.note||'')}"><span class="team-radar-tooltip" data-tip="${escapeAttrText(m.note||'')}">${m.label}</span><strong class="${cls}">${int(m.value)} <em>${teamRank(m.value)}</em>${seasonGrowthChipHtml(m.key,m.value)}</strong></div>`;}).join('')}</div>
    ${seasonGrowthFootHtml()}
    <div class="team-radar-analysis-controls">
      <button class="secondary" type="button" onclick="toggleTeamManagerAnalysis()">${open?'マネージャー分析を閉じる':'マネージャーに分析を聞く'}</button>
    </div>
    ${open?teamManagerAnalysisHtml():''}
  </div>`;
}
function renderTeamSummary(){
  const el=document.getElementById('teamSummary');
  if(el)el.innerHTML=teamStatusChipsHtml()+teamRadarHtml();
  // v172: スタメンプリセットはスタメンカードではなく、チーム概要の下に縦型で置く（Tak指示）。
  const pre=document.getElementById('lineupPresetPanel');
  if(pre)pre.innerHTML=lineupPresetPanelHtml();
}

function rosterAssignmentInfo(p){
  ensureStarterIds();
  const team=buildOwnTeam();
  const idx=team.rotation.indexOf(p.id);
  if(idx>=0)return {label:team.players[p.id]?.role||baseRotationRole(idx), order:{OH:0,MB:1,OP:2,S:3}[team.players[p.id]?.role||baseRotationRole(idx)]??9};
  if(p.id===state.liberoId)return {label:'L', order:4};
  ensureBenchIds();
  if(state.benchIds.includes(p.id))return {label:'ベンチ', order:5};
  return {label:'控え', order:6};
}
// v174: 選手画面の並びをチーム画面に合わせる（Tak指示）。
// 従来はポジション種別（OH→MB→OP→S→L→ベンチ→育成組）でまとめ、その中を学年・名前順にしていた。
// teamDisplayOrderedPlayers はチーム画面と同じ「ローテーション順→リベロ→ベンチ順→育成組」を返すので、それをそのまま使う。
// 留学中・日本代表活動中で activeRosterPlayers から外れる選手は一覧から消さず、末尾に続ける。
function sortedRosterPlayers(){
  const ordered=teamDisplayOrderedPlayers();
  const seen=new Set(ordered.map(p=>p.id));
  const rest=playerCardOrderFallback((state.players||[]).filter(p=>!seen.has(p.id)));
  return [...ordered, ...rest];
}

function renderRoster(){
  const el=document.getElementById('rosterList');
  el.innerHTML='';
  sortedRosterPlayers().forEach(p=>{
    const assign=rosterAssignmentInfo(p);
    const d=document.createElement('div');
    d.className='roster-item'+(p.id===state.selectedPlayerId?' active':'');
    d.innerHTML=`<img src="${p.portrait}"><div><div class="name">${p.name}${handBadgeHtml(p)}${moodBadgeHtml(p.mood||0)}${genkiIconHtml(p,16)}</div><div class="meta">${p.year}年 / ${p.height}cm / ${handLabel(p)}${isDevelopmentSquad(p)?' / <span class="dev-squad-badge">育成組</span>':''}${isPlayerAbsent(p)?` / <span class="absent-badge">${absentReasonText(p)}</span>`:''}</div>${genkiRowHtml(p)}<label class="mini-label">練習設定</label>${trainingSelectHtml(state.playerTraining[p.id]||'omakase')}</div><div class="meta roster-assignment">${isPlayerAbsent(p)?absentReasonText(p):assign.label}</div>`;
    d.onclick=(ev)=>{if(ev.target.classList.contains('player-training-select'))return;state.selectedPlayerId=p.id;renderAll();};
    d.querySelector('.player-training-select').addEventListener('change',ev=>{
      state.playerTraining[p.id]=ev.target.value;
      managerSay(`${p.name}の練習設定を${regularTrainingMenuById(ev.target.value).name}に変更しました。`);
      saveState();
    });
    el.appendChild(d);
  });
}
function statBox(l,v){const cls=rankClassFromValue(v);return`<div class="stat-box simple-stat"><div class="stat-top"><span>${l}</span><strong class="${cls}">${int(v)} <span class="rank-chip ${cls}">${ratingLetter(v)}</span></strong></div></div>`} function compLine(p,k,l){const v=p.comps[k],cls=rankClassFromValue(v),xp=Math.floor(p.compXp[k]||0),need=xpThreshold(v);return`<div class="component-line"><div class="component-line-head"><span>${l}</span><strong class="${cls}">${v}<span class="rank-chip ${cls}">${ratingLetter(v)}</span></strong></div><div class="bar xp-bar"><span style="width:${clamp(xp/need,0,1)*100}%"></span></div></div>`} function compBox(p,l,arr){return`<div class="component-box"><div class="component-top"><span>${l}</span></div>${arr.map(a=>compLine(p,a[0],a[1])).join('')}</div>`}
function renderPlayerDetail(){const p=getPlayer(state.selectedPlayerId),s=deriveStats(p);const pos=POSITIONS.map(x=>({pos:x,score:calcPositionScore(p,x),score25:calcPositionScore25(p,x)}));document.getElementById('playerDetail').innerHTML=`<div class="detail-head"><span class="detail-face-wrap"><img class="face-blend-bg" src="${p.portrait}" alt="" aria-hidden="true"><img class="face-blend-fg" src="${p.portrait}"></span><div><h3 class="detail-name">${p.name}</h3><div class="detail-meta">${p.year}年 / ${p.height}cm / ${handLabel(p)}${isDevelopmentSquad(p)?' / <span class="dev-squad-badge">育成組</span>':''}${isPlayerAbsent(p)?` / <span class="absent-badge">${absentReasonText(p)}</span>`:''}</div><div class="personality-row">${personalityChipHtml(p)}</div><div class="mood-badge-row">${moodBadgeHtml(p.mood)}${genkiBadgeHtml(p,{size:18})}</div><div class="genki-row detail-genki">${genkiBarHtml(p)}</div><div class="special-list">${(p.special||[]).map(s=>specialChipHtml(s)).join('')}</div></div></div><div class="detail-section"><h2>① 基本パラメータ</h2><div class="stat-grid">${statBox('スパイク',s.spike)}${statBox('レシーブ',s.receive)}${statBox('ブロック',s.block)}${statBox('サーブ',s.serve)}${statBox('トス',s.toss)}${statBox('ジャンプ',s.jump)}${statBox('身長',heightPoint(p.height))}${statBox('メンタル',s.mental)}</div></div><div class="detail-section"><h2>② ポジション完成度</h2><div class="position-grid">${pos.map(o=>`<div class="position-box ${positionRankClass(o.score25,o.pos)}"><div class="position-top"><span>${o.pos}</span><strong>${formatPositionScore(o.score25)}</strong></div><div class="subline"><span class="rank-chip ${positionRankClass(o.score25,o.pos)}">${positionRatingLetter(o.score25,o.pos)}</span></div></div>`).join('')}</div></div><div class="detail-section"><h2>③ 各項目の成分データ</h2><div class="component-grid">${compBox(p,'スパイク',[['spikePower','決定力'],['spikeControl','コース打ち']])}${compBox(p,'レシーブ',[['recReception','レセプション'],['recDig','ディグ'],['recRange','守備範囲']])}${compBox(p,'ブロック',[['blockRead','リード'],['blockStuff','シャット力']])}${compBox(p,'サーブ',[['servePower','威力'],['serveControl','コントロール']])}${compBox(p,'トス',[['tossAccuracy','正確性'],['tossRead','読み']])}</div></div>`;}
function updateScoutUI(){
  const ps=document.getElementById('individualPlayerSelect');
  const its=document.getElementById('individualTrainingSelect');
  const locked=state.turnIndex>0 && state.coachAction==='individual';
  if(ps)ps.disabled=locked;
  if(its)its.disabled=locked;
}
function individualTrainingSummaryText(){
  const p=getPlayer(state.lastIndividualPlayerId||state.selectedPlayerId||state.players[0]?.id);
  const m=individualTrainingMenuById(state.lastIndividualTrainingMenu||'spikePower');
  return p?`対象：${p.name} / メニュー：${m.name}`:'対象選手を選んでください。';
}
// v104: 個別練習の選手選択・交代候補などの能力表示を、チーム画面のスタメンカードと
// 同じ「縦2行のランク表示（starterMiniGradeLine）」に統一した。
// 以前は数値のチップを1行で折り返す形で、チーム画面と見え方が揃っていなかった。
function playerMiniAbilityHtml(p){
  if(!p)return '';
  const pos=p.role||'OH';
  const posScore=calcPositionScore25(p,pos);
  const posCls=positionRankClass(posScore,pos);
  return `<div class="player-mini-eval">評価 ${pos}：<strong class="${posCls}">${positionRatingLetter(posScore,pos)}</strong></div>${starterMiniGradeLine(p)}`;
}
function individualTrainingPlayerCardHtml(p){
  const selected=(p.id===(state.lastIndividualPlayerId||state.selectedPlayerId))?'selected':'';
  const absent=isPlayerAbsent(p);
  const pos=p.role||'OH';
  const posScore=calcPositionScore25(p,pos);
  return `<button type="button" class="player-pick-card ${selected} ${absent?'disabled':''}" onclick="selectIndividualModalPlayer('${p.id}')">
    <img src="${p.portrait||'assets/new_shino.png'}" alt="">
    <div class="ppc-info"><strong>${p.name}</strong> <span class="mini-tag">${p.year}年 ${p.role}</span><br><span class="meta">${p.height}cm / ${handLabel(p)}${absent?' / '+absentReasonText(p):''}</span><span class="player-mini-eval">評価 ${pos}：<strong class="${positionRankClass(posScore,pos)}">${positionRatingLetter(posScore,pos)}</strong></span></div>
    ${starterMiniGradeLine(p)}
  </button>`;
}
function individualTrainingMenuCardHtml(m){
  const selected=(m.id===(state.lastIndividualTrainingMenu||'spikePower'))?'selected':'';
  const keys=validTrainingKeys(m);
  const detail=keys.length?keys.map(k=>compLabel(k)).join(' / '):(m.type==='omakase'?'役割に応じて自動':'総合練習');
  return `<button type="button" class="training-pick-card ${selected}" onclick="selectIndividualModalTraining('${m.id}')">
    <strong>${m.name}</strong><small>${detail}</small>
  </button>`;
}
function selectIndividualModalPlayer(id){
  const ps=document.getElementById('individualModalPlayerSelect');
  if(ps)ps.value=id;
  state.lastIndividualPlayerId=id;
  state.selectedPlayerId=id;
  renderIndividualModalPicker();
  updateIndividualModalPreview();
}
function selectIndividualModalTraining(id){
  const ts=document.getElementById('individualModalTrainingSelect');
  if(ts)ts.value=id;
  state.lastIndividualTrainingMenu=id;
  renderIndividualModalPicker();
  updateIndividualModalPreview();
}
if(typeof window!=='undefined'){window.selectIndividualModalPlayer=selectIndividualModalPlayer;window.selectIndividualModalTraining=selectIndividualModalTraining;}
function renderIndividualModalPicker(){
  const pGrid=document.getElementById('individualModalPlayerGrid');
  if(pGrid)pGrid.innerHTML=teamDisplayOrderedPlayers().map(individualTrainingPlayerCardHtml).join('');
  const tGrid=document.getElementById('individualModalTrainingGrid');
  if(tGrid)tGrid.innerHTML=coachIndividualTrainingMenus().map(individualTrainingMenuCardHtml).join('');
}

function renderIndividualTrainingCurrent(){
  const el=document.getElementById('individualTrainingCurrent');
  if(el)el.textContent=individualTrainingSummaryText();
}
function openIndividualTrainingModal(){
  const m=document.getElementById('individualTrainingModal');
  const ps=document.getElementById('individualModalPlayerSelect');
  const ts=document.getElementById('individualModalTrainingSelect');
  if(ps){
    ps.innerHTML=teamDisplayOrderedPlayers().map(p=>`<option value="${p.id}">${rosterAssignmentInfo(p).label}：${p.name} / ${p.year}年 / ${p.height}cm / ${handLabel(p)}</option>`).join('');
    ps.value=state.lastIndividualPlayerId||state.selectedPlayerId||state.players[0]?.id||'';
  }
  if(ts){
    const menus=coachIndividualTrainingMenus();
    ts.innerHTML=menus.map(m=>`<option value="${m.id}" class="menu-cat-${m.cat||'team'}">${m.name}</option>`).join('');
    ts.value=menus.some(x=>x.id===state.lastIndividualTrainingMenu)?state.lastIndividualTrainingMenu:'spikePower';
  }
  renderIndividualModalPicker();
  updateIndividualModalPreview();
  if(m){m.classList.remove('hidden');m.style.display='flex';}
}
function updateIndividualModalPreview(){
  const ps=document.getElementById('individualModalPlayerSelect');
  const ts=document.getElementById('individualModalTrainingSelect');
  const p=getPlayer(ps?.value||state.lastIndividualPlayerId||state.selectedPlayerId);
  const menu=individualTrainingMenuById(ts?.value||state.lastIndividualTrainingMenu||'spikePower');
  const box=document.getElementById('individualModalPreview');
  if(box)box.innerHTML='';
}
function confirmIndividualTrainingModal(){
  const ps=document.getElementById('individualModalPlayerSelect');
  const ts=document.getElementById('individualModalTrainingSelect');
  if(ps?.value){state.lastIndividualPlayerId=ps.value;state.selectedPlayerId=ps.value;}
  if(ts?.value)state.lastIndividualTrainingMenu=individualTrainingMenuById(ts.value).id;
  state.coachAction='individual';
  state.lastActionPromptKey=actionPromptKey();
  closeIndividualTrainingModal();
  managerSay(`個別練習を設定しました。${individualTrainingSummaryText()}`);
  if(monthTransitionLocked())updateMonthTransitionModal();
  renderAll();
  saveState();
}
function closeIndividualTrainingModal(){
  const m=document.getElementById('individualTrainingModal');
  if(m){m.classList.add('hidden');m.style.display='';}
}
function renderTrainingControls(){
  const ts=document.getElementById('teamTrainingSelect'),its=document.getElementById('individualTrainingSelect'),ps=document.getElementById('individualPlayerSelect');
  if(ts)ts.innerHTML=regularTrainingMenus.map(m=>`<option value="${m.id}" class="menu-cat-${m.cat||'team'}">${m.name}</option>`).join('');
  if(its)its.innerHTML=coachIndividualTrainingMenus().map(m=>`<option value="${m.id}" class="menu-cat-${m.cat||'team'}">${m.name}</option>`).join('');
  if(ps)ps.innerHTML=teamDisplayOrderedPlayers().map(p=>`<option value="${p.id}">${rosterAssignmentInfo(p).label}：${p.name}</option>`).join('');
  if(ts)ts.value=regularTrainingMenus.some(m=>m.id===state.lastTrainingMenu)?state.lastTrainingMenu:'omakase';
  if(its)its.value=coachIndividualTrainingMenus().some(m=>m.id===state.lastIndividualTrainingMenu)?state.lastIndividualTrainingMenu:'spikePower';
  if(ps)ps.value=state.lastIndividualPlayerId||state.selectedPlayerId||state.players[0]?.id||'';
  const eq=document.getElementById('equipmentLevelSelect');if(eq)eq.value=state.equipmentLevel||0;
  if(document.getElementById('coachActionSelect'))document.getElementById('coachActionSelect').value=state.coachAction||'individual';
  if(document.getElementById('scoutRegionSelect'))document.getElementById('scoutRegionSelect').value=state.scoutRegion||'関東';
  if(document.getElementById('scoutPositionSelect'))document.getElementById('scoutPositionSelect').value=state.scoutPosition||'OH';
  updateScoutUI();
  renderIndividualTrainingCurrent();
}
function renderCoachPanel(){
  const decided=hasCoachActionDecision();
  const selected=decided?(state.coachAction||''):'';
  document.querySelectorAll('.coach-action-btn').forEach(btn=>{btn.classList.toggle('active', btn.dataset.coachAction===selected);btn.disabled=state.turnIndex>0 || (btn.dataset.coachAction==='director'&&!directorActivityAvailable());});
  const badge=document.getElementById('coachActionBadge');
  if(badge)badge.textContent=decided?coachActionLabel(selected):'未決定';
  const summary=document.getElementById('coachActionSummary');
  if(summary){
    if(state.turnIndex>0&&selected==='individual')summary.textContent='1週目に個別練習を選んだため、2週目以降は対象選手・練習メニューを変更できず、自動的に同じ個別練習を行います。';
    else if(!decided)summary.textContent='今月の第1週目に行う監督行動を選んでください。未決定のまま「次週に進む」を押すと、確認のうえ個別練習を実行します。';
    else if(selected==='scout')summary.textContent=`第1週目にスカウトを行います。地域：${state.scoutRegion||'関東'} / ポジション：${state.scoutPosition||'OH'}。${scoutRegionTraitText(state.scoutRegion||'関東')}`;
    else if(selected==='individual')summary.textContent=`第1週目に個別練習を行います。${individualTrainingSummaryText()}`;
    else if(selected==='recreation')summary.textContent='第1週目にレクリエーションを行います。チーム全員の調子改善を狙います。';
    else if(selected==='pro_watch')summary.textContent='第1週目にプロの試合見学を行います。特殊能力のヒント獲得を狙います。';
    else if(selected==='director'){
      const p=currentDirectorPlace();
      summary.textContent=p?`第1週目に監督活動を行います。訪問先：${p.label}。${p.help}`:'新設校の間は監督活動は行えません。';
    }
  }
  renderCoachStatusCard();
  const scoutSettings=document.getElementById('coachScoutSettings');
  if(summary&&schoolClassDropRiskText())summary.textContent += ` ${schoolClassDropRiskText()}`;
  if(scoutSettings)scoutSettings.style.display=selected==='scout'?'grid':'none';
  const directorSettings=document.getElementById('coachDirectorSettings');
  if(directorSettings){directorSettings.style.display=selected==='director'?'grid':'none';refreshDirectorVisitSelects();}
}



function scoreBadgeHtml(scoreText){
  const m=String(scoreText||'').match(/(\d+)\s*[-対]\s*(\d+)/);
  if(!m)return scoreText||'';
  return `<span class="score-badge"><span class="score-own">${m[1]}</span><span class="score-sep">対</span><span class="score-opp">${m[2]}</span></span>`;
}
function matchLineSideFromHtml(text){
  const s=String(text||'');
  if(s.includes('match-side-own'))return 'own';
  if(s.includes('match-side-opp'))return 'opp';
  const own=s.includes('own-name');
  const opp=s.includes('opp-name');
  if(own&&!opp)return 'own';
  if(opp&&!own)return 'opp';
  return 'neutral';
}
function playLineHtml(text, kind='play'){
  const side=matchLineSideFromHtml(text);
  return `<div class="match-play-line ${kind} match-narration-line match-side-${side}">${text}</div>`;
}
function resultLineHtml(text, score=''){
  const ownPoint=currentLastPointOwn===true;
  const side=ownPoint?'own':'opp';
  return `<div class="match-result-line match-side-${side}"><span class="match-result-text">${pointResultText(text,ownPoint)}</span>${score?scoreBadgeHtml(score):''}</div>`;
}


function resultName(raw){
  return String(raw||'').replace('！！','');
}

function receptionNarrative(team,p,q){
  const n=nameSpan(team.name,p.name);
  if(q==='A')return `${n}、正面で受け止めてAカット。`;
  if(q==='B')return `${n}が拾ってBカット。`;
  if(q==='崩れ')return `${n}がなんとか上げる。返球は崩れた。`;
  if(q==='チャンス返球')return `${n}の返球はチャンスボール。`;
  if(q==='サービスエース')return `${n}、触るのが精一杯。サービスエース！`;
  return `${n}のレシーブ。${q}`;
}
function commentaryPick(lines){
  return randomChoice(lines);
}
function attackNarrative(team,p,q){
  const n=nameSpan(team.name,p.name);
  const own=isOwnTeamName(team.name);
  if(q==='崩れ')return own?`崩れた体勢から、${n}が打つ。`:`崩れた体勢から${n}が打ってくる。`;
  if(q==='A'&&p?.role==='MB')return own?`${n}、速いクイック！`:`${n}、速いクイック。`;
  return own?`${n}のスパイク！`:`${n}がスパイク。`;
}
function twoAttackNarrative(team,p){
  const n=nameSpan(team.name,p.name);
  return isOwnTeamName(team.name)?`${n}、意表を突くツーアタック！`:`${n}がツーアタックを狙ってくる。`;
}
function blockNarrative(team,p,br){
  const r=resultName(br);
  const n=nameSpan(team.name,p.name);
  const own=isOwnTeamName(team.name);
  if(r==='シャットアウト'){
    return own
      ? commentaryPick([`${n}が完全に止めた。シャットアウト！`, `${n}、読んでいた！真っ向から止める！`, `${n}のブロックが決まった！`])
      : commentaryPick([`${n}のブロックに捕まった！`, `${ownSchoolShortName()}の攻撃、${n}に止められた！`, `相手ブロックが決まる。${ownSchoolShortName()}、ここは止められた。`, `これは痛い！${n}のブロックに捕まった！`]);
  }
  if(r==='ワンタッチ')return own?`${n}のブロック、ワンタッチ。`:`${n}のブロックに触られた。ワンタッチ。`;
  if(r==='通常突破')return own?`${n}のブロックを越えていく。`:`${n}のブロックを越えた。`;
  if(r==='完全突破')return own?`${n}のブロックを大きく突破。`:`ブロックを大きく突破した。`;
  if(r==='ノータッチ級')return own?`${n}、反応できない。ノータッチ級。`:`${n}は反応できない。ノータッチ級。`;
  return own?`${n}のブロック：${r}`:`${n}のブロック：${r}`;
}
function digNarrative(team,p,res){
  // v104: 守備範囲の穴（内部的には coverageGapPlayer）は「空白ゾーン」という内部用語で
  // 名前欄に入ってくる。プレーの描写として自然な文に置き換える。
  if(p&&p.id==='__coverage_gap__'){
    const ownGap=isOwnTeamName(team.name);
    if(res==='失点')return ownGap?'選手と選手の間に落ちた。誰も届かない。':'相手の間に落ちる。拾われない。';
    return ownGap?'誰も入れず、ぎりぎりで触るのがやっとだった。':'相手コートで、誰も入れなかった。';
  }
  const n=nameSpan(team.name,p.name);
  const own=isOwnTeamName(team.name);
  if(res==='A返球')return own?`${n}が拾った。A返球でつなぐ。`:`${n}にA返球で拾われた。`;
  if(res==='B返球')return own?`${n}が拾ってB返球。`:`${n}が拾ってB返球。`;
  if(res==='崩れ')return own?`${n}がなんとか拾う。返球は崩れた。`:`${n}がなんとか拾う。返球は崩れた。`;
  if(res==='失点')return own?`${n}、届かない。`:`${n}、届かない。`;
  return own?`${n}のレシーブ：${res}`:`${n}のレシーブ：${res}`;
}
function rallyContinueNarrative(team,res){
  const own=isOwnTeamName(team.name);
  // v212: 実況の校名は学校名の変更に追従させる（Tak指示）。
  const S=ownSchoolName();
  if(res==='A返球')return own?`${S}、A返球から攻撃を組み立てる。`:'A返球で立て直された。';
  if(res==='B返球')return own?`${S}、B返球から攻撃へ。`:'B返球から攻撃へ。';
  return own?`${S}、崩れた返球から立て直す。`:'崩れた返球から立て直す。';
}
function pointResultText(reason, ownPoint=currentLastPointOwn){
  const s=String(reason||'得点');
  // v212: 実況に直書きしていた「若葉」「若葉高校」を、いま設定されている学校名に差し替える（Tak指示）。
  // v213: 学校名を名前と種別に分けたので、元の文章どおり短い呼び方（S）と正式名称（F）を使い分ける。
  const S=ownSchoolShortName(), F=ownSchoolName();
  if(ownPoint){
    if(s.includes('シャットアウト'))return commentaryPick(['シャットアウトで取り切った！',`${S}のブロックが決まった！`,`ここは${S}がネット際で止めた！`]);
    if(s.includes('サービスエース'))return commentaryPick(['サービスエース！','サーブで崩した、そのまま決まった！']);
    if(s.includes('サーブミス'))return `サーブミス。${F}に1点。`;
    if(s.includes('スパイクミス')||s.includes('ツーアタックミス'))return `攻撃ミス。${F}に1点。`;
    if(s.includes('ノータッチ'))return commentaryPick(['ノータッチで決まった！',`動けない。${S}の一撃！`]);
    if(s.includes('フェイント'))return commentaryPick(['フェイントが決まった！',`うまく落とした。${S}の得点！`]);
    if(s.includes('ブロックアウト'))return 'ブロックアウトで得点！';
    if(s.includes('ツーアタック'))return commentaryPick(['ツーアタックが決まった！',`意表を突いた。${S}のツーアタック！`]);
    if(s.includes('スパイク'))return commentaryPick(['スパイクが決まった！',`${S}、打ち切った！`,'コートに叩き込んだ！']);
    return s;
  }
  if(s.includes('シャットアウト'))return commentaryPick([`${S}、シャットアウトを食らった！`, `${S}の攻撃、ブロックに捕まった。`, `ブロックが決まる。${S}、止められた。`, `これは痛い。${S}、シャットアウトを食らった！`]);
  if(s.includes('サービスエース'))return commentaryPick(['サーブが決まった。サービスエース！',`${S}、サーブで崩された！`,'強いサーブ、返せない。']);
  if(s.includes('サーブミス'))return `${F}のサーブミス。相手に1点。`;
  if(s.includes('スパイクミス'))return commentaryPick([`${S}のスパイクミス。相手に1点。`,`${S}、スパイクがアウト。相手に1点。`,`スパイクを打ち切れない。${S}の攻撃ミス。`]);
  if(s.includes('ツーアタックミス'))return commentaryPick([`${S}のツーアタックミス。相手に1点。`,`ツーアタックが外れた。${S}の攻撃ミス。`]);
  if(s.includes('ノータッチ'))return commentaryPick(['一撃、ノータッチで決まった！',`${S}、反応できない。強打が決まる！`]);
  if(s.includes('フェイント'))return commentaryPick([`フェイントを落とされた。${S}、追いつけない！`,`フェイントが決まる。${S}、前に出られない。`]);
  if(s.includes('ブロックアウト'))return commentaryPick(['ブロックアウトを取られた！',`${S}のブロックに当てられた。相手の得点。`]);
  if(s.includes('ツーアタック'))return commentaryPick(['ツーアタックが決まった！',`${S}、ツーアタックへの反応が遅れた。`]);
  if(s.includes('スパイク'))return commentaryPick(['スパイクが決まった！',`${S}、拾い切れない。相手の得点。`,`打ち切られた。${S}、ここは止められない。`]);
  return s;
}


function isMatchCalculationLogLine(line){
  const s=String(line||'');
  if(!s)return false;
  if(s.includes('ランダム補正バランス'))return true;
  if(s.includes('配球判定：'))return true;
  if(s.includes('ツーアタック選択：'))return true;
  if(s.startsWith('結果：'))return true;
  if(s.includes('試合集計'))return true;
  if(s.includes('チャンス返球：'))return true;
  if(s.includes('ラリー継続：'))return true;
  if(s.includes('累積')||s.includes('累計'))return true;
  const calcPatterns=[
    'サーブミス判定：','サーブ値：','受け手選択：','レセプション判定：',
    'トス判定：','攻撃値：','ブロック値：','攻撃差：','ディグ対象：','ディグ判定：',
    'スパイクミス判定：','ツーアタック攻撃値：','ツーアタックブロック値：',
    'ツーアタックのスパイクミス判定：','ツーアタック：ブロック無し',
    '長期ラリー判定：','シャットアウト回避フェイント判定：','フェイント攻撃：','フェイントディグ判定：'
  ];
  return calcPatterns.some(p=>s.includes(p));
}
function visibleMatchLogLines(){
  return (state.matchLog||[]).filter(x=>!isMatchCalculationLogLine(x));
}


function matchLogSide(line){
  const s=String(line||'');
  if(s.includes('match-side-own')||s.includes('own-name'))return 'own';
  if(s.includes('match-side-opp')||s.includes('opp-name'))return 'opp';
  return 'neutral';
}
function matchLogEntryHtml(line){
  const side=matchLogSide(line);
  return `<div class="match-chat-entry ${side}"><div class="match-chat-bubble">${line}</div></div>`;
}
function renderLogs(){
  const tr=document.getElementById('trainingLog');
  if(tr)tr.innerHTML=state.trainingLog.slice(-120).map(x=>`<div class="log-entry">${managerLogEntry(x)}</div>`).join('');
  const ml=document.getElementById('matchLog');
  if(ml){
    ml.innerHTML=visibleMatchLogLines().map(x=>matchLogEntryHtml(x)).join('');
    ml.scrollTop=ml.scrollHeight;
  }
}
function compLabel(k){return {spikePower:'スパイク決定力',spikeControl:'コース打ち',recReception:'レセプション',recDig:'ディグ',recRange:'守備範囲',blockRead:'ブロックリード',blockStuff:'シャット力',servePower:'サーブ威力',serveControl:'サーブ制球',tossAccuracy:'トス正確性',tossRead:'トス読み',jump:'ジャンプ',stamina:'スタミナ',mental:'メンタル'}[k]||k;} 
function positionTrainingWeights(role){
  const map={
    OH:{spikePower:4,spikeControl:3,recReception:2,recDig:2,recRange:2,serveControl:1,jump:1},
    MB:{blockStuff:4,blockRead:3,jump:2,spikePower:2,spikeControl:1,servePower:1,stamina:1,mental:1},
    OP:{spikePower:4,blockStuff:3,servePower:2,jump:2,spikeControl:1,blockRead:1,mental:1,stamina:1},
    S:{tossAccuracy:4,tossRead:4,serveControl:2,mental:2,recReception:1,recDig:1,stamina:1},
    L:{recReception:4,recDig:4,recRange:3,mental:2,stamina:1,serveControl:1}
  };
  return map[role]||map.OH;
}
function omakaseEffects(player, multiplier){
  const weights=positionTrainingWeights(player.role);
  const total=Object.values(weights).reduce((a,b)=>a+b,0);
  const effects={};
  Object.entries(weights).forEach(([k,w])=>{
    effects[k]=Math.max(1, Math.round(15*w/total*multiplier));
  });
  return effects;
}



function eventLogLine(player,key,xp){
  if(!player||!player.comps||!player.comps[key])return '';
  if(isJapanRepAbsentPlayer(player))return '';
  xp=applyTalentXp(player,key,xp,'event');
  const before=player.comps[key];
  const delta=addXpDelta(player,key,xp);
  const after=player.comps[key];
  if(!delta)return '';
  const cls=delta>0?'level-up':'level-down';
  return `${nameSpan('若葉高校',player.name)}：${compLabel(key)} <span class="${cls}">${abilityChangeHtml(before,after,key)}</span>`;
}
function addEventXp(logs, player, entries){
  if(!player||isPlayerAbsent(player))return;
  for(const [key,xp] of entries){
    const line=eventLogLine(player,key,xp);
    if(line)logs.push(line);
  }
}
// v172: 練習系イベントは、評価（ランク）が動かないと結果行が1つも出ず、
//       「結果を見る」自体が現れないため何が起きたか分からなかった（Tak指示）。
//       ランクが動いたときは従来どおりの変化行、動かなかったときも「伸びました」の1行を必ず残す。
//       eventLogLine は内部で経験点を加算するので、ここで二重加算にはならない。
function addEventXpVerbose(logs, player, entries){
  if(!player||isPlayerAbsent(player))return;
  for(const [key,xp] of entries){
    const line=eventLogLine(player,key,xp);
    if(line){logs.push(line);continue;}
    if(!player.comps||!player.comps[key])continue;
    if(isJapanRepAbsentPlayer(player))continue;
    logs.push(`<span class="ev-effect">${nameSpan('若葉高校',player.name)}：${compLabel(key)} が伸びました。</span>`);
  }
}
function eventHeightLogLine(player,xp){
  if(!player)return '';
  if(isPlayerAbsent(player))return '';
  xp=applyTalentXp(player,'height',xp,'event');
  const before=player.height;
  const delta=addHeightXpDelta(player,xp);
  if(!delta)return '';
  const cls=delta>0?'level-up':'level-down';
  return `${nameSpan('若葉高校',player.name)}：身長 <span class="${cls}">${before}cm→${player.height}cm</span>`;
}
function legendaryAcupunctureSelectHtml(){
  const options=['<option value="">実行しない</option>'].concat(availablePlayers().map(p=>`<option value="${p.id}">${p.name} / ${p.year}年 / ${p.role} / ${p.height}cm</option>`)).join('');
  return `<div class="growth-manager">${managerLine('伝説の鍼師に治療してもらう選手を選んでください。')}</div>
    <div class="growth-item">実行しない選択も可能です。</div>
    <div class="acupuncture-select-box top-gap">
      <label class="mini-label">治療対象</label>
      <select id="legendaryAcupuncturePlayerSelect" class="starter-select">${options}</select>
      <button type="button" class="primary small" onclick="window.confirmLegendaryAcupunctureSelection()">決定</button><button type="button" class="ghost small" onclick="window.skipLegendaryAcupuncture()">今回は見送る</button>
    </div>
    <div class="hint top-gap">効果は選手決定後に確率で発生します。</div>`;
}
function enqueueLegendaryAcupunctureSelectionPopup(){
  // v117: 選ぶまで閉じられないようにする。見送る選択肢は legendaryAcupunctureSelectHtml 側に用意した。
  enqueueImportantPopup('伝説の鍼師の治療イベント', legendaryAcupunctureSelectHtml(), 'event', 'legendary_acupuncture', {requireChoice:true});
}
// v117: 伝説の鍼師を見送る。
window.skipLegendaryAcupuncture=function(){
  const logs=[];
  applyLegendaryAcupunctureResult(null,logs);
  if(Array.isArray(state.trainingLog))state.trainingLog.push(...logs);
  finishEventChoiceUI();
  closeImportantPopup(true);
  managerSay('伝説の鍼師の治療は見送りました。');
  renderAll();saveState();
};
function applyLegendaryAcupunctureResult(p, logs){
  if(!p){
    logs.push('伝説の鍼師の治療は実行しませんでした。');
    return;
  }
  logs.push(`${nameSpan('若葉高校',p.name)}が伝説の鍼師の治療を受けました。`);
  const r=Math.random();
  if(r<0.20){
    const line=eventHeightLogLine(p,300);
    if(line)logs.push(line);
    logs.push('治療の結果、身長に変化がありました。');
  }else if(r<0.50){
    const before=p.mood||0;
    p.mood=clamp(before+2,-2,2);
    logs.push(`${nameSpan('若葉高校',p.name)}：調子 ${moodInfo(before).label}→${moodInfo(p.mood).label}`);
  }else if(r<0.65){
    addEventXp(logs,p,nonHeightEntries(150));
    logs.push('治療の結果、能力に変化がありました。');
  }else if(r<0.70){
    const line=eventHeightLogLine(p,-300);
    if(line)logs.push(line);
    logs.push('治療は裏目に出て、身長に悪影響が出ました。');
  }else if(r<0.75){
    addEventXp(logs,p,nonHeightEntries(-100));
    logs.push('治療は裏目に出て、能力に悪影響が出ました。');
  }else if(r<0.85){
    const sp=pickGoldSpecialForRecruit(p);
    if(sp&&grantSpecialIfEligible(p,sp,'伝説の鍼師の治療'))logs.push(`${nameSpan('若葉高校',p.name)}が金の特殊能力 ${specialChipHtml(sp)} を取得しました。`);
    else logs.push(`${nameSpan('若葉高校',p.name)}は取得条件を満たす金の特殊能力がありませんでした。`);
  }else{
    const sp=pickNormalSpecialForRecruit(p);
    if(sp&&grantSpecialIfEligible(p,sp,'伝説の鍼師の治療'))logs.push(`${nameSpan('若葉高校',p.name)}が通常特殊能力 ${specialChipHtml(sp)} を取得しました。`);
    else logs.push(`${nameSpan('若葉高校',p.name)}は取得条件を満たす通常特殊能力がありませんでした。`);
  }
}
window.confirmLegendaryAcupunctureSelection=function(){
  const id=document.getElementById('legendaryAcupuncturePlayerSelect')?.value||'';
  const p=id?state.players.find(x=>x.id===id):null;
  const logs=[];
  applyLegendaryAcupunctureResult(p,logs);
  state.trainingLog.push(...logs);
  managerSay(p?`${p.name}が伝説の鍼師の治療を受けました。`:'伝説の鍼師の治療は実行しませんでした。');
  finishEventChoiceUI();   // v131
  closeImportantPopup(true);
  enqueueImportantPopup('伝説の鍼師 結果', eventHiddenResultHtml(logs.map(x=>`<div class="growth-item">${x}</div>`).join(''),'結果を見る'), 'event', 'legendary_acupuncture');
  renderAll();
  saveState();
};
function applyLegendaryAcupunctureEvent(logs){
  logs.push('伝説の鍼師が治療に来ました。治療対象の選択待ちです。');
}
function makeoverPortraitOptions(player, count=5){
  const basePool=hasExclusivePortraitTalent(player)
    ? [...RECRUIT_PORTRAIT_POOL,...EXCLUSIVE_TALENT_PORTRAITS]
    : [...RECRUIT_PORTRAIT_POOL];
  const pool=basePool.filter(src=>
    src &&
    src!==player?.portrait &&
    !portraitUsedByAnotherPlayer(src,player?.id)
  );
  const picked=[];
  while(picked.length<count && pool.length){
    const src=randomChoice(pool);
    if(!picked.includes(src))picked.push(src);
    const idx=pool.indexOf(src);
    if(idx>=0)pool.splice(idx,1);
  }
  return picked;
}
function enqueueMakeoverAdvicePopup(player){
  if(!player)return;
  const options=makeoverPortraitOptions(player,5);
  state.pendingMakeover={playerId:player.id, options};
  const choices=options.map((src,i)=>`<button type="button" class="makeover-choice" onclick="window.confirmMakeoverChoice('${src}')"><img src="${src}" alt=""><span>候補${i+1}</span></button>`).join('');
  enqueueImportantPopup('美容院でイメチェン相談', `<div class="growth-manager">${managerLine(`${player.name}さんが美容院でイメチェンするか悩んでいます。監督、アドバイスしてあげましょう。`)}</div><div class="makeover-current"><img src="${player.portrait}" alt=""><div><strong>現在の顔グラ</strong><br>${nameSpan('若葉高校',player.name)}</div></div><div class="makeover-grid">${choices}<button type="button" class="makeover-choice no-change" onclick="window.confirmMakeoverChoice('')"><span>変えない</span></button></div>`, 'event','personal_change', {requireChoice:true});
}
window.confirmMakeoverChoice=function(src){
  const p=state.players.find(x=>x.id===state.pendingMakeover?.playerId);
  const logs=[];
  if(!p){
    logs.push('イメチェン相談は終了しました。');
  }else if(!src){
    logs.push(`${nameSpan('若葉高校',p.name)}は今回はイメチェンを見送りました。`);
  }else if(isExclusiveTalentPortrait(src) && !hasExclusivePortraitTalent(p)){
    logs.push(`${nameSpan('若葉高校',p.name)}はその専用顔グラの対象ではありません。`);
  }else if(portraitUsedByAnotherPlayer(src,p.id)){
    logs.push('その顔グラは別の選手が使用中のため、変更できませんでした。');
  }else{
    const before=p.portrait;
    p.portrait=src;
    logs.push(`${nameSpan('若葉高校',p.name)}が美容院でイメチェンしました。`);
    logs.push(`<div class="makeover-current"><img src="${before}" alt=""><span>変更前</span><img src="${src}" alt=""><span>変更後</span></div>`);
  }
  state.pendingMakeover=null;
  state.trainingLog.push(...logs);
  finishEventChoiceUI();   // v131: 選択が済んだので閉じられる状態に戻す
  closeImportantPopup(true);
  enqueueImportantPopup('イメチェン結果', logs.map(x=>`<div class="growth-item">${x}</div>`).join(''), 'event','personal_change');
  renderAll();
  saveState();
};
function applyMakeoverAdviceEvent(logs){
  const p=randomChoice(state.players);
  if(!p)return;
  logs.push(`${nameSpan('若葉高校',p.name)}が美容院でイメチェンするか悩んでいます。監督がアドバイスできます。`);
  enqueueMakeoverAdvicePopup(p);
}
function isJapanRepActive(){return !!(state.japanRep&&state.japanRep.active&&state.japanRep.playerId);}
function isJapanRepAbsentPlayer(p){return !!(p&&isJapanRepActive()&&state.japanRep.playerId===p.id);}

function isStudyAbroadAbsentPlayer(p){
  return !!(p&&state.studyAbroad&&state.studyAbroad.playerId===p.id);
}
function isPlayerAbsent(p){
  return isJapanRepAbsentPlayer(p)||isStudyAbroadAbsentPlayer(p);
}
function activeRosterPlayers(){
  return (state.players||[]).filter(p=>!isPlayerAbsent(p));
}
function absentReasonText(p){
  if(isStudyAbroadAbsentPlayer(p))return `バレー留学中（${state.studyAbroad.city}）`;
  if(isJapanRepAbsentPlayer(p))return '日本代表活動中';
  return '';
}

function availablePlayers(){return activeRosterPlayers();}
function samplePlayers(n, filter=()=>true){
  const arr=availablePlayers().filter(filter);
  const picked=[];
  while(arr.length && picked.length<n){
    const i=randomInt(0,arr.length-1);
    picked.push(arr.splice(i,1)[0]);
  }
  return picked;
}
function topPlayerByStat(statKey, filter=()=>true){
  const arr=availablePlayers().filter(filter);
  return arr.sort((a,b)=>(deriveStats(b)[statKey]||getVal(b,statKey)||0)-(deriveStats(a)[statKey]||getVal(a,statKey)||0))[0]||availablePlayers()[0]||state.players[0];
}
function applyTeamMood(delta, logs, count=999){
  samplePlayers(count).forEach(p=>{
    const before=p.mood||0;
    p.mood=clamp(before+delta,-2,2);
    if(before!==p.mood)logs.push(`${nameSpan('若葉高校',p.name)}：調子 ${moodInfo(before).label}→${moodInfo(p.mood).label}`);
  });
}
function nonHeightEntries(xp){
  return COMP_KEYS.map(k=>[k,typeof xp==='function'?xp(k):xp]);
}
function candidateSeniorSpecials(retirees, gold=false){
  const set=new Set();
  (retirees||[]).forEach(p=>(p.special||[]).forEach(s=>{if(isGoldSpecial(s)===gold)set.add(s);}));
  return [...set];
}
function grantInheritedSpecialFromSeniors(target, retirees, gold, logs){
  const pool=candidateSeniorSpecials(retirees,gold).filter(s=>!target.special.includes(s)&&canObtainSpecial(target,s));
  if(!pool.length)return false;
  const sp=randomChoice(pool);
  target.special.push(sp);
  logs.push(`${nameSpan('若葉高校',target.name)}が3年生から ${specialChipHtml(sp)} を受け継ぎました。`);
  return true;
}
function applyThirdYearRetirementLegacy(retirees, logs){
  const seconds=state.players.filter(p=>p.year===2);
  if(!seconds.length||!retirees||!retirees.length)return;
  logs.push('<strong>3年生の引退イベント</strong>');
  seconds.forEach(p=>{
    const r=Math.random();
    if(r<0.50){
      addEventXp(logs,p,nonHeightEntries(()=>randomInt(0,20)));
    }else if(r<0.75){
      addEventXp(logs,p,nonHeightEntries(()=>randomInt(10,30)));
    }else if(r<0.95){
      logs.push(`${nameSpan('若葉高校',p.name)}は先輩の背中を静かに見送りました。`);
    }else if(r<0.99){
      grantInheritedSpecialFromSeniors(p,retirees,false,logs) || logs.push(`${nameSpan('若葉高校',p.name)}は取得条件を満たす通常特殊能力がありませんでした。`);
    }else{
      grantInheritedSpecialFromSeniors(p,retirees,true,logs) || logs.push(`${nameSpan('若葉高校',p.name)}は取得条件を満たす金特殊能力がありませんでした。`);
    }
  });
}


function hasReachedInterhighBest4ForJapanRep(){
  return state.interhighBest4Year===state.year;
}
function japanRepEventKey(){return `${state.year}-japan-rep`;}
function japanRepReturnEventKey(){return `${state.year}-japan-rep-return`;}

// v143: 尺度がポジション別になったので、素点ではなく「そのポジションの尺度で最も高い評価」で選ぶ。
function bestPositionLetter(p){
  const ORDER=['G','F','E','D','C','B','A','S'];
  return POSITIONS.map(pos=>positionRatingLetter(calcPositionScore25(p,pos),pos))
    .reduce((a,b)=>ORDER.indexOf(b)>ORDER.indexOf(a)?b:a,'G');
}
function japanRepCandidates(){
  return availablePlayers().filter(p=>['A','S'].includes(bestPositionLetter(p)));
}
function applyJapanRepSelectionEvent(logs){
  const key=japanRepEventKey();
  if(state.japanRepSelectionKey===key){logs.push('今年度はすでに日本代表選出イベントが発生済みです。');return;}
  const candidates=japanRepCandidates();
  if(!candidates.length){logs.push('ポジション評価A以上の選手がいないため、日本代表選出はありませんでした。');return;}
  const p=randomChoice(candidates);
  state.japanRepSelectionKey=key;
  state.japanRep={playerId:p.id,playerName:p.name,year:state.year,active:true,returnKey:japanRepReturnEventKey()};
  logs.push(`${nameSpan('若葉高校',p.name)}が日本代表候補に選出されました。10月4週までチームを離れ、チームの練習やイベントの対象から外れます。`);
}
function applyJapanRepReturnEvent(logs){
  if(!isJapanRepActive())return false;
  const key=japanRepReturnEventKey();
  if(state.japanRepReturnKey===key)return false;
  const p=state.players.find(x=>x.id===state.japanRep.playerId);
  if(!p){state.japanRep.active=false;state.japanRepReturnKey=key;return false;}
  logs.push(`<strong>日本代表凱旋</strong>`);
  logs.push(`${nameSpan('若葉高校',p.name)}が日本代表活動から戻ってきました。代表での経験が、身長以外のすべての力になって返ってきます。`);
  addEventXp(logs,p,nonHeightEntries(150));
  const pool=[...(GOLD_SPECIAL_POOL[p.role]||[]),...Object.values(GOLD_SPECIAL_POOL).flat()].filter((s,i,a)=>a.indexOf(s)===i).filter(s=>!p.special.includes(s)&&canObtainSpecial(p,s));
  if(pool.length){
    const sp=randomChoice(pool);
    p.special.push(sp);
    logs.push(`${nameSpan('若葉高校',p.name)}が代表経験により金特殊能力 ${specialChipHtml(sp)} を取得しました。`);
  }else{
    logs.push(`${nameSpan('若葉高校',p.name)}は取得条件を満たす金特殊能力がありませんでした。`);
  }
  state.japanRep.active=false;
  state.japanRepReturnKey=key;
  state.lastTeamEventTurnKey=turnEventKey();
  enqueueImportantPopup('日本代表凱旋', `<div class="growth-manager">${managerLine(`${p.name}が日本代表活動から戻ってきました！`)}</div>${eventHiddenResultHtml('<div class="growth-item">身長以外のすべての能力が大きく伸びました。</div>','結果を見る')}`, 'event','multi_event');
  return true;
}
// v101: 文化祭の分岐は scoutSuccessThreshold()（スカウトの大成功判定用 0.95〜0.99）を
// 流用していた。無関係な値なので専用の定数に分けた。値は従来と同じ 0.95 相当。
const CULTURE_FESTIVAL_SPECIAL_CHANCE=0.95;
const TURN_EVENTS=[
  {name:'朝練の自主参加', weight:12, effect(logs){const list=samplePlayers(randomInt(2,4));if(!list.length){logs.push('<span class="ev-effect">今回は朝練に参加できる選手がいませんでした。</span>');return;}list.forEach(p=>addEventXpVerbose(logs,p,[['jump',8],['mental',8]]));}},
  {name:'居残りスパイク練習', weight:11, effect(logs){const list=samplePlayers(randomInt(1,3),p=>['OH','OP','MB'].includes(p.role));if(!list.length){logs.push('<span class="ev-effect">今回は居残り練習の対象になる選手がいませんでした。</span>');return;}list.forEach(p=>addEventXpVerbose(logs,p,[['spikePower',18],['spikeControl',12]]));}},
  {name:'サーブ100本チャレンジ', weight:10, effect(logs){availablePlayers().forEach(p=>addEventXpVerbose(logs,p,[['serveControl',10]]));availablePlayers().filter(p=>(p.special||[]).includes('ジャンプサーブ')).forEach(p=>addEventXpVerbose(logs,p,[['servePower',14]]));}},
  {name:'レシーブ強化日', weight:10, effect(logs){availablePlayers().forEach(p=>addEventXp(logs,p,[['recReception',10],['recDig',10]]));samplePlayers(2).forEach(p=>{const b=p.mood;p.mood=clamp(p.mood-1,-2,2);if(b!==p.mood)logs.push(`${nameSpan('若葉高校',p.name)}：疲労で調子 ${moodInfo(b).label}→${moodInfo(p.mood).label}`);});}},
  {name:'新マネージャーの分析ノート', weight:7, effect(logs){samplePlayers(5).forEach(p=>addEventXp(logs,p,[['mental',8],['blockRead',8],['tossRead',8]]));state.eventTrainingBuff={cat:'analysis_read',turns:4,mult:1.08,label:'分析ノート'};logs.push('4週間、リード・読み・守備範囲系の練習が少し伸びやすくなります。');}},
  {name:'体育館の床ワックスがけ', weight:8, effect(logs){state.eventTrainingBuff={cat:'receive',turns:4,mult:1.10,label:'床ワックス'};logs.push('4週間、レセプション・ディグ・守備範囲の練習が伸びやすくなります。');}},
  {name:'強豪校との合同練習', weight:5, effect(logs){availablePlayers().forEach(p=>addEventXp(logs,p,[['spikePower',10],['recDig',10],['blockRead',8],['mental',8]]));samplePlayers(2).forEach(p=>{if(Math.random()<.45){const b=p.mood;p.mood=clamp(p.mood-1,-2,2);if(b!==p.mood)logs.push(`${nameSpan('若葉高校',p.name)}：合同練習疲れで調子 ${moodInfo(b).label}→${moodInfo(p.mood).label}`);}});}},
  // v172: メンタル向上を廃止。結果行を作らないので「結果を見る」も出ない（Tak指示）。
  {name:'練習試合の誘い', weight:5, effect(logs){state.eventPracticeMatchOffer=true;logs.push(practiceMatchOfferHtml());}},
  {name:'セッター特訓日', weight:9, effect(logs){const s=topPlayerByStat('toss',p=>p.role==='S'||p.id===(state.starterIds||[])[3]);if(!s){logs.push('<span class="ev-effect">今回はセッター特訓の対象になる選手がいませんでした。</span>');return;}addEventXpVerbose(logs,s,[['tossAccuracy',26],['tossRead',18],['mental',8]]);}},
  {name:'ブロックの壁練習', weight:9, effect(logs){samplePlayers(3,p=>['MB','OP'].includes(p.role)).forEach(p=>addEventXp(logs,p,[['blockStuff',18],['blockRead',14],['jump',6]]));}},
  {name:'リベロの声掛け', weight:9, effect(logs){availablePlayers().forEach(p=>addEventXp(logs,p,[['mental',6]]));samplePlayers(2,p=>p.role==='L'||deriveStats(p).receive>=14).forEach(p=>addEventXp(logs,p,[['recReception',16],['recRange',10]]));}},
  {name:'キャプテンの喝', weight:8, effect(logs){availablePlayers().filter(p=>(p.mood||0)<0).slice(0,4).forEach(p=>{const b=p.mood;p.mood=clamp(p.mood+1,-2,2);logs.push(`${nameSpan('若葉高校',p.name)}：調子 ${moodInfo(b).label}→${moodInfo(p.mood).label}`);addEventXp(logs,p,[['mental',12]]);});}},
  {name:'テスト期間', weight:7, effect(logs){samplePlayers(5).forEach(p=>addEventXp(logs,p,[['mental',10],['tossRead',8]]));state.eventTrainingBuff={cat:'all',turns:1,mult:.70,label:'テスト期間'};logs.push('次の練習は身が入りません。');}},
  {name:'雨漏りする体育館', weight:6, effect(logs){state.eventTrainingBuff={cat:'all',turns:1,mult:.80,label:'雨漏り'};logs.push('次の練習が少しやりにくくなります。設備改善イベントの前提になります。');}},
  {name:'体育館使用時間延長', weight:5, effect(logs){state.eventTrainingBuff={cat:'all',turns:4,mult:1.15,label:'体育館使用時間延長'};logs.push('4週間、練習がはかどります。');}},
  {name:'保護者会の差し入れ', weight:8, effect(logs){applyTeamMood(1,logs,999);availablePlayers().forEach(p=>addEventXp(logs,p,[['mental',6],['jump',4]]));recoverFatigueAll(40,logs,'保護者会の差し入れ');}},
  {name:'新しいボール購入', weight:6, effect(logs){state.eventTrainingBuff={cat:'serve_receive',turns:4,mult:1.10,label:'新しいボール'};logs.push('4週間、サーブ・レシーブ系の練習が伸びやすくなります。');}},
  {name:'ライバル校の偵察', weight:5, effect(logs){state.eventOpponentScout=true;availablePlayers().forEach(p=>addEventXp(logs,p,[['blockRead',8],['tossRead',8]]));logs.push('次の試合で、リード・配球読み・守備範囲に小さな補正が入ります。');}},
  {name:'相手エース対策ミーティング', weight:6, effect(logs){samplePlayers(4,p=>['MB','OP','OH'].includes(p.role)).forEach(p=>addEventXp(logs,p,[['blockRead',18],['mental',8]]));state.eventAceCounter=true;logs.push('次の試合で、ブロックの読み・シャットアウト値に小さな補正が入ります。');}},
  {name:'サーブレシーブ重点週間', weight:7, effect(logs){state.eventTrainingBuff={cat:'reception_only',turns:4,mult:1.20,label:'サーブレシーブ重点週間'};logs.push('4週間、レセプションが大きく伸びやすくなります。');}},
  {name:'攻撃パターンの追加', weight:6, effect(logs){samplePlayers(4,p=>['S','OH','OP','MB'].includes(p.role)).forEach(p=>addEventXp(logs,p,[['tossRead',10],['spikeControl',14]]));}},
  {name:'1年生の急成長', weight:4, effect(logs){const arr=availablePlayers().filter(x=>x.year===1);const p=randomChoice(arr.length?arr:state.players);addEventXp(logs,p,[['spikePower',18],['recDig',18],['serveControl',18],['mental',12]]);}},
  {name:'2年生の責任感', weight:5, effect(logs){availablePlayers().filter(p=>p.year===2).forEach(p=>addEventXp(logs,p,[['mental',16],['jump',6]]));samplePlayers(2,p=>p.year===2).forEach(p=>{const b=p.mood;p.mood=clamp(p.mood+1,-2,2);if(b!==p.mood)logs.push(`${nameSpan('若葉高校',p.name)}：調子 ${moodInfo(b).label}→${moodInfo(p.mood).label}`);});}},
  {name:'3年生最後の背中', weight:5, effect(logs){if(!availablePlayers().some(p=>p.year>=3)){logs.push('3年生がいないため、効果は小さめです。');availablePlayers().forEach(p=>addEventXp(logs,p,[['mental',4]]));return;}availablePlayers().filter(p=>p.year<3).forEach(p=>addEventXp(logs,p,[['mental',18],['jump',4],['recDig',4]]));}},
  {name:'スカウトの噂', weight:10, imageKey:'scout_rumor', effect(logs){if(isMarchMonth())return;const msg=maybeScoutRumor();if(msg)logs.push(msg);}},
  {name:'学校新聞の特集記事', weight:3, effect(logs){state.schoolReputation=(state.schoolReputation||0)+10;availablePlayers().forEach(p=>addEventXp(logs,p,[['mental',6]]));logs.push(`学校評判 +10。現在の評判ポイント：${state.schoolReputation}`);}},
  {name:'日本代表選出イベント', weight:3, effect(logs){applyJapanRepSelectionEvent(logs);}},
  {name:'選手の覚醒', weight:2, imageKey:'player_awakening', effect(logs){const p=randomChoice(availablePlayers());addEventXp(logs,p,nonHeightEntries(()=>randomInt(100,200)));logs.push(`${nameSpan('若葉高校',p.name)}が覚醒しました。身長以外のすべての力が大きく伸びました。`);}},
  {name:'マネージャーの観察記録', weight:6, effect(logs){samplePlayers(4).forEach(p=>addEventXp(logs,p,[['tossRead',20],['blockRead',20],['recRange',20]]));logs.push('マネージャーの観察記録から、読み・リード・守備範囲の課題が整理されました。');}},
  {name:'成長期', weight:4, imageKey:'growth_spurt', effect(logs){const p=randomChoice(availablePlayers());if(!p){logs.push('対象選手がいないため、成長期は発生しませんでした。');return;}const roll=Math.random();const xp=roll<0.60?300:(roll<0.90?600:900);const before=p.height;const up=addHeightXp(p,xp);const after=p.height;logs.push(`${nameSpan('若葉高校',p.name)}が成長期に入りました。${before!==after?`身長 ${before}cm→${after}cm`:'まだ身長は伸びていません。'}${xp>=900?' <span class="level-up">特大成長期！</span>':(xp>=600?' <span class="level-up">大きな成長期！</span>':'')}`);}},
  {name:'スパイクフォームの改造', weight:3, imageKey:'form_change', effect(logs){const candidates=samplePlayers(3,p=>['OH','OP','MB'].includes(p.role));state.pendingSpikeFormChange={candidates:candidates.map(p=>p.id),key:turnEventKey()};logs.push('スパイクフォーム改造の相談がありました。選んだ選手はその場で改造に取りかかります。<strong>うまくいけばスパイク決定力とコース打ちが大きく伸びますが、噛み合わなければ逆に落ちます。</strong>');logs.push(spikeFormCandidateChoiceHtml(candidates));}},
  {name:'怪我の発生', weight:3, effect(logs){const p=randomChoice(availablePlayers());if(Math.random()<0.95){state.eventTrainingBuff={cat:'all',turns:4,mult:.50,label:'怪我の影響'};logs.push(`${nameSpan('若葉高校',p.name)}が練習中に痛みを訴えました。大事はありませんが、4週間はチーム全体で無理をさせられません。`);}else{addEventXp(logs,p,nonHeightEntries(-50));logs.push(`${nameSpan('若葉高校',p.name)}の怪我が重く、身長以外の力がひととおり落ちてしまいました。`);}}},
  {name:'早朝の秘密練習', weight:6, effect(logs){const p=randomChoice(availablePlayers());addEventXp(logs,p,[['jump',50]]);logs.push(`${nameSpan('若葉高校',p.name)}が神社の階段で自主トレをしました。`);}},
  {name:'ゾーン突入', weight:3, imageKey:'zone_event', effect(logs){const p=randomChoice(availablePlayers());if(!p){logs.push('対象選手がいないため、ゾーン突入は発生しませんでした。');return;}addEventXp(logs,p,COMP_KEYS.filter(k=>k!=='stamina').map(k=>[k,50]));state.eventTrainingBuff={cat:'all',turns:4,mult:2.00,label:`ゾーン突入：${p.name}`,playerId:p.id};logs.push(`${nameSpan('若葉高校',p.name)}がゾーンに入りました。スタミナ以外の力が一段上がり、さらに4週間、この選手だけ練習の伸びが大きくなります。`);}},
  {name:'文化祭開催', weight:20, effect(logs){const r=Math.random();if(r<.10){samplePlayers(4).forEach(p=>addEventXp(logs,p,[['tossRead',20],['blockRead',20]]));logs.push('詩の朗読会を開催しました。');}else if(r<.30){samplePlayers(4).forEach(p=>addEventXp(logs,p,[['recDig',20],['recReception',20]]));logs.push('クレープ屋を開店しました。');}else if(r<.50){samplePlayers(4).forEach(p=>addEventXp(logs,p,[['blockStuff',20],['spikePower',20]]));logs.push('お化け屋敷を運営しました。');}else if(r<CULTURE_FESTIVAL_SPECIAL_CHANCE){applyTeamMood(1,logs,999);logs.push('文化祭を楽しみ、全選手の調子が上がりました。');}else{const p=randomChoice(availablePlayers());if(p&&grantSpecialIfEligible(p,'大舞台','文化祭コンサートで有名人と共演'))logs.push(`${nameSpan('若葉高校',p.name)}が特殊能力「大舞台」を取得しました。`);else logs.push('コンサートで有名人と共演しましたが、特殊能力取得者はいませんでした。');}}},
  {name:'調子変動', weight:6, effect(logs){if(Math.random()<.50){applyTeamMood(1,logs,999);state.eventTrainingBuff={cat:'all',turns:4,mult:1.50,label:'好調の波'};logs.push('4週間、チーム全体の練習がはかどります。');}else{applyTeamMood(-1,logs,999);state.eventTrainingBuff={cat:'all',turns:4,mult:.75,label:'スランプ'};logs.push('スランプに入りました。4週間、練習が伸び悩みます。');}}},
  {name:'美容院でイメチェン相談', weight:3, effect(logs){applyMakeoverAdviceEvent(logs);}}
];

// v150: 顔グラ付きのカードにし、選んだ時点で改造を実行する（確認の2段目を廃止）。
//        「見送る」はこの1か所だけにして、重複を解消した。
function spikeFormCandidateChoiceHtml(players){
  const list=(players&&players.length?players:samplePlayers(3,p=>['OH','OP','MB'].includes(p.role)));
  if(!list.length)return '<div class="growth-item">フォーム変更の対象選手がいません。</div>';
  const cards=list.map(p=>{
    const st=deriveStats(p);
    return `<button type="button" class="form-change-pick" onclick="resolveSpikeFormChange('${p.id}', true)">
      <img class="form-change-face" src="${p.portrait||'assets/new_shino.png'}" alt="">
      <div class="form-change-info">
        <strong>${p.name}</strong> <span class="mini-tag">${p.year}年 ${p.role}</span>
        <div class="meta">${p.height}cm / ${handLabel(p)}</div>
        <div class="form-change-stats">決定力 ${coloredValue(p.comps?p.comps.spikePower:st.spike)} ／ コース打ち ${coloredValue(p.comps?p.comps.spikeControl:st.spike)}</div>
      </div>
    </button>`;
  }).join('');
  return `<div class="event-choice-box">
    <div class="event-choice-title">誰のフォームを改造しますか？</div>
    <div class="form-change-grid">${cards}</div>
    <div class="event-choice-actions"><button class="ghost small" type="button" onclick="chooseSpikeFormTarget('')">今回は見送る</button></div>
  </div>`;
}
function chooseSpikeFormTarget(playerId){
  const c=document.querySelector('#growthModalContent .popup-scroll-body') || document.getElementById('growthModalContent');
  if(!playerId){
    const msg='スパイクフォーム改造は今回は見送りました。';
    state.trainingLog.push(msg);state.pendingSpikeFormChange=null;
    if(c)c.innerHTML += `<div class="growth-item">${msg}</div>`;
    managerSay('フォーム改造は見送りました。');finishEventChoiceUI();saveState();renderLogs();return;
  }
  // v150: 中間の確認画面は廃止した。選手を選んだ時点で resolveSpikeFormChange が呼ばれる。
  const p=state.players.find(x=>x.id===playerId);
  if(!p)return;
  resolveSpikeFormChange(p.id, true);
}
if(typeof window!=='undefined')window.chooseSpikeFormTarget=chooseSpikeFormTarget;
// v124: 選択が終わったら選択欄を消し、閉じられる状態に戻す
function finishEventChoiceUI(){
  const c=document.getElementById('growthModalContent');
  if(c)c.querySelectorAll('.event-choice-box').forEach(el=>el.remove());
  c&&c.querySelectorAll('.form-change-grid').forEach(el=>el.remove());
  popupChoiceRequired=false;
  const btn=document.getElementById('growthModalClose');
  if(btn){btn.disabled=false;btn.classList.remove('hidden');btn.textContent=popupQueue.length?'次へ':'OK';}
}
function resolveSpikeFormChange(playerId, doChange){
  const p=state.players.find(x=>x.id===playerId);
  if(!p)return;
  const logs=[];
  if(!doChange){
    const msg=`${nameSpan('若葉高校',p.name)}のスパイクフォーム改造は見送りました。`;
    state.trainingLog.push(msg);
    const c=document.querySelector('#growthModalContent .popup-scroll-body') || document.getElementById('growthModalContent');
    if(c){c.innerHTML += `<div class="growth-item">${msg}</div>`;scrollGrowthModalToBottom();}
    managerSay(`${p.name}のフォーム改造は見送りました。`);
    state.pendingSpikeFormChange=null;
    finishEventChoiceUI();
    saveState();
    renderLogs();
    return;
  }
  const ok=Math.random()<0.80;
  addEventXp(logs,p,[['spikePower',ok?100:-100],['spikeControl',ok?100:-100]]);
  logs.push(ok?'フォーム改造に成功しました。':'フォーム改造は失敗しました。');
  state.trainingLog.push(...logs);
  const c=document.querySelector('#growthModalContent .popup-scroll-body') || document.getElementById('growthModalContent');
  if(c){c.innerHTML += logs.map(x=>`<div class="growth-item">${x}</div>`).join('');scrollGrowthModalToBottom();}
  managerSay(ok?`${p.name}のフォーム改造に成功しました。`:`${p.name}のフォーム改造は失敗しました。`);
  state.pendingSpikeFormChange=null;
  finishEventChoiceUI();
  saveState();
  renderAll();
}
if(typeof window!=='undefined')window.resolveSpikeFormChange=resolveSpikeFormChange;


function schoolClassEventWeightMultiplier(step=0.35){
  const idx=Math.max(0,schoolClassIndex(state.schoolClass||'新設校'));
  return 1 + idx*step;
}
function scoutRumorEventWeightMultiplier(){
  // 学校の格が上がるほど、自然発生するスカウトの噂を拾いやすくする
  return schoolClassEventWeightMultiplier(0.35);
}
function growthBreakthroughEventWeightMultiplier(){
  // 学校の格が上がるほど、有望選手が大きく伸びるイベントも起こりやすくする
  return schoolClassEventWeightMultiplier(0.35);
}
function eventAdjustedWeight(e){
  if(!e)return 0;
  if(e.name==='スカウトの噂')return (e.weight||1)*scoutRumorEventWeightMultiplier();
  if(e.name==='選手の覚醒' || e.name==='ゾーン突入')return (e.weight||1)*growthBreakthroughEventWeightMultiplier();
  return e.weight||1;
}


function trainingMoodXpMultiplier(player){
  if(!player)return 1;
  if((player.mood||0)>=2)return 1.10;
  if((player.mood||0)<=-2)return 0.95;
  return 1;
}
function applyTrainingMoodXp(player,xp){
  return Math.max(1,Math.round((Number(xp)||0)*trainingMoodXpMultiplier(player)));
}

function trainingBuffMultiplier(key, player=null){
  const b=state.eventTrainingBuff;
  if(!b||!b.turns)return 1;
  if(b.playerId && (!player || player.id!==b.playerId))return 1;
  if(b.cat==='all')return b.mult;
  if(b.cat==='receive' && ['recReception','recDig','recRange'].includes(key))return b.mult;
  if(b.cat==='serve_receive' && ['servePower','serveControl','recReception','recDig','recRange'].includes(key))return b.mult;
  if(b.cat==='reception_only' && key==='recReception')return b.mult;
  if(b.cat==='analysis_read' && ['blockRead','tossRead','recRange'].includes(key))return b.mult;
  return 1;
}

function decayTurnBuff(logs){
  const b=state.eventTrainingBuff;
  if(!b||!b.turns)return;
  b.turns--;
  if(b.turns<=0){logs.push(`イベント効果「${b.label}」が終了しました。`);state.eventTrainingBuff=null;}
}

function previousTurnKeyFromState(){
  let y=state.year,m=state.monthIndex,t=state.turnIndex-1;
  if(t>=0)return `${y}-${m}-${t}`;
  m--;
  if(m>=0)return `${y}-${m}-3`;
  return `${y-1}-11-3`;
}
function turnEventKey(){return `${state.year}-${state.monthIndex}-${state.turnIndex}`;}
function advanceTurnWithEvent(logs, context='turn'){
  advanceTurn();
  runPostTurnEvents(logs,[],context);
}

function weightedChoiceFrom(list){
  const sum=list.reduce((a,e)=>a+(e.weight||1),0);
  let r=Math.random()*sum;
  for(const e of list){r-=e.weight||1;if(r<=0)return e;}
  return list[list.length-1]||null;
}
const TEAM_EVENT_NAMES=[
  'サーブ100本チャレンジ','レシーブ強化日','新マネージャーの分析ノート','体育館の床ワックスがけ',
  '強豪校との合同練習','練習試合の誘い','テスト期間','雨漏りする体育館',
  '体育館使用時間延長','保護者会の差し入れ','新しいボール購入','ライバル校の偵察',
  '相手エース対策ミーティング','サーブレシーブ重点週間','攻撃パターンの追加',
  '3年生最後の背中','スカウトの噂','学校新聞の特集記事','マネージャーの観察記録','文化祭開催','調子変動',
  'セッター特訓日','ブロックの壁練習','リベロの声掛け','キャプテンの喝','1年生の急成長','2年生の責任感'
];
const PERSONAL_EVENT_NAMES=[
  '朝練の自主参加','居残りスパイク練習','選手の覚醒','成長期','スパイクフォームの改造','怪我の発生','早朝の秘密練習','ゾーン突入','美容院でイメチェン相談'
];

function ogSisterScoutRecruit(logs){
  const fallbackSurnames=withoutReservedSurnames(['青山','石川','上原','大森','加納','北川','小森','佐伯','高瀬','橘','中原','西野','花井','藤堂','松井','三浦','宮原','森園','相沢','秋月','朝倉','有村','飯田','池上','一ノ瀬','岩崎','宇佐美','榎本','遠藤','大崎','岡部','小笠原','小野寺','香月','片桐','神谷','川瀬','岸本','木下','久保田','倉橋','黒川','小泉','近藤','榊原','桜井','篠原','白井','杉浦','瀬戸','高梨','武田','千葉','月岡','土屋','戸田','長瀬','成瀬','新田','野口','萩原','早瀬','日向','広瀬','藤崎','星野','真田','水野','南','村瀬','森下','矢島','柳沢','山岸','横田','吉岡','若宮','渡瀬'].concat(EXTRA_GENERATED_SURNAMES));
  const given=['あおい','いろは','花音','美月','莉子','真央','結衣','沙羅','陽菜','紬','凛','琴音','七海','心春','咲良','芽衣','葵','茜','明日香','杏','彩乃','一花','詩織','栞','楓','香澄','奏','小春','すみれ','千夏','千尋','椿','夏帆','乃愛','遥','陽菜乃','雫','美緒','美咲','美羽','美琴','実里','結菜','優花','雪乃','柚希','蘭','梨央'];
  const ogs=Array.isArray(state.retiredPlayerSnapshots)?state.retiredPlayerSnapshots:[];
  const og=ogs.length?randomChoice(ogs):null;
  const surname=og ? String(og.name||'').split(/\s+/)[0] : randomChoice(fallbackSurnames);
  const ogName=og ? `${og.name} 先輩` : `${surname} 先輩`;
  const cfg=schoolCfg();
  const greatRange=cfg.scoutGreat||[cfg.max+1,cfg.max+2];
  const greatCap=clamp(greatRange[1]+2,1,25);
  const pos=randomChoice(POSITIONS);
  const region=state.scoutRegion||'関東';
  const target=greatRange[1];
  const recruit=generateRecruit(pos,greatRange[0],greatRange[1],`OG妹訪問/大成功`,target,region,greatCap);
  recruit.name=`${surname} ${pickUnusedNamePart(given, collectRecruitNameUsage().first, '妹名')}`;
  recruit.joinSource='OG妹訪問/大成功';
  assignGeneratedTalent(recruit,greatRange[1],false);
  const acquired=applyScoutSpecialRules(recruit,'大成功');
  state.nextYearScoutRecruits.push({region,pos,result:'大成功',min:greatRange[0],max:greatRange[1],target,abilityCap:greatCap,fixedRecruit:recruit,source:'OG妹訪問',ogName,ogId:og?.id||null});
  state.scoutedPlayers.push({name:recruit.name,portrait:recruit.portrait,height:recruit.height,pos,region,result:'大成功',summary:recruitPositionSummary(recruit),year:state.year+1,rumor:false,detail:recruit,source:'OG妹訪問'});
  logs.push(`${ogName}の妹、${nameSpan('若葉高校',recruit.name)}が来年度加入候補としてスカウトに追加されました。`);
  logs.push(`判定：大成功 / ポジション：${pos} / ${recruit.height}cm${scoutSpecialText(acquired)}`);
}
function storyEventAllowedByCalendar(name){
  if(name==='OGの妹訪問イベント')return state.year>=2;
  return true;
}
const STORY_EVENTS=[
  {name:'OGの妹訪問イベント', weight:4, imageKey:'og_sister_visit', effect(logs){logs.push('OGの妹が部活を見学に来ました。');ogSisterScoutRecruit(logs);}},
  {name:'OGの訪問指導イベント', weight:4, imageKey:'og_visit', effect(logs){
    logs.push('OGが訪問指導に来ました。実戦経験をもとに、全体の基礎を見直しました。');
    samplePlayers(5).forEach(p=>addEventXp(logs,p,[['spikeControl',35],['recDig',35],['blockRead',30],['serveControl',25],['mental',35]]));
    if(Math.random()<0.25)directorGrantSpecialChance(logs,'OGの助言から、特殊能力のきっかけを得ました。',1);
  }},
  {name:'伝説の鍼師の治療イベント', weight:1, imageKey:'legendary_acupuncture', effect(logs){logs.push('伝説の鍼師が治療に来ました。');applyLegendaryAcupunctureEvent(logs);}}
];
function teamEventAllowedByCalendar(name){
  const m=state.monthIndex;
  if(name==='3年生最後の背中')return m>=5&&m<=7; // 9月〜11月
  if(name==='文化祭開催')return m===6 && state.cultureFestivalYear!==state.year; // 10月・年度1回
  if(name==='1年生の急成長')return m>=3; // 7月以降〜3月
  if(name==='2年生の責任感')return !!state.seniorsRetired; // 3年生引退後〜3月
  if(name==='日本代表選出イベント')return m===6 && state.turnIndex===0 && hasReachedInterhighBest4ForJapanRep() && state.japanRepSelectionKey!==japanRepEventKey() && japanRepCandidates().length>0;
  return true;
}
function adjustedEventEntry(e){
  return {...e, weight:eventAdjustedWeight(e)};
}
function teamEventPool(){
  return TURN_EVENTS.filter(e=>TEAM_EVENT_NAMES.includes(e.name)&&teamEventAllowedByCalendar(e.name)).map(adjustedEventEntry)
    .concat(STORY_EVENTS.filter(e=>storyEventAllowedByCalendar(e.name)).map(adjustedEventEntry));
}
function personalEventPool(){
  return TURN_EVENTS.filter(e=>PERSONAL_EVENT_NAMES.includes(e.name)).map(adjustedEventEntry);
}
const EVENT_NARRATIVES={
  // v147: これまで説明文が無く、汎用文（マネージャーが練習内容を整理し…）に落ちていたイベント。
  'OGの妹訪問イベント':'卒業した先輩が、妹を連れて体育館に顔を出しました。中学でもバレーを続けているそうで、姉が過ごした場所を熱心に見ていました。来年度の入部候補として話が進みました。',
  'OGの訪問指導イベント':'卒業した先輩が練習を見に来て、上のレベルで通用した感覚を後輩に伝えてくれました。技術そのものより、判断の速さの話が中心でした。',
  '伝説の鍼師の治療イベント':'腕利きと評判の鍼師が部を訪ねてきました。体の使い方の癖を一人ずつ見抜き、詰まっていた部分をほぐしていきます。',
  '朝練の自主参加':'誰が言い出したわけでもなく、朝の体育館に人が集まりはじめました。短い時間でも、自分で決めて動いた練習は身につきます。',
  '居残りスパイク練習':'片付けの時間になっても、まだ打ちたいという声が残りました。ネットを片方だけ張り直して、決定力の高い選手が居残りで打ち込みます。',
  'サーブ100本チャレンジ':'マネージャーがサーブ成功率の記録表を作り、全員で100本チャレンジを行いました。狙った場所へ打つ意識が高まり、サーブ練習として良い時間になりました。',
  'レシーブ強化日':'マネージャーが拾えなかったボールの位置を記録し、レシーブ練習を重点的に行いました。守備の基礎を見直す機会になりました。',
  '新マネージャーの分析ノート':'マネージャーが練習中の癖や試合中の判断を細かく観察し、分析ノートにまとめました。選手たちは自分の課題を具体的に把握できました。',
  '体育館の床ワックスがけ':'全員で体育館の床を磨き直しました。滑りやすさや踏み込みの感覚を確認しながら、守備の一歩目を意識する良い練習になりました。',
  '強豪校との合同練習':'強豪校との合同練習で、普段より速いテンポと高い強度を体感しました。選手たちは自分たちに足りない部分を肌で理解しました。',
  '練習試合の誘い':'近隣校から練習試合の誘いが届きました。マネージャーが日程を整理し、選手たちは実戦を意識して練習に取り組みました。',
  'セッター特訓日':'セッターを中心に、トスの高さ・速さ・攻撃の組み立てを確認しました。アタッカーとの呼吸を合わせる良い練習になりました。',
  'ブロックの壁練習':'ブロック陣が壁を作るタイミングを重点的に確認しました。手の出し方や読みの入り方を整理し、ネット際の守備意識が高まりました。',
  'リベロの声掛け':'リベロを中心に、後衛からの声掛けと守備位置の確認を行いました。チーム全体の連携が少しずつ良くなっています。',
  'キャプテンの喝':'キャプテンが練習の空気を引き締めました。落ちかけていた集中力を戻し、もう一度チーム全体で前を向く時間になりました。',
  'テスト期間':'テスト期間に入り、練習時間は限られました。マネージャーが短時間でできる確認メニューを組み、集中して課題に取り組みました。',
  '雨漏りする体育館':'体育館の一部で雨漏りが発生しました。練習環境は悪くなりましたが、限られた場所でできるメニューを工夫しました。',
  '体育館使用時間延長':'体育館の使用時間を少し長く確保できました。マネージャーが追加メニューを組み、普段より丁寧に反復練習ができました。',
  '保護者会の差し入れ':'保護者会から差し入れが届きました。選手たちは応援されていることを実感し、練習への気持ちを新たにしました。',
  '新しいボール購入':'新しいボールが届きました。感触を確かめながら、サーブやレシーブの基礎練習に取り組みました。',
  'ライバル校の偵察':'マネージャーがライバル校の試合映像を整理しました。選手たちは相手の特徴を確認し、次の試合を意識した練習ができました。',
  '相手エース対策ミーティング':'マネージャーを中心に相手エース対策のミーティングを行いました。ブロックの付き方や守備位置を確認し、いい練習になりました。',
  'サーブレシーブ重点週間':'サーブレシーブを重点的に確認する週になりました。一本目を安定させる意識を共有し、攻撃につなげる準備を整えました。',
  '攻撃パターンの追加':'セッターとアタッカーで新しい攻撃パターンを確認しました。コース打ちや入り方を調整し、攻撃の幅を広げました。',
  '1年生の急成長':'1年生が練習中に大きな手応えをつかみました。先輩の助言もあり、短時間で一段階成長したようです。',
  '2年生の責任感':'2年生がチームの中心として声を出し始めました。後輩を支える意識が強まり、練習にも責任感が出ています。',
  '3年生最後の背中':'3年生の練習姿勢を見て、下級生が刺激を受けました。最後まで手を抜かない姿勢がチームに伝わっています。',
  'スカウトの噂':'マネージャーが中学・地域クラブの情報を整理し、有力選手の手がかりを見つけました。噂の地域とポジションを狙えば、大成功候補につながります。',
  '学校新聞の特集記事':'学校新聞が女子バレー部を特集しました。校内での注目度が上がり、選手たちのやる気にもつながっています。',
  '選手の覚醒':'練習中、ひとりの選手が急に動きの質を上げました。周囲も驚くほど集中しており、覚醒のきっかけになりそうです。',
  'マネージャーの観察記録':'マネージャーが選手の動きや判断を細かく記録しました。読みや守備位置の確認に役立つ内容になっています。',
  '成長期':'選手の体つきに変化が見え始めました。本人も少し戸惑っていますが、身体能力の変化を活かせるよう練習を調整します。',
  'スパイクフォームの改造':'スパイクフォームを見直すかどうか、選手が悩んでいます。監督の判断で、攻撃力を伸ばすきっかけになるかもしれません。',
  '怪我の発生':'練習中、選手が痛みを訴えました。無理をさせず、チーム全体でコンディション管理を見直します。',
  '早朝の秘密練習':'早朝、選手が神社の階段で自主トレをしていました。地道な積み重ねが、ジャンプ力の土台になっていきます。',
  'ゾーン突入':'練習中、ひとりの選手の集中力が明らかに変わりました。ボールへの反応が鋭くなり、周囲も思わず息をのみます。',
  '文化祭開催':'文化祭が開催され、選手たちは部活とは違う形で協力しました。普段と違う経験が、チームの成長にもつながっています。',
  '調子変動':'チームの空気に変化が出ています。良い流れに乗れるか、スランプを抜け出せるか、ここからの練習が大事です。',
  '美容院でイメチェン相談':'選手が美容院でイメチェンするか悩んでいます。気分転換が、プレーにも良い影響を与えるかもしれません。',
  '日本代表選出イベント':'インハイ全国大会での活躍が評価され、チームから日本代表候補が選ばれる可能性が出てきました。'
};
function eventNarrative(name){
  return EVENT_NARRATIVES[name]||'マネージャーが練習内容を整理し、チーム全体で課題を確認しました。小さな積み重ねが成長につながっています。';
}

function stripHtmlForEventSummary(line){
  return String(line||'').replace(/<[^>]*>/g,'').trim();
}
function compactEventEffectLine(line){
  const s=String(line||'');
  if(!s || s.startsWith('<strong>'))return false;
  if(s.includes('event-choice-box'))return true;
  if(s.includes('ev-effect'))return true; // v172: 評価が動かなくても「何が伸びたか」を残す行
  if(s.includes('→'))return true;
  if(s.includes('特殊能力')||s.includes('取得')||s.includes('調子')||s.includes('経験点')||s.includes('練習効率'))return true;
  if(s.includes('スカウト')||s.includes('留学')||s.includes('練習試合'))return true;
  return false;
}
function eventEffectLabel(line){
  const s=stripHtmlForEventSummary(line);
  if(s.includes('特殊能力'))return '特殊能力';
  if(s.includes('調子'))return '調子';
  if(s.includes('経験点')||s.includes('XP'))return '成長';
  if(s.includes('スカウト')||s.includes('噂'))return 'スカウト';
  if(s.includes('留学'))return '留学';
  if(s.includes('練習試合'))return '練習試合';
  if(s.includes('練習効率'))return '練習効率';
  if(s.includes('→'))return '変化';
  return '効果';
}

let eventSequenceSerial=0;
function cleanEventLineForDisplay(line){
  return String(line||'')
    .replace(/^<strong>.*?<\/strong>\s*/,'')
    .replace(/^判定：/,'')
    .trim();
}
function eventIntroPopupHtml(title, evLogs, managerText='気になる出来事がありました。'){
  const narrative=stripHtmlForEventSummary(evLogs[1]||'');
  return `<div class="event-seq-card event-seq-intro">
    <div class="event-tempo-head">
      <img class="event-tempo-face" src="${currentManagerPortrait()}" alt="マネージャー">
      <div>
        ${narrative?`<div class="event-narration-text">${narrative}</div>`:'<div class="event-narration-text">'+managerLine(managerText)+'</div>'}
      </div>
    </div>
  </div>`;
}
function eventResultParts(evLogs){
  const rawLines=evLogs.slice(2).filter(compactEventEffectLine);
  const hasChoice=rawLines.some(x=>String(x||'').includes('event-choice-box'));
  const choiceLines=rawLines.filter(x=>String(x||'').includes('event-choice-box'));
  const resultLines=rawLines.filter(x=>!String(x||'').includes('event-choice-box'));
  return {rawLines,hasChoice,choiceLines,resultLines};
}

// v172: 「結果を見る」を開いたときに、まず何が起きるイベントなのかを一文で示す（Tak指示）。
// ログ行としては積まない（練習ログや月間レポートに混ざらないようにする）。
// キーは TURN_EVENTS の name。ここに無いイベントは従来どおり結果行だけを出す。
// 「練習試合の誘い」は結果を見る自体を出さないので、意図的に載せていない。
const EVENT_RESULT_SUMMARIES={
  '朝練の自主参加':'朝練に参加した部員のジャンプとメンタルが伸びます。',
  '居残りスパイク練習':'居残ったアタッカー（OH・OP・MB）のスパイク決定力とコース打ちが伸びます。',
  'サーブ100本チャレンジ':'全員のサーブ制球が伸びます。ジャンプサーブ持ちはサーブ威力も伸びます。',
  'レシーブ強化日':'全員のレセプションとディグが伸びます。疲れて調子を落とす選手が出ることがあります。',
  '新マネージャーの分析ノート':'何人かのメンタル・ブロックリード・トス読みが伸び、しばらくリード／読み／守備範囲系の練習が伸びやすくなります。',
  '体育館の床ワックスがけ':'しばらくレセプション・ディグ・守備範囲の練習が伸びやすくなります。',
  '強豪校との合同練習':'全員のスパイク決定力・ディグ・ブロックリード・メンタルが伸びます。合同練習疲れで調子を落とす選手が出ることがあります。',
  'セッター特訓日':'トスがいちばん高い選手のトス正確性・トス読み・メンタルが伸びます。',
  'ブロックの壁練習':'MB・OPの何人かのシャットアウト・ブロックリード・ジャンプが伸びます。',
  'リベロの声掛け':'全員のメンタルが伸び、リベロと守備の得意な選手はレセプションと守備範囲も伸びます。',
  'キャプテンの喝':'調子が下がっている選手の調子が戻り、メンタルも伸びます。',
  'テスト期間':'何人かのメンタルとトス読みが伸びますが、次の週は練習に身が入りません。',
  '雨漏りする体育館':'次の週は練習がやりにくくなります。この出来事は、体育館の設備改善イベントが起きる前提にもなります。',
  '体育館使用時間延長':'しばらく練習がはかどります。',
  '保護者会の差し入れ':'チーム全員の調子が上がり、メンタルとジャンプが伸びます。あわせて疲れも取れます。',
  '新しいボール購入':'しばらくサーブ・レシーブ系の練習が伸びやすくなります。',
  'ライバル校の偵察':'全員のブロックリードとトス読みが伸び、次の試合でリード・配球読み・守備範囲が少し良くなります。',
  '相手エース対策ミーティング':'MB・OP・OHの何人かのブロックリードとメンタルが伸び、次の試合でブロックの読みとシャットアウトが少し良くなります。',
  'サーブレシーブ重点週間':'しばらくレセプションが大きく伸びやすくなります。',
  '攻撃パターンの追加':'S・OH・OP・MBの何人かのトス読みとコース打ちが伸びます。',
  '1年生の急成長':'1年生ひとりのスパイク決定力・ディグ・サーブ制球・メンタルが大きく伸びます。',
  '2年生の責任感':'2年生全員のメンタルとジャンプが伸び、調子が上がる選手も出ます。',
  '3年生最後の背中':'3年生がいれば、下級生全員のメンタルが大きく伸び、ジャンプとディグも少し伸びます。3年生がいない年は全員のメンタルが少しだけ伸びます。',
  'スカウトの噂':'噂を引けたときだけ、狙い目の地域とポジションが分かります。3月は発生しません。',
  '学校新聞の特集記事':'学校の評判が上がり、全員のメンタルが少し伸びます。',
  '日本代表選出イベント':'条件を満たす選手がいれば、U-18日本代表に選ばれます。',
  '選手の覚醒':'ひとりが覚醒し、身長以外のすべての能力が大きく伸びます。',
  'マネージャーの観察記録':'何人かのトス読み・ブロックリード・守備範囲が大きく伸びます。',
  '成長期':'ひとりが成長期に入り、身長が伸びます。',
  'スパイクフォームの改造':'選んだ選手のフォームをその場で改造します。うまくいけばスパイク系が伸び、失敗すると決定力とコース打ちが落ちます。見送ることもできます。',
  '怪我の発生':'選手が練習中に痛みを訴え、しばらくチーム全体で無理をさせられなくなります。悪くすると本人の力が落ちることもあります。',
  '早朝の秘密練習':'ひとりのジャンプが大きく伸びます。',
  'ゾーン突入':'ひとりのスタミナ以外の能力が一段上がり、しばらくその選手だけ練習の伸びが大きくなります。',
  '文化祭開催':'出し物の内容によって、伸びる能力が変わります。',
  '調子変動':'チームが好調の波かスランプに入ります。しばらく練習の伸びと、チーム全体の調子が変わります。',
  '美容院でイメチェン相談':'選んだ候補に顔グラフィックが変わります。変えないことも選べます。'
};
function eventResultSummaryFor(name){
  return EVENT_RESULT_SUMMARIES[String(name||'').trim()]||'';
}
function eventHiddenResultHtml(content,label='結果を見る'){
  if(!content)return '';
  return `<details class="event-detail-drawer"><summary>${label}</summary><div class="event-detail-list">${content}</div></details>`;
}
function eventResultPopupHtml(title, evLogs){
  const {hasChoice,choiceLines,resultLines}=eventResultParts(evLogs);
  // v172: 概要は本文には出さず、「結果を見る」を開いたときに先頭へ出す（Tak指示）。
  const summary=eventResultSummaryFor(title);
  const summaryHtml=summary?`<div class="event-detail-line event-result-summary">${summary}</div>`:'';
  const resultHtml=summaryHtml+resultLines.map(x=>`<div class="event-detail-line">${cleanEventLineForDisplay(x)}</div>`).join('');
  return `<div class="event-seq-card event-seq-result">
    ${hasChoice?`<div class="event-beat"><div class="event-beat-label">選択</div>${choiceLines.join('')}</div>`:''}
    ${(resultLines.length||summary)?eventHiddenResultHtml(resultHtml,'結果を見る'):''}
  </div>`;
}
// v100: 内容画面と結果画面を分けた結果、詳細を「結果を見る」に入れた側の画面が空洞になっていた。
// 内容と結果を1枚に統合し、能力値などの詳細だけを「結果を見る」で任意展開する。
function enqueueEventSequence(title, evLogs, managerText='気になる出来事がありました。', kind='event', imageKey='multi_event'){
  const parts=eventResultParts(evLogs);
  if(eventSkipModeOn() && !parts.hasChoice){
    const resultCount=parts.resultLines.length;
    managerSay(`イベント「${title}」を省略表示しました。${resultCount?`結果${resultCount}件は練習ログに記録済みです。`:''}`);
    return;
  }
  const body=eventIntroPopupHtml(title,evLogs,managerText)+eventResultPopupHtml(title,evLogs);
  // v116: 選択肢のあるイベント（スパイクフォームの改造など）は、選ぶまで閉じられないようにする。
  //       そうしないと「OK」で閉じられてイベントが何も起きずに終わってしまう。
  enqueueImportantPopup(title, body, kind, imageKey, parts.hasChoice?{requireChoice:true}:{});
}
function twoStepIntroHtml(title,intro){
  return `<div class="event-seq-card event-seq-intro">
    <div class="event-tempo-head"><img class="event-tempo-face" src="${currentManagerPortrait()}" alt="マネージャー"><div><div class="growth-manager">${managerLine(title)}</div><div class="event-narration-text">${intro}</div></div></div>
  </div>`;
}
function twoStepResultHtml(resultHtml){
  return `<div class="event-seq-card event-seq-result">${eventHiddenResultHtml(resultHtml,'結果を見る')}</div>`;
}
// v100: 同上。導入と結果を1枚にまとめる。resultTitle は互換のため引数だけ残す。
function enqueueTwoStepEvent(title,intro,resultHtml,kind='event',imageKey='multi_event',resultTitle=null){
  if(eventSkipModeOn()){
    managerSay(`イベント「${title}」を省略表示しました。結果はログに記録済みです。`);
    return;
  }
  enqueueImportantPopup(title, twoStepIntroHtml(title,intro)+(resultHtml?twoStepResultHtml(resultHtml):''), kind, imageKey);
}
function runEventEntry(ev, logs, imageKey='multi_event'){
  if(!ev)return null;
  if(ev.name==='スカウトの噂' && isMarchMonth())return null;
  const evLogs=[`<strong>${ev.name}</strong>`, eventNarrative(ev.name)];
  ev.effect(evLogs,'event');
  if(ev.name==='文化祭開催')state.cultureFestivalYear=state.year;
  logs.push(...evLogs);
  managerSay(`イベント「${ev.name}」が発生しました。`);
  if(ev.name==='伝説の鍼師の治療イベント'){
    enqueueLegendaryAcupunctureSelectionPopup();
  }else if(ev.name==='美容院でイメチェン相談'){
    // 選択用ポップアップをイベント側で表示済み
  }else{
    enqueueEventSequence(`${ev.name}`, evLogs, `イベント「${ev.name}」が発生しました。`, 'event', ev.imageKey||imageKey);
  }
  flushPendingSpecialPopups();
  return ev;
}
function runSeaEvent(logs, ups){
  const acquired=[];
  for(const p of availablePlayers()){
    const before=p.mood||0;
    p.mood=2;
    if(before!==p.mood)logs.push(`${nameSpan('若葉高校',p.name)}：調子 ${moodInfo(before).label}→${moodInfo(p.mood).label}`);
    if(Math.random()<0.05){
      const special=pickObservableSpecialForPlayer(p);
      if(special && grantSpecialIfEligible(p,special,'海でのレクリエーションで得た気づき')){
        acquired.push(`${nameSpan('若葉高校',p.name)}：${specialChipHtml(special)}`);
        if(ups)ups.push(`${p.name}：特殊能力「${special}」取得`);
      }
    }
  }
  logs.push('<strong>海だ！</strong> 全国優勝のご褒美に、チームで海へ出かけました。全員の調子が絶好調になりました。');
  if(acquired.length)logs.push(`海での気づき：${acquired.join('、')}`);
  // v125: テキストは短く。画像は読み終わった最後の1枚だけ出す。
  const seaImg=randomSeaEventImageKey();
  enqueueStoryEvent('海だ！',[
    {text:'「監督ーっ！　海！　海に行きましょう！」<br><strong>全国優勝</strong>の熱が、まだ抜けきらない。'},
    {text:'ここまで、本当によく走ってきた。<br>――今日くらいは、いいだろう。'},
    {text:'水をかけあって、スイカを割って、腹を抱えて笑って。<br>誰ひとり、練習の話をしなかった。'},
    {text:'<strong>チーム全員の調子が絶好調になりました。</strong>'
      +(acquired.length?`<div class="hint top-gap">海での気づき：${acquired.join('、')}</div>`:''), imageKey:seaImg}
  ],'','event');
  state.lastTeamEventTurnKey=turnEventKey();
  state.seaEventDoneKey=`${state.year}-sea`;
  return true;
}
function drawOmikujiResult(){
  const list=[
    {name:'大吉', bonus:0.05, weight:15, text:'今日は勝負運がかなり良さそうです。'},
    {name:'中吉', bonus:0.03, weight:30, text:'落ち着いて戦えば流れをつかめそうです。'},
    {name:'小吉', bonus:0.015, weight:25, text:'小さな幸運が味方してくれそうです。'},
    {name:'吉', bonus:0.00, weight:15, text:'普段どおりの力を出せそうです。'},
    {name:'末吉', bonus:-0.015, weight:10, text:'油断すると流れを失いそうです。'},
    {name:'凶', bonus:-0.03, weight:4, text:'苦しい展開に注意が必要です。'},
    {name:'大凶', bonus:-0.05, weight:1, text:'かなり厳しい流れになりそうです。'}
  ];
  return weightedChoiceFrom(list);
}
function shouldForceCampEvent(){
  return (state.monthIndex===4 && !state.qualifiedInterhigh && !!state.interhighPrefEliminated) || (state.monthIndex===9 && !state.qualifiedHaruko && !!state.harukoPrefEliminated);
}
function maybeForcedCampEvent(logs){
  if(!shouldForceCampEvent())return false;
  const key=`${state.year}-${state.monthIndex===9?'haruko':'interhigh'}-camp`;
  if(state.campEventKey===key)return false;
  state.campEventKey=key;
  // 合宿倍率はprogressTurn側の isCampTurn()?2.5:1 で既に適用されるため、
  // eventTrainingBuffへ2.5を重ねない（二重倍率6.25倍を防止）。
  const campLabel=state.monthIndex===9?'春高地区大会敗退を受けて、1月に合宿を行います。':'地区大会敗退を受けて、全国大会期間中に合宿を行います。';
  const msg=`<strong>合宿イベント</strong> ${campLabel}の期間は、練習の伸びが大きくなります。`;
  if(logs)logs.push(msg);
  managerSay(`${campLabel}の期間は、練習の伸びが大きくなります。`);
  enqueueTwoStepEvent('合宿イベント',`${campLabel}悔しさを、次の大会へ向けた練習量に変えます。`,`<div class="event-beat"><div class="event-beat-label">結果</div><div class="compact-effect-list"><div class="compact-effect-chip"><span>練習効率</span>期間中は練習の伸びが大きくなります。</div></div></div>`,'event','camp_event');
  return true;
}
function maybeObEncouragementEvent(logs){
  const key=`${state.year}-jun4-ob`;
  if(!(state.monthIndex===2 && state.turnIndex===3))return false;
  if(state.obEncouragementKey===key)return false;
  state.obEncouragementKey=key;
  if(Math.random()>=0.30)return false;
  const r=Math.random();
  logs.push('<strong>OGの激励</strong>');
  if(r<0.50){
    applyTeamMood(1,logs,999);
    logs.push('OGの激励で、全選手の調子が上がりました。');
  }else if(r<0.80){
    state.equipmentLevel=clamp((state.equipmentLevel||0)+1,0,6); // v68: 機材Lvは仕様上限6でクランプ(無制限増加バグ修正)
    logs.push(`OGから練習機材を寄贈されました。練習機材レベル +1（現在Lv.${state.equipmentLevel}）`);
  }else{
    state.equipmentLevel=clamp((state.equipmentLevel||0)+2,0,6); // v68: 機材Lvは仕様上限6でクランプ(無制限増加バグ修正)
    logs.push(`OGから練習機材を複数寄贈されました。練習機材レベル +2（現在Lv.${state.equipmentLevel}）`);
  }
  enqueueTwoStepEvent('OGの激励','練習中、卒業生が体育館に顔を出してくれました。昔の話だけでなく、今のチームに必要な助言も残してくれます。',`<div class="event-beat"><div class="event-beat-label">結果</div><div class="compact-effect-list"><div class="compact-effect-chip">チームに良い影響がありました。</div></div></div>`,'event','multi_event');
  state.lastTeamEventTurnKey=turnEventKey();
  return true;
}
function maybeShrineOmikujiForcedEvent(logs){
  const key=`${state.year}-jan-national`;
  if(!(state.monthIndex===9 && state.turnIndex===0 && state.qualifiedHaruko))return false;
  if(state.omikujiEventKey===key)return false;
  const result=drawOmikujiResult();
  state.omikujiEventKey=key;
  state.omikujiLuckYear=state.year;
  state.omikujiLuckBonus=result.bonus;
  state.omikujiResultName=result.name;
  state.omikujiText=result.text;
  const pctText=omikujiBonusText(result.bonus);
  const line=`<strong>神社でおみくじ</strong> ${result.name}。ランダム補正 ${pctText}。${result.text}`;
  if(logs)logs.push(line);
  managerSay(`神社でおみくじを引きました。結果は${result.name}です。`);
  enqueueImportantPopup('神社でおみくじ', `<div class="growth-manager">${managerLine('全国大会の前に、神社でおみくじを引きました！')}</div><div class="growth-item">結果：<strong>${result.name}</strong></div><div class="growth-item">全国大会中のランダム補正：${pctText}</div><div class="hint">${result.text}</div>`, 'event','shrine_omikuji');
  state.lastTeamEventTurnKey=turnEventKey();
  return true;
}
function maybeTeamEvent(logs, ups){
  if(state.monthIndex===6 && state.turnIndex===3 && isJapanRepActive())return applyJapanRepReturnEvent(logs);
  if(maybeObEncouragementEvent(logs))return true;
  if(maybeShrineOmikujiForcedEvent(logs))return true;
  // v101: 海イベントの条件を差し替え。
  // 旧：7月第1週にレクリエーションを選ぶと7月第4週に50%。
  //     7月はインハイ地区大会の月で、レクリエーションを選ぶ余裕がほぼ無く、事実上ほとんど発生しなかった。
  // 新：全国大会で優勝した年の8月第4週（インハイ全国が終わった直後）に必ず発生する。
  //     季節が合い、監督行動を消費せず、序盤は見られないので「ご褒美」として働く。
  if(seaEventDueNow()){
    state.seaEventDoneKey=`${state.year}-sea`;
    return runSeaEvent(logs,ups);
  }
  const previousHadTeamEvent=state.lastTeamEventTurnKey===previousTurnKeyFromState();
  const rate=clamp((previousHadTeamEvent?0.25:0.50)+coachNetworkEventBonus(),0,0.80);
  if(Math.random()>=rate)return null;
  const ev=weightedChoiceFrom(teamEventPool());
  const result=runEventEntry(ev,logs,'multi_event');
  if(result)state.lastTeamEventTurnKey=turnEventKey();
  return result;
}
function maybePersonalEvents(logs){
  const occurred=[];
  if(Math.random()>=0.50)return occurred;
  const pool=personalEventPool();
  if(!pool.length)return occurred;
  const ev=weightedChoiceFrom(pool);
  if(ev){
    runEventEntry(ev,logs,'personal_change');
    occurred.push(ev);
  }
  return occurred;
}

const STUDY_ABROAD_RATE=1.00; // 仮：100%。本番では0.30想定
const STUDY_ABROAD_COMMON_EFFECTS=[
  ['spikePower',180],['spikeControl',180],
  ['recReception',180],['recDig',180],['recRange',180],
  ['blockRead',180],['blockStuff',180],
  ['servePower',180],['serveControl',180],
  ['tossAccuracy',180],['tossRead',180],
  ['jump',180],['stamina',180],['mental',180]
];
function studyAbroadEffects(focusEffects, common=true){
  const map={};
  if(common)STUDY_ABROAD_COMMON_EFFECTS.forEach(([k,xp])=>{map[k]=(map[k]||0)+xp;});
  focusEffects.forEach(([k,xp])=>{map[k]=(map[k]||0)+xp;});
  return Object.entries(map);
}
const STUDY_ABROAD_DESTINATIONS={
  rome:{city:'ローマ',unlockable:true,label:'スパイク特化',note:'全体的に成長し、特に攻撃力を磨いて帰国します。',grow:'決定力とコース打ちが大きく伸びます。ほかの能力も少しずつ伸びます。',effects:studyAbroadEffects([['spikePower',700],['spikeControl',700],['jump',120]])},
  johannesburg:{city:'ヨハネスバーグ',unlockable:true,label:'ジャンプ超特化',note:'他の能力は伸びにくい代わりに、ジャンプ力を徹底的に伸ばして帰国します。',grow:'ジャンプだけを徹底的に伸ばします。ほかの能力は伸びません。',effects:studyAbroadEffects([['jump',1500]],false)},
  moscow:{city:'モスクワ',unlockable:true,label:'ブロック特化',note:'全体的に成長し、特にブロックの読みとシャット力を磨いて帰国します。',grow:'シャット力とブロックリードが大きく伸びます。ほかの能力も少しずつ伸びます。',effects:studyAbroadEffects([['blockStuff',700],['blockRead',700],['jump',120]])},
  munich:{city:'ミュンヘン',unlockable:true,label:'サーブ特化',note:'全体的に成長し、特に強く正確なサーブを磨いて帰国します。',grow:'サーブの威力とコントロールが大きく伸びます。ほかの能力も少しずつ伸びます。',effects:studyAbroadEffects([['servePower',700],['serveControl',700],['mental',120]])},
  paris:{city:'パリ',unlockable:true,label:'トス特化',note:'全体的に成長し、特に組み立てとトス精度を磨いて帰国します。',grow:'トスの正確性と読みが大きく伸びます。ほかの能力も少しずつ伸びます。',effects:studyAbroadEffects([['tossAccuracy',700],['tossRead',700],['serveControl',120]])},
  sao_paulo:{city:'サンパウロ',unlockable:true,label:'レシーブ特化',note:'全体的に成長し、特に守備の粘りと対応力を磨いて帰国します。',grow:'レセプション・ディグ・守備範囲がまとめて大きく伸びます。',effects:studyAbroadEffects([['recReception',620],['recDig',620],['recRange',620]])},
  seoul:{city:'ソウル',label:'バランス型・効果控えめ',note:'派手な伸びはないものの、全体の基礎を底上げして帰国します。',unlockable:true,grow:'全体が少しずつ伸びます。突出した伸びはありません。',effects:studyAbroadEffects([['stamina',120],['mental',120]])},
  osaka:{city:'大阪強化校',label:'国内短期型・効果控えめ',note:'国内強化校で実戦感覚を磨き、全体を少しずつ伸ばして帰国します。',unlockable:true,grow:'全体が少しずつ伸びます。突出した伸びはありません。',effects:studyAbroadEffects([['spikeControl',100],['recDig',100],['serveControl',100]])},
  los_angeles:{city:'ロサンゼルス',label:'総合フィジカル型',note:'全体的に成長し、特にスタミナとメンタルを伸ばして帰国します。',unlockable:true,grow:'スタミナとメンタルが大きく伸びます。ジャンプも少し伸びます。',effects:studyAbroadEffects([['stamina',520],['mental',520],['jump',180]])},
  bangkok:{city:'バンコク',label:'柔軟性・守備型',note:'全体的に成長し、特に守備範囲と粘りを伸ばして帰国します。',unlockable:true,grow:'守備範囲とディグが伸びます。スタミナも少し伸びます。',effects:studyAbroadEffects([['recRange',420],['recDig',300],['stamina',220]])}
};
function studyAbroadCandidatePlayers(){
  return availablePlayers().filter(p=>p.year===1||p.year===2);
}

function studyAbroadReturnDue(){
  const s=state.studyAbroad;
  return !!(s&&!s.returned&&state.year===s.returnYear&&state.monthIndex===1&&state.turnIndex===0);
}
function studyAbroadDestinationUnlocked(key){
  const d=STUDY_ABROAD_DESTINATIONS[key];
  if(!d)return false;
  if(!d.unlockable)return true;
  return !!(state.directorLegacy&&Array.isArray(state.directorLegacy.studyRoutes)&&state.directorLegacy.studyRoutes.includes(key));
}
function studyAbroadDestinationOptionsHtml(){
  return Object.entries(STUDY_ABROAD_DESTINATIONS)
    .filter(([key])=>studyAbroadDestinationUnlocked(key))
    .map(([key,d])=>`<option value="${key}">${d.city}：${d.label}</option>`).join('');
}
function studyAbroadPlayerCardHtml(p){
  const selected=(p.id===(state.studyAbroadOfferPlayerId||state.selectedPlayerId))?'selected':'';
  return `<button type="button" class="player-pick-card ${selected}" onclick="selectStudyAbroadPlayer('${p.id}')">
    <img src="${p.portrait||'assets/new_shino.png'}" alt="">
    <div><strong>${p.name}</strong> <span class="mini-tag">${p.year}年 ${p.role}</span><br><span class="meta">${p.height}cm / ${handLabel(p)}</span>${playerMiniAbilityHtml(p)}</div>
  </button>`;
}
function studyAbroadDestCardHtml(key,d){
  const selected=(key===(state.studyAbroadOfferDestKey||'rome'))?'selected':'';
  // v204: 追加の経験点（+700 など）を出すのをやめ、何が伸びるのかを言葉で書く（Tak指示）。
  const grow=d.grow||d.note||'';
  return `<button type="button" class="training-pick-card ${selected}" onclick="selectStudyAbroadDest('${key}')">
    <strong>${d.city}</strong><small>${d.label}<br>${grow}</small>
  </button>`;
}
function renderStudyAbroadPicker(){
  const candidates=studyAbroadCandidatePlayers();
  const pGrid=document.getElementById('studyAbroadPlayerGrid');
  if(pGrid)pGrid.innerHTML=candidates.map(studyAbroadPlayerCardHtml).join('');
  const dGrid=document.getElementById('studyAbroadDestGrid');
  if(dGrid)dGrid.innerHTML=Object.entries(STUDY_ABROAD_DESTINATIONS).filter(([key])=>studyAbroadDestinationUnlocked(key)).map(([key,d])=>studyAbroadDestCardHtml(key,d)).join('');
}
function selectStudyAbroadPlayer(id){
  state.studyAbroadOfferPlayerId=id;
  const el=document.getElementById('studyAbroadPlayerSelect');
  if(el)el.value=id;
  renderStudyAbroadPicker();
}
function selectStudyAbroadDest(key){
  state.studyAbroadOfferDestKey=key;
  const el=document.getElementById('studyAbroadDestSelect');
  if(el)el.value=key;
  renderStudyAbroadPicker();
}
if(typeof window!=='undefined'){window.selectStudyAbroadPlayer=selectStudyAbroadPlayer;window.selectStudyAbroadDest=selectStudyAbroadDest;}

function studyAbroadOfferHtml(){
  const candidates=studyAbroadCandidatePlayers();
  if(!state.studyAbroadOfferPlayerId && candidates[0])state.studyAbroadOfferPlayerId=candidates[0].id;
  const firstUnlocked=Object.keys(STUDY_ABROAD_DESTINATIONS).find(k=>studyAbroadDestinationUnlocked(k))||null;
  if(!state.studyAbroadOfferDestKey || !studyAbroadDestinationUnlocked(state.studyAbroadOfferDestKey))state.studyAbroadOfferDestKey=firstUnlocked;
  const destOptions=studyAbroadDestinationOptionsHtml();
  setTimeout(()=>renderStudyAbroadPicker(),0);
  return `<div class="study-abroad-box">
    <div class="event-short-copy">海外バレー留学の案内が届いた。<br>1年・2年から1名を送り出せる。帰国は来年5月。能力を確認して、送り出す選手と留学先を選んでください。</div>
    <select id="studyAbroadPlayerSelect" class="hidden">${candidates.map(p=>`<option value="${p.id}" ${p.id===state.studyAbroadOfferPlayerId?'selected':''}>${p.name}</option>`).join('')}</select>
    <select id="studyAbroadDestSelect" class="hidden">${destOptions}</select>
    <h3>留学する選手</h3>
    <div id="studyAbroadPlayerGrid" class="player-pick-grid"></div>
    <h3 class="top-gap">留学先</h3>
    <div id="studyAbroadDestGrid" class="training-pick-grid"></div>
    <div class="event-choice-actions">
      <button class="primary small" type="button" onclick="resolveStudyAbroadOffer(true)">送り出す</button>
      <button class="ghost small" type="button" onclick="resolveStudyAbroadOffer(false)">見送る</button>
    </div>
  </div>`;
}
function maybeStudyAbroadOffer(logs){
  if(state.year<=1)return false;
  if(state.monthIndex!==2||state.turnIndex!==0)return false;
  if(state.studyAbroad)return false;
  if(state.studyAbroadOfferYear===state.year)return false;
  const unlockedRoutes=Object.keys(STUDY_ABROAD_DESTINATIONS).filter(studyAbroadDestinationUnlocked);
  if(!unlockedRoutes.length)return false;
  const candidates=studyAbroadCandidatePlayers();
  if(!candidates.length)return false;
  state.studyAbroadOfferYear=state.year;
  if(Math.random()>STUDY_ABROAD_RATE)return false;
  const html=`<div class="growth-manager">${managerLine('海外バレー留学の案内が届きました。')}</div>${studyAbroadOfferHtml()}`;
  enqueueImportantPopup('バレー留学の誘い', html, 'event','multi_event', {requireChoice:true});
  logs.push('海外バレー留学の案内が届きました。');
  managerSay('海外バレー留学の案内が届きました。送り出す選手と留学先を選べます。');
  return true;
}
function resolveStudyAbroadOffer(accept){
  const c=document.querySelector('#growthModalContent .popup-scroll-body') || document.getElementById('growthModalContent');
  if(!accept){
    const msg='バレー留学の誘いは見送りました。';
    state.trainingLog.push(msg);
    if(c){c.innerHTML = `<div class="growth-manager">${managerLine('今回は留学を見送りました。')}</div><div class="growth-item">${msg}</div>`;scrollGrowthModalToBottom();}
    managerSay('今回は留学を見送ります。');
    state.studyAbroadOfferPlayerId=null;state.studyAbroadOfferDestKey=null;
    saveState();
    renderAll();
    closeImportantPopup(true);
    return;
  }
  const playerId=document.getElementById('studyAbroadPlayerSelect')?.value || state.studyAbroadOfferPlayerId;
  const destKey=document.getElementById('studyAbroadDestSelect')?.value || state.studyAbroadOfferDestKey;
  const p=state.players.find(x=>x.id===playerId);
  if(!p)return;
  if(!destKey || !studyAbroadDestinationUnlocked(destKey)){
    const msg='その留学先はまだ監督活動で解禁されていません。';
    state.trainingLog.push(msg);
    managerSay(msg);
    if(c)c.innerHTML=`<div class="growth-manager">${managerLine(msg)}</div><div class="growth-item">監督活動で留学ルートを開拓してください。</div>`;
    saveState();
    return;
  }
  const d=STUDY_ABROAD_DESTINATIONS[destKey];
  state.studyAbroad={playerId:p.id,playerName:p.name,destKey,city:d.city,returnYear:state.year+1,returnMonthIndex:1,returnTurnIndex:0,departedYear:state.year};
  state.studyAbroadOfferPlayerId=null;state.studyAbroadOfferDestKey=null;
  ensureStarterIds();
  ensureBenchIds();
  const msg=`${nameSpan('若葉高校',p.name)}が${d.city}へバレー留学に出発します。帰国は来年5月1週目です。`;
  state.trainingLog.push(msg);
  managerSay(`${p.name}を${d.city}へ送り出しました。来年5月に帰国予定です。`);
  const html=`<div class="growth-manager">${managerLine(`${p.name}が${d.city}へ向かいます。`)}</div>
    <div class="event-short-copy">${p.name}が${d.city}へバレー留学に出発します。帰国は来年5月1週目です。</div>
    <div class="hint">留学先：${d.city} / ${d.label}</div>`;
  enqueueImportantPopup('バレー留学へ出発', html, 'event', 'study_abroad_departure');
  saveState();
  renderAll();
  closeImportantPopup(true);
  return;
}
function applyStudyAbroadReturn(logs,ups){
  if(!studyAbroadReturnDue())return false;
  const s=state.studyAbroad;
  const p=state.players.find(x=>x.id===s.playerId);
  const d=STUDY_ABROAD_DESTINATIONS[s.destKey]||STUDY_ABROAD_DESTINATIONS.rome;
  if(!p){state.studyAbroad=null;return false;}
  const results=[];
  // v94: 留学は1年に1人しか行けないため、効果を引き上げる。
  // 留学先固有の経験点に加えて「おまかせ練習を1年間（48週）続けた分」を上乗せする。
  try{
    const lv=effectiveTrainingLevel(state.equipmentLevel||0);
    const weeks=48;
    const om=omakaseEffects(p,1);
    for(const [k,xp] of Object.entries(om)){
      const add=Math.round((Number(xp)||0)*weeks);
      if(add>0)addXp(p,k,add);
    }
    logs.push('留学先でも練習を続けていたぶんが、しっかり身についていました。');
  }catch(e){}
  d.effects.forEach(([key,xp])=>{
    const before=p.comps[key];
    const up=addXp(p,key,xp);
    const after=p.comps[key];
    if(up){
      const line=`${p.name}：${compLabel(key)} ${coloredValue(before)}→${coloredValue(after)}`;
      results.push(line);
      ups.push(line);
    }
  });
  const returnResultHtml=results.length
    ? results.map(x=>`<div class="growth-item">${x}</div>`).join('')
    : '<div class="growth-item">能力値の上昇はありませんでしたが、経験を積んで帰国しました。</div>';
  const html=`<div class="growth-manager">${managerLine(`${p.name}が${d.city}留学から帰国しました。`)}</div>
    <div class="event-short-copy">${d.note}</div>
    ${eventHiddenResultHtml(returnResultHtml,'結果を見る')}`;
  logs.push(`${nameSpan('若葉高校',p.name)}が${d.city}留学から帰国しました。`);
  enqueueImportantPopup('バレー留学から帰国', html, 'event','study_abroad_return');
  managerSay(`${p.name}が${d.city}留学から帰国しました。`);
  state.studyAbroad=null;
  ensureStarterIds();
  ensureBenchIds();
  return true;
}
if(typeof window!=='undefined')window.resolveStudyAbroadOffer=resolveStudyAbroadOffer;


const U15_GOLDEN_GENERATION_RATE=0.30;
function isU15GoldenGenerationActive(){
  return state.u15GoldenGenerationYear===state.year;
}
function isU15GoldenRecruitYear(){
  return state.u15GoldenRecruitYear===state.year;
}
function schoolPrestigeEventBonus(){
  return Math.max(0,schoolClassIndex(state.schoolClass||'新設校'))*0.03;
}
function scoutGreatChanceBase(){
  // 2026-07-26 Supabase統合: 学校格1段階ごと+3pt、最終上限95%。噂一致100%はperformScout側の別枠。
  return clamp((isU15GoldenGenerationActive()?0.50:0.25)+scoutGreatChanceBonus()+schoolPrestigeEventBonus(),0,0.95);
}
function aprilGreatRecruitChanceBase(){
  return isU15GoldenRecruitYear()?0.10:0.05;
}
function maybeU15GoldenGenerationEvent(logs){
  if(state.monthIndex!==0||state.turnIndex!==0)return false;
  if(!schoolClassAtLeast('全国大会出場校'))return false;
  if(state.u15GoldenGenerationYear===state.year)return false;
  if(Math.random()>U15_GOLDEN_GENERATION_RATE)return false;
  state.u15GoldenGenerationYear=state.year;
  state.u15GoldenRecruitYear=state.year+1;
  const msg='U-15世代が黄金世代です。今年度のスカウト大成功率が2倍になり、来年度の通常入部でも大成功扱いの選手が出やすくなります。';
  logs.push(msg);
  enqueueImportantPopup('U-15 黄金世代', `<div class="growth-manager">${managerLine('U-15世代に黄金世代の気配があります！')}</div><div class="growth-item">${msg}</div>`, 'gold-special','new_students');
  managerSay('U-15世代に黄金世代の気配があります。今年度のスカウトは大成功率が上がります。');
  return true;
}


function currentManagerId(){
  const src=currentManagerPortrait();
  return Math.max(1,MANAGER_PORTRAIT_POOL.indexOf(src)+1);
}
function managerTrainingXpMultiplier(player,key){
  const id=currentManagerId();
  if(id===2)return 1.01;
  if(id===4 && state.managerAnalysisBuffTurns>0)return 1.05;
  return 1;
}
function maybeManagerSupportEvent(logs){
  const key=`${state.year}-${state.monthIndex}-${state.turnIndex}`;
  if(state.managerSupportKey===key)return false;
  const id=currentManagerId();
  let occurred=false;
  if(id===1 && Math.random()<0.06){
    samplePlayers(3,p=>(p.mood||0)<2).forEach(p=>{const b=p.mood||0;p.mood=clamp(b+1,-2,2);logs.push(`${currentManagerName()}の差し入れ：${nameSpan('若葉高校',p.name)} 調子 ${moodInfo(b).label}→${moodInfo(p.mood).label}`);});
    occurred=true;
  }else if(id===3 && !isMarchMonth() && Math.random()<clamp(0.07+schoolPrestigeEventBonus(),0,0.95)){
    const r=maybeScoutRumor();
    logs.push(r?`${currentManagerName()}が独自ルートでスカウトの噂を持ってきました。`:`${currentManagerName()}がスカウト情報を探しましたが、今回は具体的な噂にはつながりませんでした。`);
    // v172: マネージャーの能力で噂を見つけたときも、通常の「スカウトの噂」イベントと同じ挿絵を出す（Tak指示）。
    if(r){
      enqueueImportantPopup('スカウトの噂',
        `<div class="growth-manager">${managerLine(`${currentManagerName()}が独自ルートでスカウトの噂を持ってきました。`)}</div>`
        +`<div class="growth-item">${r}</div>`,
        'event','scout_rumor');
    }
    occurred=!!r;
  }else if(id===4 && Math.random()<0.06){
    state.managerAnalysisBuffTurns=4;
    logs.push(`${currentManagerName()}の分析メモのおかげで、4週間ほど練習がはかどります。`);
    occurred=true;
  }else if(id===5 && Math.random()<0.07){
    const list=samplePlayers(2,p=>(p.mood||0)<0);
    list.forEach(p=>{const b=p.mood||0;p.mood=clamp(b+1,-2,2);logs.push(`${currentManagerName()}の声かけ：${nameSpan('若葉高校',p.name)} 調子 ${moodInfo(b).label}→${moodInfo(p.mood).label}`);});
    occurred=list.length>0;
  }else if(id===6 && Math.random()<0.05){
    directorGrantSpecialChance(logs,`${currentManagerName()}の練習メモから特殊能力のきっかけを得ました。`,1);
    occurred=true;
  }
  if(occurred)state.managerSupportKey=key;
  return occurred;
}
function decayManagerAnalysisBuff(logs){
  if(!state.managerAnalysisBuffTurns)return;
  state.managerAnalysisBuffTurns--;
  if(state.managerAnalysisBuffTurns<=0){
    logs.push(`${currentManagerName()}の分析メモ効果が終了しました。`);
    state.managerAnalysisBuffTurns=0;
  }
}
function managerChangeOptionsHtml(){
  return `<div class="manager-select-grid">${MANAGER_PORTRAIT_POOL.map(src=>{
    const unlocked=managerUnlocked(src);
    const current=src===currentManagerPortrait();
    const info=managerInfo(src);
    return `<button class="manager-select-card ${unlocked?'':'locked'} ${current?'current':''}" type="button" onclick="chooseGraduationManager('${src}')" ${unlocked?'':'disabled'}>
      <img src="${src}" alt="${info.name}">
      <span>${info.name}${current?'（現在）':''}</span>
      <small>${managerEffectText(src)}</small>
      ${unlocked?'':'<em>まだ選べません</em>'}
    </button>`;
  }).join('')}</div>`;
}
function maybeManagerGraduationEvent(logs){
  if(state.monthIndex!==11 || state.turnIndex!==0)return false;
  if(state.year<2 || state.year%2!==0)return false;
  if(state.managerGraduationYear===state.year)return false;
  state.managerGraduationYear=state.year;
  const body=`<div class="event-seq-card">
    <div class="event-tempo-head"><img class="event-tempo-face" src="${currentManagerPortrait()}" alt="マネージャー"><div><div class="growth-manager">${managerLine('今年度で担当マネージャーが卒業します。')}</div><div class="event-narration-text">3月。春高を目指した日々を支えてくれたマネージャーが、後輩への引き継ぎを始めました。</div></div></div>
    <div class="event-beat top-gap"><div class="event-beat-label">交替</div><div class="compact-effect-more">続投扱いにするか、新しい担当に交替するか選べます。</div></div>
    ${managerChangeOptionsHtml()}
  </div>`;
  enqueueImportantPopup('マネージャー卒業', body, 'event','graduation');
  logs.push('マネージャー卒業イベント：担当を交替できる時期になりました。');
  return true;
}
function chooseGraduationManager(src){
  if(!managerUnlocked(src))return;
  state.managerPortrait=src;
  state.managerName=managerNameForPortrait(src);
  state.managerMessage=`${state.managerName}が担当マネージャーになりました。`;
  saveState();
  const c=document.querySelector('#growthModalContent .popup-scroll-body') || document.getElementById('growthModalContent');
  if(c)c.innerHTML=`<div class="growth-manager">${managerLine('これからよろしくお願いします、監督。')}</div><div class="growth-item">${state.managerName}が担当マネージャーになりました。</div><div class="hint">${managerEffectText(src)}</div>`;
  renderHeader();
}
if(typeof window!=='undefined')window.chooseGraduationManager=chooseGraduationManager;

function runPostTurnEvents(logs, ups=[], context='turn'){
  if(isInitialAprilNoCoachMonth())return;
  const matchWeek=context==='match';

  // 予約済み・強制の進行イベントは維持する。
  maybeForcedCampEvent(logs);
  maybeU18SisterFollowupEvent(logs);
  maybePromiseLastPrefEvents();
  maybePromiseGraduationWeek();
  applyStudyAbroadReturn(logs,ups);
  maybeManagerGraduationEvent(logs);

  // 試合週は通常イベントを発生させない。
  if(!matchWeek){
    maybeU15GoldenGenerationEvent(logs);
    maybeStudyAbroadOffer(logs);
    maybeManagerSupportEvent(logs);
    maybeTeamEvent(logs,ups);
    maybePersonalEvents(logs);
    maybeAnalysisSpecialInsight(logs,context);
  }

  // 通常の能力値上昇はその場でポップアップせず、月替わりの成長報告にまとめる。
  decayTurnBuff(logs);
  decayManagerAnalysisBuff(logs);
}
const SCHOOL_CLASS_ORDER=['新設校','弱小校','中堅校','全国大会出場校','強豪校','名門校'];
function schoolClassIndex(cls){return SCHOOL_CLASS_ORDER.indexOf(cls);}
function setSchoolClassAtLeast(cls){
  const cur=schoolClassIndex(state.schoolClass||'弱小校');
  const nxt=schoolClassIndex(cls);
  if(nxt>=0 && (cur<0 || nxt>cur)){
    state.schoolClass=cls;
    state.trainingLog.push(`学校格が「${cls}」に上がりました。練習レベル・新入部員・スカウト上限に反映されます。`);
    enqueueImportantPopup('学校格アップ', `<div class="growth-manager">${managerLine(`学校格が「${cls}」に上がりました！`)}</div><div class="growth-item">練習レベル・新入部員・スカウト上限に反映されます。</div>`, 'rankup');
    managerSay(`学校格が「${cls}」に上がりました。`);
  }
}


function schoolClassDropRiskText(){
  const w=state.schoolClassDropWatch;
  if(!w||!w.count)return '';
  return '学校評価リスク：格開放ステージの一つ前で1敗中です。次も同段階で負けると学校の格が下がる可能性があります。';
}

function setSchoolClassDownOne(reason, logs){
  const idx=schoolClassIndex(state.schoolClass||'新設校');
  if(idx<=0)return false;
  const before=state.schoolClass;
  const after=SCHOOL_CLASS_ORDER[idx-1];
  state.schoolClass=after;
  state.schoolClassDropWatch=null;
  const msg=`学校の格が「${before}」から「${after}」に下がりました。理由：${reason}`;
  (logs||state.trainingLog).push(msg);
  enqueueImportantPopup('学校の格ダウン', `<div class="growth-manager">${managerLine('学校の評価が下がりました。')}</div><div class="growth-item">${msg}</div><div class="hint">学校の格が下がったため、監督活動の解禁先も再判定されます。</div>`, 'event','rankup');
  managerSay(`学校の格が「${after}」に下がりました。`);
  return true;
}
function classDropStageStatus(tour){
  if(!tour || !['interhigh_pref','haruko_pref','interhigh_nat','haruko_nat'].includes(tour.type))return null;
  const cls=state.schoolClass||'新設校';
  const key=`${tour.type}_${tour.round}`;
  const oneBefore={
    '弱小校':['interhigh_pref_1','haruko_pref_1'],
    '中堅校':['interhigh_pref_2','haruko_pref_2'],
    '全国大会出場校':['interhigh_pref_3','haruko_pref_3'],
    '強豪校':['interhigh_nat_1','haruko_nat_1'],
    '名門校':['interhigh_nat_2','haruko_nat_2']
  }[cls]||[];
  const twoBefore={
    '中堅校':['interhigh_pref_1','haruko_pref_1'],
    '全国大会出場校':['interhigh_pref_2','haruko_pref_2'],
    '強豪校':['interhigh_pref_3','haruko_pref_3'],
    '名門校':['interhigh_nat_1','haruko_nat_1']
  }[cls]||[];
  if(oneBefore.includes(key))return 'one_before';
  if(twoBefore.includes(key))return 'two_before';
  return null;
}
function isBigTournamentLoss(os,ps){
  return ps>os && ((ps-os)>=10 || os<=14);
}
function processSchoolClassDropOnLoss(tour,os,ps,logs){
  if(!tour || os>ps)return;
  const status=classDropStageStatus(tour);
  if(!status)return;
  const lossKey=`${state.schoolClass}:${status}`;
  if(status==='two_before'){
    setSchoolClassDownOne('格開放ステージの2つ前で敗戦',logs);
    return;
  }
  if(status==='one_before' && isBigTournamentLoss(os,ps)){
    setSchoolClassDownOne('格開放ステージの一つ前で大敗',logs);
    return;
  }
  if(status==='one_before'){
    const w=state.schoolClassDropWatch||{};
    if(w.key===lossKey && w.count>=1){
      setSchoolClassDownOne('格開放ステージの一つ前で2回連続敗戦',logs);
    }else{
      state.schoolClassDropWatch={key:lossKey,count:1};
      logs.push('学校の評価が少し下がっています。同じ段階で次も敗れると、学校の格が下がる可能性があります。');
    }
  }
}

function schoolTrainingLevel(){
  const map={'新設校':1,'弱小校':1,'中堅校':2,'全国大会出場校':3,'強豪校':4,'名門校':5};
  return map[state.schoolClass]||1;
}
function effectiveTrainingLevel(lv){
  return Math.max(Number(lv)||0, schoolTrainingLevel());
}


function trainingXp(m,k,lv,mult){const elv=effectiveTrainingLevel(lv);if(m?.effects){const base=Number(m.effects[k]||0);const bonus=Math.ceil(base*(elv*0.10));const highBonus=elv>=6?2:0;return Math.max(1,Math.ceil((base+bonus+highBonus)*mult));}let base=m.type==='single'?20:m.type==='jump'?10:m.type==='receive_category'?6:8;let bonus=Math.ceil(base*(elv*0.10));if(elv>=6)bonus+=8;return Math.max(1,Math.ceil((base+bonus)*mult));} function trainingProgressBarHtml(p,key){
  const cur=Math.floor((p.compXp&&p.compXp[key])||0), need=xpThreshold(p.comps[key]);
  const w=clamp(need?cur/need:0,0,1)*100;
  return `<span class="bar xp-bar mini-xp-bar"><span style="width:${w}%"></span></span>`;
}
// v101: 内部の経験点は画面に出さない。伸びたときは値の変化、伸びていないときは進み具合の棒だけを見せる。
function formatRows(p,rows){return rows.map(r=>`<div class="training-detail">${compLabel(r.key)}${r.up?` <span class="level-up">UP ${r.before}→${r.after}</span>`:` ${trainingProgressBarHtml(p,r.key)}`}</div>`).join('');}
function schoolCfg(){return SCHOOL_CLASSES[state.schoolClass]||SCHOOL_CLASSES['弱小校'];} function weightedCenteredInt(min,max){return Math.round((randomInt(min,max)+randomInt(min,max))/2);} function recruitName(){
  const surnames=withoutReservedSurnames([
    '青山','石川','上原','大森','加納','北川','小森','佐伯','高瀬','橘','中原','西野','花井','藤堂','松井','三浦','宮原','森園',
    '相沢','秋月','朝倉','有村','飯田','池上','一ノ瀬','岩崎','宇佐美','榎本','遠藤','大崎','岡部','小笠原','小野寺','香月',
    '片桐','神谷','川瀬','岸本','木下','久保田','倉橋','黒川','小泉','近藤','榊原','桜井','篠原','白井','杉浦','瀬戸',
    '高梨','武田','千葉','月岡','土屋','戸田','長瀬','成瀬','新田','野口','萩原','早瀬','日向','広瀬','藤崎','星野',
    '真田','水野','南','村瀬','森下','矢島','柳沢','山岸','横田','吉岡','若宮','渡瀬'
  ].concat(EXTRA_GENERATED_SURNAMES));
  const given=[
    'あおい','いろは','花音','美月','莉子','真央','結衣','沙羅','陽菜','紬','凛','琴音','七海','心春','咲良','芽衣',
    '葵','茜','明日香','杏','彩乃','一花','詩織','栞','楓','香澄','奏','小春','すみれ','千夏','千尋','椿',
    '夏帆','乃愛','遥','陽菜乃','雫','美緒','美咲','美羽','美琴','実里','結菜','優花','雪乃','柚希','蘭','梨央'
  ];
  return randomChoice(surnames)+' '+randomChoice(given);
} function archetype(pos){return {OH:{h:[164,176],main:['spikePower','spikeControl','recReception','recDig','recRange','serveControl']},MB:{h:[170,184],main:['blockStuff','blockRead','jump','spikePower']},OP:{h:[168,182],main:['spikePower','blockStuff','servePower','jump']},S:{h:[160,174],main:['tossAccuracy','tossRead','serveControl','mental']},L:{h:[154,166],main:['recReception','recDig','recRange','mental','stamina']}}[pos];}

function cmFromHeightPoint(v){
  // v83: 引数が小数で渡される経路があり（forceRecruitTalent → calcPositionScore25()+1）、
  // 156+v がそのまま身長になって「178.84cm」のような小数身長が生まれていた。
  // 身長は常に整数cmとして扱うため、ここで丸める。
  // v165: heightPoint が cm-155 になったので、逆変換もそろえる。
  const n=Math.round(Number(v)||0);
  if(n>=25)return 180;
  if(n<=1)return 156;
  return 155+n;
}
function capGeneratedRecruitByPositionLimit(recruit, limit, abilityCapOverride=null){
  const cap=clamp(abilityCapOverride ?? ((limit||10)+2),1,25);
  if(recruit.comps){
    for(const k of COMP_KEYS){
      if(typeof recruit.comps[k]==='number')recruit.comps[k]=clamp(recruit.comps[k],1,cap);
    }
  }
  // 身長だけSなどにならないよう、身長評価も同じ上限に収める
  const maxCm=cmFromHeightPoint(cap);
  if(typeof recruit.height==='number')recruit.height=Math.min(recruit.height,maxCm);
  return capAllPositionScores(recruit, limit);
}
const POSITION_SCORE_KEYS={
  OH:['spikePower','spikeControl','jump','recReception','recDig','recRange','blockStuff','blockRead','servePower','serveControl'],
  MB:['blockStuff','blockRead','jump','spikePower','spikeControl','servePower','serveControl','recReception','recDig','recRange'],
  OP:['spikePower','spikeControl','jump','blockStuff','blockRead','servePower','serveControl','recReception','recDig','recRange'],
  S:['tossAccuracy','tossRead','serveControl','servePower','recDig','recRange','blockStuff','blockRead','jump'],
  L:['recReception','recDig','recRange']
};
function highestContributingKeyForPosition(recruit,pos){
  const keys=POSITION_SCORE_KEYS[pos]||COMP_KEYS;
  let best=keys[0], val=-Infinity;
  for(const k of keys){
    const v=recruit.comps?.[k]||1;
    if(v>val){val=v;best=k;}
  }
  return best;
}
function capAllPositionScores(recruit, limit){
  const scoreLimit=clamp(Number(limit)||10,1,25);
  if(!recruit||!recruit.comps)return recruit;
  for(let guard=0;guard<260;guard++){
    const over=POSITIONS.map(pos=>({pos,score:calcPositionScore25(recruit,pos)})).filter(x=>x.score>scoreLimit).sort((a,b)=>b.score-a.score)[0];
    if(!over)break;
    const k=highestContributingKeyForPosition(recruit,over.pos);
    if(k && recruit.comps[k]>1){
      recruit.comps[k]--;
      continue;
    }
    if(recruit.height>150){
      recruit.height--;
      continue;
    }
    break;
  }
  return recruit;
}
const SCOUT_REGION_TRAITS={
  '北海道東北':{keys:['blockStuff','blockRead'], label:'身長・ブロック', text:'北海道東北は、高さとブロック意識のある選手が見つかりやすい地域です。'},
  '関東':{keys:['tossRead','blockRead'], label:'読み・リード', text:'関東は試合経験が多く、読みやリードに優れた選手が出やすいです。'},
  '北陸':{keys:['spikeControl'], label:'コース打ち', text:'北陸は粘り強く、コース打ちの上手い選手が見つかりやすいです。'},
  '東海':{keys:['recReception','recRange'], label:'レセプション・守備範囲', text:'東海は守備の基礎が整った選手が多く、レセプションや守備範囲に期待できます。'},
  '近畿':{keys:['spikePower','servePower'], label:'スパイク決定力・サーブ威力', text:'近畿は攻撃的な選手が多く、スパイク決定力やサーブ威力が伸びやすいです。'},
  '中国':{keys:['recDig'], label:'ディグ', text:'中国地方は粘り強い守備が特徴で、ディグに優れた選手が見つかりやすいです。'},
  '四国':{keys:['tossAccuracy','serveControl'], label:'トス正確性・サーブ制球', text:'四国は丁寧な技術を持つ選手が多く、トス正確性やサーブ制球が期待できます。'},
  '九州':{keys:['jump'], label:'ジャンプ', text:'九州は身体能力の高い選手が見つかりやすく、ジャンプ力に期待できます。'}
};
function scoutRegionTraitText(region){
  const t=SCOUT_REGION_TRAITS[region];
  return t?`${t.text} 特徴能力：${t.label}`:`${region}地方を調査できます。`;
}
function applyScoutRegionTrait(recruit, region, limit){
  const t=SCOUT_REGION_TRAITS[region];
  if(!t||!recruit?.comps)return null;
  const key=randomChoice(t.keys);
  const v=randomInt(Math.max(1,(Number(limit)||10)-2), clamp(Number(limit)||10,1,25));
  recruit.comps[key]=Math.max(recruit.comps[key]||1, v);
  return {key,value:v,label:compLabel(key),regionText:t.text};
}


function randomizeInitialXp(recruit){
  if(!recruit.compXp)recruit.compXp={};
  for(const k of COMP_KEYS){
    const v=recruit.comps?.[k]||1;
    recruit.compXp[k]=randomInt(0, Math.max(0, xpThreshold(v)-1));
  }
  recruit.heightXp=randomInt(0, Math.max(0, xpThreshold(heightPoint(recruit.height))-1));
  return recruit;
}
// v202: 学校の格が上がるほど高身長が出やすくなるようにする（Tak指示）。
//   仕組みは「同じ抽選を複数回して、いちばん高い身長を採用する」。
//   分布の形（ポジションごとのレンジ）は変えず、上に寄るだけなので極端な身長は生まれない。
//   小数は「その確率でもう1回引く」という意味（例 2.5 = 半分の確率で3回引く）。
//   リベロは対象外：ポジション評価に身長が使われない設計なので、高くしても得がなく、
//   他ポジションへ回したときだけ有利になってしまうため（Tak指示）。
// v204: 高身長が増えすぎたため、引き直しの回数を全体的に1段階下げた（Tak指示）。
//        v202: 新設1 / 弱小1 / 中堅1.5 / 全国2 / 強豪2.5 / 名門3.5
const SCHOOL_CLASS_HEIGHT_DRAWS={
  '新設校':1, '弱小校':1, '中堅校':1.2, '全国大会出場校':1.5, '強豪校':2, '名門校':2.5
};
function schoolClassHeightDraws(pos){
  if(pos==='L')return 1;
  const n=SCHOOL_CLASS_HEIGHT_DRAWS[state.schoolClass];
  if(!n||n<=1)return 1;
  let draws=Math.floor(n);
  if(Math.random()<n-draws)draws++;
  return Math.max(1,draws);
}
function randomHeightForArchetype(ar,pos,cap){
  // v202: 学校格に応じた回数だけ引き直し、いちばん高いものを採用する。
  const draws=schoolClassHeightDraws(pos);
  let best=rollHeightForArchetype(ar,pos,cap);
  for(let i=1;i<draws;i++){
    const h=rollHeightForArchetype(ar,pos,cap);
    if(h>best)best=h;
  }
  return best;
}
function rollHeightForArchetype(ar,pos,cap){
  // 身長が高めに偏りすぎないよう、ポジション別レンジではなく全体分布を主に使う。
  // 低身長〜平均身長が多く、MB/OPでも高身長は「出るが確定ではない」程度に抑える。
  const maxByCap=cmFromHeightPoint(cap);
  let base;
  const r=Math.random();
  if(pos==='L'){
    base = r<.70 ? randomInt(150,162) : r<.95 ? randomInt(163,168) : randomInt(169,172);
  }else if(pos==='MB'){
    base = r<.35 ? randomInt(158,166) : r<.78 ? randomInt(167,174) : r<.96 ? randomInt(175,180) : randomInt(181,184);
  }else if(pos==='OP'){
    base = r<.45 ? randomInt(156,166) : r<.82 ? randomInt(167,174) : r<.97 ? randomInt(175,180) : randomInt(181,183);
  }else if(pos==='OH'){
    base = r<.55 ? randomInt(155,165) : r<.88 ? randomInt(166,173) : r<.98 ? randomInt(174,178) : randomInt(179,181);
  }else{
    base = r<.60 ? randomInt(154,164) : r<.90 ? randomInt(165,171) : randomInt(172,176);
  }
  return clamp(Math.min(base+randomInt(-2,2), maxByCap), 150, Math.min(185,maxByCap));
}


// v100: 固有キャラ（対戦校の選手・固定スター）と同じ姓、および学校名と同じ姓は生成しない。
// 対戦相手として画面に出ている名前と、自校の新入部員の名前が被ると世界がぼやけるため。
const EXTRA_RESERVED_SURNAMES=['西条','東堂','西城','氷室','水谷','三上','桐谷','奥村','岬','藤堂','神崎','白石','霧島','吉岡'];
let _reservedSurnameCache=null;
function reservedSurnameSet(){
  if(_reservedSurnameCache)return _reservedSurnameCache;
  const set=new Set(EXTRA_RESERVED_SURNAMES);
  const cut=(n)=>{
    for(const suf of ['高等学校','工大附属高校','女子学院','女学院','女子高校','実業高校','商業高校','学苑','学園','学院','高校','大附属']){
      if(n.endsWith(suf))return n.slice(0,-suf.length);
    }
    return n;
  };
  // OPPONENT_NAME_SETS / NATIONAL_STAR_FACES はこの位置より後で宣言されるので、
  // 未初期化のあいだは参照せずに諦める（キャッシュもしない）。
  let ready=true;
  try{
    for(const [school,names] of Object.entries(OPPONENT_NAME_SETS)){
      set.add(school); set.add(cut(school));
      for(const full of (names||[]))set.add(String(full).split(/\s+/)[0]);
    }
    for(const n of Object.keys(NATIONAL_STAR_FACES))set.add(String(n).split(/\s+/)[0]);
  }catch(e){ ready=false; }
  if(ready)_reservedSurnameCache=set;
  return set;
}
function isReservedSurname(sur){return reservedSurnameSet().has(String(sur||''));}
function withoutReservedSurnames(list){
  const out=(list||[]).filter(x=>!isReservedSurname(String(x).split(/\s+/)[0]));
  return out.length?out:(list||[]);
}
// 予約語で減った分を補うために足した姓（固有キャラ・学校名のいずれとも重ならない）
const EXTRA_GENERATED_SURNAMES=[
  '芦名','安藤','井坂','磯部','市原','稲葉','宇野','梅原','江口','大場','奥山','小田切','笠原','梶谷',
  '金子','神楽坂','木原','沓掛','熊谷','剣持','古賀','斉藤','塩見','志水','杉本','鈴原','曽根','高倉',
  '田所','谷本','塚本','角田','出雲','堂本','中尾','奈良橋','沼田','根岸','野々村','橋詰','浜野','平尾','福地',
  '古谷','細川','本間','前田','増田','三沢','宮地','武藤','村田','元木','矢部','山根','湯浅','吉村','和田',
  '相馬','会田','青島','秋山','浅野','東','安達','阿部','天羽','綾部','荒木','有沢','飯尾','伊賀','池谷',
  '石丸','泉水','磯貝','市毛','伊藤','稲垣','乾','井上','今井','入沢','岩瀬','上田','上野','宇治','臼井',
  '内海','宇都宮','梅木','浦沢','江川','榎木','海老沢','遠山','大井','大石','大坪','大西','大貫','岡田',
  '小川','荻野','奥田','小倉','尾崎','小澤','越智','小尾','海江田','鏡','影島','笠井','梶原','片山','勝田',
  '桂','門脇','金城','兼子','鎌田','上山','亀井','唐沢','川上','河田','川端','菅野','菊地','岸田','喜多',
  '北村','城戸','木村','清川','桐山','日下部','串田','葛西','工藤','国分','窪田','熊野','蔵本','栗原','黒石',
  '桑原','小池','肥後','小島','小平','児玉','小手川','小林','小峰','近江','西郷','酒井','坂上','榊','桜田',
  '笹川','佐々木','篠田','柴崎','渋沢','島崎','清水川','下条','庄司','白川','新開','末永','菅沼','杉山',
  '鈴村','須田','諏訪','関口','芹田','千田','宗田','園部','平良','高木','高塚','滝沢','武井','竹中','田島',
  '立石','田中','谷口','玉置','為田','田村','千賀','知念','塚田','辻本','土井','東儀','時任','徳永','戸沢',
  '殿村','冨田','鳥井','内藤','中井','長岡','中里','永瀬','中津川','夏目','成田','南部','新村','西川','西谷',
  '丹羽','沼倉','根本','野上','野崎','野田','萩野','橋口','長谷部','畑中','服部','花輪','浜田','早瀬川',
  '原口','坂東','東山','樋口','久松','平川','広岡','深沢','福島','藤井','藤村','船越','古川','別所','保坂',
  '穂積','堀内','本郷','舞原','牧野','増渕','町田','松尾','松尾川','丸山','水城','水島','溝口','南田',
  '峯田','宮川','三好','向井','棟方','村岡','室井','茂木','茂原','森本','八重樫','安田','矢代','柳原',
  '山内','山口','山下','弓削','横山','吉井','吉川','米倉','若杉','鷲尾','渡会'
];
const JAPANESE_LAST_NAMES_RAW = [
  '相沢','青柳','秋月','朝比奈','天野','有栖川','有馬','飯島','五十嵐','石動','一ノ瀬','犬飼','今宮','入江','岩倉',
  '上杉','宇佐美','海老原','円城寺','大河内','大崎','大鳥','岡崎','小笠原','奥寺','小此木','小野寺','香坂','風間',
  '片桐','神崎','北条','霧島','久我','九条','倉橋','黒川','小早川','近衛','西園寺','佐伯','榊原','桜庭','篠宮',
  '白石','白鳥','菅原','瀬戸','高梨','鷹司','滝川','橘','千歳','月城','津田','東雲','常盤','轟','長沢','七瀬',
  '鳴海','西条','二階堂','羽柴','花房','早乙女','日向','藤堂','藤宮','星野','真壁','真白','御影','水無瀬','三船',
  '宮園','望月','森園','八神','柳生','結城','柚木','雪村','四条','若槻'
];
let _japaneseLastNamesCache=null;
function japaneseLastNames(){
  if(_japaneseLastNamesCache)return _japaneseLastNamesCache;
  const list=[...new Set(withoutReservedSurnames([...JAPANESE_LAST_NAMES_RAW,...EXTRA_GENERATED_SURNAMES]))];
  if(_reservedSurnameCache)_japaneseLastNamesCache=list;
  return list;
}
const JAPANESE_FIRST_NAMES = [
  'あかり','葵','茜','梓','彩音','杏','伊織','一花','いろは','詩乃','海音','瑛莉','絵麻','乙葉','佳奈','花音',
  '華恋','希実','琴葉','小春','咲良','紗季','沙羅','汐音','雫','朱里','鈴音','千尋','千夏','月乃','紬','透子',
  '凪紗','菜月','七海','寧々','乃愛','陽菜','日和','風花','穂乃花','真央','美琴','美咲','美月','美羽','美緒',
  '結衣','結菜','優花','莉央','莉子','凛','玲奈','若菜'
];
const MIXED_HALF_NAMES_RAW = [
  '白石 アリス','七瀬 エマ','望月 リナ','橘 サラ','星野 ノア','藤宮 ミア','西園寺 レイナ','倉橋 リサ',
  '早乙女 アンナ','小笠原 マリア','有馬 エリカ','真白 カレン','千歳 ルナ','桜庭 ニナ','相沢 ソフィア',
  '神崎 レイラ','一ノ瀬 クララ','朝比奈 アイリス','月城 セリナ','柚木 メイ','黒川 ミラ','花房 ナタリー',
  '水無瀬 エレナ','篠宮 ジュリア','東雲 ローラ'
];
let _mixedHalfNamesCache=null;
function mixedHalfNames(){
  if(_mixedHalfNamesCache)return _mixedHalfNamesCache;
  const list=withoutReservedSurnames(MIXED_HALF_NAMES_RAW);
  if(_reservedSurnameCache)_mixedHalfNamesCache=list;
  return list;
}
const KATAKANA_HALF_NAMES = [
  'ミラー アリス','ブラウン エマ','スミス サラ','ジョンソン ミア','ウィルソン ノア','テイラー リナ',
  'アンダーソン リサ','マーティン アンナ','トンプソン マリア','ハリス エリカ','クラーク カレン',
  'ルイス ルナ','ロビンソン ニナ','ウォーカー レイラ','ホワイト ソフィア','キング クララ',
  'ライト アイリス','グリーン セリナ','ベネット エリス','カーター メイ','モリス ミラ',
  'ネルソン ナタリー','リード エレナ','クーパー ジュリア','ベイカー テレサ','パーカー ローラ'
];
const HALF_LIKE_RECRUIT_PORTRAITS = [
  'assets/recruit_face_04.png','assets/recruit_face_07.png','assets/recruit_face_11.png','assets/recruit_face_16.png',
  'assets/recruit_face_19.png','assets/recruit_face_22.png','assets/recruit_face_27.png','assets/recruit_face_31.png',
  'assets/recruit_face_34.png',
  'assets/recruit_face_37.png','assets/recruit_face_38.png'
];

function splitNameParts(name){
  const parts=String(name||'').trim().split(/\s+/).filter(Boolean);
  return {full:parts.join(' '), last:parts[0]||'', first:parts.length>1?parts.slice(1).join(' '):''};
}
function collectRecruitNameUsage(extraNames=[]){
  const used={full:new Set(), last:new Set(), first:new Set()};
  const add=(name)=>{
    const p=splitNameParts(name);
    if(!p.full)return;
    used.full.add(p.full);
    if(p.last)used.last.add(p.last);
    if(p.first)used.first.add(p.first);
  };
  (state.players||[]).forEach(p=>add(p?.name));
  (state.pendingAprilRecruits||[]).forEach(p=>add(p?.name));
  (state.scoutedPlayers||[]).forEach(s=>{add(s?.name);add(s?.detail?.name);});
  (state.nextYearScoutRecruits||[]).forEach(s=>add(s?.fixedRecruit?.name));
  (extraNames||[]).forEach(add);
  return used;
}
function pickUnusedNamePart(list, usedSet, fallbackPrefix){
  const pool=list.filter(x=>!usedSet.has(x));
  if(pool.length)return randomChoice(pool);
  let i=1;
  while(usedSet.has(`${fallbackPrefix}${i}`))i++;
  return `${fallbackPrefix}${i}`;
}
function pickUniqueFullNameFromPool(pool, used){
  const candidates=pool.filter(n=>{
    const p=splitNameParts(n);
    return p.full && !used.full.has(p.full) && !used.last.has(p.last) && !used.first.has(p.first);
  });
  return candidates.length?randomChoice(candidates):null;
}

function isForeignStyleName(name){
  const p=splitNameParts(name);
  return /[ァ-ンヴー]/.test(p.last||'') || /[ァ-ンヴー]/.test(p.first||'');
}
function foreignNameBudgetAllows(extraNames=[]){
  const used=collectRecruitNameUsage(extraNames);
  const names=[...used.full];
  const total=names.length;
  const current=names.filter(isForeignStyleName).length;
  const max=Math.floor((total+1)/10);
  return current<max;
}

function recruitNameForPortrait(portrait, extraNamesUsed=[], forceForeign=false){
  const used=collectRecruitNameUsage(extraNamesUsed);
  // v85: 海外からの交換留学生は必ず外国名にする。
  // 以前は region を見ておらず、90%の確率で日本名の「交換留学生」が生まれていた。
  if(forceForeign){
    // ハーフ風（和姓＋カタカナ名）ではなく、姓名ともカタカナの名前だけを使う。
    const foreign=pickUniqueFullNameFromPool(KATAKANA_HALF_NAMES, used) || pickUniqueFullNameFromPool(mixedHalfNames(), used);
    if(foreign)return foreign;
  }
  // v150: 外国人の見た目の顔グラを引いたときは、10%の枠に関係なく必ず外国名・ハーフ風の名前にする。
  if(portrait && FOREIGN_LOOK_PORTRAITS.has(portrait)){
    const foreign=pickUniqueFullNameFromPool(KATAKANA_HALF_NAMES.concat(mixedHalfNames()), used);
    if(foreign)return foreign;
  }
  // 外国名・ハーフ風の名前は10%に制限。顔グラの見た目ではなく確率で決める。
  if(foreignNameBudgetAllows(extraNamesUsed) && Math.random()<0.10){
    const foreign=pickUniqueFullNameFromPool(KATAKANA_HALF_NAMES.concat(mixedHalfNames()), used);
    if(foreign)return foreign;
  }
  const last=pickUnusedNamePart(japaneseLastNames(), used.last, '新姓');
  used.last.add(last);
  const first=pickUnusedNamePart(JAPANESE_FIRST_NAMES, used.first, '新名');
  used.first.add(first);
  return `${last} ${first}`;
}
function makeUniqueRecruitName(preferredName, extraNamesUsed=[]){
  const used=collectRecruitNameUsage(extraNamesUsed);
  const p=splitNameParts(preferredName);
  if(p.full && !used.full.has(p.full) && !used.last.has(p.last) && !used.first.has(p.first))return p.full;
  return recruitNameForPortrait('', extraNamesUsed);
}

function generateRecruit(pos,min,max,source='通常入部',forced=null,region=null,abilityCapOverride=null,extraPortraitsUsed=[],extraNamesUsed=[]){
  const ar=archetype(pos),target=forced??weightedCenteredInt(min,max);
  const abilityLimit=max;
  const cap=clamp(abilityCapOverride ?? (abilityLimit+2),1,25);
  let h=randomHeightForArchetype(ar,pos,cap);
  const comps={};
  COMP_KEYS.forEach(k=>comps[k]=clamp(Math.round(target+rand(-5,1)),1,cap));
  ar.main.forEach(k=>comps[k]=clamp(Math.round(target+rand(-1,3)),1,cap));
  for(let i=0;i<80;i++){
    const fake={comps,height:h,role:pos};
    const sc=calcPositionScore25(fake,pos);
    if(sc>=target-1&&sc<=target+1)break;
    if(sc<target){
      ar.main.forEach(k=>comps[k]=clamp(comps[k]+1,1,cap));
      if(false&&pos!=='L'&&Math.random()<.12)h=Math.min(cmFromHeightPoint(cap),h+1);
    }else{
      ar.main.forEach(k=>comps[k]=clamp(comps[k]-1,1,cap));
      if(pos!=='L'&&Math.random()<.25)h=Math.max(150,h-1);
    }
  }
  const id='recruit_'+Date.now()+'_'+state.recruitSerial++;
  const portrait=pickRecruitPortrait(extraPortraitsUsed);
  const recruit=p(id,recruitNameForPortrait(portrait,extraNamesUsed,region==='海外'),1,pos,source,portrait,h,randomChoice(['普通','早熟','晩成','技術型','身体能力型']),false,0,[source],comps,generatedHandForRecruit(pos,!!region));
  const regionTrait=applyScoutRegionTrait(recruit, region, abilityLimit);
  if(regionTrait)recruit.regionTrait=regionTrait;
  // v195: 新規生成選手は5種類の性格から均等に抽選する（Tak指示）。ポジションとは紐づけない。
  recruit.personality=rollPersonality();
  return randomizeInitialXp(capGeneratedRecruitByPositionLimit(recruit, abilityLimit, abilityCapOverride));
}
function gradeUpIfNeeded(){
  if(state.monthIndex===0 && state.turnIndex===0 && state.year>state.lastGradeUpYear){
    state.players.forEach(p=>{ if(typeof p.year==='number')p.year++; });
    state.seasonNationalResult={interhigh:null,haruko:null};
    state.lastGradeUpYear=state.year;
    state.trainingLog.push(`${state.year}年目の4月です。全選手の学年が1つ上がりました。`);
    // v197: 「最初の約束」の進級イベント（Tak指示）
    maybePromiseGradeUpEvent();
    return true;
  }
  return false;
}
function makeAprilRecruitCandidates(){
  const cfg=schoolCfg();
  const cnt=randomInt(cfg.recruits[0],cfg.recruits[1]);
  const aprilGreatChance=aprilGreatRecruitChanceBase();
  state.trainingLog.push(`学校格「${state.schoolClass}」により、通常新入部員は${cfg.recruits[0]}〜${cfg.recruits[1]}人、評価上限は${cfg.max}で生成します。特殊能力の付与率はスカウト成功時と同じ扱いです。${isU15GoldenRecruitYear()?'U-15黄金世代効果により、大成功扱い候補の確率が2倍です。':''}`);
  let special=false,arr=[];
  const reservedPortraits=[];
  const reservedNames=[];
  for(let i=0;i<cnt;i++){
    let max=cfg.max;
    if(!special&&Math.random()<aprilGreatChance){max+=2;special=true;}
    const r=generateRecruit(randomChoice(POSITIONS),cfg.min,max,'通常入部',null,null,null,reservedPortraits,reservedNames);
    const talents=assignGeneratedTalent(r,max,true,reservedNames,reservedPortraits);
    applyScoutSpecialRules(r,'成功');
    r.joinSource='通常入部';
    if(r?.portrait)reservedPortraits.push(r.portrait);
    if(r?.name)reservedNames.push(r.name);
    arr.push(r);
  }
  for(const s of state.nextYearScoutRecruits){
    const r=s.fixedRecruit ? s.fixedRecruit : generateRecruit(s.pos,s.min,s.max,`スカウト/${s.region}/${s.result}`,s.target,s.region,s.abilityCap||null,reservedPortraits,reservedNames);
    // v85: 交換留学生などは s.source に本来の出自が入っているので、それを優先して残す。
    // 以前は一律「スカウト/地域/結果」で上書きしており、交換留学生であることが分からなくなっていた。
    r.joinSource=s.source ? `${s.source}/${s.result}` : `スカウト/${s.region}/${s.result}`;
    if(r?.portrait)reservedPortraits.push(r.portrait);
    if(r?.name)reservedNames.push(r.name);
    arr.push(r);
  }
  // 2026-07-26 Supabase統合: プロ入り1名につき翌年度に大成功品質の入部希望者を1名追加。
  const proBonus=Math.max(0,Number(state.proRecruitBonus||0));
  for(let i=0;i<proBonus;i++){
    const pos=randomChoice(POSITIONS);
    const max=cfg.scoutGreat?.[1]||Math.min(25,cfg.max+2);
    const min=cfg.scoutGreat?.[0]||Math.max(cfg.min,max-2);
    const r=generateRecruit(pos,min,max,'プロ入り実績による入部希望',max,null,Math.min(25,max+2),reservedPortraits,reservedNames);
    assignGeneratedTalent(r,max,false,reservedNames,reservedPortraits);
    applyScoutSpecialRules(r,'大成功');
    r.joinSource='プロ入り実績／大成功';
    if(r?.portrait)reservedPortraits.push(r.portrait);
    if(r?.name)reservedNames.push(r.name);
    arr.push(r);
  }
  appendU18SisterToAprilCandidates(arr,reservedPortraits,reservedNames);
  state.proRecruitBonus=0;
  return arr;
}

// v100: チェックボックスをやめ、「合格」バッジのアクティブ/非アクティブで選ぶUIにした。
// 初期選択は0名（入部確定の選手だけは最初から合格で、外せない）。
function selectedAprilRecruitIndexes(){
  return [...document.querySelectorAll('.april-recruit-pick.is-selected')].map(el=>Number(el.dataset.index)).filter(n=>!Number.isNaN(n));
}
function updateAprilRecruitCount(){
  const warn=document.getElementById('aprilRecruitWarning');
  const count=selectedAprilRecruitIndexes().length;
  const total=(state.pendingAprilRecruits||[]).length;
  const over=count>10;
  const btn=document.getElementById('confirmAprilRecruitBtn');
  if(btn)btn.disabled=over;
  if(warn)warn.innerHTML=`合格：<strong class="${over?'april-over':''}">${count}</strong>人 / 候補${total}人 / 最大10人<br><span class="hint">${over?'10人を超えています。誰かを外してください。':'カードを押すと「合格」が切り替わります。0人のまま進めることもできます。'}</span>`;
}
function toggleAprilRecruitCard(el){
  if(!el||el.dataset.locked==='1')return;
  const willSelect=!el.classList.contains('is-selected');
  if(willSelect && selectedAprilRecruitIndexes().length>=10){
    const warn=document.getElementById('aprilRecruitWarning');
    if(warn)warn.innerHTML='<strong class="april-over">10人まで</strong>です。誰かを外してから選んでください。';
    return;
  }
  el.classList.toggle('is-selected');
  el.setAttribute('aria-pressed',el.classList.contains('is-selected')?'true':'false');
  updateAprilRecruitCount();
}

function aprilCandidateSortScore(p){
  const posScore=calcPositionScore25(p,p.role);
  const talent=(p.special||[]).filter(s=>TALENT_SPECIALS.includes(s)).length*2;
  const scout=(p.joinSource||'').includes('スカウト') || (p.joinSource||'').includes('OG妹') || (p.joinSource||'').includes('U-18') ? 4 : 0;
  const mandatory=p?.mandatoryRecruit?100:0;
  return posScore + talent + scout + mandatory;
}
function showAprilRecruitSelection(){
  const modal=document.getElementById('aprilRecruitModal');
  const list=document.getElementById('aprilRecruitList');
  if(!modal||!list)return;
  const arr=[...(state.pendingAprilRecruits||[])].sort((a,b)=>aprilCandidateSortScore(b)-aprilCandidateSortScore(a));
  state.pendingAprilRecruits=arr;
  list.innerHTML=arr.map((p,i)=>{
    const mandatory=!!p.mandatoryRecruit;
    const score=calcPositionScore25(p,p.role);
    const talents=(p.special||[]).filter(s=>TALENT_SPECIALS.includes(s)).map(s=>specialChipHtml(s)).join(' ');
    return `<div class="april-recruit-pick${mandatory?' is-selected is-locked':''}" data-index="${i}" data-locked="${mandatory?1:0}" role="button" tabindex="0" aria-pressed="${mandatory?'true':'false'}">
      <div class="april-recruit-stamp">${mandatory?'入部確定':'合格'}</div>
      <img class="april-recruit-face" src="${p.portrait||'assets/new_shino.png'}" alt="">
      <div class="april-recruit-body">
        <div class="april-recruit-name"><strong>${p.name}</strong> <span class="mini-tag">${p.role}:${positionRatingLetter(score,p.role)}</span></div>
        <div class="meta">${p.joinSource||'入部候補'} / ${p.height}cm${talents?` / ${talents}`:''}</div>
        <div class="meta">${coloredRecruitPositionSummary(p)}</div>
      </div>
    </div>`;
  }).join('');
  list.querySelectorAll('.april-recruit-pick').forEach(el=>{
    el.addEventListener('click',()=>toggleAprilRecruitCard(el));
    el.addEventListener('keydown',(e)=>{ if(e.key===' '||e.key==='Enter'){e.preventDefault();toggleAprilRecruitCard(el);} });
  });
  updateAprilRecruitCount();
  modal.classList.remove('hidden');
  modal.style.display='flex';
}
function closeAprilRecruitSelection(){
  const m=document.getElementById('aprilRecruitModal');
  if(m){m.classList.add('hidden');m.style.display='';}
}
function confirmAprilRecruitSelection(){
  const idxs=selectedAprilRecruitIndexes();
  const warn=document.getElementById('aprilRecruitWarning');
  if(idxs.length>10){if(warn)warn.textContent='10人を超えています。10人以下にしてください。';return;}
  const arr=state.pendingAprilRecruits||[];
  const selected=idxs.map(i=>arr[i]).filter(Boolean);
  if(selected.length){
    state.players.push(...selected);
    // v172: 新入部員も、ベンチに空きがあればベンチに入れる（Tak指示）。
    selected.forEach(p=>addToBenchIfSpace(p.id));
    ensureMonthlyReportState();
    const snapPlayers=state.monthReportSnapshot?.players;
    if(Array.isArray(snapPlayers)){
      selected.forEach(p=>{
        if(!snapPlayers.some(x=>String(x.id)===String(p.id))){
          snapPlayers.push({id:p.id,name:p.name,portrait:p.portrait||'',role:p.role||'',comps:{...(p.comps||{})},height:p.height});
        }
      });
    }
  }
  const joinedU18Sister=selected.find(p=>p?.u18SisterRecruit);
  if(joinedU18Sister && state.u18SisterReward){
    state.u18SisterReward.consumed=true;
    state.u18SisterReward.joinedPlayerId=joinedU18Sister.id;
    // v208: この妹が3年生になる年を記録する。その年を過ぎたら次の妹を受け取れる（Tak指示）。
    state.u18SisterGraduationYear=(Number(state.year)||1)+2;
  }
  state.nextYearScoutRecruits=[];
  state.scoutedPlayers=[];
  state.pendingAprilRecruits=[];
  state.aprilRecruitSelectionOpen=false;
  state.showAprilRecruitSelectionAfterPopup=false;
  state.aprilRecruitSelectionYear=state.year;
  state.lastRecruitYear=state.year;
  state.trainingLog.push(selected.length?`新年度入部：${selected.map(p=>nameSpan('若葉高校',p.name)).join('、')} が入部しました。`:'新年度入部：今年度は入部許可を出した選手はいませんでした。');
  enqueueImportantPopup('新年度入部', `<div class="growth-manager">${managerLine(selected.length?'選んだ新入部員が入部しました！':'今年度の新入部員選考を終了しました。')}</div>`+(selected.length?selected.map(p=>`<div class="growth-item">${nameSpan('若葉高校',p.name)} / ${p.height}cm / ${p.role}</div>`).join(''):'<div class="growth-item">入部許可者なし</div>'), 'recruit');
  managerSay(selected.length?`${selected.length}人が入部しました。選手欄で確認できます。`:'今年度の入部許可者はいませんでした。');
  closeAprilRecruitSelection();
  renderAll();
  saveState();
}
// v100: 年度切替（3月第4週の終わり → 4月第1週の開始）で選考を開く本体。
function openAprilRecruitSelectionAtYearRollover(){
  if(state.year===1)return false;
  if(state.lastRecruitYear===state.year)return false;
  if(state.aprilRecruitSelectionOpen)return false;
  gradeUpIfNeeded();
  const arr=makeAprilRecruitCandidates();
  state.pendingAprilRecruits=arr;
  state.aprilRecruitSelectionOpen=true;
  state.showAprilRecruitSelectionAfterPopup=true;
  state.aprilRecruitSelectionYear=state.year;
  managerSay(`年度が替わりました。候補${arr.length}人から、入部を許可する選手を選んでください。`);
  enqueueTwoStepEvent('新入部員選考',`三月が終わり、新しい年度が始まります。入部希望者が体育館に集まりました。スカウト済みの有力候補も含め、ここで入部を許可する選手を選びます。<br>候補は${arr.length}人。最大10人まで。誰も選ばずに進めることもできます。`,'','event','new_students');   // v132: 結果を見るは不要
  return true;
}
// 4月第1週に入ったときの保険。年度切替で開けていなければここで開く。
function addAprilRecruitsIfNeeded(){
  if(state.year===1&&state.monthIndex===0&&state.turnIndex===0)return[];
  if(state.monthIndex!==0||state.turnIndex!==0||state.lastRecruitYear===state.year)return[];
  if(state.aprilRecruitSelectionOpen){showAprilRecruitSelection();return null;}
  openAprilRecruitSelectionAtYearRollover();
  return null;
}
function performScout(region,pos){
  const cfg=schoolCfg();
  const successRange=cfg.scoutSuccess||[Math.max(1,cfg.max-2),cfg.max];
  const greatRange=cfg.scoutGreat||[cfg.max+1,cfg.max+2];
  const greatCap=clamp(greatRange[1]+2,1,25);
  const greatChance=scoutGreatChanceBase();
  const cfgNote=`${scoutRegionTraitText(region)} 学校格「${state.schoolClass}」のスカウト基準：成功${successRange[0]}〜${successRange[1]}、大成功${greatRange[0]}〜${greatRange[1]}、大成功能力上限${greatCap}${isU15GoldenGenerationActive()?'。U-15黄金世代効果：大成功率2倍':''}`;

  const matchedRumor=findScoutRumor(region,pos);
  if(matchedRumor){
    const rumor=matchedRumor;
    const target=greatRange[1];
    const recruit=generateRecruit(pos,greatRange[0],greatRange[1],`スカウト/${region}/大成功/噂`,target,region,greatCap);
    assignGeneratedTalent(recruit,greatRange[1],false);
    if (!recruit.special.includes('噂の逸材')) recruit.special.push('噂の逸材');
    const acquired=applyScoutSpecialRules(recruit,'大成功');
    state.nextYearScoutRecruits.push({region,pos,result:'大成功',min:greatRange[0],max:greatRange[1],target,abilityCap:greatCap,fixedRecruit:recruit,source:'スカウトの噂'});
    state.scoutedPlayers.push({name:recruit.name, portrait:recruit.portrait, height:recruit.height, pos, region, result:'大成功', summary:recruitPositionSummary(recruit), year:state.year+1, rumor:true, detail:recruit, source:'スカウトの噂'});
    removeScoutRumor(rumor);
    return{result:'大成功', recruit, text:`スカウトの噂から大成功の選手を発見しました。${recruit.name}を来年度加入候補に追加しました。${scoutSpecialText(acquired)}`};
  }

  // 噂と違う地域・ポジションをスカウトした場合、噂は消費しない
  const r=Math.random();
  if(r<greatChance){
    const target=weightedCenteredInt(greatRange[0],greatRange[1]);
    const recruit=generateRecruit(pos,greatRange[0],greatRange[1],`スカウト/${region}/大成功`,target,region,greatCap);
    assignGeneratedTalent(recruit,greatRange[1],false);
    const acquired=applyScoutSpecialRules(recruit,'大成功');
    state.nextYearScoutRecruits.push({region,pos,result:'大成功',min:greatRange[0],max:greatRange[1],target,abilityCap:greatCap,fixedRecruit:recruit});
    state.scoutedPlayers.push({name:recruit.name,portrait:recruit.portrait,height:recruit.height,pos,region,result:'大成功',summary:recruitPositionSummary(recruit),year:state.year+1,rumor:false,detail:recruit});
    return{result:'大成功', recruit, text:`大成功の選手を発見しました。${recruit.name}を来年度加入候補に追加しました。${scoutSpecialText(acquired)}`};
  }
  if(r<.95){
    const target=weightedCenteredInt(successRange[0],successRange[1]);
    const recruit=generateRecruit(pos,successRange[0],successRange[1],`スカウト/${region}/成功`,target,region);
    assignGeneratedTalent(recruit,successRange[1],false);
    const acquired=applyScoutSpecialRules(recruit,'成功');
    state.nextYearScoutRecruits.push({region,pos,result:'成功',min:successRange[0],max:successRange[1],target,fixedRecruit:recruit});
    state.scoutedPlayers.push({name:recruit.name,portrait:recruit.portrait,height:recruit.height,pos,region,result:'成功',summary:recruitPositionSummary(recruit),year:state.year+1,rumor:false,detail:recruit});
    return{result:'成功', recruit, text:`${recruit.name}を来年度加入候補に追加しました。${scoutSpecialText(acquired)}`};
  }
  return{result:'失敗',text:`${region}で${pos}候補を探しましたが、有望選手は見つかりませんでした。`};
}

const RUMOR_TRAITS = [
  { region:'北海道東北', pos:'MB', key:'blockStuff', label:'シャット力の高いミドルブロッカー' },
  { region:'北海道東北', pos:'OP', key:'blockStuff', label:'高さとシャット力のあるオポジット' },
  { region:'関東', pos:'S', key:'tossRead', label:'トスの読みが鋭いセッター' },
  { region:'関東', pos:'MB', key:'blockRead', label:'リードの良いミドルブロッカー' },
  { region:'近畿', pos:'OP', key:'spikePower', label:'スパイク決定力の高いオポジット' },
  { region:'近畿', pos:'OH', key:'spikePower', label:'強打が魅力のアウトサイドヒッター' },
  { region:'近畿', pos:'OP', key:'servePower', label:'サーブ威力のあるオポジット' },
  { region:'北陸', pos:'OH', key:'spikeControl', label:'スパイクコントロールの良いアウトサイドヒッター' },
  { region:'東海', pos:'L', key:'recReception', label:'レセプションの安定したリベロ' },
  { region:'東海', pos:'OH', key:'recRange', label:'守備範囲の広いアウトサイドヒッター' },
  { region:'中国', pos:'L', key:'recDig', label:'ディグの上手いリベロ' },
  { region:'中国', pos:'OH', key:'recDig', label:'強打への反応が良いアウトサイドヒッター' },
  { region:'四国', pos:'S', key:'tossAccuracy', label:'トスの正確性が高いセッター' },
  { region:'四国', pos:'OH', key:'serveControl', label:'サーブコントロールの良いアウトサイドヒッター' },
  { region:'九州', pos:'OH', key:'jump', label:'ジャンプ力の高いアウトサイドヒッター' },
  { region:'九州', pos:'MB', key:'jump', label:'跳躍力のあるミドルブロッカー' },
];


function scoutRumorList(){
  if(Array.isArray(state.scoutRumors))return state.scoutRumors;
  if(state.scoutRumor){
    state.scoutRumors=[state.scoutRumor];
    state.scoutRumor=null;
    return state.scoutRumors;
  }
  state.scoutRumors=[];
  return state.scoutRumors;
}
function eventScoutRumorList(){return scoutRumorList().filter(r=>r&&r.source==='event');}
function findScoutRumor(region,pos){
  return eventScoutRumorList().find(r=>r.region===region && r.pos===pos) || null;
}
function removeScoutRumor(rumor){
  if(!rumor)return;
  const arr=scoutRumorList();
  const idx=arr.indexOf(rumor);
  if(idx>=0)arr.splice(idx,1);
}
function scoutRumorText(r){
  return `スカウトの噂：${r.region}地方の${r.pos}に、${r.label}がいるようです。次に「${r.region}」で「${r.pos}」をスカウトすると、大成功の選手が見つかります。`;
}

function maybeScoutRumor() {
  if(isMarchMonth())return null;
  const existing=new Set(scoutRumorList().map(r=>`${r.region}|${r.pos}`));
  const candidates=RUMOR_TRAITS.filter(r=>!existing.has(`${r.region}|${r.pos}`));
  if(!candidates.length)return null;
  const r = { ...randomChoice(candidates), source:'event', year: state.year, monthIndex: state.monthIndex, id: `rumor_${Date.now()}_${Math.random().toString(36).slice(2)}` };
  scoutRumorList().push(r);
  const msg = scoutRumorText(r);
  managerSay(msg);
  state.trainingLog.push(msg);
  return msg;
}





function recruitPositionSummary(recruit) {
  return POSITIONS.map(pos => `${pos}:${calcPositionScore25(recruit,pos)}`).join(' / ');
}

function rumorDescriptionFor(region) {
  const rumors=eventScoutRumorList().filter(r=>r.region===region);
  if (rumors.length) {
    return rumors.map(r=>`この地域には、${r.pos}の${r.label}がいるとの噂です。「${r.region}」で「${r.pos}」を選ぶと大成功になります。`).join('<br>');
  }
  const fallbackTraits = {
    '北海道東北': '身長・ブロック',
    '関東': 'リード・トス読み',
    '北陸': 'コース打ち',
    '東海': 'レセプション・守備範囲',
    '近畿': 'スパイク決定力・サーブ威力',
    '中国': 'ディグ',
    '四国': 'トス正確性・サーブ制球',
    '九州': 'ジャンプ'
  };
  const trait = fallbackTraits[region];
  return trait ? `${region}地方は「${trait}」系の選手が出やすい地域です。` : `${region}地方を調査できます。`;
}




const DIRECTOR_VISIT_PLACES=[
  {id:'street',label:'街',minClass:'弱小校',help:'街を歩き、地域の人脈・小さな支援・スカウトの噂を拾います。'},
  {id:'shopping',label:'商店街',minClass:'中堅校',help:'商店街の協力を得て、機材・差し入れ・地域スポンサーの支援を狙います。'},
  {id:'junior',label:'地元の中学校',minClass:'全国大会出場校',help:'地元中学との関係を作り、将来の有望選手や合同練習につなげます。'},
  {id:'association',label:'バレーボール協会',minClass:'強豪校',help:'協会関係者との接点を作り、強化試合・外部指導・海外ルートを狙います。'}
];
function schoolClassAtLeast(cls){
  const cur=schoolClassIndex(state.schoolClass||'新設校');
  const req=schoolClassIndex(cls);
  return cur>=0 && req>=0 && cur>=req;
}
function directorActivityAvailable(){
  return schoolClassAtLeast('弱小校');
}
function unlockedDirectorPlaces(){
  return DIRECTOR_VISIT_PLACES.filter(p=>schoolClassAtLeast(p.minClass));
}
function currentDirectorPlace(){
  const places=unlockedDirectorPlaces();
  if(!places.length)return null;
  return places.find(p=>p.id===state.directorVisitPlace)||places[0];
}
function directorPlaceOptionsHtml(selected=''){
  const places=unlockedDirectorPlaces();
  return places.map(p=>`<option value="${p.id}" ${p.id===selected?'selected':''}>${p.label}</option>`).join('');
}
function directorPlaceHelp(id){
  const p=DIRECTOR_VISIT_PLACES.find(x=>x.id===id);
  if(!p)return '訪問先を選んでください。';
  return `${p.label}：${p.help}`;
}
function refreshDirectorVisitSelects(){
  const selected=(currentDirectorPlace()?.id)||'';
  ['directorVisitSelect','directorVisitModalSelect'].forEach(id=>{
    const el=document.getElementById(id);
    if(el){el.innerHTML=directorPlaceOptionsHtml(selected);el.value=selected;}
  });
  const h=document.getElementById('directorVisitHelp');
  if(h)h.textContent=directorPlaceHelp(selected);
}
function openDirectorVisitModal(mode='execute'){
  if(!directorActivityAvailable()){
    managerSay('新設校の間は、監督活動はまだ行えません。まずは地区大会で実績を作りましょう。');
    return;
  }
  directorVisitMode=mode==='select'?'select':'execute';
  refreshDirectorVisitSelects();
  resetDirectorVisitModal();
  const confirm=document.getElementById('confirmDirectorVisitBtn');
  if(confirm)confirm.textContent=directorVisitMode==='select'?'この訪問先にする':'訪問する';
  const m=document.getElementById('directorVisitModal');
  if(m){m.classList.remove('hidden');m.style.display='flex';}
  if(directorVisitMode==='execute'){
    const p=currentDirectorPlace();
    if(p)setTimeout(()=>openDirectorChoiceEvent(p.id),0);
  }
}
function closeDirectorVisitModal(){
  const m=document.getElementById('directorVisitModal');
  if(m){m.classList.add('hidden');m.style.display='';}
  resetDirectorVisitModal();
  const confirm=document.getElementById('confirmDirectorVisitBtn');
  if(confirm)confirm.textContent='訪問する';
  directorVisitMode='execute';
}
function createDirectorScoutRumor(){
  const r = { ...randomChoice(RUMOR_TRAITS), source:'event', year: state.year, monthIndex: state.monthIndex, id: `director_rumor_${Date.now()}_${Math.random().toString(36).slice(2)}` };
  scoutRumorList().push(r);
  return scoutRumorText(r);
}
function ensureDirectorLegacy(){
  if(!state.directorLegacy)state.directorLegacy={equipment:0,pipeline:0,studyRoutes:[],contacts:[],exchangeStudents:0,u18Access:false};
  if(!Array.isArray(state.directorLegacy.studyRoutes))state.directorLegacy.studyRoutes=[];
  if(!Array.isArray(state.directorLegacy.contacts))state.directorLegacy.contacts=[];
  return state.directorLegacy;
}
function addDirectorEquipment(logs,label='練習器具',amount=1){
  ensureDirectorLegacy();
  const before=state.equipmentLevel||0;
  state.equipmentLevel=clamp(before+amount,0,6); // v68: 機材Lvの仕様上限を6に統一(旧10。無制限増加バグ修正の一環)
  state.directorLegacy.equipment=(state.directorLegacy.equipment||0)+amount;
  if(state.equipmentLevel>before){
    logs.push(`${label}を入手しました。練習Lvが${before}→${state.equipmentLevel}に上がりました。`);
  }else{
    logs.push(`${label}を見つけました。設備資産として記録されます。`);
  }
}
function setDirectorTrainingBuff(logs,label,mult=1.10,turns=2,cat='all'){
  state.eventTrainingBuff={cat,mult,turns,label};
  logs.push(`${label}：${turns}週間、練習効率が上がります。`);
}

function unlockStudyAbroadRoute(route, logs, source='人脈'){
  ensureDirectorLegacy();
  const d=STUDY_ABROAD_DESTINATIONS[route];
  if(!d)return false;
  if(!state.directorLegacy.studyRoutes.includes(route)){
    state.directorLegacy.studyRoutes.push(route);
    logs.push(`${source}で、${d.city}留学ルートが追加されました。`);
    return true;
  }
  logs.push(`${d.city}留学ルートの情報を更新しました。第二部にも引き継がれる人脈として記録されます。`);
  return false;
}

function directorGrantXp(logs, label, keys, xp=120, count=3){
  const players=samplePlayers(count, p=>!isPlayerAbsent(p));
  if(!players.length)return;
  logs.push(label);
  players.forEach(p=>{
    keys.forEach(k=>{
      const before=p.comps[k], up=addXp(p,k,xp), after=p.comps[k];
      if(up)logs.push(`${nameSpan('若葉高校',p.name)}：${compLabel(k)} ${abilityChangeHtml(before,after,k)}`);
    });
  });
}
function directorGrantSpecialChance(logs, label, count=1){
  const pool=availablePlayers().filter(p=>Array.isArray(p.special));
  if(!pool.length)return;
  logs.push(label);
  for(let i=0;i<count;i++){
    const p=randomChoice(pool);
    const sp=pickNormalSpecialForRecruit(p);
    if(sp && grantSpecialIfEligible(p,sp,'監督活動による出張指導')){
      logs.push(`${nameSpan('若葉高校',p.name)}が出張指導で ${specialChipHtml(sp)} の感覚をつかみました。`);
    }else{
      directorGrantXp(logs, `${nameSpan('若葉高校',p.name)}は出張指導で基礎を磨きました。`, ['mental','stamina'], 120, 1);
    }
  }
}
function createDirectorPracticeMatch(logs, name='紹介された練習試合校', strong=false){
  state.practiceMatch=null;
  const isU18=String(name).includes('U-18');
  const opp=isU18?buildU18AllStarOpponent():createPracticeOpponent();
  opp.name=isU18?'U-18日本代表':name;
  // U18は所属校の固定能力をそのまま使い、一律+3補正をかけない。
  if(strong && !isU18 && opp.players){
    Object.values(opp.players).forEach(p=>{
      for(const k of COMP_KEYS){ if(typeof p[k]==='number')p[k]=clamp(p[k]+3,1,25); }
    });
  }
  setPracticeMatch(opp);
  logs.push(`${opp.name}と${isU18?'強化試合':'練習試合'}を組めました。試合画面で実施できます。${isU18?' 全国大会で戦うトップ選手7名によるオールスターです。':''}`);
}
function introduceExchangeStudent(logs, forcedTalent=null){
  ensureDirectorLegacy();
  const pos=randomChoice(POSITIONS);
  const cfg=schoolCfg();
  const greatRange=cfg.scoutGreat||[Math.max(cfg.max+1,12),Math.max(cfg.max+2,14)];
  const min=greatRange[0], max=greatRange[1];
  const recruit=generateRecruit(pos,min,max,'協会紹介/交換留学生/大成功',max,'海外',Math.min(25,max+2));
  recruit.joinSource='協会紹介/交換留学生/大成功';
  const talent=forcedTalent||randomChoice(['神童','怪物','努力の天才']);
  forceRecruitTalent(recruit,talent);
  if(!recruit.special.includes('噂の逸材'))recruit.special.push('噂の逸材');
  const sp=pickNormalSpecialForRecruit(recruit);
  if(sp)addRecruitSpecial(recruit,sp);
  state.nextYearScoutRecruits.push({region:'海外',pos,result:'大成功',min,max,target:max,abilityCap:Math.min(25,max+2),fixedRecruit:recruit,source:'バレーボール協会/交換留学生'});
  state.scoutedPlayers.push({name:recruit.name,portrait:recruit.portrait,height:recruit.height,pos,region:'海外',result:'大成功',summary:recruitPositionSummary(recruit),year:state.year+1,rumor:false,detail:recruit,source:'バレーボール協会/交換留学生'});
  state.directorLegacy.exchangeStudents=(state.directorLegacy.exchangeStudents||0)+1;
  // v205: 名前・ポジション・身長・本人の一言は出さない（Tak指示）。誰が来たのかはスカウト一覧で確認する。
  logs.push(`協会の交換留学制度で、${specialChipHtml(talent)} を持つ留学生候補を紹介されました。来年度加入予定です。`);
}



// v195: バレーボール協会で「U-15日本代表経験者」を紹介されるイベント（Tak指示）。
//   交換留学生（introduceExchangeStudent）と対になる国内版。
//   能力水準・才能保証・上限処理は交換留学生と同じ式をそのまま使い、日本人版だけ別の強さにはしない。
//   違いは出自（国内／日本人名）と出自ラベルだけ。
//   地域補正（applyScoutRegionTrait）は交換留学生と同じく掛けない。generateRecruit に region を渡さないことで
//   日本人名になり、かつ地域補正も入らない＝交換留学生と同等になる。
//   性格は generateRecruit の中で通常どおり5種類から抽選される。
function introduceU15JapanStar(logs, forcedTalent=null){
  ensureDirectorLegacy();
  const pos=randomChoice(POSITIONS);
  const cfg=schoolCfg();
  const greatRange=cfg.scoutGreat||[Math.max(cfg.max+1,12),Math.max(cfg.max+2,14)];
  const min=greatRange[0], max=greatRange[1];
  const label='協会紹介/U-15日本代表経験者';
  const recruit=generateRecruit(pos,min,max,`${label}/大成功`,max,null,Math.min(25,max+2));
  recruit.joinSource=`${label}/大成功`;
  const talent=forcedTalent||randomChoice(['神童','怪物','努力の天才']);
  forceRecruitTalent(recruit,talent);
  if(!recruit.special.includes('噂の逸材'))recruit.special.push('噂の逸材');
  const sp=pickNormalSpecialForRecruit(recruit);
  if(sp)addRecruitSpecial(recruit,sp);
  state.nextYearScoutRecruits.push({region:'国内',pos,result:'大成功',min,max,target:max,abilityCap:Math.min(25,max+2),fixedRecruit:recruit,source:label});
  state.scoutedPlayers.push({name:recruit.name,portrait:recruit.portrait,height:recruit.height,pos,region:'国内',result:'大成功',summary:recruitPositionSummary(recruit),year:state.year+1,rumor:false,detail:recruit,source:label});
  logs.push(`協会の紹介で、${specialChipHtml(talent)} を持つU-15日本代表経験者 ${nameSpan(ownSchoolName(),recruit.name)} が来年度の入部を希望しています。`);
}

const DIRECTOR_EVENT_SCENES={
  street:{
    intro:'商店街から一本入った通りを歩く。夕方の空気に、どこかの家の夕飯のにおいが混じっている。角の自転車屋の前で、常連らしい人たちが立ち話をしていた。「{{略称}}さん、最近よう練習しとるね」——この街では、部活の話も世間話のうちらしい。',
    choices:[
      {id:'ask',label:'地域の人に話を聞く',desc:'有望選手の噂を拾えるかもしれない'},
      {id:'bazaar',label:'バザーをのぞく',desc:'練習器具や差し入れが見つかるかもしれない'},
      {id:'gym',label:'体育館周りを見に行く',desc:'OGや経験者に会えるかもしれない'}
    ]
  },
  shopping:{
    intro:'アーケードに入ると、スポーツ用品店のワゴンセールが目に入った。店先ではジャージ姿の中学生が数人、シューズを見比べている。奥のレジでは店長が常連客と何やら話し込んでいた。',
    choices:[
      {id:'equipment',label:'練習器具を見に行く',desc:'セール品に当たりがあるかもしれない'},
      {id:'drink',label:'スポーツドリンクを買う',desc:'短期的に練習効率を上げやすい'},
      {id:'rumor',label:'店長に話を聞く',desc:'スカウトや留学先の話につながることがある'}
    ]
  },
  junior:{
    intro:'地元の中学校の体育館は、放課後の音でいっぱいだった。ボールを追う足音、床の鳴る音、顧問の先生の短い声。ここから何人が高校でも続けるのだろう、と考えながらコートの端に立った。',
    choices:[
      {id:'rumor',label:'有望選手について聞く',desc:'スカウトの噂を狙う'},
      {id:'practice',label:'練習試合の相談をする',desc:'紹介があれば練習試合が組める'},
      {id:'clinic',label:'出張指導を申し出る',desc:'特殊能力のきっかけが生まれることがある'}
    ]
  },
  association:{
    intro:'県のバレーボール協会。壁一面の資料棚と、貼り出された強化スケジュール。強化担当者が書類の束をめくりながら、こちらに気づいて顔を上げた。「{{校名}}さん。今日はどういったご用件で」',
    choices:[
      {id:'study',label:'留学先の情報を聞く',desc:'海外・国内強化先の追加を狙う'},
      {id:'tester',label:'新機材テスターに協力する',desc:'練習器具や短期バフにつながりやすい'},
      {id:'u18',label:'強化ルートの相談をする',desc:'U-18強化試合や留学生紹介の可能性がある'}
    ]
  }
};
function directorWeightedPick(items){
  const total=items.reduce((a,x)=>a+(x.weight||1),0);
  let r=Math.random()*total;
  for(const x of items){r-=x.weight||1;if(r<=0)return x;}
  return items[items.length-1];
}
function resetDirectorVisitModal(){
  const scene=document.getElementById('directorEventScene');
  const choices=document.getElementById('directorChoiceArea');
  const result=document.getElementById('directorResultArea');
  const action=document.getElementById('directorVisitActionRow');
  const select=document.getElementById('directorVisitModalSelect');
  const help=document.getElementById('directorVisitHelp');
  if(scene){scene.classList.add('hidden');scene.innerHTML='';}
  if(choices){choices.classList.add('hidden');choices.innerHTML='';}
  if(result){result.classList.add('hidden');result.innerHTML='';}
  if(action)action.style.display='';
  if(select?.closest('.field-group'))select.closest('.field-group').style.display='';
  if(help)help.style.display='';
}
function directorChoiceButtonHtml(choice){
  return `<button type="button" class="director-choice-btn" data-director-choice="${choice.id}">
    <span>${choice.label}</span><small>${choice.desc}</small>
  </button>`;
}
function openDirectorChoiceEvent(placeId){
  const place=unlockedDirectorPlaces().find(p=>p.id===placeId)||currentDirectorPlace();
  if(!place)return;
  state.directorVisitPlace=place.id;
  // v134: 分岐が少なく選択の意味が薄いため、選択肢は出さずそのまま結果へ進む。
  //       結果はその場所の全選択肢の結果を重みに応じて抽選する。
  performDirectorVisit(place.id,'auto');
  return;
  /* eslint-disable no-unreachable */
  const data=DIRECTOR_EVENT_SCENES[place.id];
  if(!data){performDirectorVisit(place.id,'auto');return;}
  const scene=document.getElementById('directorEventScene');
  const choices=document.getElementById('directorChoiceArea');
  const action=document.getElementById('directorVisitActionRow');
  const select=document.getElementById('directorVisitModalSelect');
  const help=document.getElementById('directorVisitHelp');
  if(select?.closest('.field-group'))select.closest('.field-group').style.display='none';
  if(help)help.style.display='none';
  if(action)action.style.display='none';
  if(scene){
    scene.classList.remove('hidden');
    scene.innerHTML=`<div class="director-scene-head"><img class="event-tempo-face" src="${currentManagerPortrait()}" alt="マネージャー"><div><strong>${place.label}</strong><p>${managerLine(withSchoolName(data.intro))}</p></div></div>`;
  }
  if(choices){
    choices.classList.remove('hidden');
    choices.innerHTML=data.choices.map(directorChoiceButtonHtml).join('');
    choices.querySelectorAll('[data-director-choice]').forEach(btn=>{
      btn.addEventListener('click',()=>resolveDirectorEventChoice(btn.dataset.directorChoice));
    });
  }
  managerSay(`${place.label}でどう動くか選んでください。`);
}
function directorResultPopupHtml(place, result, logs, effects){
  const shouldFold=(logs||[]).length>4;
  return `<div class="event-tempo-card director-result-popup">
    <div class="event-tempo-head">
      <img class="event-tempo-face" src="${currentManagerPortrait()}" alt="マネージャー">
      <div><div class="growth-manager">${managerLine(result.manager||`${place.label}での監督活動が終わりました。`)}</div><div class="event-narration-text">${result.text}</div></div>
    </div>
    <div class="event-beat"><div class="event-beat-label">効果</div><div class="compact-effect-list">${(effects.length?effects:['大きな変化なし']).map(x=>`<div class="compact-effect-chip">${x}</div>`).join('')}</div></div>
    ${shouldFold?`<details class="event-detail-drawer"><summary>詳細ログを見る</summary><div class="event-detail-list">${logs.map(x=>`<div class="event-detail-line">${x}</div>`).join('')}</div></details>`:''}
  </div>`;
}

function introduceMiddleSchoolAce(logs){
  const cfg=schoolCfg();
  const greatRange=cfg.scoutGreat||[cfg.max+1,cfg.max+2];
  const greatCap=clamp(greatRange[1]+2,1,25);
  const pos=randomChoice(POSITIONS);
  const region=state.scoutRegion||'関東';
  const target=greatRange[1];
  const recruit=generateRecruit(pos,greatRange[0],greatRange[1],`地元中学監督紹介/大成功`,target,region,greatCap);
  recruit.joinSource='地元中学監督紹介/大成功';
  assignGeneratedTalent(recruit,greatRange[1],false);
  const acquired=applyScoutSpecialRules(recruit,'大成功');
  state.nextYearScoutRecruits.push({region,pos,result:'大成功',min:greatRange[0],max:greatRange[1],target,abilityCap:greatCap,fixedRecruit:recruit,source:'地元中学監督紹介'});
  state.scoutedPlayers.push({name:recruit.name,portrait:recruit.portrait,height:recruit.height,pos,region,result:'大成功',summary:recruitPositionSummary(recruit),year:state.year+1,rumor:false,detail:recruit,source:'地元中学監督紹介'});
  logs.push(`地元中学校の監督から、良い選手がいると紹介を受けました。${nameSpan('若葉高校',recruit.name)}が来年度加入候補に追加されました。`);
  logs.push(`判定：大成功 / ポジション：${pos} / ${recruit.height}cm${scoutSpecialText(acquired)}`);
}
function setElitePracticeTrainingBuff(logs, label='U-18・プロ合同練習'){
  state.eventTrainingBuff={cat:'all',mult:5.00,turns:1,label};
  logs.push(`${label}：次の1週の練習が、驚くほど身になります。`);
}
function forceRecruitTalent(recruit, talent){
  if(!recruit||!talent)return false;
  if(!Array.isArray(recruit.special))recruit.special=[];
  recruit.special=recruit.special.filter(s=>!['神童','怪物','努力の天才','転生OG'].includes(s));
  addTalentIfEligible(recruit,talent);
  applyGeneratedTalentAbilityShape(recruit,talent,calcPositionScore25(recruit,recruit.role)+1,[]);
  if(hasExclusivePortraitTalent(recruit))assignExclusiveTalentPortrait(recruit,[]);
  return recruit.special.includes(talent);
}
function directorApplyResult(place, logs, result){
  const effects=[];
  const kind=result.kind||'none';
  if(kind==='equipment'){
    addDirectorEquipment(logs,result.label||'練習器具',result.amount||1);
    effects.push(`練習器具：${result.amount||1}段階`);
  }else if(kind==='buff'){
    setDirectorTrainingBuff(logs,result.label||'練習支援',result.mult||1.10,result.turns||2,result.cat||'all');
    effects.push(`練習効率アップ：${result.turns||2}週`);
  }else if(kind==='new_drink'){
    // v161: 年1回。疲労回復は共通処理（result.fatigue）で行うので、ここでは記録と調子だけ。
    state.newDrinkTestYear=state.year;
    applyTeamMood(1,logs,999);
    effects.push('新製品スポーツドリンクのモニター');
  }else if(kind==='rumor'){
    logs.push(createDirectorScoutRumor());
    effects.push('スカウトの噂');
  }else if(kind==='practice'){
    createDirectorPracticeMatch(logs,result.name||'紹介された練習試合校',!!result.strong);
    effects.push('練習試合 追加');
  }else if(kind==='middle_intro'){
    introduceMiddleSchoolAce(logs);
    effects.push('中学監督紹介：大成功候補');
  }else if(kind==='elite_practice_buff'){
    setElitePracticeTrainingBuff(logs,result.label||'U-18・プロ合同練習');
    effects.push('次回の練習が大きく身になる');
  }else if(kind==='u15_japan_star'){
    // v195: 交換留学生と同じ才能抽選で、日本人の有望新入生を1名追加する。
    introduceU15JapanStar(logs, randomChoice(['神童','怪物','努力の天才']));
    effects.push('来年度の入部希望：U-15日本代表経験者');
  }else if(kind==='exchange_talent'){
    introduceExchangeStudent(logs, randomChoice(['神童','怪物','努力の天才']));
    effects.push('交換留学生：才能持ち大成功候補');
  }else if(kind==='special'){
    directorGrantSpecialChance(logs,result.label||'指導から特殊能力のきっかけを得ました。',result.count||1);
    effects.push('特殊能力チャンス');
  }else if(kind==='study'){
    ensureDirectorLegacy();
    const routes=result.routes||STUDY_ROUTES_SHOPPING;
    // v200: 未解禁のものからランダムに選ぶ（以前は配列の先頭固定だった）。Tak指示の「ランダムで紹介」対応。
    const locked=routes.filter(x=>!state.directorLegacy.studyRoutes.includes(x));
    const route=locked.length?randomChoice(locked):randomChoice(routes);
    unlockStudyAbroadRoute(route,logs,result.source||'紹介');
    effects.push('留学先 追加');
  }else if(kind==='exchange'){
    introduceExchangeStudent(logs);
    effects.push('留学生候補 紹介');
  }else if(kind==='mood'){
    applyTeamMood(1,logs,result.count||4);
    effects.push('調子アップ');
  }else{
    logs.push(result.log||'今回は大きな成果にはつながりませんでした。');
    effects.push('変化なし');
  }
  return effects;
}

function directorNetworkBonusWeight(){
  return Math.max(0,coachNetworkLevel()-1)*10;
}
function directorNetworkAdjustedItems(items){
  const bonus=directorNetworkBonusWeight();
  return (items||[]).map(x=>{
    const y={...x};
    if(['middle_intro','elite_practice_buff','exchange_talent','u15_japan_star'].includes(y.kind))y.weight=(y.weight||1)+bonus;
    else if(['rumor','practice','exchange','study'].includes(y.kind))y.weight=(y.weight||1)+Math.round(bonus*0.35);
    return y;
  });
}
// v200: 留学先の紹介まわりを場所ごとに整理した（Tak指示）。
//  ・商店街 : ソウル / 大阪 / バンコク（ロサンゼルスを外した）
//  ・地元中学: 商店街の3つ ＋ パリ / モスクワ
//  ・協会(30): 地元中学で紹介できる全部 ＋ ミュンヘン（中学の初回確定分）
//  ・協会(15): LA / ヨハネスブルグ / ローマ / サンパウロ
const STUDY_ROUTES_SHOPPING=['seoul','osaka','bangkok'];
const STUDY_ROUTES_JUNIOR=STUDY_ROUTES_SHOPPING.concat(['paris','moscow']);
const STUDY_ROUTES_ASSOCIATION=['munich'].concat(STUDY_ROUTES_JUNIOR);
const STUDY_ROUTES_ASSOCIATION_HIDDEN=['los_angeles','johannesburg','rome','sao_paulo'];
// v200: その候補の中にまだ解禁していないルートが1つも無ければ重み0にする。
//       既存の「重み0は抽選候補から外す」処理(v161)でそのまま候補から消えるので、
//       全ルート解禁後に留学の話ばかり出る空振りが起きなくなる（Tak指示）。
function studyRouteWeight(weight, routes){
  return (routes||[]).some(r=>!studyAbroadDestinationUnlocked(r)) ? weight : 0;
}
// v200: 各場所ではじめて訪問したときに確定で紹介される留学先。
const DIRECTOR_FIRST_STUDY={
  street:{route:'osaka',source:'街で再会したOGのつて',
    text:'角の自転車屋の前で足を止めたとき、声をかけてきたのは卒業生の一人だった。今は大阪の大学でマネージャーをしているという。「うちの監督、高校生の受け入れもやってますよ。{{略称}}の子なら話は通します」——連絡先を交換して別れた。',
    manager:'大阪への留学ルートが確保できました。'},
  shopping:{route:'seoul',source:'行きつけの店長のコネ',
    text:'「監督さん、ちょっと待って」とレジの奥から店長が出てきた。差し出されたのは、ハングルの名刺だった。「昔うちで用具そろえてった子が、今ソウルでコーチしとる。{{略称}}の子なら預かるってさ」',
    manager:'ソウルへの留学ルートが確保できました。'},
  junior:{route:'munich',source:'地元中学の顧問の紹介',
    text:'練習を見終えたあと、顧問の先生が職員室で一冊のファイルを開いた。「前の学校で、ドイツに教え子を送ったことがあってね」——ミュンヘンのクラブの受け入れ窓口だという。「{{略称}}さんなら紹介できますよ」',
    manager:'ミュンヘンへの留学ルートが確保できました。'}
};
// v200: 初回訪問の確定紹介。すでにそのルートを解禁済みなら「初回消化済み」だけ記録して
//       通常抽選に戻す（同じルートを二重に渡して空振りにしないため）。
function directorFirstStudyResult(placeId){
  if(!state.directorFirstStudyDone||typeof state.directorFirstStudyDone!=='object')state.directorFirstStudyDone={};
  const cfg=DIRECTOR_FIRST_STUDY[placeId];
  if(!cfg)return null;
  if(state.directorFirstStudyDone[placeId])return null;
  state.directorFirstStudyDone[placeId]=true;
  if(studyAbroadDestinationUnlocked(cfg.route))return null;
  return {kind:'study',routes:[cfg.route],source:cfg.source,text:withSchoolName(cfg.text),manager:cfg.manager};
}
function directorOutcomeFor(placeId, choiceId){
  const nothing={kind:'none',text:'話はできたが、今回は具体的な成果まではつながらなかった。こういう日もある。',manager:'今回は空振りです。ただ、顔を出すこと自体に意味はあります。',log:'監督活動：具体的な成果なし'};
  const table={
    street:{
      ask:[
        {weight:55,kind:'none',text:'立ち話に混ぜてもらったが、話題はもっぱら去年の地区大会のことだった。「あの試合はよかったねえ」——悪い気はしないが、欲しかったのはそこではない。',manager:'今回は噂までは拾えませんでした。'},
        {weight:30,kind:'rumor',text:'「そういえば、うちの孫の同級生に背の高い子がおってねえ」——何気ない一言だった。だが、聞けば聞くほど身体能力の話が具体的に出てくる。手帳に地域とポジションを書きつけた。',manager:'スカウトにつながりそうな話がありました。'},
        {weight:15,kind:'mood',fatigue:20,text:'「これ、部の子らに」と紙袋を渡された。中身は差し入れの菓子と、手書きの応援メッセージ。体育館に持ち帰ると、選手たちが一斉に群がってきた。',manager:'差し入れをいただきました。少し雰囲気が良くなりそうです。'}
      ],
      bazaar:[
        {weight:45,kind:'none',text:'掘り出し物を期待したが、並んでいたのは食器と古着ばかりだった。それでも一周して顔を覚えてもらえたのは、無駄ではないはずだ。',manager:'今回は掘り出し物はありませんでした。'},
        {weight:40,kind:'equipment',amount:1,label:'バザーで見つけた練習器具',text:'テーブルの隅に、使い込まれたトレーニングチューブが束で置かれていた。「持ってっていいよ、どうせ捨てるだけだから」——磨けばまだ十分使える。'},
        {weight:15,kind:'buff',label:'地域の差し入れ',mult:1.08,turns:2,cat:'all',fatigue:20,text:'段ボール一箱分の飲み物を抱えて帰ることになった。「勝ってくれとは言わんけど、悔いのないようにな」——その言葉のほうが、荷物よりずっと重かった。'}
      ],
      gym:[
        {weight:55,kind:'none',text:'市民体育館の掲示板を眺め、駐車場を一周した。今日は誰にも会わなかったが、次の大会の日程だけは頭に入れて帰った。',manager:'今日は静かでしたね。'},
        {weight:30,kind:'buff',label:'街で出会ったOGの一言指導',mult:1.10,turns:2,cat:'all',text:'体育館の入口で、見覚えのある顔とすれ違った。卒業生だった。「懐かしいです」と言いながら、彼女は当時つまずいた場所と、それをどう抜けたかを立ったまま話してくれた。'},
        {weight:studyRouteWeight(12,['bangkok']),kind:'study',routes:['bangkok'],source:'街の掲示板で知った海外遠征の縁',text:'市民体育館の掲示板に、色あせた海外遠征報告のチラシが貼ってあった。連絡先に見覚えのある名前がある。電話をかけてみると、相手はバンコクのクラブで今も指導していた。「高校生？ 全然いいよ、こっちは一年中コートが空いてる」',manager:'バンコクへの留学ルートが確保できました。'},
        {weight:15,kind:'special',label:'OGの助言で特殊能力のきっかけを得ました。',count:1,text:'OGが何気なく言った一言を、練習で選手に伝えてみた。最初はぴんと来ていない様子だったが、何本か打つうちに表情が変わった。'}
      ]
    },
    shopping:{
      equipment:[
        {weight:45,kind:'none',text:'ワゴンをひと通り見たが、サイズも用途も部には合わなかった。店長に礼を言って店を出る。',manager:'今回は見送りですね。'},
        {weight:40,kind:'equipment',amount:1,label:'商店街で購入した練習器具',text:`型落ちだが状態のいい器具が、値札の半分以下で出ていた。「${ownSchoolShortName()}さんならこれで十分でしょう」と店長が箱を奥から出してきた。`},
        {weight:15,kind:'equipment',amount:2,label:'バーゲン品の高性能練習器具',text:'店の奥から出てきたのは、県内の強豪校が使っているのと同じ型の器具だった。「入れ替えで引き取ったやつでね。使ってくれる人がいるならそのほうがいい」'}
      ],
      drink:[
        {weight:35,kind:'none',text:'まとめ買いして部室の冷蔵庫に詰めた。特別なことは起きていない。ただ、練習後に一本ずつ配れるようになった。',manager:'小さな準備も大事です。'},
        {weight:55,kind:'buff',label:'スポーツドリンク差し入れ',mult:1.12,turns:2,cat:'all',fatigue:30,text:'練習の合間に冷えた一本を配ると、体育館の空気が少し軽くなった。細かいことだが、夏場のこれは効く。'},
        {weight:10,kind:'mood',count:5,fatigue:40,text:'「監督が買ってきたやつ、当たりでしたね」——たったそれだけの話で、練習の終わりの雰囲気がずいぶん変わった。'}
      ],
      rumor:[
        {weight:50,kind:'none',text:'レジ横で少し話し込んだが、今日は新しい話は出てこなかった。「また寄ってよ」と言われて店を出る。',manager:'空振りですが、こういう日もあります。'},
        {weight:30,kind:'rumor',text:'「うちで用具そろえてった子でね」と店長が切り出した。中学の名前、ポジション、体格——商売柄、見ている情報が具体的だった。'},
        {weight:studyRouteWeight(12,STUDY_ROUTES_SHOPPING),kind:'study',routes:STUDY_ROUTES_SHOPPING,source:'行きつけの店長のコネ',text:'「昔の知り合いが向こうでコーチしとるんだよ」——話は思いがけない方向へ転がった。連絡先を書いた紙を受け取って店を出た。'},
        {weight:8,kind:'special',label:'常連客の元選手が練習の見方を教えてくれました。',count:1,text:'常連客の一人が、実は実業団まで行った選手だった。話しはじめると止まらず、気づけば店の床でフォームの説明が始まっていた。'}
      ]
    },
    junior:{
      rumor:[
        {weight:40,kind:'none',text:'練習を最後まで見せてもらい、顧問の先生とも話せた。ただ「今年はまだ何とも」と言葉を濁されてしまう。よその高校も同じことを聞きに来ているのだろう。',manager:'今回は情報なしです。'},
        {weight:30,kind:'rumor',text:'「あの子、二年からずっとレギュラーでね」——顧問の先生が指したのは、コートの端で黙々とレシーブを繰り返す選手だった。名前と身長を控えておく。'},
        {weight:15,kind:'rumor',text:'「あの子は近隣の中学でも名前が知られてますよ」と先生は言った。県外からも見に来ているらしい。急がないと持っていかれる。'},
        {weight:studyRouteWeight(12,STUDY_ROUTES_JUNIOR),kind:'study',routes:STUDY_ROUTES_JUNIOR,source:'地元中学の顧問のつて',text:'「うちの卒業生でね、高校からよそへ出た子が何人かいるんですよ」——顧問の先生は棚から古い名簿を引っ張り出してきた。ページの端に書き込まれた連絡先のいくつかは、今も生きているという。',manager:'留学先の受け入れ窓口をひとつ押さえられました。'},
        {weight:15,kind:'middle_intro',text:`練習が終わったあと、先生が別室に呼んでくれた。「進路をまだ決めてない子がいます。${ownSchoolShortName()}さんなら、と思って」——机の上に置かれたのは、一人分の資料だった。`,manager:'これは大きいです。来年度候補に直接つながります。'}
      ],
      practice:[
        {weight:50,kind:'none',text:'練習試合の相談はしたものの、先方の日程が大会前で埋まっていた。「また空きが出たら連絡します」——名刺だけ置いて帰る。',manager:'タイミングが合いませんでした。'},
        {weight:40,kind:'practice',name:'地元中学顧問紹介の練習試合校',text:'「ちょうど相手を探している学校がありますよ」と、その場で電話をかけてくれた。話は五分で決まった。'},
        {weight:10,kind:'practice',name:'地元強化校',strong:true,text:'「胸を借りるつもりなら、いい相手がいます」——紹介されたのは、県でも上位に食い込む学校だった。断る理由はなかった。'}
      ],
      clinic:[
        {weight:50,kind:'none',text:'中学生を相手に基本から教えた。教えた側の選手たちも、うまく言葉にできずに苦戦していた。ただ、それも悪いことではない。',manager:'地道な積み重ねですね。'},
        {weight:35,kind:'buff',label:'地元中学との合同練習',mult:1.13,turns:2,cat:'all',text:'「せっかくなので一緒にやりませんか」という話になり、合同練習に発展した。年下に見られている緊張感が、うちの選手の動きを変えた。'},
        {weight:15,kind:'special',label:'出張指導の整理で特殊能力のきっかけを得ました。',count:1,text:'中学生に「どうしてそうするんですか」と聞かれた選手が、答えに詰まっていた。帰り道、その選手はずっと自分の手の動きを見ていた。'}
      ]
    },
    association:{
      study:[
        {weight:50,kind:'none',text:'強化担当者と一時間ほど話し込んだ。海外の育成事情の話は面白かったが、今すぐ選手を送れる話にはならなかった。',manager:'今回は具体的な話までは出ませんでした。'},
        {weight:studyRouteWeight(30,STUDY_ROUTES_ASSOCIATION),kind:'study',routes:STUDY_ROUTES_ASSOCIATION,source:'バレーボール協会の紹介',text:'「うちが把握している範囲でよければ」と、担当者がファイルを開いた。受け入れ実績のある機関がいくつか並んでいる。'},
        {weight:studyRouteWeight(15,STUDY_ROUTES_ASSOCIATION_HIDDEN),kind:'study',routes:STUDY_ROUTES_ASSOCIATION_HIDDEN,source:'協会強化担当の紹介',text:'「これは表に出していない話なんですが」と声を落として教えられたのは、限られた学校しか知らない受け入れ先だった。'}
      ],
      tester:[
        // v161: 新製品スポーツドリンクのテストは1年に1回だけ。年内に出たあとは重み0になる。
        {weight:(state.newDrinkTestYear===state.year?0:22),kind:'new_drink',fatigue:50,text:'「まだ市販していないものなんですが」と差し出されたのは、見慣れないラベルのスポーツドリンクだった。「学校単位でモニターをお願いしていましてね。感想を聞かせてもらえれば」——箱ごと部に届くことになった。',manager:'新製品のモニターです。部員全員に行き渡ります。'},
        {weight:45,kind:'none',text:'協力の意思は伝えたが、今回の枠は他校で埋まっていた。「次は優先的にご連絡します」——それを信じて待つことにする。',manager:'次の機会を待ちましょう。'},
        // v194: 練習器具レベルが上限(6)に達していると、機材を貰っても練習Lvが上がらず
        //        結果が無駄になるため、重み0にして抽選候補から外す（Tak指示）。
        //        Lv5のときは amount:2 でも 5→6 で1段階上がるので、そのまま出す。
        {weight:((state.equipmentLevel||0)>=6?0:40),kind:'equipment',amount:2,label:'新開発トレーニング機材のテスター依頼',text:'数日後、体育館に見慣れない箱が届いた。開けると、まだ市販されていない練習機材が入っている。使用感の報告が条件だという。'},
        {weight:15,kind:'buff',label:'新開発機材テスト',mult:1.15,turns:2,cat:'jump',text:'届いた機材は跳躍の測定と補助を兼ねたものだった。数値が出ると、選手は勝手に競い合いはじめる。'}
      ],
      u18:[
        {weight:40,kind:'none',text:'強化ルートの話を切り出したが、「まずは実績ですね」と柔らかく返された。協会が動くには、こちらの結果がまだ足りない。',manager:'協会ルートは簡単には動きませんね。'},
        {weight:20,kind:'practice',name:'U-18候補選抜',strong:true,text:'「ちょうど調整相手を探していましてね」——差し出された日程表の相手校欄には、U-18候補選抜と書かれていた。'},
        {weight:15,kind:'elite_practice_buff',label:'U-18候補選抜との実戦練習',text:'合同練習の枠に入れてもらえることになった。同じ体育館でトップ層の練習を見るだけでも、選手の基準が変わる。'},
        // v204: 海外の才能ある選手が来るときの描写を厚くした（Tak指示）。
        {weight:15,kind:'exchange_talent',manager:'海外から留学生候補の受け入れ依頼です。これは、かなりの逸材かもしれません。',text:'「実は、ひとつご相談が」<br>担当者が差し出したのは、海外の育成機関から届いた受け入れ先の照会だった。<br>「日本で高校バレーをやってみたい、という子がいましてね」<br>資料に並んだ大会名と、その横の数字を目で追ううちに、手が止まった。'},
        // v195: 交換留学生と同じ重み。既存の交換留学生側の確率は下げていない（Tak指示）。
        {weight:15,kind:'u15_japan_star',manager:'U-15日本代表経験者の選手が、来年度の入部を希望しています。',text:'「U-15日本代表でプレーした選手が一人、あなたの指導を受けたいと言っています」<br>担当者が一枚の資料を差し出した。「これまで育ててきた選手たちを見て、進学先として興味を持ったそうです」'},
        {weight:10,kind:'special',label:'協会の技術講習で特殊能力のきっかけを得ました。',count:2,text:'協会主催の技術講習に選手を連れて行った。指導者の言葉より、同世代の動きを間近で見たことのほうが効いたようだった。'}
      ]
    }
  };
  const byPlace=table[placeId]||{};
  // v135: 「成果なし」は出さない。必ず何かが起きるようにする。
  const isNothing=(x)=>!x||x.kind==='none';
  // v134: 選択肢を出さずに結果へ進むため、'auto' ではその場所の全選択肢の結果を
  //       ひとつのプールにまとめ、重みに応じて抽選する。
  let items;
  if(choiceId==='auto'||!byPlace[choiceId]){
    items=Object.values(byPlace).flat();
  }else{
    items=byPlace[choiceId];
  }
  // v161: 重み0のもの（年1回のイベントを取得済みなど）は候補から外す。
  items=(items||[]).filter(x=>x&&(x.weight===undefined||x.weight>0));
  const hit=(items||[]).filter(x=>!isNothing(x));
  return directorWeightedPick(directorNetworkAdjustedItems(hit.length?hit:(items&&items.length?items:[nothing])));
}
function performDirectorVisit(placeId, choiceId='auto'){
  const place=unlockedDirectorPlaces().find(p=>p.id===placeId)||currentDirectorPlace();
  if(!place){managerSay('監督活動の訪問先がありません。');return;}
  ensureDirectorLegacy();
  state.directorVisitPlace=place.id;
  const data=DIRECTOR_EVENT_SCENES[place.id];
  const choice=(data?.choices||[]).find(c=>c.id===choiceId);
  const logs=[`${monthTurnLabel()}：監督活動で${place.label}を訪問しました。`];
  gainCoachStat('network',40,logs);
  // v200: 各場所の初回訪問だけは確定で決まった留学先を紹介する（Tak指示）。
  const result=directorFirstStudyResult(place.id)||directorOutcomeFor(place.id,choiceId);
  logs.push(result.text);
  const effects=directorApplyResult(place,logs,result);
  // v161: 差し入れ系の結果には疲労回復が付く
  if(result&&result.fatigue){
    recoverFatigueAll(result.fatigue,logs,'差し入れ');
    effects.push(`疲労回復：元気度 +${result.fatigue}`);
  }
  state.trainingLog.push(...logs);
  enqueueImportantPopup(`監督活動：${place.label}`, directorResultPopupHtml(place,result,logs,effects), 'event',result&&result.kind==='rumor'?'scout_rumor':'multi_event');
  flushPendingSpecialPopups();
  closeDirectorVisitModal();
  progressTurn(state.lastIndividualTrainingMenu||'omakase',state.equipmentLevel||0);
  managerSay(result.manager||`${place.label}への監督活動を実施しました。`);
  renderAll();
  saveState();
}
function resolveDirectorEventChoice(choiceId){
  performDirectorVisit(state.directorVisitPlace||currentDirectorPlace()?.id,choiceId);
}
if(typeof window!=='undefined')window.resolveDirectorEventChoice=resolveDirectorEventChoice;
function confirmDirectorVisit(){
  const sel=document.getElementById('directorVisitModalSelect')?.value || document.getElementById('directorVisitSelect')?.value || currentDirectorPlace()?.id;
  if(!sel)return;
  if(directorVisitMode==='select'){
    state.directorVisitPlace=sel;
    state.coachAction='director';
    state.scoutPending=false;
    state.lastActionPromptKey=actionPromptKey();
    closeDirectorVisitModal();
    updateMonthTransitionModal();
    const p=currentDirectorPlace();
    managerSay(`今月の監督行動を監督活動に設定しました。訪問先は${p?p.label:'選択先'}です。`);
    renderAll();
    saveState();
    return;
  }
  openDirectorChoiceEvent(sel);
}

function closeAdvanceConfirmModal(){
  const m=document.getElementById('advanceConfirmModal');
  if(m){m.classList.add('hidden');m.style.display='';}
}
function executeScoutActionFromCoach(){
  if(!canScoutThisTurn()){scoutUnavailableMessage();return;}
  const region = state.scoutRegion || '関東';
  const pos = state.scoutPosition || 'OH';
  const res = performScout(region, pos);
  const summary = res.recruit ? recruitPositionSummary(res.recruit) : '';
  const plain = res.recruit
    ? `${region}で${pos}を探した結果、${res.result}です。${res.recruit.name}を見つけました。ポジション別評価：${summary}`
    : `${region}で${pos}を探した結果、${res.result}です。${res.text}`;
  state.trainingLog.push(`スカウト結果：${plain}`);
  gainCoachStat('scout',40,state.trainingLog);
  enqueueImportantPopup(`スカウト結果：${res.result}`, scoutResultPopupHtml(res, region, pos, summary), 'scout',res.result==='大成功'?'scout_great_success':'scout_report');
  progressTurn(state.lastIndividualTrainingMenu||'omakase', state.equipmentLevel||0);
  managerSay(res.recruit
    ? `スカウト結果は${res.result}です。${res.recruit.name}を見つけました。練習も行い、1週進みました。`
    : `スカウト結果は${res.result}です。${res.text} 練習も行い、1週進みました。`);
}
function executeFirstWeekCoachAction(){
  const action=(hasCoachActionDecision()?state.coachAction:'individual')||'individual';
  if(!hasCoachActionDecision())state.lastActionPromptKey=actionPromptKey();
  state.coachAction=action;
  if(action==='scout')executeScoutActionFromCoach();
  else if(action==='individual')executeFocusedTraining();
  else if(action==='recreation')performRecreation();
  else if(action==='pro_watch')performProMatchWatching();
  else if(action==='director')openDirectorVisitModal('execute');
  else executeFocusedTraining();
}
function handleAdvanceButton(){
  // v174: 体験版クリア後はこの記録では進めない。
  if(demoEndingActive()){showDemoEndingScreen();return;}
  if(monthTransitionLocked()){
    managerSay('月初確認を「閉じる」で終了してから進めてください。');
    return;
  }
  if(maybeShowKoutokuAwakeningEvent())return;
  // v159: 未消化の練習試合があるうちは、他の進行より先に試合画面へ誘導する。
  if(pendingPracticeMatchActive()){
    const oppName=state.practiceMatch?.opponent?.name||'相手校';
    managerSay(`${oppName}との${practiceMatchKindLabel()}がまだ残っています。試合を終えてから次へ進みましょう。`);
    forceSwitchTab('match');
    renderAll();
    return;
  }
  if(maybeStartOgMatchWeek())return;
  if(maybeStartU18AnnualMatchWeek())return;
  if(isCampTurn() && !currentCampTheme()){
    openCampThemeSelection();
    return;
  }
  if(isInitialAprilNoCoachMonth()){
    progressTurn(state.lastIndividualTrainingMenu||'omakase',state.equipmentLevel||0);
    renderAll();
    saveState();
    return;
  }
  if(state.turnIndex===0){
    const tour=isTournamentTurn();
    if(tour && !currentTournamentEliminated(tour)){
      if(!coachActionExecutedThisMonth()){
        if(!hasCoachActionDecision()){
          // v91: 大会週も、確認ではなく行動選択そのものを出す（v88と同じ扱いに統一）
          showMonthlyActionModal(true);
          return;
        }
        state.coachActionMatchWeekMode=true;
        executeFirstWeekCoachAction();
        renderAll();
        saveState();
        return;
      }
      state.coachActionMatchWeekMode=false;
      if(tour && state.pendingTournamentMatchKey===tournamentMatchKey(tour)){
        managerSay(`${state.pendingTournamentOpponentName||'相手校'}との試合に臨みます。スタメンと相手の特徴を確認して、試合を始めましょう。`);
        forceSwitchTab('match');
        renderAll();
        saveState();
        return;
      }
      prepareActionProgressOrTournament();
      renderAll();
      saveState();
      return;
    }
    if(!hasCoachActionDecision()){
      // v88: 「決めずに進む」の確認ではなく、行動選択そのものを出す。
      showMonthlyActionModal(true);
      return;
    }
    executeFirstWeekCoachAction();
    renderAll();
    saveState();
    return;
  }
  if(state.coachAction==='individual'){
    executeFocusedTraining();
    return;
  }
  progressTurn(state.lastIndividualTrainingMenu||'omakase',state.equipmentLevel||0);
  renderAll();
  saveState();
}
// v181: 試合に敗退／優勝して次週に試合が無いとき、進行後はチーム画面へ戻す（Tak指示）。
// 月初確認やポップアップが開いている間は動かさず、片付いてから切り替える。
let pendingLeaveMatchTab=false;
function requestLeaveMatchTabAfterAdvance(){
  pendingLeaveMatchTab=true;
  tryLeaveMatchTab();
}
function tryLeaveMatchTab(){
  if(!pendingLeaveMatchTab)return;
  if(typeof document==='undefined')return;
  const cur=document.querySelector('.tab-panel.active');
  if(!cur||cur.id!=='match'){pendingLeaveMatchTab=false;return;}
  if(watchMatchSession&&!watchMatchSession.done){pendingLeaveMatchTab=false;return;}
  // 次も試合があるなら試合画面のままにしておく
  if(canPlayCurrentMatch()){pendingLeaveMatchTab=false;return;}
  // まだ何か出ている間は待つ（forceSwitchTab は月初確認中に無視されるため）
  if(monthTransitionLocked()||popupOpen||popupQueue.length)return;
  pendingLeaveMatchTab=false;
  try{forceSwitchTab('dashboard');}catch(e){}
}
function safeHandleAdvanceButton(){
  try{
    handleAdvanceButton();
    requestLeaveMatchTabAfterAdvance();
  }catch(e){
    console.error('advance failed', e);
    const msg='進行処理でエラーが出たため、通常練習で1週進めます。';
    try{
      state.trainingLog.push(`進行エラー：${e.message||e}`);
      managerSay(msg);
      advanceTurn();
      renderAll();
      saveState();
    }catch(e2){
      console.error('advance fallback failed', e2);
      alert('次週に進む処理でエラーが発生しました：'+(e.message||e));
    }
  }
}
if(typeof window!=='undefined')window.safeHandleAdvanceButton=safeHandleAdvanceButton;

function canScoutThisTurn(){
  return state.turnIndex===0 && state.scoutLockedMonthKey!==currentMonthKey();
}
function scoutUnavailableMessage(){
  managerSay('スカウトは1週目しかできません。');
  const box=document.getElementById('scoutResultBox');
  if(box){box.classList.remove('hidden');box.innerHTML='スカウトは1週目しかできません。';}
}

function refreshScoutMapRumorList(){try{renderScoutRumorList();}catch(e){}}
function openScoutMapModal(mode='execute') {
  const modal = document.getElementById('scoutMapModal');
  if (!modal) { console.warn('scoutMapModal not found'); return; }
  refreshScoutMapRumorList(); // v127: 開くたびに噂の一覧を更新する
  if(!canScoutThisTurn()){scoutUnavailableMessage();return;}
  scoutMapMode=mode==='select'?'select':'execute';
  const region = state.scoutRegion || '関東';
  const pos = state.scoutPosition || 'OH';
  const posEl=document.getElementById('scoutMapPositionSelect');
  if(posEl)posEl.value = pos;
  const box=document.getElementById('scoutResultBox');
  if(box){box.innerHTML='';box.classList.add('hidden');}
  const confirm=document.getElementById('confirmScoutMapBtn');
  if(confirm)confirm.textContent=scoutMapMode==='select'?'この設定にする':'スカウトに行く';
  modal.classList.remove('hidden');
  modal.style.display='flex';
  try { setScoutMapRegion(region); } catch(e) { console.warn('setScoutMapRegion failed', e); }
  managerSay(scoutMapMode==='select'
    ?'今月のスカウト先とポジションを選んでください。ここでは設定だけを行います。'
    :'スカウト先とポジションを選んでください。決定したら「スカウトに行く」を押してください。');
}
window.openScoutMapFromButton=function(){
  if(!canScoutThisTurn()){scoutUnavailableMessage();return;}
  state.scoutPending=true;
  state.coachAction='scout';
  state.lastActionPromptKey=actionPromptKey();
  closeMonthlyActionModal();
  switchTab('scout');
  setTimeout(()=>openScoutMapModal('execute'),50);
};
function closeScoutMapModal() {
  const m=document.getElementById('scoutMapModal');
  if(m){m.classList.add('hidden');m.style.display='';}
  const confirm=document.getElementById('confirmScoutMapBtn');
  if(confirm)confirm.textContent='スカウトに行く';
  scoutMapMode='execute';
}
function scoutMapRumorHtml(region, pos=''){
  const rumors=eventScoutRumorList().filter(r=>r.region===region && (!pos || r.pos===pos));
  if(!rumors.length)return '';
  return `<div class="scout-map-rumors"><div class="scout-map-rumor-title">この条件に関係する噂</div>${
    rumors.map(r=>`<div class="scout-map-rumor-card"><strong>${r.region} / ${r.pos}</strong><br>${r.label}<br><span class="hint">この地域・ポジションでスカウトすると大成功になります。</span></div>`).join('')
  }</div>`;
}
function updateScoutMapComment(){
  const region=state.scoutRegion||'関東';
  const pos=document.getElementById('scoutMapPositionSelect')?.value || state.scoutPosition || '';
  const comment=document.getElementById('scoutMapManagerComment');
  if(comment)comment.innerHTML=managerInlineHtml(rumorDescriptionFor(region))+scoutMapRumorHtml(region,pos);
}

function setScoutMapRegion(region) {
  state.scoutRegion = region;
  document.querySelectorAll('.region-shape').forEach(btn => btn.classList.toggle('selected', btn.dataset.region === region));
  updateScoutMapComment();
}
function confirmScoutFromMap() {
  if(!canScoutThisTurn()){closeScoutMapModal();scoutUnavailableMessage();return;}
  const region = state.scoutRegion || '関東';
  const pos = document.getElementById('scoutMapPositionSelect')?.value || state.scoutPosition || 'OH';
  state.scoutRegion = region;
  state.scoutPosition = pos;

  if(scoutMapMode==='select'){
    state.coachAction='scout';
    state.scoutPending=false;
    state.lastActionPromptKey=actionPromptKey();
    closeScoutMapModal();
    updateMonthTransitionModal();
    managerSay(`今月の監督行動をスカウトに設定しました。${region}で${pos}を探します。`);
    renderAll();
    saveState();
    return;
  }

  state.coachAction = 'scout';
  state.scoutPending = false;
  state.lastActionPromptKey = actionPromptKey();
  if (state.turnIndex === 0) state.scoutLockedMonthKey = currentMonthKey();

  const res = performScout(region, pos);
  const summary = res.recruit ? recruitPositionSummary(res.recruit) : '';
  const plain = res.recruit
    ? `${region}で${pos}を探した結果、${res.result}です。${res.recruit.name}を見つけました。ポジション別評価：${summary}`
    : `${region}で${pos}を探した結果、${res.result}です。${res.text}`;
  state.trainingLog.push(`スカウト結果：${plain}`);
  closeScoutMapModal();
  enqueueImportantPopup(`スカウト結果：${res.result}`, scoutResultPopupHtml(res, region, pos, summary), 'scout',res.result==='大成功'?'scout_great_success':'scout_report');

  progressTurn(state.lastIndividualTrainingMenu||'omakase', state.equipmentLevel||0);

  managerSay(res.recruit
    ? `スカウト結果は${res.result}です。${res.recruit.name}を来年度加入候補に追加しました。`
    : `スカウト結果は${res.result}です。`);
  renderAll();
  saveState();
}
function heightGrowthXpForPlayer(pl){
  return randomInt(0,20);
}
function applyMonthlyNaturalGrowth(logs,ups){
  for(const pl of state.players){
    if(isPlayerAbsent(pl)){
      logs.push(`身長成長：${nameSpan('若葉高校',pl.name)}は${absentReasonText(pl)}のため自然成長対象外です。`);
      continue;
    }
    let hxp=heightGrowthXpForPlayer(pl);
    hxp=applyTalentXp(pl,'height',hxp,'natural');
    const bh=pl.height,hup=addHeightXp(pl,hxp);
    if(hup)ups.push(`${pl.name}：身長 ${coloredHeightValue(bh)}→${coloredHeightValue(pl.height)}`);
    if(hup)logs.push(`身長が伸びました：${nameSpan('若葉高校',pl.name)} <span class="level-up">${abilityChangeHtml(bh,pl.height,'height')}</span>`);
    if(state.turnIndex===3){
      let jxp=randomInt(0,10);jxp=applyTalentXp(pl,'jump',jxp,'natural');const bj=pl.comps.jump,jup=addXp(pl,'jump',jxp);
      if(jup)ups.push(`${pl.name}：ジャンプ ${coloredValue(bj)}→${coloredValue(pl.comps.jump)}`);
      if(jup)logs.push(`ジャンプが伸びました：${nameSpan('若葉高校',pl.name)} <span class="level-up">${abilityChangeHtml(bj,pl.comps.jump,'jump')}</span>`);
      const bm=pl.mood;pl.mood=clamp(pl.mood+randomChoice(naturalMoodChoicesByMotivation()),-2,2);
      if(bm!==pl.mood)logs.push(`調子変動：${nameSpan('若葉高校',pl.name)} ${moodInfo(bm).label}→${moodInfo(pl.mood).label}`);
    }
  }
}
function prepareActionProgressOrTournament(){
  // v159: 未消化の練習試合があるうちは週を進めない。大会と同じ扱いにする。
  if(pendingPracticeMatchActive()){
    const oppName=state.practiceMatch?.opponent?.name||'相手校';
    managerSay(`${oppName}との${practiceMatchKindLabel()}がまだ残っています。試合を終えてから次へ進みましょう。`);
    // v188: 大会と同じく、前の試合のログを残したまま次の試合画面に入らない（Tak指示）。
    clearMatchScreenForNextWeek();
    forceSwitchTab('match');
    return false;
  }
  maybeForcedCampEvent(state.trainingLog);
  const recruits=addAprilRecruitsIfNeeded();
  if(recruits===null)return false;
  if(recruits.length){
    state.trainingLog.push(`4月第1週目です。${recruits.map(p=>nameSpan('若葉高校',p.name)).join('、')} が入部しました。`);
    managerSay(`新入生が${recruits.length}人入部しました、監督。`);
  }
  if(coachActionInMatchWeekMode() && isTournamentTurn())return true;
  const tour=isTournamentTurn();
  if(tour){
    if(currentTournamentEliminated(tour)){
      const skipLogs=[`${tour.name}は敗退済みのため、試合は行わずに進行します。`];
      state.trainingLog.push(...skipLogs);
      managerSay(`${tour.name}は敗退済みです。次の週へ進めます。`);
      advanceTurnWithEvent(state.trainingLog,'skip');
      return false;
    }
    // v188: 大会週は advanceTurn を通らずに次の試合の準備へ移る。
    //        勝ち上がったときは、ここで前の試合のログと結果表示を片付ける（Tak指示）。
    clearMatchScreenForNextWeek();
    const key=tournamentMatchKey(tour);
    if(state.pendingTournamentMatchKey!==key){
      if(tour.round===1)maybeShrineOmikujiForcedEvent(state.trainingLog);
      prepareTournamentIntro(tour);
      return false;
    }
    managerSay(`${state.pendingTournamentOpponentName||'相手校'}との試合に臨みます。スタメンと相手の特徴を確認して、試合を始めましょう。`);
    forceSwitchTab('match');
    return false;
  }
  return true;
}
function executeFocusedTraining(){
  if(!prepareActionProgressOrTournament()){renderAll();saveState();return;}
  const ps=document.getElementById('individualPlayerSelect'),ms=document.getElementById('individualTrainingSelect');
  const player=getPlayer(ps?.value||state.lastIndividualPlayerId||state.selectedPlayerId);
  if(isPlayerAbsent(player)){
    state.trainingLog.push(`${monthTurnLabel()}：${nameSpan('若葉高校',player.name)}は${absentReasonText(player)}のため、個別練習の対象外です。`);
    managerSay(`${player.name}は${absentReasonText(player)}です。今週の個別練習は実施できません。`);
    if(coachActionInMatchWeekMode()){
      markCoachActionExecutedThisMonth();
      state.coachActionMatchWeekMode=false;
      renderAll();saveState();return;
    }
    advanceTurn();
    runPostTurnEvents(state.trainingLog,[], 'training');
    renderAll();saveState();return;
  }
  // v173: 大会の試合週は個別練習も行わない（Tak指示）。監督行動は消化済みにして週を進める。
  if(isTournamentMatchWeek()){
    state.trainingLog.push(`${monthTurnLabel()}：大会の試合がある週のため、通常練習・個別練習ともに行いませんでした。`);
    managerSay('今週は試合があります。練習は行わず、試合に備えます。');
    state.coachAction='individual';
    if(coachActionInMatchWeekMode()){
      markCoachActionExecutedThisMonth();
      state.coachActionMatchWeekMode=false;
      renderAll();saveState();return;
    }
    advanceTurn();
    runPostTurnEvents(state.trainingLog,[], 'training');
    renderAll();saveState();return;
  }
  const menu=individualTrainingMenuById(ms?.value||state.lastIndividualTrainingMenu||'spikePower');
  const lv=state.equipmentLevel||0,logs=[],ups=[];
  triggerMoodMaker(logs);
  gainCoachStat('guidance',40,logs);

  // まず全選手が通常どおりチーム練習を行う。
  // 個別指導の対象選手も例外ではなく、通常練習分のXPを受け取る。
  const normalBaseMenu=regularTrainingMenus.find(m=>m.id===state.lastTrainingMenu)
    ||regularTrainingMenus.find(m=>m.id==='omakase')
    ||regularTrainingMenus[0];
  const normalMult=isCampTurn()?2.5:1;
  logs.push(`${monthTurnLabel()}：監督の個別指導日ですが、チーム全員は通常練習も実施します。`);
  applyRegularTrainingToTeam(normalBaseMenu,lv,normalMult,logs,ups);

  // その上で、指定選手だけ監督による集中個別指導XPを追加する。
  const baseEffects=menu.type==='omakase'
    ? omakaseEffects(player,1)
    : Object.fromEntries(validTrainingKeys(menu).map(k=>[k,trainingXp(menu,k,lv,1)]));
  const rows=[];
  for(let [k,xp] of Object.entries(baseEffects)){
    const bx=trainingBuffMultiplier(k,player);
    xp=Math.max(1,Math.round(xp*2*bx*coachFocusedTrainingMultiplier()));
    xp=applyTrainingMoodXp(player,xp);
    xp=applyTalentXp(player,k,xp,'training');
    const before=player.comps[k],up=addXp(player,k,xp),after=player.comps[k];
    rows.push({key:k,xp,before,after,up});
    if(up)ups.push(`${player.name}：${compLabel(k)} ${coloredValue(before)}→${coloredValue(after)}（監督個別指導）`);
  }
  logs.push(`<div class="training-player-block"><div class="training-player-name">${nameSpan('若葉高校',player.name)} / 監督個別指導：${menu.name}</div>${formatRows(player,rows)}</div>`);

  // 自然成長は週に一度だけ。
  applyMonthlyNaturalGrowth(logs,ups);
  state.trainingLog.push(...logs);
  state.monthResult=`${monthTurnLabel()}：${player.name}に個別練習を実施しました。`;
  managerSay(`チーム全員が通常練習を行い、その後${player.name}に${menu.name}を個別指導しました。`);
  state.lastIndividualPlayerId=player.id;
  state.selectedPlayerId=player.id;
  state.lastIndividualTrainingMenu=menu.id;
  state.coachAction='individual';
  maybeRetireThirdYears(logs);
  if(coachActionInMatchWeekMode()){
    markCoachActionExecutedThisMonth();
    state.coachActionMatchWeekMode=false;
    renderAll();
    saveState();
    return;
  }
  advanceTurn();
  runPostTurnEvents(state.trainingLog,ups,'training');
  renderAll();
  saveState();
}
// v101: 8月第4週。全国大会で優勝した年（春高優勝は年度をまたぐので前年度も見る）に発生する。
function seaEventDueNow(){
  if(state.monthIndex!==4 || state.turnIndex!==3)return false;
  if(state.seaEventDoneKey===`${state.year}-sea`)return false;
  // v125: 未優勝(null)のとき champYear が 0 になり、1年目に 0===year-1 が成立して発生していた。
  const champYear=state.lastNationalChampionYear;
  if(!champYear)return false;
  return champYear===state.year || champYear===state.year-1;
}

// v208: レクリエーションの調子上昇量（Tak指示）。
const RECREATION_MOOD_DELTA=3;
function performRecreation(){
  const scheduleSea=false;
  if(!prepareActionProgressOrTournament()){renderAll();saveState();return;}
  const logs=[],ups=[];
  gainCoachStat('motivation',40,logs);
  // v161: レクリエーションで疲労を回復する。基本30に、モチベ管理レベル1ごとに+5。
  {
    const lv=Number(state.coachStats?.motivation?.level||1);
    const heal=30+(lv-1)*5;
    recoverFatigueAll(heal,logs,`レクリエーション（モチベ管理Lv${lv}）`);
  }
  // v208: レクリエーションの調子上昇を +1（モチベ管理Lvで最大+2）から一律 +3 にする（Tak指示）。
  //        調子は -2〜+2 の範囲なので、絶不調の選手でも一気に好調まで戻り、
  //        それ以外の選手は絶好調になる。
  for(const p of state.players){
    const before=p.mood||0;
    p.mood=clamp(before+RECREATION_MOOD_DELTA,-2,2);
    logs.push(`${nameSpan('若葉高校',p.name)}：調子 ${moodInfo(before).label}→${moodInfo(p.mood).label}`);
  }
  state.trainingLog.push(`<strong>レクリエーションを行いました。</strong>`,...logs);
  state.monthResult=`${monthTurnLabel()}：レクリエーションを行いました。`;
  managerSay(scheduleSea?'レクリエーションを行いました。7月4週目に海に行く予定が入りました。':'レクリエーションを行いました。チーム全員の調子が上がりました。');
  enqueueImportantPopup('レクリエーション', `<div class="growth-manager">${managerLine(scheduleSea?'レクリエーションを行いました。7月4週目に海に行く予定が入りました。':'レクリエーションを行いました。チーム全員の調子が上がりました。')}</div><div class="compact-event-summary">チーム全体の調子を整えました。</div><div class="compact-effect-list"><div class="compact-effect-chip">調子上昇：全員 +3</div>${scheduleSea?'<div class="compact-effect-chip">7月4週目：海イベント予定</div>':''}</div>`, 'event', 'recreation_event');
  state.coachAction='recreation';
  applyMonthlyNaturalGrowth(state.trainingLog,ups);
  maybeRetireThirdYears(state.trainingLog);
  if(coachActionInMatchWeekMode()){
    markCoachActionExecutedThisMonth();
    state.coachActionMatchWeekMode=false;
    renderAll();
    saveState();
    return;
  }
  advanceTurn();
  runPostTurnEvents(state.trainingLog,ups,'recreation');
  renderAll();
  saveState();
}

function pickObservableSpecialForPlayer(p){
  if(coachAnalysisLevel()>=5){
    const sp=pickAnalysisSpecialForPlayer(p);
    if(sp)return sp;
  }
  if(!p.special?.includes('ベンチの声援') && canObtainSpecial(p,'ベンチの声援'))return 'ベンチの声援';
  const pool=NORMAL_SPECIAL_POOL.filter(s=>!p.special.includes(s) && canObtainSpecial(p,s));
  if(pool.length)return randomChoice(pool);
  const goldPool=(GOLD_SPECIAL_POOL[p.role]||[]).filter(s=>!p.special.includes(s) && canObtainSpecial(p,s));
  return goldPool.length?randomChoice(goldPool):null;
}
function performProMatchWatching(){
  if(!prepareActionProgressOrTournament()){renderAll();saveState();return;}
  const logs=[],growthUps=[];
  const acquired=[];
  gainCoachStat('analysis',40,logs);
  const watchChance=proWatchSpecialChance();
  for(const p of state.players){
    if(Math.random()<watchChance){
      const special=pickAnalysisSpecialForPlayer(p)||pickObservableSpecialForPlayer(p);
      if(special && grantSpecialIfEligible(p,special,'プロの試合観戦で得た気づき')){
        acquired.push(`${nameSpan('若葉高校',p.name)}：${specialChipHtml(special)}`);
      }
    }
  }
  logs.push(`<strong>プロの試合観戦を行いました。</strong>`);
  if(acquired.length){
    logs.push(`観戦からヒントを得た選手：${acquired.join('、')}`);
  }else{
    logs.push('今回は特殊能力を取得した選手はいませんでした。');
  }
  state.trainingLog.push(...logs);
  state.monthResult=`${monthTurnLabel()}：プロの試合観戦を行いました。`;
  managerSay(acquired.length?'プロの試合観戦で、特殊能力のヒントを得た選手がいます。':'プロの試合を観戦しました。今回は特殊能力の取得者はいませんでした。');
  enqueueImportantPopup('チームでプロの試合観戦', `<div class="growth-manager">${managerLine(acquired.length?'プロの試合観戦で、特殊能力のヒントを得た選手がいます。':'プロの試合を観戦しました。今回は特殊能力の取得者はいませんでした。')}</div>${logs.map(x=>`<div class="growth-item">${x}</div>`).join('')}`, 'event', 'pro_watch_team');
  state.coachAction='pro_watch';
  applyMonthlyNaturalGrowth(state.trainingLog,growthUps);
  maybeRetireThirdYears(state.trainingLog);
  if(coachActionInMatchWeekMode()){
    markCoachActionExecutedThisMonth();
    state.coachActionMatchWeekMode=false;
    renderAll();
    saveState();
    return;
  }
  advanceTurn();
  // 特殊能力取得時は、取得表示を試合観戦イベント内にまとめ、別の成長報告ポップアップは出さない
  runPostTurnEvents(state.trainingLog,acquired.length?[]:growthUps,'pro_watch');
  renderAll();
  saveState();
}

// v173: 大会の試合が行われる週は、通常練習も個別練習も行わず、練習による疲労もためない（Tak指示）。
//        対象は大会の試合週だけ。練習試合の週は従来どおり練習する。
//        試合中に1ラリーごとにたまる疲労は、これまでどおり計算する。
function isTournamentMatchWeek(){
  const t=isTournamentTurn();
  return !!(t && !currentTournamentEliminated(t));
}
function applyRegularTrainingToTeam(baseMenu,lv,mult,logs,ups){
  if(isTournamentMatchWeek()){
    logs.push(`<div class="training-player-block"><div class="training-player-name">試合週</div><div class="training-detail">今週は大会の試合があるため、チーム全員が練習を行いません。練習による疲労もたまりません。</div></div>`);
    return;
  }
  for(const pl of state.players){
    if(isPlayerAbsent(pl)){
      const reason=absentReasonText(pl);
      logs.push(`<div class="training-player-block"><div class="training-player-name">${nameSpan('若葉高校',pl.name)} / ${reason}</div><div class="training-detail">${reason}のため通常練習対象外です。</div></div>`);
      continue;
    }
    const setting=state.playerTraining?.[pl.id]||'omakase';
    const actualMenu=regularTrainingMenus.find(m=>m.id===setting)||baseMenu;
    // v161: 疲労が閾値以上なら、その週は自動的に休む。休息メニューを選んでいる場合も同じ扱い。
    const autoRest=fatigueOf(pl)>=FATIGUE_REST_THRESHOLD;
    const taperRest=!autoRest&&shouldTaperRestThisWeek(pl,lv);
    if(autoRest||taperRest||actualMenu.type==='rest'){
      const before=genkiOf(pl);
      recoverFatigue(pl,FATIGUE_REST_RECOVER);
      const label=autoRest?'疲労がたまっていたため休養':(taperRest?'試合前調整のため休養':'休息');
      logs.push(`<div class="training-player-block"><div class="training-player-name">${nameSpan('若葉高校',pl.name)} / ${label}</div><div class="training-detail">元気度 ${before} → ${genkiOf(pl)}。今週は練習を行いませんでした。</div></div>`);
      continue;
    }
    const rows=[];
    const effects=actualMenu.type==='omakase'
      ? omakaseEffects(pl,mult)
      : Object.fromEntries(validTrainingKeys(actualMenu).map(k=>[k,trainingXp(actualMenu,k,lv,mult)]));
    for(let [k,xp] of Object.entries(effects)){
      const bx=trainingBuffMultiplier(k,pl)*managerTrainingXpMultiplier(pl,k)*coachGuidanceTrainingMultiplier();
      xp=Math.max(1,Math.round(xp*bx));
      xp=applyTrainingMoodXp(pl,xp);
      xp=applyTalentXp(pl,k,xp,'training');
      const before=pl.comps[k],up=addXp(pl,k,xp),after=pl.comps[k];
      rows.push({key:k,xp,before,after,up});
      if(up)ups.push(`${pl.name}：${compLabel(k)} ${coloredValue(before)}→${coloredValue(after)}`);
    }
    const campTheme=currentCampTheme();
    if(campTheme){
      for(const [k,xp] of Object.entries(campTheme.effects)){
        const before=pl.comps[k],up=addXp(pl,k,xp),after=pl.comps[k];
        rows.push({key:k,xp,before,after,up});
        if(up)ups.push(`${pl.name}：${compLabel(k)} ${coloredValue(before)}→${coloredValue(after)}（合宿テーマ）`);
      }
    }
    // v161: 育成組は疲労が増える代わりに、月ごとに指定した能力へ追加XPが入る。
    const devSquad=isDevelopmentSquad(pl);
    if(devSquad && state.devSquadTrainingKey && COMP_KEYS.includes(state.devSquadTrainingKey)){
      const k=state.devSquadTrainingKey;
      const before=pl.comps[k];
      const up=addXpDelta(pl,k,FATIGUE_DEV_SQUAD_XP);
      if(up)ups.push(`${pl.name}：${compLabel(k)} ${coloredValue(before)}→${coloredValue(pl.comps[k])}（育成組の重点練習）`);
    }
    addFatigue(pl,trainingFatigueFor(pl,lv));
    logs.push(`<div class="training-player-block"><div class="training-player-name">${nameSpan('若葉高校',pl.name)} / 通常練習：${actualMenu.name}${devSquad?'（育成組）':''}${campTheme?` / 合宿テーマ：${campTheme.label}`:''}</div>${formatRows(pl,rows)}</div>`);
  }
}

function progressTurn(menuId,lv){
  if(!prepareActionProgressOrTournament())return;

  const baseMenu=regularTrainingMenus.find(m=>m.id===menuId)||regularTrainingMenus.find(m=>m.id==='omakase')||regularTrainingMenus[0];
  const mult=isCampTurn()?2.5:1,logs=[],ups=[];
  triggerMoodMaker(logs);const elv=effectiveTrainingLevel(lv);const sampleSingle=trainingXp({type:'single'},'sample',lv,mult);logs.push(`${monthTurnLabel()}の練習です。既定メニューは${baseMenu.name}です。学校格「${state.schoolClass}」により練習Lv${elv}で計算します${isCampTurn()?'。合宿中です。':'。'}`);logs.push(`通常練習は複合メニューです。${baseMenu.type==='omakase'?'おまかせはポジションに応じて自動配分します。':`既定メニュー効果：${trainingMenuEffectText(baseMenu)}`}`);

  applyRegularTrainingToTeam(baseMenu,lv,mult,logs,ups);

  applyMonthlyNaturalGrowth(logs,ups);
  state.trainingLog.push(...logs);
  state.monthResult=`${monthTurnLabel()}：練習を実施しました。`;
  managerSay(`練習を実施しました。`);
  state.lastTrainingMenu=baseMenu.id;
  state.equipmentLevel=lv;
  maybeRetireThirdYears(logs);
  if(coachActionInMatchWeekMode()){
    markCoachActionExecutedThisMonth();
    state.coachActionMatchWeekMode=false;
    return;
  }
  advanceTurn();
  runPostTurnEvents(state.trainingLog,ups,'training');
}
function buildOwnTeam(){
  ensureStarterIds();
  const basePlayers=[...starters()];
  const liberoCandidate=liberoPlayer();
  const baseRotation=state.starterIds.slice(0,6);
  const pairs=applyStartRotationPairs(baseRotation);
  const rotation=pairs.map(x=>x.id);
  const playerMap={};
  pairs.forEach(pair=>{
    const original=state.players.find(p=>p.id===pair.id)||basePlayers.find(p=>p.id===pair.id);
    if(original)playerMap[pair.id]=cloneForMatchRole(original,pair.role);
  });
  if(liberoCandidate){
    playerMap[liberoCandidate.id]=cloneForMatchRole(liberoCandidate,'L');
  }
  const setterPair=pairs.find(x=>x.role==='S');
  const libero=liberoCandidate||Object.values(playerMap).find(p=>p.role==='L')||Object.values(playerMap)[Object.values(playerMap).length-1];
  const team=applyBenchCheerMoodToTeam({name:ownSchoolName(),basePower:10,players:playerMap,rotation,setter:setterPair?.id||rotation[3]||rotation[0],libero:libero?.id||rotation[5]});
  if(state.eventOpponentScout){team.scoutBonus=true;team.basePower=(team.basePower||10)+0.35;}
  if(state.eventAceCounter){team.aceCounterBonus=true;}
  return team;
} 

function recordNationalStarterExperience(tour, own){
  if(!tour || !own || !['interhigh_nat','haruko_nat'].includes(tour.type))return;
  const key=tour.type;
  const ids=(own.rotation||[]).slice(0,6);
  const names=[];
  ids.forEach(id=>{
    const p=state.players.find(x=>x.id===id);
    if(!p)return;
    if(!Array.isArray(p.nationalStarterHistory))p.nationalStarterHistory=[];
    if(!p.nationalStarterHistory.includes(key))p.nationalStarterHistory.push(key);
    names.push(p.name);
  });
  if(names.length && Array.isArray(state.trainingLog))state.trainingLog.push(`${tour.name}スタメン出場経験：${names.join('、')}`);
}

const TOURNAMENT_OPPONENTS = {
  interhigh_pref_1: [
    // v106: 1回戦は3校に固定し、レベルを引き上げる（実際の数値は round1 プリセット側）。
    {id:'ih_pref1_aoba',name:'青葉実業高校', basePower:5, delta:-6},
    {id:'ih_pref1_midorikawa',name:'緑川学園', basePower:5, delta:-6, style:'balanced_low'},
    {id:'ih_pref1_shiramine',name:'白峰女子学院', basePower:5, delta:-6, style:'receive_mid'}
  ],
  interhigh_pref_2: [
    // v105: 旧・地区決勝の3校をベスト4へ降格。強さを持ったまま降りてくるので
    //       skipDistrictPreset でランク一括指定の上書きを飛ばす。
    {id:'ih_pref2_reimei',name:'黎明女子高校', basePower:10, delta:-2, style:'serve_mid', skipDistrictPreset:true},
    {id:'ih_pref2_akatsuki',name:'暁学院', basePower:10, delta:-2, style:'block_mid', skipDistrictPreset:true},
    {id:'ih_pref2_tachibana',name:'橘女学院', basePower:10, delta:-1, style:'receive_mid', skipDistrictPreset:true},
    // v97: 黒羽学園は全国大会に出場した後にだけ抽選に加わる。
    {id:'ih_pref2_kurobane',name:'黒羽学園', basePower:10, delta:-1, style:'ace_mid', requires:'national', weight:3, skipDistrictPreset:true}
  ],
  interhigh_pref_3: [
    // v105: 地区決勝は必ず東峰女学院（東堂 蒼・西城 茜）と当たる。
    {id:'ih_pref3_toho',name:'東峰女学院', basePower:11, delta:0}
  ],
  haruko_pref_1: [
    // v106: 1回戦は3校に固定し、レベルを引き上げる（実際の数値は round1 プリセット側）。
    {id:'hk_pref1_aoba',name:'青葉実業高校', basePower:5, delta:-6},
    {id:'hk_pref1_midorikawa',name:'緑川学園', basePower:5, delta:-6, style:'balanced_low'},
    {id:'hk_pref1_shiramine',name:'白峰女子学院', basePower:5, delta:-6, style:'receive_mid'}
  ],
  haruko_pref_2: [
    {id:'hk_pref2_reimei',name:'黎明女子高校', basePower:10, delta:-2, style:'serve_mid', skipDistrictPreset:true},
    {id:'hk_pref2_akatsuki',name:'暁学院', basePower:10, delta:-2, style:'block_mid', skipDistrictPreset:true},
    {id:'hk_pref2_tachibana',name:'橘女学院', basePower:10, delta:-1, style:'receive_mid', skipDistrictPreset:true},
    {id:'hk_pref2_kurobane',name:'黒羽学園', basePower:10, delta:-1, style:'ace_mid', requires:'national', weight:3, skipDistrictPreset:true}
  ],
  haruko_pref_3: [
    {id:'hk_pref3_toho',name:'東峰女学院', basePower:11, delta:0}
  ]
};
// v174: 全国大会の対戦相手は content-national.js（有料版）で登録する。
if(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.opponents)Object.assign(TOURNAMENT_OPPONENTS,GVB_NATIONAL.opponents);




function setOpponentBaseline(p,base=8,spread=1){
  for(const k of COMP_KEYS){
    if(typeof p[k]==='number')p[k]=clamp(base+seededInt(`${state.year}:${p.id}:${k}:baseline`,-spread,spread),1,25);
  }
}
function strengthenOpponentAce(p,kind='OH'){
  if(!p)return;
  setOpponentBaseline(p,9,1);
  if(kind==='MB'){
    adjustOpponentPlayer(p,{blockStuff:15,blockRead:15,jump:14,spikePower:12,spikeControl:10,serveControl:9,mental:13,height:174});
  }else{
    adjustOpponentPlayer(p,{spikePower:15,spikeControl:14,jump:14,servePower:13,serveControl:12,recReception:11,recDig:10,mental:13,height:171});
  }
}

function opponentRankValue(rank){
  const map={G:2,F:5,E:8,D:11,C:14,B:17,A:21,S:24};
  return map[String(rank||'D').toUpperCase()] ?? 11;
}
function opponentHeightForRank(rank){
  const map={G:156,F:161,E:164,D:167,C:170,B:173,A:177,S:180};
  return map[String(rank||'D').toUpperCase()] ?? 167;
}
function adjustOpponentRanks(p,ranks){
  if(!p||!ranks)return;
  const patch={};
  if(ranks.Sp){const v=opponentRankValue(ranks.Sp);patch.spikePower=v;patch.spikeControl=v;}
  if(ranks.Bl){const v=opponentRankValue(ranks.Bl);patch.blockStuff=v;patch.blockRead=v;}
  if(ranks.Jp){patch.jump=opponentRankValue(ranks.Jp);}
  if(ranks.Rc){const v=opponentRankValue(ranks.Rc);patch.recReception=v;patch.recDig=v;patch.recRange=v;}
  if(ranks.To){const v=opponentRankValue(ranks.To);patch.tossAccuracy=v;patch.tossRead=v;}
  if(ranks.S){const v=opponentRankValue(ranks.S);patch.servePower=v;patch.serveControl=v;}
  if(ranks.Tall){patch.height=opponentHeightForRank(ranks.Tall);}
  adjustOpponentPlayer(p,patch);
}

function districtBest4Style(opp,tour){
  return seededHash01(`${state.year}:${tour.type}:${opp.name}:best4style`)<0.5?'OH_PAIR':'MB_PAIR';
}
function applyDistrictOpponentPreset(opp,tour){
  if(!tour || !(tour.type==='interhigh_pref'||tour.type==='haruko_pref') || !opp?.players)return opp;
  // v97: 黒羽学園はベスト4でもスタイル(ace_mid)と basePower 11 を保つため、
  //      ランク一括指定のプリセットを適用しない。ベスト4を素通りさせないための段差。
  if(opp._skipDistrictPreset)return opp;
  const players=Object.values(opp.players||{});
  const oh1=opp.players.sawamura, oh2=opp.players.hikawa;
  const mb1=opp.players.mabuchi, mb2=opp.players.ishioka;
  const setter=opp.players.tsudaka, libero=opp.players.mizuharaL, op=opp.players.maebara;
  if(tour.round===1){
    // 地区大会1回戦：前OHに跳躍型エース、MB2に高さだけある未完成型を置く
    players.forEach(p=>setOpponentBaseline(p,8,1));
    adjustOpponentRanks(oh1,{Sp:'C',Bl:'D',Jp:'B',Rc:'E',To:'E',S:'D',Tall:'D'});
    adjustOpponentRanks(oh2,{Sp:'D',Bl:'D',Jp:'D',Rc:'D',To:'F',S:'E',Tall:'E'});
    adjustOpponentRanks(mb1,{Sp:'E',Bl:'D',Jp:'D',Rc:'F',To:'E',S:'E',Tall:'C'});
    adjustOpponentRanks(mb2,{Sp:'D',Bl:'E',Jp:'E',Rc:'E',To:'F',S:'D',Tall:'B'});
    adjustOpponentRanks(op,{Sp:'D',Bl:'E',Jp:'D',Rc:'D',To:'E',S:'C',Tall:'D'});
    adjustOpponentRanks(setter,{Sp:'F',Bl:'E',Jp:'D',Rc:'D',To:'D',S:'D',Tall:'G'});
    adjustOpponentRanks(libero,{Sp:'G',Bl:'F',Jp:'D',Rc:'D',To:'D',S:'F',Tall:'E'});
    opp.basePower=6;
    opp.abilityPresetLabel='1回戦調整型';
    opp.tacticalHint='地区大会1回戦。前OHは身長よりジャンプで打つタイプ、OPはサーブC、MB2は高さBだがジャンプとブロックに粗さがあります。';
  }else if(tour.round===2){
    const style=districtBest4Style(opp,tour);
    players.forEach(p=>{
      setOpponentBaseline(p,8,1);
      if(typeof p.height==='number')p.height=clamp(p.height,155,168);
    });
    if(setter)adjustOpponentPlayer(setter,{tossAccuracy:10,tossRead:10,serveControl:9,mental:10,height:163});
    if(libero)adjustOpponentPlayer(libero,{recReception:10,recDig:11,recRange:10,mental:10,height:158});
    if(op)adjustOpponentPlayer(op,{spikePower:8,spikeControl:8,blockStuff:8,servePower:8,jump:8,mental:9,height:164});
    if(style==='OH_PAIR'){
      // ベスト4①：OH1エースをS/L/MB1が支える型。OPレシーブはDに調整。
      adjustOpponentRanks(oh1,{Sp:'B',Bl:'D',Jp:'C',Rc:'E',To:'D',S:'D',Tall:'D'});
      adjustOpponentRanks(oh2,{Sp:'C',Bl:'D',Jp:'D',Rc:'E',To:'E',S:'D',Tall:'C'});
      adjustOpponentRanks(mb1,{Sp:'E',Bl:'C',Jp:'D',Rc:'F',To:'E',S:'D',Tall:'C'});
      adjustOpponentRanks(mb2,{Sp:'D',Bl:'D',Jp:'D',Rc:'E',To:'F',S:'E',Tall:'C'});
      adjustOpponentRanks(op,{Sp:'D',Bl:'D',Jp:'E',Rc:'D',To:'D',S:'D',Tall:'D'});
      adjustOpponentRanks(setter,{Sp:'D',Bl:'D',Jp:'D',Rc:'E',To:'C',S:'F',Tall:'E'});
      adjustOpponentRanks(libero,{Sp:'E',Bl:'E',Jp:'C',Rc:'C',To:'D',S:'E',Tall:'F'});
      opp.abilityPresetLabel='OHエース型';
      opp.tacticalHint='要注意：OH1がスパイクBの明確なエース。SのトスCとLのレシーブCで支えますが、OH陣のレシーブはEで崩す余地があります。';
    }else{
      strengthenOpponentAce(mb1,'MB');
      strengthenOpponentAce(mb2,'MB');
      if(mb1)adjustOpponentPlayer(mb1,{blockStuff:15,blockRead:15,jump:14,spikePower:12,height:174});
      if(mb2)adjustOpponentPlayer(mb2,{blockStuff:14,blockRead:15,jump:14,spikePower:11,height:175});
      opp.abilityPresetLabel='MB対角';
      opp.tacticalHint='要注意：MB対角が強い相手。中央の速攻とブロックを読んで、配球指示で外す判断が重要です。';
    }
    opp.basePower=8;
  }
  return opp;
}

function clearSchoolClassDropWatchOnWin(tour){if(tour&&state.schoolClassDropWatch){state.schoolClassDropWatch=null;}}
function applyDistrictWinSchoolClass(tour, win){
  if(win)clearSchoolClassDropWatchOnWin(tour);
  if(!win || !tour || !(tour.type==='interhigh_pref'||tour.type==='haruko_pref'))return;
  if(tour.round===1)setSchoolClassAtLeast('弱小校');
  else if(tour.round===2)setSchoolClassAtLeast('中堅校');
  else if(tour.round===3){
    setSchoolClassAtLeast('全国大会出場校');
    // v97: 全国大会に出場した実績を残す。黒羽学園が地区ベスト4に現れる条件。
    if(!state.nationalAppearanceYear){
      state.nationalAppearanceYear=state.year;
      if(Array.isArray(state.trainingLog))state.trainingLog.push('全国大会出場により、地区大会ベスト4に黒羽学園が現れるようになりました。');
    }
  }
}
function opponentAbilityCapForTournament(tour){
  if(!tour || !(tour.type==='interhigh_pref'||tour.type==='haruko_pref'))return null;
  if(tour.round===1)return {value:18,heightCm:176,label:'1回戦調整'};
  if(tour.round===2)return {value:18,heightCm:176,label:'ベスト4調整'};
  return null;
}
function applyOpponentAbilityCap(opp,tour){
  const cap=opponentAbilityCapForTournament(tour);
  if(!cap || !opp?.players)return opp;
  for(const p of Object.values(opp.players)){
    const round1FrontOh=!!(tour?.round===1 && p.id==='sawamura');
    for(const k of COMP_KEYS){
      if(typeof p[k]==='number'){
        const keyCap=round1FrontOh && (k==='spikePower'||k==='jump') ? 15 : cap.value;
        p[k]=clamp(p[k],1,keyCap);
      }
    }
    if(typeof p.height==='number'){
      const heightCap=round1FrontOh ? 169 : cap.heightCm;
      p.height=Math.min(p.height,heightCap);
    }
  }
  opp.abilityCapLabel=cap.label;
  return opp;
}

function opponentKeyForTournament(tour){
  if(!tour)return null;
  return `${tour.type}_${tour.round}`;
}
function tournamentOpponentChoiceKey(tour){
  if(!tour)return '';
  return `${state?.year||1}-${opponentKeyForTournament(tour)}`;
}
const DISTRICT_EXTRA_OPPONENTS={
  // v106: 1回戦・ベスト4はそれぞれ3校に絞ったため、予備校のプールは空にした。
  interhigh_pref_1:[],
  interhigh_pref_2:[],
  interhigh_pref_3:[],
  haruko_pref_1:[],
  haruko_pref_2:[],
  haruko_pref_3:[]
};
// v97: 相手校の解禁条件。今のところ 'national'（全国大会に一度でも出場したか）だけ。
function opponentRequirementMet(req){
  if(!req)return true;
  if(req==='national')return !!state.nationalAppearanceYear;
  return true;
}
function tournamentOpponentPool(key){
  return [...(TOURNAMENT_OPPONENTS[key]||[]),...(DISTRICT_EXTRA_OPPONENTS[key]||[])]
    .filter(cfg=>opponentRequirementMet(cfg&&cfg.requires));
}
// v97: weight 付きの抽選。weight 未指定は 1。
function weightedOpponentChoice(list){
  const arr=(list||[]).filter(Boolean);
  if(!arr.length)return null;
  const total=arr.reduce((sum,x)=>sum+Math.max(0,Number(x.weight)||1),0);
  if(total<=0)return randomChoice(arr);
  let r=Math.random()*total;
  for(const x of arr){
    r-=Math.max(0,Number(x.weight)||1);
    if(r<0)return x;
  }
  return arr[arr.length-1];
}
function chooseTournamentOpponentConfig(tour){
  const key=opponentKeyForTournament(tour);
  const pool=tournamentOpponentPool(key);
  const usable=pool.length?pool:[{id:'default_toho',name:'東峰女学院',basePower:11,delta:0}];
  if(!state.tournamentOpponentChoices)state.tournamentOpponentChoices={};
  const choiceKey=tournamentOpponentChoiceKey(tour);
  let id=state.tournamentOpponentChoices[choiceKey];
  let cfg=usable.find(x=>x.id===id);
  if(!cfg){
    cfg=weightedOpponentChoice(usable)||usable[0];
    state.tournamentOpponentChoices[choiceKey]=cfg.id;
  }
  return cfg;
}
function adjustOpponentPlayer(p, values){
  for(const [k,v] of Object.entries(values)){
    if(k==='height')p.height=clamp(v,150,190);
    else if(typeof p[k]==='number')p[k]=clamp(v,1,25);
  }
}
function seededHash01(str){
  let h=2166136261;
  for(let i=0;i<String(str).length;i++){
    h^=String(str).charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return ((h>>>0)%10000)/10000;
}
function seededInt(str,min,max){
  return min+Math.floor(seededHash01(str)*(max-min+1));
}
function seededPick(str,arr){
  return arr[Math.floor(seededHash01(str)*arr.length)] ?? arr[0];
}

function applyDistrictRandomVariation(opp,tour,cfg){
  if(!tour || !(tour.type==='interhigh_pref'||tour.type==='haruko_pref') || !opp?.players)return opp;
  for(const p of Object.values(opp.players)){
    for(const k of COMP_KEYS){
      if(typeof p[k]==='number'){
        const wiggle=seededInt(`${state.year}:${cfg?.id}:${tour.type}:${tour.round}:${p.id}:${k}`,-2,2);
        p[k]=clamp(p[k]+wiggle,1,25);
      }
    }
    if(typeof p.height==='number')p.height=clamp(p.height+seededInt(`${state.year}:${cfg?.id}:${p.id}:heightwiggle`,-2,2),150,188);
  }
  return opp;
}
// v123: 全国1回戦の壁役のサーブ調整幅。0で従来どおり。
let NAT_WALL_SERVE_ADJ=0;
function applyOpponentStyle(opp, style){
  if(!style)return;
  const players=Object.values(opp.players||{});
  const starters=(opp.rotation||[]).map(id=>opp.players[id]).filter(Boolean);
  const ace=opp.players.sawamura, oh2=opp.players.hikawa, op=opp.players.maebara, mb1=opp.players.mabuchi, mb2=opp.players.ishioka, setter=opp.players.tsudaka, libero=opp.players.mizuharaL;
  // v174: 全国大会出場校のスタイルは content-national.js（有料版）で登録する。
  const natStyles=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.opponentStyles)||null;
  if(natStyles&&typeof natStyles[style]==='function'){
    natStyles[style](opp,{players,starters,ace,oh2,op,mb1,mb2,setter,libero});
    return;
  }
  if(style==='balanced_low'){
    players.forEach(p=>{['spikePower','spikeControl','recReception','recDig','recRange','blockRead','blockStuff','servePower','serveControl','tossAccuracy','tossRead','jump','stamina','mental'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]-1,1,25);});});
  }else if(style==='serve_low'){
    players.forEach(p=>{['servePower','serveControl'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]+2,1,25);});['blockStuff','blockRead'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]-1,1,25);});});
  }else if(style==='receive_low'){
    players.forEach(p=>{['recReception','recDig','recRange'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]+1,1,25);});['spikePower','servePower'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]-1,1,25);});});
  }else if(style==='balanced_mid'){
    players.forEach(p=>{['mental','stamina'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]+1,1,25);});});
  }else if(style==='serve_mid'){
    players.forEach(p=>{['servePower','serveControl'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]+2,1,25);});['recReception'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]-1,1,25);});});
  }else if(style==='receive_mid'){
    players.forEach(p=>{['recReception','recDig','recRange'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]+2,1,25);});['spikePower','spikeControl'].forEach(k=>{if(typeof p[k]==='number')p[k]=clamp(p[k]-1,1,25);});});
  }else if(style==='ace_mid'){
    if(ace)adjustOpponentPlayer(ace,{spikePower:20,spikeControl:17,jump:17,height:176,servePower:17});
  }else if(style==='block_mid'){
    [mb1,mb2,op].filter(Boolean).forEach(p=>adjustOpponentPlayer(p,{height:Math.max(p.height||170,178),blockStuff:clamp((p.blockStuff||12)+3,1,25),blockRead:clamp((p.blockRead||12)+2,1,25)}));
  
  }
}
function buildTournamentOpponent(tour){
  const opp=JSON.parse(JSON.stringify(opponentTemplate));
  const cfg=chooseTournamentOpponentConfig(tour);
  opp.name=cfg.name;
  opp.basePower=cfg.basePower;
  if(cfg.skipDistrictPreset)opp._skipDistrictPreset=true;
  const delta=cfg.delta||0;
  if(delta!==0){
    for(const p of Object.values(opp.players)){
      for(const k of ['spikePower','spikeControl','recReception','recDig','recRange','blockRead','blockStuff','servePower','serveControl','tossAccuracy','tossRead','jump','stamina','mental']){
        if(typeof p[k]==='number')p[k]=clamp(p[k]+delta,1,25);
      }
      if(typeof p.height==='number')p.height=clamp(p.height+Math.max(0,delta),150,185);
    }
  }
  applyOpponentStyle(opp,cfg.style);
  applyDistrictRandomVariation(opp,tour,cfg);
  applyDistrictOpponentPreset(opp,tour);
  if(cfg.elite){
    const ace=opp.players.sawamura, mb=opp.players.mabuchi, setter=opp.players.tsudaka, libero=opp.players.mizuharaL;
    if(ace){ace.spikePower=25;ace.spikeControl=23;ace.jump=23;ace.servePower=23;}
    if(mb){mb.blockStuff=25;mb.blockRead=23;mb.height=Math.max(mb.height,182);}
    if(setter){setter.tossAccuracy=25;setter.tossRead=24;setter.mental=23;}
    if(libero){libero.recReception=25;libero.recDig=24;libero.recRange=24;}
  }
  applyOpponentAbilityCap(opp,tour);
  // v79/v80: スタイル適用後の一律底上げ（現在は全国1回戦の3校に +1〜+2 のランダム）。
  // 全国1回戦の相手はスタイル側で能力に上限クランプが掛かっており
  // （全国1回戦のスタイル側で能力に上限クランプが掛かるため）、
  // basePower や delta を上げてもコート上の能力が変わらなかったため、
  // スタイル適用の後に効く補正として用意した。
  if(cfg.postBoost){
    // 配列指定なら毎試合その範囲でランダム（例: [1,2] なら +1〜+2）
    const b=Array.isArray(cfg.postBoost)?randomInt(cfg.postBoost[0],cfg.postBoost[1]):(Number(cfg.postBoost)||0);
    for(const p of Object.values(opp.players||{})){
      for(const k of COMP_KEYS){ if(typeof p[k]==='number')p[k]=clamp(p[k]+b,1,25); }
      if(typeof p.stamina==='number')p.stamina=clamp(p.stamina+b,1,25);
      if(typeof p.mental==='number')p.mental=clamp(p.mental+b,1,25);
      if(typeof p.height==='number')p.height=clamp(p.height+Math.max(0,b),150,190);
    }
  }
  return applyOpponentSchoolNames(opp);
}


const OPPONENT_NAME_SETS = {
  '南丘高校':['南野 あかり','丘田 美鈴','川辺 千夏','石原 風花','三森 奈央','日高 すず','水嶋 花','浅倉 梨乃','小松 美羽','藤川 由奈'],
  '桜木女子高校':['桜井 こころ','木戸 七瀬','花村 亜美','春野 玲','桃井 栞','西原 千尋','小森 ひなた','岩崎 紬','神谷 乃愛','成田 咲'],
  '霞ヶ浦高校':['芦原 まどか','浦田 由依','湖山 美緒','遠山 凪','水瀬 佳奈','白井 莉央','村上 沙耶','芹沢 美琴','早坂 楓','宮野 茜'],
  '汐見商業高校':['湊 朱音','港 千紗','海野 美咲','島田 凛','浜口 里奈','有川 沙月','瀬川 結衣','波木 杏','高浜 花音','青砥 芽衣'],
  '七海学園':['七瀬 遥','海堂 紗良','水野 真央','鳴海 琴音','潮見 陽菜','白波 玲奈','朝凪 千春','小湊 美月','碧井 栞','帆高 結菜'],
  '泉中央高校':['水口 すみれ','中条 佳穂','清水 りお','井上 花梨','田辺 美羽','沢口 紬','広瀬 奏','若林 詩音','片瀬 真白','大浦 優花'],
  '黎明女子高校':['蓮見 朱里','明石 美琴','東雲 凪咲','有村 真帆','日野 莉子','朝比奈 灯','白河 由良','桐原 玲','月城 花帆','天野 紗英'],
  '暁学院':['秋葉 ひより','朝倉 千鶴','戸倉 詩織','火野 瑠花','光井 沙羅','上条 璃子','高遠 佳乃','真中 美里','小暮 梓','白鷺 乃々香'],
  '橘女学院':['立花 風香','花咲 美波','香月 玲','藤崎 梨央','一ノ瀬 夕奈','倉橋 碧','岸本 由衣','三枝 小春','長瀬 心春','森下 美緒'],
  '青葉実業高校':['青木 由依','葉山 千紗','浅井 美緒','森川 佳奈','宮原 結月','日野 沙月','佐倉 莉央','川瀬 菜々','野村 ひなた','柏木 紬'],
  '白峰女子学院':['篠塚 真帆','峰岸 玲奈','雪村 灯','高瀬 栞','北条 茉莉','久保 梨花','有馬 早紀','滝沢 美羽','久我 七海','西園 遥'],
  '東峰女学院':['沢村 芽衣','氷川 里奈','前原 彩葉','真壁 透子','石岡 美咲','津高 琴音','水原 凪','大鳥 朱音','篠宮 伊織','小清水 杏'],
  '緑川学園':['三雲 碧','若林 日和','森戸 菫','笹原 彩乃','水城 七緒','成沢 朋花','竹内 実里','早川 莉子','遠野 楓','柏木 小春'],
  '朝日ヶ丘女子高校':['朝倉 陽菜乃','日下 ひかり','丘野 花梨','照井 千夏','橘田 美優','藤森 凛','篠崎 亜澄','有坂 心春','三宅 芽依','木崎 和奏'],
  '黒羽学園':['黒瀬 玲','羽田 真白','烏丸 凪咲','影山 沙羅','夜久 千景','月村 夕奈','柊 佳乃','神代 美里','小鳥遊 梨央','白沢 千帆']
};
// v174: 全国大会出場校の選手名は content-national.js（有料版）で登録する。
if(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.opponentNameSets)Object.assign(OPPONENT_NAME_SETS,GVB_NATIONAL.opponentNameSets);

// v174: 全国のスター選手の顔・能力・特殊能力は content-national.js（有料版）で登録する。
const NATIONAL_STAR_FACES={};
if(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.starFaces)Object.assign(NATIONAL_STAR_FACES,GVB_NATIONAL.starFaces);
// v82: 全国の固定スターの能力表（有料版で登録）。
// 三上: レセプション21→22 / ディグ21→22 / 守備範囲20→21 / サーブ21・20→22・21
//       （三上はU-18日本代表にも所属するため、U-18も連動して強くなる）
// アーニャ: シャット17→19 / リード14→17 / コース打ち11→15 / サーブ14・11→16・14
//       （アーニャはU-18には入っていないのでU-18は変わらない）
function fixedStarPatch(name){
  // v174: 能力表は content-national.js（有料版）で登録する。
  const map=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.fixedStarPatches)||{};
  return map[name]||null;
}
// v86: 固定スターが持つ特殊能力（有料版で登録）。
// （v85では7人全員に付けていたが、吉岡＝鎮西 / 奥村姉妹＝京極 / 霧島＝黒稜 と
//   所属校の試合にも反映されるため、ベスト4や全国1回戦まで一緒に強くなっていた）
// v87: 三上=パワーヒッター、岬=ツーアタックのみ。
// 相手チームでも機能する金特殊能力がOHには存在しないため（ベンチの声援は自チーム限定、
// 鉄壁の中央はMB専用、右翼砲台はOP専用）、ノーマル特能から選んでいる。
const FIXED_STAR_SPECIALS={};
if(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.fixedStarSpecials)Object.assign(FIXED_STAR_SPECIALS,GVB_NATIONAL.fixedStarSpecials);
function applyFixedNationalStars(opp){
  for(const p of Object.values(opp?.players||{})){
    const patch=fixedStarPatch(p.name);
    if(!patch)continue;
    adjustOpponentPlayer(p,patch);
    if(patch.hand)p.hand=patch.hand;
    if(patch.year)p.year=patch.year;
    if(NATIONAL_STAR_FACES[p.name])p.portrait=NATIONAL_STAR_FACES[p.name];
    const sp=FIXED_STAR_SPECIALS[p.name];
    if(sp){
      if(!Array.isArray(p.special))p.special=[];
      for(const x of sp){ if(!p.special.includes(x))p.special.push(x); }
    }
  }
  return opp;
}

function opponentYearHash(text){
  let h=2166136261;
  const s=String(text||'');
  for(let i=0;i<s.length;i++){
    h^=s.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0)/4294967296;
}
function assignOpponentSchoolYears(opp){
  // v174: 全国のスター選手の学年は content-national.js（有料版）で登録する。
  const fixedYears=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.fixedStarYears)||{};
  Object.values(opp?.players||{}).forEach((p,i)=>{
    if(!p)return;
    if(fixedYears[p.name]){
      p.year=fixedYears[p.name];
      return;
    }
    const r=opponentYearHash(`${opp.name}:${p.name}:${i}:school-year`);
    p.year = r<0.05 ? 1 : r<0.30 ? 2 : 3;
  });
}


// ============================================================
// v97: 東峰女学院のライバル二人（東堂 蒼 / 西城 茜）
// ============================================================
// 東峰女学院は地区大会決勝の主役。セッターの東堂 蒼とエースの西城 茜が、
// 若葉の実績に合わせて3段階で成長する。相手校に世代交代の概念が無いため、
// 「学年が上がる」ことで成長を見せる（時系列のズレは意図的に許容している）。
//   段階1: 初対戦             / 1年 / 荒削りで噛み合っていない
//   段階2: 一度地区決勝で敗れた後 / 2年 / 全国出場〜ベスト4級
//   段階3: 若葉が全国決勝に進出した後 / 3年 / U-18選考の最終段階で落ちる水準
const TOHO_RIVAL_PORTRAITS={setter:'assets/opp_todo_aoi.png',ace:'assets/opp_saijo_akane.png'};
const TOHO_RIVAL_STAGES={
  // v120: 二人が主役に見えるようにする。以前は他の5人を底上げしていたため、
  //       真壁(MB)や水原(L)の方が評価が高く、看板の二人が見劣りしていた。
  //       二人を大きく引き上げ、他の5人は逆に少し下げて「寄せ集め」に寄せる。
  1:{
    ace:{height:171,spikePower:21,spikeControl:18,jump:20,recReception:13,recDig:14,recRange:14,blockRead:13,blockStuff:14,servePower:17,serveControl:15,tossAccuracy:6,tossRead:6,stamina:17,mental:17},
    setter:{height:165,tossAccuracy:20,tossRead:19,servePower:12,serveControl:16,spikePower:8,spikeControl:9,recReception:14,recDig:14,recRange:14,blockRead:11,blockStuff:10,jump:12,stamina:16,mental:17},
    teamBonus:-1
  },
};
// v174: 段階2・3の能力表は content-national.js（有料版）で登録する。
if(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.tohoRivalStages)Object.assign(TOHO_RIVAL_STAGES,GVB_NATIONAL.tohoRivalStages);
// 二人だけが伸びると残り5人が置いていかれて壁にならないため、
// 段階2以降は他の東峰の選手にも底上げを入れている（v98で +1/+2 → +3/+4 に引き上げ）。
// v110: 段階の条件を「若葉の全国での到達度」に変更した。
// 旧：地区決勝で1回勝つ（tohoRivalDefeatCount>=1）だけで段階2に上がっていたため、
//     初めて地区優勝した翌年にいきなり東峰が強くなり、そこから何年も地区決勝で足踏みしていた。
//     全国へ行ったのにまた地区で止まる、という体験になっていたのを直す。
// v111：段階2＝全国大会1回戦を突破したら / 段階3＝全国大会で優勝したら。
//       全国決勝進出では遅すぎるため1回戦突破に前倒しした。
function tohoRivalStage(){
  if(state.lastNationalChampionYear)return 3;
  if(state.nationalFirstRoundWonYear)return 2;
  return 1;
}
function applyTohoRivals(opp){
  if(!opp || opp.name!=='東峰女学院' || !opp.players)return opp;
  const stage=tohoRivalStage();
  const grade=tohoRivalGrade();
  const def=TOHO_RIVAL_STAGES[stage]||TOHO_RIVAL_STAGES[1];
  const ace=opp.players.sawamura, setter=opp.players.tsudaka;
  const bonus=def.teamBonus||0;
  // v122: 一律の底上げ(teamBonus)に加えて、選手ごとの増減(others)も指定できるようにした。
  const per=def.others||{};
  for(const [id,p] of Object.entries(opp.players)){
    if(p===ace||p===setter)continue;
    const d=(Object.prototype.hasOwnProperty.call(per,id)?per[id]:bonus);
    if(!d)continue;
    for(const k of COMP_KEYS){ if(typeof p[k]==='number')p[k]=clamp(p[k]+d,1,25); }
    if(typeof p.stamina==='number')p.stamina=clamp(p.stamina+d,1,25);
    if(typeof p.mental==='number')p.mental=clamp(p.mental+d,1,25);
  }
  if(ace){
    ace.name='西城 茜';
    ace.portrait=TOHO_RIVAL_PORTRAITS.ace;
    ace.hand='右';
    ace.year=grade;
    adjustOpponentPlayer(ace,def.ace);
  }
  if(setter){
    setter.name='東堂 蒼';
    setter.portrait=TOHO_RIVAL_PORTRAITS.setter;
    setter.hand='右';
    setter.year=grade;
    adjustOpponentPlayer(setter,def.setter);
  }
  // v165: 段階ごとの個別上書き（底上げ others のあとに絶対値で入れる）
  const ov=def.overrides||{};
  for(const [id,patch] of Object.entries(ov)){
    const target=opp.players[id];
    if(target)adjustOpponentPlayer(target,patch);
  }
  // 蒼は茜に託す。配球指示（preferredAttackerId）で関係性を数値とログに出す。
  if(ace)opp.preferredAttackerId=ace.id;
  opp.tohoRivalStage=stage;
  // v141: 学年の言い回しは実際の学年（イベント発生回数）に合わせ、警戒度は強化段階で決める。
  opp.tohoRivalGrade=grade;
  opp.tacticalHint=stage===1
    ? `東峰女学院。${grade}年生のセッター東堂 蒼とエース西城 茜。二人はまだ噛み合っていませんが、茜の打点は同学年で頭ひとつ抜けています。`
    : stage===2
      ? `要注意：東峰女学院。${grade}年生の東堂 蒼の配球が読みにくくなり、西城 茜の打点も上がっています。蒼は茜に託します。`
      : `最大級の警戒：東峰女学院。${grade}年生の東堂 蒼と西城 茜は、U-18の選考に残る水準です。蒼の配球はほぼ読めません。`;
  return opp;
}

// v174: 全国王者の覚醒は content-national.js（有料版）で登録する。
function applyKoutokuAwakening(opp){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.applyKoutokuAwakening)||null;
  return fn?fn(opp):opp;
}

function applyOpponentSchoolNames(opp){
  const names=OPPONENT_NAME_SETS[opp.name];
  if(names)Object.values(opp.players).forEach((p,i)=>{ if(names[i])p.name=names[i]; });
  assignOpponentSchoolYears(opp);
  applyFixedNationalStars(opp);
  // v97: 名前・学年の一括設定より後に上書きする（ここが最終値になる）
  applyTohoRivals(opp);
  applyKoutokuAwakening(opp);

  // v174: 全国大会出場校の最終調整は content-national.js（有料版）で行う。
  const natFinal=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.finalizeNationalOpponent)||null;
  if(natFinal)natFinal(opp);
  return opp;
}

// v203: 全国5校の初対戦イベント・U-18勝利イベント・OG勝利イベントは
//        content-national.js（有料版）で登録する。体験版では何も起きない。
function maybeNationalFirstEncounterEvent(tour){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.maybeNationalFirstEncounterEvent)||null;
  return fn?fn(tour):false;
}
function showU18WinEvent(){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.showU18WinEvent)||null;
  if(fn)fn();
}
function showOgWinEvents(){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.showOgWinEvents)||null;
  if(fn)fn();
}
// v203: 練習試合枠（U-18戦・OG戦）に勝ったときの物語イベント。どちらも初勝利の1回だけ出す。
function handleSpecialMatchWinStory(opp,win){
  if(!win||!opp)return;
  if(opp.isU18AllStar && !state.u18WinEventShown){
    state.u18WinEventShown=true;
    showU18WinEvent();
  }
  if(opp.isOgAllStar && !state.ogWinEventShown){
    state.ogWinEventShown=true;
    showOgWinEvents();
  }
}

// v174: U-18代表の妹の設定は content-national.js（有料版）で登録する。
const U18_SISTER_CONFIG=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.u18SisterConfig)||{};
const U18_SISTER_REWIND_DELTA=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.u18SisterRewindDelta)||{};
function seasonTurnSerial(y=state.year,m=state.monthIndex,t=state.turnIndex){
  return (Math.max(1,Number(y)||1)-1)*48+(Number(m)||0)*4+(Number(t)||0);
}
function makeU18SisterCandidate(sourcePlayer){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.makeU18SisterCandidate)||null;
  return fn?fn(sourcePlayer):null;
}
// v208: U-18日本代表の妹は1回きりだったが、前の妹が卒業したらまた受け取れるようにする（Tak指示）。
//   ・まだ一度も受け取っていない → 受け取れる
//   ・受け取ったが、まだ入部していない（加入待ち） → 受け取れない
//   ・入部済みで、その妹が3年生になる年（加入年+2）を過ぎている → また受け取れる
function u18SisterRewardAvailable(){
  if(!state.u18SisterRewardClaimed)return true;
  const gy=Number(state.u18SisterGraduationYear||0);
  if(!gy)return false;
  return (Number(state.year)||1)>gy;
}
function scheduleU18SisterRecruitOnWin(opp,win,logs){
  // v76: U-18日本代表に初めて勝った年を記録する。OG特別試合の解禁条件に使う。
  if(win && opp?.isU18AllStar && !state.u18DefeatedYear)state.u18DefeatedYear=state.year;
  // v201: U-18日本代表に勝った時点でOG戦が解禁される。以後は進行バーに出したままにする。
  if(win && opp?.isU18AllStar)state.ogTimelineRevealed=true;
  if(!win||!opp?.isU18AllStar)return false;
  // v208: 1回きりではなく、前の妹が卒業していれば再び受け取れる。
  if(!u18SisterRewardAvailable())return false;
  const eligible=Object.values(opp.players||{}).filter(p=>U18_SISTER_CONFIG[p.name]);
  if(!eligible.length)return false;
  const source=randomChoice(eligible);
  const candidate=makeU18SisterCandidate(source);
  if(!candidate)return false;
  state.u18SisterRewardClaimed=true;
  // v208: 新しい妹を受け取るので、前の妹の卒業年の記録はここで空にする。
  state.u18SisterGraduationYear=null;
  state.u18SisterReward={
    sourceName:source.name,
    sisterName:candidate.name,
    portrait:candidate.portrait,
    candidate,
    scheduledAtSerial:seasonTurnSerial(),
    dueTurnSerial:seasonTurnSerial()+4,
    eventShown:false,
    joinYear:null,
    consumed:false
  };
  logs.push('U-18日本代表への勝利が、後に特別な縁を生むことになりそうです。');
  return true;
}
function u18SisterJoinYearFromCurrentTurn(){
  const aprilSelectionStillAhead=
    state.monthIndex===0 &&
    state.turnIndex===0 &&
    state.lastRecruitYear!==state.year &&
    !state.aprilRecruitSelectionOpen;
  return aprilSelectionStillAhead?state.year:state.year+1;
}
// v174: U-18代表の妹の入部イベントは content-national.js（有料版）で登録する。
function maybeU18SisterFollowupEvent(logs){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.maybeU18SisterFollowupEvent)||null;
  return fn?fn(logs):false;
}
// v174: U-18代表の妹の入部処理は content-national.js（有料版）で登録する。
function appendU18SisterToAprilCandidates(arr,reservedPortraits=[],reservedNames=[]){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.appendU18SisterToAprilCandidates)||null;
  return fn?fn(arr,reservedPortraits,reservedNames):false;
}

// v174: U-18日本代表は content-national.js（有料版）で登録する。
function buildU18AllStarOpponent(){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.buildU18AllStarOpponent)||null;
  return fn?fn():createPracticeOpponent();
}

function buildOpp(tour=null){if(tour&&tour.type==='practice'&&state.practiceMatch?.opponent)return JSON.parse(JSON.stringify(state.practiceMatch.opponent));return buildTournamentOpponent(tour);} function getVal(p,k){if(!p)return 0;const c=p.comps||p;return c[k]??0;} function bigStageValue(team,p,k){let v=getVal(p,k);if(team&&isOwnTeamName(team.name)&&currentMatchTournamentType&&currentMatchTournamentType.includes('_nat')&&hasSpecial(p,'大舞台'))v*=1.03;if(team&&isOwnTeamName(team.name)&&currentMatchTournamentType==='haruko_nat'&&hasSpecial(p,'春高の星'))v*=1.10;if(team&&isOwnTeamName(team.name)&&currentMatchTournamentType==='interhigh_nat'&&hasSpecial(p,'インハイの星'))v*=1.10;return v;} function eff(team,p,k){
  // v161: 疲労による減衰。身長は heightPoint 経由なのでここには来ない＝対象外。
  //        調子(moodMod)とは別に、二重に掛かる。
  let v=bigStageValue(team,p,k)*fatigueMod(p);
  if(team?.scoutBonus && ['blockRead','tossRead','recRange'].includes(k))v*=1.04;
  if(team?.aceCounterBonus && ['blockRead','blockStuff'].includes(k))v*=1.06;
  if(k==='recRange'||k==='jump')return v;
  const vals=Object.values(team.players).map(x=>bigStageValue(team,x,k));
  return v+avg(vals)*.08+(team.basePower||10)*.03;
} function moodMod(p){return p&&p.comps?effectiveMoodMod(p):1;} 
function roleBalancedFrontIds(team){
  const ids=team.rotation;
  const players=ids.map(id=>team.players[id]).filter(Boolean);
  const oh=players.filter(p=>p.role==='OH');
  const mb=players.filter(p=>p.role==='MB');
  const s=players.find(p=>p.role==='S');
  const op=players.find(p=>p.role==='OP');
  // セッターとOPは対角扱い。前衛はSかOPのどちらか1人、OH1人、MB1人に制限。
  const pair = ids.indexOf(team.setter) < 3 ? s : op;
  const ohFront = oh.find(p=>ids.indexOf(p.id)<3) || oh[0];
  const mbFront = mb.find(p=>ids.indexOf(p.id)<3) || mb[0];
  return [ohFront, mbFront, pair].filter(Boolean).map(p=>p.id);
}
function roleBalancedBackIds(team){
  const front=new Set(roleBalancedFrontIds(team));
  return team.rotation.filter(id=>!front.has(id));
}

function frontIds(t){return roleBalancedFrontIds(t);} function backIds(t){return roleBalancedBackIds(t);} function serverId(t){return t.rotation[5];} function rotate(t){t.rotation=[t.rotation[3],t.rotation[0],t.rotation[1],t.rotation[4],t.rotation[5],t.rotation[2]];} function displayRole(t,id){return['前左','前中','前右','後左','後中','後右'][t.rotation.indexOf(id)]||'控え';} function wchoice(arr){let sum=arr.reduce((a,b)=>a+b.w,0),r=Math.random()*sum;for(const x of arr){r-=x.w;if(r<=0)return x;}return arr[arr.length-1];}

function isMiddleBlocker(p){return p && p.role==='MB';}
function courtBackPlayers(team){
  const backs=backIds(team).map(id=>team.players[id]).filter(Boolean);
  const lib=team.players[team.libero];
  if(!lib)return backs;
  const server=team.players[serverId(team)];
  // MBがサーブを打っているローテではリベロは後衛におらず、MB本人がディグに入る
  if(team.isServing && isMiddleBlocker(server))return backs;
  return backs.map(p=>{
    if(isMiddleBlocker(p))return lib;
    return p;
  }).filter((p,i,arr)=>p && arr.findIndex(x=>x.id===p.id)===i);
}
function effectiveFrontPlayers(team){
  // リベロが前衛に上がる場面はMBと交代して、前衛には出ない。
  return frontIds(team).map(id=>team.players[id]).filter(Boolean).map(p=>p.id===team.libero?null:p).filter(Boolean);
}

// v151: サーブ指示は4択。並立させず、どれか1つを選ぶ。
// 倍率は v142 の合成後サーブ値（威力×0.75＋制球×0.25）に対して掛ける。
const SERVE_ORDERS={
  none:      {label:'指示なし',     power:1.00, miss:1.00, hint:'補正なし。'},
  aggressive:{label:'強気で攻めろ', power:1.10, miss:1.50, hint:'サーブが強くなる代わりにミスが増えます。打った選手のサーブ威力が少し伸びます。', xpKey:'servePower'},
  safe:      {label:'絶対に入れろ', power:0.90, miss:0.60, hint:'ミスがぐっと減る代わりにサーブは弱くなります。打った選手のサーブ制球が少し伸びます。', xpKey:'serveControl'},
  ace:       {label:'エースを狙え', power:1.00, miss:1.00, hint:'狙い先を、相手前衛でいちばん攻撃力の高い選手（セッターを除く）に変えます。レセプションを背負わせて直後の攻撃を鈍らせる狙いです。', targetAce:true}
};
const SERVE_MISS_MIN=0.01, SERVE_MISS_MAX=0.30;
function normalizeServeOrder(v){ return SERVE_ORDERS[v]?v:'none'; }
function serveOrderKeyOf(team){
  // 相手校は常に指示なし。自チームだけが監督の指示を受ける。
  if(!team || !isOwnTeamName(team.name))return 'none';
  // v151: 「結果を見る」は観戦セッションを作らないので、その場合は state 側の指示を読む。
  if(watchMatchSession && !watchMatchSession.done)return normalizeServeOrder(watchMatchSession.serveOrder);
  return normalizeServeOrder(state.matchServeOrder||'none');
}
function serveOrderOf(team){ return SERVE_ORDERS[serveOrderKeyOf(team)]||SERVE_ORDERS.none; }
// v142: サーブの強さ＝威力75%＋制球25%。威力偏重を避け、制球にも意味を持たせる。
const SERVE_POWER_RATIO=0.75;
function serveStrength(power,control){
  return (Number(power)||0)*SERVE_POWER_RATIO+(Number(control)||0)*(1-SERVE_POWER_RATIO);
}
function cutQuality(d){if(d>=3)return'A';if(d>=-2)return'B';if(d>=-6)return'崩れ';if(d>=-9)return'チャンス返球';return'サービスエース';} function cutBonus(q){return q==='A'?5:q==='B'?2:-4;} function blockResult(d){return d<0?'シャットアウト！！':d<6?'ワンタッチ':d<11?'通常突破':d<16?'完全突破':'ノータッチ級';} function digResult(d){return d>=4?'A返球':d>=0?'B返球':d>=-4?'崩れ':'失点';}
function removePriorBlockCatchNarration(log){
  if(!Array.isArray(log)||!log.length)return;
  for(let i=log.length-1;i>=Math.max(0,log.length-4);i--){
    const s=String(log[i]||'');
    if(s.includes('match-play-line') && s.includes('block') && (s.includes('ブロックに捕まった')||s.includes('シャットアウト')||s.includes('止められた'))){
      log.splice(i,1);
      return;
    }
  }
}
function tryFeintAfterShutdown(attTeam,defTeam,att,ctrl,luck,log,stats,awardPointFn,scoreTextFn){
  const rate=clamp(ctrl/100,0,1);
  const roll=Math.random();
  log.push(`シャットアウト回避フェイント判定：コース打ち${num(ctrl)} ÷ 100 = ${pct(rate)} / 乱数${num(roll,3)} → ${roll<rate?resultTag('フェイント'):resultTag('失敗')}`);
  if(roll>=rate)return null;
  removePriorBlockCatchNarration(log);
  log.push(playLineHtml(`${nameSpan(attTeam.name,att.name)}、ブロックを見てフェイント。`,'attack'));
  if(hasSpecial(att,'ワンチ回収')){
    addActionStat(stats,'spike',attTeam.name,att.name,'ワンチ回収');
    log.push(`${nameSpan(attTeam.name,att.name)}のワンチ回収発動！！ 自チームのAカット状態から攻撃を立て直します。`);
    return {done:false,attTeam:attTeam,defTeam:defTeam,q:'A'};
  }
  applyMoodMakerBias(attTeam,att,luck);
  const fr=fairRand(attTeam.name,.85,1.15,luck);
  const need=ctrl*fr;
  const dg=chooseDigger(defTeam,ctrl,false),dp=dg.player;defTeam._lastDiggerId=dp?dp.id:null;applyMoodMakerBias(defTeam,dp,luck);const dr=fairRand(defTeam.name,.85,1.15,luck);
  const wideDig=hasSpecial(dp,'広い守備範囲')?1.10:1;
  const domainDig=guardianDomainRangeMultiplier(dp,log,'フェイント守備範囲');
  const dv=eff(defTeam,dp,'recDig')*wideDig*domainDig*flyingReceiveMultiplier(dp,log,'ディグ')*1.25*moodMod(dp)*dr;
  let dd=dv-need,digRes=digResult(dd);
  if(guardianAdjust(dp,dd,'フェイントディグ',log)){digRes='崩れ';dd=-4;}
  log.push(`フェイント攻撃：コース打ち${num(ctrl)}×乱数${num(fr,2)}=${num(need)}`);
  log.push(`ディグ対象：${dg.detail} → ${resultTag(nameSpan(defTeam.name,dp.name))}`);
  log.push(`フェイントディグ判定：ディグ${num(eff(defTeam,dp,'recDig'))}×広い守備範囲${num(wideDig,2)}×絶対守護領域${num(domainDig,2)}×1.25×調子${num(moodMod(dp),2)}×乱数${num(dr,2)}=${num(dv)} - 難度${num(need)} = ${num(dd)} → ${resultTag(digRes)}`);
  log.push(playLineHtml(digNarrative(defTeam,dp,digRes),'dig'));
  addActionStat(stats,'dig',defTeam.name,dp.name,digRes);
  if(dd<-4){
    addActionStat(stats,'spike',attTeam.name,att.name,'フェイント得点');
    awardPointFn(attTeam.name,'フェイント得点',att.name);
    log.push(resultLineHtml('フェイント得点',scoreTextFn()));
    return {done:true};
  }
  addActionStat(stats,'spike',attTeam.name,att.name,'フェイント継続');
  const nextQ=digRes==='A返球'?'A':digRes==='B返球'?'B':'崩れ';
  log.push(playLineHtml(rallyContinueNarrative(defTeam,digRes),'continue'));
  return {done:false,attTeam:defTeam,defTeam:attTeam,q:nextQ};
}
function coverageGapPlayer(label='守備の間'){
  const comps={};COMP_KEYS.forEach(k=>comps[k]=-100);
  return {id:'__coverage_gap__',name:label,role:'L',height:150,comps,special:[],mood:0,portrait:''};
}
// v151: 「エースを狙え」の狙い先。相手前衛からセッターを除き、純粋攻撃値が最大の選手を選ぶ。
// 純粋攻撃値＝スパイク決定力×0.75 ＋ ジャンプ×0.375 ＋ 身長評価×0.375
// （セッターのトス正確性・カット補正・調子・乱数は含めない基礎値）
function pureAttackValue(team,p){
  if(!p)return 0;
  return getVal(p,'spikePower')*0.75 + getVal(p,'jump')*0.375 + heightPoint(p.height||156)*0.375;
}
function serveAceTargetFrom(team,candidates){
  const fronts=effectiveFrontPlayers(team)||[];
  const frontIds=new Set(fronts.map(p=>p&&p.id).filter(Boolean));
  const rows=(candidates||[]).filter(p=>p && frontIds.has(p.id) && p.role!=='S' && p.id!==team.setter);
  if(!rows.length)return null;
  rows.sort((a,b)=>{
    const d=pureAttackValue(team,b)-pureAttackValue(team,a);
    if(Math.abs(d)>1e-9)return d;
    const sp=getVal(b,'spikePower')-getVal(a,'spikePower'); if(sp)return sp;
    const jp=getVal(b,'jump')-getVal(a,'jump'); if(jp)return jp;
    const ht=heightPoint(b.height||156)-heightPoint(a.height||156); if(ht)return ht;
    return Math.random()<0.5?-1:1;
  });
  return rows[0];
}
function chooseReceiver(team,sc,server=null,svOrder=null){
  const backs=courtBackPlayers(team);
  const fronts=effectiveFrontPlayers(team);
  // セッターはサーブレシーブ対象から完全に除外する。
  const isReceptionEligible=p=>p && p.role!=='S' && p.id!==team.setter;
  const eligibleBacks=backs.filter(isReceptionEligible);
  const eligibleFronts=fronts.filter(isReceptionEligible);
  const backIdsSet=new Set(eligibleBacks.map(p=>p.id));
  const list=[...eligibleBacks,...eligibleFronts].filter((p,i,a)=>p&&a.findIndex(x=>x.id===p.id)===i);
  if(!list.length){
    const fallback=Object.values(team.players||{}).find(isReceptionEligible)||Object.values(team.players||{})[0];
    return{player:fallback,detail:'受け手なし'};
  }
  const low=eligibleBacks.length?eligibleBacks.reduce((m,p)=>eff(team,p,'recReception')<eff(team,m,'recReception')?p:m,eligibleBacks[0]):list[0];
  // v151: 狙い撃ちの加算先。既定は後衛のレセプション最弱者。「エースを狙え」なら前衛のエース。
  //        エースがレセプション対象でない場合は次点へ繰り下がり、誰もいなければ既定へ戻す。
  const aceTarget=(svOrder&&svOrder.targetAce)?serveAceTargetFrom(team,list):null;
  const sniperTargetId=aceTarget?aceTarget.id:(low?low.id:null);
  let totalCoverage=0;
  const rows=list.map(p=>{
    let base,formula;
    if(p.id===team.libero){
      const domain=guardianDomainRangeMultiplier(p,null,'レセプション守備範囲');
      base=getVal(p,'recRange')*2*domain;
      formula=`リベロ範囲${getVal(p,'recRange')}×2${domain>1?'×絶対守護領域':''}`;
    }else if(backIdsSet.has(p.id)){
      const wide=hasSpecial(p,'広い守備範囲')?1.3:1;
      const domain=guardianDomainRangeMultiplier(p,null,'レセプション守備範囲');
      base=getVal(p,'recRange')*wide*domain;
      formula=`後衛範囲${getVal(p,'recRange')}${wide>1?'×広い守備範囲':''}${domain>1?'×絶対守護領域':''}`;
    }else{
      const wide=hasSpecial(p,'広い守備範囲')?1.3:1;
      const domain=guardianDomainRangeMultiplier(p,null,'レセプション守備範囲');
      base=getVal(p,'recRange')*.5*wide*domain;
      formula=`前衛範囲${getVal(p,'recRange')}×0.5${wide>1?'×広い守備範囲':''}${domain>1?'×絶対守護領域':''}`;
    }
    totalCoverage+=Math.max(0,base);
    let w=Math.max(.01,base);
    // サーブ制球による意図的狙い撃ち。通常は後衛のレセプション最弱者。
    // v151: 「エースを狙え」のときは、同じ加算量を前衛のエースへ振り替える。
    if(p.id===sniperTargetId){
      const sniper=server&&hasSpecial(server,'狙い撃ち')?1.5:1;
      w+=Math.max(0,sc)*sniper;
      formula+=`+制球${num(sc)}${sniper>1?'×狙い撃ち':''}${aceTarget?'（エースを狙え）':''}`;
    }
    return{p,w,formula};
  });
  const shortage=Math.max(0,100-totalCoverage);
  const gapWeight=shortage*.20;
  if(gapWeight>0)rows.push({p:coverageGapPlayer('守備の間'),w:gapWeight,formula:`カバー不足${num(shortage)}×0.20`});
  const c=wchoice(rows);
  return{player:c.p,gap:c.p.id==='__coverage_gap__',detail:rows.map(r=>`${nameSpan(team.name,r.p.name)}:${r.formula}=重み${num(r.w)}`).join(' / ')};
}
function mainBlocker(t,att){const f=effectiveFrontPlayers(t);if(att.role==='MB')return f[1]||f[0];if(att.role==='OP')return f[0]||f[1];return f[2]||f[1]||f[0];}
function effectiveSetterForAttack(t){return t?.players?.[t?._nextSetterOverrideId]||t?.players?.[t?.setter]||null;}
function estAttack(t,p,q){const setter=effectiveSetterForAttack(t);return eff(t,p,'spikePower')*moodMod(p)*.75+eff(t,p,'jump')*.375+heightPoint(p.height)*.375+eff(t,setter,'tossAccuracy')*.2+cutBonus(q);} function estBlock(t,att,oneBlock=false){const b=mainBlocker(t,att);return eff(t,b,'blockStuff')*moodMod(b)+eff(t,b,'jump')*.25+heightPoint(b.height)*.25;}

// v138: 配球指示は2人まで。配列の先頭ほど優先度が高い。
const TOSS_TARGET_WEIGHTS=[2, 1.5];
function normalizeTossTargetIds(value){
  const arr=Array.isArray(value)?value:(value?[value]:[]);
  const out=[];
  arr.forEach(id=>{if(id && !out.includes(id) && out.length<2)out.push(id);});
  return out;
}
function sessionTossTargetIds(sess){
  return normalizeTossTargetIds(sess?.tossTargetIds!==undefined?sess.tossTargetIds:sess?.tossTargetId);
}
function activeTossTargetIds(team){
  // v73: 相手校にも配球方針を持たせる。
  // v138: 自チームは2人まで指定でき、①が最優先。
  if(team && !isOwnTeamName(team.name)){
    const pid=team.preferredAttackerId || '';
    return pid && team.players?.[pid] && pid!==team.setter ? [pid] : [];
  }
  if(!team || !isOwnTeamName(team.name))return [];
  // v151: 「結果を見る」は観戦セッションを作らないため、これまで配球指示が無視されていた。
  const src=(watchMatchSession && !watchMatchSession.done)
    ? sessionTossTargetIds(watchMatchSession)
    : normalizeTossTargetIds(state.matchTossTargetIds||state.matchTossTargetId||'');
  return src.filter(id=>team.players?.[id] && id!==team.setter);
}
function normalizeBlockTargetRole(value){
  return ['OH','MB','OP'].includes(value)?value:'';
}
function blockTargetRoleLabel(role){
  return ({OH:'OH警戒',MB:'MB警戒',OP:'OP警戒'})[role]||'指示なし';
}
function activeBlockTargetId(defTeam){
  if(!defTeam || !isOwnTeamName(defTeam.name))return '';
  // v151: 「結果を見る」は観戦セッションを作らないため、これまでブロック指示が無視されていた。
  if(watchMatchSession && !watchMatchSession.done)return normalizeBlockTargetRole(watchMatchSession.blockTargetId||state.matchBlockTargetId||'');
  return normalizeBlockTargetRole(state.matchBlockTargetId||'');
}
function blockTacticMultiplier(defTeam, attacker){
  const targetRole=activeBlockTargetId(defTeam);
  if(!targetRole || !attacker)return {mult:1,note:''};
  if(attacker.role===targetRole)return {mult:1.25,note:`ブロック指示：${blockTargetRoleLabel(targetRole)} 対象ポジションへのブロック値×1.25`};
  return {mult:0.80,note:`ブロック指示：${blockTargetRoleLabel(targetRole)} 対象外へのブロック値×0.80`};
}

function secondBlockParticipationRate(defTeam, blocker, attackTeam, q, kind='normal'){
  const blockRead=eff(defTeam,blocker,'blockRead');
  const setter=(attackTeam===currentAttackTeam&&currentAttackSetterId&&attackTeam?.players?.[currentAttackSetterId])?attackTeam.players[currentAttackSetterId]:effectiveSetterForAttack(attackTeam);
  const tossRead=(q==='崩れ'||!setter)?0:eff(attackTeam,setter,'tossRead')*moodMod(setter);
  // v152: クイックはセッターのトス読みによる減算を2倍にして、2枚目ブロッカーを遅らせる。
  const tossReadCoef=(kind==='quick')?0.02:0.01;
  return clamp(0.40+blockRead*0.01-tossRead*tossReadCoef,0.05,0.95);
}
function estBlockForChoice(t,att,q,attackTeam=null){
  const b=mainBlocker(t,att);
  let value=(eff(t,b,'blockStuff')*moodMod(b)*.75+eff(t,b,'jump')*.375)*0.9+heightPoint(b.height)*.375;
  if(!shouldOneBlock(q,att)){
    const n=effectiveFrontPlayers(t).filter(p=>p.id!==b.id).sort((a,b)=>eff(t,b,'blockRead')-eff(t,a,'blockRead'))[0];
    if(n)value+=((eff(t,n,'blockStuff')*moodMod(n)*.75+eff(t,n,'jump')*.375)*0.9+heightPoint(n.height)*.375)*secondBlockParticipationRate(t,n,attackTeam,q);
  }
  return value;
}
// ===== v152: 特殊攻撃（クイック／ブロード／バックアタック）=====
// 攻撃計算式そのものは維持し、種類ごとに「スパイク決定力部分」「ブロック参加・貢献」
// 「失敗率」「発動条件」だけを変える。ジャンプ・身長・トス正確性・カット補正・調子・乱数は共通。
const SPECIAL_ATTACK_LABELS={quick:'クイック',broad:'ブロード',back:'バックアタック'};
// クイックはポジションごとに呼び方が変わる
function quickAttackName(role){
  return role==='OH'?'平行攻撃':role==='OP'?'Cクイック':'Aクイック';
}
function specialAttackNameOf(kind,player){
  if(kind==='quick')return quickAttackName(player?.role);
  return SPECIAL_ATTACK_LABELS[kind]||'';
}
// 崩れでも実行できるのはバックアタックのみ。その場合のカット補正はBカット相当。
function effectiveCutQualityFor(kind,q){
  return (kind==='back' && q==='崩れ') ? 'B' : q;
}
function specialAttackCandidates(t,q){
  const setter=effectiveSetterForAttack(t);
  if(!setter)return [];
  const toss=eff(t,setter,'tossAccuracy');
  const fronts=effectiveFrontPlayers(t).filter(p=>p&&p.id!==setter.id);
  const backs=courtBackPlayers(t).filter(p=>p&&p.id!==setter.id&&p.id!==t.libero);
  const out=[];
  const cutOk=(q==='A'||q==='B');
  // クイック：前衛、セッターのトス正確性C以上(13)、Bカット以上
  if(cutOk && toss>=13){
    fronts.forEach(p=>out.push({kind:'quick',player:p}));
  }
  // ブロード：前衛のMB・OP、トス正確性B以上(16)、Bカット以上、本人のコース打ちB以上(16)
  if(cutOk && toss>=16){
    fronts.filter(p=>['MB','OP'].includes(p.role) && eff(t,p,'spikeControl')>=16)
      .forEach(p=>out.push({kind:'broad',player:p}));
  }
  // バックアタック：後衛のOH・OP、トス正確性C以上(13)、本人のジャンプB以上(16)。崩れでも可。
  if(toss>=13){
    const cands=backs.filter(p=>['OH','OP'].includes(p.role) && eff(t,p,'jump')>=16);
    if(cands.length){
      cands.sort((a,b)=>{
        const d=(eff(t,b,'spikePower')+eff(t,b,'jump'))-(eff(t,a,'spikePower')+eff(t,a,'jump'));
        if(Math.abs(d)>1e-9)return d;
        const sc=eff(t,b,'spikeControl')-eff(t,a,'spikeControl'); if(sc)return sc;
        const mt=eff(t,b,'mental')-eff(t,a,'mental'); if(mt)return mt;
        return Math.random()<0.5?-1:1;
      });
      out.push({kind:'back',player:cands[0]});
    }
  }
  return out;
}
// 通常攻撃カテゴリ：特殊攻撃カテゴリ＝2：1。カテゴリ単位で抽選する。
const SPECIAL_ATTACK_CATEGORY_WEIGHT=1, NORMAL_ATTACK_CATEGORY_WEIGHT=2;
// ブロック計算側へ現在の攻撃種類を渡す。ラリーごとに attackCalc の直前で設定する。
let currentAttackKind='normal';
// 特殊攻撃の失敗率倍率。クイックとブロードは1.5倍、バックアタックは通常どおり。
function specialAttackMissMultiplier(kind){
  return (kind==='quick'||kind==='broad')?1.5:1;
}
function chooseAttacker(t,q,opp){
  const setter=effectiveSetterForAttack(t),read=eff(t,setter,'tossRead'),targetIds=activeTossTargetIds(t);
  const rows=effectiveFrontPlayers(t).filter(p=>p.id!==setter?.id).map(p=>{const a=estAttack(t,p,q),b=estBlockForChoice(opp,p,q,t);return{p,a,b,g:a-b};});
  const best=Math.max(...rows.map(r=>r.g));
  let readBoost=hasSpecial(setter,'読みのセッター')?1.2:1;if(hasSpecial(setter,'司令塔'))readBoost*=1.5;
  const weighted=rows.map(r=>{const bonus=r.g===best?((q==='A'?read*2:q==='B'?read:0)*readBoost):0;let w=Math.max(1,r.a+bonus);const di=targetIds.indexOf(r.p.id);const mul=di>=0?TOSS_TARGET_WEIGHTS[di]:1;if(di>=0)w*=mul;return{p:r.p,w,txt:`${nameSpan(t.name,r.p.name)}:攻${num(r.a)}-ブ${num(r.b)}=差${num(r.g)} 読補${num(bonus)}${hasSpecial(setter,'司令塔')?'（司令塔）':''}${di>=0?` 配球指示${di===0?'①':'②'}×${mul}`:''} 重み${num(w)}`};});
  const c=wchoice(weighted);
  const normal={player:c.p,kind:'normal',detail:weighted.map(x=>x.txt).join(' / ')};
  // v152: 通常攻撃カテゴリ2 : 特殊攻撃カテゴリ1 でカテゴリを抽選する。
  //        特殊攻撃カテゴリが出ても候補が1人もいなければ通常攻撃へ戻す（抽選失敗にはしない）。
  const specials=specialAttackCandidates(t,q);
  const pickSpecial=specials.length &&
    Math.random() < SPECIAL_ATTACK_CATEGORY_WEIGHT/(SPECIAL_ATTACK_CATEGORY_WEIGHT+NORMAL_ATTACK_CATEGORY_WEIGHT);
  if(!pickSpecial)return normal;
  const sp=randomChoice(specials);
  return {player:sp.player,kind:sp.kind,
    detail:normal.detail+` / 攻撃カテゴリ抽選：特殊攻撃（${specialAttackNameOf(sp.kind,sp.player)}）を選択`};
}
function currentOmikujiLuckBonus(){
  return state.omikujiLuckYear===state.year ? Number(state.omikujiLuckBonus||0) : 0;
}
function currentOmikujiResultName(){
  return state.omikujiLuckYear===state.year ? (state.omikujiResultName||'') : '';
}
function currentOmikujiText(){
  return state.omikujiLuckYear===state.year ? (state.omikujiText||'') : '';
}
function omikujiBonusText(v){
  const n=Number(v||0);
  const sign=n>0?'+':n<0?'-':'±';
  return `${sign}${Math.round(Math.abs(n)*100)}%`;
}
function newLuckBalance(oppName='東峰女学院'){
  const own=ownSchoolName();return {[own]:0,[oppName]:0,_ownName:own,_oppName:oppName,_omikujiBonus:currentOmikujiLuckBonus(),_omikujiResult:currentOmikujiResultName(),_omikujiText:currentOmikujiText()};
}
function teamHasSpecial(team, special){return !!(team&&team.players&&Object.values(team.players).some(p=>hasSpecial(p,special)));}

function applyMoodMakerBias(team, player, luck){
  if(luck&&team&&player&&hasSpecial(player,'ムードメーカー'))luck[team.name]=(luck[team.name]||0)+0.03;
}
function intimidatedUpperBound(teamName,b,luck){
  if(!luck||b<=1)return b;
  const own=luck._ownName||ownSchoolName();
  const otherName=teamName===own?(luck._oppName||'東峰女学院'):own;
  const otherTeam=luck._teamByName?.[otherName];
  return teamHasSpecial(otherTeam,'威圧感')?Math.min(b, b-0.10):b;
}
function benchCheerUpperBound(teamName, upper){
  return isOwnTeamName(teamName) && ownBenchCheerActiveForMatch() ? upper+0.10 : upper;
}
function fairRand(teamName, a, b, luck){
  const upper=benchCheerUpperBound(teamName,intimidatedUpperBound(teamName,b,luck));
  const raw=rand(a,upper);
  if(!luck)return raw;
  const own=luck._ownName||ownSchoolName();const other=teamName===own?(luck._oppName||'東峰女学院'):own;
  const diff=(luck[teamName]||0)-(luck[other]||0);
  let adjusted=raw;

  // ランダム補正累計＝各ランダム補正から100%を引いた値を加算したもの。
  // 相手と2以上離れたら高い側-10%／低い側+10%、3以上離れたら高い側-20%／低い側+20%。
  if(diff>=3) adjusted-=0.20;
  else if(diff>=2) adjusted-=0.10;
  else if(diff<=-3) adjusted+=0.20;
  else if(diff<=-2) adjusted+=0.10;

  const bonus=Number(luck._omikujiBonus||0);
  if(bonus){
    adjusted += teamName===(luck._ownName||ownSchoolName()) ? bonus : -bonus;
  }
  adjusted=clamp(adjusted,a,upper);
  luck[teamName]=(luck[teamName]||0)+(adjusted-1);
  return adjusted;
}

function attackHandMultiplier(p){
  if(!p)return 1;
  if(p.role==='OH' && p.hand==='左')return 0.90;
  if(p.role==='OP' && p.hand!=='左' && !hasSpecial(p,'ライト〇'))return 0.90;
  return 1;
}
function attackHandNote(p){
  const mult=attackHandMultiplier(p);
  if(mult===1)return '';
  if(p.role==='OH' && p.hand==='左')return ' / OH左利き補正×0.90';
  if(p.role==='OP' && p.hand!=='左')return ' / OP右利き補正×0.90';
  return ` / 利き手補正×${num(mult,2)}`;
}
function twoAttackHandMultiplier(p){
  let m=1;
  if(p?.hand==='左')m*=1.05;
  if(hasSpecial(p,'ツーアタック'))m*=1.05;
  return m;
}
function twoAttackHandNote(p){
  const notes=[];
  if(p?.hand==='左')notes.push('左利きツーアタック補正×1.05');
  if(hasSpecial(p,'ツーアタック'))notes.push('特殊能力ツーアタック×1.05');
  return notes.length?' / '+notes.join(' / '):'';
}
function attackSpecialNote(p,q){
  const notes=[];
  if(hasSpecial(p,'悪球打ち')&&(q==='B'||q==='崩れ'))notes.push('悪球打ち×1.10');
  if(hasSpecial(p,'ドライブ回転'))notes.push('ドライブ回転×1.05');
  return notes.length?' / '+notes.join(' / '):'';
}
function aceAuraMultiplier(player, team=null){
  if(!hasSpecial(player,'エースの風格'))return 1;
  if(!team || !currentRallyScore)return 1;
  const ownSide=isOwnTeamName(team.name);
  const teamScore=ownSide?currentRallyScore.own:currentRallyScore.opp;
  const oppScore=ownSide?currentRallyScore.opp:currentRallyScore.own;
  return teamScore<oppScore ? 1.20 : 1;
}
function aceAuraNote(player, team=null){
  return aceAuraMultiplier(player,team)>1 ? ' / エースの風格×1.20' : '';
}
function setterTossAddMultiplier(team){
  const setter=team?.players?.[team.setter];
  return hasSpecial(setter,'絶対指揮官') ? 1.5 : 1;
}
function setterTossAddNote(team){
  return setterTossAddMultiplier(team)>1 ? ' / 絶対指揮官：トス加算×1.5' : '';
}
function rightWingCannonMultiplier(p,q){
  if(!hasSpecial(p,'右翼砲台') || p?.role!=='OP')return 1;
  return 1.15*(q==='A'?1.05:1);
}

function attackCalc(t,p,q,luck=null,kind='normal'){
  applyMoodMakerBias(t,p,luck);
  const r=fairRand(t.name,.85,1.15,luck);
  const handMult=attackHandMultiplier(p);
  // v152: 直前にレセプションまたはディグを担当していた選手は攻撃が鈍る。
  //        通常攻撃はこれまでどおりレセプション担当のみ0.90倍。特殊攻撃はディグ担当も対象にし、
  //        両方を担当していても重複させず最大1回だけ0.90倍にする。
  const didReceive=!!(t._lastReceiverId&&t._lastReceiverId===p.id);
  const didDig=!!(t._lastDiggerId&&t._lastDiggerId===p.id);
  const receiveFatigue=(didReceive||(kind!=='normal'&&didDig))?0.90:1;
  const setter=effectiveSetterForAttack(t);
  currentAttackSetterId=setter?.id||t?.setter||null;
  const cq=effectiveCutQualityFor(kind,q);
  let sp=eff(t,p,'spikePower')*moodMod(p)*clutchMultiplier(p,t)*handMult*receiveFatigue,jp=eff(t,p,'jump'),h=heightPoint(p.height),to=eff(t,setter,'tossAccuracy')*moodMod(setter),cb=cutBonus(cq);
  // 特殊攻撃ごとの「スパイク決定力部分」の置き換え
  let spBaseLabel='決定';
  let quickDecay=0;
  if(kind==='quick'){
    quickDecay=(25-eff(t,p,'spikeControl'))+(25-eff(t,setter,'tossAccuracy'));
    sp*=Math.max(0,1-quickDecay/100);
  }else if(kind==='broad'){
    // 決定力ではなくコース打ちを参照する
    sp=eff(t,p,'spikeControl')*moodMod(p)*clutchMultiplier(p,t)*handMult*receiveFatigue;
    spBaseLabel='コース打ち';
  }else if(kind==='back'){
    sp*=0.90;
  }
  let specialMult=1;
  specialMult*=aceAuraMultiplier(p,t);
  specialMult*=rightWingCannonMultiplier(p,q);
  if(kind==='quick'&&hasSpecial(p,'クイック職人'))specialMult*=1.12;
  if(q==='崩れ'&&setterHas(t,'二段トス適性'))cb+=3;
  if(q==='崩れ'&&hasSpecial(p,'二段トス'))cb+=1;
  const tossAddMult=setterTossAddMultiplier(t);
  const result={value:((sp*.75+jp*.375)*specialMult)*r+(h*.375)+to*.2*tossAddMult+cb,sp,jp,h,to,cb,r,specialMult,handMult,tossAddMult,receiveFatigue,setterName:setter?.name||'',
    kind,spBaseLabel,quickDecay,cutQuality:cq,attackName:specialAttackNameOf(kind,p)};
  // 「直後の初回アタック」だけに受け手疲労・OP代替セットを適用。
  t._lastReceiverId=null;
  t._lastDiggerId=null;
  t._nextSetterOverrideId=null;
  return result;
} function specialBlockOverride(defTeam,att,q){
  if(q==='崩れ'||!att)return {main:null,noSecond:false,note:''};
  const front=effectiveFrontPlayers(defTeam);
  if(att.role==='MB' && hasSpecial(att,'Bクイック') && Math.random()<0.10){
    const left=front[0]||mainBlocker(defTeam,att);
    return {main:left,noSecond:true,note:'Bクイック発動：相手レフトブロッカーのみ'};
  }
  if(att.role==='OP' && hasSpecial(att,'ブロード') && Math.random()<0.10){
    return {main:null,noSecond:true,note:'ブロード発動：センターブロックの応援をキャンセル'};
  }
  return {main:null,noSecond:false,note:''};
}
function ironWallMiddleMultiplier(p){
  return hasSpecial(p,'鉄壁の中央') && p?.role==='MB' ? 1.18 : 1;
}
function ironWallMiddleSupportMultiplier(p){
  return hasSpecial(p,'鉄壁の中央') && p?.role==='MB' ? 1.08 : 1;
}
function blockCalc(t,att,oneBlock=false,luck=null){
  const f=effectiveFrontPlayers(t);
  const specialOverride=specialBlockOverride(t,att,currentAttackQuality||'');
  // v152: ブロードは正面が相手レフト側前衛、2枚目が相手MBで、2枚目のブロック値は半減する。
  const broadAttack=(currentAttackKind==='broad');
  const main=broadAttack?(f[0]||specialOverride.main||mainBlocker(t,att)):(specialOverride.main||mainBlocker(t,att));
  const neigh=broadAttack
    ? (f.filter(p=>p.id!==main.id&&p.role==='MB')[0]||f.filter(p=>p.id!==main.id).sort((a,b)=>eff(t,b,'blockRead')-eff(t,a,'blockRead'))[0])
    : f.filter(p=>p.id!==main.id).sort((a,b)=>eff(t,b,'blockRead')-eff(t,a,'blockRead'))[0];
  const broadNeighMult=broadAttack?0.50:1;
  applyMoodMakerBias(t,main,luck);
  const mr=fairRand(t.name,.85,1.15,luck);
  const aceBoost=(isAceAttacker(currentAttackTeam,att)&&(hasSpecial(main,'対エースブロック')||hasSpecial(neigh,'対エースブロック')))?1.10:1;
  const quickAttack=(currentAttackKind==='quick');
  const mainQuickBoost=(quickAttack&&hasSpecial(main,'対速攻〇'))?1.10:1;
  const fastTossNoSecond=!!(setterHas(currentAttackTeam,'高速トス') && ['OH','OP'].includes(att?.role) && Math.random()<0.20);
  const absoluteCommanderNoSecond=!!(setterHas(currentAttackTeam,'絶対指揮官') && Math.random()<0.30);
  const specialNoSecond=!!specialOverride.noSecond;
  const blockTactic=blockTacticMultiplier(t,att);
  const mainIron=ironWallMiddleMultiplier(main);const mainBase=eff(t,main,'blockStuff')*moodMod(main)*aceBoost*mainQuickBoost*mainIron,mainJump=eff(t,main,'jump'),mainHeight=heightPoint(main.height);
  const mv=(((mainBase*.75+mainJump*.375)*0.9)*mr+mainHeight*.375)*blockTactic.mult;
  let nv=0,nr=0,rate=0,neighBase=0,neighJump=0,neighHeight=0,neighQuickBoost=1;
  if(neigh&&!oneBlock&&!fastTossNoSecond&&!absoluteCommanderNoSecond&&!specialNoSecond){
    applyMoodMakerBias(t,neigh,luck);
    nr=fairRand(t.name,.85,1.15,luck);rate=secondBlockParticipationRate(t,neigh,currentAttackTeam,currentAttackQuality||'崩れ',currentAttackKind);
    const neighAce=hasSpecial(neigh,'対エースブロック')&&isAceAttacker(currentAttackTeam,att)?1.10:1;
    neighQuickBoost=(quickAttack&&hasSpecial(neigh,'対速攻〇'))?1.10:1;
    const neighIron=ironWallMiddleSupportMultiplier(neigh);neighBase=eff(t,neigh,'blockStuff')*moodMod(neigh)*neighAce*neighQuickBoost*neighIron;neighJump=eff(t,neigh,'jump');neighHeight=heightPoint(neigh.height);
    nv=(((neighBase*.75+neighJump*.375)*0.9)*nr+neighHeight*.375)*rate*blockTactic.mult*broadNeighMult;
  }
  const quickBlockNote=(mainQuickBoost>1||neighQuickBoost>1)?'対速攻〇発動！！ 速攻に合わせて跳んだ。':'';const ironWallNote=(mainIron>1|| (typeof neighIron!=='undefined'&&neighIron>1))?'鉄壁の中央発動':'';
  return{value:mv+nv,broadNeighMult,main,neigh:(oneBlock||fastTossNoSecond||absoluteCommanderNoSecond||specialNoSecond)?null:neigh,mv,nv,mr,nr,rate,mainBase,mainJump,mainHeight,neighBase,neighJump,neighHeight,oneBlock,aceBoost,fastTossNoSecond,absoluteCommanderNoSecond,specialNoSecond,specialBlockNote:specialOverride.note,blockTacticNote:blockTactic.note,blockTacticMult:blockTactic.mult,mainQuickBoost,neighQuickBoost,quickBlockNote,ironWallNote};
} function chooseDigger(t,ctrl,complete,attacker=null){
  const backs=courtBackPlayers(t);
  if(!backs.length)return{player:Object.values(t.players)[0],detail:'後衛なし'};
  const low=backs.reduce((m,p)=>eff(t,p,'recDig')<eff(t,m,'recDig')?p:m,backs[0]);
  let totalCoverage=0;
  const rows=backs.map(p=>{
    let base,formula;
    if(p.id===t.libero){
      const wide=hasSpecial(p,'広い守備範囲')?1.3:1;
      const domain=guardianDomainRangeMultiplier(p,null,'ディグ守備範囲');
      base=getVal(p,'recRange')*2*wide*domain;
      formula=`リベロ範囲${getVal(p,'recRange')}×2${wide>1?'×広い守備範囲':''}${domain>1?'×絶対守護領域':''}`;
    }else{
      const wide=hasSpecial(p,'広い守備範囲')?1.3:1;
      const domain=guardianDomainRangeMultiplier(p,null,'ディグ守備範囲');
      base=getVal(p,'recRange')*wide*domain;
      formula=`後衛範囲${getVal(p,'recRange')}${wide>1?'×広い守備範囲':''}${domain>1?'×絶対守護領域':''}`;
    }
    totalCoverage+=Math.max(0,base);
    let w=Math.max(.01,base);
    if(!complete && p.id===low.id){
      const sniper=attacker&&hasSpecial(attacker,'狙い撃ち')?1.5:1;
      w+=Math.max(0,ctrl)*sniper;
      formula+=`+コース打ち${num(ctrl)}${sniper>1?'×狙い撃ち':''}`;
    }
    if(complete && p.id!==low.id)w=.01;
    return{p,w,formula};
  });
  const shortage=Math.max(0,100-totalCoverage);
  const gapWeight=shortage*.20;
  if(gapWeight>0)rows.push({p:coverageGapPlayer('守備の間'),w:gapWeight,formula:`カバー不足${num(shortage)}×0.20`});
  const c=wchoice(rows);
  if(c.p.id!=='__coverage_gap__' && c.p.id===t.setter){
    const op=Object.values(t.players||{}).find(p=>p.role==='OP');
    if(op)t._nextSetterOverrideId=op.id;
  }else if(c.p.id!=='__coverage_gap__'){
    t._nextSetterOverrideId=null;
  }
  return{player:c.p,gap:c.p.id==='__coverage_gap__',detail:rows.map(r=>`${nameSpan(t.name,r.p.name)}:${r.formula}=重み${num(r.w)}`).join(' / ')};
}
function practiceMatchActive(){
  return !!(state.practiceMatch && state.practiceMatch.opponent && !state.practiceMatch.done);
}
function practiceOpponentConfigsByClass(cls){
  const map={
    '新設校':[
      {id:'prac_aoba',name:'青葉実業高校',basePower:5,delta:-6,style:'balanced_low'},
      {id:'prac_midorikawa',name:'緑川学園',basePower:5,delta:-6,style:'balanced_low'}
    ],
    '弱小校':[
      {id:'prac_aoba_w',name:'青葉実業高校',basePower:6,delta:-5,style:'balanced_low'},
      {id:'prac_midorikawa_w',name:'緑川学園',basePower:6,delta:-5,style:'balanced_low'}
    ],
    '中堅校':[
      {id:'prac_shiramine',name:'白峰女子学院',basePower:8,delta:-2},
      {id:'prac_asahi',name:'朝日ヶ丘女子高校',basePower:8,delta:-2,style:'receive_mid'}
    ],
    '全国大会出場校':[
      {id:'prac_toho',name:'東峰女学院',basePower:11,delta:0},
      {id:'prac_kurobane',name:'黒羽学園',basePower:11,delta:0,style:'ace_mid'}
    ]
  };
  // v174: 強豪校・名門校の練習相手は content-national.js（有料版）で登録する。
  if(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.practiceOpponents)Object.assign(map,GVB_NATIONAL.practiceOpponents);
  return map[cls]||map['弱小校'];
}
function buildOpponentFromConfig(cfg,tour=null){
  const opp=JSON.parse(JSON.stringify(opponentTemplate));
  opp.name=cfg.name;
  opp.basePower=cfg.basePower;
  const delta=cfg.delta||0;
  if(delta!==0){
    for(const p of Object.values(opp.players)){
      for(const k of ['spikePower','spikeControl','recReception','recDig','recRange','blockRead','blockStuff','servePower','serveControl','tossAccuracy','tossRead','jump','stamina','mental']){
        if(typeof p[k]==='number')p[k]=clamp(p[k]+delta,1,25);
      }
      if(typeof p.height==='number')p.height=clamp(p.height+Math.max(0,delta),150,185);
    }
  }
  applyOpponentStyle(opp,cfg.style);
  if(tour)applyDistrictOpponentPreset(opp,tour);
  if(cfg.elite){
    const ace=opp.players.sawamura, mb=opp.players.mabuchi, setter=opp.players.tsudaka, libero=opp.players.mizuharaL;
    if(ace){ace.spikePower=25;ace.spikeControl=23;ace.jump=23;ace.servePower=23;}
    if(mb){mb.blockStuff=25;mb.blockRead=23;mb.height=Math.max(mb.height,182);}
    if(setter){setter.tossAccuracy=25;setter.tossRead=24;setter.mental=23;}
    if(libero){libero.recReception=25;libero.recDig=24;libero.recRange=24;}
  }
  if(tour)applyOpponentAbilityCap(opp,tour);
  return applyOpponentSchoolNames(opp);
}
function createPracticeOpponent(){
  const cur=schoolClassIndex(state.schoolClass||'弱小校');
  const valid=SCHOOL_CLASS_ORDER.map((cls,idx)=>({cls,idx})).filter(x=>cur<0 || Math.abs(x.idx-cur)<=1);
  const cls=randomChoice(valid.length?valid:SCHOOL_CLASS_ORDER.map((cls,idx)=>({cls,idx}))).cls;
  const cfg=randomChoice(practiceOpponentConfigsByClass(cls));
  const opp=buildOpponentFromConfig(cfg,null);
  opp.practiceClass=cls;
  return opp;
}
function practiceMatchOfferHtml(){
  return `<div class="event-choice-box">
    <div class="event-choice-title">練習試合の誘いを受けますか？</div>
    <div class="event-choice-actions">
      <button class="primary small" type="button" onclick="resolvePracticeMatchOffer(true)">受ける</button>
      <button class="ghost small" type="button" onclick="resolvePracticeMatchOffer(false)">断る</button>
    </div>
  </div>`;
}
// v151: 「受ける」「断る」のどちらを押しても finishEventChoiceUI を呼んでいなかったため、
//        選択欄が残ったまま閉じるボタンも戻らず、モーダルから抜けられなくなっていた。
//        受けた場合のタブ移動も、ポップアップを閉じてから行う。
function resolvePracticeMatchOffer(accept){
  const c=document.querySelector('#growthModalContent .popup-scroll-body') || document.getElementById('growthModalContent');
  if(!accept){
    state.eventPracticeMatchOffer=false;
    const msg='練習試合の誘いを見送りました。';
    state.trainingLog.push(msg);
    if(c){c.innerHTML += `<div class="growth-item">${msg}</div>`;}
    managerSay('今回は練習試合を見送ります。');
    finishEventChoiceUI();
    saveState();
    renderAll();
    return;
  }
  const opp=createPracticeOpponent();
  setPracticeMatch(opp);
  state.eventPracticeMatchOffer=false;
  const msg=`練習試合を受けました。相手は${opp.name}（${opp.practiceClass}相当）です。試合画面で実施できます。`;
  state.trainingLog.push(msg);
  if(c){c.innerHTML += `<div class="growth-item">${msg}</div>`;}
  managerSay(`${opp.name}との練習試合が入りました。試合画面で実施できます。`);
  finishEventChoiceUI();
  renderAll();
  saveState();
}
if(typeof window!=='undefined')window.resolvePracticeMatchOffer=resolvePracticeMatchOffer;


function opponentClassByBasePower(bp){
  if(bp<=8)return '弱小校';
  if(bp<=10)return '中堅校';
  if(bp<=12)return '全国大会出場校';
  if(bp<=14)return '強豪校';
  return '名門校';
}
function classGapMultiplier(opp){
  const ownIdx=schoolClassIndex(state.schoolClass||'弱小校');
  const oppCls=opponentClassByBasePower(opp.basePower||10);
  const oppIdx=schoolClassIndex(oppCls);
  const gap=oppIdx-ownIdx;
  if(gap>=2)return {label:`格上（${oppCls}）`,mult:1.50,gap};
  if(gap===1)return {label:`やや格上（${oppCls}）`,mult:1.25,gap};
  if(gap===0)return {label:`同格（${oppCls}）`,mult:1.00,gap};
  if(gap===-1)return {label:`やや格下（${oppCls}）`,mult:.85,gap};
  return {label:`格下（${oppCls}）`,mult:.70,gap};
}
function resultMultiplier(os,ps,gap=0){
  const diff=os-ps;
  const win=diff>0;
  if(win && ps<=12){
    if(gap<=-2)return {label:'圧勝（格下）',mult:.35};
    return {label:'圧勝',mult:.90};
  }
  if(win && diff>=8){
    if(gap<=-2)return {label:'完勝（格下）',mult:.80};
    return {label:'完勝',mult:1.15};
  }
  if(win){
    if(gap<=-2)return {label:'勝利（格下）',mult:.80};
    return {label:'勝利',mult:1.10};
  }
  if(diff<=-12)return {label:'完敗',mult:1.25};
  if(diff<=-7)return {label:'大敗',mult:1.18};
  if(gap>=1&&diff>=-6)return {label:'善戦（格上から学んだ）',mult:1.20};
  if(diff>=-3)return {label:'惜敗',mult:1.20};
  return {label:'敗戦',mult:1.10};
}
function matchXpNarrative(gap,res,base,mult){
  return `経験補正：${gap.label} / ${res.label} / 基礎${num(base,1)} → ×${num(mult,2)}`;
}
function addMatchXpToPlayer(player,key,xp,logs){
  if(!player||!player.comps||!player.comps[key])return;
  const before=player.comps[key];
  const up=addXp(player,key,xp);
  const after=player.comps[key];
  if(up)logs.push(`${nameSpan('若葉高校',player.name)}：${compLabel(key)} <span class="level-up">${abilityChangeHtml(before,after,key)}</span>`);
}
function ownPlayerByName(name){
  return state.players.find(p=>p.name===name);
}
// v147: ベンチ入りしていた選手にも経験点を配る。
// 「期待している1年生をベンチに置いて試合を見せる」という選択に意味を持たせるため。
// 出場選手1人あたりの平均に対する割合で決めるので、大会の格や勝敗の補正は自動的に効く。
const BENCH_XP_RATIO=0.30;
// 身長は能力ではないので対象外。ジャンプ力は見ているだけでは伸びないので除く。
const BENCH_XP_EXCLUDED_KEYS=['jump'];
// v148: ポジション別の傾斜は廃止し、対象の能力へ均等に配分する。
function benchXpKeys(){
  return COMP_KEYS.filter(k=>!BENCH_XP_EXCLUDED_KEYS.includes(k));
}
function applyBenchExperience(perPlayerAvg,playedIds,xpLogs){
  if(!(perPlayerAvg>0))return [];
  const played=new Set(playedIds||[]);
  const bench=(state.benchIds||[])
    .map(id=>state.players.find(p=>p.id===id))
    .filter(p=>p&&!played.has(p.id)&&!isPlayerAbsent(p));
  const names=[];
  const keys=benchXpKeys();
  for(const p of bench){
    const budget=perPlayerAvg*BENCH_XP_RATIO;
    for(const k of keys){
      let xp=Math.round(budget/keys.length);
      if(xp<=0)continue;
      xp=applyTalentXp(p,k,xp,'match');
      if(hasSpecial(p,'分析家'))xp=Math.max(1,Math.round(xp*1.5));
      addMatchXpToPlayer(p,k,xp,xpLogs);
    }
    names.push(p.name);
  }
  return names;
}
function applyMatchExperience(stats,opp,os,ps,log,tour=null){
  const gap=classGapMultiplier(opp),res=resultMultiplier(os,ps,gap.gap);
  const isPrefTournament=tour && (tour.type==='interhigh_pref'||tour.type==='haruko_pref');
  // v207: U-18日本代表との強化試合は×4.0、OG特別試合は×5.0（Tak指示）。
  //        通常の練習試合は従来どおり×3.0のまま。地区大会は×1.5、全国大会は×3.0。
  const base=(opp&&opp.isOgAllStar)?5.0
            :(opp&&opp.isU18AllStar)?4.0
            :(isPrefTournament?1.5:3.0);
  const mult=base*gap.mult*res.mult;
  const xpLogs=[];
  // v147: ベンチ配分の基準にするため、出場選手へ実際に配った経験点を集計する
  const grantedByPlayer={};
  const add=(playerName,key,raw)=>{
    const p=ownPlayerByName(playerName);
    if(!p)return;
    let xp=applyTalentXp(p,key,Math.max(1,Math.round(raw*mult)),'match');if(hasSpecial(p,'分析家'))xp=Math.max(1,Math.round(xp*1.5));addMatchXpToPlayer(p,key,xp,xpLogs);
    grantedByPlayer[p.id]=(grantedByPlayer[p.id]||0)+xp;
  };
  const ownActions=(action)=>Object.values(stats.actions[action]?.players||{}).filter(p=>isOwnTeamName(p.team));

  for(const p of ownActions('serve')){
    const r=p.results||{};
    const count=(r['成功']||0)+(r['ミス']||0)+(r['サービスエース']||0);
    if(count)add(p.name,'serveControl',count*3 + (r['成功']||0)*1 + (r['サービスエース']||0)*6);
    if(count)add(p.name,'servePower',(r['サービスエース']||0)*5 + count*1);
  }
  for(const p of ownActions('reception')){
    const r=p.results||{};
    add(p.name,'recReception',(r['Aカット']||0)*5+(r['Bカット']||0)*3+(r['崩れカット']||0)*2+(r['チャンス返球']||0)*1+(r['サービスエース']||0)*1);
  }
  for(const p of ownActions('toss')){
    const r=p.results||{};
    const count=Object.values(r).reduce((a,b)=>a+b,0);
    if(count){add(p.name,'tossAccuracy',(count*4+(r['Aトス']||0)*2)*0.5);add(p.name,'tossRead',(count*2)*0.5);}
  }
  // v152: 特殊攻撃の経験点は、総量を変えずにスパイク決定力の分をコース打ちへ振り替える。
  //        ブロードは決定力へ行く分を全量、クイックとバックアタックは40%を移す。
  const BROAD_XP_SHIFT=1.00, QUICK_BACK_XP_SHIFT=0.40;
  const kindRows=Object.values(stats.actions.attackKind?.players||{}).filter(p=>isOwnTeamName(p.team));
  const shiftRateByName={};
  for(const kr of kindRows){
    const k=kr.results||{};
    const tot=Object.values(k).reduce((a,b)=>a+b,0);
    if(!tot)continue;
    shiftRateByName[kr.name]=((k.broad||0)*BROAD_XP_SHIFT+((k.quick||0)+(k.back||0))*QUICK_BACK_XP_SHIFT)/tot;
  }
  for(const p of ownActions('spike')){
    const r=p.results||{};
    const count=Object.values(r).reduce((a,b)=>a+b,0);
    if(count){
      const powerXp=(r['得点']||0)*6+(r['ノータッチ']||0)*8+(r['継続']||0)*3+(r['ミス']||0)*1+(r['被シャット']||0)*1;
      const shift=clamp(shiftRateByName[p.name]||0,0,1);
      add(p.name,'spikePower',powerXp*(1-shift));
      add(p.name,'spikeControl',count*2+(r['継続']||0)*2-(r['ミス']||0)*1+powerXp*shift);
    }
  }
  for(const p of ownActions('block')){
    const r=p.results||{};
    const count=Object.values(r).reduce((a,b)=>a+b,0);
    if(count){add(p.name,'blockStuff',(r['クイック職人']||0)*7+(r['ワンタッチ']||0)*4+(r['通常突破']||0)*2+(r['完全突破']||0)*1);
      add(p.name,'blockRead',count*2+(r['クイック職人']||0)*2+(r['ワンタッチ']||0)*1);}
  }
  for(const p of ownActions('dig')){
    const r=p.results||{};
    add(p.name,'recDig',(r['A返球']||0)*6+(r['B返球']||0)*4+(r['崩れ']||0)*3+(r['失点']||0)*1);
    add(p.name,'recRange',((r['A返球']||0)+(r['B返球']||0)+(r['崩れ']||0)+(r['失点']||0))*1);
  }

  // v147: ベンチ入りしていた選手へ、出場選手1人あたり平均の30%を配る
  const grantedIds=Object.keys(grantedByPlayer);
  const perPlayerAvg=grantedIds.length
    ? grantedIds.reduce((a,id)=>a+grantedByPlayer[id],0)/grantedIds.length
    : 0;
  const benchNames=applyBenchExperience(perPlayerAvg,grantedIds,xpLogs);

  const growthLogs=sortGrowthItemsByTeamOrder(xpLogs);
  if(growthLogs.length){
    const growthDetails=growthLogs.map(x=>`<div class="event-detail-line">${x}</div>`).join('');
    const body=`<div class="event-tempo-card match-growth-event">
      <div class="event-tempo-head"><img class="event-tempo-face" src="${currentManagerPortrait()}" alt="マネージャー"><div><div class="growth-manager">${managerLine('試合後、選手に成長がありました。')}</div><div class="event-narration-text">${opp.name}戦で得た経験が、次の練習につながっています。<br>${matchXpNarrative(gap,res,base,mult)}${benchNames.length?`<br>ベンチから試合を見ていた ${benchNames.join('、')} にも、出場した選手の3割ほどの経験が入りました。`:''}</div></div></div>
      ${eventHiddenResultHtml(growthDetails,'結果を見る')}
    </div>`;
    enqueueImportantPopup('試合後の成長', body, 'growth');
  }
  managerSay(growthLogs.length?'試合後に能力が上昇した選手がいます。':'試合が終了しました。');
  state.eventOpponentScout=false;
  state.eventAceCounter=false;

}

function newMatchStats(){
  return {
    teams:{'若葉高校':{}},
    players:{},
    actions:{
      serve:{teams:{},players:{}},
      reception:{teams:{},players:{}},
      toss:{teams:{},players:{}},
      spike:{teams:{},players:{}},
      block:{teams:{},players:{}},
      dig:{teams:{},players:{}}
    }
  };
}
function addMatchStat(stats, team, player, reason){
  if(!stats.teams[team])stats.teams[team]={};
  stats.teams[team][reason]=(stats.teams[team][reason]||0)+1;
  const key=`${team}:${player||'不明'}`;
  if(!stats.players[key])stats.players[key]={team,name:player||'不明',reasons:{}};
  stats.players[key].reasons[reason]=(stats.players[key].reasons[reason]||0)+1;
}
function addActionStat(stats, action, team, player, result){
  if(!stats.actions[action])stats.actions[action]={teams:{},players:{}};
  const a=stats.actions[action];
  if(!a.teams[team])a.teams[team]={};
  a.teams[team][result]=(a.teams[team][result]||0)+1;
  const key=`${team}:${player||'不明'}`;
  if(!a.players[key])a.players[key]={team,name:player||'不明',results:{}};
  a.players[key].results[result]=(a.players[key].results[result]||0)+1;
}
// v152: 攻撃の種類を選手ごとに数える。試合後の経験点の配分先を決めるのに使う。
function addAttackKindStat(stats,team,player,kind){
  if(!stats||!stats.actions)return;
  addActionStat(stats,'attackKind',team,player,kind);
}
function statReasonHtml(obj){
  const order=['スパイク完全突破','スパイクノータッチ','スパイク得点','ブロックアウト','スパイクアウト','サーブミス','サービスエース','シャットアウト','長期ラリー攻撃勝ち','長期ラリー守備勝ち'];
  const keys=[...new Set([...order,...Object.keys(obj||{})])].filter(k=>(obj||{})[k]);
  if(!keys.length)return 'なし';
  return keys.map(k=>`${k}${obj[k]}回`).join(' / ');
}
function actionResultHtml(obj, order){
  const keys=[...new Set([...order,...Object.keys(obj||{})])].filter(k=>(obj||{})[k]);
  if(!keys.length)return 'なし';
  const total=keys.reduce((s,k)=>s+(obj[k]||0),0);
  return `合計${total}回（${keys.map(k=>`${k}${obj[k]}回`).join(' / ')}）`;
}
function actionSummaryHtml(title, actionObj, order){
  const teamHtml=Object.entries(actionObj.teams).map(([team,results])=>`<div class="match-stat-team"><strong>${team}</strong>：${actionResultHtml(results,order)}</div>`).join('');
  const playerHtml=Object.values(actionObj.players).sort((a,b)=>a.team.localeCompare(b.team)||a.name.localeCompare(b.name)).map(p=>`<div class="match-stat-player"><strong>${p.team} ${p.name}</strong>：${actionResultHtml(p.results,order)}</div>`).join('');
  return `<h4>${title}・チーム別</h4>${teamHtml}<h4>${title}・選手別</h4>${playerHtml||'なし'}`;
}




function statLabelHtml(key, fallbackText, variant='lineup'){
  const src=STAT_LABEL_ASSETS[key];
  if(src){
    return `<img class="stat-label-image ${variant}" src="${src}" alt="${fallbackText}">`;
  }
  return `<span class="stat-label-fallback ${variant}">${fallbackText}</span>`;
}

function statGradeLine(p){
  const year=p?.year?`${p.year}年`:'';
  return `<div class="lineup-meta-line">${year}${year?' / ':''}${handLabel(p)} / ${p.height}cm</div>`;
}
function opponentLineupAbilityLine(p){
  return `<div class="opponent-starter-grade-wrap">${starterMiniGradeLine(p)}</div>`;
}
function starterMiniGradeLine(p){
  const s=deriveStats(p);
  const items=[['spike','Sp',s.spike],['block','Bl',s.block],['jump','J',s.jump],['height','Ht',heightPoint(p.height)],['receive','Re',s.receive],['toss','To',s.toss],['serve','Sv',s.serve]];
  return `<div class="starter-mini-grades">${items.map(([key,l,v])=>`<div class="starter-mini-grade-item"><span class="starter-mini-label">${statLabelHtml(key,l,'starter')}</span><strong class="${rankClassFromValue(v)}">${ratingLetter(v)}</strong></div>`).join('')}</div>`;
}


function positionGradeBadgeHtml(p, className='position-grade-badge'){
  const score=calcPositionScore25(p,p.role);
  const grade=positionRatingLetter(score,p.role);
  return `<span class="${className} ${positionRankClass(score,p.role)}">${grade}</span>`;
}

function teamLineupHtml(team, showAbilities=false, side=''){
  const gridClass=showAbilities?'match-lineup-grid opponent-ability-grid':'match-lineup-grid';
  const cardClass=showAbilities?'match-lineup-card opponent-ability-card':'match-lineup-card';

  const lineupCardHtml=(p,i,isLibero=false)=>{
    if(!p)return '';
    const posLabel=isLibero?'リベロ':rotationPositionLabel(i,p.role);
    const extraClass=isLibero?' lineup-libero-card':'';
    // v179: カードを押すと選手の詳細（大きい顔グラと能力値）を出す。
    const clickAttrs=side?` role="button" tabindex="0" data-lineup-side="${side}" data-lineup-pid="${escapeAttrText(String(p.id||''))}" title="押すと詳しい能力を見られます"`:'';
    const clickClass=side?' is-openable':'';
    // v169: 元気度は顔グラの下に置く（従来はカード右上に絶対配置していた）。
    return `<div class="${cardClass}${extraClass}${clickClass}"${clickAttrs}><div class="lineup-face-col">${p.portrait?`<img class="lineup-face" src="${p.portrait}" alt="">`:''}<span class="lineup-genki-under">${genkiBadgeHtml(p,{size:13,numberOnly:true})}</span></div><div class="lineup-main"><div class="lineup-pos-row"><span class="lineup-pos">${posLabel}</span>${positionGradeBadgeHtml(p,'lineup-position-grade')}</div><strong class="lineup-player-name">${p.name}${handBadgeHtml(p)}${moodBadgeHtml(p.mood||0)}</strong><div class="match-lineup-stats">${statGradeLine(p)}</div></div>${opponentLineupAbilityLine(p)}</div>`;
  };

  const rotationHtml=team.rotation.map((id,i)=>lineupCardHtml(team.players[id],i,false)).join('');
  const lib=team.players?.[team.libero];
  const libHtml=lib?lineupCardHtml(lib,-1,true):'';

  return `<div class="${gridClass}">${rotationHtml}${libHtml}</div>`;
}
function comparisonRadarSvg(ownMetrics,oppMetrics){
  const cx=150,cy=138,maxR=92,n=ownMetrics.length;
  const rings=[5,10,15,20,25].map(v=>{
    const pts=ownMetrics.map((_,i)=>radarPoint(cx,cy,maxR*(v/25),i,n).map(x=>x.toFixed(1)).join(',')).join(' ');
    return `<polygon class="team-radar-ring" points="${pts}"></polygon>`;
  }).join('');
  const axes=ownMetrics.map((m,i)=>{
    const [x,y]=radarPoint(cx,cy,maxR,i,n);
    return `<line class="team-radar-axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"></line>`;
  }).join('');
  const polyFor=(metrics)=>metrics.map((m,i)=>{
    const r=maxR*(clamp(m.value,1,25)/25);
    return radarPoint(cx,cy,r,i,n).map(x=>x.toFixed(1)).join(',');
  }).join(' ');
  const labels=ownMetrics.map((m,i)=>{
    const [x,y]=radarPoint(cx,cy,maxR+25,i,n);
    const cls=x<cx-8?'end':x>cx+8?'start':'middle';
    return `<text class="team-radar-label ${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${m.label}</text>`;
  }).join('');
  const values=ownMetrics.map((m,i)=>{
    const [x,y]=radarPoint(cx,cy,maxR+9,i,n);
    const cls=x<cx-8?'end':x>cx+8?'start':'middle';
    const ov=metricValue(oppMetrics,m.key);
    return `<text class="team-radar-value ${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${int(m.value)}/${int(ov)}</text>`;
  }).join('');
  return `<svg class="comparison-radar-svg" viewBox="0 0 300 280" role="img" aria-label="自チームと相手校の比較レーダー">${rings}${axes}<polygon class="comparison-radar-own" points="${polyFor(ownMetrics)}"></polygon><polygon class="comparison-radar-opp" points="${polyFor(oppMetrics)}"></polygon>${values}${labels}</svg>`;
}
function matchComparisonRadarHtml(own,opp){
  const ownM=teamMatchMetricsForTeam(own);
  const oppM=teamMatchMetricsForTeam(opp);
  const rows=ownM.map(m=>{
    const ov=metricValue(oppM,m.key);
    const diff=m.value-ov;
    const cls=diff>=1.2?'own-adv':diff<=-1.2?'opp-adv':'even';
    const note=diff>=1.2?'優勢':diff<=-1.2?'相手優勢':'互角';
    return `<div class="comparison-radar-row ${cls}" title="${escapeAttrText(m.note||'')}"><span class="team-radar-tooltip" data-tip="${escapeAttrText(m.note||'')}">${m.label}</span><strong>${int(m.value)}</strong><em>${int(ov)}</em><small>${note}</small></div>`;
  }).join('');
  return `<div class="comparison-radar-card">
    <div class="comparison-radar-head"><strong>戦力比較レーダー</strong><span>青：${ownSchoolName()} / 赤：相手校</span></div>
    ${comparisonRadarSvg(ownM,oppM)}
    <div class="comparison-radar-legend"><span class="own">${ownSchoolName()}</span><span class="opp">${opp.name}</span></div>
    <div class="comparison-radar-table"><div class="comparison-radar-row head"><span>項目</span><strong>自校</strong><em>相手</em><small>判定</small></div>${rows}</div>
  </div>`;
}
// ============================================================
// v179: 試合画面の選手詳細モーダル
// ============================================================
// 出すのは「顔グラ＋見出し＋基本パラメータ＋能力値14項目」（Tak指示）。
// ポジション評価の一覧は出さない。カード側にポジション評価の文字が出ているため。
// 相手校の選手は state.players と作りが違う（comps を持たず能力が直に載っている。
// compXp も無い）ので、選手画面の描画をそのまま使えない。ここは専用に書く。
// 経験点バーは相手には意味が無いので、値とランクだけを出す。
// 自校の選手（comps 持ち）も同じ関数で出す。仕様は相手と同じ。
function matchDetailCompRow(p,key,label){
  const c=p.comps||p;
  const v=Number(c[key]||1);
  const cls=rankClassFromValue(v);
  return `<div class="mpd-comp-row"><span class="mpd-comp-label">${label}</span>`
    +`<span class="mpd-comp-bar"><span style="width:${clamp(v/25,0,1)*100}%" class="${cls}"></span></span>`
    +`<strong class="mpd-comp-val ${cls}">${v}<span class="rank-chip ${cls}">${ratingLetter(v)}</span></strong></div>`;
}
function matchDetailCompGroup(p,title,rows){
  return `<div class="mpd-comp-group"><div class="mpd-comp-group-title">${title}</div>${rows.map(r=>matchDetailCompRow(p,r[0],r[1])).join('')}</div>`;
}
function matchPlayerDetailHtml(p,teamName){
  const s=deriveStats(p);
  const year=p.year?`${p.year}年`:'学年不明';
  const specials=(p.special||[]).map(x=>specialChipHtml(x)).join('');
  return `<div class="mpd">
    <div class="mpd-head">
      <div class="mpd-face-wrap">${p.portrait?`<span class="face-blend mpd-face"><img class="face-blend-bg" src="${p.portrait}" alt="" aria-hidden="true"><img class="face-blend-fg" src="${p.portrait}" alt="${escapeAttrText(p.name||'')}"></span>`:'<div class="mpd-face mpd-face-empty"></div>'}</div>
      <div class="mpd-head-main">
        <div class="mpd-team">${teamName||''}</div>
        <h3 class="mpd-name">${p.name}${handBadgeHtml(p)}</h3>
        <div class="mpd-meta"><span class="mpd-role">${p.role||''}</span>${positionGradeBadgeHtml(p,'mpd-position-grade')}<span>${year}</span><span>${p.height||'?'}cm</span><span>${handLabel(p)}</span></div>
        <div class="mpd-badges">${genkiBadgeHtml(p,{size:16})}</div>
        ${specials?`<div class="special-list mpd-specials">${specials}</div>`:'<div class="mpd-nospecial">特殊能力なし</div>'}
      </div>
    </div>
    <div class="mpd-section"><h4>基本パラメータ</h4>
      <div class="stat-grid">${statBox('スパイク',s.spike)}${statBox('レシーブ',s.receive)}${statBox('ブロック',s.block)}${statBox('サーブ',s.serve)}${statBox('トス',s.toss)}${statBox('ジャンプ',s.jump)}${statBox('身長',heightPoint(p.height))}${statBox('メンタル',s.mental)}</div>
    </div>
    <div class="mpd-section"><h4>能力値</h4>
      <div class="mpd-comp-grid">
        ${matchDetailCompGroup(p,'スパイク',[['spikePower','決定力'],['spikeControl','コース打ち']])}
        ${matchDetailCompGroup(p,'レシーブ',[['recReception','レセプション'],['recDig','ディグ'],['recRange','守備範囲']])}
        ${matchDetailCompGroup(p,'ブロック',[['blockRead','リード'],['blockStuff','シャット力']])}
        ${matchDetailCompGroup(p,'サーブ',[['servePower','威力'],['serveControl','コントロール']])}
        ${matchDetailCompGroup(p,'トス',[['tossAccuracy','正確性'],['tossRead','読み']])}
        ${matchDetailCompGroup(p,'その他',[['jump','ジャンプ'],['stamina','スタミナ'],['mental','メンタル']])}
      </div>
    </div>
  </div>`;
}
function findLineupPlayer(side,pid){
  // v181: ベンチの選手はコートのチームオブジェクトに入っていないので、state.players から引く（Tak指示）。
  if(side==='ownbench'){
    const list=(lastLineupTeams&&lastLineupTeams.ownBench)||[];
    return list.find(x=>x&&String(x.id)===String(pid))||(state.players||[]).find(x=>x&&String(x.id)===String(pid))||null;
  }
  const team=lastLineupTeams&&lastLineupTeams[side];
  if(!team||!team.players)return null;
  return team.players[pid]||Object.values(team.players).find(x=>x&&String(x.id)===String(pid))||null;
}
function openMatchPlayerModal(side,pid){
  const team=(side==='ownbench')?{name:ownSchoolName()}:(lastLineupTeams&&lastLineupTeams[side]);
  const p=findLineupPlayer(side,pid);
  const modal=document.getElementById('matchPlayerModal');
  const body=document.getElementById('matchPlayerModalBody');
  if(!modal||!body)return false;
  if(!p){ managerSay('この選手の情報を取り出せませんでした。'); return false; }
  body.innerHTML=matchPlayerDetailHtml(p,(team&&team.name)||'');
  modal.classList.remove('hidden');
  modal.style.display='flex';
  const scroller=modal.querySelector('.match-player-modal-body');
  if(scroller)scroller.scrollTop=0;
  return true;
}
function closeMatchPlayerModal(){
  const modal=document.getElementById('matchPlayerModal');
  if(!modal)return;
  modal.classList.add('hidden');
  modal.style.display='';
}
if(typeof window!=='undefined'){
  window.openMatchPlayerModal=openMatchPlayerModal;
  window.closeMatchPlayerModal=closeMatchPlayerModal;
}

// v179: 今このローテーション表示に出ているチーム。カードを押したときの参照元にする。
// 押すたびに buildOpp() で組み直すと、乱数の揺れで表示と中身がずれるため、
// 描画したときのオブジェクトをそのまま覚えておく。
let lastLineupTeams={own:null,opp:null,ownBench:[]};
// v181: ベンチの選手も試合画面に出し、押せば詳細モーダルを開けるようにする（Tak指示）。
//        ベンチは state.benchIds が持っている。いまコートにいる選手（ローテーション＋リベロ）は除く。
function currentOwnBenchPlayers(own){
  const onCourt=new Set();
  (own&&own.rotation||[]).forEach(id=>onCourt.add(String(id)));
  if(own&&own.libero)onCourt.add(String(own.libero));
  const out=[];
  (state.benchIds||[]).forEach(id=>{
    if(!id)return;
    if(onCourt.has(String(id)))return;
    const p=(state.players||[]).find(x=>x&&x.id===id);
    if(p && !isPlayerAbsent(p))out.push(p);
  });
  // 交代でコートから下がった選手（ベンチ登録ではないがいまベンチにいる）も拾う
  const sess=watchMatchSession;
  if(sess && sess.own===own && sess.pairByOriginal){
    Object.values(sess.pairByOriginal).forEach(pair=>{
      if(!pair||!pair.originalId)return;
      if(onCourt.has(String(pair.originalId)))return;
      if(out.some(x=>String(x.id)===String(pair.originalId)))return;
      const p=(state.players||[]).find(x=>x&&x.id===pair.originalId);
      if(p)out.push(p);
    });
  }
  return out;
}
function ownBenchLineupHtml(players){
  if(!players.length)return '<div class="match-bench-empty muted">ベンチに控えている選手はいません。</div>';
  const cards=players.map(p=>`<div class="match-lineup-card opponent-ability-card lineup-bench-card is-openable" role="button" tabindex="0" data-lineup-side="ownbench" data-lineup-pid="${escapeAttrText(String(p.id||''))}" title="押すと詳しい能力を見られます"><div class="lineup-face-col">${p.portrait?`<img class="lineup-face" src="${p.portrait}" alt="">`:''}<span class="lineup-genki-under">${genkiBadgeHtml(p,{size:13,numberOnly:true})}</span></div><div class="lineup-main"><div class="lineup-pos-row"><span class="lineup-pos">ベンチ</span>${positionGradeBadgeHtml(p,'lineup-position-grade')}</div><strong class="lineup-player-name">${p.name}${handBadgeHtml(p)}${moodBadgeHtml(p.mood||0)}</strong><div class="match-lineup-stats">${statGradeLine(p)}</div></div></div>`).join('');
  return `<div class="match-lineup-grid opponent-ability-grid">${cards}</div>`;
}
function matchLineupsHtml(own,opp){
  const ownBench=currentOwnBenchPlayers(own);
  lastLineupTeams={own,opp,ownBench};
  // v181: 戦力レーダーはここから外し、試合ログ側（renderMatchRadarPanel）に出す（Tak指示）。
  return `<div class="match-lineups"><h3>現在のローテーション</h3><div class="lineup-tap-hint">選手カードを押すと、顔と能力を詳しく見られます。</div><h4>${ownSchoolName()}</h4>${teamLineupHtml(own,true,'own')}<h4 class="match-bench-head">${ownSchoolName()}／ベンチ</h4>${ownBenchLineupHtml(ownBench)}<h4>${opp.name}</h4>${/* v126: 相手の解説文（tacticalHint）は表示しない */''}${teamLineupHtml(opp,true,'opp')}</div>`;
}
// v181: 試合ログのカードに戦力レーダーを出す。試合が始まったらログに置き換わって見えなくなるが、
//        それでよいという指示（Tak）。試合前・観戦前に相手との比較を見るためのもの。
// v188: 試合画面を次の試合用に戻す。ログ・結果表示・観戦セッションを片付ける。
function clearMatchScreenForNextWeek(){
  try{
    // 観戦中はいま進行しているログなので消さない
    if(watchMatchSession && !watchMatchSession.done)return;
    state.matchLog=[];
    state.lastMatchSummary='未実施';
    watchMatchSession=null;
    if(typeof document!=='undefined'){
      const el=document.getElementById('matchLog');
      if(el)el.innerHTML='';
    }
  }catch(e){}
}
function renderMatchRadarPanel(){
  const el=document.getElementById('matchRadarPanel');
  if(!el)return;
  // 試合が動き出したらログを優先し、レーダーは畳む
  const logBusy=(watchMatchSession&&!watchMatchSession.done)||((state.matchLog||[]).length>0);
  if(logBusy){el.innerHTML='';el.classList.add('hidden');return;}
  const tour=practiceMatchActive()?{type:'practice',name:practiceMatchKindLabel(),round:0}:isTournamentTurn();
  if(tour && tour.type!=='practice' && currentTournamentEliminated(tour)){el.innerHTML='';el.classList.add('hidden');return;}
  let html='';
  try{
    const own=lastLineupTeams&&lastLineupTeams.own, opp=lastLineupTeams&&lastLineupTeams.opp;
    if(own&&opp)html=matchComparisonRadarHtml(own,opp);
  }catch(e){ html=''; }
  el.innerHTML=html;
  el.classList.toggle('hidden',!html);
}
// v153: 従来は「Aカットでセンター攻撃なら暗黙のクイック扱いで1枚ブロック」だったが、
// v152でクイック攻撃を明示的な特殊攻撃として実装したため、この暗黙のクイックは廃止した。
// 速攻の恩恵は、クイック攻撃（2枚目ブロッカーの参加率が下がる）に一本化する。
function shouldOneBlock(q, attacker){
  return false;
}


function hasSpecial(p, name){
  if(DELETED_GOLD_SPECIALS.has(name))return false;
  return p && Array.isArray(p.special) && p.special.includes(name);
}


function guardianDomainRangeMultiplier(player, log=null, kind='守備範囲'){
  if(hasSpecial(player,'絶対守護領域') && Math.random()<.30){
    if(log)log.push(`${nameSpan('若葉高校',player.name)}の絶対守護領域発動！！ ${kind}の範囲が大きく広がる。`);
    return 1.5;
  }
  return 1;
}

function clutchMultiplier(player, team=null){
  if(!hasSpecial(player,'勝負強い'))return 1;
  if(typeof currentRallyScore==='object' && (currentRallyScore.own>=20 || currentRallyScore.opp>=20))return 1.05;
  return 1;
}
function effectiveMoodMod(p){
  const base=moodInfo(p?.mood||0).mod;
  if(hasSpecial(p,'冷静沈着') && base<1)return 1-(1-base)*0.5;
  return base;
}
function triggerMoodMaker(logs){
  const makers=state.players.filter(p=>hasSpecial(p,'ムードメーカー'));
  if(!makers.length || Math.random()>=0.20)return;
  samplePlayers(2,p=>(p.mood||0)<2).forEach(p=>{
    const b=p.mood||0;
    p.mood=clamp(b+1,-2,2);
    logs.push(`${nameSpan('若葉高校',p.name)}：ムードメーカー効果で調子 ${moodInfo(b).label}→${moodInfo(p.mood).label}`);
  });
}
function isAceAttacker(team, player){
  if(!team||!player)return false;
  const attackers=Object.values(team.players||{}).filter(p=>p&&p.id!==team.libero);
  const max=Math.max(...attackers.map(p=>eff(team,p,'spikePower')+eff(team,p,'jump')*.15+heightPoint(p.height)*.15));
  const val=eff(team,player,'spikePower')+eff(team,player,'jump')*.15+heightPoint(player.height)*.15;
  return val>=max-0.01;
}
function setterHas(team, name){
  return hasSpecial(team?.players?.[team.setter], name);
}
function flyingReceiveMultiplier(player, logs=null, kind='守備'){
  if(hasSpecial(player,'フライングレシーブ') && Math.random()<0.20){
    if(logs)logs.push(`${nameSpan('若葉高校',player.name)}のフライングレシーブ発動！！ 跳び込んで${kind}を拾う。`);
    return 1.05;
  }
  return 1;
}
function serveCraftMultiplier(player, logs=null){
  if(hasSpecial(player,'サーブ職人')){
    if(logs)logs.push(`${nameSpan('若葉高校',player.name)}のサーブ職人発動！！ 狙ったコースへ丁寧に沈める。`);
    return 1.05;
  }
  return 1;
}
function oneTouchNeedFactor(baseFactor, attacker, blockInfo){
  let f=baseFactor;
  if(baseFactor>=1)return f;
  if(hasSpecial(attacker,'パワーヒッター'))f-=0.10;
  const blockers=[blockInfo?.main, blockInfo?.neigh].filter(Boolean);
  if(blockers.some(b=>hasSpecial(b,'ワンタッチ職人')))f+=0.10;
  return clamp(f,0.10,1.00);
}
function oneTouchNeedNote(baseFactor, attacker, blockInfo){
  const f=oneTouchNeedFactor(baseFactor, attacker, blockInfo);
  const notes=[];
  if(hasSpecial(attacker,'パワーヒッター')&&baseFactor<1)notes.push('パワーヒッター-0.10');
  const blockers=[blockInfo?.main, blockInfo?.neigh].filter(Boolean);
  if(baseFactor<1 && blockers.some(b=>hasSpecial(b,'ワンタッチ職人')))notes.push('ワンタッチ職人+0.10');
  return notes.length?` / 係数${num(baseFactor,2)}→${num(f,2)}（${notes.join('、')}）`:'';
}


function guardianAdjust(player, diff, kind, log){
  // 守護神：レセプション/ディグが -4〜-5 の失敗判定なら、崩れ扱いへ救済。
  if(hasSpecial(player,'守護神') && diff <= -4 && diff >= -5){
    log.push(`${nameSpan('若葉高校',player.name)}の守護神発動！！ ${kind}失敗を崩れに変えました。`);
    return true;
  }
  return false;
}
function heavyBallFactor(attacker, log){
  // 重い球：30%で相手ディグ値を0.95倍にする。
  if(hasSpecial(attacker,'重い球') && Math.random() < .30){
    log.push(`${nameSpan('若葉高校',attacker.name)}の重い球発動！！ 重い打球に相手のレシーブが弾かれる。`);
    return .95;
  }
  return 1;
}






// 2026-07-26 Supabase統合: 全卒業生の無制限保存をやめ、OH4/MB4/OP2/S2/L2の歴代ベスト14のみ保持。
const HISTORICAL_OG_LIMITS={OH:4,MB:4,OP:2,S:2,L:2};
// v147: 殿堂入り（歴代ベスト14）に登録するポジションは、本人が最も高く評価されるポジションにする。
// 元がOHでもMBとして育てた結果MBの評価が一番高ければ、MBとして登録する。
// 評価の尺度はポジションごとに違う（リベロだけS=24）ため、素点ではなく
// 「そのポジションのS到達点に対する比率」で比べる。同率なら本来の登録ポジションを優先する。
function bestEvaluatedPosition(p){
  const order=POSITIONS.slice();
  const home=p?.role;
  if(home && order.includes(home)){ order.splice(order.indexOf(home),1); order.unshift(home); }
  let bestPos=home||order[0], bestRatio=-1;
  for(const pos of order){
    const ratio=calcPositionScore25(p,pos)/(positionRatingScale(pos).S||21);
    if(ratio>bestRatio+1e-9){ bestRatio=ratio; bestPos=pos; }
  }
  return bestPos;
}
function ogSnapshotFromPlayer(p){
  const role=bestEvaluatedPosition(p);
  return {
    id:p.id,name:p.name,portrait:p.portrait||'',year:state.year,graduationYear:state.year,
    role,height:p.height,hand:p.hand||'右',comps:{...(p.comps||{})},compXp:{...(p.compXp||{})},
    special:[...(p.special||[])],mood:0,source:p.source||'OG',
    originalRole:p.role,
    positionScore:calcPositionScore25(p,role)
  };
}
function updateHistoricalBest14(retirees){
  const existing=Array.isArray(state.retiredPlayerSnapshots)?state.retiredPlayerSnapshots.filter(x=>x&&x.role&&x.comps):[];
  const incoming=(retirees||[]).map(ogSnapshotFromPlayer);
  const all=[...existing,...incoming].filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i);
  const kept=[];
  for(const [role,limit] of Object.entries(HISTORICAL_OG_LIMITS)){
    const rows=all.filter(x=>x.role===role).map(x=>({...x,positionScore:Number(x.positionScore||calcPositionScore25(x,role)||0)}));
    rows.sort((a,b)=>b.positionScore-a.positionScore || (b.graduationYear||0)-(a.graduationYear||0));
    kept.push(...rows.slice(0,limit));
  }
  state.retiredPlayerSnapshots=kept;
}

function historicalOgByRole(role){
  return (state.retiredPlayerSnapshots||[]).filter(x=>x&&x.role===role&&x.comps).sort((a,b)=>(b.positionScore||0)-(a.positionScore||0));
}
function ogAttendee(role,slot=0,usedIds=null){
  const pool=historicalOgByRole(role).filter(p=>!usedIds||!usedIds.has(p.id));
  if(pool.length<=0)return null;
  // v84: 以前は pool[slot] が無いとき pool[0] に落ちていたため、
  // 歴代ベスト14の同ポジションが1人しかいない時期に「同じ選手が2枠に入る」状態になっていた。
  // （OH1とOH2、MB1とMB2が同一人物になり、OG選抜が実際より強くなっていた）
  // 枠が埋まらない場合は null を返し、開催を見送る。
  const primary=pool[0];
  if(!primary)return null;
  const attend=seededHash01(`${state.year}:og-attend:${role}:${slot}:${primary.id}`)<0.85;
  if(attend)return primary;
  return pool[1]||primary;
}
function ogSnapshotToMatchPlayer(snap,id,role){
  const comps={...(snap.comps||{})};
  return {id,name:snap.name,role,portrait:snap.portrait||'assets/new_shino.png',height:snap.height||170,hand:snap.hand||'右',
    spikePower:comps.spikePower||1,spikeControl:comps.spikeControl||1,recReception:comps.recReception||1,recDig:comps.recDig||1,recRange:comps.recRange||1,
    blockRead:comps.blockRead||1,blockStuff:comps.blockStuff||1,servePower:comps.servePower||1,serveControl:comps.serveControl||1,
    tossAccuracy:comps.tossAccuracy||1,tossRead:comps.tossRead||1,jump:comps.jump||1,stamina:comps.stamina||1,mental:comps.mental||1,
    special:[...(snap.special||[])],graduationYear:snap.graduationYear||snap.year||null};
}
function buildHistoricalOgOpponent(){
  // v84: 同じ選手が複数枠に入らないよう、選んだ選手を除外しながら埋める。
  const used=new Set();
  const take=(role,slot)=>{ const p=ogAttendee(role,slot,used); if(p)used.add(p.id); return p; };
  const picks={
    oh1:take('OH',0),oh2:take('OH',1),
    mb1:take('MB',0),mb2:take('MB',1),
    op:take('OP',0),s:take('S',0),l:take('L',0)
  };
  if(Object.values(picks).some(x=>!x))return null;
  const players={
    og_oh1:ogSnapshotToMatchPlayer(picks.oh1,'og_oh1','OH'),
    og_oh2:ogSnapshotToMatchPlayer(picks.oh2,'og_oh2','OH'),
    og_mb1:ogSnapshotToMatchPlayer(picks.mb1,'og_mb1','MB'),
    og_mb2:ogSnapshotToMatchPlayer(picks.mb2,'og_mb2','MB'),
    og_op:ogSnapshotToMatchPlayer(picks.op,'og_op','OP'),
    og_s:ogSnapshotToMatchPlayer(picks.s,'og_s','S'),
    og_l:ogSnapshotToMatchPlayer(picks.l,'og_l','L')
  };
  return {name:`${ownSchoolName()} 歴代OG選抜`,basePower:20,players,rotation:['og_oh1','og_mb1','og_op','og_s','og_mb2','og_oh2'],setter:'og_s',libero:'og_l',isOgAllStar:true};
}
// v174: U-18日本代表との定例練習試合は content-national.js（有料版）で登録する。
function u18AnnualMatchAvailable(){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.u18AnnualMatchAvailable)||null;
  return fn?fn():false;
}
function maybeStartU18AnnualMatchWeek(){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.maybeStartU18AnnualMatchWeek)||null;
  return fn?fn():false;
}
// v174: 全国王者の覚醒イベントは content-national.js（有料版）で登録する。
function maybeShowKoutokuAwakeningEvent(){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.maybeShowKoutokuAwakeningEvent)||null;
  return fn?fn():false;
}
// v174: OG特別試合は content-national.js（有料版）で登録する。
function maybeStartOgMatchWeek(){
  const fn=(typeof GVB_NATIONAL!=='undefined'&&GVB_NATIONAL&&GVB_NATIONAL.maybeStartOgMatchWeek)||null;
  return fn?fn():false;
}
function removeRetiredPlayersFromTeam(retirees, log=null, reason='引退'){
  const retireIds=new Set((retirees||[]).map(p=>p.id));
  if(!retireIds.size)return;
  // v197: 「最初の約束」の卒業イベント（Tak指示）。名簿から消す前に判定する。
  //        1月第4週の引退・3月第4週の引退・冬の大会敗退による引退のいずれの経路もここを通る。
  maybePromiseGraduationEvent(retirees);
  if(!Array.isArray(state.retiredPlayerIds))state.retiredPlayerIds=[];
  if(!Array.isArray(state.retiredPlayerSnapshots))state.retiredPlayerSnapshots=[];
  if(!Array.isArray(state.monthlyRetiredSnapshots))state.monthlyRetiredSnapshots=[];
  const monthRetired=(retirees||[]).map(p=>ogSnapshotFromPlayer(p));
  for(const snap of monthRetired){
    if(!state.monthlyRetiredSnapshots.some(x=>String(x.id)===String(snap.id)))state.monthlyRetiredSnapshots.push(snap);
  }
  updateHistoricalBest14(retirees);
  for(const id of retireIds){
    if(!state.retiredPlayerIds.includes(id))state.retiredPlayerIds.push(id);
  }
  state.players=(state.players||[]).filter(p=>!retireIds.has(p.id));
  if(Array.isArray(state.starterIds))state.starterIds=state.starterIds.filter(id=>!retireIds.has(id));
  if(Array.isArray(state.benchIds))state.benchIds=state.benchIds.filter(id=>!retireIds.has(id));
  for(const id of retireIds){
    delete state.playerTraining?.[id];
  }
  if(state.liberoId && retireIds.has(state.liberoId)){
    const nextLib=(state.players||[]).find(p=>p.role==='L') || state.players?.[0] || null;
    state.liberoId=nextLib?.id||null;
  }
  if(state.selectedPlayerId && retireIds.has(state.selectedPlayerId))state.selectedPlayerId=state.players?.[0]?.id||null;
  if(state.lastIndividualPlayerId && retireIds.has(state.lastIndividualPlayerId))state.lastIndividualPlayerId=state.selectedPlayerId||state.players?.[0]?.id||null;
  if(state.japanRep?.playerId && retireIds.has(state.japanRep.playerId))state.japanRep=null;
  if((state.players||[]).length){
    ensureStarterIds();
    ensureBenchIds();
  }else{
    state.starterIds=[];
    state.benchIds=[];
    state.liberoId=null;
  }
  state.players.forEach(p=>{p.starter=Array.isArray(state.starterIds)&&state.starterIds.includes(p.id);});
  const names=(retirees||[]).map(p=>nameSpan('若葉高校',p.name)).join('、');
  // v130: 「選手一覧・スタメン・ベンチから削除しました」は内部処理の説明なので表示しない
}

// v158: 春高で全国優勝した年は、3年生を1月第4週で引退させず3月第4週まで残す。
// 3月第3週のOG特別試合に、優勝メンバーのまま臨めるようにするため。
function thirdYearRetirementDeferred(){
  return (state.seasonNationalResult&&state.seasonNationalResult.haruko==='champion')
      || (state.lastNationalChampionYear||0)===state.year;
}
// 引退のタイミング判定。通常は1月第4週、春高優勝年だけ3月第4週。
function isThirdYearRetirementWeek(){
  if(state.seniorsRetired)return false;
  if(thirdYearRetirementDeferred())return state.monthIndex===11&&state.turnIndex===3;
  return state.monthIndex===9&&state.turnIndex===3;
}
function maybeRetireThirdYears(log){
  if(!isThirdYearRetirementWeek())return false;
  retireThirdYearsAtSeasonEnd(log);
  return true;
}
function retireThirdYearsAtSeasonEnd(log){
  const deferred=state.monthIndex===11;
  const whenLabel=deferred?'3月第4週目':'1月第4週目';
  const retirees=state.players.filter(p=>p.year>=3);
  if(!retirees.length){
    if(log)log.push(`${whenLabel}ですが、引退対象の3年生はいませんでした。`);
    return [];
  }
  applyThirdYearRetirementLegacy(retirees, log||state.trainingLog);
  processProEntryForRetirees(retirees, log||state.trainingLog);
  removeRetiredPlayersFromTeam(retirees, log||state.trainingLog, `${whenLabel}終了による3年生引退`);
  const msg=deferred
    ? `春高全国優勝を果たした3年生 ${retirees.map(p=>nameSpan('若葉高校',p.name)).join('、')} が、OG特別試合を最後に引退しました。`
    : `${whenLabel}終了により、3年生 ${retirees.map(p=>nameSpan('若葉高校',p.name)).join('、')} が引退しました。`;
  if(log)log.push(msg);
  if(log!==state.trainingLog)state.trainingLog.push(msg);
  state.seniorsRetired=true;
  state.retiredInitialSeniors=true;
  return retirees;
}

function retireThirdYearsAfterHaruko(log){
  const retirees=state.players.filter(p=>p.year>=3);
  if(!retirees.length){
    log.push('冬の大会敗退ですが、引退対象の3年生はいませんでした。');
    return;
  }
  processProEntryForRetirees(retirees, log);
  removeRetiredPlayersFromTeam(retirees, log, '冬の大会敗退による3年生引退');
  state.seniorsRetired=true;
  state.retiredInitialSeniors=true;
  log.push(`冬の大会敗退により、3年生 ${retirees.map(p=>nameSpan('若葉高校',p.name)).join('、')} が引退しました。`);
  enqueueImportantPopup('3年生引退イベント', `<div class="growth-manager">${managerLine('3年生が引退します。')}</div><div class="growth-item">${retirees.map(p=>nameSpan('若葉高校',p.name)).join('、')} が引退しました。</div><div class="growth-item">選手一覧・スタメン・ベンチから削除しました。</div>`, 'event','retirement');
}

function flowChangerAfterPoint(teamName, playerName, reason, log){
  if(!isOwnTeamName(teamName))return;
  const p=ownPlayerByName(playerName);
  if(!p||!hasSpecial(p,'流れを変える一本'))return;
  if(!['サービスエース','スパイク得点','スパイク完全突破','スパイクノータッチ','ブロックアウト'].includes(reason))return;
  samplePlayers(2,x=>(x.mood||0)<2).forEach(x=>{
    const b=x.mood||0;
    x.mood=clamp(b+1,-2,2);
    if(b!==x.mood)log.push(`${nameSpan('若葉高校',p.name)}の流れを変える一本！ ${nameSpan('若葉高校',x.name)}の調子 ${moodInfo(b).label}→${moodInfo(x.mood).label}`);
  });
}

function applyPoint(scoringTeamName, own, opp, currentServe){
  let nextServe=currentServe;
  let ownPoint=isOwnTeamName(scoringTeamName);
  currentLastPointOwn=ownPoint;
  if(ownPoint) nextServe='own'; else nextServe='opp';
  if(nextServe!==currentServe){
    if(nextServe==='own')rotate(own); else rotate(opp);
  }
  return {serv:nextServe, ownPoint};
}


function benchPlayersForMatch(){
  ensureBenchIds();
  return state.benchIds.map(id=>state.players.find(p=>p.id===id)).filter(Boolean).slice(0,BENCH_SIZE);
}


function refreshWatchOwnTeamRoles(sess){
  const playerMap={};
  sess.own.rotation.forEach((id,i)=>{
    const pair=Object.values(sess.pairByOriginal||{}).find(x=>x.currentId===id&&!x.isLibero);
    const src=state.players.find(p=>p.id===id);
    if(src)playerMap[id]=cloneForMatchRole(src,pair?.role||sess.own.players?.[id]?.role||baseRotationRole(i));
  });
  const libId=sess.liberoId || sess.own.libero;
  const libSrc=state.players.find(p=>p.id===libId);
  if(libSrc)playerMap[libId]=cloneForMatchRole(libSrc,'L');
  sess.own.players=playerMap;
  const setterPair=Object.values(sess.pairByOriginal||{}).find(x=>!x.isLibero&&x.role==='S');
  sess.own.setter=setterPair?.currentId||sess.own.rotation[3]||sess.own.rotation[0];
  sess.own.libero=libId||sess.own.rotation[5];
}
function createWatchMatchSession(){
  const tour=practiceMatchActive()?{type:'practice',name:practiceMatchKindLabel(),round:0}:isTournamentTurn();
  if(!tour || (tour.type!=='practice'&&currentTournamentEliminated(tour)))return null;
  currentMatchTournamentType=tour?.type||null;
  if(tour&&tour.type==='interhigh_nat'&&tour.round>=2)state.interhighBest4Year=state.year;
  // v199: 練習試合系はここで実際に体力を全快にする（画面の元気度も全快になる）。
  beginPracticeMatchStamina();
  const own=buildOwnTeam(),opp=buildOpp(tour),log=[],stats=newMatchStats(),luck=newLuckBalance(opp.name);
  currentLogOpponentPlayers=opp.players||null;
  if(tour.type!=='practice')recordNationalStarterExperience(tour,own);
  luck._teamByName={[own.name]:own,[opp.name]:opp};
  const bench=benchPlayersForMatch();
  const sess={tour,own,opp,log,stats,luck,os:0,ps:0,serv:'own',n:1,done:false,benchIds:bench.map(p=>p.id),pairByOriginal:{},usedBenchIds:[],liberoId:own.libero,tossTargetIds:normalizeTossTargetIds(state.matchTossTargetIds||state.matchTossTargetId||''),serveOrder:normalizeServeOrder(state.matchServeOrder||'none'),blockTargetId:normalizeBlockTargetRole(state.matchBlockTargetId||''),startedAt:Date.now()};
  own.rotation.forEach(id=>{sess.pairByOriginal[id]={originalId:id,currentId:id,benchId:null,role:own.players[id]?.role||'OH',isLibero:false};});
  triggerMoodMaker(log);
  log.push(`<strong>${tour.name}：${ownSchoolName()} vs ${opp.name}</strong>`);
  if(luck._omikujiResult)log.push(`神社のおみくじ結果：${luck._omikujiResult} / ${ownSchoolName()}のランダム補正 ${omikujiBonusText(luck._omikujiBonus)}`);
  // v181: 観戦を始めた時点で、最初のサーバーをログに出しておく。
  const firstServer=watchNextServerLine(sess);
  if(firstServer)log.push(firstServer);
  state.matchLog=(typeof matchOnlyLog!=='undefined')?matchOnlyLog:log;
  state.lastMatchSummary='観戦中：0-0';
  managerSay('観戦モードを開始しました。1点ずつ「次へ」で進めます。');
  return sess;
}
function startWatchMatch(){
  const tour=practiceMatchActive()?{type:'practice',name:practiceMatchKindLabel(),round:0}:isTournamentTurn();
  if(!tour){state.matchLog=['試合予定がないため、試合は行えません。'];managerSay('試合予定がありません。');renderAll();return;}
  if(tour.type!=='practice'&&currentTournamentEliminated(tour)){state.matchLog=['すでに敗退しているため、この大会の試合は行えません。'];managerSay('すでに敗退しています。');renderAll();return;}
  watchMatchSession=createWatchMatchSession();
  renderAll();
  saveState();
}
function finalizeWatchMatch(sess){
  if(sess.done)return;
  sess.done=true;
  // v181: 試合中は積むだけにしていた疲労を、ここでまとめて反映する（Tak指示）。
  applyPendingMatchFatigue(sess.fatiguePending);
  const {tour,opp,log,stats,os,ps,luck}=sess;
  const win=os>ps;
  log.push(`<strong>試合終了：${ownSchoolName()} ${os}-${ps} ${opp.name}</strong>`);
  // v74: 計算過程・累計表示は出さない

  // v104: 成長などより先に、まず点数の結果を見せる
  enqueueMatchResultPopup(tour,opp,os,ps);
  // v130: 実況ログはここまで。以降の成長・イベントの追記は混ぜない。
  const matchOnlyLog=log.slice();
  applyMatchExperience(stats,opp,os,ps,log,tour);
  // v199: 預けておいた疲労を戻す。練習試合系では消費0なので、試合前と同じ値に戻る。
  endPracticeMatchStamina();
  if(tour&&tour.type==='practice'){
    scheduleU18SisterRecruitOnWin(opp,win,log);
    // v203: U-18戦／OG戦に初めて勝ったときの物語イベント（Tak指示）
    handleSpecialMatchWinStory(opp,win);
    state.practiceMatch=null;
    state.matchLog=(typeof matchOnlyLog!=='undefined')?matchOnlyLog:log;
    state.lastMatchSummary=`${practiceMatchKindLabel(opp)}：${ownSchoolName()} ${os}-${ps} ${opp.name} / ${win?'勝利':'敗戦'}`;
    recordMonthlyMatchResult(tour,opp,os,ps,win,stats);
    managerSay(win?`${practiceMatchKindLabel(opp)}終了です。${os}-${ps}で勝利しました。`:`${practiceMatchKindLabel(opp)}終了です。${os}-${ps}で敗れました。`);
    return;
  }
  applyDistrictWinSchoolClass(tour,win);
  if(win&&tour.type==='interhigh_pref'&&tour.round===3){state.qualifiedInterhigh=true;}
  if(win&&tour.type==='haruko_pref'&&tour.round===3){state.qualifiedHaruko=true;}
  if(win&&tour.type==='interhigh_nat'&&tour.round===1)state.interhighBest4Year=state.year;
    if(win&&(tour.type==='interhigh_nat'||tour.type==='haruko_nat')&&tour.round===1)setSchoolClassAtLeast('強豪校');
  if(win&&(tour.type==='interhigh_nat'||tour.type==='haruko_nat')&&tour.round>=2)setSchoolClassAtLeast('名門校');
  if(!win){
    processSchoolClassDropOnLoss(tour,os,ps,log);
    markTournamentLoss(tour);
    if(tour.type==='haruko_pref'||tour.type==='haruko_nat'){state.seniorsRetired=true;retireThirdYearsAfterHaruko(log);}
  }
  enqueueTournamentMilestonePopup(tour,win,os,ps,opp&&opp.name);
  advanceTurnWithEvent(log,'match');
  state.matchLog=(typeof matchOnlyLog!=='undefined')?matchOnlyLog:log;
  state.lastMatchSummary=`${ownSchoolName()} ${os}-${ps} ${opp.name} / ${win?'勝利':'敗戦'}`;
  recordMonthlyMatchResult(tour,opp,os,ps,win,stats);
  managerSay(win?`試合終了です。${ownSchoolName()}が${os}-${ps}で勝利しました！`:`試合終了です。${ownSchoolName()}は${os}-${ps}で敗れました。課題を整理しましょう。`);
  if(win)state.schoolRank='地区王者';
}
// v161: 1得点進行につき、そのときコートにいた選手の疲労+1。
// リベロはコートにいる間だけ、MBはリベロと交代してベンチにいる間は加算しない。
// courtBackPlayers / effectiveFrontPlayers が現在のコート上を返すので、それをそのまま使う。
function onCourtPlayerIdsForFatigue(team){
  if(!team)return [];
  const ids=[];
  try{ (effectiveFrontPlayers(team)||[]).forEach(p=>{ if(p&&p.id)ids.push(p.id); }); }catch(e){}
  try{ (courtBackPlayers(team)||[]).forEach(p=>{ if(p&&p.id)ids.push(p.id); }); }catch(e){}
  return ids.filter((x,i,a)=>a.indexOf(x)===i);
}
// v171: 試合の疲労は「2点で1」。従来は1点ごとに+1だったので、ちょうど半分になる。
//        addFatigue は量を四捨五入するため 0.5 をそのまま渡せない。端数は持ち越す。
// v181: 疲労の計算そのものは残すが、試合中はリアルタイムに反映しない（Tak指示）。
//        1点ごとにコート上の選手ぶんを「保留分」へ積むだけにして、試合が終わった時点で
//        applyPendingMatchFatigue() でまとめて選手へ反映する。
//        こうすると観戦中に元気度が目減りしていく表示にならず、試合後の結果は従来と同じになる。
const MATCH_FATIGUE_PER_POINT=0.5;
function newMatchFatigueBucket(){ return Object.create(null); }
function addMatchFatigueForRally(ownTeam,bucket){
  if(!bucket)return;
  // v193: 練習試合・U-18日本代表戦・OG特別試合では体力を消費しない（Tak指示）。
  //        消費しないので、端数（matchFatigueCarry）の持ち越しも発生しない。
  if(practiceMatchActive())return;
  if(!ownTeam||!isOwnTeamName(ownTeam.name))return;
  onCourtPlayerIdsForFatigue(ownTeam).forEach(id=>{
    bucket[id]=(Number(bucket[id])||0)+MATCH_FATIGUE_PER_POINT;
  });
}
// 試合が終わった時点で、積んでおいた疲労を選手へ反映する。
// 端数（0.5）は従来どおり p.matchFatigueCarry に持ち越して次の試合へ渡す。
function applyPendingMatchFatigue(bucket){
  if(!bucket)return;
  (state.players||[]).forEach(p=>{
    const add=Number(bucket[p.id])||0;
    if(!add)return;
    const carry=(Number(p.matchFatigueCarry)||0)+add;
    const whole=Math.floor(carry);
    p.matchFatigueCarry=carry-whole;
    if(whole>0)addFatigue(p,whole);
  });
  Object.keys(bucket).forEach(k=>{delete bucket[k];});
}
// v184: 25点先取だが、24-24になったら2点差がつくまで続ける（デュース）。Tak指示。
//        上限（27点打ち切りなど）は設けない。
const SET_TARGET_POINTS=25;
function setIsOver(a,b){
  return (a>=SET_TARGET_POINTS||b>=SET_TARGET_POINTS) && Math.abs(a-b)>=2;
}
function watchAwardPoint(sess,teamName,reason,playerName='チーム',pointLog=[]){
  // v181: 積むだけ。反映は finalizeWatchMatch（試合終了時）。
  if(!sess.fatiguePending)sess.fatiguePending=newMatchFatigueBucket();
  addMatchFatigueForRally(sess.own,sess.fatiguePending);
  if(isOwnTeamName(teamName))sess.os++;else sess.ps++;
  const ap=applyPoint(teamName,sess.own,sess.opp,sess.serv);
  sess.serv=ap.serv;
  addMatchStat(sess.stats,teamName,playerName,reason);
  flowChangerAfterPoint(teamName,playerName,reason,pointLog);
}
function setterIsFront(team){
  return !!(team && team.setter && frontIds(team).includes(team.setter));
}
function tryTwoAttack(attTeam,defTeam,q,log,stats,luck,awardPointFn,scoreTextFn){
  if(attTeam?._nextSetterOverrideId)return null;
  const twoRate=hasSpecial(attTeam.players?.[attTeam.setter],'ツーアタック')?0.075:0.03;
  if(!setterIsFront(attTeam) || Math.random()>=twoRate)return null;
  const setter=attTeam.players[attTeam.setter];
  if(!setter)return null;
  const tossValue=eff(attTeam,setter,'tossAccuracy')*moodMod(setter);
  const twoHandMult=twoAttackHandMultiplier(setter);
  const spikeValue=(eff(attTeam,setter,'spikePower')*moodMod(setter))*twoHandMult+heightPoint(setter.height)*0.25+eff(attTeam,setter,'jump')*0.25;
  addActionStat(stats,'toss',attTeam.name,setter.name,'ツーアタック');
  if(tossValue>=spikeValue){
    log.push(playLineHtml(twoAttackNarrative(attTeam,setter),'attack'));
    const r=fairRand(attTeam.name,.85,1.15,luck);
    const read=eff(attTeam,setter,'tossRead')*moodMod(setter);
    const need=tossValue*r;
    const dg=chooseDigger(defTeam,read,false),dp=dg.player;defTeam._lastDiggerId=dp?dp.id:null;applyMoodMakerBias(defTeam,dp,luck);const dr=fairRand(defTeam.name,.85,1.15,luck);
    const wideDig=hasSpecial(dp,'広い守備範囲')?1.10:1;
    const domainDig=guardianDomainRangeMultiplier(dp,log,'ツーアタック守備範囲');
    const dv=eff(defTeam,dp,'recDig')*wideDig*domainDig*1.25*moodMod(dp)*dr;
    let dd=dv-need,digRes=digResult(dd);
    if(guardianAdjust(dp,dd,'ディグ',log)){digRes='崩れ';dd=-4;}
    log.push(`ツーアタック：ブロック無し。ディグ難度＝トス正確度${num(tossValue)}×乱数${num(r,2)}=${num(need)}`);
    log.push(`ディグ対象：${dg.detail} → ${resultTag(nameSpan(defTeam.name,dp.name))} / 対象選択にはトス読み${num(read)}を使用`);
    log.push(`ディグ判定：ディグ${num(eff(defTeam,dp,'recDig'))}×広い守備範囲${num(wideDig,2)}×絶対守護領域${num(domainDig,2)}×1.25×調子${num(moodMod(dp),2)}×乱数${num(dr,2)}=${num(dv)} - 難度${num(need)} = ${num(dd)} → ${resultTag(digRes)}`);
    log.push(playLineHtml(digNarrative(defTeam,dp,digRes),'dig'));
    addActionStat(stats,'dig',defTeam.name,dp.name,digRes);
    if(dd<-4){
      awardPointFn(attTeam.name,'ツーアタック得点',setter.name);
      log.push(resultLineHtml('ツーアタック得点',scoreTextFn()));
      return {done:true};
    }
    const nextQ=digRes==='A返球'?'A':digRes==='B返球'?'B':'崩れ';
    log.push(playLineHtml(rallyContinueNarrative(defTeam,digRes),'continue'));
    return {done:false,attTeam:defTeam,defTeam:attTeam,q:nextQ};
  }
  const ctrl=eff(attTeam,setter,'spikeControl')*moodMod(setter);
  const amr=clamp(.15-(ctrl-10)*.006+(q==='崩れ'?(setterHas(attTeam,'二段トス適性')?.035:.07):q==='B'?.03:0),.02,.28);
  const aroll=Math.random();
  log.push(`ツーアタックのスパイクミス判定：制球${num(ctrl)} → ミス率${pct(amr)} / 乱数${num(aroll,3)} → ${aroll<amr?resultTag('ミス'):resultTag('成功')}`);
  if(aroll<amr){
    addActionStat(stats,'spike',attTeam.name,setter.name,'ミス');
    awardPointFn(defTeam.name,'ツーアタックミス',setter.name);
    log.push(resultLineHtml('ツーアタックミス',scoreTextFn()));
    return {done:true};
  }
  currentAttackTeam=attTeam;currentAttackQuality=q;
  const av=attackCalc(attTeam,setter,q,luck),bv=blockCalc(defTeam,setter,true,luck);
  const twoAtkMult=twoAttackHandMultiplier(setter);
  if(twoAtkMult!==1){
    av.sp*=twoAtkMult;
    av.handMult=(av.handMult||1)*twoAtkMult;
    av.value=((av.sp*.75+av.jp*.375)*av.specialMult)*av.r+av.h*.375+av.to*.2+av.cb;
  }
  bv.mv*=0.75;bv.value*=0.75;
  const ad=av.value-bv.value;
  log.push(playLineHtml(twoAttackNarrative(attTeam,setter),'attack'));
  log.push(`ツーアタック攻撃値：(決定${num(av.sp)}×0.75+J${num(av.jp)}×0.375)×${num(av.r,2)}+身長${num(av.h)}×0.375+トス${num(av.to)}×0.20+補正${av.cb}${twoAttackHandNote(setter)}=${num(av.value)}`);
  log.push(`ツーアタックブロック値：${bv.fastTossNoSecond?'高速トス発動で2枚目ブロック無効。':''}${bv.specialBlockNote?bv.specialBlockNote+'。':''}${bv.blockTacticNote?bv.blockTacticNote+'。':''}${bv.quickBlockNote?bv.quickBlockNote+'。':''}正面${nameSpan(defTeam.name,bv.main.name)}のみ。通常計算${num(bv.mv/0.75)}×0.75=${num(bv.value)}`);
  log.push(`攻撃差：${num(ad)} → ${resultTag(blockResult(ad))}`);
  const br=blockResult(ad);
  log.push(playLineHtml(blockNarrative(defTeam,bv.main,br),'block'));
  addActionStat(stats,'block',defTeam.name,bv.main.name,br);
  if(ad<0){
    addActionStat(stats,'spike',attTeam.name,setter.name,'被シャット');
    awardPointFn(defTeam.name,'シャットアウト',bv.main.name);
    log.push(resultLineHtml('シャットアウト',scoreTextFn()));
    return {done:true};
  }
  if(ad>=16){
    addActionStat(stats,'spike',attTeam.name,setter.name,'ノータッチ');
    awardPointFn(attTeam.name,'ツーアタックノータッチ',setter.name);
    log.push(resultLineHtml('ツーアタックノータッチ級',scoreTextFn()));
    return {done:true};
  }
  const complete=ad>=11;
  const digNeedNote=ad<3?'ワンタッチ大：ディグ難度×0.5':ad<6?'ワンタッチ小：ディグ難度×0.75':ad>=11?'完全突破':'通常突破';
  const dg=chooseDigger(defTeam,ctrl,complete,setter),dp=dg.player;defTeam._lastDiggerId=dp?dp.id:null;applyMoodMakerBias(defTeam,dp,luck);const dr=fairRand(defTeam.name,.85,1.15,luck);
  const baseNeedFactor=ad<3?.5:ad<6?.75:1;
    const needFactor=oneTouchNeedFactor(baseNeedFactor,setter,bv);
    const need=av.value*needFactor;
  const heavy=heavyBallFactor(setter,log);
  const wideDig=hasSpecial(dp,'広い守備範囲')?1.10:1;
  const domainDig=guardianDomainRangeMultiplier(dp,log,'ディグ守備範囲');
  const dv=eff(defTeam,dp,'recDig')*wideDig*domainDig*heavy*flyingReceiveMultiplier(dp,log,'ディグ')*1.25*moodMod(dp)*dr;
  let dd=dv-need,digRes=digResult(dd);
  if(guardianAdjust(dp,dd,'ディグ',log)){digRes='崩れ';dd=-4;}
  log.push(`ディグ対象：${dg.detail} → ${resultTag(nameSpan(defTeam.name,dp.name))} / ${digNeedNote}${oneTouchNeedNote(baseNeedFactor,setter,bv)}`);
  log.push(`ディグ判定：ディグ${num(eff(defTeam,dp,'recDig'))}×広い守備範囲${num(wideDig,2)}×絶対守護領域${num(domainDig,2)}×重い球${num(heavy,2)}×1.25×調子${num(moodMod(dp),2)}×乱数${num(dr,2)}=${num(dv)} - 難度${num(need)} = ${num(dd)} → ${resultTag(digRes)}`);
  log.push(playLineHtml(digNarrative(defTeam,dp,digRes),'dig'));
  addActionStat(stats,'dig',defTeam.name,dp.name,digRes);
  if(dd<-4){
    addActionStat(stats,'spike',attTeam.name,setter.name,'得点');
    awardPointFn(attTeam.name,complete?'ツーアタック完全突破':'ツーアタック得点',setter.name);
    log.push(resultLineHtml('ツーアタック得点',scoreTextFn()));
    return {done:true};
  }
  addActionStat(stats,'spike',attTeam.name,setter.name,'継続');
  const nextQ=digRes==='A返球'?'A':digRes==='B返球'?'B':'崩れ';
  log.push(playLineHtml(rallyContinueNarrative(defTeam,digRes),'continue'));
  return {done:false,attTeam:defTeam,defTeam:attTeam,q:nextQ};
}

function watchAttackPhase(sess,attTeam,defTeam,q,pointLog){
  const {stats,luck}=sess;
  const setter=effectiveSetterForAttack(attTeam);
  if(setter){
    const two=tryTwoAttack(attTeam,defTeam,q,pointLog,stats,luck,(teamName,reason,playerName)=>watchAwardPoint(sess,teamName,reason,playerName,pointLog),()=>`${sess.os}-${sess.ps}`);
    if(two)return two;
  }
  const ac=chooseAttacker(attTeam,q,defTeam),att=ac.player;
  // v152: 攻撃の種類（通常／クイック／ブロード／バックアタック）を確定させる
  const aKind=ac.kind||'normal';
  currentAttackKind=aKind;
  const aq=effectiveCutQualityFor(aKind,q);
  if(setter)addActionStat(stats,'toss',attTeam.name,setter.name,q==='A'?'Aトス':q==='B'?'Bトス':'崩れトス');
  pointLog.push(`配球判定：${ac.detail} → ${resultTag(nameSpan(attTeam.name,att.name))}`);
  // v154: 特殊攻撃のときは「〇〇のスパイク！」を出さず、特殊攻撃名の実況だけにする。
  if(aKind==='normal')pointLog.push(playLineHtml(attackNarrative(attTeam,att,q),'attack'));
  addAttackKindStat(stats,attTeam.name,att.name,aKind);
  // v153: 実況行は playLineHtml で包む。生のまま push していたため、
  //        実況の書式（.match-play-line）が付かず計算ログと同じ見え方になっていた。
  if(aKind!=='normal')pointLog.push(playLineHtml(`${nameSpan(attTeam.name,att.name)}の${specialAttackNameOf(aKind,att)}！！`,'attack'));

  const ctrl=eff(attTeam,att,'spikeControl')*moodMod(att);
  const amr=clamp((.15-(ctrl-10)*.006+(aq==='崩れ'?(setterHas(attTeam,'二段トス適性')?.035:.07):aq==='B'?.03:0))*specialAttackMissMultiplier(aKind),.02,.28);
  const aroll=Math.random();
  pointLog.push(`スパイクミス判定：制球${num(ctrl)} → ミス率${pct(amr)} / 乱数${num(aroll,3)} → ${aroll<amr?resultTag('ミス'):resultTag('成功')}`);
  if(aroll<amr){
    addActionStat(stats,'spike',attTeam.name,att.name,'ミス');
    watchAwardPoint(sess,defTeam.name,'スパイクアウト',att.name,pointLog);
    pointLog.push(resultLineHtml('スパイクミス',`${sess.os}-${sess.ps}`));
    return {done:true};
  }
  currentAttackTeam=attTeam;currentAttackQuality=aq;
  const av=attackCalc(attTeam,att,q,luck,aKind),bv=blockCalc(defTeam,att,aKind==='normal'&&shouldOneBlock(q,att),luck),ad=av.value-bv.value;
  pointLog.push(`攻撃値：${aKind!=='normal'?`【${av.attackName}】${aKind==='quick'?`決定力減衰${num(av.quickDecay)}%　`:''}`:''}(${av.spBaseLabel}${num(av.sp)}×0.75+J${num(av.jp)}×0.375)×${num(av.r,2)}+身長${num(av.h)}×0.375+トス${num(av.to)}×0.20+補正${av.cb}${attackHandNote(att)}${attackSpecialNote(att,q)}${aceAuraNote(att,attTeam)}${setterTossAddNote(attTeam)}=${num(av.value)}`);
  pointLog.push(`ブロック値：${bv.oneBlock?'1枚ブロック。':''}${bv.fastTossNoSecond?'高速トス発動で2枚目ブロック無効。':''}${bv.specialBlockNote?bv.specialBlockNote+'。':''}${bv.blockTacticNote?bv.blockTacticNote+'。':''}${bv.quickBlockNote?bv.quickBlockNote+'。':''}正面${nameSpan(defTeam.name,bv.main.name)} = (シャット${num(bv.mainBase)}×0.75 + J${num(bv.mainJump)}×0.375)×0.9×乱数${num(bv.mr,2)} + 身長${num(bv.mainHeight)}×0.375${bv.blockTacticMult&&bv.blockTacticMult!==1?`×指示${num(bv.blockTacticMult,2)}`:''} = ${num(bv.mv)} / 隣${bv.neigh?nameSpan(defTeam.name,bv.neigh.name):'なし'} = ${bv.neigh?`((シャット${num(bv.neighBase)}×0.75 + J${num(bv.neighJump)}×0.375)×0.9×乱数${num(bv.nr,2)} + 身長${num(bv.neighHeight)}×0.375)×参加率${num(bv.rate,2)}${bv.blockTacticMult&&bv.blockTacticMult!==1?`×指示${num(bv.blockTacticMult,2)}`:''} = ${num(bv.nv)}`:'0'} / 合計${num(bv.value)}`);
  pointLog.push(`攻撃差：${num(ad)} → ${resultTag(blockResult(ad))}`);
  const br=blockResult(ad);
  if(ad>=0)pointLog.push(playLineHtml(blockNarrative(defTeam,bv.main,br),'block'));
  addActionStat(stats,'block',defTeam.name,bv.main.name,br);
  if(bv.neigh)addActionStat(stats,'block',defTeam.name,bv.neigh.name,br);
  if(ad<0){
    const feint=tryFeintAfterShutdown(attTeam,defTeam,att,ctrl,luck,pointLog,stats,(teamName,reason,playerName)=>watchAwardPoint(sess,teamName,reason,playerName,pointLog),()=>`${sess.os}-${sess.ps}`);
    if(feint)return feint;
    pointLog.push(playLineHtml(blockNarrative(defTeam,bv.main,br),'block'));
    addActionStat(stats,'spike',attTeam.name,att.name,'被シャット');
    watchAwardPoint(sess,defTeam.name,'シャットアウト',bv.main.name,pointLog);
    pointLog.push(resultLineHtml('シャットアウト',`${sess.os}-${sess.ps}`));
    return {done:true};
  }
  if(ad>=16){
    addActionStat(stats,'spike',attTeam.name,att.name,'ノータッチ');
    watchAwardPoint(sess,attTeam.name,'スパイクノータッチ',att.name,pointLog);
    pointLog.push(resultLineHtml('ノータッチ級',`${sess.os}-${sess.ps}`));
    return {done:true};
  }
  if(ad>=0 && ad<6 && hasSpecial(att,'ブロックアウト') && Math.random()<clamp(ctrl/100,0,1)){
    addActionStat(stats,'spike',attTeam.name,att.name,'得点');
    watchAwardPoint(sess,attTeam.name,'ブロックアウト',att.name,pointLog);
    pointLog.push(resultLineHtml(`${nameSpan(attTeam.name,att.name)}のブロックアウト`,`${sess.os}-${sess.ps}`));
    return {done:true};
  }
  const complete=ad>=11;
  const digNeedNote=ad<3?'ワンタッチ大：ディグ難度×0.5':ad<6?'ワンタッチ小：ディグ難度×0.75':ad>=11?'完全突破':'通常突破';
  const dg=chooseDigger(defTeam,ctrl,complete,att),dp=dg.player;defTeam._lastDiggerId=dp?dp.id:null;applyMoodMakerBias(defTeam,dp,luck);const dr=fairRand(defTeam.name,.85,1.15,luck);
  const baseNeedFactor=ad<3?.5:ad<6?.75:1;
  const needFactor=oneTouchNeedFactor(baseNeedFactor,setter,bv);
  const need=av.value*needFactor;
  const heavy=heavyBallFactor(att,pointLog);
  const wideDig=hasSpecial(dp,'広い守備範囲')?1.10:1;const domainDig=guardianDomainRangeMultiplier(dp,pointLog,'ディグ守備範囲');const dv=eff(defTeam,dp,'recDig')*wideDig*domainDig*heavy*flyingReceiveMultiplier(dp,pointLog,'ディグ')*1.25*moodMod(dp)*dr;
  let dd=dv-need,digRes=digResult(dd);
  if(guardianAdjust(dp,dd,'ディグ',pointLog)){digRes='崩れ';dd=-4;}
  pointLog.push(`ディグ対象：${dg.detail} → ${resultTag(nameSpan(defTeam.name,dp.name))} / ${digNeedNote}${oneTouchNeedNote(baseNeedFactor,att,bv)}`);
  pointLog.push(`ディグ判定：ディグ${num(eff(defTeam,dp,'recDig'))}×広い守備範囲${num(wideDig,2)}×絶対守護領域${num(domainDig,2)}×重い球${num(heavy,2)}×1.25×調子${num(moodMod(dp),2)}×乱数${num(dr,2)}=${num(dv)} - 難度${num(need)} = ${num(dd)} → ${resultTag(digRes)}`);
  pointLog.push(playLineHtml(digNarrative(defTeam,dp,digRes),'dig'));
  addActionStat(stats,'dig',defTeam.name,dp.name,digRes);
  if(dd<-4){
    addActionStat(stats,'spike',attTeam.name,att.name,'得点');
    watchAwardPoint(sess,attTeam.name,complete?'スパイク完全突破':'スパイク得点',att.name,pointLog);
    pointLog.push(resultLineHtml('スパイク得点',`${sess.os}-${sess.ps}`));
    return {done:true};
  }
  addActionStat(stats,'spike',attTeam.name,att.name,'継続');
  const nextQ=digRes==='A返球'?'A':digRes==='B返球'?'B':'崩れ';
  pointLog.push(playLineHtml(rallyContinueNarrative(defTeam,digRes),'continue'));
  return {done:false,attTeam:defTeam,defTeam:attTeam,q:nextQ};
}

// v181: 観戦中はどちらのサーブかを常に出す（Tak指示）。
//        従来は若葉のサーブのときだけ出していたため、相手サーブで始まると誰が打つのか分からなかった。
// v184: 名前だけを出す。校名とポジションの括弧書きは指示に無い付け足しだったので外した（Tak指示）。
//        どちらのサーブかは nameSpan がチームごとに色を変えるので分かる。
function watchNextServerLine(sess){
  if(!sess || sess.done)return null;
  const isOwn=sess.serv==='own';
  const team=isOwn?sess.own:sess.opp;
  if(!team||!team.players)return null;
  const sid=serverId(team);
  const sp=team.players[sid];
  if(!sp)return null;
  return `<strong>次のサーブ：</strong>${nameSpan(team.name,sp.name)}`;
}
function appendWatchNextServerLine(sess){
  const line=watchNextServerLine(sess);
  if(line)sess.log.push(line);
}

function simulateWatchPoint(){
  const sess=watchMatchSession;
  if(!sess || sess.done){renderAll();return;}
  const {own,opp,stats,luck}=sess;
  const pointLog=[`<div class="watch-point-divider"></div>`];
  own.isServing=sess.serv==='own';opp.isServing=sess.serv==='opp';currentRallyScore={own:sess.os,opp:sess.ps};
  const st=sess.serv==='own'?own:opp,rt=sess.serv==='own'?opp:own,server=st.players[serverId(st)];
  let sc=eff(st,server,'serveControl')*moodMod(server)*clutchMultiplier(server,st)*serveCraftMultiplier(server,pointLog),sp0=eff(st,server,'servePower')*moodMod(server)*clutchMultiplier(server,st);
  const jumpServe=server.special&&server.special.includes('ジャンプサーブ');
  if(jumpServe){pointLog.push(`${nameSpan(st.name,server.name)}のジャンプサーブ発動！！ 強烈なサーブが飛ぶ。`);sp0*=1.2;sc*=0.75;}
  // v151: サーブ指示の倍率。ミス率は既存式のあとに掛け、最後に1%〜30%へ収める。
  const svOrder=serveOrderOf(st);
  const miss=clamp(clamp(.12-(sc-10)*.004,.02,.22)*svOrder.miss,SERVE_MISS_MIN,SERVE_MISS_MAX),roll=Math.random();
  pointLog.push(`<div class="rally-head">#${sess.n} ${scoreBadgeHtml(`${sess.os}-${sess.ps}`)}</div>`);
  pointLog.push(playLineHtml(`${nameSpan(st.name,server.name)}がサーブを打つ。`,'serve'));
  pointLog.push(`サーブミス判定：制球${num(sc)} → ミス率${pct(miss)} / 乱数${num(roll,3)} → ${roll<miss?resultTag('ミス'):resultTag('成功')}`);
  addActionStat(stats,'serve',st.name,server.name,roll<miss?'ミス':'成功');
  // v151: 指示に従って打った選手に、対応する能力の経験点を微加算する（成功・失敗を問わない）
  if(svOrder.xpKey && isOwnTeamName(st.name)){
    const owner=state.players.find(x=>x.name===server.name);
    if(owner)addXpDelta(owner,svOrder.xpKey,1);
  }
  if(roll<miss){
    watchAwardPoint(sess,rt.name,'サーブミス',server.name,pointLog);
    pointLog.push(resultLineHtml('サーブミス',`${sess.os}-${sess.ps}`));
    sess.n++;
    sess.log.push(...pointLog);
    appendWatchNextServerLine(sess);
    state.matchLog=sess.log;
    if(setIsOver(sess.os,sess.ps))finalizeWatchMatch(sess);
    state.lastMatchSummary=`観戦中：${ownSchoolName()} ${sess.os}-${sess.ps} ${opp.name}`;
    renderAll();saveState();return;
  }
  // v142: サーブ値は威力75%＋制球25%の合成にし、乱数幅もレセプションと同じ0.85〜1.15に揃える。
  //        従来は威力そのままで乱数0.75〜1.35（平均1.05・幅2倍）だったため、サーブ側が構造的に有利だった。
  const sBase=serveStrength(sp0,sc)*svOrder.power;
  const sr=fairRand(st.name,.85,1.15,luck),sv=sBase*sr,rc=chooseReceiver(rt,sc,server,svOrder),rv=rc.player,rr=fairRand(rt.name,.85,1.15,luck); rt._lastReceiverId=rc.gap?null:rv.id;
  if(rc.gap){
    pointLog.push(`サーブ値：威力${num(sp0)}×0.75＋制球${num(sc)}×0.25${svOrder.power!==1?`ד${svOrder.label}”${svOrder.power}`:''}＝${num(sBase)} ×${num(sr,2)}=${num(sv)}`);
    pointLog.push(`受け手選択：${rc.detail} → ${resultTag('守備の間へ')}`);
    pointLog.push(playLineHtml(`${nameSpan(st.name,server.name)}、狙いすましたサーブ！　選手と選手の間に落ちてしまった。サービスエース！`,'serve'));
    addActionStat(stats,'reception',rt.name,'守備の間','サービスエース');
    addActionStat(stats,'serve',st.name,server.name,'サービスエース');
    watchAwardPoint(sess,st.name,'サービスエース',server.name,pointLog);
    pointLog.push(resultLineHtml('サービスエース',`${sess.os}-${sess.ps}`));
    sess.n++;
    sess.log.push(...pointLog);
    appendWatchNextServerLine(sess);
    state.matchLog=sess.log;
    if(setIsOver(sess.os,sess.ps))finalizeWatchMatch(sess);
    state.lastMatchSummary=`観戦中：${ownSchoolName()} ${sess.os}-${sess.ps} ${opp.name}`;
    renderAll();saveState();return;
  }
  let recv=eff(rt,rv,'recReception')*moodMod(rv)*rr*flyingReceiveMultiplier(rv,pointLog,'レセプション');if(hasSpecial(rv,'サーブレシーブ職人')){recv*=1.10;pointLog.push(`${nameSpan(rt.name,rv.name)}のサーブレシーブ職人発動！！ 難しいボールを的確に返す。`);}const diff=recv-sv;
  let q=cutQuality(diff);
  if(guardianAdjust(rv,diff,'レセプション',pointLog))q='崩れ';
  pointLog.push(`サーブ値：威力${num(sp0)}×0.75＋制球${num(sc)}×0.25${svOrder.power!==1?`ד${svOrder.label}”${svOrder.power}`:''}＝${num(sBase)} ×${num(sr,2)}=${num(sv)}`);
  pointLog.push(`受け手選択：${rc.detail} → ${resultTag(nameSpan(rt.name,rv.name))}`);
  pointLog.push(`レセプション判定：${num(recv)} - ${num(sv)} = ${num(diff)} → ${resultTag(q)}`);
  pointLog.push(playLineHtml(receptionNarrative(rt,rv,q),'receive'));
  addActionStat(stats,'reception',rt.name,rv.name,q==='サービスエース'?'サービスエース':q==='チャンス返球'?'チャンス返球':q+'カット');
  let attTeam=rt,defTeam=st,attackQ=q;
  if(q==='サービスエース'){
    addActionStat(stats,'serve',st.name,server.name,'サービスエース');
    watchAwardPoint(sess,st.name,'サービスエース',server.name,pointLog);
    pointLog.push(resultLineHtml('サービスエース',`${sess.os}-${sess.ps}`));
    sess.n++;
    sess.log.push(...pointLog);
    appendWatchNextServerLine(sess);
    state.matchLog=sess.log;
    if(setIsOver(sess.os,sess.ps))finalizeWatchMatch(sess);
    state.lastMatchSummary=`観戦中：${ownSchoolName()} ${sess.os}-${sess.ps} ${opp.name}`;
    renderAll();saveState();return;
  }
  if(q==='チャンス返球'){
    pointLog.push(`チャンス返球：${st.name}がそのまま攻撃を組み立てます。`);
    attTeam=st;defTeam=rt;attackQ='B';
  }
  let guard=0,phase={done:false,attTeam,defTeam,q:attackQ};
  while(!phase.done && guard<30 && !setIsOver(sess.os,sess.ps)){
    own.isServing=sess.serv==='own';opp.isServing=sess.serv==='opp';
    phase=watchAttackPhase(sess,phase.attTeam,phase.defTeam,phase.q,pointLog);
    guard++;
  }
  if(!phase.done){
    const atk=phase.attTeam,df=phase.defTeam;
    const atkPower=avg(effectiveFrontPlayers(atk).map(p=>eff(atk,p,'spikePower')+eff(atk,p,'jump')*.25+heightPoint(p.height)*.25));
    const defPower=avg(courtBackPlayers(df).map(p=>eff(df,p,'recDig')*1.25));
    const finalDiff=atkPower-defPower+rand(-3,3);
    const teamName=finalDiff>=0?atk.name:df.name;
    watchAwardPoint(sess,teamName,finalDiff>=0?'長期ラリー攻撃勝ち':'長期ラリー守備勝ち','チーム',pointLog);
    pointLog.push(resultLineHtml(finalDiff>=0?'長期ラリー攻撃勝ち':'長期ラリー守備勝ち',`${sess.os}-${sess.ps}`));
  }
  sess.n++;
  sess.log.push(...pointLog);
  appendWatchNextServerLine(sess);
  state.matchLog=sess.log;
  if(setIsOver(sess.os,sess.ps))finalizeWatchMatch(sess);
  state.lastMatchSummary=sess.done?state.lastMatchSummary:`観戦中：${ownSchoolName()} ${sess.os}-${sess.ps} ${opp.name}`;
  renderAll();saveState();
}
function pairForSubSlot(sess,slotKey){
  const slotIndex=Number(slotKey);
  const currentId=sess.own.rotation[slotIndex];
  const originalId=Object.keys(sess.pairByOriginal).find(oid=>{
    const pair=sess.pairByOriginal[oid];
    return !pair.isLibero && pair.currentId===currentId;
  }) || currentId;
  return sess.pairByOriginal[originalId];
}
function eligibleSubCandidatesForSlot(sess,slotKey){
  // v93: リベロ枠。ベンチの未使用選手から選ぶ（L適性の選手を先に並べる）
  if(slotKey==='L'){
    const used=new Set(Object.values(sess.pairByOriginal).map(p=>p.benchId).filter(Boolean));
    const list=sess.benchIds.filter(id=>!used.has(id)&&id!==sess.own.libero)
      .map(id=>state.players.find(p=>p.id===id)).filter(Boolean);
    return list.sort((a,b)=>((b.role==='L')-(a.role==='L'))*100+(deriveStats(b).receive-deriveStats(a).receive));
  }
  const pair=pairForSubSlot(sess,slotKey);
  if(!pair)return [];
  // v181: 交代が一往復して元の選手がコートに戻ったら、その枠はもう動かせない（Tak指示）。
  //        同じ相手であっても再交代させない。
  if(pair.roundTripDone)return [];
  if(pair.benchId){
    const targetId=pair.currentId===pair.originalId?pair.benchId:pair.originalId;
    return state.players.filter(p=>p.id===targetId);
  }
  const used=new Set(Object.values(sess.pairByOriginal).map(p=>p.benchId).filter(Boolean));
  return sess.benchIds.filter(id=>!used.has(id)).map(id=>state.players.find(p=>p.id===id)).filter(Boolean);
}
function applyWatchSubstitution(slotKey,newId){
  const sess=watchMatchSession;
  if(!sess || sess.done)return;
  // v93: リベロ枠の交代
  if(slotKey==='L'){
    const cand=eligibleSubCandidatesForSlot(sess,'L').map(p=>p.id);
    if(!cand.includes(newId)){managerSay('この選手はリベロには入れません。');return;}
    const raw=state.players.find(x=>x.id===newId);
    if(!raw)return;
    const outId=sess.own.libero;
    sess.own.players[newId]=cloneForMatchRole(raw,'L');
    sess.own.libero=newId;
    sess.liberoId=newId;
    if(!sess.usedBenchIds.includes(newId))sess.usedBenchIds.push(newId);
    const outName=state.players.find(x=>x.id===outId)?.name||outId;
    sess.log.push(`<strong>選手交代：</strong>リベロ ${nameSpan('若葉高校',outName)} に代えて ${nameSpan('若葉高校',raw.name)} が入りました。`);
    state.matchLog=sess.log;
    managerSay('リベロを交代しました。');
    renderAll();saveState();
    return;
  }
  const pair=pairForSubSlot(sess,slotKey);
  if(!pair){managerSay('この枠は交代情報を確認できません。');return;}
  const candidates=eligibleSubCandidatesForSlot(sess,slotKey).map(p=>p.id);
  if(!candidates.includes(newId)){managerSay('この選手はこの枠では交代できません。');return;}
  if(!pair.benchId && newId!==pair.originalId)pair.benchId=newId;
  const wasOut=pair.benchId && pair.currentId===pair.benchId;
  pair.currentId=newId;
  // v181: ベンチに下がっていた枠へ元の選手が戻ってきた＝一往復。ここで打ち止めにする。
  if(wasOut && newId===pair.originalId)pair.roundTripDone=true;
  const slotIndex=Number(slotKey);
  sess.own.rotation[slotIndex]=newId;
  refreshWatchOwnTeamRoles(sess);
  sess.tossTargetIds=sessionTossTargetIds(sess).filter(id=>sess.own.players[id]);
  const p=state.players.find(x=>x.id===newId);
  const label=rotationPositionLabel(Number(slotKey),pair.role);
  sess.log.push(`<strong>選手交代：</strong>${label} に ${nameSpan('若葉高校',p?.name||newId)} が入りました。`);
  // v184: 「交代が一往復したため…」の断り書きは出さない（Tak指示）。
  //        交代できない枠は候補が空になるので、そちらで分かる。
  state.matchLog=sess.log;
  managerSay('選手交代を行いました。');
  renderAll();saveState();
}

function updateWatchTactic(kind,id){
  const sess=watchMatchSession;
  if(!sess || sess.done)return;
  if(kind==='toss' || kind==='toss2'){
    // v138: ①②の2枠。同じ選手を両方に入れた場合は後から入れた側を空にする。
    const slot=kind==='toss'?0:1;
    const cur=sessionTossTargetIds(sess);
    const next=[cur[0]||'',cur[1]||''];
    next[slot]=id||'';
    if(next[0] && next[0]===next[1])next[slot===0?1:0]='';
    sess.tossTargetIds=normalizeTossTargetIds(next.filter(Boolean));
    state.matchTossTargetIds=sess.tossTargetIds.slice();
    state.matchTossTargetId=sess.tossTargetIds[0]||'';
    const names=sess.tossTargetIds.map((tid,i)=>`${i===0?'①':'②'}${nameSpan(ownSchoolName(),sess.own.players[tid]?.name||tid)}`);
    sess.log.push(`<strong>配球指示変更：</strong>${names.length?names.join(' / '):'指定なし'}`);
    managerSay(names.length
      ? (sess.tossTargetIds.length>1
          ? `${sess.own.players[sess.tossTargetIds[0]]?.name}を軸に、${sess.own.players[sess.tossTargetIds[1]]?.name}も絡めていきます。`
          : `${sess.own.players[sess.tossTargetIds[0]]?.name}への配球を増やします。`)
      : '配球指示を解除しました。');
  }else if(kind==='serve'){
    // v151: サーブ指示は4択。並立させないので、選んだものだけが有効になる。
    sess.serveOrder=normalizeServeOrder(id);
    state.matchServeOrder=sess.serveOrder;
    const o=SERVE_ORDERS[sess.serveOrder];
    sess.log.push(`<strong>サーブ指示変更：</strong>${o.label}`);
    managerSay(sess.serveOrder==='none'?'サーブは自然に打たせます。':`サーブは「${o.label}」でいきます。`);
  }else if(kind==='block'){
    sess.blockTargetId=normalizeBlockTargetRole(id);
    state.matchBlockTargetId=sess.blockTargetId;
    sess.log.push(`<strong>ブロック指示変更：</strong>${blockTargetRoleLabel(sess.blockTargetId)}`);
    managerSay(sess.blockTargetId?`${blockTargetRoleLabel(sess.blockTargetId)}に変更しました。対象ポジションの攻撃にはブロックを厚くします。`:'ブロック指示を解除しました。通常のブロック配置で守ります。');
  }
  state.matchLog=sess.log;
  renderAll();saveState();
}
function renderMatchTacticsPanel(){
  const el=document.getElementById('matchTacticsPanel');
  if(!el)return;
  const sess=watchMatchSession;
  // v188: 試合中でないときは枠ごと消す。空の箱を残すと「結果を見る」の下に余白ができる（Tak指示）。
  if(!sess || sess.done){el.className='substitution-panel disabled top-gap hidden';el.innerHTML='';return;}
  const ownOptions=['<option value="">指定なし</option>'].concat(sess.own.rotation.map(id=>sess.own.players[id]).filter(p=>p&&p.id!==sess.own.setter).map(p=>`<option value="${p.id}">${p.name} / ${rotationPositionLabel(sess.own.rotation.indexOf(p.id),p.role)}</option>`)).join('');
  const blockOptions=['','OH','MB','OP'].map(role=>`<option value="${role}">${blockTargetRoleLabel(role)}</option>`).join('');
  sess.tossTargetIds=sessionTossTargetIds(sess).filter(id=>sess.own.players[id]&&id!==sess.own.setter);
  const tossIds=sess.tossTargetIds;
  sess.blockTargetId=normalizeBlockTargetRole(sess.blockTargetId||state.matchBlockTargetId||'');
  sess.serveOrder=normalizeServeOrder(sess.serveOrder||state.matchServeOrder||'none');
  const serveOptions=Object.entries(SERVE_ORDERS).map(([k,o])=>`<option value="${k}">${o.label}</option>`).join('');
  el.className='substitution-panel top-gap';
  el.innerHTML=`<strong>試合中指示</strong>${helpButtonHtml('matchTactics')}
    <div class="sub-row top-gap">
      <label>配球指示①<select id="tossTargetSelect" class="sub-select">${ownOptions}</select></label>
      <label>配球指示②<select id="tossTargetSelect2" class="sub-select">${ownOptions}</select></label>
      <label>ブロック指示<select id="blockTargetSelect" class="sub-select">${blockOptions}</select></label>
      <label>サーブ指示<select id="serveOrderSelect" class="sub-select">${serveOptions}</select></label>
    </div>
`;
  const ts=document.getElementById('tossTargetSelect');
  const ts2=document.getElementById('tossTargetSelect2');
  const bs=document.getElementById('blockTargetSelect');
  if(ts){ts.value=tossIds[0]||'';ts.onchange=()=>updateWatchTactic('toss',ts.value);}
  if(ts2){ts2.value=tossIds[1]||'';ts2.onchange=()=>updateWatchTactic('toss2',ts2.value);}
  if(bs){bs.value=normalizeBlockTargetRole(sess.blockTargetId||'');bs.onchange=()=>updateWatchTactic('block',bs.value);}
  const so=document.getElementById('serveOrderSelect');
  if(so){so.value=sess.serveOrder;so.onchange=()=>updateWatchTactic('serve',so.value);}
}

function renderSubstitutionPanel(){
  const el=document.getElementById('substitutionPanel');
  if(!el)return;
  const sess=watchMatchSession;
  // v188: 試合中でないときは枠ごと消す（Tak指示）。
  if(!sess || sess.done){
    el.className='substitution-panel disabled top-gap hidden';
    el.innerHTML='';
    return;
  }
  const slotOptions=sess.own.rotation.map((id,i)=>{
    const p=sess.own.players[id];
    return `<option value="${i}">${rotationPositionLabel(i,p?.role)}：${p?.name||id}</option>`;
  }).join('')
  // v93: リベロも交代できるようにする
  +(()=>{const lp=sess.own.players[sess.own.libero];return `<option value="L">リベロ：${lp?lp.name:'—'}</option>`;})();
  const prev=document.getElementById('subSlotSelect')?.value;
  const slotKey=(prev!==undefined&&prev!==null&&prev!=='')?prev:'0';
  const candidates=eligibleSubCandidatesForSlot(sess,slotKey);
  const candOptions=candidates.length?candidates.map(p=>`<option value="${p.id}">${p.name} / ${p.height}cm / ${p.role}</option>`).join(''):'<option value="">交代候補なし</option>';
  // v169: 交代候補もスタメンと同じ形に揃える。元気度バーはやめて、顔グラの下にバッジだけを出す。
  const detail=candidates.map(p=>`<button type="button" class="sub-candidate-card" data-player-id="${p.id}"><div class="lineup-face-col">${p.portrait?`<img class="lineup-face" src="${p.portrait}" alt="">`:''}<span class="lineup-genki-under">${genkiBadgeHtml(p,{size:13,numberOnly:true})}</span></div><div class="lineup-main"><strong class="lineup-player-name">${p.name}</strong><div class="meta">${p.height}cm</div></div><div class="match-lineup-stats">${statGradeLine(p)}${starterMiniGradeLine(p)}</div></button>`).join('');
  el.className='substitution-panel top-gap';
  el.innerHTML=`<strong>選手交代</strong>
    <div class="sub-row top-gap">
      <label>交代する位置<select id="subSlotSelect" class="sub-select">${slotOptions}</select></label>
      <label>入れる選手<select id="subCandidateSelect" class="sub-select">${candOptions}</select></label>
      <button id="applySubBtn" class="primary small" ${candidates.length?'':'disabled'}>交代</button>
    </div>
    <div class="sub-candidate-detail">${detail?`<div class="sub-candidate-grid">${detail}</div>`:'<span class="muted">候補がいません。</span>'}</div>`;
  const s=document.getElementById('subSlotSelect'); if(s){s.value=slotKey;s.onchange=()=>renderSubstitutionPanel();}
  document.querySelectorAll('.sub-candidate-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const sel=document.getElementById('subCandidateSelect');
      if(sel)sel.value=card.dataset.playerId;
      document.querySelectorAll('.sub-candidate-card').forEach(c=>c.classList.remove('active'));
      card.classList.add('active');
    });
  });
  document.getElementById('applySubBtn')?.addEventListener('click',()=>{
    const sk=document.getElementById('subSlotSelect')?.value||'0';
    const ni=document.getElementById('subCandidateSelect')?.value;
    if(ni)applyWatchSubstitution(sk,ni);
  });
}
// v104: 試合の進め方は「結果を見る」と「1点ずつ見る」の2通り。
// 1点ずつ見ている途中でも「結果を見る」を押せば、残りを一気に進めて結果まで飛べる。
function finishWatchMatchNow(){
  const sess=watchMatchSession;
  if(!sess || sess.done)return false;
  let guard=0;
  while(watchMatchSession && !watchMatchSession.done && guard++<2000){
    simulateWatchPoint();
  }
  return true;
}
function renderMatchControls(){
  const next=document.getElementById('nextPointBtn');
  const start=document.getElementById('startWatchMatchBtn');
  const sim=document.getElementById('simulateMatchBtn');
  const status=document.getElementById('watchMatchStatus');
  const active=!!watchMatchSession && !watchMatchSession.done;
  if(next)next.disabled=!active;
  if(start)start.disabled=active || !canPlayCurrentMatch();
  // 観戦中は「結果を見る」で残りを省略できるようにする
  if(sim)sim.disabled=active ? false : !canPlayCurrentMatch();
  if(status){
    let serveInfo='';
    if(active && watchMatchSession.serv==='own'){
      const sid=serverId(watchMatchSession.own);
      const sp=watchMatchSession.own.players[sid];
      serveInfo=sp?` / 次サーバー：${sp.name}`:' / 次サーバー：未確認';
    }
    if(status)status.textContent=active?`観戦モード：${ownSchoolName()} ${watchMatchSession.os}-${watchMatchSession.ps} ${watchMatchSession.opp.name} / 次の1点を待機中${serveInfo}`:watchMatchSession?.done?'観戦モード：試合終了':'観戦モード：未開始';
  }
  renderMatchTacticsPanel();
  renderSubstitutionPanel();
}

function simulateMatch(){
  const tour=practiceMatchActive()?{type:'practice',name:practiceMatchKindLabel(),round:0}:isTournamentTurn();
  if(!tour){
    state.matchLog=['試合予定がないため、試合は行えません。'];
    state.lastMatchSummary='試合不可';
    managerSay('試合予定がありません。');
    return;
  }
  if(tour.type!=='practice'&&currentTournamentEliminated(tour)){
    state.matchLog=['すでに敗退しているため、この大会の試合は行えません。'];
    state.lastMatchSummary='試合不可';
    managerSay('すでに敗退しているため、この大会の試合は行えません。');
    return;
  }
  if(tour.type!=='practice'){
    state.pendingTournamentMatchKey=null;
    state.pendingTournamentOpponentName=null;
    state.pendingTournamentIntroMessage=null;
  }

  // v199: 練習試合系はここで実際に体力を全快にする（画面の元気度も全快になる）。
  beginPracticeMatchStamina();
  const own=buildOwnTeam(),opp=buildOpp(tour),log=[],stats=newMatchStats(),luck=newLuckBalance(opp.name);
  currentLogOpponentPlayers=opp.players||null;
  recordNationalStarterExperience(tour,own);
  luck._teamByName={[own.name]:own,[opp.name]:opp};
  if(luck._omikujiResult)log.push(`神社のおみくじ結果：${luck._omikujiResult} / ${ownSchoolName()}のランダム補正 ${omikujiBonusText(luck._omikujiBonus)}`);
  let os=0,ps=0,serv='own',n=1;
  const fatiguePending=newMatchFatigueBucket();
  const awardPoint=(teamName,reason,playerName='チーム')=>{
    addMatchFatigueForRally(own,fatiguePending);
    if(isOwnTeamName(teamName))os++;else ps++;
    const ap=applyPoint(teamName,own,opp,serv);
    serv=ap.serv;
    addMatchStat(stats,teamName,playerName,reason);
    flowChangerAfterPoint(teamName,playerName,reason,log);
  };
  const attackPhase=(attTeam,defTeam,q)=>{
    const setter=effectiveSetterForAttack(attTeam);
    if(setter){
      const two=tryTwoAttack(attTeam,defTeam,q,log,stats,luck,(teamName,reason,playerName)=>awardPoint(teamName,reason,playerName),()=>`${os}-${ps}`);
      if(two)return two;
    }
    const ac=chooseAttacker(attTeam,q,defTeam),att=ac.player;
    const aKind=ac.kind||'normal';
    currentAttackKind=aKind;
    const aq=effectiveCutQualityFor(aKind,q);
    if(setter)addActionStat(stats,'toss',attTeam.name,setter.name,q==='A'?'Aトス':q==='B'?'Bトス':'崩れトス');
    log.push(`配球判定：${ac.detail} → ${resultTag(nameSpan(attTeam.name,att.name))}`);
    if(aKind==='normal')log.push(playLineHtml(attackNarrative(attTeam,att,q),'attack'));
    addAttackKindStat(stats,attTeam.name,att.name,aKind);
    if(aKind!=='normal')log.push(playLineHtml(`${nameSpan(attTeam.name,att.name)}の${specialAttackNameOf(aKind,att)}！！`,'attack'));

    const ctrl=eff(attTeam,att,'spikeControl')*moodMod(att);
    const amr=clamp((.15-(ctrl-10)*.006+(aq==='崩れ'?(setterHas(attTeam,'二段トス適性')?.035:.07):aq==='B'?.03:0))*specialAttackMissMultiplier(aKind),.02,.28);
    const aroll=Math.random();
    log.push(`スパイクミス判定：制球${num(ctrl)} → ミス率${pct(amr)} / 乱数${num(aroll,3)} → ${aroll<amr?resultTag('ミス'):resultTag('成功')}`);
    if(aroll<amr){
      addActionStat(stats,'spike',attTeam.name,att.name,'ミス');
      awardPoint(defTeam.name,'スパイクアウト',att.name);
      log.push(resultLineHtml('スパイクミス',`${os}-${ps}`));
      return {done:true};
    }

    currentAttackTeam=attTeam;currentAttackQuality=aq;const av=attackCalc(attTeam,att,q,luck,aKind),bv=blockCalc(defTeam,att,aKind==='normal'&&shouldOneBlock(q,att),luck),ad=av.value-bv.value;
    log.push(`攻撃値：(決定${num(av.sp)}×0.75+J${num(av.jp)}×0.375)×${num(av.r,2)}+身長${num(av.h)}×0.375+トス${num(av.to)}×0.20+補正${av.cb}${attackHandNote(att)}${attackSpecialNote(att,q)}${aceAuraNote(att,attTeam)}${setterTossAddNote(attTeam)}=${num(av.value)}`);
    log.push(`ブロック値：${bv.oneBlock?'1枚ブロック。':''}${bv.fastTossNoSecond?'高速トス発動で2枚目ブロック無効。':''}${bv.specialBlockNote?bv.specialBlockNote+'。':''}${bv.blockTacticNote?bv.blockTacticNote+'。':''}${bv.quickBlockNote?bv.quickBlockNote+'。':''}正面${nameSpan(defTeam.name,bv.main.name)} = (シャット${num(bv.mainBase)}×0.75 + J${num(bv.mainJump)}×0.375)×0.9×乱数${num(bv.mr,2)} + 身長${num(bv.mainHeight)}×0.375${bv.blockTacticMult&&bv.blockTacticMult!==1?`×指示${num(bv.blockTacticMult,2)}`:''} = ${num(bv.mv)} / 隣${bv.neigh?nameSpan(defTeam.name,bv.neigh.name):'なし'} = ${bv.neigh?`((シャット${num(bv.neighBase)}×0.75 + J${num(bv.neighJump)}×0.375)×0.9×乱数${num(bv.nr,2)} + 身長${num(bv.neighHeight)}×0.375)×参加率${num(bv.rate,2)}${bv.blockTacticMult&&bv.blockTacticMult!==1?`×指示${num(bv.blockTacticMult,2)}`:''} = ${num(bv.nv)}`:'0'} / 合計${num(bv.value)}`);
    log.push(`攻撃差：${num(ad)} → ${resultTag(blockResult(ad))}`);
    const br=blockResult(ad);
    if(ad>=0)log.push(playLineHtml(blockNarrative(defTeam,bv.main,br),'block'));
    addActionStat(stats,'block',defTeam.name,bv.main.name,br);
    if(bv.neigh)addActionStat(stats,'block',defTeam.name,bv.neigh.name,br);

    if(ad<0){
      const feint=tryFeintAfterShutdown(attTeam,defTeam,att,ctrl,luck,log,stats,(teamName,reason,playerName)=>awardPoint(teamName,reason,playerName),()=>`${os}-${ps}`);
      if(feint)return feint;
      log.push(playLineHtml(blockNarrative(defTeam,bv.main,br),'block'));
      addActionStat(stats,'spike',attTeam.name,att.name,'被シャット');
      awardPoint(defTeam.name,'シャットアウト',bv.main.name);
      log.push(resultLineHtml('シャットアウト',`${os}-${ps}`));
      return {done:true};
    }
    if(ad>=16){
      addActionStat(stats,'spike',attTeam.name,att.name,'ノータッチ');
      awardPoint(attTeam.name,'スパイクノータッチ',att.name);
      log.push(resultLineHtml('ノータッチ級',`${os}-${ps}`));
      return {done:true};
    }
    if(ad>=0 && ad<6 && hasSpecial(att,'ブロックアウト') && Math.random()<clamp(ctrl/100,0,1)){
      addActionStat(stats,'spike',attTeam.name,att.name,'得点');
      awardPoint(attTeam.name,'ブロックアウト',att.name);
      log.push(resultLineHtml(`${nameSpan(attTeam.name,att.name)}のブロックアウト`,`${os}-${ps}`));
      return {done:true};
    }

    const complete=ad>=11;
    const digNeedNote=ad<3?'ワンタッチ大：ディグ難度×0.5':ad<6?'ワンタッチ小：ディグ難度×0.75':ad>=11?'完全突破':'通常突破';
    const dg=chooseDigger(defTeam,ctrl,complete,att),dp=dg.player;defTeam._lastDiggerId=dp?dp.id:null;applyMoodMakerBias(defTeam,dp,luck);const dr=fairRand(defTeam.name,.85,1.15,luck);
    const baseNeedFactor=ad<3?.5:ad<6?.75:1;
    const needFactor=oneTouchNeedFactor(baseNeedFactor,att,bv);
    const need=av.value*needFactor;
    const heavy=heavyBallFactor(att,log);
    const wideDig=hasSpecial(dp,'広い守備範囲')?1.10:1;const domainDig=guardianDomainRangeMultiplier(dp,log,'ディグ守備範囲');const dv=eff(defTeam,dp,'recDig')*wideDig*domainDig*heavy*flyingReceiveMultiplier(dp,log,'ディグ')*1.25*moodMod(dp)*dr;
    let dd=dv-need,digRes=digResult(dd);
    if(guardianAdjust(dp,dd,'ディグ',log)){digRes='崩れ';dd=-4;}
    log.push(`ディグ対象：${dg.detail} → ${resultTag(nameSpan(defTeam.name,dp.name))} / ${digNeedNote}${oneTouchNeedNote(baseNeedFactor,att,bv)}`);
    log.push(`ディグ判定：ディグ${num(eff(defTeam,dp,'recDig'))}×広い守備範囲${num(wideDig,2)}×絶対守護領域${num(domainDig,2)}×重い球${num(heavy,2)}×1.25×調子${num(moodMod(dp),2)}×乱数${num(dr,2)}=${num(dv)} - 難度${num(need)} = ${num(dd)} → ${resultTag(digRes)}`);
    log.push(playLineHtml(digNarrative(defTeam,dp,digRes),'dig'));
    addActionStat(stats,'dig',defTeam.name,dp.name,digRes);

    if(dd<-4){
      addActionStat(stats,'spike',attTeam.name,att.name,'得点');
      awardPoint(attTeam.name,complete?'スパイク完全突破':'スパイク得点',att.name);
      log.push(resultLineHtml('スパイク得点',`${os}-${ps}`));
      return {done:true};
    }

    addActionStat(stats,'spike',attTeam.name,att.name,'継続');
    const nextQ=digRes==='A返球'?'A':digRes==='B返球'?'B':'崩れ';
    log.push(playLineHtml(rallyContinueNarrative(defTeam,digRes),'continue'));
    return {done:false,attTeam:defTeam,defTeam:attTeam,q:nextQ};
  };

  triggerMoodMaker(log);log.push(`<strong>${tour.name}：${ownSchoolName()} vs ${opp.name}</strong>`);

  let rallyGuard=0;
  while(!setIsOver(os,ps) && rallyGuard++<1000){
    own.isServing=serv==='own';opp.isServing=serv==='opp';currentRallyScore={own:os,opp:ps};
    const st=serv==='own'?own:opp,rt=serv==='own'?opp:own,server=st.players[serverId(st)];
    let sc=eff(st,server,'serveControl')*moodMod(server)*clutchMultiplier(server,st)*serveCraftMultiplier(server,log),sp0=eff(st,server,'servePower')*moodMod(server)*clutchMultiplier(server,st);
    const jumpServe=server.special&&server.special.includes('ジャンプサーブ');
    if(jumpServe){log.push(`${nameSpan(st.name,server.name)}のジャンプサーブ発動！！ 強烈なサーブが飛ぶ。`);sp0*=1.2;sc*=0.75;}

    // v151: サーブ指示の倍率。ミス率は既存式のあとに掛け、最後に1%〜30%へ収める。
  const svOrder=serveOrderOf(st);
  const miss=clamp(clamp(.12-(sc-10)*.004,.02,.22)*svOrder.miss,SERVE_MISS_MIN,SERVE_MISS_MAX),roll=Math.random();
    log.push(`<div class="rally-head">#${n} ${scoreBadgeHtml(`${os}-${ps}`)}</div>`);
    log.push(playLineHtml(`${nameSpan(st.name,server.name)}がサーブを打つ。`,'serve'));
    log.push(`サーブミス判定：制球${num(sc)} → ミス率${pct(miss)} / 乱数${num(roll,3)} → ${roll<miss?resultTag('ミス'):resultTag('成功')}`);
    addActionStat(stats,'serve',st.name,server.name,roll<miss?'ミス':'成功');
  // v151: 指示に従って打った選手に、対応する能力の経験点を微加算する（成功・失敗を問わない）
  if(svOrder.xpKey && isOwnTeamName(st.name)){
    const owner=state.players.find(x=>x.name===server.name);
    if(owner)addXpDelta(owner,svOrder.xpKey,1);
  }
    if(roll<miss){
      awardPoint(rt.name,'サーブミス',server.name);
      log.push(resultLineHtml('サーブミス',`${os}-${ps}`));
      n++;
      continue;
    }

    // v142: サーブ値は威力75%＋制球25%の合成にし、乱数幅もレセプションと同じ0.85〜1.15に揃える。
  //        従来は威力そのままで乱数0.75〜1.35（平均1.05・幅2倍）だったため、サーブ側が構造的に有利だった。
  const sBase=serveStrength(sp0,sc)*svOrder.power;
  const sr=fairRand(st.name,.85,1.15,luck),sv=sBase*sr,rc=chooseReceiver(rt,sc,server,svOrder),rv=rc.player,rr=fairRand(rt.name,.85,1.15,luck); rt._lastReceiverId=rc.gap?null:rv.id;
    if(rc.gap){
      log.push(`サーブ値：威力${num(sp0)}×0.75＋制球${num(sc)}×0.25${svOrder.power!==1?`ד${svOrder.label}”${svOrder.power}`:''}＝${num(sBase)} ×${num(sr,2)}=${num(sv)}`);
      log.push(`受け手選択：${rc.detail} → ${resultTag('守備の間へ')}`);
      log.push(playLineHtml(`${nameSpan(st.name,server.name)}、狙いすましたサーブ！　選手と選手の間に落ちてしまった。サービスエース！`,'serve'));
      addActionStat(stats,'reception',rt.name,'守備の間','サービスエース');
      addActionStat(stats,'serve',st.name,server.name,'サービスエース');
      awardPoint(st.name,'サービスエース',server.name);
      log.push(resultLineHtml('サービスエース',`${os}-${ps}`));
      n++;
      continue;
    }
    let recv=eff(rt,rv,'recReception')*moodMod(rv)*rr*flyingReceiveMultiplier(rv,log,'レセプション');if(hasSpecial(rv,'サーブレシーブ職人')){recv*=1.10;log.push(`${nameSpan(rt.name,rv.name)}のサーブレシーブ職人発動！！ 難しいボールを的確に返す。`);}const diff=recv-sv;
    let q=cutQuality(diff);
    if(guardianAdjust(rv,diff,'レセプション',log))q='崩れ';
    log.push(`サーブ値：威力${num(sp0)}×0.75＋制球${num(sc)}×0.25${svOrder.power!==1?`ד${svOrder.label}”${svOrder.power}`:''}＝${num(sBase)} ×${num(sr,2)}=${num(sv)}`);
    log.push(`受け手選択：${rc.detail} → ${resultTag(nameSpan(rt.name,rv.name))}`);
    log.push(`レセプション判定：${num(recv)} - ${num(sv)} = ${num(diff)} → ${resultTag(q)}`);
    log.push(playLineHtml(receptionNarrative(rt,rv,q),'receive'));
    addActionStat(stats,'reception',rt.name,rv.name,q==='サービスエース'?'サービスエース':q==='チャンス返球'?'チャンス返球':q+'カット');

    let attTeam=rt,defTeam=st,attackQ=q;
    if(q==='サービスエース'){
      addActionStat(stats,'serve',st.name,server.name,'サービスエース');
      awardPoint(st.name,'サービスエース',server.name);
      log.push(resultLineHtml('サービスエース',`${os}-${ps}`));
      n++;
      continue;
    }
    if(q==='チャンス返球'){
      log.push(`チャンス返球：${st.name}がそのまま攻撃を組み立てます。`);
      attTeam=st;defTeam=rt;attackQ='B';
    }

    let guard=0,phase={done:false,attTeam,defTeam,q:attackQ};
    while(!phase.done && guard<30 && !setIsOver(os,ps)){
      own.isServing=serv==='own';opp.isServing=serv==='opp';
      phase=attackPhase(phase.attTeam,phase.defTeam,phase.q);
      guard++;
    }
    if(!phase.done){
      // ほぼ発生しない保険。得点だけを雑に決めず、最後にもう一度攻撃側有利の判定をして決める。
      const atk=phase.attTeam,df=phase.defTeam;
      const atkPower=avg(effectiveFrontPlayers(atk).map(p=>eff(atk,p,'spikePower')+eff(atk,p,'jump')*.25+heightPoint(p.height)*.25));
      const defPower=avg(courtBackPlayers(df).map(p=>eff(df,p,'recDig')*1.25));
      const finalDiff=atkPower-defPower+rand(-3,3);
      const teamName=finalDiff>=0?atk.name:df.name;
      awardPoint(teamName,finalDiff>=0?'長期ラリー攻撃勝ち':'長期ラリー守備勝ち','チーム');
      log.push(`長期ラリー判定：攻撃${num(atkPower)} - 守備${num(defPower)} + 乱数 = ${num(finalDiff)} → ${teamName}得点。${os}-${ps}`);
    }
    n++;
  }

  const win=os>ps;
  // v181: 試合中は積むだけにしていた疲労を、ここでまとめて反映する（Tak指示）。
  applyPendingMatchFatigue(fatiguePending);
  log.push(`<strong>試合終了：${ownSchoolName()} ${os}-${ps} ${opp.name}</strong>`);
  // v74: 計算過程・累計表示は出さない

  // v104: 成長などより先に、まず点数の結果を見せる
  enqueueMatchResultPopup(tour,opp,os,ps);
  // v130: 実況ログはここまで。以降の成長・イベントの追記は混ぜない。
  const matchOnlyLog=log.slice();
  applyMatchExperience(stats,opp,os,ps,log,tour);
  // v199: 預けておいた疲労を戻す。練習試合系では消費0なので、試合前と同じ値に戻る。
  endPracticeMatchStamina();
  if(tour&&tour.type==='practice'){
    scheduleU18SisterRecruitOnWin(opp,win,log);
    // v203: U-18戦／OG戦に初めて勝ったときの物語イベント（Tak指示）
    handleSpecialMatchWinStory(opp,win);
    state.practiceMatch=null;
    state.matchLog=(typeof matchOnlyLog!=='undefined')?matchOnlyLog:log;
    state.lastMatchSummary=`${practiceMatchKindLabel(opp)}：${ownSchoolName()} ${os}-${ps} ${opp.name} / ${win?'勝利':'敗戦'}`;
    managerSay(win?`${practiceMatchKindLabel(opp)}終了です。${os}-${ps}で勝利しました。`:`${practiceMatchKindLabel(opp)}終了です。${os}-${ps}で敗れました。`);
    return;
  }
  if(tour){
    applyDistrictWinSchoolClass(tour,win);
    if(win&&tour.type==='interhigh_pref'&&tour.round===3){state.qualifiedInterhigh=true;}
    if(win&&tour.type==='haruko_pref'&&tour.round===3){state.qualifiedHaruko=true;}
    if(win&&(tour.type==='interhigh_nat'||tour.type==='haruko_nat')&&tour.round===1)setSchoolClassAtLeast('強豪校');
    if(win&&(tour.type==='interhigh_nat'||tour.type==='haruko_nat')&&tour.round>=2)setSchoolClassAtLeast('名門校');
    if(!win){
      processSchoolClassDropOnLoss(tour,os,ps,log);
      markTournamentLoss(tour);
      if(tour.type==='haruko_pref'||tour.type==='haruko_nat'){state.seniorsRetired=true;retireThirdYearsAfterHaruko(log);}
    }
    enqueueTournamentMilestonePopup(tour,win,os,ps,opp&&opp.name);
    advanceTurnWithEvent(log,'match');
  }
  state.matchLog=(typeof matchOnlyLog!=='undefined')?matchOnlyLog:log;
  state.lastMatchSummary=`${ownSchoolName()} ${os}-${ps} ${opp.name} / ${win?'勝利':'敗戦'}`;
  recordMonthlyMatchResult(tour,opp,os,ps,win,stats);
  managerSay(win?`試合終了です。${ownSchoolName()}が${os}-${ps}で勝利しました！`:`試合終了です。${ownSchoolName()}は${os}-${ps}で敗れました。課題を整理しましょう。`);
  if(win)state.schoolRank='地区王者';
}
// v184: 試合画面ではマネージャー枠を出さない（Tak指示）。
//        タブの切り替えは forceSwitchTab / switchTab の2経路と、renderAll からの
//        自動切り替えがあるので、いま開いているタブを見て判定する形にしてある。
function updateManagerDockVisibility(){
  const dock=document.getElementById('managerDock');
  if(!dock)return;
  const cur=document.querySelector('.tab-panel.active');
  dock.classList.toggle('hidden', !!(cur && cur.id==='match'));
  updateManagerDockSpacing();
}
// v185: 発言枠の後ろに画面の情報が透けて見えないようにする（Tak指示）。
//        枠は画面下に固定なので、本文の下にその高さぶんの余白を作り、
//        枠の背後は不透明な帯（.manager-dock::before）で覆う。
//        発言の長さで枠の高さが変わるため、余白は毎回測って入れ直す。
function updateManagerDockSpacing(){
  const dock=document.getElementById('managerDock');
  if(!dock)return;
  let h=0;
  const hidden=dock.classList.contains('hidden')||getComputedStyle(dock).display==='none';
  if(!hidden)h=Math.ceil(dock.getBoundingClientRect().height)+22;
  document.documentElement.style.setProperty('--manager-dock-space', h+'px');
}
if(typeof window!=='undefined'){
  window.addEventListener('resize',()=>{try{updateManagerDockSpacing();}catch(e){}});
}
function forceSwitchTab(id){
  if(monthTransitionLocked())return;
  // v126: 試合画面から離れたら、前の試合のログを残さない
  try{
    const cur=document.querySelector('.tab-panel.active');
    if(cur && cur.id==='match' && id!=='match' && !(watchMatchSession&&!watchMatchSession.done)){
      state.matchLog=[];
      const el=document.getElementById('matchLog');
      if(el)el.innerHTML='';
    }
  }catch(e){}
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===id));
  updateManagerDockVisibility();
}
function switchTab(id){
  if(monthTransitionLocked()){
    managerSay('月初確認を閉じるまで、他の画面には移動できません。');
    return;
  }
  if(id==='match' && !canPlayCurrentMatch()){
    managerSay('現在は試合予定がありません。');
    return;
  }
  forceSwitchTab(id);
}
function bindEvents(){
  // v102: スカウトタブの「スカウトに行く」ボタンは廃止。スカウトは月初の行動選択から行う。
  document.getElementById('startRotationRotateBtn')?.addEventListener('click',()=>{
    state.startRotationOffset=(Number(state.startRotationOffset||0)+1)%6;
    managerSay('試合開始ローテーションを時計回りに1つ回しました。');
    renderAll();
    saveState();
  });
  document.getElementById('closeScoutMapBtn')?.addEventListener('click',()=>closeScoutMapModal());
  document.getElementById('confirmScoutMapBtn')?.addEventListener('click',()=>confirmScoutFromMap());
  document.getElementById('closeScoutDetailBtn')?.addEventListener('click',()=>closeScoutDetailModal());
  document.getElementById('confirmAprilRecruitBtn')?.addEventListener('click',()=>confirmAprilRecruitSelection());
  document.getElementById('scoutMapPositionSelect')?.addEventListener('change',e=>{state.scoutPosition=e.target.value;updateScoutMapComment();saveState();});
  document.querySelectorAll('.region-shape').forEach(btn=>{
    // v127: カーソルを乗せただけで選択が切り替わると意図しない選択につながるため、
    //       選択はクリックのみ。ホバーでは説明の下読みだけを出す。
    btn.addEventListener('click',()=>setScoutMapRegion(btn.dataset.region));
    btn.addEventListener('mouseenter',()=>{
      const c=document.getElementById('scoutMapPreview');
      if(c)c.textContent=scoutRegionTraitText(btn.dataset.region);
    });
    btn.addEventListener('mouseleave',()=>{
      const c=document.getElementById('scoutMapPreview');
      if(c)c.textContent='';
    });
  });
  document.getElementById('openMonthlyGrowthReportBtn')?.addEventListener('click',()=>openMonthGrowthReportModal());
  document.getElementById('closeMonthGrowthReportBtn')?.addEventListener('click',()=>closeMonthGrowthReportModal());
  document.getElementById('openMonthlyCoachActionBtn')?.addEventListener('click',()=>showMonthlyActionModal());
  document.getElementById('closeMonthlyActionModalBtn')?.addEventListener('click',()=>closeMonthlyActionModal());
  document.getElementById('closeMonthTransitionBtn')?.addEventListener('click',()=>closeMonthTransitionModal());
  document.getElementById('chooseIndividualBtn')?.addEventListener('click',()=>chooseMonthlyAction('individual'));
  document.getElementById('chooseScoutBtn')?.addEventListener('click',()=>chooseMonthlyAction('scout'));
  document.getElementById('chooseRecreationBtn')?.addEventListener('click',()=>chooseMonthlyAction('recreation'));
  document.getElementById('chooseProWatchBtn')?.addEventListener('click',()=>chooseMonthlyAction('pro_watch'));
  document.getElementById('chooseDirectorBtn')?.addEventListener('click',()=>chooseMonthlyAction('director'));
  document.getElementById('directorVisitSelect')?.addEventListener('change',e=>{state.directorVisitPlace=e.target.value;renderCoachPanel();saveState();});
  document.getElementById('directorVisitModalSelect')?.addEventListener('change',e=>{state.directorVisitPlace=e.target.value;const h=document.getElementById('directorVisitHelp');if(h)h.textContent=directorPlaceHelp(e.target.value);saveState();});
  document.getElementById('confirmDirectorVisitBtn')?.addEventListener('click',()=>confirmDirectorVisit());
  document.getElementById('closeDirectorVisitBtn')?.addEventListener('click',()=>closeDirectorVisitModal());
  document.getElementById('individualPlayerSelect')?.addEventListener('change',e=>{state.lastIndividualPlayerId=e.target.value;state.selectedPlayerId=e.target.value;renderAll();saveState();});
  document.getElementById('individualTrainingSelect')?.addEventListener('change',e=>{state.lastIndividualTrainingMenu=e.target.value;renderIndividualTrainingCurrent();saveState();});
  document.getElementById('openIndividualTrainingModalBtn')?.addEventListener('click',()=>openIndividualTrainingModal());
  document.getElementById('closeIndividualTrainingModalBtn')?.addEventListener('click',()=>closeIndividualTrainingModal());
  document.getElementById('confirmIndividualTrainingModalBtn')?.addEventListener('click',()=>confirmIndividualTrainingModal());
  document.getElementById('individualModalPlayerSelect')?.addEventListener('change',()=>updateIndividualModalPreview());
  document.getElementById('individualModalTrainingSelect')?.addEventListener('change',()=>updateIndividualModalPreview());
  document.querySelectorAll('.tab-btn').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
  document.querySelectorAll('.coach-action-btn').forEach(btn=>btn.addEventListener('click',()=>chooseMonthlyAction(btn.dataset.coachAction)));
  document.getElementById('scoutRegionSelect')?.addEventListener('change',e=>{state.scoutRegion=e.target.value;managerSay(scoutRegionTraitText(e.target.value));renderCoachPanel();saveState();});
  document.getElementById('scoutPositionSelect')?.addEventListener('change',e=>{state.scoutPosition=e.target.value;renderCoachPanel();saveState();});
  // v183: スカウトの噂カード。3か所（監督タブ／スカウトタブ／スカウトマップ）にあり、
  //        どれも innerHTML で作り直されるので document に1つだけ委譲で付ける（Tak指示）。
  const scoutRumorFromEvent=(e)=>{
    const card=e.target.closest?.('[data-rumor-region]');
    if(!card)return false;
    applyScoutRumorSelection(card.dataset.rumorRegion,card.dataset.rumorPos);
    return true;
  };
  document.addEventListener('click',e=>{ scoutRumorFromEvent(e); });
  document.addEventListener('keydown',e=>{
    if(e.key!=='Enter'&&e.key!==' ')return;
    const card=e.target.closest?.('[data-rumor-region]');
    if(!card)return;
    e.preventDefault();
    applyScoutRumorSelection(card.dataset.rumorRegion,card.dataset.rumorPos);
  });
  document.getElementById('advanceMonthBtn')?.addEventListener('click',()=>{safeHandleAdvanceButton();});
  document.getElementById('coachAdvanceBtn')?.addEventListener('click',()=>{safeHandleAdvanceButton();});
  document.getElementById('titleStartBtn')?.addEventListener('click',()=>startGameFromTitle());
  document.getElementById('titleLoadBtn')?.addEventListener('click',()=>startFromSaveAtTitle());
  // v104:「結果を見る」は、1点ずつ見ている途中なら残りを一気に進めて結果まで飛ぶ。
  document.getElementById('simulateMatchBtn')?.addEventListener('click',()=>{
    try{
      if(watchMatchSession && !watchMatchSession.done){ finishWatchMatchNow(); }
      else { watchMatchSession=null; simulateMatch(); }
    }catch(e){console.error(e);state.matchLog=['試合処理エラー：'+e.message];state.lastMatchSummary='試合エラー';}
    renderAll();
  });
  document.getElementById('startWatchMatchBtn')?.addEventListener('click',()=>{try{startWatchMatch();}catch(e){console.error(e);state.matchLog=['観戦開始エラー：'+e.message];state.lastMatchSummary='観戦エラー';renderAll();}});
  document.getElementById('nextPointBtn')?.addEventListener('click',()=>{try{simulateWatchPoint();}catch(e){console.error(e);state.matchLog.push('観戦処理エラー：'+e.message);state.lastMatchSummary='観戦エラー';renderAll();}});
  document.getElementById('manualSaveBtn')?.addEventListener('click',()=>manualSave());

  // v181: セーブ＝書き出し、ロード＝ファイルから読み込む（Tak指示 ⑥）
  document.getElementById('loadImportBtn')?.addEventListener('click',()=>document.getElementById('saveImportInput')?.click());
  document.getElementById('saveImportInput')?.addEventListener('change',e=>{importSaveFile(e.target.files?.[0]);e.target.value='';});
  document.getElementById('resetBtn')?.addEventListener('click',()=>{if(confirm('初期状態に戻しますか？')){state=initialState();watchMatchSession=null;saveState();renderAll();}});
  document.getElementById('confirmAdvanceWithoutCoachBtn')?.addEventListener('click',()=>{closeAdvanceConfirmModal();state.coachAction='individual';state.lastActionPromptKey=actionPromptKey();safeHandleAdvanceButton();});
  document.getElementById('backToCoachBtn')?.addEventListener('click',()=>{closeAdvanceConfirmModal();switchTab('coach');});
  const c=document.getElementById('growthModalClose');
  if(c)c.onclick=()=>closeImportantPopup();
  // v174: 体験版の終了画面
  document.getElementById('demoExportSaveBtn')?.addEventListener('click',()=>demoExportSave());
  document.getElementById('demoRestartBtn')?.addEventListener('click',()=>demoRestart());
  // v179: 試合画面の選手カード。ローテーションは何度も描き直されるので、
  // カードに直接ではなく親に1つだけ委譲で付ける。
  document.getElementById('closeMatchPlayerModalBtn')?.addEventListener('click',()=>closeMatchPlayerModal());
  const lineupRoot=document.getElementById('preMatchLineups');
  if(lineupRoot){
    const openFromEvent=(e)=>{
      const card=e.target.closest?.('[data-lineup-pid]');
      if(!card)return false;
      openMatchPlayerModal(card.dataset.lineupSide,card.dataset.lineupPid);
      return true;
    };
    lineupRoot.addEventListener('click',e=>{ openFromEvent(e); });
    lineupRoot.addEventListener('keydown',e=>{
      if(e.key!=='Enter'&&e.key!==' ')return;
      const card=e.target.closest?.('[data-lineup-pid]');
      if(!card)return;
      e.preventDefault();
      openMatchPlayerModal(card.dataset.lineupSide,card.dataset.lineupPid);
    });
  }
  // Esc で閉じる
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      const m=document.getElementById('matchPlayerModal');
      if(m&&!m.classList.contains('hidden'))closeMatchPlayerModal();
    }
  });
}
bindEvents();renderAll();
