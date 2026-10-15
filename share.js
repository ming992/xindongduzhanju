(function (root) {
  'use strict';
  const themes = [
    { id: 'sakura', name: '樱花奶油', bg: '#fff6f5', ink: '#524052', accent: '#bc809d', soft: '#f4dce6' },
    { id: 'moon', name: '月光紫雾', bg: '#f1edf9', ink: '#4e4160', accent: '#9b81b8', soft: '#ddd0ef' },
    { id: 'peach', name: '蜜桃汽水', bg: '#fff2e8', ink: '#664a48', accent: '#c98f78', soft: '#f7d5bf' },
    { id: 'dark', name: '黑粉暗恋', bg: '#2d2432', ink: '#f4e4ef', accent: '#e1a7c6', soft: '#53394e' },
    { id: 'retro', name: '复古恋爱杂志', bg: '#f2e9d8', ink: '#554c40', accent: '#a77b6e', soft: '#decbb8' },
    { id: 'comic', name: '甜酷漫画', bg: '#f5f0ff', ink: '#3e3450', accent: '#a678b8', soft: '#dbcced' }
  ];
  const sizes = { '9:16': [1080, 1920], '3:4': [1080, 1440], '1:1': [1080, 1080] };
  const font = '"Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif';
  function roundRect(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
  function wrap(c, text, x, y, width, lineHeight) {
    let line = '', lines = [];
    for (const char of text) { if (c.measureText(line + char).width > width && line) { lines.push(line); line = char; } else line += char; }
    if (line) lines.push(line);
    lines.forEach((line, i) => c.fillText(line, x, y + i * lineHeight));
    return lines.length * lineHeight;
  }
  function loadImage(src) { return new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(new Error('角色插画加载失败，请重试')); img.src = src; }); }
  async function render(record, options = {}) {
    const theme = themes.find(t => t.id === options.theme) || themes[0];
    const [w, h] = sizes[options.ratio] || sizes['3:4'];
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    if (!ctx) throw new Error('浏览器不支持图片绘制，请使用较新的浏览器');
    if (document.fonts?.ready) await document.fonts.ready;
    ctx.fillStyle = theme.bg; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = theme.soft; ctx.lineWidth = 2;
    roundRect(ctx, 36, 36, w - 72, h - 72, theme.id === 'comic' ? 12 : 36); ctx.stroke();
    ctx.fillStyle = theme.soft; ctx.globalAlpha = .45;
    ctx.beginPath(); ctx.ellipse(w * .75, h * .28, w * .45, h * .22, -.4, 0, Math.PI * 2); ctx.fill();ctx.globalAlpha = 1;
    const compact = h === 1080;
    ctx.textAlign = 'left'; ctx.fillStyle = theme.accent; ctx.font = `22px ${font}`; ctx.fillText('心动独占局  /  THE LITTLE LOVE LAB', 85, 110);
    ctx.textAlign = 'right'; ctx.font = 'italic 20px Georgia'; ctx.fillText('a little love note', w - 85, 110);
    const p = root.HeartReport.personas[record.result.persona];
    const nickname = String(options.nickname || record.name || '我的').slice(0, 16);
    ctx.textAlign = 'center'; ctx.fillStyle = theme.ink;ctx.font = `24px ${font}`;
    ctx.fillText(`${nickname}的隐藏关系人格`, w / 2, compact ? 175 : 215);
    const artSize = compact ? 280 : h === 1440 ? 370 : 460;
    const artY = compact ? 190 : h === 1440 ? 235 : 300;
    const svg = root.HeartArt.character(record.result.persona, p.name).replace(/class="[^"]*"/g, '');
    const uri = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    try { const img = await loadImage(uri); ctx.drawImage(img, (w - artSize) / 2, artY, artSize, artSize); } finally { URL.revokeObjectURL(uri); }
    let y = artY + artSize + 50;
    ctx.fillStyle = theme.ink;ctx.font = `bold ${compact ? 50 : 57}px ${font}`;ctx.fillText(p.name, w / 2, y);
    y += compact ? 45 : 55;ctx.font = `23px ${font}`;ctx.fillStyle = theme.accent;ctx.fillText(p.title, w / 2, y);
    if (!options.hideScores) {
      y += compact ? 65 : 85;ctx.font = `24px ${font}`;ctx.fillStyle = theme.ink;ctx.fillText(`占有欲综合指数  ${record.result.index} / 100`, w / 2, y);
    } else { y += compact ? 45 : 65;ctx.font = `22px ${font}`;ctx.fillStyle = theme.accent;ctx.fillText('保留一点神秘，也是一种边界。', w / 2, y); }
    y += compact ? 45 : 65;ctx.font = `${compact ? 25 : 29}px ${font}`;ctx.fillStyle = theme.ink;
    y += wrap(ctx, `“${p.quote}”`, w / 2, y, 790, compact ? 38 : 46);
    const chartY = Math.min(y + (compact ? 0 : 25), h - 290);
    const dims = root.HeartQuestions.dimensions.filter(d => !options.hideSensitive || !['security', 'control'].includes(d.id));
    const colW = 280, cols = compact ? 3 : 2, rows = Math.ceil(dims.length / cols);
    const chartW = cols * colW;
    const rowH = compact ? 60 : 70;
    dims.forEach((d, i) => {
      const x = (w - chartW) / 2 + (i % cols) * colW + 16, dy = chartY + Math.floor(i / cols) * rowH;
      ctx.textAlign = 'left';ctx.fillStyle = theme.ink;ctx.font = `19px ${font}`;ctx.fillText(d.short, x, dy);
      if (!options.hideScores) {ctx.textAlign = 'right';ctx.font = '21px Georgia';ctx.fillText(String(record.result.scores[d.id]), x + colW - 42, dy);}
      ctx.fillStyle = theme.soft; roundRect(ctx, x, dy + 14, colW - 42, 6, 3);ctx.fill();
      if (!options.hideScores) {ctx.fillStyle = theme.accent;roundRect(ctx, x, dy + 14, (colW - 42) * record.result.scores[d.id] / 100, 6, 3);ctx.fill();}
    });
    if (options.hideScores || options.hideSensitive) {ctx.textAlign = 'center';ctx.fillStyle = theme.accent;ctx.font = `16px ${font}`;ctx.fillText(options.hideScores ? '具体分数与图形比例均已隐藏' : '安心需求与控制倾向已隐藏', w / 2, Math.min(chartY + rows * rowH + 5, h - 150));}
    ctx.strokeStyle = theme.soft;ctx.beginPath();ctx.moveTo(85, h - 140);ctx.lineTo(w - 85, h - 140);ctx.stroke();
    ctx.textAlign = 'left';ctx.fillStyle = theme.accent;ctx.font = `18px ${font}`;ctx.fillText('18+ 娱乐性自我探索 · 非临床量表 / 非人口百分位', 85, h - 96);
    ctx.font = `16px ${font}`;ctx.fillText(`评分 v${record.result.scoringVersion} · ${record.result.mode === 'quick' ? '12题初步画像' : '30题情境画像'}`, 85, h - 65);
    ctx.textAlign = 'right';ctx.font = `17px ${font}`;ctx.fillText('本地离线版', w - 85, h - 96);ctx.font = `14px ${font}`;ctx.fillText('扫码入口待配置', w - 85, h - 65);
    return c;
  }
  function download(blob, filename) { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url;a.download = filename;document.body.appendChild(a);a.click();a.remove();setTimeout(() => URL.revokeObjectURL(url), 15000); }
  root.HeartShare = { themes, sizes, render, download };
})(globalThis);
