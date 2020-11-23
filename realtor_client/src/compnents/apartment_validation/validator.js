export const field = ({name, value= '', files = '', isRequired = false, minLength = 0, pattern = ''}) => {

    const settings = {
        name,
        files,
        value,
        errors: [],
        validations:{}
    }

    if(isRequired){
        settings.validations.required = true;
    }
    if(minLength){
        settings.validations.minLength = minLength;
    }
    if(pattern){
        settings.validations.pattern = pattern;
    }

    return settings;
}

//The default export
//You'll import as usual
export default (name, value, files, validations) => {
    const errors = [];
    //required validation
    if(validations.required && required(value)){
        // const errors = [`${name} is required`];
        errors.push(`${name} is required`);                
    }

    if(validations.minLength && minLength(value, validations.minLength)){
        errors.push(`${name} should be no less than ${validations.minLength} characters`);
    }

    if(validations.pattern && pattern(value, validations.pattern)){
        errors.push(`${name} invalid`);
    }

    return errors;
}

const required = value => !value;

const minLength = (value, min) => value.length < min;

const pattern = (value, pattern) => !pattern.test(value);