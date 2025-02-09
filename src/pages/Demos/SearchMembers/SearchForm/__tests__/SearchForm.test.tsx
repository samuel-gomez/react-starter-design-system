import { render } from '@testing-library/react';
import { createRef } from 'react';
import { useController, useForm, type ControllerRenderProps } from 'react-hook-form';
import { emptyFunction } from 'shared/helpers';
import SearchForm, { InputCustom, onChangeValue } from '../SearchForm';
import type { FormValues } from '../SearchForm.container';

describe('SearchForm', () => {
  it('Render <SearchForm />', () => {
    const WrapperSearchForm = () => {
      const { control } = useForm<FormValues>();
      const defaultProps = {
        className: 'af-filter-inline',
        hasErrors: false,
        handleSubmit: vi.fn(),
        onSubmit: vi.fn(),
        confirmClassModifier: 'confirm success',
        control,
      };

      return <SearchForm {...defaultProps} />;
    };

    const { asFragment } = render(<WrapperSearchForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('InputCustom', () => {
  const WrapperSearchForm = ({ message }: { message?: string }) => {
    const { formState, control } = useForm<FormValues>();
    const { field } = useController<FormValues>({ name: 'name', control });
    const defaultProps = {
      field,
      formState: !message
        ? formState
        : {
            ...formState,
            errors: {
              name: {
                type: 'required',
                message,
              },
            },
          },
    };

    return <InputCustom {...defaultProps} />;
  };
  it('Render <InputCustom />', () => {
    const { asFragment } = render(<WrapperSearchForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <InputCustom /> with error', () => {
    const { asFragment } = render(<WrapperSearchForm message="champ requis" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('onChangeValue', () => {
  it('Should called onChange', () => {
    const onChange = vi.fn();
    const field = {
      name: 'name',
      onChange,
      onBlur: emptyFunction,
      value: '',
      ref: createRef().current,
    } as ControllerRenderProps<FormValues, 'name'>;
    onChangeValue(field)({ value: 'test' });
    expect(onChange).toHaveBeenCalledWith('test');
  });
});
