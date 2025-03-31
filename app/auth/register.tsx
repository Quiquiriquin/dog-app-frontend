import { Image, View } from "react-native";
import React, { useRef } from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [step, setStep] = React.useState(0);
  const ref = useRef<BottomSheet>(null);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Text size="2xl" bold>
              Ingresa tu correo electrónico
            </Text>
            <FormControl className="w-full">
              <FormControlLabel>
                <FormControlLabelText>Correo electrónico</FormControlLabelText>
              </FormControlLabel>
              <Input size="xl">
                <InputField placeholder="correo@ejemplo.com" />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  El correo electrónico es inválido
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <Text size="2xl" bold>
              Ahora, crea tu contraseña
            </Text>
            <FormControl className="w-full">
              <FormControlLabel>
                <FormControlLabelText>Contraseña</FormControlLabelText>
              </FormControlLabel>
              <Input size="xl">
                <InputField placeholder="********" type="password" />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  La contraseña es inválida
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </>
        );
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const renderCTALabel = () => {
    switch (step) {
      case 0:
        return "Continuar";
      case 1:
        return "Registrarme";
      default:
        return "";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Box className="justify-center items-center flex-1">
        <View>
          <Image
            source={require("@/assets/images/signup.png")}
            alt="Singup"
            className="object-cover"
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
        <BottomSheet
          enableDynamicSizing
          handleComponent={null}
          snapPoints={["35%", "50%"]}
          enablePanDownToClose={false}
          ref={ref}
          index={0}
        >
          <BottomSheetView className="p-8">
            <VStack space="md" className="w-full">
              {renderContent()}
              <Button
                onPress={handleNextStep}
                size="xl"
                variant={step === 1 ? "solid" : "outline"}
                className="mt-2"
              >
                <ButtonText>{renderCTALabel()}</ButtonText>
              </Button>
            </VStack>
          </BottomSheetView>
        </BottomSheet>
      </Box>
    </SafeAreaView>
  );
}
