import React, { useState } from 'react';
import { ButtonType, FormField } from '../types';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import './Form.css';

type GenericFormProps = {
  title: string;
  fields: FormField[];
  buttons: ButtonType[];
  onSubmit: (formData: Record<string, string>) => void;
};

const GenericForm: React.FC<GenericFormProps> = ({ title, fields, buttons, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as Record<string, string>)
  );

  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>(
    fields.reduce((acc, field) => {
      if (field.type === 'password') {
        acc[field.name] = false;
      }
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (name: string) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="generic-form" onSubmit={handleSubmit}>
      <h2 className="generic-form__title">{title}</h2>
      {fields.map((field) => (
        <div key={field.name} className="generic-form__field">
          <label htmlFor={field.name} className="generic-form__label">
            {field.label}
          </label>
          <span className="generic-form__input-wrapper">
          {field.type === 'password' ? (
            <>
            <input
              id={field.name}
              name={field.name}
              type={passwordVisibility[field.name] ? 'text' : 'password'}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] as string}
              onChange={handleChange}
              className={`generic-form__input ${"custom-placeholder-class"}`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(field.name)}
              className="generic-form__toggle-button"
            >
              {passwordVisibility[field.name] ? <Icon icon={eyeOff} /> : <Icon icon={eye} /> }
            </button>
            </>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] as string}
              onChange={handleChange}
              className={`generic-form__input ${"custom-placeholder-class"}`}
            />
          )}
          </span>
        </div>
      ))}

      {buttons.map((button: ButtonType, index) => (
        <span key={button.name} className="generic-form__button-wrapper">
        {index === 1 && (
          <span className="generic-form__helper-text">
            {button.name === 'login' ? 'Already have an account?' : 'New here?'}
          </span>
        )}
        <button
          type={button.type}
          onClick={button.onClick}
          className={`generic-form__button ${
            index === 0 ? 'generic-form__button--primary' : ''
          }`}
        >
          {button.label}
        </button>
      </span>
      ))}
    </form>
  );
};

export default GenericForm;