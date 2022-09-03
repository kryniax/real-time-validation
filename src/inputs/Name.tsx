type Props ={
    register: any;
    trigger: any;
    nameHandler: (value: string) => void;
    isName: string;
}

const Name = (props: Props) => {
    return(
        <input 
            type="text"
            {...props.register("name", {
                required: "Name is Required",
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
                const nameValue = (e.target as HTMLInputElement).value;
                props.trigger("name");
                props.nameHandler(nameValue);
            }}
            className={props.isName}
        />
    )
}

export default Name;