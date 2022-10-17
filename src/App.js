import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './App.css';

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { OptionButton } from './components/VariantButton';
import { shuffle } from './logic/shuffle';
import { getWhatcharData } from './logic';
import { DICTIONARIES } from './logic/dictionary';

import { Menu } from './components/Menu';

const NEXT_CALCULATE_DELAY = 500;

function App() {
  let { alph: dictionary } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(true);
  const [data, setData] = useState({
    answer: {},
    variants: [],
  });

  const calculate = useCallback(() => {
    setSuccess(false);
    const _dic = (DICTIONARIES[dictionary] || {}).src;
    if (!_dic) return;
    const { answer, variants } = getWhatcharData(_dic);
    setData({
      answer,
      variants: shuffle(shuffle(variants)),
    });
  }, [dictionary]);

  useEffect(() => {
    calculate();
  }, [dictionary])

  const { answer, variants } = data || {};

  const onVariantSelected = useCallback((char) => {
    if (answer.char === char.char) {
      setSuccess(true);
      setTimeout(() => {
        calculate();
      }, NEXT_CALCULATE_DELAY);
    }
  }, [answer.char, calculate]);


  return (
    <div className={classNames(
      "flex justify-center align-middle w-full h-full overflow-hidden",
    )}>
      <div className="absolute left-auto right-0 top-0 bottom-auto">
        <Menu renderButton={({ open }) => (
          <button className="m-4 p-2 px-3 rounded-2xl text-sm text-white text-opacity-50 bg-white bg-opacity-5 " onClick={open}>menu</button>
        )}>
          {({ close }) => (
            <div className="p-4 pb-1">
              <p className="text-sm mb-4">Switch Alphabet</p>
              <div className="gap-2 columns-2 flex-wrap">
                {Object.keys(DICTIONARIES).map((dicKey, index) => {
                  const dic = DICTIONARIES[dicKey];
                  return (
                    <button
                      key={dicKey}
                      onClick={() => {
                        close();
                        navigate(`/${dicKey}`);
                        // setAlphabet(index);
                      }}
                      className={classNames(
                        "flex items-center justify-center w-full mb-2  py-3 px-4 text-base font-semibold text-white bg-white bg-opacity-5 rounded-2xl",
                        dictionary === dicKey && "bg-blue-500 bg-opacity-100"
                      )}
                    >
                      {dic.title}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </Menu>
      </div>
      <div className="flex flex-grow max-w-[420px] px-6 flex-col justify-center items-center text-center">
        <div className="mb-16">
          <p className="mt-4 font-bold text-white text-9xl">
            {answer.char || "?"}
          </p>
        </div>

        <div className="mb-6 flex items-center">
          {success ? "You are right!" : !!answer.char ? "It's pronounced like:" : "I don't have this alphabet, sorry :("}
          {success && (
            <div className="pl-2">
              <CountdownCircleTimer
                isPlaying={success}
                size={20}
                duration={60 / NEXT_CALCULATE_DELAY + 0.25}
                colors={['rgba(255,255,255,0.3)']}
                trailColor="rgba(255,255,255,0.1)"
                strokeWidth={3}

              // colorsTime={[7, 5, 2, 0]}
              />
            </div>
          )}
        </div>

        <div className="w-full columns-2 gap-2">
          {variants.map(v => {
            return (
              <OptionButton
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
    </div>
  );
}

export default App;
