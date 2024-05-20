import { useEffect, useState } from "react";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import MainLayout from "layouts/MainLayout";
import "styles/SelectModel.css";
import axiosInstance, { axiosInstanceNgork } from "utils/axiosInstance";
import { GeneratingVisual } from "utils/loading";

const SelectModel = () => {
  const [models, setModels] = useState([]);
  const [midiFile, setMidiFile] = useState();
  const [generateStatus, setGenerateStatus] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [melodySrc, setMelodySrc] = useState("");
  const [songSrc, setSongSrc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstanceNgork.get("generate/get-models");
        console.log(
          "Complete URL:",
          response.config.baseURL + response.config.url
        );
        // console.log(response);
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const generateMelody = async () => {
    setMidiFile();
    setGenerateStatus(true);

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

      // console.log(response);
      setMidiFile(response.data);

      setGenerateStatus(false);
    } catch (error) {
      setGenerateStatus(false);
      console.error("Error downloading melody:", error);
    }
  };

  const downloadMidi = () => {
    // console.log(midiFile);
    if (midiFile) {
      const url = window.URL.createObjectURL(
        new Blob([midiFile], { type: "audio/midi" })
      );
      const downloadButton = document.getElementById("download-midi");
      // console.log(downloadButton);
      downloadButton.download = "generated_melody.mid";
      downloadButton.setAttribute("href", url);
      // downloadButton.click();
      // window.URL.revokeObjectURL(url);
    }
  };

  const downloadSong = () => {
    const downloadButton = document.getElementById("download-song");
    downloadButton.download = "complete_combined_song.mp3";
    downloadButton.setAttribute("href", songSrc);
  };

  const playMidi = async () => {
    try {
      const response = await axiosInstanceNgork.get(
        "/generate/get-wav-melody",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "audio/wav" })
      );
      setMelodySrc(url);
    } catch (error) {
      console.error("Error fetching the wav audio file", error);
    }
  };

  const playSong = async () => {
    try {
      const response = await axiosInstanceNgork.get(
        "/generate/get-combined-song",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "audio/mp3" })
      );
      setSongSrc(url);
    } catch (error) {
      console.error("Error fetching the mp3 audio file", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <>
      <MainLayout fullScreen={false}>
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
              <>
                <section className="section-wrapper">
                  <div className="download-section">
                    <a onClick={playMidi}>
                      <Button label={"Play Melody"} />
                    </a>
                    {melodySrc && <audio src={melodySrc} controls />}
                  </div>
                  <a id="download-midi" onClick={downloadMidi}>
                    <Button label={"Download Melody"} />
                  </a>
                </section>

                <section className="section-wrapper">
                  <div className="download-section">
                    <a onClick={playSong}>
                      <Button label={"Play Combined MP3"} />
                    </a>
                    {songSrc && <audio src={songSrc} controls />}
                  </div>
                  <a id="download-song" onClick={downloadSong}>
                    <Button label={"Download Combined MP3"} />
                  </a>
                </section>
              </>
            )}
          </section>

          {generateStatus && !midiFile && (
            <div className="loader-wrapper">
              <GeneratingVisual />
              <span className="loader-text">
                Melodies are being synthesized. Please wait a few seconds.
              </span>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default SelectModel;
