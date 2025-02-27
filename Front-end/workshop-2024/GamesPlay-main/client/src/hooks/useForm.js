import { useEffect, useRef, useState } from "react";

export function useForm(initialValues, submitCallback, options = { reinitializeForm: false }) {
    const [values, setValues] = useState(initialValues);
    const initialValuesRef = useRef(initialValues);
    useEffect(() => {
        if (options.reinitializeForm && initialValuesRef.current !== initialValues) {
            setValues(initialValues)
            initialValuesRef.current = initialValues;
        }
    }, [initialValues, options]);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await submitCallback(values);
        setValues(initialValues);
    }
    return {
        values,
        changeHandler,
        submitHandler,
    }
}