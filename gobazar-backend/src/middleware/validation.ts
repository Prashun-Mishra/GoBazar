import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ResponseUtil } from '@/utils/response';
import { ValidationUtil } from '@/utils/validation';

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const validationErrors = ValidationUtil.formatJoiErrors(error);
      return ResponseUtil.validationError(res, validationErrors);
    }
    
    req.body = value;
    next();
  };
};

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, { abortEarly: false });
    
    if (error) {
      const validationErrors = ValidationUtil.formatJoiErrors(error);
      return ResponseUtil.validationError(res, validationErrors);
    }
    
    req.query = value;
    next();
  };
};

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, { abortEarly: false });
    
    if (error) {
      const validationErrors = ValidationUtil.formatJoiErrors(error);
      return ResponseUtil.validationError(res, validationErrors);
    }
    
    req.params = value;
    next();
  };
};
