import { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import { formatFont, formatTime } from './countdown-pip.utiles';

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
  action: ReactNode;
};

export default function CountdownPIP({
  hours,
  minutes,
  seconds,
  action,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = formatFont(hours);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        formatTime(hours, minutes, seconds),
        canvas.width / 2,
        canvas.height / 2,
      );
    };

    draw();
  }, [hours, minutes, seconds]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const scaleFactor = 4;
    canvas.width = 400 * scaleFactor;
    canvas.height = 200 * scaleFactor;

    canvas.style.width = '400px';
    canvas.style.height = '200px';

    const stream = canvas.captureStream();
    video.srcObject = stream;
  }, []);

  const playVideo = () => {
    const video = videoRef.current;

    if (!video.paused || !video) {
      return;
    }

    video.play();
  };

  const startPIP = async () => {
    const video = videoRef.current;

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      return;
    }

    try {
      await video.requestPictureInPicture();
    } catch (error) {
      console.error('PIP 오류: ', error);
    }
  };

  const handleClickButton = () => {
    playVideo();
    startPIP();
  };

  return (
    <>
      <div onClick={handleClickButton}>{action}</div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {/* eslint-disable jsx-a11y/media-has-caption */}
      <video ref={videoRef} style={{ display: 'none' }} />
    </>
  );
}
