'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { X } from 'lucide-react';
import { PlayRoutineProvider } from './play-routine-provider';
import ActivityDisplay from './components/activity-display';
import NextActivities from './components/next-activities';
import RoutineComplete from './components/routine-complete';
import { usePlayRoutineContext } from './hooks/use-play-routine-context';

type PlayRoutineProps = {
  routineId: string;
};

function PlayRoutineContent() {
  const router = useRouter();
  const { routine, isCompleted, exitTimer, restartRoutine } =
    usePlayRoutineContext();

  const handleExit = () => {
    exitTimer();
    router.push(`/routine-timer/${routine?.key}`);
  };

  if (!routine) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl text-gray-500 mb-4">루틴을 찾을 수 없습니다</p>
        <Button
          onClick={() => router.push('/routine-timer')}
          className="bg-primary-500 text-white px-4 py-2 rounded"
        >
          돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">{routine.title}</h1>
        </div>
        <Button
          onClick={handleExit}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </Button>
      </div>

      {isCompleted ? (
        <RoutineComplete onRestart={restartRoutine} onExit={handleExit} />
      ) : (
        <>
          <ActivityDisplay />
          <NextActivities />
        </>
      )}
    </div>
  );
}

export default function PlayRoutine({ routineId }: PlayRoutineProps) {
  return (
    <PlayRoutineProvider routineId={routineId}>
      <PlayRoutineContent />
    </PlayRoutineProvider>
  );
}
