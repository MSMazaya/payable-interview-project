import Tesseract from 'tesseract.js';

export async function imageToText(image: string | Buffer): Promise<[boolean, string]> {
    const { data: { text } } = await Tesseract.recognize(
        image,
        'eng'
    );

    return [text === '', text];
}

export default {
    imageToText
}
