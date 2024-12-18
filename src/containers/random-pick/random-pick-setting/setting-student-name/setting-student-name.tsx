import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormMessage,
} from '@/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/textarea';
import { creatId } from '@/utils/createNonoid';
import {
  useRandomPickAction,
  useRandomPickState,
} from '../../random-pick-provider/random-pick-provider.hooks';
import { useRandomPickPlaygroundState } from '../../random-pick-playground-provider.tsx/random-pick-playground-provider.hooks';

const formSchema = z.object({
  names: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return val
          .split(/[,|\n]+/)
          .map((name) => name.trim())
          .filter(Boolean);
      }
      return val;
    },
    z
      .array(z.string())
      .refine((names) => names.length === new Set(names).size, {
        message: '중복된 이름이 있습니다.',
      })
      .refine((names) => names.length >= 2, {
        message: '최소 인원은 2명입니다.',
      })
      .refine((names) => names.length <= 30, {
        message: '최대 인원은 30명입니다.',
      }),
  ),
});

export default function SettingStudentName() {
  const { pickList } = useRandomPickState();
  const { modifyPickList } = useRandomPickAction();
  const { isRunning } = useRandomPickPlaygroundState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: pickList.names.map((name) => name.value),
    },
  });

  const onSubmit = ({ names }: z.infer<typeof formSchema>) => {
    modifyPickList(
      'names',
      names.map((name) => ({
        id: creatId(),
        value: name,
        isPicked: false,
        isUsed: true,
      })),
    );
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="names"
            render={({ field }) => (
              <>
                <div className="flex gap-x-4">
                  <FormControl>
                    <Textarea
                      className="min-h-[120px]"
                      placeholder="학생 이름 입력"
                      disabled={isRunning}
                      {...field}
                    />
                  </FormControl>
                  <Button type="submit" disabled={isRunning}>
                    생성
                  </Button>
                </div>
                <FormDescription>
                  학생 이름을 쉼표(,) 혹은 Enter로 구분하여 입력해주세요.
                </FormDescription>
                <FormMessage />
              </>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
