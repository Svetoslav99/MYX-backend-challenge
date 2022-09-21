import classes from './showAllImages.module.css';

const ShowAllImages = ({ setError, setIsLoading, setData, setImagesPath }) => {
    const showAllImagesHandler = async event => {
        setError(null);
        setIsLoading(true);
        const response = await fetch('/api/show-all-images');

        const { data, error, message, uploadedImagesPath } = await response.json();
        console.log('fe data:', data);
        console.log('fe imgPath: ', uploadedImagesPath);

        if (error) {
            setError(message);
            setIsLoading(false);
            return;
        }

        setData(data);
        setImagesPath(uploadedImagesPath);
        setIsLoading(false);
    };

    return (
        <>
            <h3>Show All images</h3>
            <button className={classes.button} onClick={showAllImagesHandler}>
                Show All
            </button>
        </>
    );
};

export default ShowAllImages;
