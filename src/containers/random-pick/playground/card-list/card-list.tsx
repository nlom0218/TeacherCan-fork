import { useEffect, useRef, useState } from 'react';
import { useRandomPickState } from '../../random-pick-provider/random-pick-provider.hooks';
import Card from '../card/card';
import { useRandomPickPlaygroundState } from '../../random-pick-playground-provider.tsx/random-pick-playground-provider.hooks';

type Props = {
  isOpenModal: boolean;
};

export default function CardList({ isOpenModal }: Props) {
  const cardMixRef = useRef<NodeJS.Timeout | null>(null);

  const { pickList, pickType } = useRandomPickState();
  const { winners } = useRandomPickPlaygroundState();
  const winnerIds = winners.map((winner) => winner.id);

  const [students, setStudents] = useState(pickList[pickType]);

  useEffect(() => {
    if (isOpenModal) {
      cardMixRef.current = setInterval(() => {
        setStudents((prev) => [...prev].sort(() => Math.random() - 0.5));
      }, 100);
    } else {
      clearInterval(cardMixRef.current);
    }
    return () => clearInterval(cardMixRef.current);
  }, [isOpenModal]);

  useEffect(() => {
    setStudents(pickList[pickType]);
  }, [pickList[pickType]]);

  return (
    <div className="grid gap-2 p-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {(isOpenModal ? students : pickList[pickType]).map(({ id, value }) => (
        <Card
          key={id}
          title={value}
          isWinner={winnerIds.includes(id)}
          isOpenModal={isOpenModal}
        />
      ))}
    </div>
  );
}
