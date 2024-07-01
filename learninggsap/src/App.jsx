import "./App.css";
import Header from "./Header";
import Hero from "./Hero";
import Loading from "./Loading";

function App() {
  return (
    <>
      {/* <Gsap /> */}

      <Loading />
      <div className="afterLoading">
        <Hero />
      </div>
    </>
  );
}

export default App;
