import { useState } from 'react';
import { Gallery, TopNavigation } from './index';
import classes from './layout.module.css';

const Layout = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [imagesPath, setImagesPath] = useState('');

    return (
        <section className={classes.container}>
            <TopNavigation
                setError={setError}
                setIsLoading={setIsLoading}
                setData={setData}
                setImagesPath={setImagesPath}
            />
            <Gallery error={error} isLoading={isLoading} data={data} imagesPath={imagesPath} />
        </section>
    );
};

export default Layout;
