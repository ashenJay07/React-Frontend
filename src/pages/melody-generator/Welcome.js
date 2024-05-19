import Button from "components/Button";
import MainLayout from "layouts/MainLayout";
import "styles/Welcome.css";

const Welcome = () => {
  return (
    <MainLayout fullScreen={true}>
      <section className="welcome">
        <h1 className="welcome__title">Welcome to the AI Melody Generator</h1>

        <p className="welcome__description">
          Welcome to MelGen, where creativity meets AI! Our innovative web app
          harnesses the power of artificial intelligence to generate unique
          melodies based on your vocal input. Whether you're a musician looking
          for inspiration or simply curious about AI-generated music, MelGen is
          here to spark your imagination. Get ready to explore a world of
          endless musical possibilities!
        </p>

        <div>
          <Button
            type="link"
            label="Get Started Now"
            path="/melody-generate/upload"
          />
        </div>

        {/* <div>
          <p>sdfsdfsdfsd</p>
          <Button
            type="link"
            label="Select Model"
            path="/melody-generate/select-model"
            style={{ marginTop: "10px" }}
          />
        </div> */}
      </section>
    </MainLayout>
  );
};

export default Welcome;
