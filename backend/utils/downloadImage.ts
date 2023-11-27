import axios from 'axios';
import fs from 'fs';
import sharp from 'sharp';

export const downloadImage = async (url: string, filepath: string): Promise<void> => {
    try {
        const response = await axios.get<Buffer>(url, {
            responseType: 'arraybuffer' // Handle the response data as a buffer
        });

        // Create a Sharp instance from the buffer and add an alpha channel
        sharp(response.data)
            .ensureAlpha() // Ensure there is an alpha channel
            .png({ compressionLevel: 9 }) // Apply PNG compression
            .toFile(filepath) // Save the image to a file
            .then(() => console.log('Image downloaded and converted successfully.'))
            .catch((error: Error) => console.error('Error processing the image:', error));
    } catch (error: any) {
        console.error('Error downloading the image:', error.message);
    }
};
