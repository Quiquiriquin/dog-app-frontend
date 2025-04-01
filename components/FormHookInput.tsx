import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";
import { Input, InputField } from "./ui/input";
import { AlertCircleIcon } from "./ui/icon";
import { Text } from "react-native";

interface FormHookInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

const FormHookInput = ({ name, label, placeholder }: FormHookInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, disabled, ref },
        fieldState: { error },
      }) => {
        console.log("value for", name, value);
        return (
          <FormControl key={name} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
            <Input isDisabled={disabled} isInvalid={!!error} size="xl">
              <InputField
                ref={ref}
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
              />
            </Input>
            {error && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{error.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default FormHookInput;
