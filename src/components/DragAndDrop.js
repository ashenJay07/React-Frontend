import React, { useRef, useState } from "react";
import "styles/DragAndDrop.css";
import axiosInstance from "utils/axiosInstance";

const DragAndDrop = () => {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const handleFileChange = (event) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (!uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      localStorage.setItem("fileName", selectedFile.name);
      formData.append("file", selectedFile);

      const response = await axiosInstance.post("generate/upload-file", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setUploadStatus("done");

      setTimeout(() => {
        window.location.pathname = "/melody-generate/select-model";
      }, 1000);
    } catch (error) {
      setUploadStatus("select");
    }
  };

  return (
    <>
      <div className="upload-wrapper">
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {!selectedFile && (
          <button className="file-btn" onClick={onChooseFile}>
            <span>⬆</span> Upload Your Vocal Audio File (.wav format)
          </button>
        )}

        {selectedFile && (
          <>
            <div className="file-card">
              <span className="material-symbol-outlined icon">📂</span>

              <div className="file-info">
                <div style={{ flex: 1 }}>
                  <h6>{selectedFile.name}</h6>
                  <div className="progress-bg">
                    <div
                      className="progress"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {uploadStatus === "select" ? (
                <button onClick={clearFileInput} className="close-btn">
                  <span className="material-symbols-outlined close-icon">
                    ❌
                  </span>
                </button>
              ) : (
                <div className="check-circle">
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "2rem" }}
                    >
                      ✅
                    </span>
                  ) : null}
                </div>
              )}
            </div>

            <button className="upload-btn" onClick={handleUpload}>
              {uploadStatus === "select" || uploadStatus === "uploading"
                ? "upload"
                : "done"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default DragAndDrop;
