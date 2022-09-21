import fs from 'fs/promises';
import path from 'path';
import imageThumbnail from 'image-thumbnail';
import { rootDir } from '../../utils/rootDir';

async function handler(req, res) {
    if (req.method === 'POST') {
        const fileName = req.body;

        try {
            const filePath = path.join(rootDir, 'public', 'uploadedImages', `${fileName}.JPG`);
            const thumbnailFilePath = path.join(rootDir, 'public', 'thumbnails', `${fileName}.JPG`);

            const options = { width: 256, height: 256, jpegOptions: { force: true, quality: 100 } };
            const thumbnail = await imageThumbnail(filePath, options);

            await fs.appendFile(thumbnailFilePath, Buffer.from(thumbnail));

            return res.status(201).json({
                message: 'Successfully returned filepath to client!',
                error: false,
                filePath: thumbnailFilePath
            });
        } catch (e) {
            return res.status(500).json({
                message: e.message || e,
                error: true
            });
        }
    }
}

export default handler;
