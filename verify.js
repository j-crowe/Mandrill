var verify = (function(){
    // Accepted verify types and their associated emails.
    // Change the value of each type to modify the error message.
    var types = {   "email": "Please enter valid email",
                    "required": "This field is required",
                    "min": "Too short. Minimum length of ",
                    "max": "Too Long. Maximum length of ",
    };
    var variable_types = ["min", "max"];
    var exist = "ERROR: Verification type does not exist: "
    return {
            /*****************************************************************************************
             * FLOW     Called by verify_attribute and check_types. Used to return type of variability param
             * INPUT    Attribute to be checked for variability param.
             * RETURNS  returns the type of veriability param or "undefined"
             * @example Given "max: 25", this function will return "max" as the type
             ****************************************************************************************/
            verify_variable_attribute: function(attribute){
                var type = undefined;
                if(attribute.match(/min/i)){
                    type = "min";
                }else if(attribute.match(/max/i)){
                    type = "max";
                }
                return type;
            },
            /*****************************************************************************************
             * FLOW     Called by verify_field for basic error checking. Length and existance of attribute
             * INPUT    Attributes to be verified. Checks for existance and non-empty SEE ABOVE IN TYPES
             * RETURNS  returns either "true" or "false" depending on verification
             ****************************************************************************************/
            verify_attributes: function(attributes){
            // Check if attributes exist when calling
            if(attributes.length === 0){
                console.log("Error: No attributes assigned to 'data-verify'");
                return false;
            }

            for(i = 0; i < attributes.length; ++i){
                var type = attributes[i].trim();
                // TODO: replace with a variable loop

                if(verify.verify_variable_attribute(type) == undefined && types[type] == undefined){
                    console.log(exist + type);
                    return false
                }
            }
            return true;
        },
        /*****************************************************************************************
         * FLOW     Called by verify_fields to check the regex of accepted verification types
         * INPUT    Input to be verified, and the type of verification object. SEE ABOVE IN TYPES
         * RETURNS  returns either "true" or a error message
         * NOTES    This is the bulk of the functionality in this switch. Most generic error handling
         *          and data prep is done outside this function however
         ****************************************************************************************/
        check_types: function(verify_input, type){
            var temp_type = verify.verify_variable_attribute(type);
            var variable_type = undefined;
            if (temp_type != undefined){
                veriable_type = type;
                type = temp_type;
            }
            switch(type){
                case "email":
                    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    var status = regex.test(verify_input);
                    if (status === false){status = types[type]}
                    return status;
                case "required":
                    var status = true;
                    if(verify_input.length <= 0){
                        status = types[type];
                    }
                    return status;
                case "max":
                    var status = true;
                    var regex = /^max\:\s*(\d*)/i;
                    var max = parseInt(regex.exec(veriable_type)[1]);
                    var length = verify_input.length;
                    if(isNaN(max)== true){
                        console.log("Invalid max value, NaN: " + temp_type)
                    }else if(length > max){
                        status = types[type] + max;
                    }
                    return status;
                case "min":
                    var status = true;
                    var regex = /^min\:\s*(\d*)/i;
                    var min = parseInt(regex.exec(veriable_type)[1]);
                    var length = verify_input.length;
                    if(isNaN(min)== true){
                        console.log("Invalid max value, NaN: " + temp_type)
                    }else if(length < min){
                        status = types[type] + min;
                    }
                    return status;
                default:
                    console.log("Error: verification type not supported.");
                    return false;
            }
        },
        /*****************************************************************************************
         * FLOW     Called by verify_field for basic error checking. Length and existance of attribute
         * INPUT    Attributes to be verified. Checks for existance and non-empty SEE ABOVE IN TYPES
         * RETURNS  returns either "true" or "false" depending on verification
         ****************************************************************************************/
        verify_field: function(input){
            var verify_object = $(input);
            var verify_input = verify_object.val();
            var verification_type = verify_object.data('verify');
            var attributes = verification_type.split(',');

            // Check base cases and return false if invalid
            if(verify.verify_attributes(attributes) === false){
                return false;
            }
            // For every attribute in data-verify do associated verification
            for(i = 0; i < attributes.length; ++i){
                type = attributes[i].trim();
                var verify_status = verify.check_types(verify_input, type)
                if(verify_status != true){
                    return verify_status;
                }
            }
            return true;
        },
        /*****************************************************************************************
         * FLOW     Called by the entry point function verify_set or single_verify
         * INPUT    The element to be verified
         * RETURNS  true or error status
         * NOTE     This function is the root of most work, it calls children to error check then
         *          verify the content of the fields
         ****************************************************************************************/
        verify_set: function(parent){
            var verified = true;
            var verification_status = "";
            var last_element = undefined;

            // look at each child of the parent element passed in
            $('[data-verify]').each(function() {
                last_element = this;
                // Call verification on each element
                verification_status = verify.verify_field(this);
                // If an error is returned, set verified to false and halt each function
                if(verification_status != true){
                    verified = false;
                    return false;
                }
            });
            // Successful verification process results in callback called
            if(verification_status === true){
                // TODO: do callback
                return true;
            // Failed verification process results in first error being displayed
            }else{
                // TODO: do notify of error
                console.log(verification_status);
                return false;
            }
        },
        /*****************************************************************************************
         * TAG      ENTRY POINT
         * FLOW     Entry point into verify.js on a set of elements
         * INPUT    Parent of a set of elements to be verified. Type does not matter. SEE ABOVE IN TYPES
         * RETURNS  returns either "true" or "false" depending on verification and handles notifyjs
         ****************************************************************************************/
        verify: function(parent){
            return verify.verify_set(parent);
        },
        /*****************************************************************************************
         * TAG      ENTRY POINT
         * FLOW     Entry point into verify.js on a single element
         * INPUT    Element to be verified. SEE ABOVE IN TYPES
         * RETURNS  returns either "true" or "false" depending on verification and handles notifyjs
         ****************************************************************************************/
        single_verify: function(element){
            var status = verify.verify_field(element);
            if(status != true){
                $(element).notify(status);
                return false;
            }
            return true;
        }
    }
})();
