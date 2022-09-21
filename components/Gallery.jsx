import Image from 'next/image';
import cn from 'classnames';

import classes from './gallery.module.scss';

const Gallery = ({ error, isLoading, data, imagesPath }) => {
    if (isLoading) {
        return <h3 className={cn(classes.message, classes['message-general'])}>Loading...</h3>;
    }

    if (error) {
        return <h3 className={cn(classes.message, classes['message--failure'])}>An error occured: {error}</h3>;
    }

    if (!Array.isArray(data)) {
        return <h2 className={cn(classes.message, classes['message--success'])}>{data}</h2>;
    }

    if (data && imagesPath) {
        return (
            <section className={classes.container}>
                {data.map(imageName => (
                    <article key={imageName}>
                        <Image
                            src={`/uploadedImages/${imageName}.JPG`}
                            alt={`${imageName} image.`}
                            width={350}
                            height={250}
                        />
                        <h4>{imageName}</h4>
                    </article>
                ))}
            </section>
        );
    }
};

export default Gallery;
