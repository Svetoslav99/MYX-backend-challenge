import classes from './topNavigation.module.scss';
import { ShowAllImages, UploadImages, DeleteImage, GeoBoundingBox, GenerateThumbnail } from './index';

const TopNavigation = ({ setError, setIsLoading, setData, setImagesPath }) => {
    return (
        <nav className={classes.container}>
            <section className={classes['container--primary']}>
                <section className={classes['container--primary__feature']}>
                    <ShowAllImages
                        setError={setError}
                        setIsLoading={setIsLoading}
                        setData={setData}
                        setImagesPath={setImagesPath}
                    />
                </section>

                <section className={classes['container--primary__feature']}>
                    <UploadImages setError={setError} setIsLoading={setIsLoading} setData={setData} />
                </section>

                <section className={classes['container--primary__feature']}>
                    <DeleteImage setError={setError} setIsLoading={setIsLoading} setData={setData} />
                </section>
            </section>

            <section className={classes['container--secondary']}>
                <section className={classes['container--secondary__feature']}>
                    <GeoBoundingBox
                        setError={setError}
                        setIsLoading={setIsLoading}
                        setData={setData}
                        setImagesPath={setImagesPath}
                    />
                </section>
            </section>

            <section className={classes['container--tertiary']}>
                <GenerateThumbnail setError={setError} setIsLoading={setIsLoading} />
            </section>
        </nav>
    );
};

export default TopNavigation;
