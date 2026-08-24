type SeedRecipe = {
  id: string;
  name: string;
  category: string;
  description: string;
  emoji: string;
  colorFrom: string;
  colorTo: string;
  cookTime: number;
  difficulty: string;
  flavor: string;
  servings: number;
  featured: boolean;
  lifeStage?: "preconception" | "pregnancy" | "postpartum" | "baby" | "family";
  subStage?: string;
  mealType?: string;
  nutritionHighlights?: string[];
  allergens?: string[];
  safetyNote?: string;
  minAgeMonths?: number;
  texture?: string;
  spiceLevel?: "none" | "mild" | "medium" | "hot";
  ingredients: { name: string; amount: string }[];
  steps: { instruction: string; duration?: string; tip?: string }[];
};

export const seedRecipes: SeedRecipe[] = [
  {
    id: "tomato-eggs", name: "番茄炒蛋", category: "快手家常", description: "酸甜浓郁、鸡蛋软嫩，十分钟就能端上桌。", emoji: "🍅", colorFrom: "#ff7358", colorTo: "#ffb35c", cookTime: 12, difficulty: "简单", flavor: "酸甜", servings: 2, featured: true,
    ingredients: [{ name: "番茄", amount: "2个（约400克）" }, { name: "鸡蛋", amount: "3个" }, { name: "小葱", amount: "1根" }, { name: "盐", amount: "3克" }, { name: "白糖", amount: "5克" }, { name: "食用油", amount: "20毫升" }],
    steps: [{ instruction: "番茄顶部划十字，用热水烫半分钟后去皮，切成小块；小葱切葱花。", duration: "3分钟", tip: "不介意番茄皮也可以省略去皮。" }, { instruction: "鸡蛋加一小撮盐和一勺清水打散。锅烧热后放油，倒入蛋液快速推炒，刚凝固就盛出。", duration: "3分钟", tip: "加清水能让鸡蛋更蓬松。" }, { instruction: "原锅下番茄，中火炒至出汁，加盐和白糖调味。", duration: "4分钟" }, { instruction: "倒回鸡蛋，大火翻匀，让蛋块裹满汤汁，撒葱花出锅。", duration: "2分钟" }]
  },
  {
    id: "kung-pao-chicken", name: "宫保鸡丁", category: "下饭荤菜", description: "鸡丁滑嫩，花生酥香，酸甜微辣特别下饭。", emoji: "🌶️", colorFrom: "#c83e32", colorTo: "#f18a45", cookTime: 28, difficulty: "适中", flavor: "酸甜微辣", servings: 2, featured: true, spiceLevel: "mild",
    ingredients: [{ name: "鸡腿肉", amount: "300克" }, { name: "熟花生米", amount: "50克" }, { name: "干辣椒", amount: "6个" }, { name: "大葱", amount: "1根" }, { name: "生抽", amount: "15毫升" }, { name: "香醋", amount: "20毫升" }, { name: "白糖", amount: "15克" }, { name: "淀粉", amount: "8克" }],
    steps: [{ instruction: "鸡腿肉切1.5厘米见方的丁，加一半生抽、少许盐和一半淀粉抓匀腌制。", duration: "10分钟" }, { instruction: "把剩余生抽、香醋、白糖、淀粉和两勺清水调成碗汁；大葱切丁，干辣椒剪段。", duration: "3分钟" }, { instruction: "热锅凉油，下鸡丁大火滑炒至变色，盛出备用。", duration: "4分钟", tip: "鸡丁八成熟即可，回锅后才不会老。" }, { instruction: "锅中留底油，小火炒香干辣椒和花椒，下葱丁和鸡丁翻炒。", duration: "4分钟" }, { instruction: "碗汁搅匀后沿锅边淋入，大火翻炒至汁水紧裹，最后放花生米。", duration: "2分钟", tip: "花生米最后放才能保持酥脆。" }]
  },
  {
    id: "braised-pork", name: "家常红烧肉", category: "下饭荤菜", description: "色泽红亮、肥而不腻，周末慢慢炖一锅。", emoji: "🥩", colorFrom: "#7c3028", colorTo: "#d46a3a", cookTime: 75, difficulty: "适中", flavor: "咸甜", servings: 3, featured: true,
    ingredients: [{ name: "五花肉", amount: "600克" }, { name: "冰糖", amount: "25克" }, { name: "生抽", amount: "25毫升" }, { name: "老抽", amount: "8毫升" }, { name: "姜", amount: "5片" }, { name: "八角", amount: "2个" }, { name: "料酒", amount: "20毫升" }],
    steps: [{ instruction: "五花肉切3厘米方块，冷水入锅，加姜片和料酒煮开，撇沫后捞出擦干。", duration: "10分钟" }, { instruction: "锅中不放油，小火煸五花肉至表面微黄、析出部分油脂，盛出。", duration: "8分钟" }, { instruction: "留少量底油，放冰糖小火炒至琥珀色，迅速倒入肉块翻匀上色。", duration: "5分钟", tip: "糖色宁可浅一点，炒黑会发苦。" }, { instruction: "加入生抽、老抽、八角和热水，水量没过肉。煮开后转小火加盖慢炖。", duration: "45分钟" }, { instruction: "开盖转中大火收汁，轻轻翻动，汤汁浓稠后关火。", duration: "8分钟" }]
  },
  {
    id: "steamed-fish", name: "清蒸鲈鱼", category: "清淡蒸菜", description: "鲜嫩清爽，葱姜豉油把鱼的鲜味完整托出来。", emoji: "🐟", colorFrom: "#4f9c93", colorTo: "#8dc9b8", cookTime: 22, difficulty: "简单", flavor: "鲜香", servings: 2, featured: false,
    ingredients: [{ name: "鲜鲈鱼", amount: "1条（约600克）" }, { name: "姜", amount: "6片" }, { name: "大葱", amount: "半根" }, { name: "蒸鱼豉油", amount: "25毫升" }, { name: "食用油", amount: "15毫升" }, { name: "料酒", amount: "10毫升" }],
    steps: [{ instruction: "鲈鱼清理干净，在鱼身两侧各划两刀，抹少许料酒，腹中和鱼身放姜片。", duration: "5分钟" }, { instruction: "蒸锅水充分烧开后放鱼，大火蒸8分钟，关火焖2分钟。", duration: "10分钟", tip: "600克左右蒸8分钟；鱼更大时适当增加时间。" }, { instruction: "取出后倒掉盘中腥水，去掉旧姜片，铺上新鲜葱姜丝。", duration: "2分钟" }, { instruction: "沿盘边淋蒸鱼豉油，把热油浇在葱姜丝上激香。", duration: "2分钟" }]
  },
  {
    id: "mapo-tofu", name: "麻婆豆腐", category: "下饭荤菜", description: "麻、辣、烫、香，豆腐嫩而不碎，拌饭一绝。", emoji: "🔥", colorFrom: "#d84b35", colorTo: "#ff8a4a", cookTime: 25, difficulty: "适中", flavor: "麻辣", servings: 2, featured: true, spiceLevel: "hot",
    ingredients: [{ name: "嫩豆腐", amount: "400克" }, { name: "牛肉末", amount: "100克" }, { name: "郫县豆瓣酱", amount: "20克" }, { name: "花椒粉", amount: "2克" }, { name: "蒜", amount: "3瓣" }, { name: "生抽", amount: "10毫升" }, { name: "水淀粉", amount: "30毫升" }],
    steps: [{ instruction: "豆腐切2厘米方块，放入淡盐热水中浸泡5分钟，捞出沥水。", duration: "6分钟", tip: "盐水浸泡能去豆腥，也让豆腐更不易碎。" }, { instruction: "锅中放油，下牛肉末煸炒至酥香，加入豆瓣酱和蒜末炒出红油。", duration: "5分钟" }, { instruction: "加入一小碗热水和生抽，放入豆腐，轻推均匀后小火烧制。", duration: "6分钟" }, { instruction: "水淀粉分两次勾芡，轻轻推动至汤汁包裹豆腐。", duration: "3分钟" }, { instruction: "装盘后撒花椒粉和葱花，趁热食用。", duration: "1分钟" }]
  },
  {
    id: "pepper-pork", name: "青椒肉丝", category: "快手家常", description: "肉丝嫩滑、青椒脆爽，最可靠的一道工作日晚餐。", emoji: "🫑", colorFrom: "#4c8d4b", colorTo: "#a4bd54", cookTime: 20, difficulty: "简单", flavor: "咸鲜", servings: 2, featured: false,
    ingredients: [{ name: "猪里脊", amount: "250克" }, { name: "青椒", amount: "3个" }, { name: "生抽", amount: "15毫升" }, { name: "料酒", amount: "10毫升" }, { name: "淀粉", amount: "6克" }, { name: "蒜", amount: "2瓣" }],
    steps: [{ instruction: "里脊逆纹切细丝，加料酒、生抽和淀粉抓匀，最后拌一勺油锁住水分。", duration: "8分钟" }, { instruction: "青椒去籽切丝，蒜切末。热锅下油，把肉丝快速滑散至变色后盛出。", duration: "5分钟" }, { instruction: "原锅爆香蒜末，下青椒大火翻炒至断生。", duration: "3分钟" }, { instruction: "倒回肉丝，加少许盐，快速翻匀后立即出锅。", duration: "2分钟", tip: "全程大火，青椒才会保持脆爽。" }]
  },
  {
    id: "garlic-broccoli", name: "蒜蓉西兰花", category: "时令素菜", description: "清脆翠绿，蒜香十足，给大餐配一点轻盈。", emoji: "🥦", colorFrom: "#3c8854", colorTo: "#92c96e", cookTime: 15, difficulty: "简单", flavor: "蒜香", servings: 2, featured: false,
    ingredients: [{ name: "西兰花", amount: "1颗（约350克）" }, { name: "蒜", amount: "5瓣" }, { name: "盐", amount: "3克" }, { name: "蚝油", amount: "8毫升" }, { name: "食用油", amount: "15毫升" }],
    steps: [{ instruction: "西兰花掰成小朵，用淡盐水浸泡后冲洗；蒜切末。", duration: "5分钟" }, { instruction: "水烧开，加少许盐和几滴油，放西兰花焯60秒后捞出。", duration: "3分钟", tip: "焯水时间不要过长，颜色和口感都会更好。" }, { instruction: "热锅放油，小火炒香蒜末，加入西兰花大火翻炒。", duration: "3分钟" }, { instruction: "加入盐和蚝油，翻匀即可出锅。", duration: "1分钟" }]
  },
  {
    id: "cabbage", name: "手撕包菜", category: "时令素菜", description: "锅气十足、酸辣脆爽，素菜也能让人多吃一碗饭。", emoji: "🥬", colorFrom: "#669344", colorTo: "#bdc865", cookTime: 15, difficulty: "简单", flavor: "酸辣", servings: 2, featured: false, spiceLevel: "mild",
    ingredients: [{ name: "圆白菜", amount: "半颗（约400克）" }, { name: "干辣椒", amount: "4个" }, { name: "蒜", amount: "3瓣" }, { name: "香醋", amount: "12毫升" }, { name: "生抽", amount: "10毫升" }, { name: "白糖", amount: "3克" }],
    steps: [{ instruction: "包菜用手撕成大片，粗硬菜梗单独放，洗净后彻底沥干。", duration: "5分钟" }, { instruction: "锅烧至微微冒烟，放油，下蒜片和干辣椒迅速爆香。", duration: "1分钟" }, { instruction: "先下菜梗，再下菜叶，全程大火快速翻炒。", duration: "3分钟" }, { instruction: "沿锅边淋生抽和香醋，加糖和盐，炒至菜叶刚变软就出锅。", duration: "2分钟" }]
  },
  {
    id: "corn-rib-soup", name: "玉米排骨汤", category: "暖心汤羹", description: "汤清味甜、排骨软嫩，一锅就是踏实的家的味道。", emoji: "🌽", colorFrom: "#e5a83f", colorTo: "#f5d77c", cookTime: 80, difficulty: "简单", flavor: "清甜", servings: 3, featured: true,
    ingredients: [{ name: "排骨", amount: "500克" }, { name: "甜玉米", amount: "1根" }, { name: "胡萝卜", amount: "1根" }, { name: "姜", amount: "4片" }, { name: "料酒", amount: "15毫升" }, { name: "盐", amount: "适量" }],
    steps: [{ instruction: "排骨冷水下锅，加两片姜和料酒，煮开撇净浮沫，捞出洗净。", duration: "10分钟" }, { instruction: "玉米切段，胡萝卜切滚刀块。排骨和姜片放入汤锅，加足量热水。", duration: "5分钟" }, { instruction: "大火煮开后转小火，加盖炖40分钟。", duration: "40分钟" }, { instruction: "加入玉米和胡萝卜，继续小火炖20分钟。", duration: "20分钟" }, { instruction: "关火前只用盐调味，静置几分钟后盛出。", duration: "2分钟", tip: "盐最后放，排骨更容易炖软。" }]
  },
  {
    id: "tomato-beef", name: "番茄炖牛腩", category: "暖心汤羹", description: "牛腩软烂，番茄汤浓，用汤汁拌饭也舍不得剩。", emoji: "🍲", colorFrom: "#b64b36", colorTo: "#e79052", cookTime: 100, difficulty: "适中", flavor: "浓郁酸香", servings: 3, featured: false,
    ingredients: [{ name: "牛腩", amount: "600克" }, { name: "番茄", amount: "4个" }, { name: "洋葱", amount: "半个" }, { name: "姜", amount: "4片" }, { name: "生抽", amount: "20毫升" }, { name: "番茄酱", amount: "20克" }],
    steps: [{ instruction: "牛腩切块，冷水下锅焯透，撇沫后用温水洗净。", duration: "12分钟" }, { instruction: "番茄去皮切块，洋葱切丁。锅中放少许油，炒香洋葱和姜片。", duration: "5分钟" }, { instruction: "放入一半番茄炒出沙，加入番茄酱、生抽和牛腩翻匀。", duration: "6分钟" }, { instruction: "加足量热水，大火烧开后转小火炖70分钟。", duration: "70分钟" }, { instruction: "加入剩余番茄，再炖15分钟，加盐调味。", duration: "15分钟" }]
  },
  {
    id: "seaweed-egg-soup", name: "紫菜蛋花汤", category: "暖心汤羹", description: "五分钟快手汤，蛋花轻盈，鲜味刚刚好。", emoji: "🥣", colorFrom: "#665c7b", colorTo: "#a692a3", cookTime: 8, difficulty: "简单", flavor: "清鲜", servings: 2, featured: false,
    ingredients: [{ name: "免洗紫菜", amount: "8克" }, { name: "鸡蛋", amount: "2个" }, { name: "虾皮", amount: "一小撮" }, { name: "香油", amount: "几滴" }, { name: "白胡椒", amount: "少许" }, { name: "盐", amount: "适量" }],
    steps: [{ instruction: "紫菜撕小块放入汤碗，加入虾皮、白胡椒和香油；鸡蛋打散。", duration: "2分钟" }, { instruction: "锅中烧两碗水，加盐调味。水沸后关小火，沿筷子缓缓淋入蛋液。", duration: "3分钟", tip: "蛋液下锅后先别搅，等浮起再轻推。" }, { instruction: "蛋花定型后立即关火，冲入放好紫菜的汤碗中。", duration: "1分钟" }]
  },
  {
    id: "fried-rice", name: "家常蛋炒饭", category: "一碗主食", description: "粒粒分明、蛋香葱香，冰箱剩饭的最佳归宿。", emoji: "🍚", colorFrom: "#d8a93e", colorTo: "#f0d36d", cookTime: 15, difficulty: "简单", flavor: "咸香", servings: 2, featured: false,
    ingredients: [{ name: "隔夜米饭", amount: "2碗" }, { name: "鸡蛋", amount: "2个" }, { name: "火腿", amount: "60克" }, { name: "胡萝卜", amount: "半根" }, { name: "小葱", amount: "2根" }, { name: "生抽", amount: "8毫升" }],
    steps: [{ instruction: "米饭提前拨散；火腿、胡萝卜切小丁；鸡蛋打散；葱切花。", duration: "4分钟" }, { instruction: "热锅放油，鸡蛋炒至八成熟，盛出备用。", duration: "2分钟" }, { instruction: "原锅下胡萝卜和火腿炒香，倒入米饭，大火翻炒并用锅铲压散。", duration: "5分钟" }, { instruction: "倒回鸡蛋，加生抽和少许盐翻匀，撒葱花出锅。", duration: "2分钟", tip: "米饭偏干更容易炒得粒粒分明。" }]
  },
  {
    id: "preconception-spinach-beef", name: "菠菜菌菇牛肉饭", category: "备孕均衡餐", description: "深绿叶菜、菌菇与瘦牛肉搭配的一碗均衡主食。", emoji: "🥬", colorFrom: "#4b7d5b", colorTo: "#9fbe79", cookTime: 28, difficulty: "简单", flavor: "清香咸鲜", servings: 2, featured: true,
    lifeStage: "preconception", subStage: "夫妻备孕", mealType: "午晚餐", nutritionHighlights: ["叶酸食物来源", "铁", "优质蛋白"], allergens: ["大豆"], safetyNote: "叶酸丰富食物不能替代医嘱要求的叶酸补充剂；牛肉请彻底加热。",
    ingredients: [{ name: "瘦牛肉", amount: "220克" }, { name: "菠菜", amount: "200克" }, { name: "鲜香菇", amount: "5朵" }, { name: "糙米饭", amount: "2碗" }, { name: "生抽", amount: "10毫升" }, { name: "食用油", amount: "12毫升" }],
    steps: [{ instruction: "牛肉切薄片，用一半生抽抓匀；菠菜洗净切段，香菇切片。", duration: "8分钟" }, { instruction: "锅中水开后放菠菜焯30秒，捞出沥干。", duration: "2分钟" }, { instruction: "热锅放油，下牛肉炒至完全变色熟透，再放香菇炒软。", duration: "7分钟" }, { instruction: "加入菠菜和剩余生抽快速翻匀，和糙米饭一起装碗。", duration: "3分钟" }]
  },
  {
    id: "preconception-salmon-grain", name: "三文鱼杂粮饭", category: "备孕均衡餐", description: "全熟三文鱼搭配杂粮与彩椒，清爽又有饱足感。", emoji: "🐟", colorFrom: "#e48368", colorTo: "#efc17c", cookTime: 30, difficulty: "简单", flavor: "鲜香", servings: 2, featured: false,
    lifeStage: "preconception", subStage: "夫妻备孕", mealType: "午晚餐", nutritionHighlights: ["优质蛋白", "Omega-3 脂肪酸", "全谷物"], allergens: ["鱼类"], safetyNote: "鱼肉中心应完全熟透；有基础疾病或正在服用补充剂时按医生建议调整。",
    ingredients: [{ name: "三文鱼", amount: "240克" }, { name: "杂粮饭", amount: "2碗" }, { name: "彩椒", amount: "1个" }, { name: "西兰花", amount: "180克" }, { name: "柠檬", amount: "半个" }, { name: "橄榄油", amount: "12毫升" }],
    steps: [{ instruction: "三文鱼擦干，彩椒切块，西兰花切小朵。", duration: "5分钟" }, { instruction: "西兰花焯熟；彩椒用少量油炒至断生。", duration: "6分钟" }, { instruction: "平底锅放油，中小火将三文鱼两面煎熟，确认中心不透明且能轻松剥开。", duration: "10分钟" }, { instruction: "杂粮饭装碗，放上蔬菜与鱼肉，挤少量柠檬汁。", duration: "2分钟" }]
  },
  {
    id: "preconception-bean-soup", name: "南瓜鹰嘴豆浓汤", category: "备孕均衡餐", description: "南瓜和豆类打成温润浓汤，适合作为早餐或加餐。", emoji: "🎃", colorFrom: "#d9893e", colorTo: "#f1cb73", cookTime: 32, difficulty: "简单", flavor: "自然甘甜", servings: 2, featured: false,
    lifeStage: "preconception", subStage: "女性备孕", mealType: "早餐", nutritionHighlights: ["膳食纤维", "植物蛋白", "叶酸食物来源"], allergens: [], safetyNote: "豆类容易引起胀气，可从小份量开始；本菜谱不替代叶酸补充剂。",
    ingredients: [{ name: "南瓜", amount: "350克" }, { name: "熟鹰嘴豆", amount: "120克" }, { name: "洋葱", amount: "四分之一个" }, { name: "牛奶或无糖豆乳", amount: "150毫升" }, { name: "清水", amount: "300毫升" }],
    steps: [{ instruction: "南瓜去皮切块，洋葱切丁；熟鹰嘴豆冲洗干净。", duration: "6分钟" }, { instruction: "南瓜、洋葱和鹰嘴豆加水煮至南瓜软烂。", duration: "18分钟" }, { instruction: "稍降温后搅打细腻，倒回锅中加入牛奶或豆乳，小火加热。", duration: "5分钟", tip: "不要让奶液长时间沸腾。" }]
  },
  {
    id: "pregnancy-ginger-noodles", name: "姜香番茄鸡丝面", category: "孕期安心餐", description: "酸香清爽、汤汁温和，选用完全熟透的鸡肉。", emoji: "🍜", colorFrom: "#d76552", colorTo: "#efb56f", cookTime: 25, difficulty: "简单", flavor: "酸香清淡", servings: 1, featured: true,
    lifeStage: "pregnancy", subStage: "孕早期", mealType: "午晚餐", nutritionHighlights: ["优质蛋白", "主食能量", "蔬菜搭配"], allergens: ["含麸质谷物"], safetyNote: "鸡肉必须完全熟透；若持续呕吐、无法进食或脱水，请及时就医。",
    ingredients: [{ name: "鲜面条", amount: "100克" }, { name: "鸡胸肉", amount: "100克" }, { name: "番茄", amount: "1个" }, { name: "小青菜", amount: "80克" }, { name: "姜", amount: "2片" }],
    steps: [{ instruction: "鸡胸肉冷水入锅加姜片煮熟，撕成细丝；番茄切小块。", duration: "12分钟" }, { instruction: "锅中放少量油炒软番茄，加清水煮开。", duration: "5分钟" }, { instruction: "下面条煮熟，最后放青菜和鸡丝煮沸后盛出。", duration: "6分钟" }]
  },
  {
    id: "pregnancy-salmon-broccoli", name: "全熟三文鱼西兰花饭", category: "孕期安心餐", description: "鱼、蔬菜和米饭组成的一盘式搭配，做法简单。", emoji: "🍱", colorFrom: "#dc816c", colorTo: "#8fbd8c", cookTime: 30, difficulty: "简单", flavor: "清淡鲜香", servings: 1, featured: true,
    lifeStage: "pregnancy", subStage: "孕中期", mealType: "午晚餐", nutritionHighlights: ["优质蛋白", "Omega-3 脂肪酸", "钙搭配"], allergens: ["鱼类", "乳制品"], safetyNote: "选择可靠来源的鱼并彻底加热；酸奶需为巴氏杀菌产品。个体鱼类摄入建议以产检医生意见为准。",
    ingredients: [{ name: "三文鱼", amount: "120克" }, { name: "西兰花", amount: "150克" }, { name: "米饭", amount: "1碗" }, { name: "原味酸奶", amount: "80克" }, { name: "柠檬", amount: "四分之一个" }],
    steps: [{ instruction: "西兰花洗净切小朵并焯熟；三文鱼擦干。", duration: "6分钟" }, { instruction: "三文鱼用中小火煎至中心完全不透明、肉瓣易分开。", duration: "10分钟" }, { instruction: "米饭、西兰花和鱼肉装盘，搭配巴氏杀菌原味酸奶。", duration: "3分钟" }]
  },
  {
    id: "pregnancy-beef-tomato", name: "番茄土豆炖牛肉", category: "孕期安心餐", description: "牛肉炖至软烂，番茄和土豆让一锅菜更均衡。", emoji: "🥘", colorFrom: "#a94f43", colorTo: "#dc9a59", cookTime: 85, difficulty: "适中", flavor: "浓郁酸香", servings: 3, featured: false,
    lifeStage: "pregnancy", subStage: "孕晚期", mealType: "午晚餐", nutritionHighlights: ["铁", "优质蛋白", "钾"], allergens: [], safetyNote: "牛肉彻底炖熟，控制盐量；妊娠糖尿病、贫血或其他情况请遵循产检医生的个体化建议。",
    ingredients: [{ name: "牛腩", amount: "450克" }, { name: "番茄", amount: "3个" }, { name: "土豆", amount: "1个" }, { name: "胡萝卜", amount: "1根" }, { name: "姜", amount: "3片" }],
    steps: [{ instruction: "牛腩切块冷水焯透，洗净；番茄、土豆和胡萝卜切块。", duration: "12分钟" }, { instruction: "锅中少量油炒软番茄，加入牛腩和足量热水。", duration: "6分钟" }, { instruction: "小火炖50分钟，再加土豆和胡萝卜炖至软烂。", duration: "65分钟" }, { instruction: "用少量盐调味，确认牛肉中心熟透后食用。", duration: "2分钟" }]
  },
  {
    id: "postpartum-millet-pumpkin", name: "南瓜小米粥配蒸蛋", category: "产后恢复餐", description: "软糯主食搭配全熟蒸蛋，清淡而完整的一顿早餐。", emoji: "🥣", colorFrom: "#d7a43d", colorTo: "#f1da86", cookTime: 32, difficulty: "简单", flavor: "清淡软糯", servings: 1, featured: true,
    lifeStage: "postpartum", subStage: "产后恢复", mealType: "早餐", nutritionHighlights: ["易搭配", "优质蛋白", "主食能量"], allergens: ["蛋类"], safetyNote: "产后并不需要过度进补；剖宫产、贫血或其他情况请按医生建议调整饮食。",
    ingredients: [{ name: "小米", amount: "50克" }, { name: "南瓜", amount: "100克" }, { name: "鸡蛋", amount: "1个" }, { name: "温水", amount: "鸡蛋液的1.5倍" }],
    steps: [{ instruction: "小米淘洗，南瓜切小丁，加水煮开后小火熬至软糯。", duration: "25分钟" }, { instruction: "鸡蛋与温水打匀过筛，盖盘后蒸至完全凝固。", duration: "12分钟" }, { instruction: "粥和蒸蛋温热后食用，按需搭配一份蔬菜。", duration: "1分钟" }]
  },
  {
    id: "postpartum-chicken-lotus", name: "莲藕菌菇鸡汤", category: "产后恢复餐", description: "鸡肉、莲藕与菌菇慢炖，不依赖油腻和重口调味。", emoji: "🍲", colorFrom: "#9a8064", colorTo: "#d8bd89", cookTime: 75, difficulty: "简单", flavor: "清鲜", servings: 3, featured: false,
    lifeStage: "postpartum", subStage: "哺乳期", mealType: "午晚餐", nutritionHighlights: ["蛋白质", "水分补充", "蔬菜搭配"], allergens: [], safetyNote: "哺乳期通常不需要特殊忌口；若怀疑宝宝对某食物反应，应咨询医生，不要自行大范围限制饮食。",
    ingredients: [{ name: "鸡腿", amount: "2只" }, { name: "莲藕", amount: "300克" }, { name: "鲜香菇", amount: "6朵" }, { name: "胡萝卜", amount: "1根" }, { name: "姜", amount: "3片" }],
    steps: [{ instruction: "鸡腿去皮切块，冷水焯透并洗净。", duration: "10分钟" }, { instruction: "莲藕、胡萝卜切块，香菇对半切。", duration: "6分钟" }, { instruction: "所有食材加足量水煮开，转小火炖50分钟。", duration: "55分钟" }, { instruction: "撇去浮油，以少量盐调味。", duration: "3分钟" }]
  },
  {
    id: "postpartum-shrimp-tofu-egg", name: "虾仁豆腐蒸蛋", category: "产后恢复餐", description: "滑嫩蒸蛋搭配虾仁和豆腐，适合忙碌时快速准备。", emoji: "🍮", colorFrom: "#d8a57c", colorTo: "#f0d7a4", cookTime: 22, difficulty: "简单", flavor: "鲜嫩", servings: 2, featured: false,
    lifeStage: "postpartum", subStage: "哺乳期", mealType: "午晚餐", nutritionHighlights: ["优质蛋白", "钙", "快手"], allergens: ["蛋类", "甲壳类", "大豆"], safetyNote: "鸡蛋和虾仁都要完全熟透；本人有过敏史时不要尝试相应食材。",
    ingredients: [{ name: "鸡蛋", amount: "2个" }, { name: "鲜虾仁", amount: "100克" }, { name: "嫩豆腐", amount: "150克" }, { name: "温水", amount: "180毫升" }, { name: "小葱", amount: "少许" }],
    steps: [{ instruction: "虾仁去虾线，豆腐切小块；鸡蛋加温水打匀并过筛。", duration: "6分钟" }, { instruction: "豆腐放入蛋液，盖盘后上锅中火蒸8分钟。", duration: "8分钟" }, { instruction: "放虾仁继续蒸至蛋液凝固、虾仁完全变色熟透。", duration: "5分钟" }]
  },
  {
    id: "baby-pear-cereal", name: "梨泥强化铁米糊", category: "宝宝辅食", description: "从少量细滑泥糊开始，让宝宝尝试单纯的谷物与水果味。", emoji: "🍐", colorFrom: "#b6bd62", colorTo: "#e5dda0", cookTime: 10, difficulty: "简单", flavor: "自然清甜", servings: 1, featured: true,
    lifeStage: "baby", subStage: "6–8月龄", mealType: "辅食", nutritionHighlights: ["强化铁谷物", "细滑质地", "单一食材组合"], allergens: [], safetyNote: "约6月龄且已表现出添加辅食准备信号后再开始；不加盐、糖或蜂蜜。首次食用从少量开始并观察。", minAgeMonths: 6, texture: "细滑泥糊",
    ingredients: [{ name: "婴儿强化铁米粉", amount: "按包装建议1份" }, { name: "熟梨", amount: "30克" }, { name: "温水或母乳/配方奶", amount: "按需" }],
    steps: [{ instruction: "梨去皮去核，蒸至软烂后压成细腻梨泥。", duration: "8分钟" }, { instruction: "按产品包装说明用适宜液体冲调米粉。", duration: "1分钟" }, { instruction: "取少量梨泥拌入米糊，调整为能挂勺但容易吞咽的质地。", duration: "1分钟", tip: "冲调好的辅食现做现吃，剩余部分不要留到下一餐。" }]
  },
  {
    id: "baby-pumpkin-chicken", name: "南瓜鸡肉泥", category: "宝宝辅食", description: "南瓜与彻底煮熟的鸡肉搅打成细腻浓稠的泥。", emoji: "🎃", colorFrom: "#d88a3d", colorTo: "#efc86a", cookTime: 25, difficulty: "简单", flavor: "食材原味", servings: 1, featured: false,
    lifeStage: "baby", subStage: "6–8月龄", mealType: "辅食", nutritionHighlights: ["优质蛋白", "铁", "维生素A食物来源"], allergens: [], safetyNote: "不加盐、糖、蜂蜜或调味料；鸡肉彻底煮熟并打细，进食时让宝宝坐直并全程看护。", minAgeMonths: 7, texture: "细腻浓泥",
    ingredients: [{ name: "去皮南瓜", amount: "50克" }, { name: "鸡胸肉", amount: "20克" }, { name: "温开水", amount: "适量" }],
    steps: [{ instruction: "南瓜切小块蒸软；鸡肉切小块后煮至中心完全熟透。", duration: "18分钟" }, { instruction: "南瓜与鸡肉加少量温水搅打细腻。", duration: "3分钟" }, { instruction: "食用前检查温度和是否有硬块，先喂少量。", duration: "1分钟" }]
  },
  {
    id: "baby-egg-spinach-congee", name: "菠菜鸡蛋软粥", category: "宝宝辅食", description: "软粥里加入切碎的菠菜与全熟鸡蛋，逐步练习颗粒感。", emoji: "🥚", colorFrom: "#6e9e5f", colorTo: "#d6c66c", cookTime: 28, difficulty: "简单", flavor: "食材原味", servings: 1, featured: false,
    lifeStage: "baby", subStage: "8–11月龄", mealType: "辅食", nutritionHighlights: ["蛋类", "蔬菜", "软颗粒练习"], allergens: ["蛋类"], safetyNote: "鸡蛋必须完全熟透；首次引入蛋类应少量并观察过敏反应。不加盐、糖或蜂蜜。", minAgeMonths: 8, texture: "软烂小颗粒",
    ingredients: [{ name: "熟软粥", amount: "100克" }, { name: "鸡蛋", amount: "半个" }, { name: "菠菜嫩叶", amount: "15克" }],
    steps: [{ instruction: "菠菜焯熟后切成细末。", duration: "3分钟" }, { instruction: "软粥小火煮开，淋入打散的鸡蛋并煮至完全凝固。", duration: "5分钟" }, { instruction: "拌入菠菜末，再煮1分钟；放至适口温度。", duration: "2分钟" }]
  },
  {
    id: "baby-salmon-soft-rice", name: "三文鱼蔬菜软饭", category: "宝宝辅食", description: "去刺鱼肉、蔬菜和软饭组合成可用牙龈压碎的小颗粒。", emoji: "🐟", colorFrom: "#dd826b", colorTo: "#8dbb8c", cookTime: 24, difficulty: "适中", flavor: "食材原味", servings: 1, featured: true,
    lifeStage: "baby", subStage: "9–11月龄", mealType: "辅食", nutritionHighlights: ["鱼类", "蔬菜", "软颗粒练习"], allergens: ["鱼类"], safetyNote: "逐片检查并完全去除鱼刺，鱼肉彻底蒸熟；首次引入鱼类少量观察。不加盐、糖或蜂蜜。", minAgeMonths: 9, texture: "可压碎软颗粒",
    ingredients: [{ name: "三文鱼", amount: "25克" }, { name: "软米饭", amount: "70克" }, { name: "胡萝卜", amount: "15克" }, { name: "西兰花", amount: "15克" }],
    steps: [{ instruction: "鱼肉蒸熟后逐片检查鱼刺并压碎；蔬菜蒸软切细。", duration: "15分钟" }, { instruction: "软饭加少量水煮至黏软，拌入鱼肉和蔬菜。", duration: "6分钟" }, { instruction: "确认颗粒能用手指轻松压碎，放凉后喂食。", duration: "1分钟" }]
  },
  {
    id: "baby-tomato-beef-pasta", name: "番茄牛肉碎碎面", category: "宝宝辅食", description: "软面、番茄和细碎牛肉，帮助宝宝向家庭餐逐步过渡。", emoji: "🍝", colorFrom: "#c95f4c", colorTo: "#e7aa66", cookTime: 25, difficulty: "简单", flavor: "自然酸香", servings: 1, featured: false,
    lifeStage: "baby", subStage: "12–23月龄", mealType: "午晚餐", nutritionHighlights: ["铁", "优质蛋白", "家庭餐过渡"], allergens: ["含麸质谷物"], safetyNote: "牛肉切得足够细并彻底煮熟，面条剪短煮软；少盐，不给整颗坚果、硬块或其他噎食风险食物。", minAgeMonths: 12, texture: "软烂碎粒",
    ingredients: [{ name: "宝宝面或细面", amount: "40克" }, { name: "牛肉末", amount: "30克" }, { name: "番茄", amount: "半个" }, { name: "西葫芦", amount: "20克" }],
    steps: [{ instruction: "番茄去皮切碎，西葫芦切细末；面条剪短。", duration: "5分钟" }, { instruction: "牛肉末炒散至完全变色，加入番茄和西葫芦煮软。", duration: "8分钟" }, { instruction: "面条煮至比成人面更软，拌入番茄牛肉酱。", duration: "8分钟" }, { instruction: "检查没有大块或硬块，放至适口温度。", duration: "1分钟" }]
  },
  {
    id: "preconception-oat-yogurt", name: "坚果燕麦酸奶杯", category: "备孕均衡餐", description: "燕麦、巴氏杀菌酸奶和水果组合成一份轻松早餐。", emoji: "🥣", colorFrom: "#d8ad66", colorTo: "#eee0ae", cookTime: 8, difficulty: "简单", flavor: "清甜", servings: 1, featured: false,
    lifeStage: "preconception", subStage: "女性备孕", mealType: "早餐", nutritionHighlights: ["全谷物", "钙搭配", "膳食纤维"], allergens: ["乳制品", "坚果"], safetyNote: "按个人过敏史选择食材；备孕期补充剂请遵从医生建议。",
    ingredients: [{ name: "原味酸奶", amount: "150克" }, { name: "即食燕麦", amount: "35克" }, { name: "蓝莓", amount: "一小把" }, { name: "核桃碎", amount: "10克" }],
    steps: [{ instruction: "确认酸奶为巴氏杀菌产品，水果洗净沥干。", duration: "3分钟" }, { instruction: "杯中依次放入酸奶、燕麦和水果，最后撒核桃碎。", duration: "3分钟" }, { instruction: "现做现吃；坚果可按需要替换为南瓜籽。", duration: "1分钟" }]
  },
  {
    id: "preconception-tofu-buckwheat", name: "豆腐时蔬荞麦面", category: "备孕均衡餐", description: "嫩豆腐、深绿叶菜和荞麦面，十几分钟就能做好一碗。", emoji: "🍜", colorFrom: "#718d55", colorTo: "#d7bd74", cookTime: 18, difficulty: "简单", flavor: "清香", servings: 2, featured: false,
    lifeStage: "preconception", subStage: "夫妻备孕", mealType: "午晚餐", nutritionHighlights: ["植物蛋白", "全谷物", "蔬菜搭配"], allergens: ["大豆", "含麸质谷物"], safetyNote: "豆腐需充分加热；备孕饮食重在多样搭配，不替代个体化医疗建议。",
    ingredients: [{ name: "荞麦面", amount: "160克" }, { name: "北豆腐", amount: "200克" }, { name: "上海青", amount: "200克" }, { name: "香菇", amount: "4朵" }],
    steps: [{ instruction: "豆腐切块，香菇切片，青菜洗净。", duration: "4分钟" }, { instruction: "荞麦面煮熟后捞出；豆腐和香菇下锅煎至热透。", duration: "9分钟" }, { instruction: "放青菜炒软，加入面条和少量生抽翻匀。", duration: "3分钟" }]
  },
  {
    id: "preconception-chicken-quinoa", name: "口蘑鸡胸藜麦沙拉", category: "备孕均衡餐", description: "熟鸡胸、口蘑和藜麦搭配，清爽也有饱腹感。", emoji: "🥗", colorFrom: "#76a177", colorTo: "#e3c77e", cookTime: 26, difficulty: "简单", flavor: "清爽鲜香", servings: 2, featured: false,
    lifeStage: "preconception", subStage: "夫妻备孕", mealType: "午晚餐", nutritionHighlights: ["优质蛋白", "全谷物", "蔬菜搭配"], allergens: [], safetyNote: "鸡肉须完全熟透；生食蔬菜要充分清洗，肠胃敏感时可改为焯熟蔬菜。",
    ingredients: [{ name: "鸡胸肉", amount: "220克" }, { name: "熟藜麦", amount: "2碗" }, { name: "口蘑", amount: "150克" }, { name: "生菜", amount: "100克" }],
    steps: [{ instruction: "鸡胸肉煎或煮至中心完全熟透，静置后切片。", duration: "12分钟" }, { instruction: "口蘑切片炒熟，生菜充分洗净沥水。", duration: "8分钟" }, { instruction: "将藜麦、鸡肉和蔬菜拌匀，淋少量橄榄油和柠檬汁。", duration: "2分钟" }]
  },
  {
    id: "pregnancy-shrimp-tofu", name: "虾仁豆腐烩饭", category: "孕期安心餐", description: "虾仁、豆腐和软米饭一锅煨，鲜嫩温和。", emoji: "🍚", colorFrom: "#dba17b", colorTo: "#a7c6a1", cookTime: 24, difficulty: "简单", flavor: "鲜嫩", servings: 1, featured: false,
    lifeStage: "pregnancy", subStage: "孕早期", mealType: "午晚餐", nutritionHighlights: ["优质蛋白", "主食能量", "易入口"], allergens: ["甲壳类", "大豆"], safetyNote: "虾仁和豆腐都要彻底加热；有过敏史或妊娠期疾病时遵循医生建议。",
    ingredients: [{ name: "鲜虾仁", amount: "100克" }, { name: "嫩豆腐", amount: "150克" }, { name: "米饭", amount: "1碗" }, { name: "豌豆", amount: "50克" }],
    steps: [{ instruction: "虾仁去虾线洗净，豆腐切小块。", duration: "5分钟" }, { instruction: "虾仁炒至完全变色，加入豆腐、豌豆和少量热水煮透。", duration: "8分钟" }, { instruction: "放入米饭小火煨软，以少量盐调味。", duration: "6分钟" }]
  },
  {
    id: "pregnancy-corn-chicken-soup", name: "玉米山药鸡汤", category: "孕期安心餐", description: "鸡肉、玉米和山药慢炖，汤味清甜不油腻。", emoji: "🍲", colorFrom: "#d4a856", colorTo: "#e8d693", cookTime: 70, difficulty: "简单", flavor: "清甜", servings: 3, featured: false,
    lifeStage: "pregnancy", subStage: "孕中期", mealType: "午晚餐", nutritionHighlights: ["优质蛋白", "水分补充", "蔬菜搭配"], allergens: [], safetyNote: "鸡肉需炖至完全熟透；如有妊娠糖尿病等情况，请按产检医生建议调整主食和汤品份量。",
    ingredients: [{ name: "去皮鸡腿", amount: "2只" }, { name: "鲜玉米", amount: "1根" }, { name: "山药", amount: "250克" }, { name: "姜", amount: "3片" }],
    steps: [{ instruction: "鸡腿焯水洗净，玉米切段，山药去皮切块。", duration: "12分钟" }, { instruction: "鸡腿和姜加足量水煮开，转小火炖40分钟。", duration: "40分钟" }, { instruction: "加入玉米和山药炖熟，以少量盐调味。", duration: "18分钟" }]
  },
  {
    id: "pregnancy-sesame-spinach", name: "芝麻菠菜鸡蛋饭", category: "孕期安心餐", description: "全熟鸡蛋、菠菜和米饭的快手组合，清淡好入口。", emoji: "🥬", colorFrom: "#65945e", colorTo: "#e2c66d", cookTime: 16, difficulty: "简单", flavor: "清香", servings: 1, featured: false,
    lifeStage: "pregnancy", subStage: "孕晚期", mealType: "午晚餐", nutritionHighlights: ["蛋类", "蔬菜搭配", "主食能量"], allergens: ["蛋类", "芝麻"], safetyNote: "鸡蛋要完全熟透；孕期饮食请避免自行过度限制或进补。",
    ingredients: [{ name: "鸡蛋", amount: "2个" }, { name: "菠菜", amount: "180克" }, { name: "米饭", amount: "1碗" }, { name: "熟白芝麻", amount: "5克" }],
    steps: [{ instruction: "菠菜焯熟切段，鸡蛋打散。", duration: "4分钟" }, { instruction: "鸡蛋炒至完全凝固，放入菠菜快速翻匀。", duration: "5分钟" }, { instruction: "和热米饭装盘，撒少量熟芝麻。", duration: "1分钟" }]
  },
  {
    id: "postpartum-broccoli-chicken", name: "西兰花鸡肉焖饭", category: "产后恢复餐", description: "鸡肉、蔬菜和米饭一锅焖熟，忙碌时也能好好吃饭。", emoji: "🍛", colorFrom: "#86a66e", colorTo: "#dec071", cookTime: 30, difficulty: "简单", flavor: "鲜香", servings: 2, featured: false,
    lifeStage: "postpartum", subStage: "产后恢复", mealType: "午晚餐", nutritionHighlights: ["优质蛋白", "一锅完成", "蔬菜搭配"], allergens: [], safetyNote: "产后饮食以均衡、足量和适口为主；鸡肉务必彻底煮熟。",
    ingredients: [{ name: "鸡腿肉", amount: "220克" }, { name: "大米", amount: "150克" }, { name: "西兰花", amount: "150克" }, { name: "胡萝卜", amount: "半根" }],
    steps: [{ instruction: "鸡腿肉切小块炒至变色，胡萝卜切丁。", duration: "8分钟" }, { instruction: "大米淘洗后与鸡肉、胡萝卜加适量水焖熟。", duration: "18分钟" }, { instruction: "西兰花焯熟后拌入焖饭，焖1分钟即可。", duration: "3分钟" }]
  },
  {
    id: "postpartum-cod-tofu", name: "鳕鱼豆腐煮青菜", category: "产后恢复餐", description: "鱼肉和豆腐一起煮，细嫩鲜香、调味简单。", emoji: "🐟", colorFrom: "#77a8a1", colorTo: "#d7c99b", cookTime: 20, difficulty: "简单", flavor: "清鲜", servings: 2, featured: false,
    lifeStage: "postpartum", subStage: "哺乳期", mealType: "午晚餐", nutritionHighlights: ["鱼类", "优质蛋白", "快手"], allergens: ["鱼类", "大豆"], safetyNote: "鱼肉要彻底煮熟并仔细检查鱼刺；哺乳期无需盲目忌口，有疑虑请咨询医生。",
    ingredients: [{ name: "鳕鱼", amount: "220克" }, { name: "北豆腐", amount: "200克" }, { name: "小青菜", amount: "200克" }, { name: "姜", amount: "2片" }],
    steps: [{ instruction: "鳕鱼切块并检查鱼刺，豆腐切块，青菜洗净。", duration: "5分钟" }, { instruction: "锅中加水和姜片煮开，放豆腐和鳕鱼煮至鱼肉完全熟透。", duration: "9分钟" }, { instruction: "加入青菜煮软，以少量盐调味。", duration: "2分钟" }]
  },
  {
    id: "postpartum-oat-sesame", name: "黑芝麻燕麦糊", category: "产后恢复餐", description: "黑芝麻、燕麦和牛奶打成温润早餐，准备很省心。", emoji: "🥛", colorFrom: "#746a6a", colorTo: "#d5b979", cookTime: 12, difficulty: "简单", flavor: "谷物香", servings: 1, featured: false,
    lifeStage: "postpartum", subStage: "产后恢复", mealType: "早餐", nutritionHighlights: ["全谷物", "钙搭配", "快手"], allergens: ["芝麻", "乳制品"], safetyNote: "如有乳糖不耐受可换成适合自己的无糖奶；产后贫血等情况请遵医嘱。",
    ingredients: [{ name: "燕麦片", amount: "40克" }, { name: "熟黑芝麻", amount: "10克" }, { name: "牛奶", amount: "250毫升" }, { name: "香蕉", amount: "半根" }],
    steps: [{ instruction: "燕麦加牛奶小火煮软。", duration: "6分钟" }, { instruction: "与黑芝麻、香蕉一起搅打至细腻。", duration: "3分钟" }, { instruction: "温热后食用，不额外加糖。", duration: "1分钟" }]
  },
  {
    id: "baby-carrot-potato-puree", name: "胡萝卜土豆泥", category: "宝宝辅食", description: "两种熟软根茎菜打成细腻泥，味道单纯好接受。", emoji: "🥕", colorFrom: "#d9854e", colorTo: "#efd27b", cookTime: 22, difficulty: "简单", flavor: "自然甘甜", servings: 1, featured: false,
    lifeStage: "baby", subStage: "6–8月龄", mealType: "辅食", nutritionHighlights: ["细滑质地", "蔬菜", "单一食材组合"], allergens: [], safetyNote: "约6月龄且已具备添加辅食准备信号后再开始；不加盐、糖、蜂蜜或调味料。", minAgeMonths: 6, texture: "细滑菜泥",
    ingredients: [{ name: "胡萝卜", amount: "40克" }, { name: "土豆", amount: "40克" }, { name: "温开水", amount: "适量" }],
    steps: [{ instruction: "胡萝卜和土豆去皮切小块，蒸至完全软烂。", duration: "18分钟" }, { instruction: "加少量温开水压泥或搅打至顺滑。", duration: "2分钟" }, { instruction: "检查温度和硬块，从少量开始喂食。", duration: "1分钟" }]
  },
  {
    id: "baby-banana-oatmeal", name: "香蕉燕麦糊", category: "宝宝辅食", description: "软烂香蕉和燕麦打成稠糊，适合作为一份加餐。", emoji: "🍌", colorFrom: "#dbbe54", colorTo: "#eee1a0", cookTime: 12, difficulty: "简单", flavor: "自然清甜", servings: 1, featured: false,
    lifeStage: "baby", subStage: "8–11月龄", mealType: "辅食", nutritionHighlights: ["谷物", "软糊质地", "水果"], allergens: ["含麸质谷物"], safetyNote: "不加糖或蜂蜜；首次食用新食材少量尝试并观察，不用整粒或硬块食物。", minAgeMonths: 8, texture: "稠糊状",
    ingredients: [{ name: "熟香蕉", amount: "半根" }, { name: "燕麦片", amount: "20克" }, { name: "温开水", amount: "120毫升" }],
    steps: [{ instruction: "燕麦加水煮至非常软烂。", duration: "8分钟" }, { instruction: "香蕉压泥后与燕麦混合，按需搅打细一些。", duration: "2分钟" }, { instruction: "放至适口温度后再喂食。", duration: "1分钟" }]
  },
  {
    id: "baby-tofu-vegetable-congee", name: "豆腐青菜软粥", category: "宝宝辅食", description: "软粥加细碎豆腐和青菜，练习更丰富的软颗粒。", emoji: "🥬", colorFrom: "#76a065", colorTo: "#e0d083", cookTime: 20, difficulty: "简单", flavor: "食材原味", servings: 1, featured: false,
    lifeStage: "baby", subStage: "9–11月龄", mealType: "辅食", nutritionHighlights: ["植物蛋白", "软颗粒练习", "蔬菜"], allergens: ["大豆"], safetyNote: "豆腐要彻底加热，食材切细并确认可轻松压碎；不加盐、糖、蜂蜜或调味料。", minAgeMonths: 9, texture: "可压碎软颗粒",
    ingredients: [{ name: "熟软粥", amount: "120克" }, { name: "嫩豆腐", amount: "30克" }, { name: "小青菜", amount: "20克" }],
    steps: [{ instruction: "青菜焯熟切得很细，豆腐压碎。", duration: "4分钟" }, { instruction: "软粥煮开后加入豆腐和青菜，煮至完全热透。", duration: "5分钟" }, { instruction: "检查颗粒可被手指压碎，放凉后食用。", duration: "1分钟" }]
  },
  {
    id: "family-mushroom-chicken", name: "香菇滑鸡", category: "快手家常", description: "鸡肉嫩、香菇鲜，一盘菜配饭刚刚好。", emoji: "🍗", colorFrom: "#9a754e", colorTo: "#d9b56e", cookTime: 22, difficulty: "简单", flavor: "咸鲜", servings: 2, featured: false,
    ingredients: [{ name: "鸡腿肉", amount: "320克" }, { name: "鲜香菇", amount: "180克" }, { name: "青椒", amount: "1个" }, { name: "生抽", amount: "15毫升" }],
    steps: [{ instruction: "鸡腿肉切块，加生抽和少许淀粉抓匀；香菇切片。", duration: "6分钟" }, { instruction: "鸡肉下锅炒至完全变色，盛出备用。", duration: "6分钟" }, { instruction: "香菇和青椒炒软，倒回鸡肉翻匀至熟透。", duration: "5分钟" }]
  },
  {
    id: "family-loofah-eggs", name: "丝瓜炒鸡蛋", category: "快手家常", description: "丝瓜清甜、鸡蛋软嫩，十分钟端上桌。", emoji: "🥒", colorFrom: "#75a46c", colorTo: "#e0cc75", cookTime: 12, difficulty: "简单", flavor: "清甜", servings: 2, featured: false,
    ingredients: [{ name: "丝瓜", amount: "2根" }, { name: "鸡蛋", amount: "3个" }, { name: "蒜", amount: "2瓣" }, { name: "食用油", amount: "15毫升" }],
    steps: [{ instruction: "丝瓜去皮切滚刀块，鸡蛋打散，蒜切末。", duration: "4分钟" }, { instruction: "鸡蛋炒至完全凝固后盛出。", duration: "3分钟" }, { instruction: "蒜末炒香，放丝瓜炒软，倒回鸡蛋翻匀。", duration: "3分钟" }]
  },
  {
    id: "family-soy-chicken-wings", name: "可乐鸡翅", category: "下饭荤菜", description: "甜咸入味的家常鸡翅，周末做一盘刚好。", emoji: "🍗", colorFrom: "#82443a", colorTo: "#d47d48", cookTime: 35, difficulty: "简单", flavor: "咸甜", servings: 3, featured: false,
    ingredients: [{ name: "鸡翅中", amount: "500克" }, { name: "可乐", amount: "250毫升" }, { name: "生抽", amount: "20毫升" }, { name: "姜", amount: "4片" }],
    steps: [{ instruction: "鸡翅划两刀，焯水后洗净沥干。", duration: "10分钟" }, { instruction: "鸡翅煎至两面微黄，加入姜片、生抽和可乐。", duration: "8分钟" }, { instruction: "小火焖至鸡翅完全熟透，再开盖收汁。", duration: "15分钟" }]
  }
];
