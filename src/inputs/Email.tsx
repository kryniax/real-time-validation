type Props ={
    register: any;
    trigger: any;
    emailHandler: (value: string) => void;
    isEmail: string;
}

const Email = (props: Props) => {
    return(
        <input 
            type="email"
            data-testid="email"
            {...props.register("email", {
                required: "Email is required",
            })}
            onKeyUp={(e) => {
                const emailValue = (e.target as HTMLInputElement).value;
                props.trigger('email');
                props.emailHandler(emailValue);
            }}
            className={props.isEmail}
        />
    )
}
export default Email;