(function (root) {
  'use strict';
  const personas = {
    swan: { name: '自由系白玫瑰', title: '亲密有余地，喜欢有回声', color: '#eee4e9', quote: '我想和你并肩，也想让彼此自由生长。', description: '在这次回答里，你较少把独占视作安心的来源。你愿意给关系留白，也可能更习惯用信任和独立维持连接。记得把在意说出来，让空间里也有温度。', need: '一段保有自主、也有明确回应的关系', caution: '独立不等于无需沟通；记得主动表达在意。' },
    bear: { name: '奶油守护熊', title: '把喜欢放进日常的小事', color: '#f0e2d2', quote: '我喜欢稳定的小日常，也愿意留给你自己的晴天。', description: '你在意陪伴与被优先考虑的感觉，而本次回答中的吃醋敏感度相对温和。对你来说，稳定的小约定可能比轰烈的表达更有分量。', need: '可预期的陪伴与可以商量的安排', caution: '想照顾对方之前，也先问问TA是否需要。' },
    cat: { name: '傲娇醋醋猫', title: '嘴上没事，心里有点酸', color: '#e9e0f4', quote: '我有一点点爱吃醋，也在认真学习把在意说清楚。', description: '一些社交细节容易让你泛起醋意，但本次回答里，强烈独占或持续确认未成为首要模式。这张“猫系”卡片是一个观察入口，并不能判断你实际是否会口是心非。', need: '被认真听见的在意，而非无休止的猜谜', caution: '对方未必能读懂暗示；把“没事”换成一句具体感受。' },
    fox: { name: '蜜桃占心狐', title: '想要一个独一份的位置', color: '#f8dfce', quote: '比起拥有你的全部，我更想知道自己对你很特别。', description: '你的回答同时呈现较强的特殊地位期待与吃醋敏感度。你可能格外留心互动里的“专属感”。这种需要可以被表达，但不必靠缩小对方的社交圈来实现。', need: '清楚的关系定位与双方认可的小仪式', caution: '一份专属感不需要以排除其他正常关系为代价。' },
    rabbit: { name: '黏人棉花兔', title: '想靠近，也想被稳稳接住', color: '#f8e0e8', quote: '想念可以告诉你，等待的时间也可以好好照顾自己。', description: '回应与连接对你比较重要。当相处节奏变化时，你可能更想得到一些明确的安心信号。先说出可商量的需要，再给自己的生活也留一个位置。', need: '温和、稳定而可持续的回应', caution: '多一点联系可以协商，但即时回应不应成为爱的考核。' },
    wolf: { name: '月光独占狼', title: '让浓烈的在意学会留白', color: '#e0e1f1', quote: '我很在意你，也愿意学习不把在意变成限制。', description: '本次回答中，独占倾向与控制倾向都较突出。你可能很想确保自己的特殊位置，也更容易选用限制或检查来缓解不安。这不是爱的深度证明；值得优先练习的是边界和可协商的表达。', need: '明确的约定，以及不依赖检查的安心方法', caution: '检查、施压与限制会侵蚀自主权，不能用在意为它们辩护。' },
    butterfly: { name: '星夜敏感蝶', title: '心很敏感，也努力温柔', color: '#e6ddf5', quote: '我的心偶尔下雨，但我愿意先分清云和天空。', description: '你需要较明确的安心信号，同时也表现出保留他人边界的倾向。内在担忧和外在尊重可以同时存在；比起独自反复猜想，一次具体而平和的沟通可能更有帮助。', need: '明确表达心意，也尊重各自空间', caution: '尊重边界不意味着只能把所有担忧都吞下去。' },
    octopus: { name: '深海确认章鱼', title: '给需要回应的心一个锚点', color: '#f1dce7', quote: '比起再问一次爱不爱，我想练习相信一次约定。', description: '你的回答呈现较高的确认需求，且情绪调节分相对较低。不确定性出现时，反复确认可能带来短暂缓解。试着用可执行的联系约定和自我安顿，替代不断加密的询问。', need: '可预期的回应，加上一套自己的安顿方法', caution: '确认越多不一定越安心；约好节奏后练习容纳短暂未知。' }
  };
  const tags = {
    response: { name: '突然安静的消息框', reason: '有关回复节奏、等待与语气的题目', suggestion: '约好忙碌时的联系节奏，不用回复速度衡量爱意。' },
    social: { name: 'TA与他人的亲近互动', reason: '有关正常社交、赞美与共同话题的题目', suggestion: '讨论具体行为与边界，避免把所有社交都视为威胁。' },
    priority: { name: '没有被放在优先位置', reason: '有关特别待遇、注意力与共同安排的题目', suggestion: '说清楚哪一个时刻你希望被优先考虑。' },
    space: { name: '彼此独处与隐私的留白', reason: '有关独处、账号、私人空间的题目', suggestion: '亲密不等于透明到没有隐私，约定双方同意的分享范围。' },
    change: { name: '临时变化的相处计划', reason: '有关改期、新安排与失落的题目', suggestion: '先了解变化的原因，再一起商量补偿性的安排。' },
    commitment: { name: '还没说清楚的关系承诺', reason: '有关关系定位、期待与未来安排的题目', suggestion: '用一次约好的谈话澄清期待，不通过试探寻求答案。' }
  };
  function analyze(result) {
    const s = result.scores;
    const needs = [
      { key: 'security', score: s.security, title: '稳定回应', text: '商量一个双方都能做到的联系节奏，忙碌时提前说明。' },
      { key: 'exclusive', score: s.exclusive, title: '被优先安排', text: '留下一段固定的共同时间，用具体安排表达特别。' },
      { key: 'jealousy', score: s.jealousy, title: '清晰的关系约定', text: '聊清双方认可的社交边界，不把正常互动自动当成暧昧。' },
      { key: 'boundary', score: s.boundary, title: '被尊重的独立空间', text: '保留各自的朋友、兴趣与隐私，也主动表达喜欢。' }
    ].sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));
    const strengths = [
      s.boundary >= 55 ? ['愿意保留彼此的空间', `边界尊重 ${s.boundary} 分：你的情境选择更常给对方保留决定权。`] : ['能找到需要练习的边界', `边界尊重 ${s.boundary} 分：可从“先询问，再行动”这一个具体动作开始。`],
      s.regulation >= 55 ? ['有暂停与整理的余地', `情绪调节 ${s.regulation} 分：你的回答中出现了缓冲、整理后再沟通的选择。`] : ['可以从觉察情绪开始', `情绪调节 ${s.regulation} 分：先认出情绪升起的时刻，会比急着解决一切更有帮助。`],
      s.control < 50 ? ['较少借限制获得安心', `控制倾向 ${s.control} 分：你较少选择检查、施压等应对方式。`] : ['已经有明确的练习方向', `控制倾向 ${s.control} 分：优先练习把硬性要求改写为可协商请求。此项是成长入口，不将控制描述为优势。`]
    ];
    const pitfalls = [
      { score: s.security, title: '把回复速度当成爱意刻度', text: '试着区分“还没回复”和“不在意我”，约定一个现实的回应范围。' },
      { score: s.jealousy, title: '把猜想当成已经发生的事实', text: '写下“我看见了什么”和“我猜测了什么”，只就可观察的事实发问。' },
      { score: 100 - s.boundary, title: '把私人空间理解为疏远', text: '共同约定独处时间，以及重新连接的时间，不让留白变成考验。' },
      { score: s.control, title: '用检查换取短暂的安心', text: '停止索要账号或定位证明，用一次具体的约定代替反复核验。' },
      { score: 100 - s.regulation, title: '在情绪最满时解决所有问题', text: '先暂停十分钟，做一件能让身体慢下来的事，再回到对话。' },
      { score: s.exclusive, title: '把每次优先选择都当成关系证明', text: '说出最重要的一两个时刻，允许其他时刻按情境分配注意力。' }
    ].sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, 3);
    const priority = pitfalls[0];
    const plan = [
      ['给感受起个名字', '记录今天一个在意的瞬间：发生了什么、我感到什么、身体有什么反应。只写事实，不急着评价。'],
      ['分开事实与猜想', `围绕“${priority.title}”，各写一句可观察的事实和自己的解释，再找出另一种可能。`],
      ['把需要说具体', `试着说：“当____时，我感到____。我希望我们能____。”你的优先需要是“${needs[0].title}”。`],
      ['画一张边界地图', '分三栏写下：愿意分享、需要先询问、希望保留私密。邀请对方分别写一份，先听差异。'],
      ['练习一次不带指责的对话', '选一件小事，表达感受和可商量的请求。听完对方的回应，复述一次，确认自己理解了。'],
      ['把一段时间还给自己', '为一个独立兴趣、一次散步或一次朋友聚会留出30分钟，不把它当成等待回复的过渡。'],
      ['留下一个可持续的小约定', `回顾本周哪个动作有效，围绕“${needs[0].title}”约定一件双方做得到的事，一周后再一起调整。`]
    ];
    return { persona: personas[result.persona], needs: needs.slice(0, 2), strengths, pitfalls, plan };
  }
  function compare(a, b) {
    const dims = root.HeartQuestions.dimensions;
    const differences = dims.map(d => ({ ...d, a: a.result.scores[d.id], b: b.result.scores[d.id], gap: Math.abs(a.result.scores[d.id] - b.result.scores[d.id]) }));
    const widest = [...differences].sort((x, y) => y.gap - x.gap || x.id.localeCompare(y.id))[0];
    const closest = [...differences].sort((x, y) => x.gap - y.gap || x.id.localeCompare(y.id))[0];
    const moreSecurity = a.result.scores.security >= b.result.scores.security ? a.name : b.name;
    return { differences, widest, closest,
      similarity: `你们在“${closest.name}”上相差 ${closest.gap} 分。这是本次情境回答最接近的部分，可以从各自的具体选择聊起。`,
      mismatch: widest.gap < 20 ? '六维差异都在20分以内，但相近的分数仍可能来自不同情境。把具体需要说出来，比默认彼此懂更可靠。' : `“${widest.name}”相差 ${widest.gap} 分。差异表示偏好与应对方式不同，不能推断爱意或忠诚。可以各举一个真实例子，讨论可接受的范围。`,
      agreement: `${a.result.scores.security === b.result.scores.security ? '本次回答中，两人的确认需求得分相同。' : `本次回答中，${moreSecurity}的确认需求相对更高。`}可以先商量忙碌时如何告知、何时方便回应，再为双方保留不必随时在线的空间。`,
      questions: ['当我一时没回复时，你最希望知道哪一件事？', '哪些事情可以分享，哪些需要先询问，哪些希望保留私密？', '当我们需要的陪伴时长不同，怎样安排才让两个人都舒服？'] };
  }
  root.HeartReport = { personas, tags, analyze, compare };
})(globalThis);
