import { DefaultButton } from "@/components/ui/buttons/DefaultButton";
import { FormLayout } from "@/components/ui/forms/FormLayoutComponent";
import { useRouter } from "expo-router";
import { Image } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <FormLayout>
      <Image
        source={require("../assets/roots_logo.png")}
        style={{ height: 170, margin: 40 }}
        resizeMode="contain"
      />

      {/* Min-width on the buttons to give them the same size */}
      <DefaultButton
        onPress={() => router.replace("/login")}
        variant="primary"
        style={{ minWidth: 130 }}
      >
        Logga in
      </DefaultButton>

      <DefaultButton
        onPress={() => router.replace("/register")}
        variant="secondary"
        style={{ minWidth: 130 }}
      >
        Registrera
      </DefaultButton>
    </FormLayout>
  );
}
