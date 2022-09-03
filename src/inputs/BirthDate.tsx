type Props ={
    register: any;
    trigger: any;
}

const BirthDate = (props: Props) => {
    return(
        <input 
            type="date"
            {...props.register("date", {
                required: "Date is required"
            })}
            onKeyUp={() => {
                props.trigger('date');
            }}
        />
    )
}

export default BirthDate;