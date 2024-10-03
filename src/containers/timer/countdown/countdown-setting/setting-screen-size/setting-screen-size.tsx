import { PictureInPicture2 as PictureInPicture2Icon } from 'lucide-react';
import { Button } from '@/components/button';
import { SheetSubTitle } from '@/components/sheet';
import { resizeBrowserSizeByScreen } from './setting-screen-size.utils';

const SCREEN_SIZE = {
  FULL: 1,
  HALF: 1 / 2,
  QUARTER: 1 / 4,
} as const;

export default function SettingScreenSize() {
  return (
    <div className="flex flex-col gap-y-4">
      <SheetSubTitle>
        <PictureInPicture2Icon />
        화면 크기
      </SheetSubTitle>
      <div className="w-full grid grid-cols-3 gap-4">
        <Button
          variant="primary-outline"
          className="h-14"
          onClick={resizeBrowserSizeByScreen(SCREEN_SIZE.FULL)}
        >
          전체화면
        </Button>
        <Button
          variant="primary-outline"
          className="h-14"
          onClick={resizeBrowserSizeByScreen(SCREEN_SIZE.HALF)}
        >
          <div className="grid grid-cols-2 gap-1">
            <div className="w-6 h-4 border border-primary bg-primary" />
            {Array.from({ length: 3 })
              .map((_, index) => index)
              .map((index) => (
                <div key={index} className="w-6 h-4 border border-primary" />
              ))}
          </div>
        </Button>
        <Button
          variant="primary-outline"
          className="h-14"
          onClick={resizeBrowserSizeByScreen(SCREEN_SIZE.QUARTER)}
        >
          <div className="grid grid-cols-4 gap-px">
            <div className="w-3 h-2 border border-primary bg-primary" />
            {Array.from({ length: 15 })
              .map((_, index) => index)
              .map((index) => (
                <div key={index} className="w-3 h-2 border border-primary" />
              ))}
          </div>
        </Button>
      </div>
    </div>
  );
}
