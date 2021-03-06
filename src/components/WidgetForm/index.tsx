import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  bug:{
    title:'Problema',
    image:{
      source:bugImageUrl,
      alt:'Imagem de um inseto'
    }
  },
  idea:{
    title:'Ideia',
    image:{
      source:ideaImageUrl,
      alt:'Imagem de uma lâmpada'
    }
},
  other:{
    title:'Outro',
    image:{
      source:thoughtImageUrl,
      alt:'Imagem de um balão de pensamento'
    }
  } 
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
  const [feedbackType,setFeedbackType] = useState<FeedbackType | null>(null);

  const [feedbackSent,setFeedbackSent] = useState(false);

  function handleRestartFeedback(){
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return(
    <div className="p-4 bg-zinc-900 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

    {feedbackSent ? (
      <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback}/>
    ) : (
      <>
        {!feedbackType ? (
          <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
        ) : (
          <FeedbackContentStep onFeedbackSent={() => setFeedbackSent(true)} onFeedbackTypeRestartRequested={handleRestartFeedback} feedbackType={feedbackType}/>
        )}  
      </>
    )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br" target="_blank">Rocketseat</a>
      </footer>
    </div>
  )
}