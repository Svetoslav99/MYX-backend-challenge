import path from 'path';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import getExif from 'exif-async';

import extractedImgValues from '../../data/extractedImgValues.json';
import { mvPromise, writeFilePromise } from '../../utils/promisifiedMethods';

const rootDir = process.env.rootDir || path.join(__dirname, '..', '..', '..', '..');

export const config = {
    api: {
        bodyParser: false
    }
};

async function handler(req, res) {
    try {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) throw new Error(err.message);

            const fileExistsFn = async filePath => {
                try {
                    await fs.access(filePath, fs.F_OK, err => {});
                    // file exists
                    return true;
                } catch (e) {
                    // file does not exist.
                    return false;
                }
            };

            const tempFilePath = files.file.filepath;
            const newFilePath = path.join(rootDir, 'public', 'uploadedImages', files.file.originalFilename);

            const fileExists = await fileExistsFn(newFilePath);

            let message = null;
            if (!fileExists) {
                await mvPromise(tempFilePath, newFilePath);

                const fileData = await getExif(newFilePath);
                const latitude = fileData.gps.GPSLatitude;
                const longitude = fileData.gps.GPSLongitude;
                const name = files.file.originalFilename.split('.')[0];

                const imgValues = {
                    latitude,
                    longitude,
                    name
                };

                const extractedImgValuesFilePath = path.join(rootDir, 'data', 'extractedImgValues.json');
                extractedImgValues.push(imgValues);
                await writeFilePromise(extractedImgValuesFilePath, JSON.stringify(extractedImgValues));

                message = 'Successfully inserted image file into the server!';
            } else {
                message = 'File was already on the servers!';
            }

            return res.status(201).json({
                message,
                error: false
            });
        });
    } catch (e) {
        return res.status(500).json({
            message: `An error occured: ${e.message || e}`,
            error: true
        });
    }
}

export default handler;
