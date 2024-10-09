import {
  AlarmClockPlus as AlarmClockPlusIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
} from 'lucide-react';
import { Button } from '@/components/button';
import { SheetSubTitle } from '@/components/sheet';
import { Label } from '@/components/label';
import { Switch } from '@/components/switch';
import {
  useCountdownAction,
  useCountdownState,
} from '../../countdown-provider/countdown-provider.hooks';

const SETTING_TIMES = [5, 10, -5, -10] as const;

export default function SettingTime() {
  const { isHourUsed } = useCountdownState();
  const { updateMinutes, toggleHourUsed } = useCountdownAction();

  return (
    <div className="flex flex-col gap-y-4">
      <SheetSubTitle>
        <AlarmClockPlusIcon />
        시간 증감
      </SheetSubTitle>
      <div className="max-sm:grid max-sm:grid-cols-2 sm:flex gap-2">
        {SETTING_TIMES.map((time) => (
          <Button
            value={time}
            key={time}
            variant={time > 0 ? 'primary-outline' : 'secondary-outline'}
            size="sm"
            className="flex-1 flex items-center gap-x-0.5 [&_svg]:size-4"
            onClick={() => updateMinutes(time, true)}
          >
            {time > 0 ? <PlusIcon /> : <MinusIcon />}
            {Math.abs(time)}분
          </Button>
        ))}
      </div>
      <Label className="flex items-center justify-between gap-x-2">
        <span>1시간 이상 사용</span>
        <Switch checked={isHourUsed} onClick={toggleHourUsed} />
      </Label>
    </div>
  );
}
