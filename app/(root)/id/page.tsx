"use client";
import { useState } from "react";
import { createWorker } from "tesseract.js";
function extractEnglishText(input: string): string {
  // Regex pattern to match English alphabets, numbers, and common punctuation marks
  const englishText = input.replace(/[^a-zA-Z0-9\s\.,;!?(){}[\]:"]+/g, "");
  console.log(englishText);
  return englishText;
}
const ocrText = `EY PAKISTAN National Identity Card
  AHR ISLAMIC REPUBLIC OF PAKISTAN
  Ess Name :
  i Sajid Ali
  : os al
  or] Tal, oO” NORTORE
  Aslam Urif Sajan = 5
  Saba we alu SEY 4
  “Gender [Eon of Stay © 0 =
  M | Pakistan %
  BE once (ss ay
  Identity: Number Date of Birth
  45303-7186252-3 | 18.01.2004 ah
  he “Date of Issie | Date of Expiry
  18.05.2023 18.05:2033 SSE
  Holder s Signature`;
export default function OCRUploader() {
  //   const [extractedText, setExtractedText] = useState("");
  //   const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageUpload = async (file: File) => {
      setLoading(true);
      try {
        const worker = await createWorker("eng"); // For English text
        const {
          data: { text },
        } = await worker.recognize(file);

        // Apply regex to remove non-English characters from the result
        const cleanedText = extractEnglishText(text);
        console.log(cleanedText);
        setExtractedText(text);
        await worker.terminate();
      } catch (error) {
        console.error("OCR Error:", error);
      } finally {
        setLoading(false);
      }
    };

  //   const cleanedText = extractEnglishText(ocrText);
  //   console.log(cleanedText);

  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);


  // ... rest of the component from previous example

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setSelectedImage(file);
            handleImageUpload(file);
          }
        }}
      />

      {loading && <p>Processing image...</p>}

      {extractedText && (
        <div>
          <h3>Extracted Text:</h3>
          <textarea
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            rows={6}
            cols={50}
          />
          <button
            onClick={() => {
              // Add your verification logic here
              console.log("Verify against user data:", extractedText);
            }}
          >
            Verify Details
          </button>
        </div>
      )}

      {selectedImage && (
        <div>
          <h4>Preview:</h4>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded document"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
    </div>
  );
}
