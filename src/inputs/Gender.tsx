import React from "react";

type Props ={
    checkboxLabel: string;
    register: any;
    trigger: any;
}

const Gender = (props: Props) => {
    return(
        <React.Fragment>
            <label className={props.checkboxLabel}>
                <input 
                    type="checkbox"
                    {...props.register("checkbox")}
                    onKeyUp={() => {
                        props.trigger('checkbox');
                    }}   
                    id="male" 
                    value="male" 
                />
                Male
            </label>
            <label className={props.checkboxLabel}>
                <input 
                    type="checkbox"
                    {...props.register("checkbox")}
                    onKeyUp={() => {
                        props.trigger('checkbox');
                    }}   
                    id="female" 
                    value="female" />
                Female
            </label>
            <label className={props.checkboxLabel}>
                <input 
                    type="checkbox"
                    {...props.register("checkbox")}
                    onKeyUp={() => {
                        props.trigger('checkbox');
                    }}
                    id="other" 
                    value="other" 
                    />
                Other
            </label>
        </React.Fragment>
    )
}
export default Gender;