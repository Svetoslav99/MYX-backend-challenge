import { useRef, useState } from 'react';
import { saveAs } from 'file-saver';

import classes from './generateThumbnail.module.css';

const GenerateThumbnail = ({ setError, setIsLoading }) => {
    const [userInput, setUserInput] = useState('');
    const inputRef = useRef();

    const downloadImgThumbnailHanlder = async event => {
        setError(null);
        const inputValue = inputRef.current.value;

        if (!inputValue) {
            setError('Please input image name when trying to download!');
            return;
        }

        setUserInput(inputValue);
        setIsLoading(true);

        const response = await fetch('/api/download-images', {
            method: 'POST',
            body: inputValue,
            headers: { 'Content-Disposition': 'attachment' }
        });

        const { filePath, error, message } = await response.json();

        if (error) {
            setError(message);
            setIsLoading(false);
            return;
        }

        saveAs(filePath, `${inputValue}.JPG`);
        setIsLoading(false);
    };

    return (
        <section className={classes.container}>
            <h3>Download 256x256 thumbnail of the original image</h3>
            <input className={classes.input} type='text' placeholder='image name' ref={inputRef} />

            <a
                className={classes.button}
                href={`/thumbnails/${userInput}.JPG`}
                download={`${userInput}.JPG`}
                onClick={downloadImgThumbnailHanlder}
            >
                <span className={classes.download}>Download</span>
            </a>
        </section>
    );
};

export default GenerateThumbnail;
