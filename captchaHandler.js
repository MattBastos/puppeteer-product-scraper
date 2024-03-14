const { createWorker } = require('tesseract.js');

const getTextFromImage = async (imageURL) => {
  const worker = await createWorker('eng');
  const image = await worker.recognize(imageURL);
  await worker.terminate();

  return image.data.text;
};

module.exports = getTextFromImage;
