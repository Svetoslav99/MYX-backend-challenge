import path from 'path';

import extractedImgValues from '../../data/extractedImgValues.json';
import { rootDir } from '../../utils/rootDir';

async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = extractedImgValues.map(imgValues => imgValues.name);

            const uploadedImagesPath = path.join(rootDir, 'public', 'uploadedImages');

            return res.status(201).json({
                message: 'Fetched all images successfully!',
                error: false,
                data,
                uploadedImagesPath
            });
        } catch (e) {
            return res.status(500).json({
                message: `An error occured: ${e.message || e}`,
                error: true
            });
        }
    }
}

export default handler;
