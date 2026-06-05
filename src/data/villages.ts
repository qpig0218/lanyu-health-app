import type { VillageService } from './types.ts';

export const villageNames = ['東清', '野銀', '朗島', '紅頭', '漁人', '椰油'];

export const villageServices: VillageService[] = [
  { name: '椰油', x: 44, y: 14, households: 456, level: 'L2', focus: '衛生所、碼頭與慢病追蹤' },
  { name: '漁人', x: 34, y: 29, households: 238, level: 'L2', focus: '到檢交通與長者陪同' },
  { name: '紅頭', x: 31, y: 46, households: 629, level: 'L3', focus: '健檢動員、口腔與長照' },
  { name: '朗島', x: 68, y: 25, households: 356, level: 'L3', focus: '高齡安全與居家訪視' },
  { name: '東清', x: 74, y: 45, households: 588, level: 'L3', focus: '慢病、肺健康、家庭協議' },
  { name: '野銀', x: 62, y: 73, households: 276, level: 'L2', focus: '孕產支持與文化適切衛教' },
];
