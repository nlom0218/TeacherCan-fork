import { Input } from '@/components/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/alert-dialog';
import { LoaderCircle } from 'lucide-react';
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';
import {
  useMusicRequestStudentAction,
  useMusicRequestStudentState,
} from '../../music-request-student-provider/music-request-student-provider.hooks';
import VideoCard from './video-card/video-card';
import { useSearchMusic } from './search-page.hooks';

const YOUTUBE_SEARCH_ERROR_MESSAGE = {
  EMPTY_INPUT: '검색어를 입력해 주세요.',
  API_ERROR: '검색을 실패 했어요. 다시 시도해주세요.',
} as const;

const formSchema = z.object({
  q: z.string().nonempty({ message: YOUTUBE_SEARCH_ERROR_MESSAGE.EMPTY_INPUT }),
});

type Props = {
  roomId: string;
};

export default function SearchPage({ roomId }: Props) {
  const { videos, isLoading, searchMusic } = useSearchMusic();

  const { studentName, alertOpen, alertMessage } =
    useMusicRequestStudentState();
  const { settingAlertOpen } = useMusicRequestStudentAction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: '',
    },
    reValidateMode: 'onSubmit',
  });

  const handleSearch = async (q: string) => {
    searchMusic(q, {
      onSuccess: () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      onError: () => {
        form.setError('q', {
          message: YOUTUBE_SEARCH_ERROR_MESSAGE.API_ERROR,
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <AlertDialog open={alertOpen} onOpenChange={settingAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="hidden">title</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => handleSearch(form.getValues('q')))}
          className="sticky top-0 bg-white z-10"
        >
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-x-2 py-4">
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="유튜브 검색어를 입력해주세요."
                    />
                  </FormControl>
                  <Button type="submit" variant="primary" className="w-[120px]">
                    {isLoading ? (
                      <LoaderCircle
                        size="18px"
                        className="animate-spin text-white"
                      />
                    ) : (
                      '검색'
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <ul className="flex flex-col gap-8">
        {videos &&
          videos.map((video) => (
            <VideoCard
              key={video.videoId}
              video={video}
              roomId={roomId}
              student={studentName}
            />
          ))}
      </ul>
    </div>
  );
}
