import { validationResult } from "express-validator";

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    console.log("Validation errors:", errors.array()); 
    res.status(400).json({ errors: errors.array() });
  };
};

export default validate;
