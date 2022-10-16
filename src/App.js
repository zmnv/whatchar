import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { getWhatcharData } from './logic';
import { shuffle } from './logic/shuffle';

const VariantButton = ({
  char,
  value = " ",
  onClick,
  isAnswer = false,
  className,
}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(char);
    }
  }, [char, onClick]);

  const activeClass = isAnswer ? "" : "active:bg-red-500";

  return (
    <button onClick={handleClick} className={classNames(
      `w-full mb-2 outline-none justify-center items-center leading-4 text-center font-medium rounded-full text-white px-4 py-8 bg-white bg-opacity-5 text-2xl overflow-hidden`,
      activeClass,
      className,
    )}>
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
      variants: shuffle(shuffle(variants)),
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
      setSuccess(true)
      setTimeout(() => {
        calculate();
      }, 500);
    } else {
      console.log('%c%s', 'font-weight:bold;color:red', 'FUCK NO!');
      window.navigator.vibrate(200);
    }
  }, [answer.char]);


  return (
    <div className={classNames(
      "flex justify-center align-middle w-full h-full overflow-hidden",
      // success && "bg-green-400",
    )}>
      <div className="flex flex-grow max-w-[420px] px-4 flex-col justify-center items-center text-center">
        <div className="mb-16">
          <p className={classNames("mt-4 font-bold text-white text-9xl",
            // success ? "bg-white rounded-full p-8 text-8xl" : "text-9xl"
          )}>
            {answer.char || "?"}
          </p>
        </div>

        <p className="mb-6">
          {success ? "You are right!" : "It's pronounced like:"}
        </p>

        <div className="w-full columns-2 gap-2">
          {variants.map(v => {
            return (
              <VariantButton
                key={v.char}
                char={v}
                onClick={onVariantSelected}
                value={v.spelling}
                isAnswer={v.char === answer.char}
                className={v.char === answer.char && success && "bg-green-500 bg-opacity-100"}
              />
            )
          })}

        </div>
      </div>
    </div >
  );
}

export default App;
