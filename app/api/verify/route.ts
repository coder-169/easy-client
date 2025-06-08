import formidable from 'formidable';
import * as Tesseract from 'tesseract.js';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request): Promise<Response> {
  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public/uploads'),
    keepExtensions: true,
    multiples: false,
  });

  try {
    // Instead of converting to a ReadableStream, directly use req
    const [fields, files] = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {  // 'req' is directly passed here
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // You can use 'fields' if needed or simply remove it if not used
    console.log(fields); // Example of how you might use 'fields'

    const file = (files.image as formidable.File[])[0];
    const filePath = file.filepath;

    const performOCR = async (filePath: string): Promise<string> => {
      try {
        const result = await Tesseract.recognize(filePath, 'eng');
        await fs.unlink(filePath); // Clean up after processing
        return result.data.text;
      } catch (err) {
        await fs.unlink(filePath);
        throw new Error('OCR processing failed');
      }
    };

    const extractedText = await performOCR(filePath);
    return NextResponse.json({ message: 'Verification successful', extractedText });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
