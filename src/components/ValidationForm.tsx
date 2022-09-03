import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import BirthDate from "../inputs/BirthDate";
import Email from "../inputs/Email";
import Gender from "../inputs/Gender";
import Name from "../inputs/Name";
import Surname from "../inputs/Surname";

import classes from './ValidationForm.module.css';

type FormValues = {
    name: string;
    surname: string;
    date: string;
    email: string;
    checkbox: string;
}

const ValidationForm = () => {

    const [isName, setIsName] = useState('');
    const [isSurname, setIsSurname] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [emailState, setEmailState] = useState(true);

    const{ 
        register, 
        handleSubmit, 
        reset, 
        trigger, 
        formState: {errors, isValid} 
    } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormValues> = (event) => {
        alert(JSON.stringify(event));
        setIsName('');
        setIsSurname('');
        setIsEmail('');
        reset();
    }

    const fetchEmailHandler = useCallback(async (emailValue: string) => {

        const requestOption: {} = {
            method: 'GET',
            redirect: 'follow',
        }

        const url: string = `/api/email-validator.php?email=${emailValue}`;

        try{
            const response: Response = await fetch(url, requestOption);
            if(!response.ok) {
                throw new Error('error');
            }
            const data = await response.json();
            setEmailState(data.validation_status);    

        } catch(error: any) {
            console.error(error);
        }
    }, []);

    const nameHandler = (value: string) => {
        if(errors.name === undefined && value.length >= 3) {
            setIsName(classes.borderGreen);
        }else{
            setIsName(classes.borderRed);
        }
    }

    const surnameHandler = (value: string) => {
        if(errors.surname === undefined && value.length >= 3) {
            setIsSurname(classes.borderGreen);
        }else{
            setIsSurname(classes.borderRed);
        }
    }

    const emailHandler = (value: string) => {
        if(emailState === false || value.length < 3) {
            setIsEmail(classes.borderRed);
        }else{
            setIsEmail(classes.borderGreen);
        }
        fetchEmailHandler(value);
    }

return(
    <React.Fragment>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formBody}>
            <div className={classes.inputGroup}>
                <label>Name</label>
                <Name 
                    register={register} 
                    trigger={trigger} 
                    nameHandler={nameHandler} 
                    isName={isName}
                />                
                {errors.name && (
                    <p className={classes.error}>{errors.name.message}</p>
                )}
            </div>
            
            <div className={classes.inputGroup}>
                <label>Surname</label> 
                <Surname 
                    register={register} 
                    trigger={trigger} 
                    surnameHandler={surnameHandler} 
                    isSurname={isSurname}
                />
                {errors.surname && (
                    <p className={classes.error}>{errors.surname.message}</p>
                )}
            </div>
            <div className={classes.inputGroup}>
                <label>Birth date</label>
                <BirthDate
                    register={register}
                    trigger={trigger}
                />
                {errors.date && (
                    <p className={classes.error}>{errors.date.message}</p>
                )}
            </div>
            <div className={classes.inputGroup}>
                <label>E-mail</label>
                <Email
                    register={register}
                    trigger={trigger}
                    emailHandler={emailHandler}
                    isEmail={isEmail}
                />

                <p className={classes.error}>
                    {emailState ? '' : 'Email not valid'}
                    {errors.email && (
                    <p className={classes.error}>{errors.email.message}</p>
                )}
                </p>
            </div>
            <label>Gender</label>
            <div className={classes.checkboxGroup}>
                <Gender
                    checkboxLabel={classes.checkboxLabel}
                    register={register}
                    trigger={trigger}
                />
                {errors.checkbox && (
                <p className={classes.error}>{errors.checkbox.message}</p>
            )}
            </div>
            <div className={classes.submitButton}>
                <input type="submit" value="Submit" disabled={!isValid}></input>
                
            </div>
      </div>
    </form>
  </React.Fragment>
)
}

export default ValidationForm;