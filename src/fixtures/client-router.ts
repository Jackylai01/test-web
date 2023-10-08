type Routes = {
  title: string;
  href: string;
  hasDropdown?: boolean;
  children?: Routes;
}[];

export const clientRoutes: Routes = [
  {
    title: '活動緣起',
    href: '/',
    hasDropdown: true,
    children: [
      { title: '故事背景', href: '/activity/story' },
      { title: '角色介紹', href: '/activity/character' },
    ],
  },
  {
    title: '競賽辦法',
    href: '/',
    hasDropdown: true,
    children: [
      { title: '個人賽', href: '/competition-method/personal' },
      {
        title: '校園競賽',
        href: '/competition-method/preliminary',
        hasDropdown: true,
        children: [
          { title: '校園初賽', href: '/competition-method/preliminary' },
          { title: '校園決賽', href: '/competition-method/finals' },
        ],
      },
      { title: '角色技能', href: '/competition-method/skill' },
      // { title: '活動好康', href: '/offers' },
    ],
  },
  {
    title: '影音專區',
    href: '/',
    hasDropdown: true,
    children: [
      { title: '活動照片', href: '/multimedia/gallery' },
      { title: '活動影片', href: '/multimedia/video' },
    ],
  },
  { title: '下載專區', href: '/download' },
  { title: '登島資訊', href: '/' },
  { title: '網路競賽', href: '/competition' },
  { title: '常見問題', href: '/faq' },
  { title: '聯絡我們', href: '/contact' },
  { title: '兌換獎品', href: '/' },
];
