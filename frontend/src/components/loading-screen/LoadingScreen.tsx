import React, { useEffect, useRef, useState } from "react";
import './LoadingScreen.scss';

interface LoadingStep {
  id: number;
  state: LoadingState;
  title?: string;
  start?: Date;
  finish?: Date;
  filesPrepared?: number;
  filesPreparedMax?: number;
}

type LoadingState = "waiting" | "progress" | "done";
type IconProps = {
  icon: string;
  color?: string;
};

const Icon = ({ icon, color }: IconProps) => {
  const colorClass = color ? ` icon--${color}` : "";
  return (
    <svg className={`icon${colorClass}`} width="16px" height="16px" aria-hidden="true">
      <use href={`#${icon}`} />
    </svg>
  );
};

// const IconSprites = () => {
//   const viewBox = "0 0 16 16";
//   const emptyCircleRectAngles = [];
//   const emptyCircleRectAngleCount = 16;

//   for (let r = 0; r < emptyCircleRectAngleCount; ++r) {
//     emptyCircleRectAngles.push(360 / emptyCircleRectAngleCount * r);
//   }

//   return (
//     <svg width="0" height="0" aria-hidden="true">
//       <symbol id="check-circle" viewBox={viewBox}>
//         <circle fill="currentcolor" cx="8" cy="8" r="8" />
//         <polyline fill="none" stroke="var(--bg)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" points="4 8,7 11,12 5" />
//       </symbol>
//       <symbol id="empty-circle" viewBox={viewBox}>
//         <defs>
//           <rect id="empty-circle-rect" x="-1" width="2" height="2" />
//         </defs>
//         <g fill="currentcolor" transform="translate(8,8)">
//           {
//             emptyCircleRectAngles.map((rotation, i) =>
//               <use key={i} href="#empty-circle-rect" transform={`rotate(${rotation}) translate(0,6)`} />
//             )
//           }
//         </g>
//       </symbol>
//       <symbol id="half-circle" viewBox={viewBox}>
//         <clipPath id="half-circle-clip">
//           <rect x="8" y="0" width="8" height="16" />
//         </clipPath>
//         <circle fill="none" stroke="currentcolor" strokeWidth="2" cx="8" cy="8" r="7" />
//         <circle fill="currentcolor" cx="8" cy="8" r="5" clipPath="url(#half-circle-clip)" />
//       </symbol>
//     </svg>
//   );
// };

const Loading: React.FC = () => {
  const [step, setStep] = useState(0);
  const progressFrame = useRef(0);
  const steps: LoadingStep[] = [
    {
      id: 0,
      state: "waiting",
      title: "Preparing"
    },
    {
      id: 1,
      state: "waiting",
      title: "Analyzing",
      filesPreparedMax: 39
    },
    {
      id: 2,
      state: "waiting",
      title: "Calculating"
    },
    {
      id: 3,
      state: "waiting",
      title: "Finalizing"
    },
  ];
  const stepCount = useRef(steps.length);
  const [stepObjects, setStepObjects] = useState(steps);
  const allStepsDone = step === stepCount.current;

  function updatedItem(item: LoadingStep) {
    const { id, state, start, filesPrepared, filesPreparedMax } = item;
    const updated: LoadingStep = { id, state };

    if (!start) {
      updated.start = new Date();
      updated.state = "progress";
      if (!filesPreparedMax) return updated;
    }

    if (filesPreparedMax) {
      const prepared = filesPrepared === undefined ? -1 : filesPrepared;
      updated.filesPrepared = Math.min(prepared + 1, filesPreparedMax);
    }

    if (!filesPreparedMax || updated.filesPrepared === filesPreparedMax) {
      updated.finish = new Date();
      updated.state = "done";
    }
    return updated;
  }

  useEffect(() => {
    const updatePromise = async (delay: number = 0) => await new Promise((resolve) => {
      progressFrame.current = window.setTimeout(resolve, delay);
    }).then(() => {
      setStepObjects((prev) => prev.map((item) => {
        if (item.id !== step) return item;

        const updated = updatedItem(item);

        if (updated.state === "done") {
          clearTimeout(progressFrame.current);
          setStep((step) => step + 1);
        }

        return { ...item, ...updated };
      }));

      if (step === 1 || step === 2) updatePromise(50);
      else if (step < stepCount.current) updatePromise(1500);
    });
    updatePromise();

    return () => clearTimeout(progressFrame.current);
  }, [step]);

  return (
    <div className={`loading${allStepsDone ? " loading--done" : ""}`}>
      <div className="loading__steps">
        {stepObjects.map((s, i) => {
          const { state, title, start, finish, filesPrepared, filesPreparedMax } = s;
          let distance = i;

          if (allStepsDone) {
            distance -= Math.floor(stepCount.current / 2);
          } else {
            let moveBy = step;
            if (i > step + 1) {
              const stepHeight = 5.25;
              moveBy += (i - (step + 1)) * (1.5 / stepHeight);
            }
            distance -= moveBy;
          }

          const fade = allStepsDone ? 0 : Math.abs(i - step);

          return <LoadingStepBlock
            key={i}
            title={title}
            state={state}
            distance={distance}
            fade={fade}
            start={start}
            finish={finish}
            filesPrepared={filesPrepared}
            filesPreparedMax={filesPreparedMax}
          />;
        })}
      </div>
    </div>
  );
};

const LoadingStepBlock: React.FC<LoadingStepBlockProps> = ({ state, title = "", distance = 0, fade = 0, start, finish, filesPrepared, filesPreparedMax = 0 }) => {
  const stateMap = {
    waiting: "empty-circle",
    progress: "half-circle",
    done: "check-circle"
  };
  const colorMap = {
    waiting: "neutral",
    progress: "warning",
    done: "success"
  };
  const style = {
    opacity: 1 - fade * 0.225,
    transform: `translateY(${100 * distance}%)`
  };

  function dateFormatted(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(date);
  }

  return (
    <div className={`loading__step${state !== "waiting" ? " loading__step--in" : ""}`} style={style}>
      <Icon icon={stateMap[state]} color={colorMap[state]} />
      <div>
        <div className="loading__step-title">{title}</div>
        <div className="loading__step-info">
          {start ? `${dateFormatted(start)} — ` : ""}
          {finish ? dateFormatted(finish) : (state === "progress" ? <LoadingEllipsis /> : "")}
        </div>
        <div className="loading__step-info">
          {filesPrepared !== undefined ? `${filesPrepared} of ${filesPreparedMax} files prepared` : ""}
        </div>
      </div>
    </div>
  );
};

type LoadingStepBlockProps = {
  state: LoadingState;
  title?: string;
  distance?: number;
  fade?: number;
  start?: Date;
  finish?: Date;
  filesPrepared?: number;
  filesPreparedMax?: number;
};

const LoadingEllipsis: React.FC = () => {
  return (
    <div className="loading__ellipsis">
      <div className="loading__ellipsis-dot">.</div>
      <div className="loading__ellipsis-dot">.</div>
      <div className="loading__ellipsis-dot">.</div>
    </div>
  );
};

export default Loading;
