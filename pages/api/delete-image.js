import fs from 'fs/promises';
import path from 'path';

import extractedImgValues from '../../data/extractedImgValues.json';
import { rootDir } from '../../utils/rootDir';
import { writeFilePromise } from '../../utils/promisifiedMethods';

async function handler(req, res) {
    if (req.method === 'POST') {
        const fileName = req.body;

        try {
            const filePath = path.join(rootDir, 'public', 'uploadedImages', `${fileName}.JPG`);
            await fs.unlink(filePath);

            const filteredValues = extractedImgValues.filter(imgValues => imgValues.name !== fileName);
            const extractedImgValuesFilePath = path.join(rootDir, 'data', 'extractedImgValues.json');
            await writeFilePromise(extractedImgValuesFilePath, JSON.stringify(filteredValues));

            return res.status(201).json({
                message: `Successfully deleted "${fileName}.JPG" image!`,
                error: false
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
