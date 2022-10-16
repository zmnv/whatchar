import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { getRandomElementFromArray, getWhatcharData } from './logic';
import { shuffle } from './logic/shuffle';

const EMOJI_DIC = ['👌', '🤌', '🤟', '👍', '🙌', '👏'];
const getRandomEmoji = () => getRandomElementFromArray(EMOJI_DIC);

const VariantButton = ({
  char,
  value = " ",
  onClick,
  isAnswer = false,
}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(char);
    }
  }, [char, onClick]);

  const activeClass = isAnswer ? "active:bg-green-500" : "active:bg-red-500";

  return (
    <button onClick={handleClick} className={`w-full outline-none justify-center items-center leading-4 text-center font-medium rounded-full text-white px-4 py-8 bg-white bg-opacity-5 ${activeClass} text-2xl overflow-hidden`}>
      {value.toUpperCase()}
    </button>
  )
}

function App() {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    answer: {},
    variants: [],
  });

  function calculate() {
    setSuccess(false);
    const { answer, variants } = getWhatcharData();
    setData({
      answer,
      variants,
    });
  }

  useEffect(() => {
    calculate();
  }, []);

  const { answer, variants } = data || {};

  const onVariantSelected = useCallback((char) => {
    console.log('CLICKED', char);
    if (answer.char === char.char) {
      console.log('%c%s', 'font-weight:bold;color:green', 'YES!');
      setTimeout(() => {
        setSuccess(true);

        setTimeout(() => {
          calculate();
        }, 500);
  
      }, 300);
    } else {
      console.log('%c%s', 'font-weight:bold;color:red', 'FUCK NO!');
      window.navigator.vibrate(200);
    }
  }, [answer.char]);


  return (
    <div className={classNames(
      "flex justify-center align-middle w-full h-full overflow-hidden",
      success && "bg-green-400",
    )}>
      <div className="flex flex-grow max-w-[420px] px-4 flex-col justify-center items-center text-center">
        <div className="mb-16">
          <p className={classNames("mt-4 font-bold text-white",
          success ? "bg-white rounded-full p-8 text-8xl" : "text-9xl")}>
            {success ? getRandomEmoji() : (answer.char || "?")}
          </p>
        </div>
        {!success && (
          <p className="mb-6">
            It's pronounced like:
          </p>
        )}
        <div className="w-full grid grid-rows-2 grid-flow-col gap-4">
          {!success && shuffle(shuffle(variants)).map(v => {
            return (
              <VariantButton
                key={v.char}
                char={v}
                onClick={onVariantSelected}
                value={v.spelling}
                isAnswer={v.char === answer.char}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
