import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LottieLoader from "@/components/LottieLoader";
import { FormProvider, useForm } from "react-hook-form";
import FormHookInput from "@/components/FormHookInput";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "@/requests/mutations/user.mutations";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

export default function Register() {
  const toast = useToast();
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [step, setStep] = React.useState(0);
  const ref = useRef<BottomSheet>(null);
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

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

  const { width, height } = useWindowDimensions();

  const onSubmit = async () => {
    console.log("Form data:", methods.getValues());
    // Call your signup mutation here
    // await signupUser(data);
    // After successful signup, you can navigate to the next screen or show a success message
    signupUser({
      variables: {
        input: {
          email: methods.getValues("email"),
          password: methods.getValues("password"),
        },
      },
    });
    setStep(2);
  };

  useEffect(() => {
    if (data) {
      toast.show({
        placement: "top",
        duration: 3000,
        render: () => {
          const uniqueToastId = `toast-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="solid">
              <ToastTitle>¡Te has registrado correctamente!</ToastTitle>
              <ToastDescription>
                Te hemos enviado un correo electrónico para verificar tu cuenta.
              </ToastDescription>
            </Toast>
          );
        },
      });
    }
  }, [data]);

  useEffect(() => {
    console.log("DAerrorA: ", JSON.stringify(error));
  }, [error]);

  const Questions = ({ currentStep }: { currentStep: number }) => {
    if (currentStep === 0) {
      return (
        <>
          <Text size="2xl" bold>
            Ingresa tu correo electrónico
          </Text>
          <FormHookInput
            name="email"
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
          />
        </>
      );
    }

    if (currentStep === 1) {
      return (
        <>
          <Text size="2xl" bold>
            Ahora, crea tu contraseña
          </Text>
          <FormHookInput
            name="password"
            label="Contraseña"
            placeholder="correo@ejemplo.com"
          />
        </>
      );
    }

    return <></>;
  };

  return (
    <FormProvider {...methods}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            maxWidth: width,
            maxHeight: height,
            overflow: "hidden",
          }}
          edges={["top"]}
        >
          <Box className="justify-center items-center flex-1">
            <Image
              source={require("@/assets/images/signup.png")}
              resizeMode="cover"
            />
            <BottomSheet
              enableDynamicSizing
              handleComponent={null}
              snapPoints={["35%", "50%"]}
              enablePanDownToClose={false}
              ref={ref}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps="handled"
                >
                  <BottomSheetView className="p-8">
                    <VStack space="md" className="w-full">
                      <Questions currentStep={step} />
                      {loading ||
                        (step === 2 && (
                          <View className="flex flex-row items-center justify-center">
                            <LottieLoader />
                          </View>
                        ))}
                      {step < 2 && (
                        <Button
                          onPress={step === 1 ? onSubmit : handleNextStep}
                          size="xl"
                          variant={step === 1 ? "solid" : "outline"}
                          className="mt-2"
                        >
                          <ButtonText>{renderCTALabel()}</ButtonText>
                        </Button>
                      )}
                    </VStack>
                  </BottomSheetView>
                </ScrollView>
              </KeyboardAvoidingView>
            </BottomSheet>
          </Box>
        </SafeAreaView>
      </SafeAreaProvider>
    </FormProvider>
  );
}
