"use client";
import InputMessage from "./components/InputMessage";

export default function Home() {
  const handleSendMessage = (message: string) => {
    console.log(message);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <section>
        <h1 className="text-6xl font-bold">Hola Chat</h1>
        <p className="text-2xl font-bold">
          A simple chat application built with Next.js and Tailwind CSS.
        </p>
      </section>
      {/* chat section with input and messages */}
      <section className="grid w-3/4 gap-4 mt-8 text-black grid-cols-[20%_80%] h-[500px] bg-slate-50">
        <div className="flex flex-col items-center justify-start gap-4 bg-slate-400">
          <div>contact 1</div>
          <div>contact 2</div>
        </div>
        <div className="flex flex-col items-center justify-start gap-4">
          <div>chat header</div>
          <div>chat messages</div>
          <div className="mt-auto mb-0">
            <InputMessage handleSendMessage={handleSendMessage} />
          </div>
        </div>
      </section>
    </main>
  );
}
