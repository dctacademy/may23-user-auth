const categoryValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'name is required'
        }
    }
}


const expenseValidationSchema = {
    title : {
        isLength: {
            options: { min: 3}
        }
    },
    amount: {
        isNumeric: {
            
        }
    }
}