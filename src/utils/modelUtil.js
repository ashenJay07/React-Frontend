const modelUtil = () => {
  const getModelName = (name) => {
    let modelName = "";

    switch (name) {
      case "model_240316_custom_german":
        modelName = "Model Alpha (German)";
        break;

      case "model_240316_custom_america":
        modelName = "Model Beta (American)";
        break;

      case "model_240316_custom_italian":
        modelName = "Model Theta (Italian)";
        break;

      default:
        modelName = "";
    }
    return modelName;
  };

  return { getModelName };
};

export default modelUtil;
