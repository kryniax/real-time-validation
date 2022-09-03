type Props ={
    register: any;
    trigger: any;
    surnameHandler: (value: string) => void;
    isSurname: string;
}

const Surname = (props: Props) => {
    return(
        <input 
            type="text"
            {...props.register("surname", {
                required: "Surname is Required",
                pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Required alphabetic characters",
                },
                minLength: {
                    value: 3,
                    message: "Minimum required length is 3",
                },
                })}
            onKeyUp={(e) => {
                const surnameValue = (e.target as HTMLInputElement).value;
                props.trigger("surname");
                props.surnameHandler(surnameValue);
            }}
            className={props.isSurname}
        />
    )
}

export default Surname;
