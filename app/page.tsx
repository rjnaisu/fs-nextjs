import Homepage from "./homepage.mdx";

const Home = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <div className="markdown rounded-xl border border-border/70 bg-card p-6 text-card-foreground sm:p-8">
        <Homepage />
      </div>
    </div>
  );
};

export default Home;
