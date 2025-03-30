'use client';

import MusicRequestStudentMain from './music-request-student-main/music-request-student-main';
import MusicRequestStudentProvider from './music-request-student-provider/music-request-student-provider';

export default function MusicRequestStudentContainer({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  return (
    <div className="bg-body transition-all ease-in-out duration-500 lg:data-[status=closed]:ml-0 px-4 py-8">
      <MusicRequestStudentProvider>
        <MusicRequestStudentMain roomId={params.roomId} />
      </MusicRequestStudentProvider>
    </div>
  );
}
