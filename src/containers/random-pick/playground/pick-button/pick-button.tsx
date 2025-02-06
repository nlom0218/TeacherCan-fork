import { Button } from '@/components/button';
import { Form, FormControl, FormField } from '@/components/form';
import { getFormSchema } from '@/utils/getFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select';
import { cn } from '@/styles/utils';
import { useRandomPickState } from '../../random-pick-provider/random-pick-provider.hooks';
import {
  useRandomPickPlaygroundAction,
  useRandomPickPlaygroundState,
} from '../../random-pick-playground-provider.tsx/random-pick-playground-provider.hooks';
import type { WinnersType } from '../../random-pick-playground-provider.tsx/random-pick-playground-provider';

type Props = {
  setNewWinners: (winners: WinnersType[]) => void;
  openResult: () => void;
};

export default function PickButton({ setNewWinners, openResult }: Props) {
  const {
    options: { isExcludingSelected },
  } = useRandomPickState();
  const { winners, students, isAllStudentsPicked } =
    useRandomPickPlaygroundState();
  const { runPick } = useRandomPickPlaygroundAction();

  const formSchema = getFormSchema(students.length - winners.length);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: 1,
    },
  });

  const deduplicatedWinners = winners.reduce((acc: WinnersType[], cur) => {
    const isDuplicate = acc.some(({ id }) => id === cur.id);

    return isDuplicate ? acc : [...acc, cur];
  }, []);

  const restStudentNumbers = Array.from(
    {
      length: isExcludingSelected
        ? students.length - deduplicatedWinners.length
        : students.length,
    },
    (_, index) => index + 1,
  );

  const onSubmit = ({ number }: z.infer<typeof formSchema>) => {
    setNewWinners(runPick(number));
    openResult();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-4 px-6 py-4 bg-body rounded-3xl"
      >
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <div
              className={cn(
                'flex items-center gap-x-2',
                isAllStudentsPicked && 'hidden',
              )}
            >
              <FormControl>
                <Select
                  defaultValue={field.value.toString()}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="text-lg w-20 h-12">
                    <SelectValue placeholder="뽑을 인원" />
                  </SelectTrigger>
                  <SelectContent>
                    {restStudentNumbers.map((studentNumber) => (
                      <SelectItem
                        key={studentNumber}
                        value={studentNumber.toString()}
                      >
                        {studentNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <span className="text-lg">명</span>
            </div>
          )}
        />
        <Button
          type="submit"
          disabled={isAllStudentsPicked}
          size="lg"
          className="self-center p-10 rounded-2xl text-3xl hover:scale-105 active:scale-95"
        >
          뽑기
        </Button>
      </form>
    </Form>
  );
}
