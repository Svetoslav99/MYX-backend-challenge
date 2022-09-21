import { useRef } from 'react';
import classes from './deleteImage.module.css';

const DeleteImage = ({ setIsLoading, setError, setData }) => {
    const inputRef = useRef();

    const deleteImageHanlder = async event => {
        setError(null);
        const inputValue = inputRef.current.value;
        if (!inputValue) {
            setError('Please input image name when trying to delete!');
            return;
        }

        setIsLoading(true);
        const response = await fetch('/api/delete-image', {
            method: 'POST',
            body: JSON.stringify(inputValue),
            headers: { 'Content-Type': 'application/json' }
        });

        const { error, message } = await response.json();

        if (error) {
            setError(message);
            setIsLoading(false);
            return;
        }

        setData(message);

        setIsLoading(false);
    };

    return (
        <>
            <h3>Delete image</h3>
            <input className={classes.input} type='text' placeholder='image name' ref={inputRef} />
            <button className={classes.button} onClick={deleteImageHanlder}>
                Delete
            </button>
        </>
    );
};

export default DeleteImage;
