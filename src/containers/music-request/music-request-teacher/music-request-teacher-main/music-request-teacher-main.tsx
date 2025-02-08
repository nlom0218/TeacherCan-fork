import { useCallback, useEffect } from 'react';
import { getRoomTitle } from '@/utils/api/firebaseAPI';
import {
  useMusicRequestTeacherAction,
  useMusicRequestTeacherState,
} from '../music-request-teacher-provider/music-request-teacher-provider.hooks';
import MusicPlayer from './music-player/music-player';
import RoomInfo from './room-info/room-info';
import StudentList from './student-list/student-list';
import MusicList from './music-list/music-list';

export default function MusicRequestTeacherMain() {
  const { params } = useMusicRequestTeacherState();
  const { settingRoomId, settingRoomTitle } = useMusicRequestTeacherAction();

  const settingRoomTitleCallback = useCallback(
    async (id: string) => {
      settingRoomTitle(await getRoomTitle(id));
    },
    [settingRoomTitle],
  );

  useEffect(() => {
    if (params?.roomId) {
      settingRoomId(params.roomId);
      settingRoomTitleCallback(params.roomId);
    }
  }, [params?.roomId, settingRoomId, settingRoomTitleCallback]);

  return (
    <div className="grid grid-cols-6 h-screen">
      <div className="flex flex-col col-span-4">
        <MusicPlayer />
        <MusicList />
      </div>
      <div className="flex flex-col col-span-2">
        <RoomInfo />
        <StudentList />
      </div>
    </div>
  );
}
