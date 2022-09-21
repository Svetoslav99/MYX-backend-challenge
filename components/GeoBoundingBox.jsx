import { useRef } from 'react';
import classes from './geoBoundingBox.module.css';

const GeoBoundingBox = ({ setError, setData, setIsLoading, setImagesPath }) => {
    const latMinDegreeInputRef = useRef();
    const latMinMinutesInputRef = useRef();
    const latMinSecondsInputRef = useRef();

    const latMaxDegreeInputRef = useRef();
    const latMaxMinutesInputRef = useRef();
    const latMaxSecondsInputRef = useRef();

    const longMinDegreeInputRef = useRef();
    const longMinMinutesInputRef = useRef();
    const longMinSecondsInputRef = useRef();

    const longMaxDegreeInputRef = useRef();
    const longMaxMinutesInputRef = useRef();
    const longMaxSecondsInputRef = useRef();

    const searchInGeoBoundingBox = async event => {
        setError(null);
        const latMinDegreeUserInput = latMinDegreeInputRef.current.value;
        const latMinMinutesUserInput = latMinMinutesInputRef.current.value;
        const latMinSecondsUserInput = latMinSecondsInputRef.current.value;

        const latMaxDegreeUserInput = latMaxDegreeInputRef.current.value;
        const latMaxMinutesUserInput = latMaxMinutesInputRef.current.value;
        const latMaxSecondsUserInput = latMaxSecondsInputRef.current.value;

        const longMinDegreeUserInput = longMinDegreeInputRef.current.value;
        const longMinMinutesUserInput = longMinMinutesInputRef.current.value;
        const longMinSecondsUserInput = longMinSecondsInputRef.current.value;

        const longMaxDegreeUserInput = longMaxDegreeInputRef.current.value;
        const longMaxMinutesUserInput = longMaxMinutesInputRef.current.value;
        const longMaxSecondsUserInput = longMaxSecondsInputRef.current.value;

        if (
            !latMinDegreeUserInput ||
            !latMinMinutesUserInput ||
            !latMinSecondsUserInput ||
            !longMinDegreeUserInput ||
            !longMinMinutesUserInput ||
            !longMinSecondsUserInput ||
            !latMaxDegreeUserInput ||
            !latMaxMinutesUserInput ||
            !latMaxSecondsUserInput ||
            !longMaxDegreeUserInput ||
            !longMaxMinutesUserInput ||
            !longMaxSecondsUserInput
        ) {
            setError('Please fill all 12 input fields (both for Latitude and Longitude)!');
            return;
        }

        if (
            latMinDegreeUserInput > latMaxDegreeUserInput ||
            latMinMinutesUserInput > latMaxMinutesUserInput ||
            latMinSecondsUserInput > latMaxSecondsUserInput ||
            longMinDegreeUserInput > longMaxDegreeUserInput ||
            longMinMinutesUserInput > longMaxMinutesUserInput ||
            longMinSecondsUserInput > longMaxSecondsUserInput
        ) {
            setError('Please make sure that the input fields for min value are actually smaller than the corresponding max input fields!');
            return;
        }

        const body = {
            minLatitude: [+latMinDegreeUserInput, +latMinMinutesUserInput, +latMinSecondsUserInput],
            maxLatitude: [+latMaxDegreeUserInput, +latMaxMinutesUserInput, +latMaxSecondsUserInput],
            minLongitude: [+longMinDegreeUserInput, +longMinMinutesUserInput, +longMinSecondsUserInput],
            maxLongitude: [+longMaxDegreeUserInput, +longMaxMinutesUserInput, +longMaxSecondsUserInput]
        };

        setIsLoading(true);
        const response = await fetch('/api/search-in-geo-bounding-box', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });

        const { data, error, message, uploadedImagesPath } = await response.json();

        if (error) {
            setError(message);
            setIsLoading(false);
            return;
        }

        if (data) {
            setData(data);
            setImagesPath(uploadedImagesPath);
        }

        setIsLoading(false);
    };

    return (
        <>
            <section className={classes.container}>
                <h3>Latitude</h3>
                <section className={classes.container__items}>
                    <h4>Min</h4>

                    <div className={classes['input-container']}>
                        <label htmlFor='degree'>Degrees</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='degree'
                            ref={latMinDegreeInputRef}
                            step={1}
                            placeholder={53}
                        />
                    </div>

                    <div className={classes['input-container']}>
                        <label htmlFor='minutes'>Minutes</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='minutes'
                            ref={latMinMinutesInputRef}
                            step={1}
                            placeholder={52}
                        />
                    </div>

                    <div className={classes['input-container']}>
                        <label htmlFor='seconds'>Seconds</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='seconds'
                            ref={latMinSecondsInputRef}
                            step={0.0001}
                            placeholder={35.2762}
                        />
                    </div>
                </section>

                <section className={classes.container__items}>
                    <h4>Max</h4>

                    <div className={classes['input-container']}>
                        <label htmlFor='degree'>Degrees</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='degree'
                            ref={latMaxDegreeInputRef}
                            step={1}
                            placeholder={53}
                        />
                    </div>

                    <div className={classes['input-container']}>
                        <label htmlFor='minutes'>Minutes</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='minutes'
                            ref={latMaxMinutesInputRef}
                            step={1}
                            placeholder={52}
                        />
                    </div>

                    <div className={classes['input-container']}>
                        <label htmlFor='seconds'>Seconds</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='seconds'
                            ref={latMaxSecondsInputRef}
                            step={0.0001}
                            placeholder={35.4762}
                        />
                    </div>
                </section>
            </section>

            <section className={classes.container}>
                <h3>Longitude</h3>
                <section className={classes.container__items}>
                    <h4>Min</h4>
                    <div className={classes['input-container']}>
                        <label htmlFor='degree'>Degrees</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='degree'
                            ref={longMinDegreeInputRef}
                            step={1}
                            placeholder={1}
                        />
                    </div>

                    <div className={classes['input-container']}>
                        <label htmlFor='minutes'>Minutes</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='minutes'
                            ref={longMinMinutesInputRef}
                            step={1}
                            placeholder={54}
                        />
                    </div>

                    <div className={classes['input-container']}>
                        <label htmlFor='seconds'>Seconds</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='seconds'
                            ref={longMinSecondsInputRef}
                            step={0.0001}
                            placeholder={16.4726}
                        />
                    </div>
                </section>

                <section className={classes.container__items}>
                    <h4>Max</h4>
                    <div className={classes['input-container']}>
                        <label htmlFor='degree'>Degrees</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='degree'
                            ref={longMaxDegreeInputRef}
                            step={1}
                            placeholder={1}
                        />
                    </div>

                    <div className={classes['input-container']}>
                        <label htmlFor='minutes'>Minutes</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='minutes'
                            ref={longMaxMinutesInputRef}
                            step={1}
                            placeholder={54}
                        />
                    </div>

                    <div className={classes['input-container']}>
                        <label htmlFor='seconds'>Seconds</label>
                        <input
                            className={classes.input}
                            type='number'
                            id='seconds'
                            ref={longMaxSecondsInputRef}
                            step={0.0001}
                            placeholder={17.0422}
                        />
                    </div>
                </section>
            </section>

            <button className={classes.button} onClick={searchInGeoBoundingBox}>
                Search in geo bounding box
            </button>
        </>
    );
};

export default GeoBoundingBox;
