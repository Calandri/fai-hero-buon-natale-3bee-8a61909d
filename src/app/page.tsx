export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl animate-fade-in">
        {/* Loader */}
        <div className="mb-12 flex justify-center">
          <span className="loader" />
        </div>

        {/* Main text */}
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-6 animate-slide-up">
          La tua immaginazione
          <br />
          <span className="gradient-text font-medium">
            comparira qui
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-gray-500 font-light animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Le tue idee si realizzeranno qui
        </p>

        {/* Decorative dots */}
        <div
          className="mt-16 flex items-center justify-center gap-2 animate-pulse-slow"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="w-2 h-2 bg-gray-300 rounded-full" />
          <span className="w-2 h-2 bg-gray-400 rounded-full" />
          <span className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
    </main>
  );
}
