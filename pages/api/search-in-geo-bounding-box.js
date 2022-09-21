import path from 'path';

import extractedImgValues from '../../data/extractedImgValues.json';
import { rootDir } from '../../utils/rootDir';

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const reqBody = req.body;

            const { minLatitude, maxLatitude, minLongitude, maxLongitude } = reqBody;

            const filteredImages = extractedImgValues.filter(imageValues => {
                const isDegreesInBoundryLat =
                    imageValues.latitude[0] >= minLatitude[0] && imageValues.latitude[0] <= maxLatitude[0];

                const isMinutesInBoundryLat =
                    imageValues.latitude[1] >= minLatitude[1] && imageValues.latitude[1] <= maxLatitude[1];

                const isSecondsInBoundryLat =
                    imageValues.latitude[2] >= minLatitude[2] && imageValues.latitude[2] <= maxLatitude[2];

                const isDegreesInBoundryLong =
                    imageValues.longitude[0] >= minLongitude[0] && imageValues.longitude[0] <= maxLongitude[0];

                const isMinutesInBoundryLong =
                    imageValues.longitude[1] >= minLongitude[1] && imageValues.longitude[1] <= maxLongitude[1];

                const isSecondsInBoundryLong =
                    imageValues.longitude[2] >= minLongitude[2] && imageValues.longitude[2] <= maxLongitude[2];

                if (
                    isDegreesInBoundryLat &&
                    isMinutesInBoundryLat &&
                    isSecondsInBoundryLat &&
                    isDegreesInBoundryLong &&
                    isMinutesInBoundryLong &&
                    isSecondsInBoundryLong
                )
                    return true;
                else return false;
            });

            if (filteredImages.length === 0) {
                return res.status(201).json({
                    message: 'There are no images on the server that are within these boundries!',
                    error: false
                });
            }

            const uploadedImagesPath = path.join(rootDir, 'public', 'uploadedImages');
            const data = filteredImages.map(imgValues => imgValues.name);

            return res.status(201).json({
                message: 'Found images within these boudries!',
                error: false,
                data,
                uploadedImagesPath
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
