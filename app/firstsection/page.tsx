const Firstsection = () => {
  return (
    <section className="md:py-20 py-16 bg-gradient-to-r from-gray-00 to-gray-200 space-y-10">
      <div className="container mx-auto text-center mt-10">
        <div className="text-6xl md:text-8xl lg:text-7xl xl:text-8xl flex justify-center font-bold md:px-20 pb-10 text-gradient bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent pt-19">
          Prepare for your school year
        </div>

        <p className="text-lg md:text-xl lg:text-2xl md-10 bg-gradient-to-r from-black to-gray-400 dark:from-white dark:to-gray-500 bg-clip-text text-transparent font-bold">
          Stay on top of your school year, schedule, prioritize tasks,
          and ace every exam with ease.
        </p>

        <div className="flex gap-4 justify-center pt-10">
          {/* Updated Pricing button */}
          <a href="#pricing-section"> {/* Changed href to "#pricing-section" */}
            <button
              aria-label="get started button"
              className="text-black bg-yellow-400 hover:bg-yellow-300 px-20 py-4 rounded-md text-lg md:text-xl lg:text-lg font-bold"
            >
              Try CountWave
            </button>
          </a>
        </div>

        <div className="pt-10">
          <video className="rounded-xl" autoPlay muted loop>
            <source src="/content/video-3.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

export default Firstsection;
