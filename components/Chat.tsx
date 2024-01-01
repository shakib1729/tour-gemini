'use client';

// Libs
import { type FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { BsRobot } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

// Utils
import { fetchUserById, generateChatResponse, subtractTokens } from '@/utils/actions';

// Types
import type { ChatMessage } from '@/types';

const Chat = () => {
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { userId } = useAuth() as { userId: string };

  const { mutate, isPending } = useMutation({
    mutationFn: async (query: string) => {
      const user = await fetchUserById(userId);
      const currentTokens = user?.tokens;

      if (currentTokens && currentTokens < 250) {
        toast.error('Token balance too low...');
        return;
      }
      const response = await generateChatResponse(query);
      if (!response) {
        toast.error('Something went wrong...');
        return;
      }
      const newTokens = await subtractTokens(userId, response.tokens);
      setMessages(prevMessages => [...prevMessages, { role: 'model', parts: response.message }]);
      toast.success(`${newTokens} tokens remaining...`);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    mutate(text);
    setMessages(prevMessages => [...prevMessages, { role: 'user', parts: text }]);
    setText('');
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto] justify-center w-full">
      <div className="flex flex-col lg:w-[50vw]">
        {messages.map(({ role, parts }, index) => {
          const Icon = role === 'user' ? FaUser : BsRobot;
          const backgroundColor = role === 'user' ? 'bg-base-300' : 'bg-base-100';
          return (
            <div
              key={index}
              className={`${backgroundColor} flex py-6 -mx-8 px-8
               text-base leading-loose border-b border-base-300 gap-8 ${index === 0 ? 'rounded-t-lg' : null} ${
                 index === messages.length - 1 ? 'rounded-b-lg' : null
               }`}
            >
              <div className="flex items-center">
                <Icon size="24px" />
              </div>
              <p className="max-w-3xl">{parts}</p>
            </div>
          );
        })}
        {isPending ? (
          <div className="flex justify-center mt-4">
            <span className="loading loading-dots loading-lg" />
          </div>
        ) : null}
      </div>
      <form onSubmit={handleSubmit} className="w-full justify-self-center max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message TourGemini"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={e => setText(e.target.value)}
          />
          <button className="btn btn-primary join-item" type="submit" disabled={isPending}>
            {isPending ? 'please wait...' : 'ask question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
