import {
  LucideProps,
  MusicIcon,
  MessageCircleHeartIcon,
  PickaxeIcon,
  QrCodeIcon,
  TimerIcon,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export const MENU_ROUTE = {
  LANDING: '/',
  QR_CODE: '/qr-code',
  TIMER: '/timer',
  RANDOM_PICK: '/random-pick',
  MUSIC_REQUEST: '/music-request',
} as const;

export const HELP_ROUTE = {
  FEEDBACK: '/feedback',
} as const;

export type MenuRoutePath = (typeof MENU_ROUTE)[keyof typeof MENU_ROUTE];

type PathData<T extends string> = Partial<
  Record<
    T,
    {
      title: string;
      Icon: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
      >;
      href: string;
    }
  >
>;

// NOTE:(김홍동) 네이게이션의 메뉴 영역과 최근 방문 페이지에서 사용되는 객체입니다.
export const MENU_PATH_DATA: PathData<MenuRoutePath> = {
  '/qr-code': {
    title: 'QR코드',
    Icon: QrCodeIcon,
    href: MENU_ROUTE.QR_CODE,
  },
  '/random-pick': {
    title: '랜덤뽑기',
    Icon: PickaxeIcon,
    href: MENU_ROUTE.RANDOM_PICK,
  },
  '/timer': {
    title: '타이머',
    Icon: TimerIcon,
    href: MENU_ROUTE.TIMER,
  },
  '/music-request': {
    title: '음악신청',
    Icon: MusicIcon,
    href: MENU_ROUTE.MUSIC_REQUEST,
  },
};

type HelpRoutePath = (typeof HELP_ROUTE)[keyof typeof HELP_ROUTE];

// NOTE:(김홍동) 네이게이션의 도움 영역에서 사용되는 객체입니다.
export const HELP_PATH_DATA: PathData<HelpRoutePath> = {
  '/feedback': {
    title: '피드백',
    Icon: MessageCircleHeartIcon,
    href: HELP_ROUTE.FEEDBACK,
  },
};
