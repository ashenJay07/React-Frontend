import { useEffect, useState } from "react";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import MainLayout from "layouts/MainLayout";
import "styles/SelectModel.css";
import axiosInstance from "utils/axiosInstance";

const SelectModel = () => {
  const [models, setModels] = useState([]);
  const [midiFile, setMidiFile] = useState();
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    try {
      axiosInstance.get("generate/get-models").then((response) => {
        setModels(response.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const generateMelody = async () => {
    setMidiFile();

    try {
      const response = await axiosInstance.post(
        "generate/generate-melody",
        {
          model: selectedModel, // body (payload)
          fileName: localStorage.getItem("fileName"),
        },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setMidiFile(response.data);
    } catch (error) {
      console.error("Error downloading melody:", error);
    }
  };

  const downloadMidi = () => {
    console.log(midiFile);
    if (midiFile) {
      console.log("yes");
      const url = window.URL.createObjectURL(
        new Blob([midiFile], { type: "audio/midi" })
      );
      const downloadButton = document.getElementById("download-midi");
      console.log(downloadButton);
      downloadButton.download = "generated_melody.mid";
      downloadButton.setAttribute("href", url);
      // downloadButton.click();
      // window.URL.revokeObjectURL(url);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <>
      <MainLayout>
        <div className="container">
          <section className="top-section">
            <Dropdown
              label={"Choose a Model :"}
              options={models}
              name={"selected-model"}
              selectModel={handleSelectChange}
            />
            <Button label={"Generate Melody"} onClick={generateMelody} />

            {midiFile && (
              <a id="download-midi" onClick={downloadMidi}>
                <Button label={"Download Midi"} />
              </a>
            )}
          </section>
        </div>
      </MainLayout>
    </>
  );
};

export default SelectModel;
