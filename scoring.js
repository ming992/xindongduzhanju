(function (root) {
  'use strict';
  const config = {
    version: '1.0.0', bankVersion: '1.0.0',
    weights: { exclusive: .30, jealousy: .20, security: .15, control: .20, boundaryDifficulty: .10, regulationDifficulty: .05 },
    prices: { personal: 9.9, couple: 19.9, bundle: 29.9 },
    storageKey: 'heart-exclusive-v1', maxHistory: 30,
    series: [{ id: 'possessiveness', name: '心动独占局', available: true }, { id: 'boundaries', name: '亲密边界', available: false }]
  };
  function value(q, answer) {
    const option = q.options.find(o => o.id === String(answer));
    if (!option) throw new Error(`题目 ${q.id} 的答案无效`);
    return q.reverse ? 3 - option.raw : option.raw;
  }
  // 决策树各叶互斥；阈值是产品设计假设，非心理学常模。
  function classify(s) {
    if (s.control >= 65 && s.exclusive >= 60) return 'wolf';
    if (s.security >= 55) {
      if (s.security >= 70 && s.regulation < 50) return 'octopus';
      if (s.security >= 60 && s.boundary >= 55) return 'butterfly';
      return 'rabbit';
    }
    if (s.jealousy >= 60 && s.exclusive >= 55) return 'fox';
    if (s.jealousy >= 40) return 'cat';
    if (s.exclusive >= 35) return 'bear';
    return 'swan';
  }
  function score(ids, answers, mode = 'standard') {
    const Q = root.HeartQuestions;
    if (!Array.isArray(ids) || new Set(ids).size !== ids.length) throw new Error('题目列表重复或无效');
    const selected = ids.map(id => Q.byId[id]);
    if (selected.some(q => !q)) throw new Error('题库版本不匹配，请重新开始');
    const minimum = mode === 'quick' ? 2 : 5;
    const scores = {}, counts = {};
    Q.dimensions.forEach(d => {
      const items = selected.filter(q => q.dimension === d.id);
      if (items.length < minimum) throw new Error(`${d.name}有效题目不足`);
      const raw = items.reduce((sum, q) => sum + value(q, answers[q.id]), 0);
      scores[d.id] = Math.round(raw / (items.length * 3) * 100);
      counts[d.id] = items.length;
    });
    const w = config.weights;
    const index = Math.round(scores.exclusive * w.exclusive + scores.jealousy * w.jealousy + scores.security * w.security + scores.control * w.control + (100 - scores.boundary) * w.boundaryDifficulty + (100 - scores.regulation) * w.regulationDifficulty);
    const tagStats = {};
    selected.forEach(q => {
      const v = value(q, answers[q.id]);
      const risk = ['boundary', 'regulation'].includes(q.dimension) ? 3 - v : v;
      const t = tagStats[q.tag] || { sum: 0, count: 0 };
      t.sum += risk; t.count++; tagStats[q.tag] = t;
    });
    const triggers = Object.entries(tagStats).map(([tag, t]) => ({ tag, score: Math.round(t.sum / (t.count * 3) * 100), count: t.count })).sort((a, b) => b.score - a.score || a.tag.localeCompare(b.tag)).slice(0, 3);
    return { scores, counts, index, persona: classify(scores), triggers, mode, scoringVersion: config.version, bankVersion: Q.version };
  }
  root.HeartScoring = { config, value, classify, score };
})(globalThis);
