import './Question.scss';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import * as img from '../../assets/jpg/bird-silhouette.jpg';
import { useRef, useEffect } from 'react';

type QuestionPropsType = { birdName: string; imgSrc: string; audioSrc: string; isGuessed: boolean };

const Question = (data: QuestionPropsType): JSX.Element => {
  const { birdName, imgSrc, audioSrc, isGuessed } = data;
  const audio = useRef() as React.RefObject<HTMLAudioElement>;
  useEffect(() => {
    if (audio.current) {
      audio.current.play();
    }
  }, [audioSrc]);
  return (
    <div>
      <AudioPlayer
        audioSrc={audioSrc}
        type="quiz"
        onAudioEnded={() => {}}
        audio={audio}
        leftControl={null}
        rightControl={null}
        onPlayButtonClick={() => {}}
        image={
          <div className="question__container">
            <div
              className="question__img"
              style={{ backgroundImage: `url(${isGuessed ? imgSrc : img.default})` }}
            ></div>
            <p className="question__text">{isGuessed ? birdName : '???'}</p>
          </div>
        }
      ></AudioPlayer>
    </div>
  );
};

export default Question;
