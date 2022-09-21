import classes from './uploadImages.module.css';

const UploadImages = ({ setError, setIsLoading, setData }) => {
    const handleFileUpload = async event => {
        setError(null);
        setIsLoading(true);

        for (const file of event.target.files) {
            const body = new FormData();
            body.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body
            });

            const { error, message } = await response.json();

            if (error) {
                setError(message);
                setIsLoading(false);
                return;
            }
        }

        setIsLoading(false);

        setData('Upload operation finished successfully!');
    };

    return (
        <>
            <h3>Upload images</h3>
            <label htmlFor='file-upload' className={classes.upload}>
                <input
                    type='file'
                    id='file-upload'
                    accept='image/jpeg'
                    multiple
                    style={{ display: 'none', widows: '140px' }}
                    onChange={handleFileUpload}
                />
                Upload Files
            </label>
        </>
    );
};

export default UploadImages;
